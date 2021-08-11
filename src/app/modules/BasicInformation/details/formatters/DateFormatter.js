import React from "react";
import { StatusCssClasses, StatusTitles } from "../formatters/Helper";
import moment from "moment-jalaali";

export const DateFormatter = (cellContent, row) => (
  <span>
    {// moment(row.smart_cart_expire_date, 'YYYY-M-D').format('jD jMMMM jYYYY')
    row.arrivalTime == null
      ? null
      : moment(row.arrivalTime.substr(0, 10)).format("jYYYY-jMM-jDD") +
        " | " +
        moment(row.arrivalTime)
          .toString()
          .substring(16, 21)}
  </span>
);
