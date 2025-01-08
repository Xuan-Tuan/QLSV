const { DataTypes, Model } = require( 'sequelize' );

class RoomPersistence extends Model
{
}

const modelName = 'Room'

const initRoom = ( sequelize ) =>
{
	RoomPersistence.init( {
		roomId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		nameRoom: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
		
	}, {
		sequelize,
		modelName,
		timestamps: false,
		tableName: 'room',
	} )
}

module.exports = { initRoom, RoomPersistence, modelName }
