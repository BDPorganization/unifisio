const { login, loginGoogle, cadastro, verificaLogin, preencherDados } = require("../controller/userController.js");
const { pagar } = require("../controller/pagController.js");
const router = require("express").Router();

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastro", cadastro);
router.post("/verificarLogin", verificaLogin);
router.post("/pagamento", pagar);

module.exports = router;