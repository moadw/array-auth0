function verify (email, callback) {
  try{
  	const MongoClient = require('mongodb@3.1.4').MongoClient;
    const client = new MongoClient('mongodb+srv://root:DpkgQYeDiIuTpWDF@cluster0.nlwix.mongodb.net');

    client.connect(function (err) {
      if (err) return callback(err);

      const db = client.db('testarray');
      const users = db.collection('users');
      const query = { "contactInfo.email": email, email_verified: false };

      users.update(query, { $set: { email_verified: true } }, function (err, count) {
        client.close();

        if (err) return callback(err);
        callback(null);
        return(null);
      });
    });
  }
  catch(e){
    console.log(e);
  	return(e);
  }
  
}


