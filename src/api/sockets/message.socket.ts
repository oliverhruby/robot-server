import * as child from 'child_process';
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

    let action = JSON.parse(message);

    // TODO: some command routing pattern?
    if (action.action == 'motors') {
      this.trexService.sendCommand(action.lmSpeed, action.rmSpeed);
    } else if (action.action == 'talk') {
      this.speechService.say('Hello');
    } else if (action.action == 'status') {
      this.trexService.getStatus().then();
    } else if (action.action == 'photo') {
      //CvService.readCamera();
      const p = child.spawn('pwd');
      p.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
      });
      p.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
      });   
    }
  }
}
