import { Action } from './Action';
import { OpenCvService } from '../services/OpenCvService';

/**
 * Start camera
 */
export class CameraAction implements Action {

    readonly type = 'CAMERA';

    constructor() {
    }

    public Execute() {
        OpenCvService.readCamera();
    }

}