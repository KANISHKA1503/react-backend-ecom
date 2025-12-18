const express = require("express");
const { getOrders, getOrderById, createOrder, checkoutCart, cancelOrder } = require("../controller/orderController");
const router = express.Router();

router.get("/", getOrders);
router.get("/:orderId", getOrderById);
router.post("/", createOrder);
router.post("/checkout", checkoutCart);
router.delete("/:orderId", cancelOrder);

module.exports = router;