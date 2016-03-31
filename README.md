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

- `dot build` when you updated source inside `src` directory
- `dot init`: Generate init configs (change to zsh and custom settings such as .gituser and .nvmrc to ~)
- `dot symlink`: Symbol link `dots/` files to `~`
- `dot preinstall <brew/dev/osx/zsh>`: Setup env for development before installation
- `dot install (atom/brew/node)`: Install packages defined in `dots/.packages` (in YAML format)

## Example

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
