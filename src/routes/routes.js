const { login, loginGoogle, cadastro, verificaLogin, desconectar } = require("../controller/userController.js");
const { pagar } = require("../controller/pagController.js");
const { selectHours } = require("../controller/agendController.js");
const router = require("express").Router();

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastro", cadastro);
router.post("/verificarLogin", verificaLogin);
router.post("/pagamento", pagar);
router.post("/filtroData", selectHours);
router.post("/desconectar", desconectar);


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

router.get("/salas/salaComfort", (req, res) => {
    res.render('sala1');
});

router.get("/salas/salaPremium", (req, res) => {
    res.render('sala2');
});

router.get("/salas/studioFisioterapia", (req, res) => {
    res.render('sala3');
});
module.exports = router;