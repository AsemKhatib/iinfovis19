<!-- HTML Content -->
<template>
    <div>
        <!-- Example content -->
        <center>
            Food Component
        </center>
        
        <food-calendar-navigation-component ref="nav"/>
        <person-selector-navigation-component ref="person-nav"/>
        
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FoodCalendarNavigationComponent from "./navigation/FoodCalendarNavigation.vue";
import PersonSelectorNavigationComponent from "./navigation/PersonSelectorNavigation.vue";

@Component({
    components: {FoodCalendarNavigationComponent, PersonSelectorNavigationComponent}
})
export default class FoodComponent extends Vue {

}
</script>

<!-- (S)CSS content -->
<style>
.greeting {
    font-size: 20px;
}
</style>
