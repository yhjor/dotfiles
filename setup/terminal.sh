NODE_VERSION=8

# Install zsh
brew install zsh
sudo sh -c "echo '/usr/local/bin/zsh' >> /etc/shells"
chsh -s /usr/local/bin/zsh

# Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# Install fuzzy search
brew install fzf
/usr/local/opt/fzf/install
source ~/.zshrc

# Install z search
brew install z
echo "
# z | https://github.com/rupa/z
source /usr/local/etc/profile.d/z.sh
" >> ~/.zshrc
source ~/.zshrc

# Install zsh-completions
brew install zsh-completions
echo "
# zsh-completions | https://github.com/zsh-users/zsh-completions
fpath=(/usr/local/share/zsh-completions $fpath)
" >> ~/.zshrc
source ~/.zshrc

# Install zsh-autosuggestions
brew install zsh-autosuggestions
echo "
# zsh-autosuggestions | https://github.com/zsh-users/zsh-autosuggestions
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
" >> ~/.zshrc
source ~/.zshrc

# Install syntax highlight
brew install zsh-syntax-highlighting
echo "
# zsh-syntax-highlighting | https://github.com/zsh-users/zsh-syntax-highlighting
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
"  >> ~/.zshrc

# Install nvm
brew install nvm
mkdir ~/.nvm
echo "
# nvm | https://github.com/creationix/nvm
source $(brew --prefix nvm)/nvm.sh
export NVM_DIR=~/.nvm
" >> ~/.zshrc
nvm install $NODE_VERSION

# Install the terminal theme
npm install -g pure-prompt
echo '
# pure | https://github.com/sindresorhus/pure
autoload -U promptinit; promptinit
prompt pure
' >> ~/.zshrc
source ~/.zshrc

# Mount alias to shell profile
echo "
# Alias
[[ -r ~/.alias ]] && source ~/.alias
" >> ~/.zshrc
source ~/.zshrc
