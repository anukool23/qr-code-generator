import QRCode from 'qrcode';

export const generateQRCode = (text, elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    QRCode.toCanvas(element, text, { width: 320, height: 320 }, (error) => {
      if (error) console.error(error);
    });
  }
};

export const generateRandomString = (length) => {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * 10));
  }
  return result;
};
