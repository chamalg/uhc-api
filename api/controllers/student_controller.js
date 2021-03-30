const mysql_db = require("../../mysql_db");

const tableName = "student";

exports.getAllStudents = (req, res, next) => {
  mysql_db.query("SELECT * FROM " + tableName, (error, result) => {
    if (error) {
      res.send({ success: false, message: "database error", error: err });
    }
    res.status(200).json({
      count: result.length,
      students: result.map(doc => {
        return {
          id: doc.id,
          name: doc.name,
          dob: doc.dob,
          phone: doc.phone,
          email: doc.email,
          address: doc.address,
          request: {
            type: "GET",
            url: "http://localhost:3000/students/" + doc.id
          }
        };
      })
    });
  });
};

exports.getStudent = (req, res, next) => {
  mysql_db.query(
    "SELECT * FROM " + tableName + " WHERE id=" + req.params.studentId,
    (error, result) => {
      if (error) {
        res.send({ success: false, message: "database error", error: error });
        return;
      }
      res.status(200).json({
        student: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/students/"
        }
      });
    }
  );
};

exports.addNewStudent = (req, res, next) => {
  mysql_db.query(
    `INSERT INTO ${tableName} (name, dob, phone, email, address) VALUES ('${req.body.name}', '${req.body.dob}', '${req.body.phone}, '${req.body.email}, '${req.body.address}')`,
    (error, result) => {
      if (error) throw error;
      console.log(result);
      res.status(201).json({
        message: "New student created"
      });
    }
  );
};

exports.deleteStudent = (req, res, next) => {
  mysql_db.query(
    "DELETE FROM " + tableName + " WHERE id = '" + req.params.id + "'",
    (error, result) => {
      if (error) throw error;
      console.log(result);
      return res.status(200).json({
        message: "Student successfully deleted!"
      });
    }
  );
};

exports.updateStudent = (req, res, next) => {
  mysql_db.query(
    `UPDATE ${tableName} SET name='${req.body.name}', dob='${req.body.dob}', phone='${req.body.phone}', email='${req.body.email}', address='${req.body.address}' WHERE id='${req.params.studentId}'`,
    (error, result) => {
      if (error) throw error;
      return res.status(200).json({
        message: "Student successfully updated!"
      });
    }
  );
};
