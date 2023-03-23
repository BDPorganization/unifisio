const { login, loginGoogle, cadastro, verificaLogin, preencherDados } = require("../controller/userController.js");
const { pagar } = require("../controller/pagController.js");
const router = require("express").Router();

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastro", cadastro);
router.post("/verificarLogin", verificaLogin);
router.post("/pagamento", pagar);

router.get("/index", (req, res) => {
    res.render('index');
});

router.get("/duvidas", (req, res) => {
    res.render('duvidas');
});

router.get("/salas", (req, res) => {
    res.render('salas');
});

router.get("/contato", (req, res) => {
    res.render('contato');
});

module.exports = router;