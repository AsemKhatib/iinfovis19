<!-- HTML Content -->
<template>
    <div>
        <!-- Example content -->
        <center>
            Music Component
        </center>
        
        <percentage-navigation-component ref="nav"/>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PercentageNavigationComponent from "./navigation/PercentageNavigation.vue";

import { CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener} from "./navigation/Listeners";
import {music_get_percentages, music_get_data_filtered_and_accumulated_values_daywise} from "./../data_helper";

@Component({
    components: {PercentageNavigationComponent}
})
export default class MusicComponent extends Vue implements CalendarNavigationIndiciesChangedListener, PersonNavigationIndiciesChangedListener {
    nav: PercentageNavigationComponent | null = null;

    mounted() {
        let comp = this;
        this.$nextTick(function() {
            this.nav = this.$refs.nav as PercentageNavigationComponent;

            this.nav.addCalendarNavigationIndiciesChangedListener(this);
            this.nav.addPersonNavigationIndiciesChangedListener(this);

            (this.$refs.nav as PercentageNavigationComponent).setPercentages([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
        });
    }

    updateData() {
        if ( this.nav !== null ) {
            let filtered_data = music_get_data_filtered_and_accumulated_values_daywise(
                this.nav.getSelectedPersonIndicies(), this.nav.getSelectedDayIndicies());
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
</style>
