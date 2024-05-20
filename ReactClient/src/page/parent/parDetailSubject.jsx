import React from "react";
import Parent from "./parent";
import DetailSubject from "../../component/subject/detailSubject";
export default function ParDetailSubject() {
  return (
    <div>
      <Parent>
        <DetailSubject />
      </Parent>
    </div>
  );
}
