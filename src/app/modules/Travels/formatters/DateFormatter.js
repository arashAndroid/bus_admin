import React from "react";
import { StatusCssClasses, StatusTitles } from "./Helper";
import moment from "moment-jalaali";

export const DateFormatter = (cellContent, row) => (
  <span>
    {// moment(row.smart_cart_expire_date, 'YYYY-M-D').format('jD jMMMM jYYYY')
    row.DepartureDatetime != null
      ? moment(row.DepartureDatetime.substring(0, 10)).format("jYYYY/jMM/jDD") +
        " " +
        moment(row.DepartureDatetime)
          .toString()
          .substring(16, 21)
      : "نامشخص"}
  </span>
);
