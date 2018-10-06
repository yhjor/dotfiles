BREW_PACKAGES=(ccat tree exa yarn mas m-cli)
NODE_PACKAGES=(diff-so-fancy git-recall public-ip-cli internal-ip-cli speed-test vtop tldr fkill-cli check-it-out)

# Install brew packages
for package in "${BREW_PACKAGES[@]}"
do
    which "$package" || brew install "$package"
done

# Install node packages
for package in "${NODE_PACKAGES[@]}"
do
  which "$package" || yarn global add "$package"
done

# Install development tools
which -s mongod || brew install mongodb && brew service start mongodb
which -s redis-cli || brew install redis && brew services start redis
which -s aws || brew install awscli
which -s gcloud || brew cask install google-cloud-sdk
which -s fuck || brew install the fuck
