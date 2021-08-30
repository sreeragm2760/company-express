const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());


//middleware
app.use(express.json());

const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');


mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database Connection is ready...');
    })
    .catch((err) => {
        console.log(err);
    });

    app.use('/api', userRoutes);
    app.use('/api', companyRoutes);


    app.listen(3000, () => {
        console.log('server is running http://localhost:3000');
    });