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
    }

    /**
     * Say a text
     */
    say(text: string) {
        picoSpeaker.init(picoConfig);
        picoSpeaker.speak(text).then(() => Log.info('RASPBERRY', 'Speech finished'));        
    }
}