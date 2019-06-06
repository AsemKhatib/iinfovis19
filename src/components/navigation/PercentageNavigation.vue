<!-- HTML Content -->
<template>
    <div>
        <!-- Absolute and lays over the container to interfere touch events -->
        <div class="nav-touch noselect">
            <!-- used to be make position relative again -->
            <div class="nav-container">
                <!-- absolute within nav-container -->
                <div class="nav-move hidden">
                    <!-- is again relative for real content -->
                    <div class="nav-inner-container">
                        <percentage-calendar-navigation-component ref="calendarNav"/>
                        <center>
                            <div style="display: block; height: 2.5rem;">
                                <svg height="100%" viewBox="0 0 100 100" class="nav-sync">
                                    <g>
                                        <circle cx="50" cy="50" r="45" fill="#FDFDFD" stroke-width="4" stroke="#000" />
                                        <text x="20" y="55" style="font-size: 25px;">sync</text>
                                    </g>
                                </svg>
                                <div style="display: inline-block; width: 2rem;"/>
                                <svg height="100%" viewBox="0 0 100 100" class="nav-cursor">
                                    <g>
                                        <circle cx="50" cy="50" r="45" fill="#FDFDFD" stroke-width="4" stroke="#000" />
                                        <circle cx="50" cy="50" r="10" fill="#000" />
                                    </g>
                                </svg>
                                <div style="display: inline-block; width: 2rem;"/>
                                <svg height="100%" viewBox="0 0 100 100" class="nav-close">
                                    <g>
                                        <circle cx="50" cy="50" r="45" fill="#FDFDFD" stroke-width="4" stroke="#000" />
                                        <line stroke-width="5" x1="35" x2="65" y1="35" y2="65" stroke="#000"/>
                                        <line stroke-width="5" x1="35" x2="65" y1="65" y2="35" stroke="#000"/>
                                    </g>
                                </svg>
                            </div>
                        </center>
                        <person-selector-navigation-component ref="personNav"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import PercentageCalendarNavigationComponent from "./PercentageCalendarNavigation.vue";
import PersonSelectorNavigationComponent from "./PersonSelectorNavigation.vue";
import FoodNavigationComponent from "./FoodNavigation.vue";
import { CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener} from "./Listeners";

const longclick_delay = 600;

@Component({
    components: {PercentageCalendarNavigationComponent, PersonSelectorNavigationComponent}
})
export default class PercentageNavigationComponent extends Vue {

    private otherFoodNavigationComponents: Array<FoodNavigationComponent> = [];
    private otherPercentageNavigationComponents: Array<PercentageNavigationComponent> = [];
    public addOtherFoodNavigationComponent(comp: FoodNavigationComponent) {
        this.otherFoodNavigationComponents.push(comp);
    }
    public addOtherPercentageNavigationComponent(comp: PercentageNavigationComponent) {
        this.otherPercentageNavigationComponents.push(comp);
    }

    mounted() {
        this.$nextTick(function() {
            this.setupOpenAndClose();
            this.setupDrag();
            this.setupSync();
        });
    }

    fireIndiciesChangedListenersPullRecents() {
        (this.$refs.calendarNav as PercentageCalendarNavigationComponent).fireIndiciesChangedListenersPullRecents();
        (this.$refs.personNav as PersonSelectorNavigationComponent).fireIndiciesChangedListenersPullRecents();
    }

    addCalendarNavigationIndiciesChangedListener(listener: CalendarNavigationIndiciesChangedListener) {
        (this.$refs.calendarNav as PercentageCalendarNavigationComponent).addCalendarNavigationIndiciesChangedListener(listener);
    }

    addPersonNavigationIndiciesChangedListener(listener: PersonNavigationIndiciesChangedListener) {
        (this.$refs.personNav as PersonSelectorNavigationComponent).addPersonNavigationIndiciesChangedListener(listener);
    }

    getSelectedDayIndicies(): boolean[] {
        return (this.$refs.calendarNav as PercentageCalendarNavigationComponent).getSelectedIndicies();
    }

