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
  let packet = tplink.encrypt('{"system":{"get_sysinfo":null}}');
  var dgram = require("dgram");
  var socket = dgram.createSocket("udp4");

  socket.on("listening", function() {
    socket.setBroadcast(true);
    socket.send(packet, 0, packet.length, 9999, "255.255.255.255");
    
  });
  socket.on("message", function (message, rinfo) {
    console.log(tplink.decrypt(message));
    });



  socket.bind(8888);

  let t = new Date().getTime();
  while (new Date().getTime() - t < 4000){
  }
  socket.close();
  //socket.close();

}
module.exports = discover;
