# Robot

This project contains the software needed to control a custom built robotic rover.
The code consists of two parts:

- `server side` - node.js based webserver serving the client application and exposing REST and WebSocket API which interacts then with the hardware or external services
- `client control panel application` - HTML5 based client applications that can be open in browser or on a mobile device and allows controlling the robot in various way including voice commands