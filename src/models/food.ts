import { EntryGroup, Entry, General } from "./common";

export interface Food extends General {
    entryGroups: FoodEntryGroup[];
}

export interface FoodEntryGroup extends EntryGroup {
    entries: FoodEntry[];
}

export interface FoodEntry extends Entry {
    type: 'meat' | 'vegan' | 'vegetarian';
    size: 'snack' | 'fullMeal';
    place: 'home' | 'canteen' | 'resturant' | 'elsewhere';
}