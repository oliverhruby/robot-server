const cv: any = require('opencv');

export class CvService {

  static readCamera() {
    let camera = new cv.VideoCapture(0);
    camera.setWidth(320);
    camera.setHeight(240);
    console.log("OpenCV camera captured");
  }
}


