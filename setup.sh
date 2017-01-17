#
# Check if Homebrew is installed
#
which -s brew || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Setup Nvm and Npm
if [ -z "$NVM_DIR" -a -d "$HOME/.nvm" ] ; then
  brew install nvm

  mkdir ~/.nvm
  export NVM_DIR="$HOME/.nvm"
  . "$(brew --prefix nvm)/nvm.sh"

  nvm install 7
fi

# Setup Zsh
if [ -n "$BASH_VERSION" ]; then
  brew install zsh
  brew install antigen
  brew install fzf

  sudo sh -c "echo '/usr/local/bin/zsh' >> /etc/shells"
  chsh -s /usr/local/bin/zsh
  /usr/local/opt/fzf/install
fi
