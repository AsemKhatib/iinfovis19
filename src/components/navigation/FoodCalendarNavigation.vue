<!-- HTML Content -->
<template>
    <div style="padding: 1rem;">
        <table class="calendar-nav noselect">
            <thead>
                <tr>
                    <th class="all">all</th>
                    <th class="day-of-week" data-index="0">Mon</th>
                    <th class="day-of-week" data-index="1">Tue</th>
                    <th class="day-of-week" data-index="2">Wed</th>
                    <th class="day-of-week" data-index="3">Thu</th>
                    <th class="day-of-week" data-index="4">Fri</th>
                    <th class="day-of-week" data-index="5">Sat</th>
                    <th class="day-of-week" data-index="6">Sun</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="week" data-index="0">W 1</td>
                    <td class="single-day" data-index="0"></td>
                    <td class="single-day" data-index="1"></td>
                    <td class="single-day" data-index="2"></td>
                    <td class="single-day" data-index="3"></td>
                    <td class="single-day" data-index="4"></td>
                    <td class="single-day" data-index="5"></td>
                    <td class="single-day" data-index="6"></td>
                </tr>
                <tr>
                    <td class="week" data-index="1">W 2</td>
                    <td class="single-day" data-index="7"></td>
                    <td class="single-day" data-index="8"></td>
                    <td class="single-day" data-index="9"></td>
                    <td class="single-day" data-index="10"></td>
                    <td class="single-day" data-index="11"></td>
                    <td class="single-day" data-index="12"></td>
                    <td class="single-day" data-index="13"></td>
                </tr>
            </tbody>
        </table>

        <div style="display: none;">
            <img id="meat-img" width="100%" src="images/meat.png"/>
            <img id="milk-img" width="100%" src="images/milk.png"/>
            <img id="leaf-img" width="100%" src="images/leaf.png"/>
        </div>

    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import * as SNAPSVG_TYPE from "snapsvg";
import { FoodType } from "../../models/food";
import * as Vivus from "vivus";

declare var Snap: typeof SNAPSVG_TYPE;

@Component
export default class FoodCalendarNavigationComponent extends Vue {
    food_types: FoodType[] = [FoodType.VEGAN, FoodType.VEGETARIAN, FoodType.VEGAN, FoodType.MEAT, FoodType.VEGAN, FoodType.VEGAN, FoodType.VEGAN, FoodType.VEGAN, FoodType.VEGAN, FoodType.VEGAN, FoodType.VEGAN, FoodType.VEGAN, FoodType.VEGAN, FoodType.VEGAN];

    meat_img: Element | null = null;
    milk_img: Element | null = null;
    leaf_img: Element | null = null;

    mounted() {
        this.$nextTick(function() {
            this.meat_img = this.$el.querySelector('#meat-img');
            this.milk_img = this.$el.querySelector('#milk-img');
            this.leaf_img = this.$el.querySelector('#leaf-img');

            this.updateIcons();

            this.setupGestures();
        });
    }

