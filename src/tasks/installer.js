import { exec } from 'shelljs';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { ArgumentNullError } from 'common-errors';

const INSTALLATION_FILE = '.packages';
const DOTS_NAME = 'dots';

class Installer {
  constructor() {
    this.packages = this.readPackages(
      path.resolve(__dirname, '..', '..', DOTS_NAME, INSTALLATION_FILE)
    );
  }

  readPackages(packagePath) {
    if (!packagePath) return new ArgumentNullError('packagePath is not exist');

    const readFile = fs.readFileSync(packagePath, 'utf8');
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
