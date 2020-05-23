var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {

// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case

  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  } 
  
  return fullname;
});




// Virtual for author's age
AuthorSchema
.virtual('age')
.get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});



// Virtual for author's date of birth formatted
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
});


// Virtual for author's date of death formatted 
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '';
});


// Virtual for author's date of birth formatted
AuthorSchema
.virtual('date_of_birth_form')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});



// Virtual for author's date of death formatted for form 
AuthorSchema
.virtual('date_of_death_form')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});


// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {

  if (this.date_of_birth_formatted.length && this.date_of_death_formatted){
    return '' + this.date_of_birth_formatted + ' - ' + this.date_of_death_formatted; 
  }
  else if (this.date_of_birth_formatted && !this.date_of_death_formatted){
    return 'Born: ' + this.date_of_birth_formatted; 
  }
  else{
    return 'Unknown lifespan'; 
  }
         
});

 
// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);