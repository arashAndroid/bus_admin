import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const StatusFormatter = (cellContent, row) => (

  <span
    className={`label label-lg label-light-${
      //  StatusCssClasses[row.is_active]
      row.IsActive ? 'success' : 'danger'
      } label-inline`}
  >
    {
      row.IsActive ? 'فعال' : 'غیر فعال'
    }
  </span>
);