    updateIcons() {
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var i = 0; i < cells.length; i++ ) {
            this.setIcon(i, this.food_types[i]);
        }
    }

    setIcon(index: number, type: FoodType) {
        let cells = this.$el.querySelectorAll('.single-day');
        var node = cells[index];
        while ( node.firstChild ) { node.removeChild(node.firstChild); }
        console.log(type);

        if ( type == FoodType.VEGAN ) {
            node.appendChild((this.leaf_img as HTMLOListElement).cloneNode(true));
        } else if ( type == FoodType.VEGETARIAN ) {
            node.appendChild((this.milk_img as HTMLObjectElement).cloneNode(true));
        } else if ( type == FoodType.MEAT ) {
            node.appendChild((this.meat_img as HTMLObjectElement).cloneNode(true))
        }
        
    }

    getSelectedIndicies(): Array<boolean> {
        let indiciesSelected = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var i = 0; i < cells.length; i++ ) {
            if ( cells[i].classList.contains("cell-selected") ) {
                indiciesSelected[i] = true;
            }
        }
        return indiciesSelected;
    }

    getAllSelectCount(): number {
        let counter = 0;
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var j = 0; j < 2; j++ ) {
            for ( var i = 0; i < 7; i++ ) {
                if ( cells[i+(j*7)].classList.contains("cell-selected") ) {
                    counter++;
                }
            }
        }
        return counter;
    }

    toggleAll() {
        if ( this.getAllSelectCount() == 14 ) {
            this.unselectAll();
        } else {
            this.selectAll();
        }
    }

    selectAll() {
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var i = 0; i < cells.length; i++ ) {
            cells[i].classList.toggle('cell-selected', true);
        }  
        this.updateHeadersEtcIvNecessary();
    }

    unselectAll() {
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var i = 0; i < cells.length; i++ ) {
            cells[i].classList.toggle('cell-selected', false);
        }  
        this.updateHeadersEtcIvNecessary();
    }

    getDayOfWeekSelectCount(dayOfWeek: number): number {
        let counter = 0;
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var i = 0; i < 2; i++ ) {
            if ( cells[dayOfWeek+(i*7)].classList.contains("cell-selected") ) {
                counter++;
            }
        }
        return counter;
    }

    getWeekSelectCount(week: number): number {
        let counter = 0;
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var i = 0; i < 7; i++ ) {
            if ( cells[week*7+i].classList.contains("cell-selected") ) {
                counter++;
            }
        }
        return counter;
    }

    toggleDayOfWeek(dayOfWeek: number) {
        if ( this.getDayOfWeekSelectCount(dayOfWeek) == 2 ) {
            this.unselectDayOfWeek(dayOfWeek);
        } else {
            this.selectDayOfWeek(dayOfWeek);
        }
    }

    selectDayOfWeek(dayOfWeek: number) {
        let cells = this.$el.querySelectorAll('.single-day');
        cells[dayOfWeek].classList.toggle('cell-selected', true);
        cells[dayOfWeek+7].classList.toggle('cell-selected', true);
        this.updateHeadersEtcIvNecessary();
    }

    unselectDayOfWeek(dayOfWeek: number) {
        let cells = this.$el.querySelectorAll('.single-day');
        cells[dayOfWeek].classList.toggle('cell-selected', false);
        cells[dayOfWeek+7].classList.toggle('cell-selected', false);
        this.updateHeadersEtcIvNecessary();
    }

    toggleWeek(week: number) {
        let counter = this.getWeekSelectCount(week);
        if ( counter == 7 ) {
            this.unselectWeek(week);
        } else {
            this.selectWeek(week);
        }
    }

    selectWeek(week: number) {
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var i = 0; i < 7; i++ ) {
            cells[week*7+i].classList.toggle('cell-selected', true);
        }    
        this.updateHeadersEtcIvNecessary();
    }

    unselectWeek(week: number) {
        let cells = this.$el.querySelectorAll('.single-day');
        for ( var i = 0; i < 7; i++ ) {
            cells[week*7+i].classList.toggle('cell-selected', false);
        }    
        this.updateHeadersEtcIvNecessary();
    }

    toggleDate(index: number) {
        let cells = this.$el.querySelectorAll('.single-day');
        cells[index].classList.toggle('cell-selected');
        this.updateHeadersEtcIvNecessary();
    }

    selectedDate(index: number) {
        let cells = this.$el.querySelectorAll('.single-day');
        cells[index].classList.toggle('cell-selected', true);
        this.updateHeadersEtcIvNecessary();
    }

    unselectDate(index: number) {
        let cells = this.$el.querySelectorAll('.single-day');
        cells[index].classList.toggle('cell-selected', false);
        this.updateHeadersEtcIvNecessary();
    }

    updateHeadersEtcIvNecessary() {
        let indiciesSelected = this.getSelectedIndicies();

        // Days of week
        let days = this.$el.querySelectorAll('.day-of-week');
        for ( var i = 0; i < days.length; i++ ) {
            if ( this.getDayOfWeekSelectCount(i) == 2 ) {
                days[i].classList.toggle('cell-selected', true);
            } else {
                days[i].classList.toggle('cell-selected', false);
            }
        }

        // Weeks
        let weeks = this.$el.querySelectorAll('.week');
        for ( var i = 0; i < weeks.length; i++ ) {
            if ( this.getWeekSelectCount(i) == 7 ) {
                weeks[i].classList.toggle('cell-selected', true);
            } else {
                weeks[i].classList.toggle('cell-selected', false);
            }
        }

        // All
        let all = this.$el.querySelector('.all');
        if ( all !== null ) {
            if ( this.getAllSelectCount() == 14 ) {
                all.classList.toggle('cell-selected', true);
            } else {
                all.classList.toggle('cell-selected', false);
            }
        }
    }

    setupGestures() {
        let comp = this;
        let days = this.$el.querySelectorAll('.day-of-week');
        let weeks = this.$el.querySelectorAll('.week');
        let cells = this.$el.querySelectorAll('.single-day');
        let all = this.$el.querySelector(".all");


        // Header days
        for ( var i = 0; i < days.length; i++ ) {
            days[i].addEventListener("click", function(event) {
                if ( event.target !== null ) {
                    let node = event.target as HTMLElement;
                    let dayOfWeek = parseInt(node.dataset.index as string);
                    if ( dayOfWeek !== null ) {
                        comp.toggleDayOfWeek(dayOfWeek);
                    }
                }
            });
        }

        // Vertical header weeks
        for ( var i = 0; i < weeks.length; i++ ) {
            weeks[i].addEventListener("click", function(event) {
                if ( event.target !== null ) {
                    let node = event.target as HTMLElement;
                    let week = parseInt(node.dataset.index as string);
                    if ( week !== null ) {                 
                        comp.toggleWeek(week);
                    }
                }
            });
        }

        // Body cells
        for ( var i = 0; i < cells.length; i++ ) {
            cells[i].addEventListener("click", function(event) {
                if ( event.target !== null ) {
                    let td_cell = (event.target as HTMLElement).closest('.single-day') as HTMLElement;
                    if ( td_cell !== null ) {
                        let day = parseInt(td_cell.dataset.index as string);
                        if ( day !== null ) {
                            comp.toggleDate(day);
                        }
                    }
                }
            });
        }

        // All
        if ( all !== null ) {
            all.addEventListener("click", function(event) {
                comp.toggleAll();
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

    .calendar-nav {
        width: 100%;
        border-collapse: separate;
        border: 0.05rem solid #aaa;
        border-radius: 0.3rem;
        border-spacing: 0;
        border-bottom-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        overflow: hidden;
    }

    .calendar-nav thead {
        padding: 0;
        margin: 0;
    }

    .calendar-nav th {
        width: 12.495%;
        padding: 0;
        margin: 0;
        font-weight: normal !important;
        text-align: center;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        background-color: rgb(249, 29, 133, 0.0);
        transition: background-color 0.25s ease-in-out;
    }

    .calendar-nav th:hover {
        cursor: pointer;
    }

    .calendar-nav th.cell-selected {
        color: white !important;
    }

    .calendar-nav th {
        border-right: 0.05rem solid #aaa;
    }

    .calendar-nav th:last-of-type {
        border-right: none;
    }

    .calendar-nav td {
        padding: 0;
        margin: 0;
        width: 12.495%;
        border-top: 0.05rem solid #aaa;
        border-right: 0.05rem solid #aaa;
        background-color: rgb(249, 29, 133, 0.0);
        transition: background-color 0.25s ease-in-out;
        text-align: center;
    }

    .calendar-nav td.cell-selected {
        color: white !important;
    }

    .calendar-nav td:hover {
        cursor: pointer;
    }

    .calendar-nav td:last-of-type {
        border-right: none;
    }

    .cell-selected {
        background-color: rgb(249, 29, 133, 1.0) !important;
    }
</style>
