const cart = require("express").Router();
var cartItems = [];

cart.post('/addCart', (req, res) => {
    const item = req.body;

    cartItems.push(item);
    res.status(201).json({ message: 'Item adicionado ao carrinho' });
});

cart.get('/listCart', (req, res) => {
    res.status(200).json(cartItems);
});

cart.delete('/deleteCart/:itemId', (req, res) => {
    const itemId = req.params.itemId;

    cartItems = cartItems.filter(item => item.id !== itemId);
    res.status(202).json({ message: 'Item removido do carrinho' });
});

module.exports = cart;