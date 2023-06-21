require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const session = require('express-session');
const routes = require('./src/routes/routes.js');
const routesPag = require('./src/routes/routePag.js');
const routesCart = require('./src/routes/cart.js');

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use('/', routes, routesPag, routesCart);
app.use((req, res) => {
    res.status(404).render('manutencao');
});

app.listen(port, () => {
    console.log(`Servidor rodando em ${port}`);
});