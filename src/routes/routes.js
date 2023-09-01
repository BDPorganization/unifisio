const { login, loginGoogle, cadastro, verificaLogin, desconectar, preencherDados, apagarConta, adcSala, checarSalasAdmin, excluirSala, editarSala, selectSalasByPk, bloquearDia, consultaDadosContrato, diasBloqueados, excluirDiaBloqueado } = require("../controller/userController.js");
const { selectHours, checaDados, agendaDados, agendamentos, horariosAgenda, excluirAgendamento, checaSalasAgendadas } = require("../controller/agendController.js");
const { upload } = require("../../public/services/multer.js");
const { PDFDocument, StandardFonts } = require('pdf-lib');
const { registrarAtividade, registrarAtividadeGoogle, registrarAtividadeCadastro } = require('../middlewares/logger.js')
const { loginRateLimit } = require('../middlewares/loginLimit.js')
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

router.post("/loginGoogle", [registrarAtividadeGoogle, loginGoogle]);
router.post("/loginDB", [registrarAtividade, loginRateLimit, login]);
router.post("/cadastro", [registrarAtividadeCadastro, cadastro]);
router.post("/preencher_dados", preencherDados);
router.post("/filtroData", selectHours);
router.post("/checarDados", checaDados);
router.post("/agendaDados", agendaDados);
router.post("/adcSala", adcSala);
router.post("/upload", upload.single('image'), FileController.upload);
router.post("/excluirSala", excluirSala);
router.post("/editarSala", editarSala);
router.post("/selectSalas", selectSalasByPk);
router.post("/bloquearDia", bloquearDia);
router.post("/excluirAgendamento", excluirAgendamento);
router.post("/checarSalasAgendadas", checaSalasAgendadas)
router.post("/excluirDiaBloqueado", excluirDiaBloqueado);

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

router.get("/cart", (req, res) => {
    res.render('cart');
});

router.get("/verificarLogin", verificaLogin);
router.get("/desconectar", desconectar);
router.get("/apagarConta", apagarConta);
router.get("/checarAgendamentos", agendamentos);
router.get("/checarSalas", checarSalasAdmin);
router.get("/horariosAgendados", horariosAgenda);
router.get("/checarDiasBloqueados", diasBloqueados);

router.get("/pagAprovado", (req, res) => {
    if (req.query.status == "approved") {
        res.render('pagAprovado');
    } else {
        res.render('pagReprovado');
    }
});

router.get("/pagReprovado", (req, res) => {
    res.render('pagReprovado');
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


router.get('/download', consultaDadosContrato, async (req, res) => {
    try {
        const arquivoPDF = fs.readFileSync(path.join(process.cwd(), 'doc', 'exemplo.pdf'));
        const documentoPDF = await PDFDocument.load(arquivoPDF);
        const novaPagina = documentoPDF.addPage();
        const fonte = await documentoPDF.embedFont(StandardFonts.Helvetica);
        const coordenadaX = 50;
        const coordenadaY = 50;
        const myDate = new Date(Date.now()).toLocaleString().split(',')[0];
        var nomeUsuario = req.rows[0].nome_completo;
        var cpf = req.rows[0].cpf;

        novaPagina.setFont(fonte);
        novaPagina.setFontSize(12);

        novaPagina.drawText(`Eu, ${nomeUsuario}, portador do CPF: ${cpf},  confirmo que aceito os termos deste contrato.`, {
            x: coordenadaX,
            y: coordenadaY,
        });

        const novoArquivoPDF = await documentoPDF.save();
        const nomeArq = `contrato${nomeUsuario.split(" ")[0]}${myDate.split("/")[0]}`

        fs.writeFileSync(path.join(process.cwd(), 'doc', `${nomeArq}.pdf`), novoArquivoPDF);

        const newContract = path.join(process.cwd(), 'doc', `${nomeArq}.pdf`);

        res.download(newContract, 'contratoAssinado.pdf', (err) => {
            if (err) {
                res.status(400).send('Ocorreu um erro durante o download do contrato.', err);
            }
        });
    } catch (err) {
        return err;
    }
});

module.exports = router;