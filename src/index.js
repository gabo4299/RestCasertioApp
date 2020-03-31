const express =require("express");
const app = express();
const morgan = require('morgan');
require('./connection')


app.set('port', process.env.PORT || 8000);
app.set('json spaces', 2)

app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.json());


app.use(require('./routes/index'))
app.use('/api/user',require('./routes/login'))



//start the serever
app.listen(app.get('port'),() =>
{
    console.log('Server en el puerto  ',app.get('port'));
    
})