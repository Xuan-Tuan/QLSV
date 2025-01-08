const { DataTypes, Model } = require( 'sequelize' );

class AuthenticationPersistence extends Model
{
}

const modelName = 'Authentication'

const initAuthentication = ( sequelize ) =>
{
	AuthenticationPersistence.init( {
		authId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			
		},
		role: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	}, {
		sequelize,
		modelName,
		timestamps: false,
		tableName: 'authentication',
	} )
}

module.exports = { initAuthentication, AuthenticationPersistence, modelName }
