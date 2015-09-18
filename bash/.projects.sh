# Project related
alias projects='cd ~/projects'
alias auto='cd ~/projects/dotfiles'
alias starter='cd ~/projects/react-starter'

# Job special
alias draft=draft
alias mpush=mpush
alias wlp='cd ~/projects/m800-white-label-portal && direnv allow'
alias mdebug='node --debug bin/www'
alias gt='NODE_ENV=test gulp'
alias test='npm run test'

draft() {
  if [ -z $1 ]; then
    return 'Please enter a branch name to push draft'
  else
    git push origin HEAD:refs/drafts/$1
  fi
}

mpush() {
  if [ -z $1 ]; then
    return 'Please enter a branch name to push'
  else
    git push origin @:refs/for/$1
  fi
}
