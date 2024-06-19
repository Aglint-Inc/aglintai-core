"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./EditJobTopbarLeft.module.css";

export function EditJobTopbarLeft({
  as: _Component = _Builtin.Block,
  textName = "Untitled",
  onClickPreview = {},
  isPreview = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "create-job-header-left")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "ejtl-content")} tag="div">
        <Text content={textName} weight="medium" />
        {isPreview ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "ejtl-btn-wrap")}
            tag="div"
            {...onClickPreview}
          >
            <Text content="" weight="" color="accent" />
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25%200H7.75C7.90625%200.0104167%207.98958%200.09375%208%200.25V2.75C7.98958%202.90625%207.90625%202.98958%207.75%203C7.59375%202.98958%207.51042%202.90625%207.5%202.75V0.859375L3.67188%204.67188C3.55729%204.77604%203.44271%204.77604%203.32812%204.67188C3.22396%204.55729%203.22396%204.44271%203.32812%204.32812L7.14062%200.5H5.25C5.09375%200.489583%205.01042%200.40625%205%200.25C5.01042%200.09375%205.09375%200.0104167%205.25%200ZM1%200.5H3.25C3.40625%200.510417%203.48958%200.59375%203.5%200.75C3.48958%200.90625%203.40625%200.989583%203.25%201H1C0.854167%201%200.734375%201.04688%200.640625%201.14062C0.546875%201.23438%200.5%201.35417%200.5%201.5V7C0.5%207.14583%200.546875%207.26562%200.640625%207.35938C0.734375%207.45312%200.854167%207.5%201%207.5H6.5C6.64583%207.5%206.76562%207.45312%206.85938%207.35938C6.95312%207.26562%207%207.14583%207%207V4.75C7.01042%204.59375%207.09375%204.51042%207.25%204.5C7.40625%204.51042%207.48958%204.59375%207.5%204.75V7C7.48958%207.28125%207.39062%207.51562%207.20312%207.70312C7.01562%207.89062%206.78125%207.98958%206.5%208H1C0.71875%207.98958%200.484375%207.89062%200.296875%207.70312C0.109375%207.51562%200.0104167%207.28125%200%207V1.5C0.0104167%201.21875%200.109375%200.984375%200.296875%200.796875C0.484375%200.609375%200.71875%200.510417%201%200.5Z%22%20fill%3D%22var(--accent-11)%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
