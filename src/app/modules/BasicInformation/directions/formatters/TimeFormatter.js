import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const TimeFormatter = (cellContent, row) => (

  <span

  >
    {
      row.DurationOverDistance ? row.DurationOverDistance + " دقیقه " : 0
    }
  </span>
);
