export PATH="/usr/local/sbin:$PATH"

# output without any warning
{
 # direnv hook
 eval "$(direnv hook zsh)"

 # nvm hook
 source $(brew --prefix nvm)/nvm.sh
 nvm use --delete-prefix
} &> /dev/null

# alias related
[[ -r ~/.alias ]] && source ~/.alias

# for z
. /usr/local/etc/profile.d/z.sh

# for zsh-completions
fpath=(/usr/local/share/zsh-completions $fpath)

# mount autocomplete scripts
[ -f ~/.autocomplete ] && source ~/.autocomplete

# command auto suggestion
[ -f /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh ] && source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# for the look and feel
autoload -U promptinit; promptinit
prompt pure

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
[ -f ~/.custom ] && source ~/.custom

# extend paths
export PATH="$PATH:`yarn global bin`"
