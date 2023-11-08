const checkPass = (inputPass) => {
  if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(inputPass)) {
    return true;
  } else {
    return false;
  }
};

export default checkPass;
