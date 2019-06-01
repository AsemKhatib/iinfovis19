import { EntryGroup, Entry, Category } from "./common";

export interface Music extends Category {
    entryGroups: MusicEntryGroup[];
}

export interface MusicEntryGroup extends EntryGroup {
    entries: MusicEntry[]; 
}

export interface MusicEntry extends Entry {
    duration: '<10min' | '10-30min' | '30-60min' | '>60min';
    activity: string;
    contentType: 'music' | 'podcast' | 'audiobook' | 'other';
    medium: 'streaming' | 'radio' | 'tv' | 'vinyl' | 'other';
    intention: 'concentration' | 'relaxing' | 'passive' | 'party' | 'other';
}