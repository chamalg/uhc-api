const mysql_db = require("../../mysql_db");

const tableName = "course_paymentss";

exports.getAllPayments = (req, res, next) => {
  mysql_db.query("SELECT * FROM " + tableName, (error, result) => {
    if (error) {
      res.send({ success: false, message: "database error", error: err });
    }
    res.status(200).json({
      count: result.length,
      items: result.map(doc => {
        return {
          fee: doc.fee,
          course_id: doc.course_id,
          student_id: doc.student_id,
          request: {
            type: "GET",
            url: "http://localhost:3000/payments/" + doc.id
          }
        };
      })
    });
  });
};

exports.getPayment = (req, res, next) => {
  mysql_db.query(
    "SELECT * FROM " + tableName + " WHERE id=" + req.params.paymentId,
    (error, result) => {
      if (error) {
        res.send({ success: false, message: "database error", error: error });
        return;
      }
      res.status(200).json({
        item: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/payments/"
        }
      });
    }
  );
};

exports.addNewPayment = (req, res, next) => {
  mysql_db.query(
    `INSERT INTO ${tableName} (fee, course_id, student_id) VALUES ('${req.body.fee}', '${req.body.course_id}', '${req.body.student_id}')`,
    (error, result) => {
      if (error) throw error;
      console.log(result);
      res.status(201).json({
        message: "New payment created"
      });
    }
  );
};

exports.deletePayment = (req, res, next) => {
  mysql_db.query(
    "DELETE FROM " + tableName + " WHERE id = '" + req.params.paymentId + "'",
    (error, result) => {
      if (error) throw error;
      console.log(result);
      return res.status(200).json({
        message: "Payment successfully deleted!"
      });
    }
  );
};

exports.updatePayment = (req, res, next) => {
  mysql_db.query(
    `UPDATE ${tableName} SET fee='${req.body.fee}', course_id='${req.body.course_id}', student_id='${req.body.student_id}' WHERE id='${req.params.paymentId}'`,
    (error, result) => {
      if (error) throw error;
      return res.status(200).json({
        message: "Payment successfully updated!"
      });
    }
  );
};
