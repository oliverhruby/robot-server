import * as i2c from 'i2c-bus';

/**
 * Service for communicating with Dagu T-Rex controller board using I2C bus
 */
export class TRex {
    i2c1: i2c.I2cBus;

    /**
     * Open the connection during the service initialization
     */
    constructor() {
        this.i2c1 = i2c.openSync(1);
    }

    /**
     * Read a 24 byte status block
     */
    public GetStatus() {
        let value = this.i2c1.readByteSync(7, 15);
        return value;
    }
}