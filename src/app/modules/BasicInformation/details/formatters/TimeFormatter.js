import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const TimeFormatter = (cellContent, row) => (

  <span

  >
    {
      row.Duration ? row.Duration + " دقیقه " : 0
    }
  </span>
);
