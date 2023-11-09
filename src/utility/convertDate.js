const convertDate = (inputDate) => {
  const date = new Date(inputDate);
  return date.toLocaleDateString();
};
export default convertDate;
