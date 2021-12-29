const mongoose = require('mongoose');

const DB = process.env.DATABASE;

module.exports = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successfull.'))
    .catch(err => console.log('Unable to connect to DB - ', err));
};
