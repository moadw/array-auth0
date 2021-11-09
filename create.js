async function create(user,callback){
		const bcrypt=require('bcrypt');
		const { v1: uuidv1 } = require('uuid');
		const MongoClient=require('mongodb@3.1.4').MongoClient;
		const client=await MongoClient.connect('mongodb+srv://root:DpkgQYeDiIuTpWDF@cluster0.nlwix.mongodb.net');
		if(!client){
			await client.close();
			callback(client);
			return client;
		}
		const db=client.db('testarray');
		//let claim=await db.collection('claimtypes').findOne({identifier:'claimed'});
		let type=await db.collection('usertypes').findOne({identifier:'regular'});
  	let settingsId=uuidv1();
		let settings=await db.collection('usersettings').insert({
      _id:settingsId,
			jobsAlert:true,
			emailNotification:true,
			newsletterNotification:true,
			showProfile:true,
			showGender:true,
			showBirthday:true,
			showRace:true,
			showPhone:true,
			showEmail:true,
			showLocation:true,
			showRepresentate:true
		});
		
		if(!settings){
			await client.close();
			callback(client);
			return settings;
		}
		
		const data={};
		data._id=uuidv1();
		data.companies=[];
		data.firstName=user.given_name;
		data.lastName=user.family_name;
		data.race=[];
		data.password=bcrypt.hashSync(user.password,bcrypt.genSaltSync(10));
		data.type=type._id;
		data.contactInfo={email:user.email.trim()};
		data.settings=settingsId;
		data.experience={industryPreference:[],jobExperiences:[]};
		data.educationTrainings=[];
		data.languages=[];
		data.verified=false;
		data.deleted=false;
		data.recognition={awards:[],certifications:[]};
		data.pressLinks=[];
		data.credits=[];
		data.socialInfo={};
		data.softRejected=false;
		data.rejected=false;
		data.softRejectedReason=[];
		data.rejectedReason=[];
		data.softRejectedNotes="";
		data.rejectedNotes="";
		//data.claim=claim._id;
		data.acceptedCopyright=false;
		data.createdAt=new Date();
		data.updatedAt=new Date();
  	data.email_verified= true;
  	data.verify_email= false;

		try{
       let res=await db.collection('users').insert(data);
    }catch(e){
       await client.close();
       callback(e);
       return e;
    }
		await client.close();
		callback(null);
		return null;
}
