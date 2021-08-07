import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";
import moment from "moment-jalaali";

export const DateFormatter = (cellContent, row) => (

  <span>
    {
      // moment(row.smart_cart_expire_date, 'YYYY-M-D').format('jD jMMMM jYYYY')
      row.SmartCardExpireDate == null ? null : moment((row.SmartCardExpireDate).substr(0, 10)).format('jYYYY-jMM-jDD')

    }
  </span>
);
