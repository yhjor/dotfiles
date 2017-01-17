# output without any warning
{
 # direnv hook
 eval "$(direnv hook zsh)"

 # nvm hook
 source $(brew --prefix nvm)/nvm.sh
 nvm use --delete-prefix
} &> /dev/null

# alias related
[[ -r ~/.alias ]] && source ~/.alias

# setup antigen
[ -f ~/.antigenrc ] && source ~/.antigenrc

# mount autocomplete scripts
[ -f ~/.autocomplete ] && source ~/.autocomplete

# for the look and feel
autoload -U promptinit; promptinit
prompt pure
