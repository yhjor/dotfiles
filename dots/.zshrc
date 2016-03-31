# output without any warning
{
 # direnv hook
 eval "$(direnv hook bash)"

 # nvm hook
 . $(brew --prefix nvm)/nvm.sh
 nvm use --delete-prefix

 # rbenv hook
 if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
} &> /dev/null

# setup antigen
[ -f ~/.antigenrc ] && . ~/.antigenrc

# install fzf
[ -f ~/.fzfrc ] && . ~/.fzfrc

# alias related
[[ -r ~/.alias ]] && . ~/.alias
