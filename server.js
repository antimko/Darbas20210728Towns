require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;

// MiddleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


mongoose
  .connect(process.env.MONGO_CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Conneced to my MongoDB!');
  })
  .catch((err) => console.error(err.message));

// routes
const placesRoutes = require('./server/routes/PlacesRoutes');

app.use('/', placesRoutes);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
