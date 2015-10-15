# core settings
git config --global core.excludesfile ~/projects/dotfiles/git/.gitignore
git config --global core.ignorecase false

# alias related
git config --global alias.co checkout
git config --global alias.logs 'log --oneline --decorate'
git config --global alias.rb 'rebase -i HEAD~'
git config --global alias.rs 'reset --soft HEAD^'

git config --global alias.s stash
git config --global alias.sp 'stash pop'

git config --global alias.mt mergetool
git config --global alias.abort 'rebase --abort'
git config --global alias.continue 'rebase --continue'

git config --global alias.cb 'checkout -b'
git config --global alias.nb 'branch -m'
git config --global alias.db 'branch -D'
git config --global alias.origin 'branch -vv'

git config --global alias.load '!sh -c "git checkout $1 && git fetch && git rebase -p origin/$1"'

# colors related
git config --global color.ui always

git config --global color.branch.current yellow reverse
git config --global color.branch.local yellow
git config --global color.branch.remote green

git config --global color.diff.meta yellow bold
git config --global color.diff.grag magenta bold
git config --global color.diff.old red bold
git config --global color.diff.new green bold

git config --global color.status.added yellow
git config --global color.status.changed green
git config --global color.status.untracked cyan

# others
git config --global push.default current
