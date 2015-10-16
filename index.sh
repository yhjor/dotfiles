# 1. inside ~/.bashrc add
#  . ~/projects/dotfiles/.profile.sh

# 2. inside ~/.bash_profile add
# . ~/.bashrc

# direnv related
eval "$(direnv hook bash)"

# nvm related
export NVM_DIR=~/.nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
nvm use 4.2

. ~/projects/dotfiles/git/global.sh
. ~/projects/dotfiles/git/colors.sh
. ~/projects/dotfiles/git/prompt.sh

. ~/projects/dotfiles/alias/general.sh
. ~/projects/dotfiles/alias/git.sh
. ~/projects/dotfiles/alias/dev.sh
. ~/projects/dotfiles/alias/projects.sh
