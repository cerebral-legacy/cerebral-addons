module.exports = function (label) {

  return function logInput(input) {
    console.log(label, input);
  };

};
