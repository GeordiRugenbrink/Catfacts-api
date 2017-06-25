var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
	//gets a catfact on the id you give to the link
	app.get('/catfacts/:id', (req, res) => {
    	const id = req.params.id;
    	const details = { '_id': new ObjectID(id) };
    	db.collection('catfacts').findOne(details, (err, item) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send(item);
	      } 
    	});
  	});
		//deletes a catfact on the id you give to it
  	app.delete('/catfacts/:id', (req, res) => {
    	const id = req.params.id;
    	const details = { '_id': new ObjectID(id) };
    	db.collection('catfacts').remove(details, (err, item) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send('Catfact' + id + ' deleted!');
	      } 
    	});
  	});
		//updates a catfact on the id you give to it
  	app.put('/catfacts/:id', (req, res) =>{
  		const id = req.params.id;
  		const details = {	'_id': new ObjectID(id)	};
  		const note = {	fact: req.body.body	};
  		db.collection('catfacts').update(details, note, (err, result) => {
  			if(err){
  				res.send({'error': 'An error has occurred!'});
  			} else {
  				res.send(note);
  			}
  		});
  	});
	//creates a new catfact
	app.post('/catfacts', (req, res) =>{
		const catfact = {	fact: req.body.body	};
		db.collection('catfacts').insert(catfact, (err, result) =>{
			if(err){
				res.send({	'error': 'An error has occurred'	});
			} else {
				res.send(result.ops[0]);
			}
		});
	});
};
