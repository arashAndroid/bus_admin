import React from "react";
import DeviceDetailPage from "../modules/Device/pages/DeviceDetailPage";


export function DeviceDetail(props) {
  console.log("props1 = ", props);
  return <DeviceDetailPage id={props.match.params.id} />;
}
