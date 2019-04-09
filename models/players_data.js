const mongoose = require('mongoose');
const model = mongoose.model;
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    players : [{type : String}],
    score : [[
        {type: Number}
    ]]    
})

module.exports = model("players_data", DataSchema);