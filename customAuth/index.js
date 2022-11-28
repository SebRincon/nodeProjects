const express =   require('express');
const mongoose =  require('mongoose');
const User =      require('./models/user');
const bcrypt =    require('bcrypt');
const session =   require('express-session');

mongoose.connect('mongodb://localhost:27017/auth')
    .then(() => {
        console.log("Mongo Connection Made !")
    })
    .catch(err => {
        console.log("No Connection !")
        console.log(err)
    })

const app = express();
// Set engine type & view directory
app.set('view engine', 'ejs');
app.set('views', 'views');

//Allow parseing of the request body
app.use(express.urlencoded({ extended: true }));
//Enabled session cookie w/ secret
app.use(session({secret: "madeupsecret"}))

app.get('/', (req, res) => { 
    res.send("This is the homepage")
})

app.get('/login', (req, res) => {res.render('login')})
app.post('/login', async (req, res) => {
    const { password, username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        res.send("Username or Password is wrong")
    }else { 
        validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            req.session.user_id = user._id;
            res.redirect('/secret')
        }
        else { 
            res.redirect('/login')
        }
    }
})

app.post('/logout', (req, res) => { 
    // Remove the session user_id
    req.session.user_id = null;
    // Compltely remove the user session
    req.session.destroy()
    res.redirect('/')
})

app.get('/register', (req, res) => {res.render('register')})
app.post('/register', async (req, res) => {
    // Destructure the body 
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);

    //Passing hash into a new user object
    const user = new User({ username: username, password: hash });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})


app.get('/secret', (req, res) => { 
    if (!req.session.user_id) { 
        return res.redirect('/login')
    } 
    res.render('secret')
})

app.listen(3000, () => {console.log("Serving app")})