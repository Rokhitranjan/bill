const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB (replace the connection string with your own)
mongoose.connect('mongodb://localhost:27017/invoiceApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB schemas
const orderSchema = new mongoose.Schema({
  particulars: String,
  hsnCode: String,
  qty: Number,
  rate: Number,
  amountRs: Number,
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Product = mongoose.model('Product', productSchema);

app.use(cors());
app.use(bodyParser.json());

// API routes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
  // ...

// API routes
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/api/orders', async (req, res) => {
  // ... (existing code)
});

app.get('/api/customers', async (req, res) => {
  // ... (existing code)
});

app.get('/api/products', async (req, res) => {
  // ... (existing code)
});

// ...

});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Gracefully handle process termination
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server...');
  // Close the server and then exit
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});
