# 1. Add this to ~/.bashrc for mounting in case of your dotfiles folder is under a folder named projects
#  . ~/projects/dotfiles/.profile.sh

# 2. Add
# if [ -f ~/.bashrc ]; then
#    source ~/.bashrc
# fi
# to ~/.bash_profile


git config --global core.excludesfile ./bash/.gitignore

. ~/projects/dotfiles/bash/.colors.sh
. ~/projects/dotfiles/bash/.prompt.sh
. ~/projects/dotfiles/bash/.alias.sh
. ~/projects/dotfiles/bash/.development.sh
. ~/projects/dotfiles/bash/.projects.sh
