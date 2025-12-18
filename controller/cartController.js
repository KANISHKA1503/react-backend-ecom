const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userData.id })
    .populate("products.product");

  if (!cart) {
    return res.status(200).json({ message: "Cart not found", cart: [] });
  }

  res.status(200).json({ cart });
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.userData.id });

  if(!cart) {
    // create a cart and add
    const newCart = await Cart.create({ user: req.userData.id, products: [{ product: productId, quantity }] });
    return res.status(200).json({ message: "Cart created", cart: newCart });
  }
  const product = await Product.findById(productId);
  if(!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  cart.products.push({ product: productId, quantity });
  await cart.save();
  res.status(200).json({ message: "Product added to cart", cart });
}

module.exports = { getCart, addToCart };

//  const Cart= require("../models/Cart")

//  const getCart= async (req, res) => {
//   const cart = await Cart.find();
//   if (cart.length > 0) res.json(cart);
//   else res.status(404).json({ error: "Products not found" });
// };

// const getCartItemById= async (req, res) => {
//   const id = Number(req.params.id);
//   const cart = await Cart.findOne({ id });
//   if (cart) res.json(cart);
//   else res.status(404).json({ error: "Product not found" });
// };

// const deleteCartItem= async (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const deleted = await Cart.findOneAndDelete({ id });
//     if (!deleted) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateCount= async (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const updated = await Cart.findOneAndUpdate(
//       { id },
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ message: "Product not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const addToCart =async (req, res) => {
//   try {
//     const { id, name, imageurl, originalPrice, sellingPrice, category, quantity } = req.body;
//     await Cart.create({ id, name, imageurl, originalPrice, sellingPrice, category, quantity });
//     res.status(201).json({ message: "Product added successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// module.exports={addToCart,updateCount,deleteCartItem,getCart,getCartItemById}