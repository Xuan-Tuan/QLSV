import { useEffect, useState, useContext } from "react";
import LecturerContext from "../../component/lecturerContext";
import { API_SERVICE } from "../../helpers/apiHelper";

export default function LecListStudentPage() {
  const { studentList, courseCode } = useContext(LecturerContext);
  console.log("List student: --------> ", studentList);
  const [studentInfo, setStudentInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseCode) {
      getListAttendances(courseCode);
    }
  }, [courseCode]);

  const getListAttendances = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API_SERVICE.get(`courses/${code}/attendances`);
      if (response?.status === "success") {
        let data = response?.data?.attendances;

        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.MSSV]) {
            acc[item.MSSV] = {
              name: item.name,
              MSSV: item.MSSV,
              totalPresent: 0,
              records: [],
            };
          }

          acc[item.MSSV].records.push({
            dateAtt: item.dateAtt,
            attended: item.attended,
            scheduleId: item.scheduleId,
          });

          if (item.attended === "Present") {
            acc[item.MSSV].totalPresent++;
          }

          return acc;
        }, {});

        // Convert grouped object into an array if needed
        const result = Object.values(groupedData).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setStudentInfo(result);
      }
    } catch (error) {
      setError("Không thể lấy dữ liệu điểm danh");
      console.error("Error fetching attendances:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center my-8">
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p>{error}</p>
      ) : studentInfo && studentInfo.length !== 0 ? (
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
                  key={student.MSSV}
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
}
