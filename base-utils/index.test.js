const {isEmptyValue} = require('./index');
test('tests expected blank values', () => {
    expect(isEmptyValue(null)).toBe(true);
    expect(isEmptyValue(undefined)).toBe(true);
    expect(isEmptyValue("")).toBe(true);
});

test('tests expected non blank values', () => {
    expect(isEmptyValue(0)).toBe(false);
    expect(isEmptyValue('false')).toBe(false);
    expect(isEmptyValue(false)).toBe(false);
    expect(isEmptyValue(true)).toBe(false);
    expect(isEmptyValue('null')).toBe(false);
    expect(isEmptyValue('undefined')).toBe(false);
});
