"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScrQuestionOption.module.css";

export function ScrQuestionOption({
  as: _Component = _Builtin.Block,
  slotIcon,
  text = "Custom Question",
  isAddIconVisible = true,
  isTicked = false,
  onclickOption = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "scr-option-block")}
      tag="div"
      {...onclickOption}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-option-innner")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-option-icon-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-option-icon-block")}
            tag="div"
          >
            {slotIcon}
          </_Builtin.Block>
          {isTicked ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "scr-option-icon-bg")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-700")}
          tag="div"
        >
          {text}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-option-add-icon-wrapper")}
          tag="div"
        >
          {isAddIconVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2213%22%20viewbox%3D%220%200%2014%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75%200.75V5.75H12.75C13.2083%205.79167%2013.4583%206.04167%2013.5%206.5C13.4583%206.95833%2013.2083%207.20833%2012.75%207.25H7.75V12.25C7.70833%2012.7083%207.45833%2012.9583%207%2013C6.54167%2012.9583%206.29167%2012.7083%206.25%2012.25V7.25H1.25C0.791667%207.20833%200.541667%206.95833%200.5%206.5C0.541667%206.04167%200.791667%205.79167%201.25%205.75H6.25V0.75C6.29167%200.291667%206.54167%200.0416667%207%200C7.45833%200.0416667%207.70833%200.291667%207.75%200.75Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isTicked ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2211%22%20viewbox%3D%220%200%2016%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.7812%200.71875C15.0729%201.07292%2015.0729%201.42708%2014.7812%201.78125L6.53125%2010.0312C6.17708%2010.3229%205.82292%2010.3229%205.46875%2010.0312L1.21875%205.78125C0.927083%205.42708%200.927083%205.07292%201.21875%204.71875C1.57292%204.42708%201.92708%204.42708%202.28125%204.71875L6%208.4375L13.7188%200.71875C14.0729%200.427083%2014.4271%200.427083%2014.7812%200.71875Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      {isTicked ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-option-bg", "acitve")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-option-bg")}
        tag="div"
      />
    </_Component>
  );
}
