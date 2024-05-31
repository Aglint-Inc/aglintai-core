"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InputWithLabel.module.css";

export function InputWithLabel({
  as: _Component = _Builtin.Block,
  textFieldName = "When the event will trigger",
  slotInput,
  isDescription = false,
  isAddDynamic = false,
  textDescription = 'This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.',
}) {
  return (
    <_Component className={_utils.cx(_styles, "inputwith_text")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "flex_hr_10")} tag="div">
        <Text content={textFieldName} weight="" />
        {isAddDynamic ? (
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM5.4375%208.0625C5.46875%208.40625%205.65625%208.59375%206%208.625C6.34375%208.59375%206.53125%208.40625%206.5625%208.0625V6.5625H8.0625C8.40625%206.53125%208.59375%206.34375%208.625%206C8.59375%205.65625%208.40625%205.46875%208.0625%205.4375H6.5625V3.9375C6.53125%203.59375%206.34375%203.40625%206%203.375C5.65625%203.40625%205.46875%203.59375%205.4375%203.9375V5.4375H3.9375C3.59375%205.46875%203.40625%205.65625%203.375%206C3.40625%206.34375%203.59375%206.53125%203.9375%206.5625H5.4375V8.0625Z%22%20fill%3D%22%23B552E2%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isDescription ? (
        <_Builtin.Block tag="div">
          <Text content={textDescription} weight="" color="neutral" />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block tag="div">
        {slotInput ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dummy_input")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"Choose event from the list"}
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2220%22%20viewbox%3D%220%200%2016%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75781%2012.7578C7.58594%2012.9141%207.41406%2012.9141%207.24219%2012.7578L2.74219%208.25781C2.58594%208.08594%202.58594%207.91406%202.74219%207.74219C2.91406%207.58594%203.08594%207.58594%203.25781%207.74219L7.5%2011.9609L11.7422%207.74219C11.9141%207.58594%2012.0859%207.58594%2012.2578%207.74219C12.4141%207.91406%2012.4141%208.08594%2012.2578%208.25781L7.75781%2012.7578Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
