const { DataTypes, Model } = require( 'sequelize' );

class SchedulePersistence extends Model
{
}

const modelName = 'Schedule'

const initSchedule = ( sequelize ) =>
{
	SchedulePersistence.init( {
		scheduleId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		dateSche: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		courseId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
	}, {
		sequelize,
		modelName,
		timestamps: false,
		tableName: 'schedule',
	} )
}

module.exports = { initSchedule, SchedulePersistence, modelName }
