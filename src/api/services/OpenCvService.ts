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
    let camera = new cv.VideoCapture(0);
    setInterval(function () {
      camera.read(function (err: any, mat: Matrix) {
        if (err) throw err;
        Log.info('OpenCV', 'Reading camera at size ' + mat.size());
        if (mat.size()[0] > 0 && mat.size()[1] > 0) {
          if (err) throw err;
        }
      });
    }, 500);
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
