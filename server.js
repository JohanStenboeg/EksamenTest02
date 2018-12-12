//Til at åbne serveren
var app = require('express')();
//Åbner serveren, ud fra express app. 
var http = require('http').Server(app);
//Til Json objekter, går at serveren kan læse json objekterne agtigt.
//Parser det om til læseligt JSON objekter for serveren. 
bodyParser = require('body-parser');

//HUSK AT BRUGE BODYPARSER TIL POST REQUESTS
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//require mysql
var mysql = require('mysql');

//get request
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
//Laver connection til DB 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
});

//get request 2, hent pærerne
app.get('/hent', function (req, res) {

    con.connect(function (err) {
        //Tjekker for fejl, hvis ingen fejl skriver connected. 
        if (err) throw err;
        console.log("Connected!");
        con.query("use fortesteksamensmartpare;", function (err, result) {
            if (err) throw err;
            console.log("connected");
        });
        con.query("select * from ikeapare;", function (err, result) {
            if (err) throw err;
            console.log("All selected");
            res.send(result);
        });
    });

})
app.post('/opret', function(req, res){
    con.connect(function (err) {
        //Tjekker for fejl, hvis ingen fejl skriver connected. 
        if (err) throw err;
        console.log("Connected!");
        con.query("use fortesteksamensmartpare;", function (err, result) {
            if (err) throw err;
            console.log("connected");
        });
        con.query("insert into ikeapare(onoff, nomielStrom, aktuelStrom, farve, uniktID, hardwareID, softwareID, lysIntensitet) values ("+req.body.onoff+","+req.body.nomielStrom+","+req.body.aktuelStrom+",'"+req.body.farve+"','"+req.body.uniktID+"','"+req.body.hardwareID+"','"+req.body.softwareID+"',"+req.body.lysIntensitet+");", function (err, result) {
            if (err) throw err;
            console.log("Inserted new data into mysql db");
            res.send(result);
        });
    });

})

//starter serveren på port 8080
http.listen(5050, function () {
    console.log('listening on *:5050');
});