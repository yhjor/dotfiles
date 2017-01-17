import { exec } from 'shelljs';
import path from 'path';
import fs from 'fs';
import logatim from 'logatim';
import { ArgumentNullError } from 'common-errors';

const DOTS_NAME = 'dots';

export default class Symlink {
  static link(targetFolder) {
    if (!targetFolder) {
      throw new ArgumentNullError('targetFolder');
    }

    const files = fs.readdirSync(targetFolder);

    files.forEach((file) => {
      const basename = path.basename(file);
      const filePath = path.join(targetFolder, basename);

      logatim.setLevel('info');
      logatim.green.info(`Linking ${filePath} to your home directory...`);
      exec(`ln -sf ${filePath} ~`);
    });
  }

  static run() {
    this.link(path.resolve(__dirname, '..', '..', DOTS_NAME));
  }
}
