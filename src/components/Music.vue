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
import {music_get_percentages} from "./../data_helper";

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

    fireDayIndicies(dayFlagIndicies: boolean[]) {
        console.log("DaysChanged in MusicComponent");
        console.log(dayFlagIndicies);
    }

    firePersonIndicies(personFlagIndicies: boolean[]) {
        console.log("PersonsChanged in MusicComponent");
        console.log(personFlagIndicies);
        if ( this.nav !== null ) {
            console.log(music_get_percentages(personFlagIndicies));
            this.nav.setPercentages(music_get_percentages(personFlagIndicies));
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
