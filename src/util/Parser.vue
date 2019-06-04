
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
import { Food, FoodEntry } from "../models/food";
import { Music, MusicEntry } from "../models/music";
import { Socializing, SocializingEntry } from "../models/socializing";

@Component
export default class Parser extends Vue {
    // broswer can't download more than 9 files at the same time -> 2 lists
    names1: string[] = ['Person1', 'Person2', 'Person3'];
    names2: string[] = ['Person4', 'Person5', 'Person6'];
    categories: string[] = ['Food', 'Music', 'Socializing'];

    parse() {
        const promises: Promise<any>[] = [];
        // this.names1.forEach(name => {
        this.names2.forEach(name => {
            this.categories.forEach(cat => {
                const fileName = name + ' - ' + cat;
                dataService.getCSV(fileName).then(csv => {
                    const categoriesList: Category[] = [];
                    const rows = csv.data.split("\r\n")
                                        .filter((el:string) => el !== ",,,,,," && el !== ",,,,")
                                        .map((el:any) => el.split(","));
                    rows.shift();

                    let category: any = {
                        date: '',
                        entryGroups: []
                    };
                    let groupIndex = -1;

                    rows.forEach((row:any[], i:any) => {
                        if(row[0] !== "") {
                            category = {
                                date: row[0],
                                entryGroups: []
                            }
                        } else {
                            const nextRow = rows[i+1];
                            if(row[1] != "") {
                                category.entryGroups.push({
                                    daytime: row[1],
                                    entries: []
                                })
                                groupIndex = (groupIndex + 1) % 3;
                            }  else {
                                if(cat === 'Music') {
                                    category.entryGroups[groupIndex].entries.push({
                                        duration: row[2],
                                        activity: row[3],
                                        contentType: row[4],
                                        medium: row[5],
                                        intention: row[6]
                                    } as MusicEntry);
                                } else if(cat === 'Food') {
                                    category.entryGroups[groupIndex].entries.push({
                                        type: row[2],
                                        size: row[3],
                                        place: row[4],
                                    } as FoodEntry);
                                } else if(cat === 'Socializing') {
                                    category.entryGroups[groupIndex].entries.push({
                                        duration: row[2],
                                        personAmount: row[3],
                                        personsType: row[4]
                                    } as SocializingEntry);
                                }
                            }
                            if(!nextRow || nextRow[0] !== "") {
                                categoriesList.push(category);
                            }
                        }
                    })
                    this.download(categoriesList, fileName);
                })
            })
        })
    }

    download(json:any, name:string) {
        const data = JSON.stringify(json, null, 2);
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = "Data_" + name.split(' - ')[0] + '_' + name.split(' - ')[1] + ".json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false);
        a.dispatchEvent(e);
    }
}
</script>

<!-- (S)CSS content -->
<style>
</style>