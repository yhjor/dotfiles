# Automate your dots

- Aggregate your preferences and configurations under version control
- Abstract complicated shell scripts with modern ES2015 in Node.js
- Design for simplicity and productivity for Node.js development

### What's inside

- atom's configs
- set of shell alias
- zsh and it's plugin using antigen
- a packages definition file of atom/brew/cask/npm/etc with auto installation
- osx settings

### General use cases

- `dot init`: Generate init configs (change to zsh and custom settings such as .gituser and .nvmrc to ~)
- `dot symlink`: Symbol link `dots/` files to `~`
- `dot preinstall`: Setup env for development before installation
- `dot preinstall (brew/dev/osx)`: Setup corresponding env for development before installation
- `dot install`: Install all packages defined in `dots/.packages` (in YAML format)
- `dot install (atom/brew/node)`: Install corresponding packages defined in `dots/.packages` (in YAML format)
- `npm run build` when you updated source inside `src` directory

## Highlight

### OSX settings (dots/.osx)

Just toggle your preferred settings and run `dot preinstall osx`:

	# Disable the sound effects on boot
	sudo nvram SystemAudioVolume=" "

	# Disable smart dashes as they’re annoying when typing code
	# defaults write NSGlobalDomain NSAutomaticDashSubstitutionEnabled -bool false

### Git Config (dots/.gitconfig)

	[branch]
	  autosetuprebase = always
	  autosetupmerge = always

	[apply]
	  whitespace = fix

    [push]
	  default = current

	[include]
   	  path = ~/.gituser

	[alias]
	  co = !sh -c \"git checkout $(git branch | peco --select-1)\"
   	  sq = !sh -c \"git rebase -i HEAD~$1\"
 	  clear = checkout -- .
      create-fix = !sh -c \"git fetch origin $(git current):fix/$1 && git checkout fix/$1 && git branch -u origin/$(git current) fix/$1\"

### Alias (dots/.alias)

	# Get public ip
	alias ip="dig +short myip.opendns.com @resolver1.opendns.com"

    # Mute sound
	alias mute="osascript -e 'set volume output muted true'"

	# Show/hide hidden files in Finder
	alias show-hidden="defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder"
	alias hide-hidden="defaults write com.apple.finder AppleShowAllFiles -bool false && killall Finder"

	# application shorthand
	alias t=trash
	alias port='netstat -anp tcp | grep'

	# General
	alias ..='cd ..'
	alias desktop='cd ~/Desktop && open .'

### Packages (dots/.packages)

  'apm':
    - linter-eslint
    - react

	'brew':
		- git
		- mongodb

	'cask':
		- java
		- google-chrome
		- atom
		- slack

	'npm':
		- babel-cli
		- webdriverio

Enjoy!
