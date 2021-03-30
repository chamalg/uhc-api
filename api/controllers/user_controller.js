const mysql_db = require("../../mysql_db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tableName = "users";

exports.getAllUsers = (req, res, next) => {
  mysql_db.query("SELECT * FROM " + tableName, (error, result) => {
    if (error) {
      res.send({ success: false, message: "database error", error: err });
    }
    res.status(200).json({
      count: result.length,
      users: result.map(doc => {
        return {
          id: doc.id,
          username: doc.username,
          password: doc.password,
          email: doc.email,
          request: {
            type: "GET",
            url: "http://localhost:3000/users/" + doc.id
          }
        };
      })
    });
  });
};

exports.getUser = (req, res, next) => {
  mysql_db.query(
    "SELECT * FROM " + tableName + " WHERE id=" + req.params.userId,
    (error, result) => {
      if (error) {
        res.send({ success: false, message: "database error", error: error });
        return;
      }
      res.status(200).json({
        user: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/users/"
        }
      });
    }
  );
};

exports.signup = (req, res, next) => {
  mysql_db.query(
    "SELECT username FROM " +
      tableName +
      " WHERE username = '" +
      req.body.username +
      "'",
    (error, result) => {
      if (error) throw error;
      if (result.length >= 1) {
        return res.status(409).json({
          message: "Username exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            mysql_db.query(
              "INSERT INTO " +
                tableName +
                " (username, password, email) VALUES ('" +
                req.body.username +
                "','" +
                hash +
                "','" +
                req.body.email +
                "')",
              (error, result) => {
                if (error) throw error;
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              }
            );
          }
        });
      }
    }
  );
};

exports.signIn = (req, res, next) => {
  mysql_db.query(
    "SELECT * FROM " +
      tableName +
      " WHERE username = '" +
      req.body.username +
      "'",
    (error, user) => {
      if (error) throw error;
      if (user.length < 1) {
        return res.status(409).json({
          message: "Auth failed"
        });
      } else {
        console.log(user[0].password);
        console.log(user);

        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
          if (error) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            console.log(result);
            const token = jwt.sign(
              {
                username: user[0].username,
                userid: user[0].id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );

            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          return res.status(401).json({
            message: "Auth failed"
          });
        });
      }
    }
  );
};

exports.deleteUser = (req, res, next) => {
  mysql_db.query(
    "DELETE FROM " + tableName + " WHERE id = '" + req.params.userId + "'",
    (error, result) => {
      if (error) throw error;
      console.log(result);
      return res.status(200).json({
        message: "User successfully deleted!"
      });
    }
  );
};
