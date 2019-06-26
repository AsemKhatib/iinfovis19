<!-- HTML Content -->
<template>
    <div>
        <!-- Absolute and lays over the container to interfere touch events -->
        <div class="nav-touch noselect">
            <!-- used to be make position relative again --- I USE THIS ONE FOR TOUCH EVENTS -->
            <div class="nav-container">
                <!-- absolute within nav-container -->
                <div class="nav-move hidden">
                    <!-- is again relative for real content -->
                    <div class="nav-inner-container">
                        <food-calendar-navigation-component ref="calendarNav"/>
                        <center>
                            <div style="display: block; height: 2.5rem;">
                                <svg height="100%" viewBox="0 0 100 100" class="nav-sync auto-sync">
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
import FoodCalendarNavigationComponent from "./FoodCalendarNavigation.vue";
import PersonSelectorNavigationComponent from "./PersonSelectorNavigation.vue";
import { FoodType } from "../../models/food";
import PercentageNavigationComponent from "./PercentageNavigation.vue";
import { CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener} from "./Listeners";
import {addClickAndLongClickToElement} from "./../util";

const longclick_delay = 600;

@Component({
    components: {FoodCalendarNavigationComponent, PersonSelectorNavigationComponent}
})
export default class FoodNavigationComponent extends Vue implements CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener {

    auto_sync = true;
    fireDayIndicies(i: boolean[]) {
        if ( this.auto_sync ) {
            this.sync();
        }
    }
    firePersonIndicies(i: boolean[]) {
        if ( this.auto_sync ) {
            this.sync();
        }
    }
    toggleAutoSync() {
        let sync = this.$el.querySelector('.nav-sync') as HTMLElement;
        if ( sync !== null ) {
            if ( sync.classList.contains('auto-sync') ) {
                sync.classList.toggle('auto-sync', false);
                this.auto_sync = false;
            } else {
                sync.classList.toggle('auto-sync', true);
                this.auto_sync = true;
                this.sync();
            }
        }
    }

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

            this.$nextTick(function() {
                this.$nextTick(function() {
                    (this.$refs.calendarNav as FoodCalendarNavigationComponent).addLocalPersonNavigationIndiciesChangedListener(this);
                    (this.$refs.personNav as PersonSelectorNavigationComponent).addLocalPersonNavigationIndiciesChangedListener(this);
                });
            });
        });
    }

    addCalendarNavigationIndiciesChangedListener(listener: CalendarNavigationIndiciesChangedListener) {
        (this.$refs.calendarNav as FoodCalendarNavigationComponent).addCalendarNavigationIndiciesChangedListener(listener);
    }

    addPersonNavigationIndiciesChangedListener(listener: PersonNavigationIndiciesChangedListener) {
        (this.$refs.personNav as PersonSelectorNavigationComponent).addPersonNavigationIndiciesChangedListener(listener);
    }

    setupSync() {
        let sync = this.$el.querySelector('.nav-sync') as HTMLElement;
        let comp = this;
        if ( sync !== null ) {
            addClickAndLongClickToElement(sync, function() {
                if ( !comp.auto_sync ) {
                    comp.sync();
                }
            }, function() {
                comp.toggleAutoSync();
            }, 500);
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

    fireIndiciesChangedListenersPullRecents() {
        (this.$refs.calendarNav as FoodCalendarNavigationComponent).fireIndiciesChangedListenersPullRecents();
        (this.$refs.personNav as PersonSelectorNavigationComponent).fireIndiciesChangedListenersPullRecents();
    }

    getSelectedDayIndicies(): boolean[] {
        return (this.$refs.calendarNav as FoodCalendarNavigationComponent).getSelectedIndicies();
    }

    getSelectedPersonIndicies(): boolean[] {
        return (this.$refs.personNav as PersonSelectorNavigationComponent).getSelectedIndicies();
    }

    getSelectedPersons(): string[] {
        return (this.$refs.personNav as PersonSelectorNavigationComponent).getSelectedPersons();
    }

    setFoodTypes(types: FoodType[]) {
        (this.$refs.calendarNav as FoodCalendarNavigationComponent).setFoodTypes(types);
    }

    setSelectedDayIndicies(indicies: boolean[], blockEvents: boolean) {
        (this.$refs.calendarNav as FoodCalendarNavigationComponent).setSelectedIndicies(indicies, blockEvents);
    }

    setSelectedPersonIndicies(indicies: boolean[], blockEvents: boolean) {
        (this.$refs.personNav as PersonSelectorNavigationComponent).setSelectedIndicies(indicies, blockEvents);
    }

    private setupOpenAndClose() {
        let container = this.$el.querySelector('.nav-container') as HTMLElement;
        let nav = this.$el.querySelector('.nav-move') as HTMLElement;
        let dragger = this.$el.querySelector('.nav-cursor') as HTMLElement;
        let close = this.$el.querySelector('.nav-close') as HTMLElement;
        let sync = this.$el.querySelector('.nav-sync') as HTMLElement;
        let comp = this;

        if ( container !== null && nav !== null && close !== null && sync !== null && dragger !== null ) {
            addClickAndLongClickToElement(container, 
            function(event: Event) {
            },
            function(event: Event) {
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
            }, 500);

            addClickAndLongClickToElement(close,
            function() {
                nav.classList.toggle('hidden', true);
            }, null, 500);
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
            nav.addEventListener("touchstart", function(event) {
                let touchStartEvent = event as TouchEvent;

                let startX = touchStartEvent.touches[0].clientX;
                let startY = touchStartEvent.touches[0].clientY;
                let startOffsetTop = nav.offsetTop as number;
                let startOffsetLeft = nav.offsetLeft as number;

                function dragMove(e: Event) {
                    let touchMoveEvent = e as TouchEvent;
                    touchMoveEvent.preventDefault();
                    console.log("event");

                    let currentX = touchMoveEvent.touches[0].clientX;
                    let currentY = touchMoveEvent.touches[0].clientY;

                    let deltaX = currentX-startX;
                    let deltaY = currentY-startY;

                    let newX = startOffsetLeft+deltaX;
                    let newY = startOffsetTop+deltaY;                           

                    nav.style.top = String(newY)+"px";
                    nav.style.left = String(newX)+"px";
                }

                function touchUp(e: Event) {
                    nav.removeEventListener('touchmove', dragMove, true);
                    nav.removeEventListener('touchend', touchUp, true);

                    nav.classList.toggle('nav-animate-absoulte', true);
                    dragger.classList.toggle('dragged', false);
                    comp.moveNavBackToContainer();
                    e.preventDefault();
                }

                let cursorRect = dragger.getBoundingClientRect();
                if ( cursorRect.left <= touchStartEvent.touches[0].clientX &&
                     cursorRect.right >= touchStartEvent.touches[0].clientX &&
                     cursorRect.top <= touchStartEvent.touches[0].clientY && 
                     cursorRect.bottom >= touchStartEvent.touches[0].clientY ) {

                        touchStartEvent.preventDefault();
                        nav.addEventListener('touchmove', dragMove, true);
                        nav.addEventListener('touchend', touchUp, true);

                        nav.classList.toggle('nav-animate-absoulte', false);
                        dragger.classList.toggle('dragged', true);         
                }
            });

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
                    nav.removeEventListener('mouseup', mouseUp, true);

                    nav.classList.toggle('nav-animate-absoulte', true);
                    dragger.classList.toggle('dragged', false);
                    comp.moveNavBackToContainer();
                    e.preventDefault();
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
