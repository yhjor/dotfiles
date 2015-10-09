alias g=git
alias reset='git reset --soft HEAD^'
alias stash='git stash'
alias pop='git stash pop'
alias origin='git branch -vv'
alias fetch=git_fetch

# function definition
git_fetch() {
  if [ -z $1 ]; then
    return 'Please enter a remote branch'
  else
    git fetch
    git rebase -p origin/$1
  fi
}
