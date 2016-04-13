import inquirer from 'inquirer';
import { exec } from 'shelljs';

const OPTIONS = {
  ALL: 'All',
  OSX: 'Initialize OSX settings in ~/.osx',
  ZSH: 'Change your shell from brew to zsh',
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

  zsh() {
    this.inject([
      'zsh',
      'antigen',
      'fzf',
    ]);

    // change from bash to zsh
    /* eslint-disable quotes */
    exec(`sudo sh -c "echo '/usr/local/bin/zsh' >> /etc/shells"`);
    /* eslint-enable */
    exec('chsh -s /usr/local/bin/zsh');

    // powerful fuzzy finder
    exec('/usr/local/opt/fzf/install');
  }

  dev() {
    this.inject([
      'heroku-toolbelt',
      'mongodb',
      'nvm',
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
            OPTIONS.ZSH,
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

    if (fullInstall || option === OPTIONS.ZSH) {
      this.zsh();
    }

    if (fullInstall || option === OPTIONS.DEV) {
      this.dev();
    }

    if (fullInstall || option === OPTIONS.OSX) {
      this.osx();
    }
  }
}

export default new Setup();
