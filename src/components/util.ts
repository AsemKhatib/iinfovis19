export function addClickAndLongClickToElement(element: HTMLElement, clickHandler: Function, longClickHandler: Function | null, longClickTime: number) {

    element.addEventListener('touchstart', function(event){
        let timeout: number =-1;
        let touchEvent = event;

        function touchEnd(event: TouchEvent) {
            event.preventDefault();
            if ( timeout > 0 ) {
                clearTimeout(timeout);
                clickHandler(touchEvent);
            }
            if ( longClickHandler === null || longClickHandler === undefined ) {
                clickHandler(touchEvent);
            }
            clear();
        };

        function clear() {
            element.removeEventListener("touchend", touchEnd, true);
        }

        element.addEventListener("touchend", touchEnd, true);

        if ( longClickHandler !== null ) {
            timeout = setTimeout(function() { longClickHandler(touchEvent); timeout = -1; clear(); }, longClickTime);
        }
        touchEvent.preventDefault();
    }, true);

    element.addEventListener("mousedown", function(event) {
        let timeout: number =-1;
        let downEvent = event;

        function mouseUp(event: MouseEvent) {
            event.preventDefault();
            if ( timeout > 0 ) {
                clearTimeout(timeout);
                clickHandler(downEvent);
            }
            if ( longClickHandler === null || longClickHandler === undefined ) {
                clickHandler(downEvent);
            }
            clear();
        };

        function clear() {
            element.removeEventListener("mouseup", mouseUp, true);
        }

        element.addEventListener("mouseup", mouseUp, true);

        if ( longClickHandler !== null ) {
            timeout = setTimeout(function() { longClickHandler(downEvent); timeout = -1; clear(); }, longClickTime);
        }
        downEvent.preventDefault();
    }, true);
}
