const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const { checkAuth } = require("../middlewares/AuthMiddleware");

const router = Router();

router.post("/signUp", AuthController.signUp);
router.post("/signIn", AuthController.signIn);
router.get("/checkAuth", checkAuth, AuthController.check);


module.exports = router;
