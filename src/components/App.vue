
<!-- HTML Content -->
<template>
    <div>
        <!-- <parser-component></parser-component> -->

        <!-- PLEASE do not use row class of bootstrap -> contains negative margin -> makes working with our
             absolute movable navs harder !!!! -->
        <div class="my-row">
            <div class="col-md-12 col-lg-4">
                <food-component />
            </div>
            <div class="col-md-12 col-lg-4">
                <music-component />
            </div>
            <div class="col-md-12 col-lg-4">
                
                <socializing-component />
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

@Component({
    components: {FoodComponent, MusicComponent, SocializingComponent, ParserComponent}
})
export default class App extends Vue {

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