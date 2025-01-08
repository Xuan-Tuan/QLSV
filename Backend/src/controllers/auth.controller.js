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
const { generateShortCode } = require( '../utils/common' );
const { sequelize } = require( '../config/sequelize' );
const { Op } = require( 'sequelize' );

const authController = {
	login: catchAsync( async ( req, res ) =>
	{
		try
		{
			const { email, password } = req.body
			let user = await AuthenticationPersistence.findOne( { where: { email } } );
			console.log( "user-----------> ", user );
			if ( !user )
			{
				throw new ApiError( 400, 'Tài khoản không tồn tại' );
			}
			const isPasswordValid = await bcrypt.compare( password, user.password )
			if ( !isPasswordValid )
			{
				throw new ApiError( 400, 'Invalid phone or password' )
			}
			switch ( user?.role )
			{
				case 'lecturer':
					user = {
						...user?.dataValues,
						profile: await LecturerPersistence.findOne( { where: { authId: user?.authId } } )
					}
					break;
				case 'admin':
					user = {
						...user?.dataValues,
						profile: await AdminPersistence.findOne( { where: { authId: user?.authId } } )
					}
					break;
				case 'parent':
					user = {
						...user?.dataValues,
						profile: await ParentPersistence.findOne( { where: { authId: user?.authId } } )
					};
					break;
				case 'student':
					user = {
						...user?.dataValues,
						profile: await StudentPersistence.findOne( { where: { authId: user?.authId } } )
					};
					break;
				

			}
			const token = jwt.sign( { id: user.authId }, config.jwt.secret, { expiresIn: "100h", } )
			res.status( 200 ).json( {
				status: 'success',
				data: {
					id: user.authId,
					token,
					role: user.role,
					profile: user?.profile
				}
			} )
		} catch ( error )
		{
			throw new ApiError( 400, error.message )
		}
	} ),

	register: catchAsync( async ( req, res ) =>
	{
		const transaction = await sequelize.transaction();
		try
		{
			const request = req.body;
			if ( !request?.email ) throw new ApiError( 400, 'Email is required' );

			const allowedRoles = [ 'lecturer', 'admin', 'parent', 'student' ];
			if ( !allowedRoles.includes( request?.role?.toLowerCase() ) )
			{
				throw new ApiError( 400, 'Role không đúng định dạng' );
			}

			const existingUser = await AuthenticationPersistence.findOne( { where: { email: request.email } } );
			if ( existingUser ) throw new ApiError( 400, 'Tài khoản đã tồn tại' );

			const authenInfo = {
				authId: generateShortCode(),
				email: request.email,
				password: await bcrypt.hash( request.password, 10 ),
				role: request.role,
			};
			await AuthenticationPersistence.create( authenInfo, { transaction } );

			let data = {
				email: request.email,
				fullName: request.fullName,
				phoneNumber: request.phoneNumber,
				address: request.address,
				authId: authenInfo.authId,
			};

			switch ( request.role )
			{
				case 'lecturer':
					data = { ...data, lecturerId: generateShortCode() };
					await LecturerPersistence.create( data, { transaction } );
					break;
				case 'admin':
					data = { ...data, adminId: generateShortCode() };
					await AdminPersistence.create( data, { transaction } );
					break;
				case 'parent':
					data = { ...data, parentId: generateShortCode() };
					await ParentPersistence.create( data, { transaction } );
					break;
				case 'student':
					data = { ...data, parentId: request.parentId, MSSV: generateShortCode( 5 ) };
					await StudentPersistence.create( data, { transaction } );
					break;
			}

			await transaction.commit();
			res.status( 200 ).json( { status: 'success', data } );
		} catch ( error )
		{
			console.log( error );
			if ( transaction ) await transaction.rollback();
			throw new ApiError( 400, error.message );
		}
	} ),

	getProfile: catchAsync( async ( req, res ) =>
	{
		try
		{
			res.status( 200 ).json( { status: 'success', data: req.user } );
		} catch ( error )
		{
			throw new ApiError( 400, error.message );
		}
	} ),

	updateProfile: catchAsync( async ( req, res ) =>
	{
		const transaction = await sequelize.transaction();
		try
		{
			const authInfo = req.user;

			const request = req.body;
			if ( !request?.email ) throw new ApiError( 400, 'Email is required' );

			const existingUser = await AuthenticationPersistence.findOne( {
				where: {
					email: request.email,
					authId: { [ Op.ne ]: authInfo?.id },
				}
			} );
			if ( existingUser ) throw new ApiError( 400, 'Tài khoản đã tồn tại' );

			const authenInfo = {
				email: request.email,

			};
			await AuthenticationPersistence.update( authenInfo, {
				where: { authId: authInfo?.authId },
				transaction,
			} );

			let data = {
				email: request.email || authInfo?.email,
				fullName: request.fullName || authInfo?.fullName,
				phoneNumber: request.phoneNumber || authInfo?.phoneNumber,
				address: request.address || authInfo?.address,
			};

			let oldData = null;

			const type = authInfo?.role; const id = authInfo?.authId

			// Update specific role persistence
			switch ( type )
			{
				case 'lecturer':
					oldData = await LecturerPersistence.findOne( { where: { authId: id } } );
					if ( !oldData ) throw new ApiError( 400, 'Tài khoản không tồn tại' );

					await LecturerPersistence.update( data, {
						where: { authId: id },
						transaction,
					} );
					break;
				case 'admin':
					oldData = await AdminPersistence.findOne( { where: { authId: id } } );
					if ( !oldData ) throw new ApiError( 400, 'Tài khoản không tồn tại' );

					await AdminPersistence.update( data, {
						where: { authId: id },
						transaction,
					} );
					break;
				case 'parent':
					oldData = await ParentPersistence.findOne( { where: { authId: id } } );
					if ( !oldData ) throw new ApiError( 400, 'Tài khoản không tồn tại' );

					await ParentPersistence.update( data, {
						where: { authId: id },
						transaction,
					} );
					break;
				case 'student':
					oldData = await StudentPersistence.findOne( { where: { authId: id } } );
					if ( !oldData ) throw new ApiError( 400, 'Tài khoản không tồn tại' );

					data = { ...data, parentId: request.parentId };
					await StudentPersistence.update( data, {
						where: { authId: id },
						transaction,
					} );
					break;
				default:
					throw new ApiError( 400, 'Invalid role type' );
			}

			await transaction.commit();
			res.status( 200 ).json( { status: 'success', data } );
		} catch ( error )
		{
			console.log( error );
			if ( transaction ) await transaction.rollback();
			throw new ApiError( 400, error.message );
		}
	} ),
}

module.exports = { authController }
