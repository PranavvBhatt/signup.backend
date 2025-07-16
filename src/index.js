const express = require('express');
const dotenv = require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes)

app.use("/api/users", userRoutes)

const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);


const PORT = process.env.PORT || 7001;

require('./config/dbConnect');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
