import * as SerialPort from 'serialport';
import { Log } from './Log';

/**
 * Serial port communication helper
 */
export class SerialPortService {

    /**
     * Initialize the communication
     */
    constructor() {
        // let serialPort = new SerialPort('/dev/ttyUSB0', {
        //     baudRate: 19200
        // });

        // serialPort.on('open', function () {
        //     Log.info('Serial', 'open');
        //     serialPort.on('data', function (data) {
        //         Log.info('Serial', data);
        //     });
        // });

    }
}
