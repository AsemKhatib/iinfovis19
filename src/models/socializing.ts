import { Category, EntryGroup, Entry } from "./common";

export interface Socializing extends Category {
    entryGroups: SocializingEntryGroup[];
}

export interface SocializingEntryGroup extends EntryGroup {
    entries: SocializingEntry[];
}

export interface SocializingEntry extends Entry {
    duration: '<10min' | '10-30min' | '30-60min' | '>60min';
    personAmount: '1' | '2' | '3-4' | '4-10' | '>10';
    personsType: 'friends' | 'family' | 'partner' | 'flatmates' | 'colleagues' | 'mixed';
}