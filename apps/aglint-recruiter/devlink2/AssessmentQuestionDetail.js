import React from "react";
import * as _Builtin from "./_Builtin";
import { McqQuestion } from "./McqQuestion";
import { ShortAnswerQuestion } from "./ShortAnswerQuestion";
import * as _utils from "./utils";
import _styles from "./AssessmentQuestionDetail.module.css";

export function AssessmentQuestionDetail({
  as: _Component = _Builtin.Block,
  slotQuestionFields,
  slotQuestionType,
  textQuestionCount = "Question 2/16",
  onClickDelete = {},
  onClcikAddOption = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "question_detail_wrapper")}
      id={_utils.cx(
        _styles,
        "w-node-_2f34ab5e-3b60-bfa9-d8a9-1d5e5a5f16c4-5a5f16c4"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "question_type")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_question_type_dropdown")}
          tag="div"
        >
          {slotQuestionType}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "question_number_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {textQuestionCount}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_question_detail")}
        tag="div"
      >
        {slotQuestionFields ?? (
          <>
            <McqQuestion />
            <ShortAnswerQuestion />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "delete_question")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "deletequestionbutton")}
          tag="div"
          {...onClickDelete}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.42188%202.75C6.28125%202.75%206.17188%202.8125%206.09375%202.9375L5.74219%203.5H9.25781L8.90625%202.9375C8.82812%202.8125%208.71875%202.75%208.57812%202.75H6.42188ZM10.1484%203.5H11.25H12H12.375C12.6094%203.51563%2012.7344%203.64062%2012.75%203.875C12.7344%204.10938%2012.6094%204.23438%2012.375%204.25H11.9531L11.3438%2012.6172C11.3125%2013.0078%2011.1562%2013.3359%2010.875%2013.6016C10.5938%2013.8516%2010.25%2013.9844%209.84375%2014H5.15625C4.75%2013.9844%204.40625%2013.8516%204.125%2013.6016C3.84375%2013.3359%203.6875%2013.0078%203.65625%2012.6172L3.04688%204.25H2.625C2.39062%204.23438%202.26562%204.10938%202.25%203.875C2.26562%203.64062%202.39062%203.51563%202.625%203.5H3H3.75H4.85156L5.46094%202.53906C5.69531%202.19531%206.01562%202.01563%206.42188%202H8.57812C8.98438%202.01563%209.30469%202.19531%209.53906%202.53906L10.1484%203.5ZM11.2031%204.25H3.79688L4.40625%2012.5469C4.42188%2012.75%204.5%2012.9141%204.64062%2013.0391C4.78125%2013.1797%204.95312%2013.25%205.15625%2013.25H9.84375C10.0469%2013.25%2010.2188%2013.1797%2010.3594%2013.0391C10.5%2012.9141%2010.5781%2012.75%2010.5938%2012.5469L11.2031%204.25Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Delete this Question"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
