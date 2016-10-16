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

# setup antigen
[ -f ~/.antigenrc ] && . ~/.antigenrc

# mount autocomplete scripts
[ -f ~/.autocomplete ] && . ~/.autocomplete

# for the look and feel
autoload -U promptinit; promptinit
prompt pure
