# 1. Add this to ~/.bashrc for mounting in case of your automator folder is under a folder named projects
#  . ~/projects/automator/.profile.sh

# 2. Add
# if [ -f ~/.bashrc ]; then
#    source ~/.bashrc
# fi
# to ~/.bash_profile


git config --global core.excludesfile ./bash/.gitignore

. ~/projects/automator/bash/.colors.sh
. ~/projects/automator/bash/.prompt.sh
. ~/projects/automator/bash/.alias.sh
. ~/projects/automator/bash/.projects.sh
