# List of brew and npm packages to be installed
BREW_PACKAGES=(zsh-syntax-highlighting ccat tree yarn)
NODE_PACKAGES=(nativefier trymodule internal-ip diff-so-fancy speed-test devtool)
NODE_VERSION=7

#
# Check if Homebrew is installed
#
which -s brew || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update
brew upgrade

# Setup Zsh
if [ -n "$BASH_VERSION" ]; then
  brew install zsh
  brew install antigen
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
which -s redis-cli || brew install redis
which -s java || brew cask install java

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

# Enable the `dot` command by linking up current dotfiles to be executable
yarn link
