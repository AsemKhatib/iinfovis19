<!-- HTML Content -->
<template>
    <div style="padding: 1rem;">
        <table class="person-nav noselect">
            <thead>
                <tr>
                    <th class="person cell-selected">all</th>
                    <th class="person cell-selected">Ahmad</th>
                    <th class="person cell-selected">Anna-Lena</th>
                    <th class="person cell-selected">Asem</th>
                    <th class="person cell-selected">Lars</th>
                    <th class="person cell-selected">Peter</th>
                    <th class="person cell-selected">Xenia</th>                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td class="person-selector cell-selected"></td>
                    <td class="person-selector cell-selected"></td>
                    <td class="person-selector cell-selected"></td>
                    <td class="person-selector cell-selected"></td>
                    <td class="person-selector cell-selected"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import * as SNAPSVG_TYPE from "snapsvg";

declare var Snap: typeof SNAPSVG_TYPE;

@Component
export default class PersonSelectorNavigationComponent extends Vue {
    

    mounted() {
        this.$nextTick(function() {
            this.setupGestures();
            
        });
    }

    

    private setupGestures() {

    }
}
</script>

<!-- (S)CSS content -->
<style>
    .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
    }

    .person-nav {
        width: 100%;
        border-collapse: separate;
        border: 0.1rem solid #000;
        border-radius: 0.3rem;
        border-spacing: 0;
        border-bottom-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        overflow: hidden;
        font-size: 0.8rem;
    }

    .person-nav thead {
        padding: 0;
        margin: 0;
    }

    .person-nav th {
        width: 14.27%;
        padding: 0;
        margin: 0;
        font-weight: normal !important;
        text-align: center;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        background-color: rgb(239, 26, 103, 0.0);
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
    }

    .person-nav th:hover {
        cursor: pointer;
    }

    .person-nav th.cell-selected {
        color: white !important;
    }

    .person-nav th {
        border-right: 0.05rem solid #000;
    }

    .person-nav th:last-of-type {
        border-right: none;
    }

    .person-nav td {
        padding: 0;
        margin: 0;
        width: 12.495%;
        border-top: 0.05rem solid #000;
        border-right: 0.05rem solid #000;
        background-color: rgb(239, 26, 103, 0.0);
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
        text-align: center;
    }

    .person-nav td.cell-selected {
        color: white !important;
    }

    .person-nav td:hover {
        cursor: pointer;
    }

    .person-nav td:last-of-type {
        border-right: none;
    }

    .cell-selected {
        background-color: rgb(239, 26, 103, 0.75) !important;
    }
</style>
