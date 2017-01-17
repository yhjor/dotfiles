import fs from 'fs';
import logatim from 'logatim';
import inquirer from 'inquirer';
import { ArgumentNullError } from 'common-errors';

export default class Initializer {
  static receivePrompt() {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter your Git name',
        },
        {
          type: 'input',
          name: 'email',
          message: 'Enter your Git email',
        },
        {
          type: 'input',
          name: 'node',
          message: 'Enter a Node version',
          default: () => '7',
        },
      ]);
  }

  static generateFile(fileName, content) {
    if (!fileName) return Promise.reject(new ArgumentNullError('fileName'));
    if (!content) return Promise.reject(new ArgumentNullError('file content'));

    return new Promise((resolve, reject) => {
      fs.writeFile(`${process.env.HOME}/${fileName}`, content, (err) => {
        if (err) {
          reject(`Fail to write ${fileName} ${err.stack}`);
          return;
        }

        resolve(`Generate ${fileName} success`);
      });
    });
  }

  static getProfile(email, name) {
    let profileContent = '[user]';

    if (email) profileContent += `\n  email = ${email}`;
    if (name) profileContent += `\n  name = ${name}`;

    return profileContent;
  }

  static generate() {
    return this.receivePrompt()
      .then(selection => Promise.all([
        this.generateFile('.nvmrc', selection.node),
        this.generateFile('.gituser', this.getProfile(selection.email, selection.name)),
      ]));
  }

  static run() {
    this.generate()
      .then((results) => {
        logatim.setLevel('info');
        results.forEach(result => logatim.green.info(result));
      })
      .catch((errors) => {
        errors.forEach(error => logatim.red.warn(error));
      });
  }
}

