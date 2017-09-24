# Symlink dotfiles
source setup/symlink.sh

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

# Setup vim plugins
source setup/vim.sh

# Brew and Node global packages
source setup/tools.sh
