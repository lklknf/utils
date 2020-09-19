function normalize(item) {
    return (item + "").toLowerCase();
}

function search(object, item) {
    if (object && typeof object === 'object') {
        return Object.keys(object).map(key => {
            return search(object[key], item);
        }).filter(result => result).length > 0;

    } else if (Array.isArray(object)) {
        return object.map(element => {
            return search(element, item);
        }).filter(result => result).length > 0;
    } else if (typeof object === 'symbol') {
        return object.toString().toLowerCase().includes(item);
    } else if (object) {
        const result = (object + "");
        return typeof result === 'string' && result.toLowerCase().includes(item);
    }
    return false;
}

module.exports = function (object, item) {
    item = normalize(item);
    return search(object, item);
};
