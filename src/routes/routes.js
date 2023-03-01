const { login, loginGoogle, cadastro, verificaLogin } = require("../controller/userController.js");
const router = require("express").Router();

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastro", cadastro);
router.post("/verificarLogin", verificaLogin);

module.exports = router;