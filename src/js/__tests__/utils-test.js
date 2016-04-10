import utils from '../utils';

describe('utils', () => {
    describe('ucfirst()', () => {
        it('should capitalize first letter', () => {
            expect(utils.ucfirst('test')).toBe('Test');
            expect(utils.ucfirst('TEST')).toBe('TEST');
            expect(utils.ucfirst('test test')).toBe('Test test');
        });
    });

    describe('generateRandomString()', () => {
        it('should generate random string', () => {
            const string1 = utils.generateRandomString(),
                string2 = utils.generateRandomString();

            expect(typeof string1).toBe('string');
            expect(string1.length).toBe(15);
            expect(string1).not.toBe(string2);
        });

        it('should generate random string with custom length', () => {
            const string1 = utils.generateRandomString(5);

            expect(string1.length).toBe(5);
        });
    });

    describe('getClosestWithClassName()', () => {
        it('should return closest parent with provided class name', () => {
            const grandparent = document.createElement('div'),
                parent = document.createElement('div'),
                child = document.createElement('div');

            grandparent.classList.add('grandparent');
            parent.classList.add('parent');

            parent.appendChild(child);
            grandparent.appendChild(parent);

            expect(utils.getClosestWithClassName(child, 'parent')).toBe(parent);
            expect(utils.getClosestWithClassName(child, 'grandparent')).toBe(grandparent);
            expect(utils.getClosestWithClassName(child, 'greatgrandparent')).toBeFalsy();
        });
    });

    describe('isChildOf()', () => {
        it('should return boolean if element is child of provided parent', () => {
            const grandparent = document.createElement('div'),
                parent = document.createElement('div'),
                child = document.createElement('div'),
                notRelative = document.createElement('div');

            grandparent.classList.add('grandparent');
            parent.classList.add('parent');

            parent.appendChild(child);
            grandparent.appendChild(parent);

            expect(utils.isChildOf(child, parent)).toBeTruthy();
            expect(utils.isChildOf(child, grandparent)).toBeTruthy();
            expect(utils.isChildOf(child, notRelative)).toBeFalsy();
        });
    });

    describe('getElementsByClassName()', () => {
        it('should return children with class name that belongs to provided elements', () => {
            const parent = document.createElement('div'),
                test = document.createElement('div'),
                test2 = document.createElement('div');
            test.classList.add('test');
            test2.classList.add('test2');

            parent.appendChild(test);
            document.body.appendChild(parent);
            document.body.appendChild(test2);

            expect(utils.getElementsByClassName([parent], 'test').length).toBe(1);
            expect(utils.getElementsByClassName([parent], 'test')[0]).toBe(test);
            expect(utils.getElementsByClassName([parent], 'test2').length).toBe(0);

            parent.remove();
            test2.remove();
        });
    });

    describe('getElementsByTagName()', () => {
        it('should return children with tag name that belongs to provided elements', () => {
            const parent = document.createElement('div'),
                test = document.createElement('div'),
                test2 = document.createElement('div');

            parent.appendChild(test);
            document.body.appendChild(parent);
            document.body.appendChild(test2);

            expect(utils.getElementsByTagName([parent], 'div').length).toBe(1);
            expect(utils.getElementsByTagName([parent], 'div')[0]).toBe(test);
            expect(utils.getElementsByTagName([parent], 'img').length).toBe(0);

            parent.remove();
            test2.remove();
        });
    });
});
