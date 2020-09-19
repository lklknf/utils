function randomInt(bottom, top) {
    return bottom + Math.floor(Math.random() * (top - bottom));
}

function getRandomLc() {
    const lower = 'a'.charCodeAt(0);
    const upper = 'z'.charCodeAt(0);
    return String.fromCharCode(randomInt(lower, upper));
}

function getRandomUc() {
    const lower = 'A'.charCodeAt(0);
    const upper = 'Z'.charCodeAt(0);
    return String.fromCharCode(randomInt(lower, upper));
}

function createRandomString(start, end) {
    const size = start + randomInt(start, end);
    const stringArray = new Array(size).fill(0);
    return stringArray.map(() => Math.random() > 0.5 ? getRandomLc() : getRandomUc()).join("");
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    randomInt,
    getRandomLc,
    getRandomUc,
    createRandomString,
};
