import { exec } from 'shelljs';
import fs from 'fs';
import yaml from 'js-yaml';
import { ArgumentNullError } from 'common-errors';

const INSTALLATION_FILE = '.packages';

class Installer {
  constructor() {
    this.packages = this.readPackages(`${process.env.HOME}/${INSTALLATION_FILE}`);
  }

  readPackages(path) {
    if (!path) return new ArgumentNullError('path is not exist');

    const readFile = fs.readFileSync(path, 'utf8');
    return yaml.safeLoad(readFile);
  }

  brew() {
    (this.packages.brew || []).forEach(brewPackage => exec(`brew install ${brewPackage}`));
    (this.packages.cask || []).forEach(caskPackage => exec(`brew cask install ${caskPackage}`));
  }

  atom() {
    (this.packages.apm || []).forEach(apmPackage => exec(`apm install ${apmPackage}`));
  }

  node() {
    (this.packages.npm || []).forEach(npmPackage => exec(`npm install -g ${npmPackage}`));
  }

  run(option) {
    const fullInstall = option === true;

    if (fullInstall || option === 'brew') this.brew();
    if (fullInstall || option === 'atom') this.atom();
    if (fullInstall || option === 'node') this.node();
  }
}

export default new Installer();
