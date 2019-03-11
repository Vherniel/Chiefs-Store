var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set Locals
	locals.section = 'store';

	// Load Products
	// keystone.list('MODEL')
	view.query('products', keystone.list('Product').model.find());

	// Render View
	view.render('products');
};
