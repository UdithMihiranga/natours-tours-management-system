const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

//this should called at the top if not it can not catch errors at before it
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('uncaught Exception! Shuting down...!')
  server.close(() => {
    process.exit(1)
  })
})

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection Successful');
  });


// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 497,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR :', err);
//   });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shuting down...!')
  server.close(() => {
    process.exit(1)
  })
})


