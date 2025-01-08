const express = require('express');
const { controller } = require( '../controllers/course.controller' );
const { controller: courseStudentController } = require( '../controllers/courseStudent.controller' );
const auth = require("../middlewares/authentication")

const router = express.Router();

router.post('/student/:id', courseStudentController.create);



router.post('', auth('admin'), controller.create);
router.put('/link/:id',auth('admin', 'lecturer'), controller.updateLink);
router.put('/:id',auth('admin', 'lecturer'), controller.update);
router.get('', controller.getList);
router.get('/:id/attendances', controller.getListAttendance);

router.get('/:id', controller.show);
router.delete('/:id',auth('admin'), controller.deleteMethod);


module.exports = router;
