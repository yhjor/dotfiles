import fs from 'fs';
import logatim from 'logatim';
import prompt from 'prompt';
import { ArgumentNullError } from 'common-errors';
import { exec } from 'shelljs';

class Initializer {
  receivePrompt() {
    return new Promise((resolve, reject) => {
      prompt.get(['name', 'email', 'node'], (err, result) => {
        if (err) return reject(`Fail to receive prompt: ${err.stack}`);
        resolve(result);
      });
    });
  }

  generateFile(fileName, content) {
    if (!fileName) return Promise.reject(new ArgumentNullError('fileName is not exist'));
    if (!content) return Promise.reject(new ArgumentNullError('file content is not exist'));

    return new Promise((resolve, reject) => {
      fs.writeFile(`${process.env.HOME}/${fileName}`, content, err => {
        if (err) return reject(`Fail to write ${fileName} ${err.stack}`);
        logatim.green.info(`Generate ${fileName} success`);
        resolve();
      });
    });
  }

  getProfile(email, name) {
    let profileContent = `[user]`;

    if (email) profileContent += `\n  email = ${email}`;
    if (name) profileContent += `\n  name = ${name}`;

    return profileContent;
  }

  generate() {
    return new Promise((resolve, reject) => {
      prompt.start();

      this.receivePrompt()
        .then(selection => Promise.all([
          this.generateFile('.nvmrc', selection.node),
          this.generateFile('.gituser', this.getProfile(selection.email, selection.name)),
        ]))
        .catch(err => {
          reject(err);
        });
    });
  }

  createNpmrc() {
    exec('npm login');
  }

  run() {
    this.createNpmrc();

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
