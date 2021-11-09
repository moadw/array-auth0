function getByEmail(email, callback) {
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://root:DpkgQYeDiIuTpWDF@cluster0.nlwix.mongodb.net');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('testarray');
    const users = db.collection('users');

    users.findOne({ "contactInfo.email" : email }, function (err, user) {
      client.close();

      if (err) return callback(err);
      if (!user) return callback(null, null);

      return callback(null, {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.contactInfo.email
      });
    });
  });
}

