const express = require('express') 
const app = express() 
const cors = require('cors')

const fs = require("fs") 

const rawData = fs.readFileSync("server/sampledata.json")
const data = JSON.parse(rawData)

app.use(cors());
app.use(express.json()) 
app.use(express.static('build'))



app.get('/api/products', (req, res) => {
  const products = data.products; 
  res.json(products);
});

app.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = data.products.find(product => product.id === productId); // Assuming product data is in 'data' variable
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});



app.get('/api/orders', (req, res) => {
  const orders = data.orders; // Assuming orders data is in 'data' variable
  res.json(orders);
});


app.post('/api/orders', (req, res) => {
  const orderData = req.body; // Assuming order data is in the request body

  data.orders.push(orderData); // Adding the new order to your data

  res.json(orderData);
});

app.get('/api/session', (req, res) => {
  const session = data.session;
  res.json(session);
});

// Commented out for reference

app.get('/api/users/:userId', (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL parameter
  console.log('Requested userId:', userId); // Log the userId for testing
  const user = data.users.find(user => user.id === parseInt(userId)); // Parse userId to integer for comparison

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.get('/api/orders', (req, res) => {
  const orders = data.orders; // Assuming orders data is in 'data' variable
  const orderIds = orders.map(order => order.id);
  res.json(orderIds);
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})