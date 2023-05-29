const mp = require("express").Router();
const bodyParser = require("body-parser");
const cors = require('cors');
const mercadopago = require('mercadopago');

mp.use(bodyParser.json());
mp.use(bodyParser.urlencoded({ extended: true }));
mp.use(cors());

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
	integrator_id: process.env.INTEGRATOR_ID
});

mp.post("/pagamento", (req, res) => {
    const payment = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://unifiso.onrender.com/pagAprovado/",
			"failure": "https://unifiso.onrender.com/pagReprovado/",
			"pending": "https://unifiso.onrender.com/pagPendente/"
		},
		auto_return: "approved",
	};
    
	mercadopago.preferences.create(payment)
	.then((response) => {
		res.status(201).json({ id: response.body.id });
	})
    .catch((err) => {
		res.status(500).send(err);
	});
});

module.exports = mp;