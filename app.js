const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');
const axios = require('axios');

const Alutka = require('./models/alutkaSchema');

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
    res.send('go to alutkaMowi.com');
})
    
module.exports = app;