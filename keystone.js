// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// // MongoDB
// // lets require/import the mongodb native drivers.
// // var mongodb = require('mongodb');

// // We need to work with "MongoClient" interface in order to connect to a mongodb server.
// var MongoClient = mongodb.MongoClient;

// // Connection URL. This is where your mongodb server is running.
// var url = 'mongodb+srv://admin:1234@chiefs-store-6qgtt.mongodb.net/test?retryWrites=true';


// // Use connect method to connect to the Server
// MongoClient.connect(url, function (err, db) {
// 	if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     console.log('Connection established to', url);

//     // do some work here with the database.

//     // Close connection
//     db.close();
// 	}
// });

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Chiefs\' Store',
	'brand': 'Chiefs\' Store',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	// TODO: Replace it with local upload.
	// Temporary image upload using cloudinary.
  'cloudinary config': 'cloudinary://139174421748419:pR_PRtCOhksxlDYT4vVyIYZnM2E@vherniel',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	enquiries: 'enquiries',
	users: 'users',
});

// STRIPE CONFIGURATIONS
// Setup Store's Gateway
keystone.set('store gateway', 'stripe');
// Setup Default Country
keystone.set('store country', 'Philippines');
// Setup Stripe Keys
keystone.set('stripe secret key', process.env.STRIPE_SECRET_KEY || 'STRIPE_SECRET_KEY');
keystone.set('stripe publishable key', process.env.STRIPE_PUBLISHABLET_KEY || 'STRIPE_PUBLISHABLE_KEY');

// Start Keystone to connect to your database and initialise the web server

keystone.start();
