import React from "react";
import { StatusCssClasses, StatusTitles } from "./Helper";

export const TimeFormatter = (cellContent, row) => (
  <span>{row.arrivalTime ? row.arrivalTime + " دقیقه " : 0}</span>
);
