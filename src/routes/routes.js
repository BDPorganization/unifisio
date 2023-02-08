const { login, loginGoogle, cadastro } = require("../controller/userController.js");
const router = require("express").Router();

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastro", cadastro);

module.exports = router;