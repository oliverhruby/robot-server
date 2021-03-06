import * as express from 'express';
import * as http from 'http';
import * as url from 'url';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as chalk from 'chalk';
import * as os from 'os';
import * as path from 'path';
import * as sqlite3 from 'sqlite3';
import * as ws from 'ws';
import { Log } from './services/Log';
// import { trexRouter } from './routes/trex';
import { MessageSocket } from './sockets/MessageSocket';

/**
 * Backend server functionality wrapped as a class
 */
export class Server {
  public app: any;
  private server: any;
  private ws: any;
  private port: number;
  private root: string;
  private clients: number;

  // Bootstrap the application.
  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {

    // Create expressjs application
    this.app = express();
    this.server = http.createServer(this.app);

    this.config();
    this.routes();

    // Create database connections
    this.databases();

    // Handle websockets
    this.sockets();

    // Start listening
    this.listen();

    // loged in users
    this.clients = 0;
  }

  /**
   * Configuration
   */
  private config(): void {
    // By default the port should be 3000
    this.port = 3000;

    // Plug in body parser middleware for posting JSON
    this.app.use(bodyParser.json());
  }

  /**
   * Configure routes
   */
  private routes(): void {
    let router: express.Router;
    router = express.Router();

    // Add routers
    // this.app.use('/api/trex', trexRouter);

    // Handle GET for the root URL
    this.app.get('/api', (req: Request, res: Response) => {
      res.send('API works!');
    });

    // this.app.get('/api/status', (req: Request, res: Response) => {
    //  let trexService = new TRexService();
    //  let status = trexService.getStatus().then(data => res.send(data));
    // });

    // this.app.get('/api/command', (req: Request, res: Response) => {
    //   let trexService = new TRexService();
    //   trexService.sendCommand(200, 200);
    //   res.send('Command sent');
    // });

    // Point static path to dist
    this.app.use(express.static(path.join(__dirname, '../../dist/www')));

    // Return version info (TODO: move to separate router)
    this.app.get('/api/version', (req: Request, resp: Response) => {
      resp.send('{\n' +
        '  "nodejs": "' + process.version + '",\n' +
        '  "os": {\n' +
        '    "freemem": "' + os.freemem() + '",\n' +
        '    "hostname": "' + os.hostname() + '",\n' +
        '    "platform": "' + os.platform() + '",\n' +
        '    "release": "' + os.release() + '",\n' +
        '    "totalmem": "' + os.totalmem() + '",\n' +
        '    "type": "' + os.type() + '",\n' +
        '    "uptime": "' + os.uptime() + '"\n' +
        '  }\n' +
        '}');
    });

    // Catch all other routes and return the index file
    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
    });
  }

  /**
   * Configure databases
   */
  private databases(): void {
    let fs = require('fs');
    let file = path.join(path.resolve(__dirname, 'marvin.db'));
    let exists = fs.existsSync(file);
    sqlite3.verbose();
    let db = new sqlite3.Database(file);
    db.serialize(function () {

      db.run('DROP TABLE IF EXISTS scenes');
      db.run('CREATE TABLE scenes (id INTEGER, name TEXT, description TEXT, file TEXT, owner TEXT, public BOOLEAN)');
      // tslint:disable-next-line:max-line-length
      db.run('INSERT INTO scenes (id, name, description, file, owner, public) VALUES' +
        ' (1, \'Marvin\', \'Example scene that visualizes a robotic rover vehicle. Each person connected to this scene will be given a vehicle.\', \'marvin.babylon\', 1, 1)');
      // tslint:disable-next-line:max-line-length
      db.run('INSERT INTO scenes (id, name, description, file, owner, public) VALUES ' +
        '(2, \'Robot Arm\', \'Each person connected to this scene will be given a robotic manipulator and a task to complete. \', \'robot.babylon\', 1, 1)');

      db.run('DROP TABLE IF EXISTS users');
      db.run('CREATE TABLE users (id INTEGER, name TEXT, email TEXT, lastActivity DATETIME, image TEXT)');
      // tslint:disable-next-line:max-line-length
      db.run('INSERT INTO users (id, name, email, lastActivity, image) VALUES (1, \'Oliver Hruby\', \'oliverhruby@gmail.com\', NULL, \'https://lh3.googleusercontent.com/-_5kjt9UDfEc/AAAAAAAAAAI/AAAAAAAAAAA/rQhBCg9jyDc/photo.jpg\')');
      db.run('INSERT INTO users (id, name, email, lastActivity, image) VALUES (2, \'Joe Example\', \'joe.example@gmail.com\', NULL, NULL)');

    });
    db.close();
  }

  /**
   * Configure sockets
   */
  private sockets(): void {
    let socket = new MessageSocket({server: this.server});
  }

  /**
   * Start HTTP server listening
   */
  private listen(): void {
    // listen on provided ports
    this.server.listen(this.port, '0.0.0.0');

    // add error handler
    this.server.on('error', (error: any) => {
      Log.error('SERVER', error);
    });

    // start listening on port
    this.server.on('listening', () => {
      Log.info('SERVER', 'Listening on ' + chalk.gray(`http://localhost:${this.port}`));
    });
  }
}

// Bootstrap the server
let server = Server.bootstrap();
