import React from "react";
import Parent from "./parent";
import ListSubject from "../../component/subject/listSubject";
export default function ParListSubject() {
  return (
    <div>
      <Parent>
        <ListSubject />
      </Parent>
    </div>
  );
}
