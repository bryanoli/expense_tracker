const mongoose = require('mongoose');
require('dotenv').config();


const mongoURI = process.env.MONGODB_URI;

const mongooseOptions = {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
};

mongoose.connect(mongoURI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const db = mongoose.connection;

let clientSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
  }, 
  password:{
    type: String,
    required: true,
  },
  transactions: Array,
  items: Array
});

let Client = mongoose.model("Client", clientSchema);

module.exports=Client;