import Vue from 'vue';
import AppComponent from "./components/App.vue";
import "snapsvg-cjs";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <app-component />
    </div>
    `,
    components: {
        AppComponent
    }
});
