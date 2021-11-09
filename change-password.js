function changePassword(email, newPassword, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://root:DpkgQYeDiIuTpWDF@cluster0.nlwix.mongodb.net');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('testarray');
    const users = db.collection('users');

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) {
        client.close();
        return callback(err);
      }

      users.update({ 'contactInfo.email': email }, { $set: { password: hash } }, function (err, count) {
        client.close();
        if (err) return callback(err);
        callback(null, true);
      });
    });
  });
}

