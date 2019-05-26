
<!-- HTML Content -->
<template>
    <div>
        App Component:
        <div class="row">
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

@Component({
    components: {FoodComponent, MusicComponent, SocializingComponent}
})
export default class App extends Vue {

}
</script>

<!-- (S)CSS content -->
<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

</style>