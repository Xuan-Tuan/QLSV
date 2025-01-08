const { DataTypes, Model } = require( 'sequelize' );
const { AuthenticationPersistence } = require( './authentication' );

class AdminPersistence extends Model
{
}

const modelName = 'Admin'

const initAdmin = ( sequelize ) =>
{
	AdminPersistence.init( {
		adminId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		authId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		
	}, {
		sequelize,
		modelName,
		timestamps: false,
		tableName: 'admin',
	} );

}

module.exports = { initAdmin, AdminPersistence, modelName }
