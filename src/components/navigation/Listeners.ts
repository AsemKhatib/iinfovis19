export interface CalendarNavigationIndiciesChangedListener {
    fireDayIndicies(indicies: boolean[]): void;
}

export interface PersonNavigationIndiciesChangedListener {
    firePersonIndicies(indicies: boolean[]): void;
}