import QRCode from 'qrcode';

export const generateQRCode = (text, elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    QRCode.toCanvas(element, text, { width: 320, height: 320 }, (error) => {
      if (error) console.error(error);
    });
  } else {
    console.error(`Element with id ${elementId} not found.`);
  }
};

export const generateRandomString = (length) => {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const divideAndRemainder = (numberStr, divisor) => {
  let result = '';
  let remainder = 0;

  for (let i = 0; i < numberStr.length; i++) {
    const digit = Number(numberStr[i]) + remainder * 10;
    const quotient = Math.floor(digit / divisor);
    remainder = digit % divisor;
    result += quotient.toString();
  }

  return [result.replace(/^0+/, ''), remainder];
};

export const toBaseN = (decimalNumberStr) => {
  const baseDigits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!%()*+,-./:;<=>?[]^_`{|}~";
  const base = 87;

  if (base > baseDigits.length) {
    throw new Error("Base must not exceed the length of the digit set.");
  }
  if (decimalNumberStr === '0') {
    return "0";
  }

  let numStr = decimalNumberStr;
  let baseN = '';

  while (numStr !== '') {
    const [quotientStr, remainder] = divideAndRemainder(numStr, base);
    baseN = baseDigits[remainder] + baseN;
    numStr = quotientStr;
  }

  return baseN;
};
