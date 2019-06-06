export function addClickAndLongClickToElement(element: HTMLElement, clickHandler: Function, longClickHandler: Function, longClickTime: number) {
    element.addEventListener("mousedown", function(event) {
        let timeout: number =-1;
        let downEvent = event;

        function mouseUp() {
            if ( timeout > 0 ) {
                clearTimeout(timeout);
                clickHandler(downEvent);
            }
            clear();
        };

        function clear() {
            element.removeEventListener("mouseup", mouseUp, true);
        }

        element.addEventListener("mouseup", mouseUp, true);

        timeout = setTimeout(function() { longClickHandler(downEvent); timeout = -1; clear(); }, longClickTime);
    }, true);
}