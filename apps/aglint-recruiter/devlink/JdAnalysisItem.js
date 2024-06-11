"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./JdAnalysisItem.module.css";

export function JdAnalysisItem({
  as: _Component = _Builtin.Block,
  textBadge = "High 65%",
  textAnalysis = "The candidate's prior work experiences align closely with the job requirements, showcasing leadership, community engagement, content creation, and strategic planning, which are essential for the Head of Developer Experience role.",
  isHigh = false,
  isPoor = false,
  isMedium = false,
  textTitle = "Experience",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "jd-analysis-item-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "cd_title")} tag="div">
        <Text content={textTitle} />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_for_badge")}
          tag="div"
        >
          {isHigh ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "jd_anasis_individual")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%228%22%20viewBox%3D%220%200%2010%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.54688%200.8125L8.92188%206.5625C9.02604%206.77083%209.02604%206.97917%208.92188%207.1875C8.79688%207.38542%208.61458%207.48958%208.375%207.5H1.625C1.38542%207.48958%201.20312%207.38542%201.07812%207.1875C0.973958%206.97917%200.979167%206.77083%201.09375%206.5625L4.46875%200.8125C4.59375%200.614583%204.77083%200.510417%205%200.5C5.23958%200.510417%205.42188%200.614583%205.54688%200.8125Z%22%20fill%3D%22%2300713F%22%20fill-opacity%3D%220.870588%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text content={textBadge} color="" weight="medium" size="1" />
            </_Builtin.Block>
          ) : null}
          {isMedium ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "jd_anasis_individual_medium")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%227%22%20height%3D%228%22%20viewBox%3D%220%200%207%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%201.5C0.0104167%201.21875%200.109375%200.984375%200.296875%200.796875C0.484375%200.609375%200.71875%200.510417%201%200.5H6C6.28125%200.510417%206.51562%200.609375%206.70312%200.796875C6.89062%200.984375%206.98958%201.21875%207%201.5V6.5C6.98958%206.78125%206.89062%207.01562%206.70312%207.20312C6.51562%207.39062%206.28125%207.48958%206%207.5H1C0.71875%207.48958%200.484375%207.39062%200.296875%207.20312C0.109375%207.01562%200.0104167%206.78125%200%206.5V1.5Z%22%20fill%3D%22%239E6C00%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text content={textBadge} color="" weight="medium" size="1" />
            </_Builtin.Block>
          ) : null}
          {isPoor ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "jd_anasis_individual_poor")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%228%22%20viewBox%3D%220%200%2010%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.45312%207.1875L1.07813%201.4375C0.973958%201.22917%200.973958%201.02083%201.07813%200.8125C1.20313%200.614583%201.38542%200.510417%201.625%200.5L8.375%200.5C8.61458%200.510417%208.79688%200.614583%208.92188%200.8125C9.02604%201.02083%209.02083%201.22917%208.90625%201.4375L5.53125%207.1875C5.40625%207.38542%205.22917%207.48958%205%207.5C4.76042%207.48958%204.57812%207.38542%204.45312%207.1875Z%22%20fill%3D%22%23CE2C31%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text content={textBadge} color="" weight="medium" size="1" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <Text content={textAnalysis} color="neutral" weight="" size="2" />
    </_Component>
  );
}
