rm_rf() {
  if [ -z $1 ]; then
    return 'Please enter files to be deleted'
  else
    rm -rf $1
  fi
}


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
alias rm=rm_rf

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

git_push() {
  if [ -z $1 ]; then
    return 'Please enter a origin brnach name to push'
  else
    git push origin $1
  fi
}

git_new_branch() {
  if [ -z $1 ]; then
    return 'Please enter a new brnach name to checkout'
  else
    git checkout -b $1
  fi
}

alias x='gitx'
alias log='git log'
alias logs='git log --oneline'
alias status='git status -sb'
alias branch='git branch'
alias pull='git pull origin master'
alias reset='git reset --soft HEAD^'
alias abort='git rebase --abort'
alias continue='git rebase --continue'
alias mergetool='git mergetool'
alias stash='git stash'
alias pop='git stash pop'
alias push=git_push
alias fetch=git_fetch
alias rebase=git_rebase
alias rename=git_change_branch
alias create=git_new_branch
alias checkout=git_checkout

# Development related
alias inspector='node-inspector --preload-false'
