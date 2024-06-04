"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./SelectButton.module.css";

export function SelectButton({
  as: _Component = _Builtin.Block,
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "select_button")}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.375%201.5V5.625H10.5C10.7344%205.64062%2010.8594%205.76562%2010.875%206C10.8594%206.23438%2010.7344%206.35938%2010.5%206.375H6.375V10.5C6.35938%2010.7344%206.23438%2010.8594%206%2010.875C5.76562%2010.8594%205.64062%2010.7344%205.625%2010.5V6.375H1.5C1.26562%206.35938%201.14062%206.23438%201.125%206C1.14062%205.76562%201.26562%205.64062%201.5%205.625H5.625V1.5C5.64062%201.26562%205.76562%201.14063%206%201.125C6.23438%201.14063%206.35938%201.26562%206.375%201.5Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <Text content="Select a slot" />
    </_Component>
  );
}
