alias log='git log'
alias logs='git log --oneline'
alias status='git status -sb'
alias branch='git branch'
alias pull='git pull origin master'
alias reset='git reset --soft HEAD^'
alias abort='git rebase --abort'
alias continue='git rebase --continue'
alias stash='git stash'
alias pop='git stash pop'
alias push=git_push
alias fetch=git_fetch
alias create=git_new_branch

# short form
alias x='gitx'
alias mt='git mergetool'
alias rb=git_rebase
alias rn=git_change_branch
alias co=git_checkout

# function definition
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
