export default {
    ucfirst: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    generateRandomString: (length = 15) => {
        return Math.random().toString(36).substr(2, length + 2);
    },

    getClosestWithClassName: (el, className) => {
        return MediumEditor.util.traverseUp(el, (element) => {
            return element.classList.contains(className);
        });
    },

    hasParent: (el, parent) => {
        return MediumEditor.util.traverseUp(el, (element) => {
            return element === parent;
        }) ? true : false;
    }
};
