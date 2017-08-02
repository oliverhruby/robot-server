import * as chalk from 'chalk';

const APP_NAME = 'ROBOT';

export class Log {

  static info(category: string, message: string) {
    console.log('[' + chalk.green(APP_NAME) + '] [' + chalk.gray(new Date().toTimeString().split(' ')[0]) + '] ['
      + chalk.blue(category.toUpperCase()) + '] ' + message);
  }

  static error(category: string, message: string) {
    console.error('[' + chalk.green(APP_NAME) + '] [' + chalk.gray(new Date().toTimeString().split(' ')[0]) + '] ['
      + chalk.blue(category.toUpperCase()) + '] ' + chalk.red(message));
  }

  static warn(category: string, message: string) {
    console.warn('[' + chalk.green(APP_NAME) + '] [' + chalk.gray(new Date().toTimeString().split(' ')[0]) + '] ['
      + chalk.blue(category.toUpperCase()) + '] ' + chalk.red(message));
  }

}
