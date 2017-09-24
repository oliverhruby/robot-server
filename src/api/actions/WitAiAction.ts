import { Action } from './Action';
import { WitAiService } from '../services/WitAiService';

/**
 * Action for wit.ai chatbot
 */
export class WitAiAction implements Action {

    readonly type = 'WITAI';

    private witAiService: WitAiService;
    private message: string;

    constructor(message: string) {
        this.witAiService = new WitAiService();
        this.message = message;
    }

    public Execute() {
        this.witAiService.message(this.message);
    }

}