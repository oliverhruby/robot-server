import { TRexStatus } from '../models/TRexStatus';
import { Log } from './Log';

const i2c: any = require('i2c');

const STATUS_PACKET_SIZE = 24;
const I2C_ADDRESS = 0x07;

/**
 * Service for communicating with Dagu T-Rex controller board using I2C bus
 */
export class TRexService {

    private wire: any;
    private status: TRexStatus;

    /**
     * Initialize the communication
     */
    constructor() {
        this.wire = new i2c(I2C_ADDRESS, {
            device: '/dev/i2c-1',
            debug: false
        });
    }

    /**
     * Send command to the T-Rex board
     * @param lmSpeed left motor speed
     * @param rmSpeed right motor speed
     */
    sendCommand(lmSpeed: number, rmSpeed: number) {
        let lmSpeedB = this.toBytes(lmSpeed);
        let rmSpeedB = this.toBytes(rmSpeed);
        this.wire.write([
            15,          // Start byte – must be 0x0F (15 decimal)
            6,           // PWM frequency – a number from 1 to 7 to select motor PWM frequency
            lmSpeedB[0], // Left motor speed high byte
            lmSpeedB[1], // Left motor speed low byte
            0,           // Left motor brake – 0=brake off 1=brake on
            rmSpeedB[0], // Right motor speed high byte
            rmSpeedB[1], // Right motor speed low byte
            0,           // Right motor brake – 0=brake off 1=brake on
            0,           // Servo 0 position high byte
            0,           // Servo 0 position low byte
            0,           // Servo 1 position high byte
            0,           // Servo 1 position low byte
            0,           // Servo 2 position high byte
            0,           // Servo 2 position low byte
            0,           // Servo 3 position high byte
            0,           // Servo 3 position low byte
            0,           // Servo 4 position high byte
            0,           // Servo 4 position low byte
            0,           // Servo 5 position high byte
            0,           // Servo 5 position low byte
            50,          // Accelerometer de-vibrate 0-255 default=50,
            0,           // Impact sensitivity high byte
            0,           // Impact sensitivity low byte
            2,           // lowbat high byte 5.5V => 550 => 0x226 => 2
            38,          // lowbat low byte 5.5V => 550 => 0x226 => 38 
            7,           // I²C address 0-127,
            0            // clock frequency – 0=100kHz 1=400kHz
        ], function (err: any) {
            if (err) Log.error('TRexService', err.message);
        });
    }

    /**
     * Read a 24 byte status block
     */
    getStatus() {
        let me = this;
        return new Promise((resolve, reject) => {
            // DEBUG
            /* let status = new TRexStatus();
            status.accX = 0;
            status.accY = 0;
            status.accZ = 0;
            status.impactX = 0;
            status.impactY = 0;
            status.impactZ = 0;
            status.lmCurrent = 10;
            status.rmCurrent = 10;
            resolve(status);
            */
            this.wire.read(STATUS_PACKET_SIZE, function (err: any, buffer: any) {
                if (err) {
                    Log.error('TRexService', err);
                } else {
                    let start = buffer[0]
                    let error = buffer[1];

                    let status = new TRexStatus();
                    status.error = buffer[1];
                    status.voltage = ((buffer[2] * 256) + buffer[3]) / 100.0;
                    status.lmCurrent = ((buffer[4] * 256) + buffer[5]) / 100.0;
                    status.rmCurrent = ((buffer[8] * 256) + buffer[9]) / 100.0;
                    status.accX = ((buffer[12] * 256) + buffer[13]) / 100.0;
                    status.accY = ((buffer[14] * 256) + buffer[15]) / 100.0;
                    status.accZ = ((buffer[16] * 256) + buffer[17]) / 100.0;
                    status.impactX = ((buffer[18] * 256) + buffer[19]) / 100.0;
                    status.impactY = ((buffer[20] * 256) + buffer[21]) / 100.0;
                    status.impactZ = ((buffer[22] * 256) + buffer[23]) / 100.0;
                    me.status = status;
                    Log.info('TRexService', status.toString());
                    resolve(status);
                }
            });
        });

    }

    private toBytes(num: number) {
        let arr = new Uint8Array([
            (num & 0x0000ff00) >> 8,
            (num & 0x000000ff)
        ]);
        return arr;
    }
}
