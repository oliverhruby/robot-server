import { Wit, MessageResponse } from 'node-wit';
import { Log } from './Log';

/**
 * Wit.ai - Natural Language for Developers
 */
export class WitAiService {

    client: Wit;

    constructor() {
        this.client = new Wit({ accessToken: 'RAR3FKDCDBKLYKPDUY5VMXAF62WVY5DB' });
    }

    /**
     * Send a message to the engine and return response
     */
    message(text: string) {
        this.client.message(text, {})
            .then((data: MessageResponse) => {
                Log.info('Wit.ai', 'Yay, got Wit.ai response: ' + JSON.stringify(data));
            })
            .catch(console.error);
    }
}
