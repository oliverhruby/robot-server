import { Action } from './Action';
import { SpeechService } from '../services/SpeechService';

/**
 * Action for the speech engine
 */
export class TalkAction implements Action {
    readonly type = 'TALK';
    private speechService: SpeechService;
    private text: string;

    constructor(text: string) {
        this.speechService = new SpeechService();
        this.text = text;
    }

    public Execute() {
        this.speechService.say(this.text);
    }

}
