import { exec } from 'shelljs';
import path from 'path';
import fs from 'fs';
import logatim from 'logatim';
import { ArgumentNullError } from 'common-errors';

const DOTS_NAME = 'dots';

class Symlink {
  link(targetFolder) {
    if (!targetFolder) return new ArgumentNullError('targetFolder is not exist');

    const files = fs.readdirSync(targetFolder);

    files.forEach(file => {
      const basename = path.basename(file);
      const filePath = path.join(targetFolder, basename);

      logatim.setLevel('info');
      logatim.green.info(`Linking ${filePath} to your home directory...`);
      exec(`ln -sf ${filePath} ~`);
    });
  }

  source() {
    exec(`. ~/.bash_profile`);
  }

  run() {
    this.link(path.resolve(__dirname, '..', DOTS_NAME));
    this.source();
  }
}

export default new Symlink();
