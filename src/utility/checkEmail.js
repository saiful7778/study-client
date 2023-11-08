const checkEmail = (inputEmail) => {
  if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(inputEmail)) {
    return true;
  } else {
    return false;
  }
};
export default checkEmail;
