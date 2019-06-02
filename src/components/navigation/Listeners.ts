export class CalendarNavigationIndiciesChangedListener {
    private handler: Function;

    constructor(handler: Function) {
        this.handler = handler;
    }

    public fire(indicies: boolean[]) {
        this.handler(indicies);
    }
}

export class PersonNavigationIndiciesChangedListener {
    private handler: Function;

    constructor(handler: Function) {
        this.handler = handler;
    }

    public fire(indicies: boolean[]) {
        this.handler(indicies);
    }
}