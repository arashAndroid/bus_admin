import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const CapitalFormatter = (cellContent, row) => (

  <span
    className={`label label-lg label-light-${
      //  StatusCssClasses[row.is_active]
      row.IsCapital ? 'success' : 'warning'
      } label-inline`}
  >
    {
      row.IsCapital ? 'مرکز استان' : 'شهرستان'
    }
  </span>
);
