import React from "react";
import Parent from "./parent";
import AccountInfor from "../../component/account/accountInfor";

export default function AccountParent() {
  return (
    <div>
      <Parent>
        <AccountInfor />
      </Parent>
    </div>
  );
}
