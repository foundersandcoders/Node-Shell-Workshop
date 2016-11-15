var test = require('tape');
var { asyncDouble, checkWin } = require('./functions');

test('Description for your test', function(t) {
  t.pass('just testing everything works');
  t.end();
});

test('Simple values, number, strings, booleans', function(t) {
  t.equal(1, 1);
  t.equal('string', 'string');
  t.equal(true, true);
  t.end();
});

test('Complex values - objects and arrays', function(t) {
  t.deepEqual([1, 2, 3], [1, 2, 3]);
  t.deepEqual({}, {});
  t.end();
});

test('Truthy and falsy', function(t) {
  t.ok(true);
  t.notOk(false);
  t.notOk('');
  t.end();
});

test('Async testing', function(t) {
  asyncDouble(2, function (error, value) {
    t.equal(error, null);
    t.equal(value, 4);
    t.end();
  });
});

test('Error handling', function(t) {
  t.throws(function () { return checkWin(19); });
  t.equal(checkWin(20), 'You win!');
  t.end();
});
