const { Strategy: JwtStrategy, ExtractJwt } = require( 'passport-jwt' );
const config = require( './config' );
const { tokenTypes } = require( './tokens' );
const { AuthenticationPersistence } = require( '../model/authentication' );
const { LecturerPersistence } = require( '../model/lecturer' );
const ApiError = require( '../utils/ApiError' );
const { AdminPersistence } = require( '../model/admin' );
const { ParentPersistence } = require( '../model/parent' );
const { StudentPersistence } = require( '../model/student' );

const jwtOptions = {
	secretOrKey: config.jwt.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async ( payload, done ) =>
{
	try
	{

		const auth = await AuthenticationPersistence.findOne( {
			where: {
				authId: payload.id
			}
		} );
		if(!auth) {
			return done( null, false );

		}
		const type = auth.role;
		let user = null;
		switch ( type )
		{
			case 'lecturer':
				user = await LecturerPersistence.findOne( { where: { authId: auth.authId } } );
				break;
			case 'admin':
				user = await AdminPersistence.findOne( { where: { authId: auth.authId } } );
				break;
			case 'parent':
				user = await ParentPersistence.findOne( { where: { authId: auth.authId } } );
				break;
			case 'student':
				user = await StudentPersistence.findOne( { where: { authId: auth.authId } } );
				break;
			default: {
				throw new ApiError( 400, 'Invalid role type' );
			}
				
		}
		if ( !user)
		{
			return done( null, false );
		}
		done( null, {...user.dataValues, authentication: auth?.dataValues} );
	} catch ( error )
	{
		done( error, false );
	}
};

const jwtStrategy = new JwtStrategy( jwtOptions, jwtVerify );

module.exports = {
	jwtStrategy,
};
