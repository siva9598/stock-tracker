const DateHelper = (currentDate) => {
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  return year + "-" + month + "-" + day;
};
export default DateHelper;
