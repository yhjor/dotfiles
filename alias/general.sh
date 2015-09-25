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
alias desktop='cd ~/Desktop && open .'
alias rm=rm_rf
