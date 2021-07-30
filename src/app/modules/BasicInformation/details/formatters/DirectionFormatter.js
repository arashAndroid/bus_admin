import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";

export const DirectionFormatter = (cellContent, row) => (

  <span

  >
    {
      (row.SourceTownshipTitle ? row.SourceTownshipTitle : 'نامشخص') + " به  " + (row.DestTownshipTitle ? row.DestTownshipTitle : 'نامشخص')
    }
  </span>
);
