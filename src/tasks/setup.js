import { exec } from 'shelljs';

class Setup {
  osx() {
    exec('softwareupdate -iva');
    exec('. ~/.osx');
  }

  zsh() {
    // change from bash to zsh
    /* eslint-disable quotes */
    exec(`sudo sh -c "echo '/usr/local/bin/zsh' >> /etc/shells"`);
    /* eslint-enable */
    exec('chsh -s /usr/local/bin/zsh');

    // install fzf
    exec('/usr/local/opt/fzf/install');
  }

  dev() {
    exec('xcode-select --install');
    exec('heroku update');

    // to launch start mongodb at login
    exec('ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents');

    // load mongodb now:
    exec('launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist');

    // install nvm
    exec('mkdir -p ~/.nvm');
    exec('nvm install');
  }

  run(option) {
    const fullInstall = option === true;

    if (fullInstall || option === 'zsh') this.zsh();
    if (fullInstall || option === 'dev') this.dev();
    if (fullInstall || option === 'osx') this.osx();
  }
}

export default new Setup();
