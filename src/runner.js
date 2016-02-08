import fs from 'fs';
import { echo, exit, which } from 'shelljs';

import initializer from './tasks/initializer';
import symlink from './tasks/symlink';
import preInstaller from './tasks/pre-installer';
import installer from './tasks/installer';

export const OPTIONS = {
  INIT: 'init',
  SYMLINK: 'symlink',
  PREINSTALL: 'preinstall',
  INSTALL: 'install',
};

class Runner {
  checkGit() {
    if (!which('git')) {
      echo('This script requires git');
      exit(1);
    }
  }

  checkNpm() {
    if (!which('npm')) {
      echo('This script requires npm');
      exit(1);
    }
  }

  isFirstTimeRun() {
    try {
      fs.statSync(`${process.env.HOME}/.gituser`);
      fs.statSync(`${process.env.HOME}/.nvmrc`);
      fs.statSync(`${process.env.HOME}/.ruby-version`);
    } catch (err) {
      if (err.code === 'ENOENT') return true;
    }

    return false;
  }

  dispatchAction(option) {
    if (this.isFirstTimeRun() || option[OPTIONS.INIT]) initializer.run();
    if (option[OPTIONS.SYMLINK]) symlink.run();
    if (option[OPTIONS.PREINSTALL]) preInstaller.run(option.preinstall);
    if (option[OPTIONS.INSTALL]) installer.run(option.install);
  }
}

export default new Runner();
