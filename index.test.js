const {getBit} = require('./index');
const {normalize, deNormalize} = require('./index');

function createBitObject(byte){
   const result = Array(8).fill(0).map((v,i) =>({id: i, bit: getBit(byte,i)}))
    return normalize((result));
}

test('creates a normalized map of bit values', () => {
    const result = createBitObject(5);
    expect(result[0].bit).toBe(1);
    expect(result[1].bit).toBe(0);
    expect(result[2].bit).toBe(1);
    expect(result[7].bit).toBe(0);
    const nSetbits = deNormalize(result).slice(3).filter(el => el.bit === 1).length;
    expect(nSetbits).toBe(0);
    console.log(result);
});
