import commander from 'commander';
import runner, { OPTIONS } from './runner';

commander
  .option(OPTIONS.INIT, 'Prompt and generate user configs into ~ folder')
  .option(OPTIONS.SYMLINK, 'Symlink all dotfiles under dots/ directory to ~ directory')
  .option(`${OPTIONS.SETUP} [value]`, 'Setup necessary dependencies')
  .option(`${OPTIONS.INSTALL} [value]`, 'Install package defined in dots/.package')
  .parse(process.argv);

runner.checkGit();
runner.checkNpm();
runner.dispatchAction(commander);
