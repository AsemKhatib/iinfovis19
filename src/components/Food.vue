<!-- HTML Content -->
<template>
    <div v-touch:swipe.left="changeContent" v-touch:swipe.right="changeContent">
        <transition name="fade" mode="out-in" v-on:before-enter="beforeEnter">
            <div v-if="showBubbles" key="bubbles">
            <div class="chart-container">
            <div class="third-row ">
                <div class="cell-subtitle">Type of food</div>
                <div class="cell-padding">
                    <bubble-chart ref="foodTypeChart"/>
                </div>
                
            </div>
            <div class="third-row bg-gray">
                <div class="cell-subtitle">Meal size</div>
                <div class="cell-padding">
                    <bubble-chart ref="foodSizeChart"/>
                </div>
                
            </div>
            <div class="third-row ">
                <div class="cell-padding">
                    <div class="cell-subtitle">Where eaten?</div>
                    <bubble-chart ref="foodPlaceChart"/>
                </div>
                </div>

                <food-navigation-component ref="nav"/>

            </div>
            </div>
            <div v-else key="time">
                hello world
            </div>
        </transition>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FoodNavigationComponent from "./navigation/FoodNavigation.vue";
import BubbleChart from "./vis/BubbleChart.vue";

import { CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener} from "./navigation/Listeners";
import { compressed_records_to_bubble_chart_data, food_get_daywise_major_food_type, food_get_data_filtered_and_accumulated_values_daywise, compress_records, remove_empty_values } from "./../data_helper"; 

@Component({
    components: {FoodNavigationComponent, BubbleChart}
})
export default class FoodComponent extends Vue
                implements CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener{
    nav: FoodNavigationComponent | null = null;
    chart_type: BubbleChart | null = null;
    chart_size: BubbleChart | null = null;
    chart_place: BubbleChart | null = null;
    showBubbles = true;

    mounted() {
        this.$nextTick(function() {
            this.nav = this.$refs.nav as FoodNavigationComponent;
            this.chart_type = this.$refs.foodTypeChart as BubbleChart;
            this.chart_size = this.$refs.foodSizeChart as BubbleChart;
            this.chart_place = this.$refs.foodPlaceChart as BubbleChart;

            this.nav.addCalendarNavigationIndiciesChangedListener(this);
            this.nav.addPersonNavigationIndiciesChangedListener(this);

           
        });
    }

    updateData() {
        if ( this.nav !== null && this.chart_type !== null &&
             this.chart_size !== null && this.chart_place !== null ) {

            let filtered_data = food_get_data_filtered_and_accumulated_values_daywise(
                this.nav.getSelectedPersonIndicies(),
                this.nav.getSelectedDayIndicies()
            );

            let data = remove_empty_values(compressed_records_to_bubble_chart_data(compress_records(filtered_data)));
            
            this.chart_type.setData(data["type"]);
            this.chart_size.setData(data["size"]);
            this.chart_place.setData(data["place"]);
        }        
    }

    fireDayIndicies(dayFlagIndicies: boolean[]) {
        this.updateData();
    }

    firePersonIndicies(personFlagIndicies: boolean[]) {
        if ( this.nav !== null ) {
            this.nav.setFoodTypes(food_get_daywise_major_food_type(personFlagIndicies));
        }
        this.updateData();
    }

    changeContent() {
        this.showBubbles = !this.showBubbles;
    }

    beforeEnter() {
        if(this.showBubbles) {
            this.$nextTick(function() {
                this.nav = this.$refs.nav as FoodNavigationComponent;
                this.chart_type = this.$refs.foodTypeChart as BubbleChart;
                this.chart_size = this.$refs.foodSizeChart as BubbleChart;
                this.chart_place = this.$refs.foodPlaceChart as BubbleChart;

                this.nav.addCalendarNavigationIndiciesChangedListener(this);
                this.nav.addPersonNavigationIndiciesChangedListener(this);
            });
        }

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

</style>
