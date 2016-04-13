import inquirer from 'inquirer';
import runner, { OPTIONS } from './runner';

runner.checkBrew();

inquirer
  .prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Choose an operation',
      choices: [
        OPTIONS.INIT,
        OPTIONS.SYMLINK,
        OPTIONS.SETUP,
        OPTIONS.INSTALL,
        OPTIONS.EXIT,
      ],
    },
  ])
  .then(({ option }) => {
    runner.dispatchAction(option);
  });
