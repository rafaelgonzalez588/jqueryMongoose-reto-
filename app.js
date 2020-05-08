
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require("mongoose");

app.use(express.urlencoded());
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Conexión BD
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 });
mongoose.connection.on("error", function (error) {
    console.log("Error", errro);
});

//Schema
var RegisterSchema = mongoose.Schema({
    user: String,
    email: String
});

const Register = mongoose.model('register', RegisterSchema);

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html')
    res.sendFile('.public/index.html')
});

app.get('/registros', (req,res) =>{
    Register.find(function(err, registers) {
        if (err) return console.error(err);
        res.send(registers);
      });
});

app.post('/new', (req,res) => {
    const { user, email } = req.body
    var register = new Register({ user, email });
    register.save(function(err) {
        if (err) return res.send(err);
        res.send('Guardado')
    });
});
app.listen('3000', () => console.log('Listening on port 3000!'));