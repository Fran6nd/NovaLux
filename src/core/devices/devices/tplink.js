let baseclass = require("./baseDevice");

class tplink extends baseclass {
  static encrypt(input, firstKey = 0xab) {
    const buf = Buffer.from(input);
    let key = firstKey;
    for (let i = 0; i < buf.length; i++) {
      buf[i] = buf[i] ^ key;
      key = buf[i];
    }
    return buf;
  }
  static decrypt(input, firstKey = 0xab) {
    const buf = Buffer.from(input);
    let key = firstKey;
    let nextKey;
    for (let i = 0; i < buf.length; i++) {
      nextKey = buf[i];
      buf[i] = buf[i] ^ key;
      key = nextKey;
    }
    return buf;
  }
}

function discover() {
  console.log("hello");
}
module.exports = discover;
