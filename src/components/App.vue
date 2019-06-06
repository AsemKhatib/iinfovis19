
<!-- HTML Content -->
<template>
    <div>
        <!-- PLEASE do not use row class of bootstrap -> contains negative margin -> makes working with our
             absolute movable navs harder !!!! -->
        <div class="my-row">
            <div class="col-md-12 col-lg-4">
                <food-component ref="food"/>
            </div>
            <div class="col-md-12 col-lg-4">
                <music-component ref="music"/>
            </div>
            <div class="col-md-12 col-lg-4">
                
                <socializing-component ref="socializing"/>
            </div>
        </div>

    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";
import FoodComponent from "./Food.vue";
import MusicComponent from "./Music.vue";
import SocializingComponent from "./Socializing.vue";
import ParserComponent from "../util/Parser.vue";
import FoodNavigationComponent from "./navigation/FoodNavigation.vue";
import PercentageNavigationComponent from "./navigation/PercentageNavigation.vue";
import { Socializing } from "../models/socializing";
import {read_all_data, test_food, test_music, test_soc} from "./../data_helper";


@Component({
    components: {FoodComponent, MusicComponent, SocializingComponent, ParserComponent}
})
export default class App extends Vue {

    mounted() {
        this.$nextTick(function() {

            // SUPER IMPORTANT !!!!
            read_all_data();
            // NEVER REMOVE !!!!


            let navFood = (this.$refs.food as FoodComponent).$refs.nav as FoodNavigationComponent;
            let navMusic = (this.$refs.music as MusicComponent).$refs.nav as PercentageNavigationComponent;
            let navSocializing = (this.$refs.socializing as SocializingComponent).$refs.nav as PercentageNavigationComponent;

            navFood.addOtherPercentageNavigationComponent(navMusic);
            navFood.addOtherPercentageNavigationComponent(navSocializing);

            navMusic.addOtherFoodNavigationComponent(navFood);
            navMusic.addOtherPercentageNavigationComponent(navSocializing);

            navSocializing.addOtherFoodNavigationComponent(navFood);
            navSocializing.addOtherPercentageNavigationComponent(navMusic);
        });
    }

}
</script>

<!-- (S)CSS content -->
<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;

}

.my-row {
    display: flex;
}
</style>