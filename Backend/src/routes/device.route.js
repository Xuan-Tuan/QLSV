const express = require('express');
const { DeviceController } = require( '../controllers/device.controller' );
const auth = require("../middlewares/authentication")

const router = express.Router();

router.post('', auth('admin'), DeviceController.create);
router.put('/:id',auth('admin'), DeviceController.update);
router.get('', DeviceController.getList);
router.get('/:id', DeviceController.show);
router.delete('/:id',auth('admin'), DeviceController.deleteMethod);


module.exports = router;
