const { DataTypes, Model } = require( 'sequelize' );
const { AuthenticationPersistence } = require( './authentication' );

class ParentPersistence extends Model
{
}

const modelName = 'Parent'

const initParent = ( sequelize ) =>
{
	ParentPersistence.init( {
		parentId: {
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
		tableName: 'parent',
	} );

}

module.exports = { initParent, ParentPersistence, modelName }
