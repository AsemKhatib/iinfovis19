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

    fireDayIndicies(dayFlagIndicies: boolean[]) {
        console.log("DaysChanged in SocializingComponent");
        console.log(dayFlagIndicies);
    }

    firePersonIndicies(personFlagIndicies: boolean[]) {
        console.log("PersonsChanged in SocializingComponent");
        console.log(personFlagIndicies);
    }

}
</script>

<!-- (S)CSS content -->
<style>

</style>
