const { login, loginGoogle, cadastro, verificaLogin, desconectar, preencherDados, aluguel } = require("../controller/userController.js");
const { selectHours, checaDados, agendaDados } = require("../controller/agendController.js");
const router = require("express").Router();

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastro", cadastro);
router.post("/preencher_dados", preencherDados);
router.post("/filtroData", selectHours);
router.post("/checarDados", checaDados);
router.post("/aluguel", aluguel);

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

router.get("/verificarLogin", verificaLogin);
router.get("/desconectar", desconectar);

router.get("/pagAprovado", agendaDados, (req, res) => {
    console.log(req.body);

    if (req.query.status == "approved") {
        res.render('index');
    } else {
        res.render('manutencao');
    }
});

module.exports = router;