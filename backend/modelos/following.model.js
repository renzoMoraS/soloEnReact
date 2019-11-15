const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FollSell = new Schema({

    _name: {
        type: String
    },
    _user: {
        type: []
    },
    _results: {
        type: {}
    }

});

FollSell.query.byName = function(name){
    return this.find({ _name: name});
}

FollSell.query.byUser = function(user){
    return this.find({ _user: user});
}

module.exports = mongoose.model('FollSell', FollSell);