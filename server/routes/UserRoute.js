const { Router } = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.post("/", authMiddleware.adminCheck, userController.create);
router.put("/:id", authMiddleware.adminCheck, userController.change);
router.delete("/:id", authMiddleware.adminCheck, userController.delete);

module.exports = router;
