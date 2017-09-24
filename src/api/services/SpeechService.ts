import { Log } from './Log';

const picoSpeaker: any = require('pico-speaker');
const picoConfig = {
    LANGUAGE: 'en-US'
};

/**
 * Service for text to speech conversion
 */
export class SpeechService {

    /**
     * Initialize the communication
     */
    constructor() {
        picoSpeaker.init(picoConfig);
    }

    /**
     * Say a text
     */
    say(text: string) {
        picoSpeaker.speak(text).then(() => Log.info('RASPBERRY', 'Speech finished'));
    }
}
