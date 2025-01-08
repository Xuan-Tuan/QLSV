const express = require( 'express' );
const { UserController } = require( '../controllers/user.controller' );
const auth = require( "../middlewares/authentication" )

const router = express.Router();

router.post( '/:type', auth( 'admin' ), UserController.create );
router.put( '/:type/:id', auth( 'admin' ), UserController.update );
router.get( '/:type', UserController.getList );
router.get( '/:type/:id', UserController.show );

router.delete( '/:type/:id', UserController.deleteMethod );


module.exports = router;
