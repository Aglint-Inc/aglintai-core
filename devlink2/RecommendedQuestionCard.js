import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RecommendedQuestionCard.module.css";

export function RecommendedQuestionCard({
  as: _Component = _Builtin.Block,
  onClickAddQuestion = {},
  textQuestion = "This is some text inside of a div block inside a question card with 3 line clamp. Clip the lines after three lines from breakpoint 1440 and above.",
  slotQuestionTypeIcon,
  textQuestionType = "Multiple Choice",
  textDuration = "2 minutes",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "question_card", "is_recommended")}
      id={_utils.cx(
        _styles,
        "w-node-_68424a05-2d0e-3810-f1f2-3d8f15a3dc9d-15a3dc9d"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "question_card_top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "question_info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "question_typeicon")}
            tag="div"
          >
            {slotQuestionTypeIcon ?? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25%203.75H12.75C13.1719%203.76563%2013.5234%203.91406%2013.8047%204.19531C14.0859%204.47656%2014.2344%204.82812%2014.25%205.25V12.75C14.2344%2013.1719%2014.0859%2013.5234%2013.8047%2013.8047C13.5234%2014.0859%2013.1719%2014.2344%2012.75%2014.25H5.25C4.82812%2014.2344%204.47656%2014.0859%204.19531%2013.8047C3.91406%2013.5234%203.76562%2013.1719%203.75%2012.75V5.25C3.76562%204.82812%203.91406%204.47656%204.19531%204.19531C4.47656%203.91406%204.82812%203.76563%205.25%203.75ZM11.6484%207.89844C11.8672%207.63281%2011.8672%207.36719%2011.6484%207.10156C11.3828%206.88281%2011.1172%206.88281%2010.8516%207.10156L8.25%209.70312L7.14844%208.60156C6.88281%208.38281%206.61719%208.38281%206.35156%208.60156C6.13281%208.86719%206.13281%209.13281%206.35156%209.39844L7.85156%2010.8984C8.11719%2011.1172%208.38281%2011.1172%208.64844%2010.8984L11.6484%207.89844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textQuestionType}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {textDuration}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "add_btn")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_text")}
            tag="div"
            {...onClickAddQuestion}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%204.875V8.25H13.125C13.3438%208.25%2013.5234%208.32031%2013.6641%208.46094C13.8047%208.60156%2013.875%208.78125%2013.875%209C13.875%209.21875%2013.8047%209.39844%2013.6641%209.53906C13.5234%209.67969%2013.3438%209.75%2013.125%209.75H9.75V13.125C9.75%2013.3438%209.67969%2013.5234%209.53906%2013.6641C9.39844%2013.8047%209.21875%2013.875%209%2013.875C8.78125%2013.875%208.60156%2013.8047%208.46094%2013.6641C8.32031%2013.5234%208.25%2013.3438%208.25%2013.125V9.75H4.875C4.65625%209.75%204.47656%209.67969%204.33594%209.53906C4.19531%209.39844%204.125%209.21875%204.125%209C4.125%208.78125%204.19531%208.60156%204.33594%208.46094C4.47656%208.32031%204.65625%208.25%204.875%208.25H8.25V4.875C8.25%204.65625%208.32031%204.47656%208.46094%204.33594C8.60156%204.19531%208.78125%204.125%209%204.125C9.21875%204.125%209.39844%204.19531%209.53906%204.33594C9.67969%204.47656%209.75%204.65625%209.75%204.875Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Add "}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "question_card_bottom")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "three_line_clamp")}
          tag="div"
        >
          {textQuestion}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css")}
        value="%3Cstyle%3E%0A.four_line_clamp%7B%0Aoverflow%3A%20hidden%3B%0A%20%20display%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%204%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20line-height%3A%201.3%20!important%3B%0A%20%20max-height%3A%20calc(1%20*%204)%3B%0A%7D%0A.three_line_clamp%7B%0Aoverflow%3A%20hidden%3B%0A%20%20display%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%203%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20line-height%3A%201.5%20!important%3B%0A%20%20max-height%3A%20calc(1%20*%203)%3B%0A%7D%0A.is_recommended%3Aactive%20%7B%0A%20%20cursor%3A%20grabbing%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
