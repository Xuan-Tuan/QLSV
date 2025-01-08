const { DataTypes, Model } = require( 'sequelize' );

class InfoPersistence extends Model
{
}

const modelName = 'Info'

const initInfo = ( sequelize ) =>
{
	InfoPersistence.init( {
		infoId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
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
		tableName: 'info',
	} )
}

module.exports = { initInfo, InfoPersistence, modelName }
