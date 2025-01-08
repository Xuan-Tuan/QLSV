const catchAsync = require( '../utils/catchAsync' )
const bcrypt = require( 'bcryptjs' )
const jwt = require( 'jsonwebtoken' )
const ApiError = require( '../utils/ApiError' )
const { AuthenticationPersistence } = require( '../model/authentication' );
const config = require( '../config/config' );
const { v4 } = require( 'uuid' );
const { generateShortCode } = require( '../utils/common' );
const { sequelize } = require( '../config/sequelize' );
const { Op } = require( 'sequelize' );
const { CourseStudentPersistence } = require( '../model/courseStudent' );
const { StudentPersistence } = require( '../model/student' );
const { CoursePersistence } = require( '../model/course' );

const controller = {

	create: catchAsync( async ( req, res ) =>
	{
		try
		{
			const request = req.body;
			const exist = await CoursePersistence.findOne( {
				where: {
					courseId: request?.courseId
				}
			} );
			if ( !exist )
			{
				throw new ApiError( 400, 'Môn học không tồn tại' )
			}
			const data = {
				csId: request?.csId,
				studentId: request?.studentId,
				courseId: request?.courseId,
			};
			await CourseStudentPersistence.create( data );
			res.status( 200 ).json( { status: 'success', data } );
		} catch ( error )
		{
			console.log( error );
			throw new ApiError( 400, error.message );
		}
	} ),

}

module.exports = { controller }
