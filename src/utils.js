// Base 87 digit set (87 unique characters)
let base87Digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!%()*+,-./:;<=>?[]^_`{|}~".slice(0, 87);

// Date input will be in format mmddyymmddyy
function convertor(dateInput) {
    let decimalInput = BigInt(dateInput);  // Convert dateInput to BigInt

    // Convert the decimalInput to a base 87 representation
    let base87RepresentationInput = toBaseN(decimalInput, 87, base87Digits);
    
    return base87RepresentationInput;
}

// Convert the decimalNumber to base N representation
function toBaseN(decimalNumber, base, baseDigits) {
    if (base > baseDigits.length) {
        throw new Error("Base must not exceed the length of the digit set.");
    }
    if (decimalNumber === 0n) { // Check for BigInt 0
        return "0";
    }
    let num = BigInt(decimalNumber);
    let baseN = '';

    while (num > 0n) {
        const remainder = Number(num % BigInt(base));
        baseN = baseDigits[remainder] + baseN;
        num /= BigInt(base);
    }
    return baseN;
}

export { convertor };
