function genOTP() {
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    // console.log(otp)
    return otp;
}

export default genOTP;