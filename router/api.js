const router = require('express').Router();
const controllerapi = require('../controller/controllerapi');

router.get('/', controllerapi.new);
router.get('/:id', controllerapi.card);
router.post('/', controllerapi.create);


module.exports = router;