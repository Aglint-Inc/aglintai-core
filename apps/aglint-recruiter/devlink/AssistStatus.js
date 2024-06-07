"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssistStatus.module.css";

export function AssistStatus({
  as: _Component = _Builtin.Block,
  isPublishedVisible = true,
  isDraftVisible = false,
  isCloseVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-822")} tag="div">
      {isPublishedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dash-status-block", "green-500")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block-7", "_16x16")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2211%22%20height%3D%228%22%20viewbox%3D%220%200%2011%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.1903%200.409374C10.3361%200.569791%2010.3361%200.730208%2010.1903%200.890625L4.24028%206.84062C4.07987%206.98646%203.91945%206.98646%203.75903%206.84062L0.609033%203.69062C0.463199%203.53021%200.463199%203.36979%200.609033%203.20937C0.769449%203.06354%200.929866%203.06354%201.09028%203.20937L3.99966%206.09687L9.70903%200.409374C9.86945%200.263541%2010.0299%200.263541%2010.1903%200.409374Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-color-white")}
            tag="div"
          >
            {"Published"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isDraftVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dash-status-block", "yellow-500")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block-7", "_16x16")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2210%22%20height%3D%2211%22%20viewbox%3D%220%200%2010%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.40625%205.49219L7.0625%205.85156L3.95312%208.96094C3.78646%209.1276%203.58854%209.24219%203.35938%209.30469L1.48438%209.86719C1.33854%209.89844%201.21354%209.86198%201.10938%209.75781C1.00521%209.65365%200.973958%209.53385%201.01562%209.39844L1.5625%207.50781C1.63542%207.28906%201.75521%207.09635%201.92188%206.92969L5.03125%203.82031L5.375%203.46094L5.5625%203.28906L6.09375%203.82031L7.0625%204.78906L7.59375%205.32031L7.40625%205.49219ZM3.5%208.11719V8.13281H3C2.84375%208.11198%202.76042%208.02865%202.75%207.88281V7.38281L2.39062%207.52344C2.34896%207.58594%202.3125%207.65365%202.28125%207.72656L1.92188%208.94531L3.15625%208.58594C3.22917%208.5651%203.29688%208.52865%203.35938%208.47656L3.5%208.11719ZM6.67188%202.17969C6.88021%201.98177%207.11458%201.88281%207.375%201.88281C7.64583%201.88281%207.88021%201.98177%208.07812%202.17969L8.70312%202.78906C8.89062%202.9974%208.98438%203.23177%208.98438%203.49219C8.98438%203.76302%208.89062%204.0026%208.70312%204.21094L8.46875%204.42969L8.10938%204.78906L7.9375%204.96094L7.40625%204.42969L6.4375%203.46094L5.90625%202.92969L6.09375%202.75781L6.4375%202.39844L6.67188%202.17969ZM5.92188%204.80469C6.02604%204.67969%206.02604%204.5599%205.92188%204.44531C5.80729%204.35156%205.69271%204.35156%205.57812%204.44531L3.32812%206.69531C3.22396%206.8099%203.22396%206.92969%203.32812%207.05469C3.44271%207.14844%203.55729%207.14844%203.67188%207.05469L5.92188%204.80469Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-color-white")}
            tag="div"
          >
            {"Draft"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isCloseVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dash-status-block", "red-500")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block-7", "_16x16")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.58594%203.21094L6.79688%206L9.58594%208.78906C9.80469%209.05469%209.80469%209.32031%209.58594%209.58594C9.32031%209.80469%209.05469%209.80469%208.78906%209.58594L6%206.79688L3.21094%209.58594C2.94531%209.80469%202.67969%209.80469%202.41406%209.58594C2.19531%209.32031%202.19531%209.05469%202.41406%208.78906L5.20312%206L2.41406%203.21094C2.19531%202.94531%202.19531%202.67969%202.41406%202.41406C2.67969%202.19531%202.94531%202.19531%203.21094%202.41406L6%205.20312L8.78906%202.41406C9.05469%202.19531%209.32031%202.19531%209.58594%202.41406C9.80469%202.67969%209.80469%202.94531%209.58594%203.21094Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-color-white")}
            tag="div"
          >
            {"Closed"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
