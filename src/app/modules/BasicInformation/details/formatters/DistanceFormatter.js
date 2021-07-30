import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";
import { Avatar, Chip } from "@material-ui/core";

export const DistanceFormatter = (cellContent, row) => (

  <span

  >
    {
      row.DistanceFromSource ? row.DistanceFromSource + " کیلومتر " : 0
    }
  </span>




);
