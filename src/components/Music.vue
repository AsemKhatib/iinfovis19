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

@Component({
    components: {PercentageNavigationComponent}
})
export default class MusicComponent extends Vue {

    mounted() {
        let comp = this;
        this.$nextTick(function() {
            //(this.$refs.nav as PercentageNavigationComponent).$emit('setPercentages', [0.05, 0.08, 0.12, 0.2, 0.38, 0.6, 0.9, 1.0, 0.75, 0.4, 0.2, 0.4, 0.1, 0.07]);
            (this.$refs.nav as PercentageNavigationComponent).setPercentages([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
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
