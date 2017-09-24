const cv: any = require('opencv');
import { Log } from '../services/Log';

/**
 * Helper for OpenCV functionality
 */
export class OpenCvService {

    /**
     * Video test
     */
    static readCamera() {
        const camera = new cv.VideoCapture(0);
        const rectColor = [0, 255, 0];
        const rectThickness = 2;
        camera.read(function (err: any, im: any) {
            if (err) throw err;
            if (im.size()[0] > 0 && im.size()[1] > 0) {
                // im.convertGrayscale();
                im.detectObject(cv.FACE_CASCADE, {}, function (err: any, faces: any) {
                    if (err) throw err;
                    for (let i = 0; i < faces.length; i++) {
                        const face = faces[i];
                        im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness);
                        im.save('./out.jpg');
                    }
                    Log.info('OpenCvService', 'Faces:' + faces.length);
                });
            }
            camera.release();
        });
    }

    /**
     * Reads a picture and processes it to grayscale
     */
    static readPicture() {
        cv.readImage('./leaf.jpg', function (err: any, img: any) {
            if (err) {
                throw err;
            }

            const width = img.width();
            const height = img.height();

            if (width < 1 || height < 1) {
                throw new Error('Image has no size');
            }

            // do some cool stuff with img
            img.convertGrayscale();

            // save img
            img.save('./leaf2.jpg');
        });
    }
}
