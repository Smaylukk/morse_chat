const { Router } = require("express");
const AuthController = require("../controllers/authController");
const { checkAuth } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/signUp", AuthController.signUp);
router.post("/signIn", AuthController.signIn);
router.get("/checkAuth", checkAuth, AuthController.check);


module.exports = router;
