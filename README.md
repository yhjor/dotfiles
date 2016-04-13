# Automate your dots

- Aggregate your preferences and configurations under version control
- Abstract complicated shell scripts with modern ES2015 in Node.js
- Design for simplicity and productivity for Node.js development

### What's inside

- zsh, antigen and it's plugin
- set of shell alias
- configurable OSX settings
- a packages definition file of atom/brew/cask/npm/etc with auto installation
- atom's configs

### General use cases

- `npm i && npm run build && npm link`: make the dot command running
- `dot`: an interactive commander will be shown
- `. ~/.zshrc`: reload the dot changes in case it doesn't take effect

## Example

### OSX settings (dots/.osx)

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
	  co = !sh -c \"git checkout $(git branch | fzf)\"
   	diffs = "!git diff --color $@ | diff-so-fancy"
 	  bo = !sh -c \"git fetch origin $(git current):feature/$1 && git checkout feature/$1 && git branch -u origin/$(git current) feature/$1\"
		clear-merged = !sh -c \"git branch --merged | grep -E 'feature/|fix/' | grep -v \\* | xargs -n 1 git branch -d\"

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

### More

	Take a look inside `./dot`

Enjoy!
