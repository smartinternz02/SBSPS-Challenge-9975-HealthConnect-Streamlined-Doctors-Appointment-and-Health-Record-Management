// Generate a random 6-digit OTP
exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  // Validate the OTP
  exports.validateOTP = (inputOTP, savedOTP) => {
    return inputOTP === savedOTP;
};