# brew install antigen; brew list antigen
. $(brew --prefix)/Cellar/antigen/1/share/antigen.zsh

# antigen related
antigen use oh-my-zsh

antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-completions src

# look and feel of the terminal
antigen bundle mafredri/zsh-async
antigen bundle sindresorhus/pure

antigen apply

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
