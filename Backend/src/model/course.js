const { DataTypes, Model } = require( 'sequelize' );

class CoursePersistence extends Model
{
}

const modelName = 'Course'

const initCourse = ( sequelize ) =>
{
	CoursePersistence.init( {
		courseId: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		nameCourse: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		startDay: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		numberWeek: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		startTime: {
			type: DataTypes.TIME,
			allowNull: true,
		},
		onlineUrl: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		endTime: {
			type: DataTypes.DATE,
			allowNull: true,
			unique: true,
		},
		lecturerId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		roomId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		
	}, {
		sequelize,
		modelName,
		timestamps: false,
		tableName: 'course',
	} )
}

module.exports = { initCourse, CoursePersistence, modelName }
