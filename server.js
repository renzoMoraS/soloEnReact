const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies

// Settings
app.set('port', process.env.PORT || 4000);


var options = { 
   method: "POST",
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json' 
   }
};

var token;

app.get('/',function(req,res){
	res.write('<h1>Server Node</h1>');
	res.end();
});

app.post('/token',function(req,rest){
    var url = req.body.url;
    request.post({url: url, json:true, options},function(req,res,body){
        token = body
        rest.send('token')
    })
})

app.post('/sasara',function(req,res){

    var murl = "https://api.mercadolibre.com/orders/search?seller="+ token.user_id +"&order.status=paid&access_token="+ token.access_token;

    request.get({url: murl}, function (error, response, body) {
        var orders = JSON.parse(body);
        res.send(orders)
    })
});	


app.post('/categories',function(req,res){
    console.log(req.body.category);
    var cat = req.body.category;
    var url = 'https://api.mercadolibre.com/categories/' + cat
    request.get({url: url}, function (error, response, body) {
        var catName = JSON.parse(body);
        res.send(catName.name)
    })
});	

app.post('/valoraciones', function(reqv, resv) {
		
        var unvalor = reqv.body.username;
        //console.log(unvalor)
        console.log(token)
		var losdatosdelusuario;
		var url = 'https://api.mercadolibre.com/sites/MLA/search?nickname='+String(unvalor)+"&access_token="+token.access_token;
        request.get({url: url}, function (err, res) { //?attributes=seller_reputation  --> esto estaba después del user id

            losdatosdelusuario = res;
            var thedata = JSON.parse(losdatosdelusuario.body)

			if(thedata.seller===undefined) {
				resv.status(501);
				resv.send('No existe tal usuario.');
				//return
			} else {

				//console.log(thedata);

                var url2 = 'https://api.mercadolibre.com/users/'+ thedata.seller.id
				request.get({url: url2}, function (err, res) { //?attributes=seller_reputation  --> esto estaba después del user id
					unvalor = res;
					//console.log(unvalor);
					//console.log('lo de arriba es la respuewsta demercadolibre')

					resv.send(unvalor.body);
				});
			}
		});
})

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});