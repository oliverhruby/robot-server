import { Command } from './Command';
import { CVClient, CVAnalyzeOptions } from '../services/CVClient';

/**
 * Command for analyzing a picture
 */
export class AnalyzeCommand extends Command {
    
    constructor() {
        super();
    }

    public Execute() {
        let cc = new CVClient('1234678');
        let opt = new CVAnalyzeOptions();
        opt.language = 'en';

        // cc.analyzeAsync(file, opt).then(function(response){
        //     console.log(response);
        // });

    }

}