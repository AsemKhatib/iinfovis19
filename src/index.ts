import Vue from 'vue';
import AppComponent from "./components/App.vue";
import "snapsvg-cjs";
import Vue2TouchEvents from 'vue2-touch-events'
 
Vue.use(Vue2TouchEvents)

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
