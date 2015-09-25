# 1. Add this to ~/.bashrc for mounting in case of your dotfiles folder is under a folder named projects
#  . ~/projects/dotfiles/.profile.sh

# 2. Add
# if [ -f ~/.bashrc ]; then
#    source ~/.bashrc
# fi
# to ~/.bash_profile

git config --global core.excludesfile ~/projects/dotfiles/git/.gitignore

. ~/projects/dotfiles/git/colors.sh
. ~/projects/dotfiles/git/prompt.sh

. ~/projects/dotfiles/alias/general.sh
. ~/projects/dotfiles/alias/git.sh
. ~/projects/dotfiles/alias/dev.sh
. ~/projects/dotfiles/alias/projects.sh
