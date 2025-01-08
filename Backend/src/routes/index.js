const express = require('express');

const { initModels } = require( '../model' );

const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const RoomRoute = require('./room.route')
const DeviceRoute = require('./device.route')
const CourseRoute = require('./course.route')
const InfoRoute = require('./info.route')


const initModules = ( sequelize ) =>
{
	const router = express.Router();

	initModels( sequelize )
	const defaultRoutes = [
		{ path: '/auth', route: authRoute },
		{ path: '/user', route: userRoute },
		{ path: '/rooms', route: RoomRoute },
		{ path: '/devices', route: DeviceRoute },
		{ path: '/courses', route: CourseRoute },
		{ path: '/infos', route: InfoRoute },
		
	];

	defaultRoutes.forEach( ( route ) =>
	{
		router.use( route.path, route.route );
	} );

	return router
}

module.exports = { initModules }
