import { echo } from 'shelljs';
import fs from 'fs';
import prompt from 'prompt';
import { ArgumentNullError } from 'common-errors';

class Initializer {
  receivePrompt() {
    return new Promise((resolve, reject) => {
      prompt.get(['name', 'email', 'node', 'ruby'], (err, result) => {
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
        echo(`Generate ${fileName} success`);
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
          this.generateFile('.ruby-version', selection.ruby),
          this.generateFile('.gituser', this.getProfile(selection.email, selection.name)),
        ]))
        .catch(err => {
          reject(err);
        });
    });
  }

  run() {
    this.generate()
      .then(results => {
        results.forEach(result => echo(result));
      })
      .catch(errors => {
        errors.forEach(error => echo(error));
      });
  }
}

export default new Initializer();