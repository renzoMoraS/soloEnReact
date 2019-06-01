const express = require('express');
var bodyParser = require('body-parser');

const app = express();

//app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Settings
app.set('port', process.env.PORT || 4000);

app.get('/',function(req,res){
	res.write('<h1>Server Node</h1>');
	res.end();
});

app.post('/sasara',function(req,res){
	console.log(req.body);
});


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});