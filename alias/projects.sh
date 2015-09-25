# Maaii special
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

alias draft=draft
alias mpush=mpush
alias mdebug='node --debug bin/www'
alias wlp='cd ~/projects/m800-white-label-portal && direnv allow'

# Otras
alias dotfiles='cd ~/projects/dotfiles'
alias dev='npm run development'
