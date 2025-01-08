const { DataTypes, Model } = require( 'sequelize' );

class AttendancePersistence extends Model
{
}

const modelName = 'Attendance'

const initAttendance = ( sequelize ) =>
{
	AttendancePersistence.init( {
		attendId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		attended: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		courseId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		MSSV: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		scheduleId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		
	}, {
		sequelize,
		modelName,
		timestamps: false,
		tableName: 'attendance',
	} )
}

module.exports = { initAttendance, AttendancePersistence, modelName }
