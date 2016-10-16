# List of brew and npm packages to be installed
brew=(ccat tree)
npm=(yarn nativefier trymodule internal-ip diff-so-fancy speed-test devtool)

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
for package in "${brew[@]}"
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
fi

nvm install 6
npm update -g

# Install npm packages
for package in "${npm[@]}"
do
  which "$package" || npm install -g "$package"
done
