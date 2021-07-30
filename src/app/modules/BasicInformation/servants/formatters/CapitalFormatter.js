import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const CapitalFormatter = (cellContent, row) => (

  <span
    className={`label label-lg label-light-${
      //  StatusCssClasses[row.is_active]
      row.isCapital == 1 ? 'success' : 'warning'
      } label-inline`}
  >
    {
      row.isCapital == 0 ? 'مرکز استان' : 'شهرستان'
    }
  </span>
);
