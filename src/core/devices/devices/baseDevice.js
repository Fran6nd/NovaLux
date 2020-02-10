class BaseDevice
{
    type = 'BaseDevice';
    uuid = '0x00000000';
    constructor(ip, mac, name){
        this.ip = ip;
        this.mac = mac;
        this.anem = name;
    }
    getState()
    {
        return true;
    }
    turnOn()
    {

    }
    turnOff()
    {

    }
}
module.exports = BaseDevice;