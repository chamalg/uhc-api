const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, userController.getAllUsers);
router.get("/:userId", userController.getUser);
router.post("/signup", userController.signup);
router.delete("/:userId", userController.deleteUser);
router.post("/signin", userController.signIn);

module.exports = router;
