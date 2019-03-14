class DOMNodeCollection {
    constructor(elements) {
        this.elements = elements;
    }
    html(str) {
        if (str) {
            this.elements.forEach((node) => {
                node.innerHTML = str;
            });
        } else {
            return this.elements[0].innerHTML;
        }
    }
    empty() {
        this.elements.forEach((node => {
            node.innerHTML = "";
        }));
    }
    append(args) {
        if (args instanceof DOMNodeCollection) {
            args.elements.forEach( appending => {
                this.elements.forEach ( receiving => {
                    receiving.innerHTML = receiving.innerHTML.concat(appending.outerHTML);
                });
            });
        }

        // HTML el
        if (args instanceof HTMLElement) {
            this.elements.forEach( receiving => {
                receiving.innerHTML = receiving.innerHTML.concat(args.outerHTML);
            });
        }


        // string
        if (typeof args === "string") {
            this.elements.forEach( receiving => {
                receiving.innerHTML = receiving.innerHTML.concat(args);
            });
        }
    }

    attr(key, value) {
        if (value) {
            this.elements.forEach ( elements => elements.setAttribute(key, value) );
        } else {
            return this.elements[0].getAttribute(key);
        }

    }

    addClass(className) {
        this.elements.forEach( element => {
            element.classList.add(className);
        });
    }

    removeClass(className) {
        this.elements.forEach( element => {
            element.classList.remove(className);
        });
    }

    children() {
        let childrenArray = [];
        this.elements.forEach( element => {
            childrenArray = childrenArray.concat([...element.children]);
        });
        return new DOMNodeCollection([...childrenArray]);
    }

    parent() {
        let parentArray = [];
        this.elements.forEach( element => {
            parentArray = parentArray.concat([element.parentElement]);
        });
        return new DOMNodeCollection([...new Set(parentArray)]);
    }

    find(selector) {
        let matchArray = [];
        this.elements.forEach( element => {
            matchArray = matchArray.concat([...element.querySelectorAll(selector)]);
        });
        return new DOMNodeCollection([...matchArray]);
    }

    remove() {
        this.elements.forEach (element => {
            element.remove();
        });
    }

    on(event, callback) {
        this.elements.forEach( element => {
            element.addEventListener(event, callback);
            element[`${event}`] = callback;
        });
    }

    off(event) {
        this.elements.forEach( element => {
            element.removeEventListener(event, element[`${event}`]);
            delete element[`${event}`];
        });
    }
}

module.exports = DOMNodeCollection;
