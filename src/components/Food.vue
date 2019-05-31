<!-- HTML Content -->
<template>
    <div>
        <!-- Example content -->
        <center>
            Food Component
        </center>
        
        <food-calendar-navigation-component ref="nav"/>
        
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FoodCalendarNavigationComponent from "./navigation/FoodCalendarNavigation.vue";

@Component({
    components: {FoodCalendarNavigationComponent}
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
