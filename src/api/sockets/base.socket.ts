import * as chalk from 'chalk';
import * as url from 'url';
import * as ws from 'ws';
import { IncomingMessage } from "http";
import { Log } from './../services/log';

/**
 * Common logic for socket controllers
 */
export abstract class BaseSocket {

    socket: ws.Server;
    clients = 0;

    constructor(config: any) {
        this.socket = new ws.Server(config);
        this.socket.on('connection', (ws: ws, request: IncomingMessage) => {
            this.onConnection(ws, request);
            ws.on('close', (reasonCode: any, description: any) => {
                this.onClose(reasonCode, description);
            });
            ws.on('message', (message: any) => {
                this.onMessage(message);
            });
        });
    }

    onConnection(ws: ws, request: IncomingMessage) {
        this.clients++;
        let location = url.parse(request.url, true);
        Log.info('SOCKET', 'Socket connection #' + this.clients);
    }

    onMessage(message: string) {
        Log.info('SOCKET', 'Socket message: ' + chalk.gray(message));
    }

    onClose(reasonCode: any, description: any) {
        Log.info('SOCKET', 'Peer #' + this.clients + ' disconnected.');
        this.clients--;
    }

    broadcast(message: string) {
        this.socket.clients.forEach(client => {
	    	client.send(message);
    	});	
    }
    
}

