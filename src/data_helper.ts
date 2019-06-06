import { Food, FoodEntryGroup, FoodType } from "./models/food";
import { Music, MusicEntryGroup } from "./models/music";
import { Socializing } from "./models/socializing";

export var food_json = [
    require("./../www/data/Data_Person1_Food.json"),
    require("./../www/data/Data_Person2_Food.json"),
    require("./../www/data/Data_Person3_Food.json"),
    require("./../www/data/Data_Person4_Food.json"),
    require("./../www/data/Data_Person5_Food.json"),
    require("./../www/data/Data_Person6_Food.json")
];

export var music_json = [
    require("./../www/data/Data_Person1_Music.json"),
    require("./../www/data/Data_Person2_Music.json"),
    require("./../www/data/Data_Person3_Music.json"),
    require("./../www/data/Data_Person4_Music.json"),
    require("./../www/data/Data_Person5_Music.json"),
    require("./../www/data/Data_Person6_Music.json")
];

export var socializing_json = [
    require("./../www/data/Data_Person1_Socializing.json"),
    require("./../www/data/Data_Person2_Socializing.json"),
    require("./../www/data/Data_Person3_Socializing.json"),
    require("./../www/data/Data_Person4_Socializing.json"),
    require("./../www/data/Data_Person5_Socializing.json"),
    require("./../www/data/Data_Person6_Socializing.json")
];

let person_all: boolean[] = [true, true, true, false, false, false];
let days_all: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];

var food_data: Array<Array<Food>> = [];
var music_data: Array<Array<Music>> = [];
var socializing_data: Array<Array<Socializing>> = [];

export function read_all_data() {
    for ( var i = 0; i < food_json.length; i++ ) {
        let food_array = food_json[i] as Array<Food>;
        food_data.push(food_array);
    }

    for ( var i = 0; i < music_json.length; i++ ) {
        let music_array = music_json[i] as Array<Music>;
        music_data.push(music_array);
    }

    for ( var i = 0; i < socializing_json.length; i++ ) {
        let socializing_array = socializing_json[i] as Array<Socializing>;
        socializing_data.push(socializing_array);
    }
}

export function food_get_data(): Array<Array<Food>> {
    return food_data;
}

export function music_get_data(): Array<Array<Music>> {
    return music_data;
}

export function socializing_get_data(): Array<Array<Socializing>> {
    return socializing_data;
}

export function food_get_data_filtered_and_accumulated(personIndicies: boolean[], dayIndicies: boolean[]) {
    let data = food_get_data();
    let filtered_by_person: Array<Array<Food>> = [];
    
    for ( var i = 0; i < data.length; i++ ) {
        if ( personIndicies[i] ) {
            filtered_by_person.push(data[i]);
        }
    }

    if ( filtered_by_person.length > 0 ) {
        let firs_set = filtered_by_person[0];

        let new_data: Array<Food> = [];
        for ( var day = 0; day < firs_set.length; day++ ) {
            let day_food = { date: firs_set[day].date, entryGroups: []} as Food;
            
            for ( var entryGroup = 0; entryGroup < firs_set[day].entryGroups.length; entryGroup++ ) {
                let day_entry_group = {daytime: firs_set[day].entryGroups[entryGroup].daytime, entries: []} as FoodEntryGroup;

                for ( var sets = 0; sets < filtered_by_person.length; sets++ ) {
                    let set_entry_group = filtered_by_person[sets][day].entryGroups[entryGroup];
                    for ( var set_entry = 0; set_entry < set_entry_group.entries.length; set_entry++ ) {
                        day_entry_group.entries.push(set_entry_group.entries[set_entry]);
                    }
                }

                day_food.entryGroups.push(day_entry_group);
            }

            new_data.push(day_food);
        }

        return new_data;
    } else {
        return [];
    }
}

export function food_get_data_filtered_and_accumulated_values_daywise(personIndicies: boolean[], dayIndicies: boolean[]): Record<string, Record<string, number>>[] {
    let filtered_data = food_get_data_filtered_and_accumulated(personIndicies, dayIndicies);

    if ( filtered_data !== undefined ) {
        let flattened_data: Record<string, Record<string, number>>[] = [];

        for ( var day = 0; day < filtered_data.length; day++ ) {
            let day_record = {
                "type" : {
                    "meatEater" : 0,
                    "vegetarian": 0,
                    "vegan" : 0
                },
                "size": {
                    "fullMeal" : 0,
                    "snack": 0
                },
                "place": {
                    "atHome" : 0,
                    "canteen": 0,
                    "restaurant": 0,
                    "somewhereElse" : 0
                }
            } as Record<string, Record<string, number>>;

            filtered_data[day].entryGroups.forEach(entryGroup => {
                entryGroup.entries.forEach(entry => {
                    day_record["type"][entry.type]++;
                    day_record["size"][entry.size]++;
                    day_record["place"][entry.place]++;
                });
            });

            flattened_data.push(day_record);
        }

        return flattened_data;
    } else {
        return [];
    }
}

export function food_get_daywise_major_food_type(personIndicies: boolean[]): FoodType[] {
    let flattened_data = food_get_data_filtered_and_accumulated_values_daywise(personIndicies, days_all);

    let types: FoodType[] = [];
    if ( flattened_data !== null ) {
        for ( var day = 0; day < flattened_data.length; day++ ) {
            let record = flattened_data[day];
            let n_meat = record["type"]["meatEater"];
            let n_vegetarian = record["type"]["vegetarian"];
            let n_vegan = record["type"]["vegan"];

            if ( n_meat >= n_vegetarian && n_meat >= n_vegan ) {
                types.push(FoodType.MEAT);
            } else if ( n_vegetarian >= n_meat && n_vegetarian >= n_vegan ) {
                types.push(FoodType.VEGETARIAN);
            } else {
                types.push(FoodType.VEGAN);
            }
        }
        if ( flattened_data.length == 0 ) {
            return [FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN, FoodType.UNKNOWN];
        }
    }
    return types;
}


