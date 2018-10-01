function install_or_upgrade {
    if brew ls --versions "$1" >/dev/null; then
        HOMEBREW_NO_AUTO_UPDATE=1 brew upgrade "$1"
    else
        HOMEBREW_NO_AUTO_UPDATE=1 brew install "$1"
    fi
}

# Install zsh
install_or_upgrade zsh
sudo sh -c "echo '/usr/local/bin/zsh' >> /etc/shells"
chsh -s /usr/local/bin/zsh

# Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# Install fuzzy search
install_or_upgrade fzf
/usr/local/opt/fzf/install
source ~/.zshrc

# Install z search
install_or_upgrade z
echo "
# z | https://github.com/rupa/z
source /usr/local/etc/profile.d/z.sh
" >> ~/.zshrc
source ~/.zshrc

# Install zsh-completions
install_or_upgrade zsh-completions
echo "
# zsh-completions | https://github.com/zsh-users/zsh-completions
fpath=(/usr/local/share/zsh-completions $fpath)
" >> ~/.zshrc
source ~/.zshrc

# Install zsh-autosuggestions
install_or_upgrade zsh-autosuggestions
echo "
# zsh-autosuggestions | https://github.com/zsh-users/zsh-autosuggestions
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
" >> ~/.zshrc
source ~/.zshrc

# Install syntax highlight
install_or_upgrade zsh-syntax-highlighting
echo "
# zsh-syntax-highlighting | https://github.com/zsh-users/zsh-syntax-highlighting
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
"  >> ~/.zshrc

# Install https://github.com/BurntSushi/ripgrep
install_or_upgrade ripgrep

# Install GoLang
install_or_upgrade go
echo "
# Golang
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:/usr/local/go/bin
ulimit -n 8096
" >> ~/.zshrc

# Mount alias to shell profile
echo "
# Alias
[[ -r ~/.alias ]] && source ~/.alias
" >> ~/.zshrc
source ~/.zshrc