    getSelectedPersonIndicies(): boolean[] {
        return (this.$refs.personNav as PersonSelectorNavigationComponent).getSelectedIndicies();
    }

    getSelectedPersons(): string[] {
        return (this.$refs.personNav as PersonSelectorNavigationComponent).getSelectedPersons();
    }

    setPercentages(percentages: number[]) {
        (this.$refs.calendarNav as PercentageCalendarNavigationComponent).setPercentages(percentages);
    }

    setSelectedDayIndicies(indicies: boolean[], blockEvents: boolean = false) {
        (this.$refs.calendarNav as PercentageCalendarNavigationComponent).setSelectedIndicies(indicies, blockEvents);
    }

    setSelectedPersonIndicies(indicies: boolean[], blockEvents: boolean = false) {
        (this.$refs.personNav as PersonSelectorNavigationComponent).setSelectedIndicies(indicies, blockEvents);
    }

    setupSync() {
        let sync = this.$el.querySelector('.nav-sync') as HTMLElement;
        let comp = this;
        if ( sync !== null ) {
            sync.addEventListener('click', function() {
                comp.sync();
            });
        }
    }

    sync() {
        let dayIndicies = this.getSelectedDayIndicies();
        let personIndicies = this.getSelectedPersonIndicies();

        for ( var i = 0; i < this.otherFoodNavigationComponents.length; i++ ) {
            this.otherFoodNavigationComponents[i].setSelectedDayIndicies(dayIndicies, true);
            this.otherFoodNavigationComponents[i].setSelectedPersonIndicies(personIndicies, true);
            this.otherFoodNavigationComponents[i].fireIndiciesChangedListenersPullRecents();
        }

        for ( var i = 0; i < this.otherPercentageNavigationComponents.length; i++ ) {
            this.otherPercentageNavigationComponents[i].setSelectedDayIndicies(dayIndicies, true);
            this.otherPercentageNavigationComponents[i].setSelectedPersonIndicies(personIndicies, true);
            this.otherPercentageNavigationComponents[i].fireIndiciesChangedListenersPullRecents();
        }
    }

    private setupOpenAndClose() {
        let container = this.$el.querySelector('.nav-container') as HTMLElement;
        let nav = this.$el.querySelector('.nav-move') as HTMLElement;
        let dragger = this.$el.querySelector('.nav-cursor') as HTMLElement;
        let close = this.$el.querySelector('.nav-close') as HTMLElement;
        let sync = this.$el.querySelector('.nav-sync') as HTMLElement;
        let comp = this;

        if ( container !== null && nav !== null && close !== null && sync !== null && dragger !== null ) {
            close.addEventListener('click', function() {
                nav.classList.toggle('hidden', true);
            });

            let timeout: number = -1;

            container.addEventListener("mousedown", function(event) {
                if ( nav.classList.contains('hidden') ) {
                    timeout = setTimeout(function() {

                        let x = (event as MouseEvent).clientX;
                        let y = (event as MouseEvent).clientY;

                        let navRect = nav.getBoundingClientRect();
                        let width = navRect.width/0.2;
                        let height = navRect.height/0.2;

                        let newLeft = x-width/2;
                        let newTop = y-height/2;

                        let containerRect = container.getBoundingClientRect();
                        nav.classList.toggle('nav-animate-absoulte', true);
                        
                        if ( newLeft < 0 ) {
                            nav.style.left = "0px";
                        } else if ( newLeft+width > containerRect.width ) {
                            nav.style.left = String(containerRect.width-width)+"px";
                        } else {
                            nav.style.left = String(newLeft)+"px";
                        }

                        if ( newTop < 0 ) {
                            nav.style.top = String(containerRect.top)+"px";
                        } else if ( newTop+height > containerRect.height ) {
                            nav.style.top = String(containerRect.height-height)+"px";
                        } else {
                            nav.style.top = String(newTop)+"px";
                        }

                        nav.classList.toggle('hidden', false);
                    }, longclick_delay);
                }
            });

            container.addEventListener("mouseup", function(event){
                clearTimeout((timeout as number));
                return false;
            });
        }
    }

