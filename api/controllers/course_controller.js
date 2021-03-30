const mysql_db = require("../../mysql_db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tableName = "courses";

exports.getAllCourses = (req, res, next) => {
  mysql_db.query("SELECT * FROM " + tableName, (error, result) => {
    if (error) {
      res.send({ success: false, message: "database error", error: err });
    }
    res.status(200).json({
      count: result.length,
      courses: result.map(doc => {
        return {
          id: doc.id,
          name: doc.name,
          description: doc.description,
          request: {
            type: "GET",
            url: "http://localhost:3000/courses/" + doc.id
          }
        };
      })
    });
  });
};

exports.getCourse = (req, res, next) => {
  mysql_db.query(
    "SELECT * FROM " + tableName + " WHERE id=" + req.params.courseId,
    (error, result) => {
      if (error) {
        res.send({ success: false, message: "database error", error: error });
        return;
      }
      res.status(200).json({
        course: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/courses/"
        }
      });
    }
  );
};

exports.addNewCourse = (req, res, next) => {
  mysql_db.query(
    `INSERT INTO ${tableName} (name, description) VALUES ('${req.body.name}', '${req.body.description}')`,
    (error, result) => {
      if (error) throw error;
      console.log(result);
      res.status(201).json({
        message: "New course created"
      });
    }
  );
};

exports.deleteCourse = (req, res, next) => {
  mysql_db.query(
    "DELETE FROM " + tableName + " WHERE id = '" + req.params.courseId + "'",
    (error, result) => {
      if (error) throw error;
      console.log(result);
      return res.status(200).json({
        message: "Course successfully deleted!"
      });
    }
  );
};

exports.updateCourse = (req, res, next) => {
  mysql_db.query(
    `UPDATE ${tableName} SET name='${req.body.name}', description='${req.body.description}' WHERE id='${req.params.courseId}'`,
    (error, result) => {
      if (error) throw error;
      return res.status(200).json({
        message: "Course successfully updated!"
      });
    }
  );
};
