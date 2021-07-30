import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const DirectionFormatter = (cellContent, row) => (

  <span

  >
    {
      (row.SourceTitle ? row.SourceTitle : 'نامشخص') + " به  " + (row.DestTitle ? row.DestTitle : 'نامشخص')
    }
  </span>
);
