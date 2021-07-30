import React from "react";
import SensorChartsPage from "../modules/Sensors/pages/SensorChartsPage";


export function SensorCharts(props) {
  return <SensorChartsPage id={props.match.params.id} />;
}
