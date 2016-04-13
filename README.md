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

- `npm i && npm run build && npm link`: make the dot command running
- `dot init`: Generate init configs (change to zsh and custom settings such as .gituser and .nvmrc to ~)
- `dot symlink`: Symbol link `dots/` files to `~`
- `dot setup [osx/zsh/dev]`: Setup env for development before installation
- `dot install [brew/apm/npm]`: Install packages defined in `dots/.packages` (in YAML format)
- `reload` or `. ~/.zshrc`: reload the dot changes in case it doesn't take effect

## Example

### OSX settings (dots/.osx)

Just toggle your preferred settings and run `dot setup osx`:

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
