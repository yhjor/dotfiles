import fs from 'fs';
import logatim from 'logatim';
import prompt from 'prompt';
import { ArgumentNullError } from 'common-errors';

class Initializer {
  receivePrompt() {
    return new Promise((resolve, reject) => {
      prompt.get(['name', 'email', 'node'], (err, result) => {
        if (err) {
          reject(`Fail to receive prompt: ${err.stack}`);
          return;
        }

        resolve(result);
      });
    });
  }

  generateFile(fileName, content) {
    if (!fileName) return Promise.reject(new ArgumentNullError('fileName'));
    if (!content) return Promise.reject(new ArgumentNullError('file content'));

    return new Promise((resolve, reject) => {
      fs.writeFile(`${process.env.HOME}/${fileName}`, content, err => {
        if (err) {
          reject(`Fail to write ${fileName} ${err.stack}`);
          return;
        }

        resolve(`Generate ${fileName} success`);
      });
    });
  }

  getProfile(email, name) {
    let profileContent = '[user]';

    if (email) profileContent += `\n  email = ${email}`;
    if (name) profileContent += `\n  name = ${name}`;

    return profileContent;
  }

  generate() {
    prompt.start();

    return this.receivePrompt()
      .then(selection => Promise.all([
        this.generateFile('.nvmrc', selection.node),
        this.generateFile('.gituser', this.getProfile(selection.email, selection.name)),
      ]));
  }

  run() {
    this.generate()
      .then(results => {
        logatim.setLevel('info');
        results.forEach(result => logatim.green.info(result));
      })
      .catch(errors => {
        errors.forEach(error => logatim.red.warn(error));
      });
  }
}

export default new Initializer();
