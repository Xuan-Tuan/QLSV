import { useParams } from "react-router-dom";

export default function DisplayCoursePage() {
  const { courseCode } = useParams();
  return <div>{courseCode}</div>;
}
