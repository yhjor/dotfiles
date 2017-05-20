import inquirer from 'inquirer';
import { exec } from 'shelljs';

const OPTIONS = {
  ALL: 'All',
  OSX: 'Initialize OSX settings in ~/.osx',
  DEV: 'Development related',
  EXIT: 'Exit',
};

export default class Setup {
  static inject(dependancies = []) {
    dependancies.forEach(command => exec(`brew install ${command}`));
  }

  static osx() {
    exec('softwareupdate -iva');
    exec('. ~/.osx');
  }

  static dev() {
    this.inject([
      'mongodb',
    ]);

    exec('xcode-select --install');

    // 1. launch start mongodb at login
    // 2. load mongodb now
    exec('ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents');
    exec('launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist');
  }

  static prompt() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'option',
          message: 'Choose a setup option',
          choices: [
            OPTIONS.ALL,
            OPTIONS.OSX,
            OPTIONS.DEV,
            OPTIONS.EXIT,
          ],
        },
      ])
      .then(({ option }) => {
        this.run(option);
      });
  }

  static run(option) {
    if (option === OPTIONS.EXIT) {
      return;
    }

    const fullInstall = option === OPTIONS.ALL;

    if (fullInstall || option === OPTIONS.DEV) {
      this.dev();
    }

    if (fullInstall || option === OPTIONS.OSX) {
      this.osx();
    }
  }
}
