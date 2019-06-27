<!-- HTML Content -->
<template>
    <div>
        <!-- Example content -->
        <div class="chart-container">
            <div class="third-row bg-gray">
                <div class="half-column my-border-right">
                    <div class="cell-subtitle">Duration</div>
                    <bubble-chart ref="musicDurationChart"/>
                </div>
                <div class="half-column ">
                    <div class="cell-subtitle">Intention</div>
                    <bubble-chart ref="musicIntentionChart"/>
                </div>
            </div>
            <div class="third-row">
                <div class="cell-subtitle">Activity while listening</div>
                <div class="cell-padding">
                    <bubble-chart ref="musicActivityChart"/>
                </div>
            </div>
            <div class="third-row bg-gray">
                <div class="half-column my-border-right">
                    <div class="cell-subtitle">Content type</div>
                    <bubble-chart ref="musicContentTypeChart"/>
                </div>
                <div class="half-column ">
                    <div class="cell-subtitle">Medium</div>
                    <bubble-chart ref="musicMediumChart"/>
                </div>
                
            </div>
        </div>        
        
        <percentage-navigation-component ref="nav"/>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PercentageNavigationComponent from "./navigation/PercentageNavigation.vue";
import BubbleChart from "./vis/BubbleChart.vue";

import { CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener} from "./navigation/Listeners";
import {music_get_percentages, music_get_data_filtered_and_accumulated_values_daywise, remove_empty_values, compressed_records_to_bubble_chart_data, compress_records} from "./../data_helper";

@Component({
    components: {PercentageNavigationComponent, BubbleChart}
})
export default class MusicComponent extends Vue implements CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener {
    nav: PercentageNavigationComponent | null = null;

    chart_duration: BubbleChart | null = null;
    chart_intention: BubbleChart | null = null;
    chart_activity: BubbleChart | null = null;
    chart_content_type: BubbleChart | null = null;
    chart_medium: BubbleChart | null = null;

    mounted() {
        let comp = this;
        this.$nextTick(function() {
            this.nav = this.$refs.nav as PercentageNavigationComponent;
            this.chart_duration = this.$refs.musicDurationChart as BubbleChart;
            this.chart_intention = this.$refs.musicIntentionChart as BubbleChart;
            this.chart_activity = this.$refs.musicActivityChart as BubbleChart;
            this.chart_content_type = this.$refs.musicContentTypeChart as BubbleChart;
            this.chart_medium = this.$refs.musicMediumChart as BubbleChart;

            this.nav.addCalendarNavigationIndiciesChangedListener(this);
            this.nav.addPersonNavigationIndiciesChangedListener(this);
        });
    }

    updateData() {
        if ( this.nav !== null && this.chart_duration !== null &&
             this.chart_intention !== null && this.chart_activity !== null &&
             this.chart_content_type !== null && this.chart_medium !== null ) {

            let filtered_data = music_get_data_filtered_and_accumulated_values_daywise(
                this.nav.getSelectedPersonIndicies(), this.nav.getSelectedDayIndicies());

            let data = remove_empty_values(compressed_records_to_bubble_chart_data(compress_records(filtered_data)));
            
            this.chart_duration.setData(data["duration"]);
            this.chart_intention.setData(data["intention"]);
            this.chart_activity.setData(data["activity"]);
            this.chart_content_type.setData(data["contentType"]);
            this.chart_medium.setData(data["medium"]);
        }        
    }

    fireDayIndicies(dayFlagIndicies: boolean[]) {
        this.updateData();
    }

    firePersonIndicies(personFlagIndicies: boolean[]) {
        if ( this.nav !== null ) {
            this.nav.setPercentages(music_get_percentages(personFlagIndicies));
        }
        this.updateData();
    }

}
</script>

<!-- (S)CSS content -->
<style>
.greeting {
    font-size: 20px;
}

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

.half-column {
    display: inline-block;
    width: calc(49%);
    height: 100%;
    height: calc(100% - 1.8rem);
    padding: 2rem;
}

.my-border-right {
    border-right: 0.08rem solid rgb(210, 210, 210) !important;
}
</style>
