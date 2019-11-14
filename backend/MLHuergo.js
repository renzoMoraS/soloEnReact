// Dependencies
const express = require('express');
const routes = express.Router();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const request = require('request');
var meli = require('mercadolibre');
const PORT = 4000;

var token; //En donde quedara guardado el access token

//Aca importo los modelos para los jsons a guardar
let Item = require('./modelos/items.model'); //Productos
let Change = require('./modelos/changes.model'); //Productos
let FollSell = require('./modelos/following.model'); //Vendedores seguidos
let CatSell = require('./modelos/categorySellers.model'); //Cantidad de vendedores por categoria
let CatTend = require('./modelos/categoryTendency.model'); //Tendencias en el tiempo para categorias
let CatTime = require('./modelos/competencyCatTime.model'); //Tendencias en el tiempo para categorias de otro vendedor
var preg;

//Conecto las bases
app.use(cors()); 
app.use(bodyParser.json());
app.use('/MLHuergo', routes); //route.routes('/algo').get(function()); = app.get('MLHuergo/algo', function());
var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}
app.use(corsMiddleware);
var url;

mongoose.connect('mongodb://157.92.32.246:27017/MLHuergo', { useNewUrlParser: true });
const connection = mongoose.connection;
console.clear();

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Funciones de la app////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


function isEmptyObject(obj){
    return !Object.keys(obj).length;
  }

app.post('/token',function(req,rest){

    // Opciones que voy a tener que usar al momento de hacer el pedido del Token por mensaje POST.
    var valores = {

        "grant_type":"authorization_code",
        "client_id": '5512240852624948',
        "client_secret": 'ZkOmQohZeAo8MuPyfIJRQMqyKDi1H7EO',
        "redirect_uri": "https://pruebaenreact.azurewebsites.net",
        "code": ""

    };
    var options = {

        url:'https://api.mercadolibre.com/oauth/token',
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }

    };
    var url = req.body.url;
    request.post({url: url, json:true, options},function(req,res,body){

        token = body
        preg = new meli.Meli(token.client_id, token.client_secret, token.access_token, token.refresh_token);
        rest.send(token)
        
    })

})

app.get('/',function(req,res){

	res.write('<h1>Server Node</h1>');
    res.end();
    
});

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
        console.log(unvalor)
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

