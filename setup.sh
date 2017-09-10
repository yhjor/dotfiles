# Symlink dotfiles
ln -sf $(pwd)/dots/.alias ~
ln -sf $(pwd)/dots/.gitconfig ~
ln -sf $(pwd)/dots/.vimrc ~

# Optimize Mac's default settings
source setup/osx.sh

# Setup the terminal for new Mac environment only
if [ -n "$BASH_VERSION" ]; then
  # Ensure admin account is accessible to brew pacakges
  sudo -v
  
  # Install homebrew
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  
  # Update OS
  softwareupdate -iva
  xcode-select --install
  
  # Update existing git and java version
  brew install git
  brew cask install java
  
  # Setting up ZSH
  source setup/terminal.sh
fi

# Brew and Node global packages
source setup/tools.sh

# Web Development
which -s mongod || brew install mongodb && brew service start mongodb
which -s redis-cli || brew install redis && brew services start redis
