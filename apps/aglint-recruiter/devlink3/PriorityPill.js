"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PriorityPill.module.css";

export function PriorityPill({
  as: _Component = _Builtin.Block,
  isHighVisible = true,
  isLowVisible = false,
  isMediumVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "priority_wrap")} tag="div">
      {isHighVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "priority_individual")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%229%22%20height%3D%228%22%20viewBox%3D%220%200%209%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.54688%200.8125L7.92188%206.5625C8.02604%206.77083%208.02604%206.97917%207.92188%207.1875C7.79688%207.38542%207.61458%207.48958%207.375%207.5H0.625C0.385417%207.48958%200.203125%207.38542%200.078125%207.1875C-0.0260417%206.97917%20-0.0208333%206.77083%200.09375%206.5625L3.46875%200.8125C3.59375%200.614583%203.77083%200.510417%204%200.5C4.23958%200.510417%204.42188%200.614583%204.54688%200.8125Z%22%20fill%3D%22%23CE2C31%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"High"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isLowVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "priority_individual", "green")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%229%22%20height%3D%228%22%20viewBox%3D%220%200%209%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.45312%207.1875L0.078125%201.4375C-0.0260417%201.22917%20-0.0260417%201.02083%200.078125%200.8125C0.203125%200.614583%200.385417%200.510417%200.625%200.5L7.375%200.5C7.61458%200.510417%207.79688%200.614583%207.92188%200.8125C8.02604%201.02083%208.02083%201.22917%207.90625%201.4375L4.53125%207.1875C4.40625%207.38542%204.22917%207.48958%204%207.5C3.76042%207.48958%203.57812%207.38542%203.45312%207.1875Z%22%20fill%3D%22%2300713F%22%20fill-opacity%3D%220.870588%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Low"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isMediumVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "priority_individual", "yellow")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%227%22%20height%3D%228%22%20viewBox%3D%220%200%207%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%201.5C0.0104167%201.21875%200.109375%200.984375%200.296875%200.796875C0.484375%200.609375%200.71875%200.510417%201%200.5H6C6.28125%200.510417%206.51562%200.609375%206.70312%200.796875C6.89062%200.984375%206.98958%201.21875%207%201.5V6.5C6.98958%206.78125%206.89062%207.01562%206.70312%207.20312C6.51562%207.39062%206.28125%207.48958%206%207.5H1C0.71875%207.48958%200.484375%207.39062%200.296875%207.20312C0.109375%207.01562%200.0104167%206.78125%200%206.5V1.5Z%22%20fill%3D%22%23AB6400%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Medium"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
