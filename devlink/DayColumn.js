"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AvailableTimeRange } from "./AvailableTimeRange";
import { AvailableTimeRangeLoader } from "./AvailableTimeRangeLoader";
import { AvailableTimerangeEmpty } from "./AvailableTimerangeEmpty";
import * as _utils from "./utils";
import _styles from "./DayColumn.module.css";

export function DayColumn({
  as: _Component = _Builtin.Block,
  slotAvailableTimeRange,
  textDate = "17",
  textDay = "MON",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "day_column")}
      id={_utils.cx(
        _styles,
        "w-node-_2213d094-701d-dc61-2c7d-d4175817e7cc-5817e7cc"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "day_title")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {textDate}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-lg",
            "fw-light",
            "text-grey-600",
            "text-capitalize"
          )}
          tag="div"
        >
          {textDay}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slotavailabletmerage", "hide_scrollbar")}
        tag="div"
      >
        {slotAvailableTimeRange ?? (
          <>
            <AvailableTimeRange isActive={true} />
            <AvailableTimeRange />
            <AvailableTimeRange />
            <AvailableTimeRange />
            <AvailableTimeRange />
            <AvailableTimeRangeLoader />
            <AvailableTimerangeEmpty />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css")}
        value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.hide_scrollbar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.hide_scrollbar%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
