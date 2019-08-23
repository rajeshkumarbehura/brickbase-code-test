/**
 Here do database connection handling.
 Change the database connection  URL when required.
 */
const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/brick-test-db";

mongoose.connect(URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected to MongoDB database")
});

module.exports = db;