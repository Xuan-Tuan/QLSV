const { DataTypes, Model } = require( 'sequelize' );

class DevicePersistence extends Model
{
}

const modelName = 'Device'

const initDevice = ( sequelize ) =>
{
	DevicePersistence.init( {
		deviceId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roomId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
	}, {
		sequelize,
		modelName,
		timestamps: false,
		tableName: 'device',
	} )
}

module.exports = { initDevice, DevicePersistence, modelName }
