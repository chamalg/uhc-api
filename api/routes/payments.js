const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/payment_controller");

router.get("/", paymentsController.getAllPayments);
router.get("/:paymentId", paymentsController.getPayment);
router.post("/add", paymentsController.addNewPayment);
router.delete("/:paymentId", paymentsController.deletePayment);
router.patch("/:paymentId", paymentsController.updatePayment);

module.exports = router;
