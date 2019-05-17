export type Daytime = 'Morning' | 'Noon' | 'Evening';

export interface General {
    date: Date;
}
export interface EntryGroup {
    daytime: Daytime;
}

export interface Entry {
    id?: string;
}