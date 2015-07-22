alias ls='ls -a'
alias home='cd ~'
alias ~='cd ~'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias reload='chmod +x ~/.bashrc && . ~/.bashrc'
alias desktop='cd ~/Desktop'
alias i='npm i'
alias g='gulp'

# Git related
git_fetch() {
  if [ -z $1 ]; then
    return 'Please enter a remote branch'
  else
    git fetch
    git rebase -p origin/$1
  fi
}

git_rebase() {
  if [ -z $1 ]; then
    return 'Please enter a number from HEAD to rebase'
  else
    git rebase -i HEAD~$1
  fi
}

git_change_branch() {
  if [ -z $1 ]; then
    return 'Please enter a new brnach name'
  else
    git branch -m $1
  fi
}

git_checkout() {
  if [ -z $1 ]; then
    return 'Please enter a brnach name to checkout'
  else
    git checkout $1
  fi
}

alias log='git log'
alias logs='git log --oneline'
alias status='git status -sb'
alias branch='git branch'
alias push='git push origin master'
alias pull='git pull origin master'
alias reset='git reset --soft HEAD^'
alias abort='git rebase --abort'
alias continue='git rebase --continue'
alias mergetool='git mergetool'
alias fetch=git_fetch
alias squash=git_rebase
alias rename=git_change_branch
alias switch=git_checkout

# Development related
alias inspector='node-inspector --preload-false'
