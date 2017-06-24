const noteRoutes = require('./note_routes');

module.exports = function(app, db){
	noteRoutes(app, db);
	//TODO: add other route groups here
};