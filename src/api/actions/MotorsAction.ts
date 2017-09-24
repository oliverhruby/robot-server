import { Action } from './Action';
import { TRexService } from '../services/TRexService';

/**
 * Command for controlling the vehicle motors
 */
export class MotorsAction implements Action {
    readonly type = 'MOTORS';
    private lmSpeed: number;
    private rmSpeed: number;
    private trexService: TRexService;

    constructor(
        lmSpeed: number,
        rmSpeed: number
    ) {
        this.trexService = new TRexService();
    }

    public Execute() {
        this.trexService.sendCommand(this.lmSpeed, this.rmSpeed);
    }

}