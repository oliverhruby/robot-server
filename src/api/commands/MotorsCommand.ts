
import { Command } from './Command';
import { TRexService } from '../services/TRexService';

/**
 * Command for controlling the vehicle motors
 */
export class MotorsCommand extends Command {
    
    private lmSpeed: number;
    private rmSpeed: number;
    
    private trexService: TRexService;

    constructor(
        lmSpeed: number,
        rmSpeed: number
    ) {
        super();
        this.trexService = new TRexService();
    }

    public Execute() {
        this.trexService.sendCommand(this.lmSpeed, this.rmSpeed);
    }

}