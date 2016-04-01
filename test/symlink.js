import fs from 'fs';
import path from 'path';
import test from 'tape';
import symlink from '../lib/tasks/symlink';

test('should return correct js object', assert => {
  try {
    symlink.link();
  } catch (error) {
    assert.equal(error.message, 'Missing argument: targetFolder');
    assert.end();
  }
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
