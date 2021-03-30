const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");

router.get("/", studentController.getAllStudents);
router.get("/:studentId", studentController.getStudent);
router.post("/add", studentController.addNewStudent);
router.delete("/:studentId", studentController.deleteStudent);
router.patch("/:studentId", studentController.updateStudent);

module.exports = router;
