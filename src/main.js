import commander from 'commander';
import runner, { OPTIONS } from './runner';

commander
  .option(OPTIONS.BUILD, 'Build src folder when the logic inside has been changed')
  .option(OPTIONS.INIT, 'Prompt and generate user configs into ~ folder')
  .option(OPTIONS.SYMLINK, 'Symlink all dotfiles under dots/ directory to ~ directory')
  .option(`${OPTIONS.PREINSTALL} [value]`, 'Setup brew and necessary OSX configs')
  .option(`${OPTIONS.INSTALL} [value]`, 'Install package defined in dots/.package')
  .parse(process.argv);

runner.checkGit();
runner.checkNpm();
runner.dispatchAction(commander);
