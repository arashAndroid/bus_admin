import React from "react";
import { StatusCssClasses, StatusTitles } from "../formatters/Helper";
import moment from "moment-jalaali";

export const DurationFormatter = (cellContent, row) => {
  return <span>{row.durationFromSource + " " + "دقیقه"}</span>;
};
