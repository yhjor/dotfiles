import fs from 'fs';
import { exit, which, exec } from 'shelljs';
import inquirer from 'inquirer';
import logatim from 'logatim';

import initializer from './tasks/initializer';
import symlink from './tasks/symlink';
import setup from './tasks/setup';
import installer from './tasks/installer';
import cli from './tasks/cli';

export const OPTIONS = {
  INIT: 'Initialize:\t~/.nvmrc and ./gituser',
  SYMLINK: 'Symlink:\tdotfiles from ./dots to ~/',
  SETUP: 'Setup:\tOSX configs, Zsh and plugins, Development tools',
  INSTALL: 'Install:\tBrew, Atom and Node packages that defined in ~/.packages',
  EXIT: 'Exit',
};

class Runner {
  checkBrew() {
    if (!which('brew')) {
      logatim.yellow.warn('Installing brew:');
      exec('/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"');
      exit(1);
    }
  }

  isFirstTimeRun() {
    try {
      fs.statSync(`${process.env.HOME}/.gituser`);
      fs.statSync(`${process.env.HOME}/.nvmrc`);
    } catch (err) {
      if (err.code === 'ENOENT') return true;
    }

    return false;
  }

  start() {
    if (!cli.inputMatch()) {
      this.interactive();
      return;
    }

    cli.run();
  }

  interactive() {
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
            OPTIONS.INSTALL,
            OPTIONS.EXIT,
          ],
        },
      ])
      .then(({ option }) => {
        this.dispatchAction(option);
      });
  }

  dispatchAction(option) {
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

    if (option === OPTIONS.INSTALL) {
      installer.prompt();
    }
  }
}

export default new Runner();
