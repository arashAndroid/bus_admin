import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const StatusFormatter = (cellContent, row) => (

  <span
    className={`label label-lg label-light-${
      //  StatusCssClasses[row.is_active]
      row.TravelStatus == 1 ? 'success' : 'danger'
      } label-inline`}
  >
    {
      row.TravelStatus == 1 ? 'فعال' : 'غیر فعال'
    }
  </span>
);
