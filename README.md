# Automate your dots

- Aggregate your preferences and configurations under version control
- Abstract complicated bash scripts with modern ES2015 in Node.js
- Design for maximizing simplicity and productivity

###  How to use

1. Clone this project
2. `npm install && npm run build`
3. Execute Node.js in root directory: `node .` (alias `dot`)
4. Enter personal info and preferences (~/.gituser, ~/.ruby-version, and ~/.npmrc will be generated)
5. `. ~/.bash_profile`

### General use cases

- `dot init`: Generate init configs (.gituser, .nvmrc and .ruby-version in ~ folder)
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

### Terminal Config (dots/.bash_prompt)

The above files gave the look and feel for development using Git:

![alt tag](https://raw.github.com/yhjor1212/dotfiles/master/docs/git_clean.png)

The line will look like this if there are any new changes:

![alt tag](https://raw.github.com/yhjor1212/dotfiles/master/docs/git_dirty.png)

You can change the terminal style in .bash_prompt easily.

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
