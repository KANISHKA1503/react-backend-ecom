const Order = require("../models/order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get all orders for the logged-in user
const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.userData.id })
    .populate("products.product")
    .sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    return res.status(200).json({ message: "No orders found", orders: [] });
  }

  res.status(200).json({ orders });
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOne({ _id: orderId, user: req.userData.id })
    .populate("products.product");

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.status(200).json({ order });
};

// Create a new order
const createOrder = async (req, res) => {
  const { products } = req.body; // [{ productId, quantity }]

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "No products provided" });
  }

  // Validate all products exist
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return res.status(404).json({ error: `Product ${item.productId} not found` });
    }
  }

  const orderProducts = products.map((item) => ({
    product: item.productId,
    quantity: item.quantity,
  }));

  const newOrder = await Order.create({
    user: req.userData.id,
    products: orderProducts,
  });

  res.status(201).json({ message: "Order created", order: newOrder });
};

// Create order from cart (checkout)
const checkoutCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userData.id });

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const newOrder = await Order.create({
    user: req.userData.id,
    products: cart.products,
  });

  // Clear the cart after checkout
  cart.products = [];
  await cart.save();

  res.status(201).json({ message: "Order placed successfully", order: newOrder });
};

// Cancel/Delete an order
const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOneAndDelete({ _id: orderId, user: req.userData.id });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.status(200).json({ message: "Order cancelled", order });
};

module.exports = { getOrders, getOrderById, createOrder, checkoutCart, cancelOrder };