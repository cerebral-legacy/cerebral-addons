module.exports = function (label) {

  return function log(input) {
    console.log(label, input);
  };

};
