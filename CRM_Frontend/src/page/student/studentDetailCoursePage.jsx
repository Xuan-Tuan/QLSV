import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, memo } from "react";
import
{
	doGetCourseDetail,
	doGetScheduleFromCourseID,
	// doGetAttendStatusFromStudentID,
	doGetScheduleListFromCourseID,
} from "../../controller/firestoreController";
import { formattedDate } from "../../controller/formattedDate";
import { useAuth } from "../../controller/authController";
// import
// {
// 	onSnapshot,
// 	query,
// 	collection,
// 	where,
// 	getDocs,
// } from "firebase/firestore";
// import { db } from "../../config/firebaseConfig";
import { API_SERVICE } from "../../helpers/apiHelper";
import moment from "moment";

export default memo( function StudentDetailCoursePage ()
{
	const { courseCode } = useParams();
	const { currentUser } = useAuth();
	const [ course, setCourse ] = useState( {} );
	const [ schedule, setSchedule ] = useState( [] );
	const [ attended, setAttended ] = useState( "Absent" );
	const [ attendanceStats, setAttendanceStats ] = useState( {
		attended: 0,
		total: 0,
	} );
	const [ currentDay, setCurrentDay ] = useState( formattedDate( new Date() ) );
	const [ scheduleList, setScheduleList ] = useState( [] );

	// const getScheduleList = useCallback( async () =>
	// {
	// 	const scheduleList = await doGetScheduleListFromCourseID( courseCode );
	// 	// console.log("Tất cả lịch học: ", scheduleList);
	// 	setScheduleList( scheduleList );
	// }, [ courseCode ] );

	// const getCourseDetail = useCallback( async () =>
	// {
	// 	const courseDetail = await doGetCourseDetail( courseCode );
	// 	setCourse( courseDetail );
	// }, [ courseCode ] );

	// const getSchedule = useCallback( async () =>
	// {
	// 	const schedule = await doGetScheduleFromCourseID( courseCode, currentDay );
	// 	// console.log("Lịch học hôm nay", schedule);
	// 	setSchedule( schedule );
	// }, [ courseCode, currentDay ] );

	//  hàm test
	// async function getAllSchedule() {
	//   const attendanceTest = await doGetAttendStatusFromStudentID(
	//     currentUser.uid,
	//     courseCode
	//   );
	// }

	// const getAttendanceStats = useCallback(async () => {
	//   const attendanceStats = await doGetAttendStatusFromStudentID(
	//     currentUser.uid,
	//     courseCode
	//   );
	//   setAttendanceStats(attendanceStats);
	// }, [courseCode, currentUser.uid]);

	// useEffect( () =>
	// {
	// 	getScheduleList();
	// 	// getAttendanceStats();
	// 	getCourseDetail();
	// 	getSchedule();
	// 	// getAllSchedule();

	// 	const querySchedule = query(
	// 		collection( db, "schedule" ),
	// 		where( "courseID", "==", courseCode ),
	// 		where( "date", "==", currentDay )
	// 	);

	// 	const unsubscribeAttendance = onSnapshot( querySchedule, ( snapshot ) =>
	// 	{
	// 		if ( snapshot.empty )
	// 		{
	// 			console.log( "No matching documents." );
	// 			return;
	// 		}

	// 		const attendanceRef = query(
	// 			collection( db, "attendance" ),
	// 			where( "studentID", "==", currentUser.uid ),
	// 			where( "scheduleID", "==", snapshot.docs[ 0 ].id ),
	// 			where( "courseID", "==", courseCode )
	// 		);

	// 		onSnapshot( attendanceRef, ( snapshot ) =>
	// 		{
	// 			if ( snapshot.empty )
	// 			{
	// 				setAttended( "Absent" );
	// 			} else
	// 			{
	// 				setAttended( snapshot.docs[ 0 ].data().attended );
	// 			}
	// 		} );
	// 	} );

	// 	const queryAttendance = query(
	// 		collection( db, "attendance" ),
	// 		where( "studentID", "==", currentUser.uid ),
	// 		where( "courseID", "==", courseCode )
	// 	);

	// 	const unsubscribeAttendanceStats = onSnapshot(
	// 		queryAttendance,
	// 		( snapshot ) =>
	// 		{
	// 			const total = snapshot.docs.length;
	// 			const attended = snapshot.docs.filter(
	// 				( doc ) => doc.data().attended === "Present"
	// 			).length;
	// 			setAttendanceStats( { total, attended } );
	// 		}
	// 	);

	// 	return () =>
	// 	{
	// 		unsubscribeAttendance();
	// 		unsubscribeAttendanceStats();
	// 	};
	// }, [ getScheduleList, getCourseDetail, getSchedule, currentDay, courseCode, currentUser.uid ] );

	useEffect( () =>
	{
		if ( courseCode )
		{
			getListData( courseCode )
		}
	}, [ courseCode ] )

	const getListData = async ( code ) =>
	{
		const response = await API_SERVICE.get( `courses/${ code }/attendances`, { studentId: currentUser?.MSSV } );
		console.log("response---------> ", response);
		
		if ( response?.status == 'success' )
		{
			let schedules = response?.data?.schedules;
			schedules.sort((a, b) => moment(a?.dateSche).isAfter(moment(b?.dateSche)));
			setScheduleList( schedules );
			let items = {
				...response?.data,
				startDay: moment( response?.data?.startDay ).format( 'DD/MM/yyyy' ),
				code: response?.data?.courseId,
				name: response?.data?.nameCourse,
				lecturerName: response?.data?.lecturer?.fullName,
				week: response?.data?.numberWeek,
				week: response?.data?.numberWeek,
				roomID: response?.data?.roomId,
				onlineURL: response?.data?.onlineURL
			}
			setCourse( items );
			buildData(currentDay, items?.attendances)
		}
	}




	const buildData = ( date,dataOld, e ) =>
	{
		e?.preventDefault();
		if ( dataOld?.length > 0 )
		{
			let data = dataOld?.filter( item => item?.dateAtt == date );
			console.log("data--------> ", date, data);
			
			let dataAttend = data?.filter( e => e?.attended?.toLowerCase() == 'present' );
			if(moment(date).isAfter(moment(moment().format('YYYY-MM-DD')))) {
				setAttended('Watching')
			} else 
			if(dataAttend?.length > 0) {
				setAttended('Present')
			} else {
				setAttended('Absent')
			}

			setSchedule(data);

			setAttendanceStats( {
				attended: dataAttend?.length,
				total: dataOld?.length
			} )
		}
	}


	return (
		<div className="h-[calc(100vh-70px-50px)] flex flex-col lg:flex-row justify-evenly p-8 bg-gray-50">
			<div className="flex flex-col justify-start items-center space-y-6 mt-8">
				<h2 className="text-xl text-uit font-semibold mr-4 text-center">
					Môn học: { course.name }
				</h2>
				<div className="flex items-center justify-center  bg-white rounded-lg shadow-lg px-8 py-6 w-full lg:w-96">
					<div className="flex flex-col space-y-4 text-blue-700 text-lg">
						<div className="flex justify-between">
							<span className="font-semibold mr-4 text-uit">Giáo viên:</span>
							<span>{ course.lecturerName }</span>
						</div>
						<div className="flex justify-between flex-col">
							<div className="flex flex-row justify-between">
								<span className="font-semibold mr-4 text-uit ">
									Ngày bắt đầu:
								</span>
								<span>{ course.startDay }</span>
							</div>
						</div>
						<div className="flex flex-col justify-between items-center">
							<div className="flex justify-between">
								<span className="font-semibold mr-4 text-uit">Từ:</span>
								<span>{ course.startTime }</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold mr-4 text-uit">Đến:</span>
								<span>{ course.endTime }</span>
							</div>
						</div>

						<div className="flex justify-between">
							<span className="font-semibold mr-4 text-uit">Tuần học:</span>
							<span>{ course.week } Tuần</span>
						</div>
						<div className="flex justify-between">
							<span className="font-semibold mr-4 text-uit">Phòng học:</span>
							<span>{ course.roomID }</span>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-start items-center space-y-6 mt-8">
				<h2 className="text-xl text-uit font-semibold mr-4 text-center">
					Thông tin lịch học hôm nay: { currentDay }
				</h2>
				<div className=" bg-white rounded-lg shadow-lg p-4 font-bold text-base text-uit">
					<select
						value={ currentDay }
						onChange={ ( e ) => {
							setCurrentDay( e.target.value );
							buildData(e?.target?.value, course?.attendances, e)
						} }
					>
						<option value="">Chọn ngày</option>
						<option value={ formattedDate( new Date() ) }>Hôm nay</option>
						{ scheduleList &&
							scheduleList.map( ( item, index ) => (
								<option key={ index } value={ item.dateSche }>
									{ moment( item.dateSche ).format( 'DD/MM/yyyy' ) }
								</option>
							) ) }
					</select>
				</div>
				<div className="flex items-center justify-center  bg-white rounded-lg shadow-lg px-8 py-6 w-full lg:w-96">
					<div className="flex flex-col space-y-4 text-uit text-lg">
						{ schedule && schedule.length !== 0 ? (
							<div key={ course.courseId }>
								<div className="flex justify-between">
									<span className="font-semibold ">Online URL:</span>
									<span className="text-blue-700">{ course.onlineUrl }</span>
								</div>
								<div className="flex justify-between">
									<span className="font-semibold mr-1">
										Trạng thái điểm danh:
									</span>
									<span
										className={
											attended === "Watching"
												? "text-blue-500"
												: attended === "Absent"
													? "text-red-500"
													: "text-green-500"
										}
									>
										{ attended === "Watching"
											? "Theo dõi"
											: attended === "Absent"
												? "Vắng mặt"
												: "Đã điểm danh" }
									</span>
								</div>
							</div>
						) : (
							<div className=" flex justify-center items-center font-bold text-red-500 text-xl ">
								Không có lịch học
							</div>
						) }
						<div className="flex justify-between border border-uit bg-white rounded-lg shadow-lg p-4">
							<span className="font-semibold mr-4">Trạng thái điểm danh:</span>
							<span className="font-semibold mr-4">
								<span className="text-green-500">
									{ attendanceStats.attended }
								</span>
								{ " / " }
								<span className="text-red-500">{ attendanceStats.total }</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} );
