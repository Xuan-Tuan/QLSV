const { DataTypes, Model } = require( 'sequelize' );
const { AuthenticationPersistence } = require( './authentication' );

class StudentPersistence extends Model
{
}

const modelName = 'Student'

const initStudent = ( sequelize ) =>
{
	StudentPersistence.init( {
		RFID: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		MSSV: {
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
		parentId: {
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
		tableName: 'student',
	} );

	StudentPersistence.belongsTo(AuthenticationPersistence, { foreignKey: 'authId', as: 'authentication', targetKey: 'authId'});
}

module.exports = { initStudent, StudentPersistence, modelName }
