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
                    <td class="single-day" data-index="0"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="1"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="2"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="3"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="4"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="5"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="6"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                </tr>
                <tr>
                    <td class="week" data-index="1">W 2</td>
                    <td class="single-day" data-index="7"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="8"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="9"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="10"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="11"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="12"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                    <td class="single-day" data-index="13"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff" stroke="white" stroke-width="2"/></svg></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import * as SNAPSVG_TYPE from "snapsvg";

declare var Snap: typeof SNAPSVG_TYPE;

@Component
export default class PercentageCalendarNavigationComponent extends Vue {
    percentages: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    mounted() {
        this.$nextTick(function() {
            this.setupGestures();
            this.updatePercentages();
        });
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

    private setupGestures() {
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

    setPercentages(values: number[]) {
        if ( values === undefined ) {
            console.error("setPercentages must not be undefined");
            return;
        }

        if ( values.length != 14 ) {
            console.error("setPercentages values must be of length 14");
            return;
        }

        this.percentages = values;
        this.updatePercentages();
    }

    setPercentageAtIndex(index: number, value: number) {
        if ( index < 0 || index > 13 ) {
            console.error("setPercentageAtIndex: index must be 0-13");
            return;
        }
        console.log(this.percentages);
        this.percentages[index] = value;
        console.log(this.percentages);
        this.updatePercentages();
    }

    private updatePercentages() {
        let svgs = this.$el.querySelectorAll('.value');

        for ( var i = 0; i < this.percentages.length; i++ ) {
            let percentage = this.percentages[i];
            let radius = (percentage/1.0)*45;

            let snap = Snap((svgs[i] as SVGElement));
            let circle = snap.select('circle');
            circle.animate({r: radius}, 750);
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
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
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
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
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
