import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./QuestionsEmpty.module.css";

export function QuestionsEmpty({
  as: _Component = _Builtin.Block,
  onClickAdd = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "no_questions")}
      id={_utils.cx(
        _styles,
        "w-node-c0152ee5-15d1-3c1d-29cb-8c077c60716d-7c60716d"
      )}
      tag="div"
    >
      <_Builtin.Image
        loading="lazy"
        width="auto"
        height="auto"
        alt=""
        src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65cb7c8ff531323a9b6260d8_questionsempty.svg"
      />
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"No Questions Found"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-gray-600", "maxwidth-custom")}
        tag="div"
      >
        {"Drag and drop recommended questions here or "}
        <_Builtin.Span
          className={_utils.cx(_styles, "text-underline", "text-blue-500")}
          {...onClickAdd}
        >
          {"add a custom question."}
        </_Builtin.Span>
      </_Builtin.Block>
    </_Component>
  );
}
