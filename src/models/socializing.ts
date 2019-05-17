import { General, EntryGroup, Entry } from "./common";

export interface Socializing extends General {
    entryGroups: SocializingEntryGroup[];
}

export interface SocializingEntryGroup extends EntryGroup {
    entries: SocializingEntry[];
}

export interface SocializingEntry extends Entry {
    duration: '<1h' | '1h-2h' | '2h-4h';
    personAmount: '1' | '2' | '3-4' | '4-10' | '>10';
    personsType: 'friends' | 'family' | 'partner' | 'flatmates' | 'colleagues' | 'mixed';
}