import React from "react";
import GatewayDetailPage from "../modules/Gateway/pages/GatewayDetailPage";


export function GatewayDetail(props) {
  console.log("props1 = ", props);
  return <GatewayDetailPage id={props.match.params.id} />;
}
