const express = require('express');
const { controller } = require( '../controllers/info.controller' );
const auth = require("../middlewares/authentication")

const router = express.Router();

router.post('', controller.create);
router.put('/:id', controller.update);
router.get('', controller.getList);
router.get('/:id', controller.show);
router.delete('/:id', controller.deleteMethod);


module.exports = router;
