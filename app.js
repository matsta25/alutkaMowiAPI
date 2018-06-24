const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');
const axios = require('axios');

const Alutka = require('./models/alutkaSchema');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

mongoose.connect(keys.mongodb.dbURL, () =>{
    console.log('connceted to mongo database');
})

app.use('/api',(req, res, next) => {
    Alutka.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count)
        Alutka.findOne().skip(random).exec(
          function (err, result) {
            res.status(200).json(result);
          })
      })
});    

app.use('/', (req,res) => {
    axios.get('http://alutkamowi.herokuapp.com/api')
    .then(function (response) {
        res.render('pages/index', {text: response.data.text});
    })
    .catch(function (error) {
        return error;
    });
})
    
module.exports = app;