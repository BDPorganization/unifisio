


// mp.use(bodyParser.json());
// mp.use(bodyParser.urlencoded({ extended: true }));



// module.exports.pagar = async (req, res) => {
//     var pagamento = {
// 		items: [
// 			{
// 				title: req.body.description,
// 				unit_price: Number(req.body.price),
// 				quantity: Number(req.body.quantity),
// 			}
// 		],
// 		back_urls: {
// 			"success": "#",
// 			"failure": "#",
// 			"pending": "#"
// 		},
// 		auto_return: "approved",
// 	};

// 	mercadopago.preferences.create(pagamento)
// 	.then((response) => {
// 		console.log(response)
// 		res.status(200).redirect(response.body.init_point)
// 	})
//     .catch((err) => {
// 		res.status(500).send(`Erro ao criar pagamento, ${err}`);
// 	});
// };