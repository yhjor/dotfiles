BREW_PACKAGES=(ccat tree exa yarn)
NODE_PACKAGES=(diff-so-fancy git-recall public-ip-cli internal-ip-cli speed-test)

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
