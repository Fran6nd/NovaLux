manager = require('../deviceManager');
class BasicDevice {
    static discover()
    {
        console.log('Discovery not implemented yet...');
    }
    static register(module)
    {
        manager.register(module)
    }
}
module.exports = BasicDevice;