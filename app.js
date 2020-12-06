const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connect database successfully')
)

app.use(express.json());

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

app.use('/api/user' , authRoute);
app.use('/api/post' , postRoute);

app.listen(3000 , () => console.log('Server is running'));