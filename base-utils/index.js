function isValidEmail(email){
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

function blankIfNull(value, postfix = '') {
    return value === null ? '' : value + postfix;
}

function blankIfNonValue(value, prefix = '') {
    return value === null || value === undefined ? '' : prefix + value;
}

function isEmptyValue(objectElement) {
    return objectElement === '' || objectElement === null || objectElement === undefined;
}

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function isValidDate(date) {
    return Date.parse(date);
}

function sortArrayObjects(array, key, order = 'asc', priorityKey = null) {
    return array.sort((a, b) => {
        if (priorityKey && a[priorityKey]) {
            return -1;
        }

        if (priorityKey && b[priorityKey]) {
            return 1;
        }

        if (a[key] === null || a[key] < b[key]) {
            return order === 'asc' ? -1 : 1;
        } else if (b[key] === null || a[key] > b[key]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function createObjectWithArrayValues(array, key) {
    let object = {};
    array.forEach(value => {
        object[value[key]] = value;
    });
    return object;
}

function deNormalize(object, ...subKeys) {
    if (!object) {
        return false;
    }
    return Object.keys(object).map(key => {
        let value = object[key];
        subKeys.forEach(subKey => {
            value = value[subKey];
        });
        return value;
    });
}


function normalize(object, idKey = 'id') {
    return createObjectWithArrayValues(object, idKey)
}

function callIfExists(callback, ...args) {
    if (callback) {
        callback(...args);
    }
}

function objectsEqual(x, y) {
    if (x === y) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (x.constructor !== y.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in x) {
        if (!x.hasOwnProperty(p)) continue;
        // other properties were tested using x.constructor === y.constructor

        if (!y.hasOwnProperty(p)) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if (x[p] === y[p]) continue;
        // if they have the same strict value or identity then they are equal

        if (typeof (x[p]) !== "object") return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if (!objectsEqual(x[p], y[p])) return false;
        // Objects and Arrays must be tested recursively
    }

    for (p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
        // allows x[ p ] to be set to undefined
    }
    return true;
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    isValidEmail,
    objectsEqual,
    callIfExists,
    isValidDate,
    getRandomElement,
    isNormalInteger,
    isEmptyValue,
    sortArrayObjects,
    getTimeBetweenDates: require('./time-utils').getTimeBetweenDates,
    blankIfNull,
    blankIfNonValue,
    StorageService: require('./Logger/StorageService'),
    shuffleArray,
    createObjectWithArrayValues,
    deNormalize,
    normalize: normalize,
    sleep: require('./sleep'),
    Timer: require('./Timer'),
    EventEmitter: require('./EventEmitter'),
    search: require('./object-searcher/object-searcher'),
    Color: require('./color'),
};
