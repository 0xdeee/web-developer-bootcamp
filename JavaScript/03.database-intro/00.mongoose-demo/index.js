const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/movieApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected'))
  .catch((error) => console.log(error));

// schema creation

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

// Model creation with Schema

const Movie = mongoose.model('Movie', movieSchema);

// create and insert one

// const zombieland = new Movie({
//   title: 'zombieland',
//   year: 2008,
//   score: 9.5,
//   rating: 'PG-13',
// });
// zombieland.save();

// insert multiple documents

// Movie.insertMany([
//   {
//     title: 'pulp fiction',
//     year: 2000,
//     score: 9.5,
//     rating: 'PG-13',
//   },
//   {
//     title: 'forrest gump',
//     year: 2004,
//     score: 9.7,
//     rating: 'PG',
//   },
//   {
//     title: 'pursuit of happiness',
//     year: 2008,
//     score: 9,
//     rating: 'PG-13',
//   },
//   {
//     title: 'finding nemo',
//     year: 2005,
//     score: 8.2,
//     rating: 'PG',
//   },
// ]);

// fetch all inserted document from DB

// Movie.find((err, res) => {
//   if (err) {
//     console.table(err);
//   } else {
//     res.forEach((doc) => console.log(doc));
//   }
// });

// featch filtered document from DB

Movie.find({ year: { $gte: 2005 } }).then((res) => console.log(res));
