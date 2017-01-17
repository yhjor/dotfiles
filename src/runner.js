import fs from 'fs';
import { exit, which, exec } from 'shelljs';
import inquirer from 'inquirer';
import logatim from 'logatim';

import initializer from './tasks/initializer';
import symlink from './tasks/symlink';
import setup from './tasks/setup';

export const OPTIONS = {
  INIT: 'Initialize:\t~/.nvmrc and ./gituser',
  SYMLINK: 'Symlink:\tdotfiles from ./dots to ~/',
  SETUP: 'Setup:\tOSX configs, plugins and Development tools',
  EXIT: 'Exit',
};

export default class Runner {
  static isFirstTimeRun() {
    try {
      fs.statSync(`${process.env.HOME}/.gituser`);
      fs.statSync(`${process.env.HOME}/.nvmrc`);
    } catch (err) {
      if (err.code === 'ENOENT') return true;
    }

    return false;
  }

  static start() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'option',
          message: 'Choose an operation',
          choices: [
            OPTIONS.INIT,
            OPTIONS.SYMLINK,
            OPTIONS.SETUP,
            OPTIONS.EXIT,
          ],
        },
      ])
      .then(({ option }) => {
        this.dispatchAction(option);
      });
  }

  static dispatchAction(option) {
    if (option === OPTIONS.EXIT) {
      return;
    }

    if (this.isFirstTimeRun() || option === OPTIONS.INIT) {
      initializer.run();
    }

    if (option === OPTIONS.SYMLINK) {
      symlink.run();
    }

    if (option === OPTIONS.SETUP) {
      setup.prompt();
    }
  }
}

