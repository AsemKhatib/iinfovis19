<!-- HTML Content -->
<template>
    <div v-touch:swipe.left="changeContent" v-touch:swipe.right="changeContent">
        <transition-group name="fade" mode="out-in">
            <div v-show="showBubbles" key="bubbles">
                <div class="chart-container" >
                    <div class="third-row ">
                        <div class="cell-subtitle">Duration</div>
                        <div class="cell-padding">
                            <bubble-chart ref="socDurationChart"/>
                        </div>
                        
                    </div>
                    <div class="third-row bg-gray">
                        <div class="cell-subtitle">With whom?</div>
                        <div class="cell-padding">
                            <bubble-chart ref="socTypeChart"/>
                        </div>
                        
                    </div>
                    <div class="third-row ">
                        <div class="cell-subtitle">Amount of people</div>
                        <div class="cell-padding">
                            <bubble-chart ref="socAmountChart"/>
                        </div>
                        
                    </div>
                        
                        <percentage-navigation-component ref="nav"/>
                    </div>
            </div>
            <div v-show="!showBubbles" key="time">
                hello world
            </div>
        </transition-group>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PercentageNavigationComponent from "./navigation/PercentageNavigation.vue";
import BubbleChart from "./vis/BubbleChart.vue";

import { CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener} from "./navigation/Listeners";
import {socializing_get_percentages, socializing_get_data_filtered_and_accumulated_values_daywise, remove_empty_values, compressed_records_to_bubble_chart_data, compress_records} from "./../data_helper";

@Component({
    components: {PercentageNavigationComponent, BubbleChart}
})
export default class SocializingComponent extends Vue implements CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener {
    nav: PercentageNavigationComponent | null = null;

    chart_duration: BubbleChart | null = null;
    chart_type: BubbleChart | null = null;
    chart_amount: BubbleChart | null = null;

    showBubbles = true;

    mounted() {
        this.$nextTick(function() {  
            this.nav = this.$refs.nav as PercentageNavigationComponent;
            this.chart_duration = this.$refs.socDurationChart as BubbleChart;
            this.chart_type = this.$refs.socTypeChart as BubbleChart;
            this.chart_amount = this.$refs.socAmountChart as BubbleChart;

            this.nav.addCalendarNavigationIndiciesChangedListener(this);
            this.nav.addPersonNavigationIndiciesChangedListener(this);
        });
    }

    updateData() {
        if ( this.nav !== null && this.chart_type !== null &&
             this.chart_duration !== null && this.chart_amount !== null ) {

            let filtered_data = socializing_get_data_filtered_and_accumulated_values_daywise(
                this.nav.getSelectedPersonIndicies(),
                this.nav.getSelectedDayIndicies()
            );

            let data = remove_empty_values(compressed_records_to_bubble_chart_data(compress_records(filtered_data)));
            
            console.log(data);

            this.chart_duration.setData(data["duration"]);
            this.chart_type.setData(data["personsType"]);
            this.chart_amount.setData(data["personAmount"]);
        }        
    }

    fireDayIndicies(dayFlagIndicies: boolean[]) {
        this.updateData();
    }

    firePersonIndicies(personFlagIndicies: boolean[]) {
        if ( this.nav !== null ) {
            this.nav.setPercentages(socializing_get_percentages(personFlagIndicies));
        }
        this.updateData();
    }

    changeContent() {
        this.showBubbles = !this.showBubbles;
    }

}
</script>

<!-- (S)CSS content -->
<style>
.third-row {
    width: 100%;
    height: 33.33%;
    box-sizing: border-box;
    
}

.chart-container {
    display: block;
    width: 100%;
    height: 100vh;
}
</style>
