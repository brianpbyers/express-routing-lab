var express = require('express');
var bodyParser = require('body-parser');
router = express.Router();

var candies = [{"id":1, "name":"Snickers", "color":"Brown"},
				{"id":2, "name":"Skittles", "color":"Rainbow"},
				{"id":3, "name":"LaffyTaffy", "color":"Pink"},
				{"id":4, "name":"Jolly Ranchers" ,"color":"Green"}];

//What would need to go into candies
//in order to pass our first test?

router.get('/', function(req,res) {
	// What would go here? 
	// Hint: we want all candies in JSON format
	//INDEX response
	res.send(candies);
});

// Fill out the rest of the routes here
//SHOW response
router.get('/:id', (req,res)=>{
	res.send(candies[Number(req.params.id)-1]);
});

//CREATE Response
router.post('/',(req,res)=>{
	req.body.id = candies.length+1;
	if(req.body.name && req.body.color){
		console.log('creating a new candy');
		candies.push(req.body);
		res.send(req.body);
	} else{
		console.log('invalid candy create request received');
		res.send('Error: Invalid Candy type.  Please give your candy a valid name and color.');
	}
});

//UPDATE Response
router.put('/:id', (req,res)=>{
	let myID = Number(req.params.id);
	console.log('updating candy id',req.params.id);
	if(req.body.name){
		candies[myID-1].name = req.body.name;
	}
	if(req.body.color){
		candies[myID-1].color = req.body.color;	}
	if(!(req.body.color || req.body.name)){
		console.log('invalid candy update request received');
		res.send('Please update a name, color, or both');
	}
	res.send(candies[myID-1]);
});

//DESTROY Response
router.delete('/:id', (req,res)=>{
	//Zeb said we wanted to leave the null in the array.  Otherwise I'd use splice and re-index the objects
	let myID = Number(req.params.id)-1;
	candies[myID] = null;
	console.log('Delete Candy Request received');
	res.send('successfully deleted Candy number ' + (myID + 1) + '.');
});

module.exports = router;