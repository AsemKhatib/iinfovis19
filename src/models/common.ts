export type Daytime = 'Morning' | 'Noon' | 'Evening';

export interface Category {
    date: string;
}
export interface EntryGroup {
    daytime: Daytime;
}

export interface Entry {
    id?: string;
}