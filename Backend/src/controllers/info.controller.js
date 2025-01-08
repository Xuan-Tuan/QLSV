const catchAsync = require( '../utils/catchAsync' )
const bcrypt = require( 'bcryptjs' )
const jwt = require( 'jsonwebtoken' )
const ApiError = require( '../utils/ApiError' )
const { AuthenticationPersistence } = require( '../model/authentication' );
const config = require( '../config/config' );
const { v4 } = require( 'uuid' );
const { LecturerPersistence } = require( '../model/lecturer' );
const { AdminPersistence } = require( '../model/admin' );
const { ParentPersistence } = require( '../model/parent' );
const { StudentPersistence } = require( '../model/student' );
const { generateShortCode, generateNumericShortCode } = require( '../utils/common' );
const { sequelize } = require( '../config/sequelize' );
const { Op } = require( 'sequelize' );
const { InfoPersistence } = require( '../model/info' );
const { CoursePersistence } = require( '../model/course' );

const controller = {

	create: catchAsync( async ( req, res ) =>
	{
		try
		{
			const data = {
				infoId: generateNumericShortCode( 3, 'INFO' ),
				title: req?.body?.title,
				content: req?.body?.content,
				courseId: req?.body?.courseId,
			};
			await InfoPersistence.create( data );


			res.status( 200 ).json( { status: 'success', data } );
		} catch ( error )
		{
			console.log( error );
			throw new ApiError( 400, error.message );
		}
	} ),

	update: catchAsync( async ( req, res ) =>
	{
		const { id } = req.params;
		try
		{
			const existingUser = await InfoPersistence.findOne( {
				where: {
					infoId: id,
				},
			} );
			if ( !existingUser ) throw new ApiError( 400, 'Phòng học không  tồn tại' );
			const data = {
				title: req?.body?.title,
				content: req?.body?.content,
				courseId: req?.body?.courseId,
			};
			await InfoPersistence.update( data, { where: { infoId: id } } );
			res.status( 200 ).json( { status: 'success', data } );
		} catch ( error )
		{
			throw new ApiError( 400, error.message );
		}

	} ),


	getList: catchAsync( async ( req, res ) =>
	{
		try
		{

			let data = await InfoPersistence.findAll();
			let result = []
			if ( data?.length > 0 )
			{
				for ( let item of data )
				{
					result.push( {
						...item?.dataValues, course: await CoursePersistence.findOne( {
							where: {
								courseId: item?.courseId
							}
						} )
					} )
				}
			}

			res.status( 200 ).json( { status: 'success', data: result } );
		} catch ( error )
		{
			throw new ApiError( 400, error.message );
		}
	} ),

	show: catchAsync( async ( req, res ) =>
	{
		try
		{
			const { id } = req.params;


			let data = InfoPersistence.findOne( {
				where: {
					roomId: id
				}
			} );

			if ( data )
			{
				data = {
					...data?.dataValues, course: await CoursePersistence.findOne( {
						where: {
							courseId: data?.courseId
						}
					} )
				}
			}


			res.status( 200 ).json( { status: 'success', data } );
		} catch ( error )
		{
			throw new ApiError( 400, error.message );
		}
	} ),
	deleteMethod: catchAsync( async ( req, res ) =>
	{
		try
		{
			// Fetch the corresponding record for the provided type and ID
			const { id } = req.params;
			console.log("đá---------> ", id);
			let result = null;
			let data = await InfoPersistence.findOne( { where: { infoId: id } } );
			if ( !data ) throw new ApiError( 404, `room with ID ${ id } not found` );
			result = await InfoPersistence.destroy( { where: { infoId: id } } );

			res.status( 200 ).json( { status: 'success', data: true } );
		} catch ( error )
		{
			throw new ApiError( 400, error.message );
		}

	} ),
}

module.exports = { controller }
