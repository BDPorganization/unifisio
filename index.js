require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const bodyParser = require("body-parser");
const session = require('express-session');
const routes = require('./src/routes/routes.js');
const routesPag = require('./src/routes/routePag.js');

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
app.use('/', routes, routesPag);

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`);
});