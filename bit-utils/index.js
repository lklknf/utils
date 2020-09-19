
function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function bytesToHex(bytes) {
    let hex = [];
    for (let i = 0; i < bytes.length; i++) {
        let current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join('');
}

function stringToUtf8ByteArray(str) {
    // TODO(user): Use native implementations if/when available
    let out = [], p = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        } else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        } else if (
            ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
            ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        } else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
}


/**
 * Converts a UTF-8 byte array to JavaScript's 16-bit Unicode.
 * @param {Uint8Array|Array<number>} bytes UTF-8 byte array.
 * @return {string} 16-bit Unicode string.
 */
function utf8ByteArrayToString(bytes) {
    // TODO(user): Use native implementations if/when available
    let out = [], pos = 0, c = 0;
    while (pos < bytes.length) {
        let c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        } else if (c1 > 191 && c1 < 224) {
            let c2 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
        } else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            let c2 = bytes[pos++];
            let c3 = bytes[pos++];
            let c4 = bytes[pos++];
            let u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
                0x10000;
            out[c++] = String.fromCharCode(0xD800 + (u >> 10));
            out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
        } else {
            let c2 = bytes[pos++];
            let c3 = bytes[pos++];
            out[c++] =
                String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        }
    }
    return out.join('');
}

function binaryToBytes(binaryString) {
    let bytes = [];
    const ceil8th = Math.ceil(binaryString.length/8) * 8;
    const padding = ceil8th - binaryString.length;
    binaryString = "0".repeat(padding) + binaryString;
    for (let c = 0; c < binaryString.length; c += 8)
        bytes.push(parseInt(binaryString.substr(binaryString.length -8 -c, 8), 2));
    return bytes;
}

function getBit(byte, position)
{
    return (byte >> position) & 1;
}

function createBitMask(width) {
    // noinspection JSSuspiciousNameCombination
    return Math.pow(2, width) - 1;
}

function getBits(byte, start, end)
{
    return (byte >> start) & createBitMask(end - start);
}

function clearBits(byte, start,end){
    return byte & ((createBitMask(end - start)<< start) ^ createBitMask(31));
}

function setBits(byte, start, binaryString)
{
    const valueToSet = parseInt(binaryString,2);
    byte = clearBits(byte, start, start + binaryString.length);
    return (valueToSet << start) | byte;
}

function setBit(int32, position, value){
    return value === 1 ? int32 | (1 << position) : int32 & ~(1 << position)
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    createBitMask,
    binaryToBytes,
    bytesToHex,
    hexToBytes,
    stringToUtf8ByteArray,
    utf8ByteArrayToString,
    getBit,
    getBits,
    setBits,
    setBit
};
