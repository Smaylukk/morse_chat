const { Router } = require("express");
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.post("/", AuthMiddleware.adminCheck, UserController.create);
router.put("/:id", AuthMiddleware.adminCheck, UserController.change);
router.delete("/:id", AuthMiddleware.adminCheck, UserController.delete);

module.exports = router;
