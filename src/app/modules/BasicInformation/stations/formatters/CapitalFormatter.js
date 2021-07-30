import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const CapitalFormatter = (cellContent, row) => (

  <span
    className={`label label-lg label-light-${
      //  StatusCssClasses[row.is_active]
      row.IsMidway == 1 ? 'primary' : 'warning'
      } label-inline`}
  >
    {
      row.IsMidway == 1 ? 'بین راهی' : 'اصلی'
    }
  </span>
);
