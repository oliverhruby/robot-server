import { Wit, log, MessageResponse } from 'node-wit';

export class WitAiService {
    constructor() {
        const client = new Wit({ accessToken: 'MY_TOKEN' });
        client.message('what is the weather in London?', {})
            .then((data: MessageResponse) => {
                console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
            })
            .catch(console.error);
    }
}