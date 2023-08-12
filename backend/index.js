require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//db connection
const mongourl= process.env.MONGODB_URI;
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database Connection Error'));
db.once('open', ()=>{
    console.log('Connected to Database Successfully!');
});

app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})