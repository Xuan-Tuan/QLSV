const { initAdmin } = require('./admin');
const { initAttendance } = require( './attendance' );
const { initAuthentication } = require( './authentication' );
const { initCourse } = require( './course' );
const { initCourseStudent } = require( './courseStudent' );
const { initDevice } = require( './device' );
const { initInfo } = require( './info' );
const { initLecturer } = require( './lecturer' );
const { initParent } = require( './parent' );
const { initRoom } = require( './room' );
const { initSchedule } = require( './schedule' );
const { initStudent } = require( './student' );

const initModels = (sequelize) => {
    initAdmin(sequelize)
    initAttendance(sequelize)
    initCourseStudent(sequelize)
    initDevice(sequelize)
    initAuthentication(sequelize)
    initCourse(sequelize)
    initInfo(sequelize)
    initLecturer(sequelize)
    initParent(sequelize)
    initRoom(sequelize)
    initSchedule(sequelize)
    initStudent(sequelize)
}

module.exports = { initModels }