app.post('/pantallaInicio', function(reqv, resv) {

    if(token===undefined || token.error) {
        console.log('pongo acá todo el token porque me parece que no tiene el token')
        console.log(token)
        resv.status(501);
        resv.send('No existe tal usuario.');
        //return
    } else {
        
        //console.log(thedata);

        var url2 = 'https://api.mercadolibre.com/users/'+ token.user_id
        request.get({url: url2}, function (err, res) { //?attributes=seller_reputation  --> esto estaba después del user id
            unvalor = res;
            //console.log(unvalor);
            //console.log('lo de arriba es la respuewsta demercadolibre')

            resv.send(unvalor.body);
        });
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Funciones de los productos/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/ventasEnOrden',function(req,res){

    console.log("Entró");
    var fecha = new Date();
    //var fechaprime = //2015-07-01
    var ytoday = fecha.getFullYear();
    var mtoday = fecha.getMonth();
    var dtoday = fecha.getDate();
    var hasta = ytoday + "-" + mtoday + "-" + dtoday
    console.log(hasta)
    var desde = "2015-01-01"
    console.log(req);

    if (req.query.hasta != null){
        hasta = req.query.hasta
        hasta = hasta.substring(0,10) 

    }
    if (req.query.desde != null){
        desde = req.query.desde
        desde = desde.substring(0,10) 
    }

    var murl = "https://api.mercadolibre.com/orders/search?seller="+ token.user_id +"&order.date_created.from=" + desde + "T00:00:00.000-00:00&order.date_created.to="+ hasta +"T00:00:00.000-00:00&access_token="+token.access_token;
    console.log(murl)
    request.get({url: murl}, function (error, response, body) {
        var orders = JSON.parse(body);
        //var ordersString = JSON.stringify(orders)
        //console.log(orders)
        res.send(orders)
    })
    /*console.log("Entró");
    var fecha = new Date();
    console.log(fecha.toLocaleDateString(undefined, {
        weekday: 'long',    
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }))
    //var fechaprime = //2015-07-01
    var year = fecha.getUTCFullYear();
    var month = fecha.getUTCMonth();
    var day = fecha.getUTCDay();
    var fechaactual = fecha.getUTCFullYear();
    var murl = "https://api.mercadolibre.com/orders/search?seller="+ token.user_id +"&order.date_created.from=2015-07-01T00:00:00.000-00:00&order.date_created.to="+ fechaactual +"-12-31T00:00:00.000-00:00&access_token="+token.access_token;
    request.get({url: murl}, function (error, response, body) {
        var orders = JSON.parse(body);
        var ordersString = JSON.stringify(orders)
        console.log(orders)
        res.send(orders)
    })*/

})


routes.route('/items').get(function(req, res) {

    Item.find(function(err, item) {

        if (err){ 

            console.log(err);
            return 0;

        }else
            res.json(item);

    });

});

routes.route('/items/add').post(function(req, res) {

    let item = new Item(req.body);
    item.save()
        .then(item => {

            res.status(200).json({'item': 'item added successfully'});
            
        })
        .catch(err => {

            res.status(400).send('adding new item failed');

        });

});

routes.route('/items/searchId/:id').get(function(req, res) {

    let id = req.params.id;
    Item.findById(id, function(err, item) {

        if(err)
            console.log(err)
        else
            res.status(200).json(item);

    });

});

routes.route('/items/update').post(function(req, res) {

    let id = req.body._itemId;
    Item.updateOne({_itemId: id}, {
        
        $set: { 

            "_name": req.body._name,
            "_seller": req.body._seller,
            "_link": req.body._link,
            "_following": req.body._following,
            "_lastUpdate": req.body._lastUpdate,
            "_data": req.body._data,

        },

    }, function(err, resp){ 
        if(err) 
            console.log(err);
        else
            res.status(200).json({mensaje:"Actualizacion completada"});

    })

});

routes.route('/items/searchName/:name').get(function(req, res) {

    let name = req.params.name;
    Item.find().byName(name).exec(function(err, item) {

        if(err)
            console.log(err)
        else
            res.status(200).json(item);

    });

});


routes.route('/items/searchItemId/:id').get(function(req, res) {

    let id = req.params.id;
    Item.find().byItemId(id).exec(function(err, item) {

        if(err)
            console.log(err)
        else
            res.status(200).json(item);

    });

});

routes.route('/items/searchSeller/:seller').get(function(req, res) {

    let seller = req.params.seller;
    Item.find().bySeller(seller).exec(function(err, item) {

        if(err)
            res.status(400).json(err)
        else{

            if(isEmptyObject(item)) 
                res.status(404).json(item)
            else    
                res.status(200).json(item);
        }

    });

});

routes.route('/items/getFollowed').get(function(req, res) {

    var real = [];
    Item.find().byUser(token.user_id).exec(function(err, item) {

        if(err)
            res.status(400).json(err)
        else{

            item.map(function(citem, i){

                if(citem._following == true) real.push(citem);

            })
            res.status(200).json(real);

        }

    });

});

routes.route('/items/getChanges').post(function(req, res) {

    var citem = req.body.citem;
    citem = JSON.parse(citem);
    var id = citem._itemId;
    Item.find().byItemId(id).exec(function(err, item) {

        if(err)
            res.status(400).json(err)
        else{

            item = item[0];
            if(item._lastUpdate != citem._lastUpdate){

                var aux = {
                    "_itemId": citem._itemId,
                    "_field": "",
                    "_prevValue": "",
                    "_nextValue": ""
                }
                if(item._name != citem._name){

                    aux._field = "Nombre";
                    aux._prevValue = item._name;
                    aux._nextValue = citem._name;

                }
                if(item._data.price != citem._data.price){
                    
                    aux._field = "Precio";
                    aux._prevValue = item._data.price;
                    aux._nextValue = citem._data.price;

                }
                if(item._data.currency != citem._data.currency){

                    aux._field = "Moneda";
                    aux._prevValue = item._data.currency;
                    aux._nextValue = citem._data.currency;

                }
                if(item._data.availableQuantity != citem._data.availableQuantity){
                    
                    aux._field = "Cantidad disponible";
                    aux._prevValue = item._data.availableQuantity;
                    aux._nextValue = citem._data.availableQuantity;

                }
                if(item._data.soldQuantity != citem._data.soldQuantity){
                    
                    aux._field = "Cantidad vendida";
                    aux._prevValue = item._data.soldQuantity;
                    aux._nextValue = citem._data.soldQuantity;

                }
                url = 'http://localhost:4000/MLHuergo/changes/add';
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(aux),
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
                .then(function(res){ 
                    res.json().then(function(response){

                        console.log(response);
                        url = 'http://localhost:4000/MLHuergo/items/update';
                        fetch(url, {

                            method: 'POST',
                            body: JSON.stringify(citem),
                            headers:{
                                'Content-Type': 'application/json',
                            }

                        }).then(function(res){ 

                            rest.status(200).json({'message': "Item modificado exitosamente."});

                            })
                        }

                )})

            }else res.status(200).json(item);

        }

    });

});

routes.route('/items/delete/:seller').post(function(req, res) {

    let seller = req.params.seller;
    Item.deleteMany({_seller: seller}, function(err) {

        if(err) res.status(400).json(err);
        res.status(200).json({item: "Eliminado con exito"});

    });

});

app.get('/items/searchItems/:username', function(req, res) {

    let username = req.params.username;
    var url = 'https://api.mercadolibre.com/sites/MLA/search?nickname=' + username + '&offset=50';
    var options = {

        method: "GET",
        headers: {
      
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json' 
      
        }
      
      };
    
    fetch(url,options)
      .then(function(response){ 

        response.json()
          .then(function(data) {
            
            var items = data;
            items.results.map(function(item){
              
              url = 'http://localhost:4000/MLHuergo/items/searchItemId/' + item.id
              fetch(url,options)
                .then(function(resp){
                    resp.json().then(function(res){

                        if(!isEmptyObject(res)) 
                            return;
                        else{

                            var obj = {

                            "_itemId": item.id,
                            "_name": item.title,
                            "_link": item.permalink,
                            "_user": token.user_id,
                            "_seller": username,
                            "_following": false,
                            "_lastUpdate": "No necesario",
                            "_data": {
            
                                "price": item.price,
                                "currency": item.currency_id,
                                "availableQuantity": item.available_quantity,
                                "soldQuantity": item.sold_quantity
            
                            }
            
                            };
                            url = 'http://localhost:4000/MLHuergo/items/add';
                            fetch(url, {
                                method: 'POST',
                                body: JSON.stringify(obj),
                                headers:{
                                    'Content-Type': 'application/json',
                                }
                            })
                            .then(function(res){ 
                                res.json().then(function(response){
                                res.status(200).json(response)
                                }
                            )})
                            return obj;

                        }

                    })

                .catch(function(error) {
                    console.log('Fetch Error:', error);
                  });

                });

            })

          })
          .catch(function(error) {
            console.log('Fetch Error:', error);
          });

    });

});

app.post('/items/startFollowing',function(req,rest){
    
    var item = req.body.item;
    console.log(item);
    item = JSON.parse(item);
    var id = item._itemId;
    var follsell = req.body.sell;
    var url = 'https://api.mercadolibre.com/items?ids=' + id + '&access_token=' + token.access_token;
    var options = {

        method: "GET",
        headers: {
      
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json' 
      
        }
      
    };
    if(!follsell) item._following = true;
    fetch(url,options)
      .then(function(response){ 

        response.json()
          .then(function(data) {

            var res = data;
            res.map(function(aux){
                item._lastUpdate = aux.body.last_updated;
            });
            url = 'http://localhost:4000/MLHuergo/items/update';
            fetch(url, {

                method: 'POST',
                body: JSON.stringify(item),
                headers:{
                    'Content-Type': 'application/json',
                }

            }).then(function(res){ 

                rest.status(200).json({'message': "Item seguido exitosamente."});

                })

          })
          .catch(function(error) {
            console.log('Fetch Error:', error);
          });

      })
      .catch(function(error) {
        console.log('Fetch Error:', error);
      });
    
})

routes.route('/changes').get(function(req, res) {

    Change.find(function(err, item) {

        if (err){ 

            res.status(400).json(err);
            return 0;

        }else
            res.status(200).json(item);

    });

});

routes.route('/changes/:id').get(function(req, res) {

    let id = req.params.id;
    Change.find().byItemId(id).exec(function(err, item) {

        if(err)
            console.log(err)
        else
            res.status(200).json(item);

    });

});

routes.route('/changes/add').post(function(req, res) {

    let changes = new Change(req.body);
    changes.save()
        .then(item => {

            res.status(200).json({'Change': 'Change registered successfully'});

        })
        .catch(err => {

            res.status(400).send('Adding new item failed');

        });

});


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////Funciones de los vendedores seguidos////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

routes.route('/FollSell').get(function(req, res) {

    FollSell.find(function(err, item) {

        if (err){ 

            res.status(400).json(err);
            return 0;

        }else
            res.status(200).json(item);

    });

});

routes.route('/FollSell/add').post(function(req, res) {

    var options = {

        method: "GET",
        headers: {
        
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json' 
        
        }
        
    }
    url = 'http://localhost:4000/MLHuergo/FollSell/searchName/' + req.body._name;
    fetch(url, options)
     .then(resp =>{

        if(resp.size != 0) return;
        let follSell = new FollSell(req.body);
        follSell.save()
            .then(item => {

                Item.find().bySeller(item._name).exec(function(err, response){

                    response.map(function(prod){

                        var body = {item: JSON.stringify(prod), sell: true};
                        url = 'http://localhost:4000/MLHuergo/items/startFollowing';
                        fetch(url, {

                            method: 'POST',
                            body: body,
                            headers:{
                                'Content-Type': 'application/json',
                            }

                        }).then(res=>{})
                        .catch(function(res){console.log(res)})});

                })
                .then(function(resp){ 

                    resp.status(200).json({'message': "Usuario seguido exitosamente."});

                })
                .catch(err => {

                    res.status(400).send('adding new item failed');
        
                });
                //res.status(200).json({'ofsel': 'item added successfully'});

            })
            .catch(err => {

                res.status(400).send('adding new item failed');

            });
        })        

     .catch(err => {

        res.status(400).send('adding new item failed');

     });

});

routes.route('/FollSell/searchId/:id').get(function(req, res) {

    let id = req.params.id;
    FollSell.findById(id, function(err, item) {

        if(err)
            res.status(400).json(err)
        else
            res.status(200).json(item);

    });

});

routes.route('/FollSell/update/:id').post(function(req, res) {

    FollSell.findById(req.params.id, function(err, item) {

        if (!item)
            res.status(404).send("data is not found");
        else{

            item._sellerName = req.body._sellerName;
            item._sellerId = req.body._sellerId;
            item.save()
                .then(todo => {
                    res.status(200).json('Update complete!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });

        }

    });

});

routes.route('/FollSell/searchName/:name').get(function(req, res) {

    let name = req.params.name;
    FollSell.find().byName(name).exec(function(err, item) {

        if(err)
            res.status(400).log(err)
        else{
            res.status(200).json(item);
                
        }

    });

});

routes.route('/FollSell/searchForMe').get(function(req, res) {

    let name = req.params.name;
    FollSell.find().byUser(token.user_id).exec(function(err, item) {

        if(err)
            res.status(400).log(err)
        else{
            res.status(200).json(item);
                
        }

    });

});

routes.route('/FollSell/delete/:name').post(function(req, res) {

    var name = req.params.name
    FollSell.deleteMany({_name: name}, function(err) {

        if(err) console.log(err);
        res.status(200).json({item: "Eliminado con exito"});

    });

});

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Funciones de los vendedores X categorias/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

routes.route('/CatSell').get(function(req, res) {

    CatSell.find(function(err, item) {

        if (err){ 

            res.status(400).json(err);
            return 0;

        }else
            res.status(200).json(item);

    });

});

routes.route('/CatSell/add').post(function(req, res) {

    let catSell = new CatSell(req.body);
    catSell.save()
        .then(item => {

            res.status(200).json({'ofsel': 'item added successfully'});

        })
        .catch(err => {

            res.status(400).send('adding new item failed');

        });

});

routes.route('/CatSell/searchName/:name').get(function(req, res) {

    let name = req.params.name;
    CatSell.find().byName(name).exec(function(err, item) {

        if(err)
            console.status(400).log(err)
        else{

            if(isEmptyObject(item))
                res.status(404).json({error: 'Nonexistent item.'})
            else
                res.status(200).json(item);
                
        }

    });

});

routes.route('/CatSell/delete').post(function(req, res) {

    CatSell.deleteMany({_id: "5d1506238069d42b5837cdd1"}, function(err) {

        if(err) console.log(err);
        res.status(200).json({item: "Eliminado con exito"});

    });

});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////Funciones de las tendencias X categorias/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

routes.route('/CatTend').get(function(req, res) {

    CatTend.find(function(err, item) {

        if (err){ 

            console.log(err);
            return 0;

        }else
            res.json(item);

    });

});

routes.route('/CatTend/add').post(function(req, res) {

    let catTend = new CatTend(req.body);
    catTend.save()
        .then(item => {

            res.status(200).json({'ofsel': 'item added successfully'});

        })
        .catch(err => {

            res.status(400).send('adding new item failed');

        });

});


routes.route('/CatTend/checkedToday').get(function(req, res) {

    var today = new Date;
    CatTend.find().byDay(today).exec(function(err, item) {

        if(err)
            console.status(400).log(err)
        else{

            if(isEmptyObject(item))
                res.status(400).json({error: 'Nonexistent item.'})
            else
                res.status(200).json(item);
                
        }

    });

});

routes.route('/CatTend/searchName/:name').get(function(req, res) {

    let name = req.params.name;
    CatTend.find().byName(name).exec(function(err, item) {

        if(err)
            console.status(400).log(err)
        else{

            if(isEmptyObject(item))
                res.status(404).json({error: 'Nonexistent item.'})
            else
                res.status(200).json(item);
                
        }

    });

});

routes.route('/CatTend/delete').post(function(req, res) {

    CatTend.deleteMany({__v: 0}, function(err) {

        if(err) console.log(err);
        res.status(200).json({item: "Eliminado con exito"});

    });

});

app.get('/TenCat', function general(reqDeFE, resAFE){ //Tendencias por Categoría
    
    preg.get('/sites/MLA/categories', function(err, res){  

        var catTime = [30];
        let today = new Date();
        let date = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
        fetch('http://localhost:4000/MLHuergo/CatTend', {

                        method: "GET",
                        headers: {
                    
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json' 
                    
                        }
                
        }).then(function(resp) {resp.json().then(function(res){

            if(res.body[res.length - 1]._date == date){ //Si ya se consiguieron los datos de hoy...

                //calcular % de ventas acá
                console.log("Ya tenemos datos actualizados")
                resAFE.status(200).json(res);

            }
            //Conseguir la cantidad de ventas de hoy
            var total = 0;
            res.map(function(item, i){
                
                catTime[i] = {
    
                    _name: item.name,
                    _day: date,
                    _cant: 0
    
                } 
                // de aca en adelante, una vez por día en algun otro lado
    
                preg.get('/sites/MLA/search', {category: [item.id]}, function(err, res){
                    var cont = 0;
                    res.results.map(function(producto, x){
                    
                        catTime[i]._cant += producto.sold_quantity;
    
                    })
                    total += catTime[i]._cant; 
                    //total = cantidad de unidades venididas TOTALES (todas las categorías)
                    
                    fetch('http://localhost:4000/MLHuergo/CatTend/add', { 
                    
                        method: 'POST',
                        body: JSON.stringify(catTime[i]),
                        headers:{
                            'Content-Type': 'application/json',
                        }
    
                    })
                    .then(function(res){ 
    
    
                    }).catch(function(error) {
                        console.log('Fetch Error:', error);
                    });
                    
                })
                        
            })
        
        })})

    })

})

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////Funciones de las vendedores X categorias/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

routes.route('/CatTime').get(function(req, res) {

    CatTime.find(function(err, item) {

        if (err){ 

            console.log(err);
            return 0;

        }else
            res.json(item);

    });

});

routes.route('/CatTime/add').post(function(req, res) {

    let catTime = new CatTime(req.body);
    catTime.save()
        .then(item => {

            res.status(200).json({'ofsel': 'item added successfully'});

        })
        .catch(err => {

            res.status(400).send('adding new item failed');

        });

});

routes.route('/CatTime/searchName/:name').get(function(req, res) {

    let name = req.params.name;
    CatTime.find().byName(name).exec(function(err, item) {

        if(err)
            console.log(err)
        else{

            if(isEmptyObject(item))
                res.json({error: 'Nonexistent item.'})
            else
                res.json(item);
                
        }

    });

});

routes.route('/CatTime/searchDate/:date').get(function(req, res) {

    let date = req.params.date;
    CatTime.find().byName(date).exec(function(err, item) {

        if(err)
            console.log(err)
        else{

            if(isEmptyObject(item))
                res.json({error: 'Nonexistent item.'})
            else
                res.json(item);
                
        }

    });

});

routes.route('/CatTime/delete').post(function(req, res) {

    CatTime.deleteMany({_id: "5d1506238069d42b5837cdd1"}, function(err) {

        if(err) console.log(err);
        res.json({item: "Eliminado con exito"});

    });

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Funciones de las preguntas//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/preguntas',function(reqDeFE, resAFE){
    preg = new meli.Meli(token.client_id, token.client_secret, token.access_token, token.refresh_token);
    contador = 0;
    preg.get('/my/received_questions/search', function (err, res) {

        var jsonpreg = JSON.stringify(res);
        var pregparse = JSON.parse(jsonpreg);
        
        pregparse.questions.map(function(pregunta, index){ //por cada pregunta de questions pregunta por su usuario de ML 
            
            preg.get('/users/' + pregunta.from.id, function (err, res){    

                pregparse.questions[index].nombre_de_usuario = res.nickname;
                contador = contador + 1;
                if (contador >= pregparse.questions.length * 2) {

                    resAFE.send(pregparse)
                    return

                }

            })
            
            preg.get('items', {ids: [pregunta.item_id,]}, function (err, res){

                pregparse.questions[index].producto_nombre = res[0].body.title;
                contador = contador + 1;
                if (contador >= pregparse.questions.length * 2) {

                    resAFE.send(pregparse)
                    return

                }

            })

        })
        
    })

})  

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Funciones de Mis Publicaciones//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

var arreglo = [];
var contador = 0;
function laotrafuncionquequiererenzo(parametro) {
    setTimeout(lafuncionquequiererenzo,3000,parametro)
}

function lafuncionquequiererenzo(parametro) {
        //eljason[0] = arreglo
        
        // console.log(arreglo)
        console.log(arreglo)
        parametro.send(arreglo)
        arreglo = []
}
var publis = app.get('/MPublis',function(reqDeFE,resAFE) {
      var preg = new meli.Meli(token.client_id, token.client_secret,token.access_token,token.refresh_token);
      preg.get('/users/me', function (err, resu){
          //console.log(err, resu);
          jsonstr = JSON.stringify(resu);
          pubspars = JSON.parse(jsonstr);
  
          preg.get('/users/'+pubspars.id+'/items/search', function (err, resi) {// sin parametros devuelve todos los items de un usuario
                  //console.log(err, resi);
                  //resAFE.send(resi);
                  jsonstrprod = JSON.stringify(resi);
                  listmisprod = JSON.parse(jsonstrprod)
                  console.log(listmisprod)
                  
                  // Recorro los items del usuario
                  var c;
                  //console.log(listmisprod.results.length)
              
              //console.log('acá tengo la longitud')
              //console.log(listmisprod.results)
              listmisprod.results.forEach(function(value, index, array) {
                  preg.get('/items/' + value, function (err, resmp){
                      resmpstrin = JSON.stringify(resmp);
                      resmppar = JSON.parse(resmpstrin);
                    //   var listaDatos = [resmpstrin]
                      // fs.writeFile('listaprod.json', resmpstrin, function (error) {
                      //     if (error) throw err;
                      // });
                      preg.get('/sites/MLA/search',
                              {q:resmp.title }, 
                              function (err, respuesta) {
                                  
                                  contador = contador + 1;
                                //   jsonstrto = JSON.stringify(resi);
                                //   toparse = JSON.parse(resi);
                                //   console.log(toparse)
                                 console.log(JSON.parse(JSON.stringify(respuesta)))
                                  arreglo.push(respuesta)
                                //   listaDatos.push(toparse)
                                  // fs.appendFile('listaprod.json', jsonstrto, function (error) {
                                  //     if (error) throw err;
                                  // });
                      });
                  });
              });
  
              var dummyvar = 0;
              
              laotrafuncionquequiererenzo(resAFE)
              
          })
      }) //esto saca los productos del usuario
  })