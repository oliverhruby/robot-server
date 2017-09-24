import * as child from 'child_process';
import { BaseSocket } from './BaseSocket';
import * as ws from 'ws';
import { IncomingMessage } from 'http';

// services
import { SerialPortService } from '../services/SerialPortService';
import { Log } from '../services/Log';
import { TRexService } from '../services/TRexService';

// actions
import { AnalyzeAction } from '../actions/AnalyzeAction';
import { CameraAction } from '../actions/CameraAction';
import { MotorsAction } from '../actions/MotorsAction';
import { TalkAction } from '../actions/TalkAction';
import { WitAiAction } from '../actions/WitAiAction';

/**
 * Socket controller for the main application chat
 */
export class MessageSocket extends BaseSocket {

    private trexService = new TRexService();
    private serialPortService = new SerialPortService();

    constructor(config: any) {
        super(config);
    }

    onMessage(message: any) {
        super.onMessage(message);

        let action = JSON.parse(message);

        // TODO: some command routing pattern? Separate command parser class?
        // maybe someting like https://www.codeproject.com/articles/871622/writing-a-chat-server-using-node-js-typescript-and
        if (action.action === 'motors') {
            // let command = new MotorsCommand(action.lmSpeed, action.rmSpeed);
            // command.Execute();    -> TODO: for i2c we need singleton service
            this.trexService.sendCommand(action.lmSpeed, action.rmSpeed);
        } else if (action.action === 'talk') {
            let talkAction = new TalkAction('hello');
            talkAction.Execute();
        } else if (action.action === 'command') {
            let witAiAction = new WitAiAction(action.command);
            witAiAction.Execute();
        } else if (action.action === 'status') {
            this.trexService.getStatus().then(data => this.broadcast(JSON.stringify(data)));
        } else if (action.action === 'photo') {
            let cameraAction = new CameraAction();
            cameraAction.Execute();
        } else if (action.action === 'pwd') {
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
