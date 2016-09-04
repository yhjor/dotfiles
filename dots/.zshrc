# output without any warning
{
 # direnv hook
 eval "$(direnv hook zsh)"

 # nvm hook
 . $(brew --prefix nvm)/nvm.sh
 nvm use --delete-prefix
} &> /dev/null

# alias related
[[ -r ~/.alias ]] && . ~/.alias

# functions related
[[ -r ~/.functions ]] && . ~/.functions

# setup antigen
[ -f ~/.antigenrc ] && . ~/.antigenrc

# install fzf
[ -f ~/.fzf.zsh ] && . ~/.fzf.zsh

# mount autocomplete scripts
[ -f ~/.autocomplete ] && . ~/.autocomplete
