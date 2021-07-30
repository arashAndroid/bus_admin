import React from "react";
import {
  StatusCssClasses,
  StatusTitles
} from "./Helper";
import { Avatar, Chip } from "@material-ui/core";

export const avatarFormatter = (cellContent, row) => (

  <span
  // className={`label label-lg label-light-${
  // //  StatusCssClasses[row.is_active]
  // row.is_active ? 'success' : 'danger'
  // } label-inline`}
  >
    {
      // row.is_active ? 'فعال' : 'غیر فعال'
      row.ImageUrl == null ? null :
        <img src={row.ImageUrl} width={50} />
    }
  </span>




);
