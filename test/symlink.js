import fs from 'fs';
import path from 'path';
import test from 'tape';
import symlink from '../src/tasks/symlink';

test('should return correct js object', assert => {
  const error = symlink.link();
  assert.equal(error.message, 'Missing argument: targetFolder is not exist');
  assert.end();
});

test('should generate valid symbol link', assert => {
  const dotsFolder = path.resolve(__dirname, '..', 'dots');

  symlink.link(dotsFolder);

  const files = fs.readdirSync(dotsFolder);

  files.forEach(file => {
    const basename = path.basename(file);
    const stats = fs.lstatSync(`${process.env.HOME}/${basename}`);
    assert.ok(stats.isSymbolicLink);
  });

  assert.end();
});
