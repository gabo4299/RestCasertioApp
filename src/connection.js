
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Caserito'
mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(" we're connected! to mongodb to ", uri)
});
