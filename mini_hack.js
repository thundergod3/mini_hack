const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.get("/player_results", function(req, res){
    res.sendfile(__dirname + "/player_results.html")
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/mini_hack.html");
})
app.post("/create", function (req, res) {
    const name_player = JSON.parse(fs.readFileSync('player_data.json', 'utf-8'));
    const player_result = JSON.parse(fs.readFileSync('player_round.json', 'utf-8'));

    var player = {
        player1 : req.body.player1,
        player2 : req.body.player2,
        player3 : req.body.player3,
        player4 : req.body.player4,
        id : name_player.length
    };

    var results = {
        id: name_player.length,
    };

    player_result.push(results);
    fs.writeFileSync('player_round.json', JSON.stringify(player_result));

    name_player.push(player);
    fs.writeFileSync('player_data.json', JSON.stringify(name_player));

    res.redirect('/player_results')
});

app.post('/change_results1', function(req, res) {
    const name_player = JSON.parse(fs.readFileSync('player_data.json', 'utf-8'));
    const player1_result = JSON.parse(fs.readFileSync('player_round.json', 'utf-8'));
    var change_player1 = {
        round1 : [req.body]
    };
    player1_result.push(change_player1);
    fs.writeFileSync('player_round.json', JSON.stringify(player1_result));
    res.send(req.body)
})

app.listen(8080, function (err) {
    if (err) console.log(err)
    else console.log("Sever success !!");
});
