import fs from 'fs';
import { exit, which, exec } from 'shelljs';
import logatim from 'logatim';

import initializer from './tasks/initializer';
import symlink from './tasks/symlink';
import setup from './tasks/setup';
import installer from './tasks/installer';

export const OPTIONS = {
  INIT: 'init',
  SYMLINK: 'symlink',
  SETUP: 'setup',
  INSTALL: 'install',
  EXIT: 'exit',
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
