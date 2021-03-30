const express = require("express");
const router = express.Router();
const course_controller = require("../controllers/course_controller");

router.get("/", course_controller.getAllStudents);
router.get("/:studentId", course_controller.getStudent);
router.post("/add", course_controller.addNewStudent);
router.delete("/:studentId", course_controller.deleteStudent);
router.patch("/:studentId", course_controller.updateStudent);

module.exports = router;
