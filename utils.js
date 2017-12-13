/**
 * [getParityBit description]
 * @return {[type]} [description]
 */
exports.getParityBit = function (str) {
  var parity = 0, reversedCode = str.split('').reverse().join('');
  for ( var counter = 0; counter < reversedCode.length; counter += 1 ) {
    parity += parseInt(reversedCode.charAt(counter), 10) * Math.pow(3, ((counter + 1) % 2));
  }
  return String((10 - (parity % 10)) % 10);
};

exports.codeLength = function (str) {
  let buff = Buffer.from((str.length).toString(16), 'hex');
  return buff.toString();
};

exports.getEAN13CheckSum = function (code) {
  let sum = 0;
  let codeArr = code.toString(10).split('').map(Number);
  sum += codeArr[ 0 ];
  for ( let i = 1; i < codeArr.length; i++ ) {
    if ( (i + 1) % 2 === 0 ) sum += codeArr[ i ] * 3;
    else sum += codeArr[ i ];
  }
  return ((Math.ceil(sum / 10) * 10) - sum);
};
