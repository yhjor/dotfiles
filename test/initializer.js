import fs from 'fs';
import test from 'tape';
import initializer from '../lib/tasks/initializer';

const after = test;
const TEST_FILE = 'file.test';

test('should not generate file when file name is not exist', assert => {
  initializer
    .generateFile()
    .catch(error => {
      assert.equal(error.message, 'Missing argument: fileName');
      assert.end();
    });
});

test('should not generate file when file content is not exist', assert => {
  initializer
    .generateFile(TEST_FILE)
    .catch(error => {
      assert.equal(error.message, 'Missing argument: file content');
      assert.end();
    });
});

test('should generate file successfully', assert => {
  initializer
    .generateFile(TEST_FILE, 'this is a test')
    .then(() => {
      try {
        fs.statSync(`${process.env.HOME}/${TEST_FILE}`);
      } catch (err) {
        assert.fail(err.message);
        assert.end();
        return;
      }

      assert.pass();
      assert.end();
    });
});

after('clear the generated file after testing', assert => {
  fs.unlinkSync(`${process.env.HOME}/${TEST_FILE}`);

  try {
    fs.statSync(`${process.env.HOME}/${TEST_FILE}`);
  } catch (err) {
    assert.pass();
    assert.end();
    return;
  }

  assert.fail();
  assert.end();
});
