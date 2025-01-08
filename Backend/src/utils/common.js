const { v4 } = require( "uuid" );

const moment  = require('moment')

function generateShortCode ( length = 10 )
{
	const uuid = v4().replace( /-/g, '' ); // Generate UUID and remove dashes
	return uuid.substring( 0, length ); // Take the first `length` characters
}
function generateNumericShortCode ( length = 10, path = '' )
{
	const uuid = v4().replace( /[^0-9]/g, '' ); // Generate UUID and remove all non-numeric characters
	const randomNumbers = uuid.padEnd( length, '0' ); // Ensure it has at least `length` digits
	return path + randomNumbers.substring( 0, length ); // Return the first `length` digits
}
const generateSchedule = ( startDay, week ) =>
{
	let schedule = [];
	let startTime = new Date(startDay).getTime();
	for ( let i = 0; i < week; i++ )
	{
		schedule.push( {
			date: new Date( startTime + i * 7 * 24 * 60 * 60 * 1000 ),
		} );
	}
	return schedule;
};
function formattedDate ( date )
{
	if ( !date )
	{
		return null;
	}
	return moment(date).format('yyyy-MM-DD')
}
module.exports = {
	generateShortCode,
	generateNumericShortCode,
	generateSchedule,
	formattedDate
};