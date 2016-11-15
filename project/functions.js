function asyncDouble (n, cb) {
  setTimeout(function () {
    if (typeof n !== 'number') {
      cb(new TypeError('Expected number'));
    } else {
      cb(null, n * 2);
    }
  }, 10);
}

function checkWin (score) {
  if (score < 20) {
    throw new Error('Too low');
  } else {
    return 'You win!';
  }
}

module.exports = {
  asyncDouble,
  checkWin,
};
