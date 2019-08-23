exports.findById = function(users, id, cb) {
  process.nextTick(function() {
    const user = users.find((user) => user.id === id);
    if (user) {
      cb(null, user);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(users, username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.username === username) {
        return cb(null, user);
      }
    }
    return cb(null, null);
  });
}