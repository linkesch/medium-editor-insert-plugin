const utils = {
    ucfirst: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    generateRandomString: (length = 15) => {
        return Math.random().toString(36).substr(2, length);
    },

    getClosestWithClassName: (el, className) => {
        return MediumEditor.util.traverseUp(el, (element) => {
            return element.classList.contains(className);
        });
    },

    isChildOf: (el, parent) => {
        return MediumEditor.util.traverseUp(el, (element) => {
            return element === parent;
        }) ? true : false;
    },

    getElementsByClassName: (parents, className) => {
        const results = [];

        Array.prototype.forEach.call(parents, (editor) => {
            const elements = editor.getElementsByClassName(className);

            Array.prototype.forEach.call(elements, (element) => {
                results.push(element);
            });
        });

        return results;
    },

    getElementsByTagName: (parents, tagName) => {
        const results = [];

        Array.prototype.forEach.call(parents, (editor) => {
            const elements = editor.getElementsByTagName(tagName);

            Array.prototype.forEach.call(elements, (element) => {
                results.push(element);
            });
        });

        return results;
    }
};

export default utils;
