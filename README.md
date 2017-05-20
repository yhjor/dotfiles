# Automate your dots

<a href="https://travis-ci.org/yhjor1212/dotfiles">
	<img alt="Travis Status" src="https://img.shields.io/travis/yhjor1212/dotfiles.svg">
</a>

- Aggregate your preferences and configurations under version control
- Abstract complicated shell scripts with modern ES2015 in Node.js
- Design for simplicity and productivity for Node.js development

### What's inside

- zsh and plugins
- set of shell alias
- configurable OSX settings
- a packages definition file of brew/yarn/etc with auto installation

### Before Start

`source setup.sh`

It will install all necessary packages for MacOS such as brew and npm.

After installation: `yarn link` or `yarn global add @yhjor/dotfiles`

## The dot commands

Just execute `dot` in your shell, an interactive command will be shown.

![Alt text](docs/main.png?raw=true "dot command")

And you might need to initialize it once since different machines might have different configs:

![Alt text](docs/init.png?raw=true "init")

Symlink all dotfiles makes editing easy:

![Alt text](docs/symlink.png?raw=true "symlink")

Switching from bash to zsh is necessary, Sorry :)

![Alt text](docs/setup.png?raw=true "setup")

## The dot files

### OSX Settings (dots/.osx)

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

### More

Take a look inside `./dots`

Enjoy!
