const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { products } = require('./data/products');
const { orders } = require('./data/orders');
const { metrics } = require('./data/metrics');

const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourSecretHere',
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- PAYMENT API ---

// Create Razorpay Order
app.post('/api/payment/razorpay/order', async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: Math.round(amount * 100), // amount in paisa, must be integer
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error creating Razorpay order", 
      details: error.description || error.message || "Unknown Razorpay error"
    });
  }
});

// Verify Razorpay Payment
app.post('/api/payment/razorpay/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'YourSecretHere')
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    return res.json({ success: true, message: "Payment verified successfully" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

// --- PUBLIC API ---
app.get('/api/products', (req, res) => {
  const { category, sort } = req.query;
  let result = [...products];
  if (category) {
    result = result.filter(p => p.category === category);
  }
  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);

  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// Mock checkout success/failure (Old)
app.post('/api/checkout/simulate', (req, res) => {
  const { amount, method } = req.body;
  // 90% success rate simulation
  const success = Math.random() > 0.1;
  setTimeout(() => {
    if (success) {
      res.json({ success: true, transactionId: `TXN_${Date.now()}`, message: 'Payment successful' });
    } else {
      res.status(400).json({ success: false, message: 'Payment failed' });
    }
  }, 1500);
});

// --- ADMIN API ---
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: `p${products.length + 1}`,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: `ORD${Date.now()}`,
    ...req.body,
    date: new Date().toISOString()
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get('/api/reports/dashboard', (req, res) => {
  res.json(metrics);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
