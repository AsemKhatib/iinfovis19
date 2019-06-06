<!-- HTML Content -->
<template>
    <div>
        <!-- Example content -->
        <center>
            Food Component
        </center>
        
        <food-navigation-component ref="nav"/>
        
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FoodNavigationComponent from "./navigation/FoodNavigation.vue";

import { CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener} from "./navigation/Listeners";
import { food_get_daywise_major_food_type } from "./../data_helper"; 

@Component({
    components: {FoodNavigationComponent}
})
export default class FoodComponent extends Vue
                implements CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener{
    nav: FoodNavigationComponent | null = null;

    mounted() {
        this.$nextTick(function() {
            this.nav = this.$refs.nav as FoodNavigationComponent;

            this.nav.addCalendarNavigationIndiciesChangedListener(this);
            this.nav.addPersonNavigationIndiciesChangedListener(this);
        });
    }

    fireDayIndicies(dayFlagIndicies: boolean[]) {
        console.log("DaysChanged in FoodComponent");
        console.log(dayFlagIndicies);
    }

    firePersonIndicies(personFlagIndicies: boolean[]) {
        console.log("PersonsChanged in FoodComponent");
        console.log(personFlagIndicies);

        if ( this.nav !== null ) {
            this.nav.setFoodTypes(food_get_daywise_major_food_type(personFlagIndicies));
        }
    
    }



}
</script>

<!-- (S)CSS content -->
<style>
.greeting {
    font-size: 20px;
}
</style>
