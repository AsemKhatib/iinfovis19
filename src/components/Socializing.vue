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

@Component({
    components: {PercentageNavigationComponent}
})
export default class SocializingComponent extends Vue {

    mounted() {
        this.$nextTick(function() {       
            (this.$refs.nav as PercentageNavigationComponent).setPercentages([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]); 
        });
    }

}
</script>

<!-- (S)CSS content -->
<style>

</style>
