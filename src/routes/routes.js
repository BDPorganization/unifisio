const { login, loginGoogle, cadastro, verificaLogin, desconectar, preencherDados, apagarConta } = require("../controller/userController.js");
const { selectHours, checaDados, agendaDados, agendamentos } = require("../controller/agendController.js");
const router = require("express").Router();

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastro", cadastro);
router.post("/preencher_dados", preencherDados);
router.post("/filtroData", selectHours);
router.post("/checarDados", checaDados);
router.post("/agendaDados", agendaDados);
router.post("/checarAgendamentos", agendamentos);

router.get('/', (req, res) => {
    res.render('index');
});

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

router.get("/admin", (req, res) => {
    res.render('manutencao');
});

router.get("/aluguel", (req, res) => {
    res.render('alugueis');
});

router.get("/verificarLogin", verificaLogin);
router.get("/desconectar", desconectar);
router.get("/apagarConta", apagarConta);

router.get("/pagAprovado", (req, res) => {
    if (req.query.status == "approved") {
        res.render('pagAprovado');
    } else {
        res.render('manutencao');
    }
});

module.exports = router;