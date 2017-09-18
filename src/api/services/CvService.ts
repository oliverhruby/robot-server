const cv: any = require('opencv');

/**
 * Helper for OpenCV functionality
 */
export class CvService {

  /**
   * Video test
   */
  static readCamera() {
    let camera = new cv.VideoCapture(0);
    camera.setWidth(320);
    camera.setHeight(240);
    console.log('OpenCV camera captured');
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
