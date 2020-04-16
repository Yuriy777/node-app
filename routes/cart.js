const {Router} = require('express');
// const Course = require('../models/course');

const router = Router();

router.get('/', (req, res) => {
    res.status(200);
    res.render('cart', {
        title: 'Cart page',
        isCart: true
    });
});
module.exports = router;