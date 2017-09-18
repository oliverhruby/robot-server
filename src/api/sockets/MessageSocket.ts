import * as child from 'child_process';
import { BaseSocket } from './BaseSocket';
import * as ws from 'ws';
import { IncomingMessage } from 'http';

import { BingSpeechService } from '../services/BingSpeechService';
import { CvService } from '../services/CvService';
import { Log } from '../services/Log';
import { SpeechService } from '../services/SpeechService';
import { TRexService } from '../services/TRexService';

import { MotorsCommand } from '../commands/MotorsCommand';
import { CameraCommand } from '../commands/CameraCommand';

/**
 * Socket controller for the main application chat
 */
export class MessageSocket extends BaseSocket {

  private trexService = new TRexService();
  private speechService = new SpeechService();
  private bingSpeechService = new BingSpeechService();

  constructor(config: any) {
    super(config);
  }

  onMessage(message: any) {
    super.onMessage(message);

    let action = JSON.parse(message);

    // TODO: some command routing pattern? Separate command parser class?
    // maybe someting like https://www.codeproject.com/articles/871622/writing-a-chat-server-using-node-js-typescript-and
    if (action.action == 'motors') {
      // let command = new MotorsCommand(action.lmSpeed, action.rmSpeed);
      // command.Execute();    -> TODO: for i2c we need singleton service 
      this.trexService.sendCommand(action.lmSpeed, action.rmSpeed);
    } else if (action.action == 'talk') {
      this.speechService.say('Hello');
      this.bingSpeechService.speak();
    } else if (action.action == 'status') {
      this.trexService.getStatus().then(data => this.broadcast(JSON.stringify(data)));
    } else if (action.action == 'photo') {
      let cameraCommand = new CameraCommand();
      cameraCommand.Execute();
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
