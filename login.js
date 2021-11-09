function login(email, password, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://root:DpkgQYeDiIuTpWDF@cluster0.nlwix.mongodb.net');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('testarray');
    const users = db.collection('users');

    users.findOne({ "contactInfo.email": email }, function (err, user) {
      if (err || !user) {
        client.close();

        if (err) {
          return callback(new Error('Error: Incorrect username or password'));
        }

        if (!user) {
          return callback(new WrongUsernameOrPasswordError(email, `Incorrect username or password`));
      	}
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        client.close();
         if (err || !isValid){
           if (err) return callback(err);
           if (!isValid) return callback(new WrongUsernameOrPasswordError(email, 'Incorrect username or password'));
         }


        delete user.password;

        return callback(null, {
            id : user._id.toString(),
            firstName: user.firstName,
            email: user.contactInfo.email,
          	user_metadata: user,
          });
      });
    });
  });
}

