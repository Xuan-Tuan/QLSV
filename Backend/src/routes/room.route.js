const express = require('express');
const { RoomController } = require( '../controllers/room.controller' );
const auth = require("../middlewares/authentication")

const router = express.Router();

router.post('', auth('admin'), RoomController.create);
router.put('/:id',auth('admin'), RoomController.update);
router.get('', RoomController.getList);
router.get('/:id', RoomController.show);
router.delete('/:id',auth('admin'), RoomController.deleteMethod);


module.exports = router;
