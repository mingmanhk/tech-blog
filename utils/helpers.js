module.exports = {
  format_date: (date) => {
    // console.log(date);
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  is_Empty: (data) => {
    // console.log(data.length);
    return data.length == 0;
  },

  is_Match: (data1, data2) => {
    // console.log(data1 == data2);
    return data1 == data2;
  },
};
