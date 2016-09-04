import log from 'logatim';
import inquirer from 'inquirer';
import { exec } from 'shelljs';

const OPTIONS = {
  ALL: 'All',
  OSX: 'Initialize OSX settings in ~/.osx',
  DEV: 'Development related',
  EXIT: 'Exit',
};

class Setup {
  inject(dependancies = []) {
    dependancies.forEach(command => exec(`brew install ${command}`));
  }

  osx() {
    exec('softwareupdate -iva');
    exec('. ~/.osx');
  }

  dev() {
    this.inject([
      'heroku-toolbelt',
      'mongodb',
    ]);

    exec('xcode-select --install');
    exec('heroku update');

    // 1. launch start mongodb at login
    // 2. load mongodb now
    exec('ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents');
    exec('launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist');

    // install nvm
    exec('mkdir -p ~/.nvm');
    exec('nvm install');
  }

  prompt() {
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

  run(option) {
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

export default new Setup();
