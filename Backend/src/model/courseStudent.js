const { DataTypes, Model } = require( 'sequelize' );

class CourseStudentPersistence extends Model
{
}

const modelName = 'CourseStudent'

const initCourseStudent = ( sequelize ) =>
{
	CourseStudentPersistence.init( {
		csId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		courseId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		MSSV: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
	}, {
		sequelize,
		modelName,
		timestamps: false,
		tableName: 'coursestudent',
	} )
}

module.exports = { initCourseStudent, CourseStudentPersistence, modelName }
