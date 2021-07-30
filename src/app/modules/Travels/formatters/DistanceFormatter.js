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
      row.Distance ? row.Distance + " کیلومتر " : 0
    }
  </span>




);
