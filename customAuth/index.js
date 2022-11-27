const express = require('express');
const User = require('./models/user');

const app = express();
// Set engine type & view directory
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req, res) => {res.render('register')})


app.listen(3000, () => {console.log("Serving app")})