import { Log } from "./log";

const picoSpeaker: any = require('pico-speaker');
const picoConfig = {
   AUDIO_DEVICE: null,
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