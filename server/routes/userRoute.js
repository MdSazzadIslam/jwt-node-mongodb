const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, userController.getAll);
router.get("/:id", verifyToken, userController.getById);
router.post("/login", userController.login);
router.post("/registration", userController.registration);
router.delete("/delete/:id", verifyToken, userController.deleteUser);
router.put("/update/:id", verifyToken, userController.updateUser);
module.exports = router;
