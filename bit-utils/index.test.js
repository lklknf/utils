const {getBits, setBits} = require('./index');

test('tests getBits', () => {
    const result = parseInt('1100 0110 0101 0100'.replace(/\s/g,''),2);
    expect((getBits(result,14,16)).toString(2)).toBe('11');
    expect((getBits(result,9,11)).toString(2)).toBe('11');
    expect((getBits(result,4,7)).toString(2)).toBe('101');
    expect((getBits(result,2,3)).toString(2)).toBe('1');
});

test('tests setBits', () => {
    let result = parseInt('1100 0110 0101 0100'.replace(/\s/g,''),2);
    result = setBits(result, 14, '01');
    expect((getBits(result,14,16)).toString(2)).toBe('1');
    result = setBits(result, 4, '0101');
    expect((getBits(result,4,8)).toString(2)).toBe('101');

    const byteArray =  new Uint32Array(1);
    result = setBits(byteArray, 0, '1'.repeat(11));
    expect((getBits(result,4,10)).toString(2)).toBe('1'.repeat(6));
});

test('tests setBits longer input', () => {
    const byteArray =  new Uint32Array(1);
    const result = setBits(byteArray, 0, '1'.repeat(11));
    expect((getBits(result,4,10)).toString(2)).toBe('1'.repeat(6));
});
