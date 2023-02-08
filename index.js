const express = require('express');
const app = express();
const port = process.env.port || 3000;
const path = require('path');
const bodyParser = require("body-parser");
const routes = require('./src/routes/routes.js')

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, (req, res) => {
    console.log(`Servidor rodando em ${port}`);
});