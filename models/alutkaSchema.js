const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alutkaSchema = new Schema({
    text: String
},{
    collection : 'alutka_mowi'
});

const Alutka = mongoose.model('Alutka', alutkaSchema);

module.exports = Alutka;