const {Router} = require('express');
const Course = require('../models/course');

const router = Router();

router.get('/', (req, res) => {
    res.status(200);
    res.render('add', {
        title: 'add page',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const {title, price, image} = req.body;
    const id = req.user._id;
    const course = new Course({title, price, image, userId: id});

    try {
        await course.save();
        res.redirect('/courses');
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;