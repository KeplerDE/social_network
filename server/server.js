const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB CONNECTION ERROR => ', err));

// Middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(morgan('dev'));

// Autoload routes
fs.readdirSync('./routes').forEach((file) => {
  // Make sure the file is a JavaScript file
  if (file.endsWith('.js')) {
    const route = require(`./routes/${file}`);
    app.use('/api', route);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
