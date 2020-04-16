const {Router} = require('express');
const Courses = require('../models/course');

const router = Router();

router.get('/', async (req, res) => {
    const courses = await Courses.find().lean();
    res.status(200);
    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    });
});
module.exports = router