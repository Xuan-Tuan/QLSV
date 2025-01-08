const passport = require( 'passport' );
const ApiError = require( '../utils/ApiError' );

const verifyCallback = ( req, resolve, reject, requiredRights ) => async ( err, user, info ) =>
{
	console.log("req--------> ", user);

	if ( err || info || !user )
	{
		return reject( new ApiError( 401, 'Hết phiên đăng nhập' ) );
	}
	
	req.user = user;
	if (requiredRights.length > 0 && !requiredRights.includes(user?.authentication?.role)) {
		return reject( new ApiError( 403, 'You do not have permission to access this resource' ) );
    }
	resolve();
};

const auth = ( ...requiredRights ) => async ( req, res, next ) =>
{
	return new Promise( ( resolve, reject ) =>
	{
		passport.authenticate( 'jwt', { session: false }, verifyCallback( req, resolve, reject, requiredRights ) )( req, res, next );
	} )
		.then( () => next() )
		.catch( ( err ) => next( err ) );
};

module.exports = auth;
