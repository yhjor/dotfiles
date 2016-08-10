import { exec } from 'shelljs';
import path from 'path';
import fs from 'fs';
import { ArgumentNullError } from 'common-errors';
import intersection from 'lodash/intersection';

const DOTS_NAME = 'dots';
const CLI_FILE_NAME = '.cli';

const CLI_FILE = path.resolve(__dirname, '..', '..', DOTS_NAME, CLI_FILE_NAME);

class CLI {
  constructor() {
    if (!this.hasCliFile()) {
      throw new ArgumentNullError('.cli');
    }

    this.commands = require(CLI_FILE);
  }

  hasCliFile() {
    try {
      fs.statSync(CLI_FILE);
    } catch (err) {
      return err.code !== 'ENOENT';
    }

    return true;
  }

  inputMatch() {
    return !!this.validCommands().length;
  }

  validCommands() {
    return intersection(Object.keys(this.commands), process.argv);
  }

  run() {
    const command = this.validCommands()[0];
    exec(this.commands[command]);
  }
}

export default new CLI();