    private moveNavBackToContainer() {
        let container = this.$el.querySelector('.nav-container') as HTMLElement;
        let nav = this.$el.querySelector('.nav-move') as HTMLElement;
        
        if ( container !== null && nav !== null ) {
            let navRect = nav.getBoundingClientRect();
            let containerRect = container.getBoundingClientRect();
            nav.classList.toggle('nav-animate-absoulte', true);
            
            if ( navRect.left < 0 ) {
                nav.style.left = "0px";
            } else if ( navRect.right > containerRect.width ) {
                nav.style.left = String(containerRect.width-navRect.width)+"px";
            }

            if ( navRect.top < 0 ) {
                nav.style.top = "0px";
            } else if ( navRect.bottom > containerRect.bottom ) {
                nav.style.top = String(containerRect.height-navRect.height)+"px";
            }
        }
    }

    private setupDrag() {
        let comp = this;
        let nav = this.$el.querySelector('.nav-move') as HTMLElement;
        let dragger = this.$el.querySelector('.nav-cursor') as HTMLElement;

        if ( nav !== null && dragger !== null ) {
            nav.addEventListener('mousedown', function(event) {
                let downMouseEvent = event as MouseEvent;           

                let startX = downMouseEvent.clientX;
                let startY = downMouseEvent.clientY;
                let startOffsetTop = nav.offsetTop as number;
                let startOffsetLeft = nav.offsetLeft as number;

                function dragMove(e: Event) {
                    let moveMouseEvent = e as MouseEvent;
                    moveMouseEvent.preventDefault();

                    let currentX = moveMouseEvent.clientX;
                    let currentY = moveMouseEvent.clientY;

                    let deltaX = currentX-startX;
                    let deltaY = currentY-startY;

                    let newX = startOffsetLeft+deltaX;
                    let newY = startOffsetTop+deltaY;                           

                    nav.style.top = String(newY)+"px";
                    nav.style.left = String(newX)+"px";
                }

                function mouseUp(e: Event) {
                    nav.removeEventListener('mousemove', dragMove, true);
                    nav.removeEventListener('mousemove', mouseUp, true);

                    nav.classList.toggle('nav-animate-absoulte', true);
                    dragger.classList.toggle('dragged', false);
                    comp.moveNavBackToContainer();
                }

                let cursorRect = dragger.getBoundingClientRect();
                if ( cursorRect.left <= downMouseEvent.clientX &&
                     cursorRect.right >= downMouseEvent.clientX &&
                     cursorRect.top <= downMouseEvent.clientY && 
                     cursorRect.bottom >= downMouseEvent.clientY ) {

                        downMouseEvent.preventDefault();
                        nav.addEventListener('mousemove', dragMove, true);
                        nav.addEventListener('mouseup', mouseUp, true);

                        nav.classList.toggle('nav-animate-absoulte', false);
                        dragger.classList.toggle('dragged', true);         
                }

            });
        }
    }

}
    
</script>

<!-- (S)CSS content -->
<style>
    .nav-touch{
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 100;
    }

    .nav-container{
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 101;
    }

    .nav-move {
        display: block;
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        max-width: 35rem;
        opacity: 1.0;
    }

    .nav-inner-container {
        display: block;
        width: 100%;
        position: relative;
    }

    .nav-cursor:hover {
        cursor: pointer;
    }

    .nav-sync:hover {
        cursor: pointer;
    }

    .nav-close:hover {
        cursor: pointer;
    }

    .nav-cursor.dragged {
        cursor: move;
    }

    .nav-cursor.dragged:hover {
        cursor: move;
    }

    .nav-move {
        transition: transform 0.35s ease, opacity 0.2s ease;
    }

    .nav-move.nav-animate-absoulte {
        transition: transform 0.35s ease, opacity 0.2s ease, top 0.2s ease, left 0.2s ease;
    }

    .nav-move.hidden {
        transform: scale(0.2);
        opacity: 0.0;
    }
</style>
