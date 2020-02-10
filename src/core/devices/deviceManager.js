class DeviceManager {
  static devices = {};
  static discoverers = {};

  static randomize_uuid() {
    let uuid = "";
    do {
      let charset =
        "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
      for (let i = 0; i < 13; i++) {
        let c = charset.charAt(Math.floor(Math.random() * 10));
        uuid += c;
      }
      console.log(uuid);
    } while (!uuid in this.devices);
    return uuid;
  }

  static register(name, discoverer) {
    this.discoverers[name] = discoverer;
  }
  static discover(device_type) {
    if (device_type in this.discoverers) {
      return this.discoverers[device_type]();
    }
  }
  static add_device(device) {
    device["uuid"] = this.randomize_uuid();
    this.devices[device["uuid"]] = device;
  }
  static rm_device(devices_code) {}
  static init() {
    this.register("TP-Link", require("./devices/tplink"));
  }
}
DeviceManager.init();
console.log(JSON.stringify(DeviceManager.discover("TP-Link")));
module.exports = DeviceManager;
