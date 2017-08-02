import { BaseSocket } from './base.socket';
import { Log } from '../services/log';
import * as chalk from 'chalk';
import * as url from 'url';
import * as ws from 'ws';
import { IncomingMessage } from 'http';

/**
 * Socket controller for the main application chat
 */
export class MessageSocket extends BaseSocket {

   constructor(config: any) {
    super(config);
    this.socket.on('connection', (ws: ws, request: IncomingMessage) => {
      this.clients++;

      let location = url.parse(request.url, true);
      Log.info('SOCKET', 'Socket connection #' + this.clients);

      ws.on('message', (message: any) => {
        Log.info('SOCKET', 'Socket message: ' + chalk.gray(message));
      });

      let me = this;
      ws.on('close', function(reasonCode: any, description: any) {
        Log.info('SOCKET', 'Peer #' + me.clients + ' disconnected.');
        me.clients--;
      });
    });
  }
}

