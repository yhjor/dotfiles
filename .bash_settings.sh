# Add this to ~/.bash_profile for mounting
#if [ -f "$(pwd)/automator/.bash_settings.sh" ]; then
#  . "$(pwd)/automator/.bash_settings.sh"
#fi

git config --global core.excludesfile ./bash/.gitignore

if [ -f "$(pwd)/bash/.git-prompt.sh" ]; then
  . "$(pwd)/bash/.git-prompt.sh"
fi

if [ -f "$(pwd)/bash/.alias.sh" ]; then
  . "$(pwd)/bash/.alias.sh"
fi
