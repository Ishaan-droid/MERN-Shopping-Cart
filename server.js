const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

const cookieParser = require('cookie-parser');
const connectDb = require('./utils/connectDb');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const adminRouter = require('./routes/adminRoutes');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();

// BODYPARSER
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONNECTING DB
connectDb();

// ROUTES
app.use('/api/v1/mern-shopping-cart/users', userRouter);
app.use('/api/v1/mern-shopping-cart/products', productRouter);
app.use('/api/v1/mern-shopping-cart/reviews', reviewRouter);
app.use('api/v1/mern-shopping-cart/admin', adminRouter);

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('SHUTTING SERVER DUE TO UNCAUGHT EXCEPTION 💥');

  process.exit(1);
});

// HOSTING FOR PRODUCTION
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.all('*', (req, res, next) => {
//   const err = new Error(`Could not find ${req.originalUrl} url.`);
//   err.statusCode = 404;
//   err.status = 'Fail';
//   next(err);
// });

console.log('hit');

const PORT = process.env.PORT || 8000;

app.use(globalErrorHandler);

const server = app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

process.on('unhandledRejection', (error, promise) => {
  console.log(`Error occured at promise ${promise}`);
  console.log(`Error message : ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});
