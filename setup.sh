# List of brew and npm packages to be installed
BREW_PACKAGES=(z zsh zsh-syntax-highlighting zsh-completions zsh-autosuggestions ccat tree yarn exa)
NODE_PACKAGES=(pure-prompt internal-ip diff-so-fancy speed-test slap git-recall)
NODE_VERSION=7

# Ensure admin account is accessible to brew pacakges
sudo -v
softwareupdate -iva
xcode-select --install
# sudo chgrp -R admin /usr/local
# sudo chmod -R g+w /usr/local

#
# Check if Homebrew is installed
#
which -s brew || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update
brew upgrade

# Setup Zsh
if [ -n "$BASH_VERSION" ]; then
  brew install zsh
  brew install fzf

  sudo sh -c "echo '/usr/local/bin/zsh' >> /etc/shells"
  chsh -s /usr/local/bin/zsh
  /usr/local/opt/fzf/install
fi

# Install brew packages
for package in "${BREW_PACKAGES[@]}"
do
  which "$package" || brew install "$package"
done

which -s mongod || brew install mongodb
brew service start mongodb
which -s redis-cli || brew install redis
which -s java || brew cask install java
which -s yarn || brew install yarn --ignore-dependencies

# Setup Nvm and Npm
if [ -z "$NVM_DIR" -a -d "$HOME/.nvm" ] ; then
  brew install nvm

  mkdir ~/.nvm
  export NVM_DIR="$HOME/.nvm"
  . "$(brew --prefix nvm)/nvm.sh"
  nvm install $NODE_VERSION
fi

nvm use --delete-prefix $NODE_VERSION
npm update -g

# Install npm packages
for package in "${NODE_PACKAGES[@]}"
do
  which "$package" || yarn global add "$package"
done

source .osx

# Enable the `dot` command by linking up current dotfiles to be executable
yarn global add @yhjor/dotfiles
