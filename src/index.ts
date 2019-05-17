import Vue from "vue";
import HelloComponent from "./examples/Hello.vue";
import HelloDecoratorComponent from "./examples/HelloDecorator.vue";
import MusicComponent from "./components/Music.vue";
import FoodComponent from "./components/Food.vue";
import SocializingComponent from "./components/Socializing.vue";
import SettingsComponent from "./components/Settings.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <hello-component :name="name" :initialEnthusiasm="5" />
        <h1>Hello Decorator Component</h1>
        <hello-decorator-component :name="name" :initialEnthusiasm="5" />
        </div>
    `,
    data: { name: "World" },
    components: {
        HelloComponent,
        HelloDecoratorComponent,
        MusicComponent,
        FoodComponent,
        SocializingComponent,
        SettingsComponent
    }
});
