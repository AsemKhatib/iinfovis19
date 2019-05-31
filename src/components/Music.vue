<!-- HTML Content -->
<template>
    <div>
        <!-- Example content -->
        <center>
            Music Component
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
export default class MusicComponent extends Vue {

    mounted() {
        this.$nextTick(function() {        
            (this.$refs.nav as PercentageCalendarNavigationComponent).setPercentages([0.05, 0.08, 0.12, 0.2, 0.08, 0.6, 0.2, 0.0, 0.3, 1.0, 0.2, 0.05, 0.5, 0.02]);
        });
    }

}
</script>

<!-- (S)CSS content -->
<style>
.greeting {
    font-size: 20px;
}
</style>
