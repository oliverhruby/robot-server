import { Action } from './Action';
import { CVClient, CVAnalyzeOptions } from '../services/CVClient';

/**
 * Action for analyzing a picture
 */
export class AnalyzeAction implements Action {
    readonly type = 'ANALYZE';

    constructor() {
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
