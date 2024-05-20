import React from "react";
import Parent from "./parent";
import Notification from "../../component/notification/notification";
export default function ParNotification() {
  return (
    <div>
      <Parent>
        <Notification />
      </Parent>
    </div>
  );
}