export function test_food() {
    let test_person: boolean[] = [true, true, true, false, false, false];
    let test_days: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    //console.log(get_food_data());
    
    //console.log(get_food_data_filtered_and_accumulated(test_person, test_days));
    //console.log(food_get_data_filtered_and_accumulated_values_daywise(test_person, test_days));
    console.log(food_get_daywise_major_food_type(test_person));
    
}








export function music_get_data_filtered_and_accumulated(personIndicies: boolean[], dayIndicies: boolean[]) {
    let data = music_get_data();
    let filtered_by_music: Array<Array<Music>> = [];
    
    for ( var i = 0; i < data.length; i++ ) {
        if ( personIndicies[i] ) {
            filtered_by_music.push(data[i]);
        }
    }

    if ( filtered_by_music.length > 0 ) {
        let firs_set = filtered_by_music[0];

        let new_data: Array<Music> = [];
        for ( var day = 0; day < firs_set.length; day++ ) {
            let day_music = { date: firs_set[day].date, entryGroups: []} as Music;
            
            for ( var entryGroup = 0; entryGroup < firs_set[day].entryGroups.length; entryGroup++ ) {
                let day_entry_group = {daytime: firs_set[day].entryGroups[entryGroup].daytime, entries: []} as MusicEntryGroup;

                for ( var sets = 0; sets < filtered_by_music.length; sets++ ) {
                    let set_entry_group = filtered_by_music[sets][day].entryGroups[entryGroup];
                    for ( var set_entry = 0; set_entry < set_entry_group.entries.length; set_entry++ ) {
                        day_entry_group.entries.push(set_entry_group.entries[set_entry]);
                    }
                }

                day_music.entryGroups.push(day_entry_group);
            }

            new_data.push(day_music);
        }

        return new_data;
    } else {
        return [];
    }
}


export function music_get_data_filtered_and_accumulated_values_daywise(personIndicies: boolean[], dayIndicies: boolean[]): Record<string, Record<string, number>>[] {
    let filtered_data = music_get_data_filtered_and_accumulated(personIndicies, dayIndicies);

    if ( filtered_data !== undefined ) {
        let flattened_data: Record<string, Record<string, number>>[] = [];

        for ( var day = 0; day < filtered_data.length; day++ ) {
            let day_record = {
                "duration" : {
                    "<10min" : 0,
                    "10-30min": 0,
                    "30-60min" : 0,
                    ">60min" : 0
                },
                "activity": {

                },
                "contentType": {
                    "music" : 0,
                    "podcasts" : 0,
                    "audiobook" : 0,
                    "other" : 0
                },
                "medium": {
                    "streaming" : 0,
                    "radio" : 0,
                    "tv" : 0,
                    "vinyl" : 0,
                    "other" : 0
                },
                "intention": {
                    "concentration" : 0,
                    "relaxing" : 0,
                    "passive" : 0,
                    "party" : 0,
                    "other" : 0
                }
            } as Record<string, Record<string, number>>;

            filtered_data[day].entryGroups.forEach(entryGroup => {
                entryGroup.entries.forEach(entry => {
                    let dur = entry.duration.toString();
                    if ( dur === "10-60min" ) {
                        day_record["duration"]["30-60min"]++;
                    } else {
                        day_record["duration"][entry.duration]++;
                    }

                    day_record["contentType"][entry.contentType]++;
                    day_record["medium"][entry.medium]++;
                    day_record["intention"][entry.intention]++;

                    if ( day_record["activity"][entry.activity] == undefined ) {
                        day_record["activity"][entry.activity] = 0;
                    }
                    day_record["activity"][entry.activity]++;
                });
            });

            flattened_data.push(day_record);
        }

        return flattened_data;
    } else {
        return [];
    }
}

function duration_to_value(duration: string): number {
    if ( duration === "<10min" ) return 5;
    else if ( duration === "10-30min" ) return 20;
    else if ( duration == "30-60min" ) return 45;
    else if ( duration == ">60min" ) return 80;
    else return 0;
}

export function music_get_percentages(personIndicies: boolean[]): number[] {
    let data = music_get_data_filtered_and_accumulated_values_daywise(personIndicies, days_all);
    let scores: number[] = [];
    let percentages: number[] = [];
    let max = 0;
    if ( data.length == 0 ) {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    for ( var day = 0; day < data.length; day++ ) {
        let sum = 0;
        sum += duration_to_value("<10min")*data[day]["duration"]["<10min"];
        sum += duration_to_value("10-30min")*data[day]["duration"]["10-30min"];
        sum += duration_to_value("30-60min")*data[day]["duration"]["30-60min"];
        sum += duration_to_value(">60min")*data[day]["duration"][">60min"];

        if ( sum > max ) max = sum;
        scores.push(sum);
    }

    max+=1;
    for ( var i = 0; i < scores.length; i++ ) {
        percentages.push(scores[i]/max);
    }

    return percentages;
}

export function test_music() {
    let test_person: boolean[] = [true, true, true, false, false, false];
    let test_days: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    
}