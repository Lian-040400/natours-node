﻿const mongoose = require('mongoose');
const Tour = require('./models/tourModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true
  })
  .then(() => console.log('✅ DB connected successfully.'))
  .catch((err) => console.error('❌ DB connection failed:', err.message));
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
