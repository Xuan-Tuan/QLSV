import React from "react";
import Student from "./student";
import Notification from "../../component/notification/notification";

export default function StuNotification() {
  return (
    <div>
      <Student>
        <div>
          <Notification />
        </div>
      </Student>
    </div>
  );
}
