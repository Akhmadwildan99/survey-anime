const router = require('express').Router();
const data = require('../controller/data');

router.get('/', data.new);
router.post('/add', data.create);

module.exports = router;