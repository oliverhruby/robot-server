import { Command } from './Command';
// import RaspiCam = require('raspicam');

/**
 * Command for controlling the vehicle motors
 */
export class CameraCommand extends Command {
    
    constructor() {
        super();
    }

    public Execute() {
      // var camera = new RaspiCam({
      //   mode: 'video',
      //   output: './video/video.h264',
      //   framerate: 15,
      //   timeout: 5000 // take a 5 second video
      // });

      // camera.on('start', function (err: any, timestamp: any) {
      //   console.log("video started at " + timestamp);
      // });

      // camera.on('read', function (err: any, timestamp: any, filename: any) {
      //   console.log("video captured with filename: " + filename + " at " + timestamp);
      // });

      // camera.on('exit', function (timestamp: any) {
      //   console.log("video child process has exited at " + timestamp);
      // });

      // camera.start();
    }

}