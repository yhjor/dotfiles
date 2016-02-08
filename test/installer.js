import test from 'tape';
import path from 'path';
import installer from '../src/tasks/installer';

const dotsFolder = path.resolve(__dirname, '..', 'dots');

test('should return correct js object', assert => {
  const error = installer.readPackages();
  assert.equal(error.message, 'Missing argument: path is not exist');
  assert.end();
});

test('should return correct js object', assert => {
  const packages = installer.readPackages(`${dotsFolder}/.packages`);

  assert.ok('brew' in packages);
  assert.ok('cask' in packages);
  assert.ok('apm' in packages);
  assert.ok('npm' in packages);

  assert.ok(Array.isArray(packages.npm));
  assert.ok(Array.isArray(packages.apm));
  assert.ok(Array.isArray(packages.brew));
  assert.ok(Array.isArray(packages.cask));

  assert.end();
});
