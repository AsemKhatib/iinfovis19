
<!-- HTML Content -->
<template>
    <div>

        <button @click="parse">parse</button>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";
import dataService from "../data.service";
import { Category } from "../models/common";
import { Food } from "../models/food";
import { Music } from "../models/music";
import { Socializing } from "../models/socializing";

@Component
export default class Parser extends Vue {

    parse() {
        dataService.getCSV().then(data => {
            const categoriesList: Music[] = [];
            const rows = data.data.split("\r\n")
                                .filter((ele:string) => ele !== ",,,,,,")
                                .map((el:any) => el.split(","));
            const firstRow = rows[0];
            rows.shift();

            let category: Music = {
                date: '',
                entryGroups: []
            };
            let groupIndex = -1;

            rows.forEach((el:any[], i:any) => {
                if(el[0] !== "") {
                    category = {
                        date: el[0],
                        entryGroups: []
                    }
                } else {
                    const nextRow = rows[i+1];
                    if(el[1] != "") {
                        category.entryGroups.push({
                            daytime: el[1],
                            entries: []
                        })
                        groupIndex = (groupIndex + 1) % 3;
                    }  else {
                        category.entryGroups[groupIndex].entries.push({
                            duration: el[2],
                            activity: el[3],
                            contentType: el[4],
                            medium: el[5],
                            intention: el[6]
                        });

                    }
                    if(!nextRow || nextRow[0] !== "") {
                        categoriesList.push(category);
                    }
                }
            });
            console.log(categoriesList)
        });
    }

}
</script>

<!-- (S)CSS content -->
<style>
</style>