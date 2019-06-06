import { EntryGroup, Entry, Category } from "./common";

export interface Food extends Category {
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

export enum FoodType {
    MEAT = "MEAT",
    VEGETARIAN = "VEGETARIAN",
    VEGAN = "VEGAN",
    UNKNOWN = "UNKNOWN"
}