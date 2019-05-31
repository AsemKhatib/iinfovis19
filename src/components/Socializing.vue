<!-- HTML Content -->
<template>
    <div>
        <center>
            Socializing Component
        </center>
        

        <percentage-calendar-navigation-component ref="nav"/>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PercentageCalendarNavigationComponent from "./navigation/PercentageCalendarNavigation.vue";

@Component({
    components: {PercentageCalendarNavigationComponent}
})
export default class SocializingComponent extends Vue {

    mounted() {
        this.$nextTick(function() {        
            (this.$refs.nav as PercentageCalendarNavigationComponent).setPercentages([0.05, 0.08, 0.12, 0.2, 0.38, 0.6, 0.9, 1.0, 0.75, 0.4, 0.2, 0.4, 0.1, 0.07]);
        });
    }

}
</script>

<!-- (S)CSS content -->
<style>

</style>
