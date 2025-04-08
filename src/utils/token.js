const axios = require('axios');

function generateISTTimestamp13Digit() {
    const currentDate = new Date();
    const istTimestamp = new Date(
      currentDate.getTime() + currentDate.getTimezoneOffset() * 60000 + 5.5 * 3600000
    );
    const timestampMilliseconds = istTimestamp.getTime();
    const thirteenDigitTimestamp = timestampMilliseconds.toString().padEnd(13, '0');
  
    return thirteenDigitTimestamp;
}

let data = JSON.stringify({
  "app_code": "packaging_app",
  "app_version": "9.2",
  "mobile": "9711907767",
  "timestamp": `${generateISTTimestamp13Digit()}`
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://qa-delivery.countrydelight.in/api/auth/v1/login/otp/?app_version=9.2',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'AWSALB=4BVOhRdiFEDr7GlkdzgqAPAqa2la6gVfjTxlMu8B1pjmn0hvumGEc8KIxPeRSiiJ4VfDTr54vfoDw1BaM+bf79WA8W7vh4ZO0K5VpZRNFlvKbZXfCPdaoGLzCo48; AWSALBCORS=4BVOhRdiFEDr7GlkdzgqAPAqa2la6gVfjTxlMu8B1pjmn0hvumGEc8KIxPeRSiiJ4VfDTr54vfoDw1BaM+bf79WA8W7vh4ZO0K5VpZRNFlvKbZXfCPdaoGLzCo48'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log('OTP Request ID:', JSON.stringify(response.data.id));
  const requestId = response.data.id;

  // Now send the OTP verification request
  let data1 = JSON.stringify({
    "app_version": "9.2",
    "id": requestId,
    "otp": "11111"
  });

  let config1 = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://qa-delivery.countrydelight.in/api/auth/v1/login/verify/?app_version=9.2',
    headers: { 
      'Content-Type': 'application/json', 
      'Cookie': 'AWSALB=mRHfz0jeTnNKEMNrJnvXndzMiExZTYMjuVCVTVD9kqjpuPGaLCAWyNHmvpOsB6xTok7VoDAQal6ab3J/wpv2EUNuNWRU01PEFm7iGLJVvwCRQSHjPtHwur2+e+8I; AWSALBCORS=mRHfz0jeTnNKEMNrJnvXndzMiExZTYMjuVCVTVD9kqjpuPGaLCAWyNHmvpOsB6xTok7VoDAQal6ab3J/wpv2EUNuNWRU01PEFm7iGLJVvwCRQSHjPtHwur2+e+8I'
    },
    data : data1
  };

  axios.request(config1)
  .then((response) => {
    console.log('OTP Verification Response:', JSON.stringify(response.data.access_token));
  })
  .catch((error) => {
    console.log("Error during OTP verification:", error.message);
  });

})
.catch((error) => {
  console.log("Error during OTP request:", error.message);
});
