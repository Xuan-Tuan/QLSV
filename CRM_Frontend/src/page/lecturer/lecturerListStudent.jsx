import { useEffect, useState, useContext, useCallback, memo } from "react";
import { LecturerContext } from "./lecturerDetailCoursePage";
import { API_SERVICE } from "../../helpers/apiHelper";

export default memo(function LecListStudentPage() {
  const { studentList, courseCode } = useContext(LecturerContext);
  console.log("student--------> ", studentList);
  const [studentInfo, setStudentInfo] = useState([]);

  useEffect(() => {
    if (courseCode) {
      getListAttendances(courseCode);
    }
  }, [courseCode]);

  const getListAttendances = async (code) => {
    const response = await API_SERVICE.get(`courses/${code}/attendances`);
    if (response?.status == "success") {
      let data = response?.data?.attendances;
      data?.sort((a, b) => a.name.localeCompare(b.name));
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.MSSV]) {
          acc[item.MSSV] = {
            name: item.name,
            MSSV: item.MSSV,
            totalPresent: 0, // Initialize counter for 'Present'
            records: [],
          };
        }

        // Add the record
        acc[item.MSSV].records.push({
          dateAtt: item.dateAtt,
          attended: item.attended,
          scheduleId: item.scheduleId,
        });

        // Increment 'Present' counter if attended is 'Present'
        if (item.attended === "Present") {
          acc[item.MSSV].totalPresent++;
        }

        return acc;
      }, {});

      // Convert grouped object into an array if needed
      const result = Object.values(groupedData);

      setStudentInfo(result);
    }
  };

  return (
    <div className="flex justify-center my-8">
      {studentInfo && studentInfo.length !== 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full md:w-3/4 table-auto shadow-lg rounded-lg overflow-scroll">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2">Họ tên</th>

                <th className="px-4 py-2">Điểm Danh</th>
              </tr>
            </thead>
            <tbody>
              {studentInfo.map((student, index) => (
                <tr
                  key={student.id}
                  className="bg-white hover:bg-gray-100 transition-colors"
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{student.name}</td>

                  <td className="border px-4 py-2">
                    {student.totalPresent}/{student.records?.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Không tìm thấy sinh viên nào</p>
      )}
    </div>
  );
});
