module.exports = {
  format_date: (date)=> {
    return require('moment')(date).format('YYYY-MM-DD');
  },
if_Eq: function(a, b, options) {
  return a===b
  }
  // return options.inverse(this);


};