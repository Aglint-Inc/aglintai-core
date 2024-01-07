import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScrQuestionDefault.module.css";

export function ScrQuestionDefault({
  as: _Component = _Builtin.Block,
  slotIcon,
  textQuestion = "Have you completed the following degree: Bachelors Degree?",
  textOption = "1. Yes",
  isRequired = false,
  onclickEdit = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "scr-question-default")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-question-header-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-header-icon")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-420")}
            tag="div"
          >
            {slotIcon}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textQuestion}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-edit-icon")}
          tag="div"
          {...onclickEdit}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewBox%3D%220%200%2015%2015%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8359%202.88281C11.5703%202.66406%2011.3047%202.66406%2011.0391%202.88281L10.3594%203.5625L11.4375%204.64062L12.1172%203.96094C12.3359%203.69531%2012.3359%203.42969%2012.1172%203.16406L11.8359%202.88281ZM6.42188%207.5C6.34375%207.57812%206.29688%207.66406%206.28125%207.75781L5.88281%209.11719L7.24219%208.71875C7.33594%208.70312%207.42188%208.65625%207.5%208.57812L10.6406%205.4375L9.5625%204.35938L6.42188%207.5ZM10.2422%202.08594C10.5859%201.75781%2010.9844%201.59375%2011.4375%201.59375C11.8906%201.59375%2012.2891%201.75781%2012.6328%202.08594L12.9141%202.36719C13.2422%202.71094%2013.4062%203.10938%2013.4062%203.5625C13.4062%204.01562%2013.2422%204.41406%2012.9141%204.75781L8.29688%209.375C8.09375%209.57812%207.85156%209.71875%207.57031%209.79688L5.22656%2010.4766C5.00781%2010.5234%204.82031%2010.4766%204.66406%2010.3359C4.50781%2010.1797%204.46094%209.99219%204.52344%209.77344L5.20312%207.42969C5.28125%207.16406%205.42188%206.92188%205.625%206.70312L10.2422%202.08594ZM3.5625%203H6.1875C6.53125%203.03125%206.71875%203.21875%206.75%203.5625C6.71875%203.90625%206.53125%204.09375%206.1875%204.125H3.5625C3.29688%204.125%203.07812%204.21875%202.90625%204.40625C2.71875%204.57812%202.625%204.79688%202.625%205.0625V11.4375C2.625%2011.7031%202.71875%2011.9219%202.90625%2012.0938C3.07812%2012.2812%203.29688%2012.375%203.5625%2012.375H9.9375C10.2031%2012.375%2010.4219%2012.2812%2010.5938%2012.0938C10.7812%2011.9219%2010.875%2011.7031%2010.875%2011.4375V8.8125C10.9062%208.46875%2011.0938%208.28125%2011.4375%208.25C11.7812%208.28125%2011.9688%208.46875%2012%208.8125V11.4375C11.9844%2012.0156%2011.7812%2012.5%2011.3906%2012.8906C11%2013.2812%2010.5156%2013.4844%209.9375%2013.5H3.5625C2.98438%2013.4844%202.5%2013.2812%202.10938%2012.8906C1.71875%2012.5%201.51562%2012.0156%201.5%2011.4375V5.0625C1.51562%204.48438%201.71875%204%202.10938%203.60938C2.5%203.21875%202.98438%203.01563%203.5625%203Z%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-question-default-content")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-qd-options-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"Options :"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textOption}</_Builtin.Block>
        </_Builtin.Block>
        {isRequired ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            <_Builtin.Span className={_utils.cx(_styles, "text-red-500")}>
              {"*"}
            </_Builtin.Span>
            {"required"}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
