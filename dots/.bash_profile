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

# alias related
[[ -r ~/.alias ]] && . ~/.alias

# personalize terminal settings with git status and color config
[[ -r ~/.bash_prompt ]] && . ~/.bash_prompt
