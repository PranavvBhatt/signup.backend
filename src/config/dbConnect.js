const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});