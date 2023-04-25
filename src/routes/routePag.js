const mp = require("express").Router();
const bodyParser = require("body-parser");
const cors = require('cors');
const mercadopago = require('mercadopago');

mp.use(bodyParser.json());
mp.use(bodyParser.urlencoded({ extended: true }));
mp.use(cors());

mercadopago.configure({
    access_token: 'TEST-7625347247694570-022714-bf7987981577a69b8ce6f3f59614c59e-1056961298'
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
			"success": "#",
			"failure": "#",
			"pending": "#"
		},
		auto_return: "approved",
	};
    console.log(payment)

	mercadopago.preferences.create(payment)
	.then((response) => {
		res.status(201).json({ id: response.body.id })
	})
    .catch((err) => {
		res.status(500).send(err);
	});
});

module.exports = mp;