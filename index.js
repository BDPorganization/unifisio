const express = require('express');
const app = express();
const port = process.env.port || 3000;
const path = require('path');
const bodyParser = require("body-parser");
const session = require('express-session');
const routes = require('./src/routes/routes.js');

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use('/', routes);

app.get('/', (req, res) => {
    res.render('salas');
});

app.listen(port, (req, res) => {
    console.log(`Servidor rodando em ${port}`);
});