import { BaseSocket } from './base.socket';
import { Log } from '../services/log';
import * as ws from 'ws';
import { IncomingMessage } from 'http';
import { TRexService } from "../services/trex.service";
import { CvService } from "../services/cv.service";

/**
 * Socket controller for the main application chat
 */
export class MessageSocket extends BaseSocket {

  private trex = new TRexService();

  constructor(config: any) {
    super(config);
  }

  onMessage(message: any) {
    super.onMessage(message);

    // TODO: some command routing pattern?
    if (message == 'forward') {
      this.trex.sendCommand(50, 50);
    } else if (message == 'stop') {
      this.trex.sendCommand(0, 0);
    } else if (message == 'left') {
      this.trex.sendCommand(50, 0);
    } else if (message == 'right') {
      this.trex.sendCommand(0, 50);
    } else if (message == 'photo') {
      CvService.readCamera();
    }
  }
}