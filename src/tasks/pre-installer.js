import { exec, echo, which } from 'shelljs';

class PreInstaller {
  osx() {
    exec('softwareupdate -iva');
    exec('. ~/.osx');
  }

  zsh() {
    // change from bash to zsh
    exec(`sudo sh -c "echo '/usr/local/bin/zsh' >> /etc/shells"`);
    exec('chsh -s /usr/local/bin/zsh');

    // install fzf
    exec('/usr/local/opt/fzf/install');
  }

  brew() {
    echo('Start brew setup script...');

    if (!which('brew')) {
      echo('Installing homebrew...');
    }

    exec('brew update');
    exec('brew upgrade --all');
    exec('brew tap caskroom/cask');
  }

  dev() {
    exec('xcode-select --install');
    exec('heroku update');

    // to launch start mongodb at login
    exec('ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents');

    // load mongodb now:
    exec('launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist');

    exec(`mkdir -p ~/.nvm`);
    exec(`nvm install`);
  }

  run(option) {
    const fullInstall = option === true;

    if (fullInstall || option === 'brew') this.brew();
    if (fullInstall || option === 'zsh') this.zsh();
    if (fullInstall || option === 'dev') this.dev();
    if (fullInstall || option === 'osx') this.osx();
  }
}

export default new PreInstaller();
