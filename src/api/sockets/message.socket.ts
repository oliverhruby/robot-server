import { BaseSocket } from './base.socket';
import { Log } from '../services/log';
import * as ws from 'ws';
import { IncomingMessage } from 'http';
import { TRexService } from "../services/trex.service";
import { CvService } from "../services/cv.service";
import { SpeechService } from '../services/speech.service';

/**
 * Socket controller for the main application chat
 */
export class MessageSocket extends BaseSocket {

  private trexService = new TRexService();
  private speechService = new SpeechService();

  constructor(config: any) {
    super(config);
  }

  onMessage(message: any) {
    super.onMessage(message);

    // TODO: some command routing pattern?
    if (message == 'forward') {
      this.trexService.sendCommand(30, 30);
    } else if (message == 'stop') {
      this.trexService.sendCommand(0, 0);
    } else if (message == 'left') {
      this.trexService.sendCommand(30, 0);
    } else if (message == 'right') {
      this.trexService.sendCommand(0, 30);
    } else if (message == 'talk') {
      this.speechService.say('Hello');
    } else if (message == 'status') {
      this.trexService.getStatus().then();
    } else if (message == 'photo') {
      CvService.readCamera();
    }
  }
}