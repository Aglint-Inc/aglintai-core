import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CsvListItem.module.css";

export function CsvListItem({
  as: _Component = _Builtin.Block,
  slotIcon,
  candidateName = "Candidate",
  linkedIn = "LinkedIn",
  email = "Email",
  phone = "Phone",
  listItemProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "csv-list-item")}
      tag="div"
      {...listItemProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "csv-list-item-column", "candidate")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "icon-block",
            "_16x16",
            "rounded",
            "overflow-hidden"
          )}
          tag="div"
        >
          {slotIcon}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "line-clamp-1")}
          tag="div"
        >
          {candidateName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "csv-list-item-column", "job")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "line-clamp-1")}
          tag="div"
        >
          {linkedIn}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "csv-list-item-column", "email")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "line-clamp-1")}
          tag="div"
        >
          {email}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "csv-list-item-column", "phone")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "line-clamp-1")}
          tag="div"
        >
          {phone}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
