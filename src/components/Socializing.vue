<!-- HTML Content -->
<template>
    <div>
        <center>
            Socializing Component
        </center>
        
        <percentage-navigation-component ref="nav"/>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PercentageNavigationComponent from "./navigation/PercentageNavigation.vue";

import { CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener} from "./navigation/Listeners";
import {socializing_get_percentages, socializing_get_data_filtered_and_accumulated_values_daywise} from "./../data_helper";

@Component({
    components: {PercentageNavigationComponent}
})
export default class SocializingComponent extends Vue implements CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener {
    nav: PercentageNavigationComponent | null = null;

    mounted() {
        this.$nextTick(function() {  
            this.nav = this.$refs.nav as PercentageNavigationComponent;

            this.nav.addCalendarNavigationIndiciesChangedListener(this);
            this.nav.addPersonNavigationIndiciesChangedListener(this);
                 
            (this.$refs.nav as PercentageNavigationComponent).setPercentages([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]); 
        });
    }

    updateData() {
        if ( this.nav !== null ) {
            let filtered_data = socializing_get_data_filtered_and_accumulated_values_daywise(
                this.nav.getSelectedPersonIndicies(), this.nav.getSelectedDayIndicies());
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

}
</script>

<!-- (S)CSS content -->
<style>

</style>
