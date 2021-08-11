import React from "react";
import { StatusCssClasses, StatusTitles } from "../formatters/Helper";
import moment from "moment-jalaali";

export const DestinationFormatter = (cellContent, row) => {
  console.log("row ;;;;;;;;;;;;;;;;", row);
  var lastIndex = row.direction.direction_details.length - 1;
  console.log("row ;;;;;;;;;;;;;;;;", lastIndex);
  return (
    <span>
      {row.direction.direction_details[lastIndex].city.title}
      {/* fdhfghsf */}
    </span>
  );
};
