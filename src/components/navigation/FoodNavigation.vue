<!-- HTML Content -->
<template>
    <div>
        <food-calendar-navigation-component ref="calendar-nav"/>
        <center>
            <div style="display: block; height: 2.5rem;">
                <svg height="100%" viewBox="0 0 100 100">
                <g>
                    <circle cx="50" cy="50" r="45" fill="#FDFDFD" stroke-width="4" stroke="#000" />
                    <circle cx="50" cy="50" r="10" fill="#000" />
                </g>
            </svg>
            </div>
        </center>
        <person-selector-navigation-component ref="person-nav"/>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import FoodCalendarNavigationComponent from "./FoodCalendarNavigation.vue";
import PersonSelectorNavigationComponent from "./PersonSelectorNavigation.vue";

@Component({
    components: {FoodCalendarNavigationComponent, PersonSelectorNavigationComponent}
})
export default class FoodNavigationComponent extends Vue {

    mounted() {
        this.$nextTick(function() {

        });
    }

}
    
</script>

<!-- (S)CSS content -->
<style>
  
</style>
