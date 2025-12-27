require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const User = require('./models/User');

const productsRouter = require('./router/products');
const cartRouter = require('./router/cart');
const authRouter = require('./router/auth');
const ordersRouter = require('./router/order');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://react-ecommerce-a8oi.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Admin credentials
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'Admin@123';

// Create admin
const createAdminUser = async () => {
  const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({
      username: 'admin',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
    });
    console.log('Admin created');
  }
};

connectDB().then(createAdminUser);

// Routes
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/carts', authMiddleware, cartRouter);
app.use('/orders', authMiddleware, ordersRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});