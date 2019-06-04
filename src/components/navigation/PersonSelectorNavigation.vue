<!-- HTML Content -->
<template>
    <div style="padding: 1rem;">
        <table class="person-nav noselect">
            <thead>
                <tr>
                    <th class="all person-selected">all</th>
                    <th data-index="0" class="person person-selected">Ahmad</th>
                    <th data-index="1" class="person person-selected">Anna-Lena</th>
                    <th data-index="2" class="person person-selected">Asem</th>
                    <th data-index="3" class="person person-selected">Lars</th>
                    <th data-index="4" class="person person-selected">Peter</th>
                    <th data-index="5" class="person person-selected">Xenia</th>                    
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import * as SNAPSVG_TYPE from "snapsvg";
import { PersonNavigationIndiciesChangedListener } from "./Listeners";

declare var Snap: typeof SNAPSVG_TYPE;

@Component
export default class PersonSelectorNavigationComponent extends Vue {
    
    blockEvents: boolean = false;

    private indiciesChangedListeners: PersonNavigationIndiciesChangedListener[] = [];
    addPersonNavigationIndiciesChangedListener(listener: PersonNavigationIndiciesChangedListener) {
        this.indiciesChangedListeners.push(listener);
    }
    private fireIndiciesChangedListeners(indicies: boolean[]) {
        if ( this.blockEvents ) return;
        for ( var i = 0; i < this.indiciesChangedListeners.length; i++ ) {
            this.indiciesChangedListeners[i].firePersonIndicies(indicies);
        }
    }
    fireIndiciesChangedListenersPullRecents() {
        this.fireIndiciesChangedListeners(this.getSelectedIndicies());
    }

    mounted() {
        this.$nextTick(function() {
            this.setupGestures();
            this.updateAllButton();
        });
    }

    setSelectedIndicies(indicies: boolean[], blockEvents: boolean = false) {
        let oldBlock = this.blockEvents;
        this.blockEvents = blockEvents;

        for ( var i = 0; i < indicies.length; i++ ) {
            if ( indicies[i] ) {
                this.selectPersonByIndex(i);
            } else {
                this.unselectPersonByIndex(i);
            }
        }

        this.blockEvents = oldBlock;
    }

    getSelectedIndicies(): Array<boolean> {
        let indiciesSelected = [false, false, false, false, false, false];
        let persons = this.$el.querySelectorAll('.person');
        for ( var i = 0; i < persons.length; i++ ) {
            if ( persons[i].classList.contains('person-selected') ) {
                indiciesSelected[i] = true;
            }
        }
        return indiciesSelected;
    }

    getSelectedPersons(): Array<string> {
        let personsSelected = Array();
        let persons = this.$el.querySelectorAll('.person');
        for ( var i = 0; i < persons.length; i++ ) {
            if ( persons[i].classList.contains('person-selected') ) {
                personsSelected.push(persons[i].innerHTML);
            }
        }
        return personsSelected;
    }

    updateAllButton() {
        let all = this.$el.querySelector('.all');
        if ( all !== null ) {
            if ( this.getPersonSelectCount() == 6 ) {
                all.classList.toggle('person-selected', true);
            } else {
                all.classList.toggle('person-selected', false);
            }
        }
    }

    getPersonSelectCount(): number {
        let persons = this.$el.querySelectorAll('.person');
        let counter = 0;
        for ( var i = 0; i < persons.length; i++ ) {
            if ( persons[i].classList.contains("person-selected") ) {
                counter++;
            }
        }
        return counter;
    }

    toggleAllPersons() {
        if ( this.getPersonSelectCount() == 6 ) {
            this.unselectAllPersons();
        } else {
            this.selectAllPersons();
        }
    }

    selectAllPersons() {
        let persons = this.$el.querySelectorAll('.person');
        for ( var i = 0; i < persons.length; i++ ) {
            persons[i].classList.toggle('person-selected', true);
        }
        this.updateAllButton();
        this.fireIndiciesChangedListenersPullRecents(); 
    }

    unselectAllPersons() {
        let persons = this.$el.querySelectorAll('.person');
        for ( var i = 0; i < persons.length; i++ ) {
            persons[i].classList.toggle('person-selected', false);
        }
        this.updateAllButton();
        this.fireIndiciesChangedListenersPullRecents();
    }

    isPersonsSelectedByIndex(index: number): boolean {
        let persons = this.$el.querySelectorAll('.person');
        return persons[index].classList.contains("person-selected");
    }

    togglePersonByIndex(index: number) {
        let persons = this.$el.querySelectorAll('.person');
        persons[index].classList.toggle('person-selected');
        this.updateAllButton();
        this.fireIndiciesChangedListenersPullRecents();
    }

    selectPersonByIndex(index: number) {
        let persons = this.$el.querySelectorAll('.person');
        persons[index].classList.toggle('person-selected', true);
        this.updateAllButton();
        this.fireIndiciesChangedListenersPullRecents();
    }

    unselectPersonByIndex(index: number) {
        let persons = this.$el.querySelectorAll('.person');
        persons[index].classList.toggle('person-selected', false);
        this.updateAllButton();
        this.fireIndiciesChangedListenersPullRecents();
    }
    

    private setupGestures() {
        let comp = this;
        let persons = this.$el.querySelectorAll('.person');
        
        let all = this.$el.querySelector('.all');
        if ( all !== null ) {
            all.addEventListener('click', function(event) {
                comp.toggleAllPersons();
            });
        }

        for ( var i = 0; i < persons.length; i++ ) {
            persons[i].addEventListener('click', function(event) {
                let node = event.target as HTMLObjectElement;
                if ( node !== null ) {
                    let personIndex = parseInt(node.dataset.index as string);
                    comp.togglePersonByIndex(personIndex);
                }
            });
        }
    }
}
</script>

<!-- (S)CSS content -->
<style>
    .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
    }

    .person-nav {
        width: 100%;
        border-collapse: separate;
        border: 0.1rem solid #000;
        border-radius: 0.3rem;
        border-spacing: 0;
        border-bottom-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        overflow: hidden;
        font-size: 0.8rem;
    }

    .person-nav thead {
        padding: 0;
        margin: 0;
    }

    .person-nav th {
        width: 14.27%;
        padding: 0;
        margin: 0;
        font-weight: normal !important;
        text-align: center;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        background-color: rgb(255, 255, 255, 1.0);
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
    }

    .person-nav th:hover {
        cursor: pointer;
    }

    .person-nav th.person-selected {
        color: white !important;
    }

    .person-nav th {
        border-right: 0.05rem solid #000;
    }

    .person-nav th:last-of-type {
        border-right: none;
    }

    .person-nav td {
        padding: 0;
        margin: 0;
        width: 12.495%;
        border-top: 0.05rem solid #000;
        border-right: 0.05rem solid #000;
        background-color: rgb(255, 255, 255, 1.0);
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
        text-align: center;
    }

    .person-nav td.person-selected {
        color: white !important;
    }

    .person-nav td:hover {
        cursor: pointer;
    }

    .person-nav td:last-of-type {
        border-right: none;
    }

    .person-selected {
        background-color: rgb(17, 181, 226, 0.75)!important;
    }
</style>
