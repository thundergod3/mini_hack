const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DataModel = require('./models/players_data');

mongoose.connect('mongodb://localhost:27017/web20_mini_hack', { useNewUrlParser: true }, (err) => {
    if (err) console.log(err);
    else console.log("Connect to DB success");
    DataModel.find({}, (err, docs) => {
        if (err) console.log(err);
        else {
            console.log(docs)
            
        }

    })
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/player_results/:id", function (req, res) {
    res.sendFile(__dirname + "/player_results.html")
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/mini_hack.html");
})

app.post("/create", function (req, res) {
    let player = req.body;
    DataModel.create({
        players: [player.p1, player.p2, player.p3, player.p4],
        score: [[0, 0, 0, 0]]
    }, (err, roomCreated) => {
        if (err) console.log(err)
        else {
            res.redirect(`/player_results/${roomCreated._id}`)
        }
    })
});
app.get("/addRound/:id", (req, res) => {
    let id = req.params.id;


    DataModel.findById(id, (err, game) => {
        if (err) console.log(err)
        else {
            game.score.push([0, 0, 0, 0]);
            DataModel.findByIdAndUpdate(
                game._id,
                { $set: { score: game.score } },
                (err, changed) => {
                    if (err) console.log(err);
                    else res.send(changed);
                }
            )
        }
    })
})
app.get("/resultdata/:id", (req, res) => {
    console.log(req.params.id)
    DataModel.findById(req.params.id, (err, data) => {
        if (err) console.log(err)
        else res.send(data)
    })
})
app.put("/update", (req, res) => {
    let id = req.body['gameid'];
    console.log(id);
    
    let round = req.body['round'];
    let score = req.body['score[]'];
    console.log(score)

    DataModel.findById(id, (err, game) => {
        if (err) console.log(err)
        else {
            game.score[round * 1] = score;
            DataModel.findByIdAndUpdate(
                game._id,
                { $set: { score: game.score } },
                (err, changed) => {
                    if (err) console.log(err);
                    else res.send(changed);
                }
            )
        }
    })

})
app.listen(6969, function (err) {
    if (err) console.log(err)
    else console.log("Sever success !!");
});