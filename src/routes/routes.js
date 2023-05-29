const { login, loginGoogle, cadastro, verificaLogin, desconectar, preencherDados, apagarConta, adcSala, checarSalasAdmin, excluirSala, selectSalasByPk } = require("../controller/userController.js");
const { selectHours, checaDados, agendaDados, agendamentos, horariosAgenda } = require("../controller/agendController.js");
const { upload } = require("../../public/services/multer.js");
const FileController = require("../controller/fileController.js");
const router = require("express").Router();
const path = require('path');
const fs = require('fs');

const verificarAutenticacao = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.nome_user == 'Admin') {
          next();
        } else {
          res.status(401).json({ message: 'Acesso não autorizado.' });
        }
    } else {
        res.status(401).json({ message: 'Usuário não autenticado.' });
    }
};

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastro", cadastro);
router.post("/preencher_dados", preencherDados);
router.post("/filtroData", selectHours);
router.post("/checarDados", checaDados);
router.post("/agendaDados", agendaDados);
router.post("/adcSala", adcSala);
router.post("/upload", upload.single('image'), FileController.upload);
router.post("/excluirSala", excluirSala);
router.post("/selectSalas", selectSalasByPk);

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

router.get("/salas/:id", (req, res) => {
    const postId = req.params.id;

    res.render('sala', { postId });
});

router.get("/admin", verificarAutenticacao, (req, res) => {
    res.render('painelAdmin');
});

router.get("/horasAgendados", verificarAutenticacao, (req, res) => {
    res.render('horariosAgendados');
});

router.get("/aluguel", (req, res) => {
    res.render('alugueis');
});

router.get("/verificarLogin", verificaLogin);
router.get("/desconectar", desconectar);
router.get("/apagarConta", apagarConta);
router.get("/checarAgendamentos", agendamentos);
router.get("/checarSalas", checarSalasAdmin);
router.get("/horariosAgendados", horariosAgenda);

router.get("/pagAprovado", (req, res) => {
    if (req.query.status == "approved") {
        res.render('pagAprovado');
    } else {
        res.render('manutencao');
    }
});

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(process.cwd(), 'uploads', imageName);
  
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).send('Imagem não encontrada');
    }
});

module.exports = router;