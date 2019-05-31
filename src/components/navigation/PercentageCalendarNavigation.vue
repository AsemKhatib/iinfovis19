<!-- HTML Content -->
<template>
    <div style="padding: 1rem;">
        <table class="calendar-nav">
            <thead>
                <tr>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                </tr>
                <tr>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                    <td class="day"><svg class="value" width="100%" viewBox="0 0 100 100"><circle cx="50" cy="50" r="0" fill="#f4c842ff"/></svg></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import * as SNAPSVG_TYPE from "snapsvg";
import vue-jquery from 'vue-jquery';

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

    private setupGestures() {
        let cells = this.$el.querySelectorAll('.day');
        for ( var i = 0; i < cells.length; i++ ) {
            $(cells[i]).
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
    .calendar-nav {
        width: 100%;
        border-collapse: separate;
        border: 0.05rem solid #aaa;
        border-radius: 0.3rem;
        border-spacing: 0;
        border-bottom-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
    }

    .calendar-nav thead {
        padding: 0;
        margin: 0;
    }

    .calendar-nav th {
        width: 14%;
        padding: 0;
        margin: 0;
        font-weight: normal !important;
        text-align: center;
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
        width: 14%;
        border-top: 0.05rem solid #aaa;
        border-right: 0.05rem solid #aaa;
        background-color: rgba(65, 198, 194, 0.0);
        transition: background-color 0.4s ease-out;

    }

    .calendar-nav td:last-of-type {
        border-right: none;
    }

    .cell-selected {
        background-color: rgba(65, 198, 194, 0.5);
    }
</style>
