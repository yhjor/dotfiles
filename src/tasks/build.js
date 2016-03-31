import { exec } from 'shelljs';

class Build {
  run() {
    exec('npm run build');
  }
}

export default new Build();
