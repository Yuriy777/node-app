const express = require('express');
const exp = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cartRoutes = require('./routes/cart');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

const hbs = exp.create({
    defaultLayout: 'main',
    extname: 'hbs',
    allowedProtoMethods: {
        trim: true
    }
});

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5e98a7ebbf15e31f1892fc6a');
        req.user = user;
        next();
    } catch (err) {
        console.log(err)
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/',homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const url = 'mongodb+srv://testuser:12345@cluster0-otlom.azure.mongodb.net/nodeApp?retryWrites=true&w=majority'
        mongoose.connect(url, {
            useNewUrlParser: true
        });
        const candidate = await User.findOne({});
        if(!candidate) {
            const user = new User({
                email: "ddd@dfdf.com",
                name: 'Yuriy',
                cart: {items: []}
            });
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();