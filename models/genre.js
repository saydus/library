var mongoose = require('mongoose');

var Schema = mongoose.Schema;


// Create a Schema for Genre
var GenreSchema = new Schema(
 {
    name: {type: String, required: true, min: 3, max: 100}
 }
);


// Virtual for the url
 GenreSchema
 .virtual('url')
 .get(function () {
   return '/catalog/genre/' + this._id;
});

// Export the model
module.exports = mongoose.model('Genre', GenreSchema);