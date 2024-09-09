"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./QuestionCard.module.css";

export function QuestionCard({
  as: _Component = _Builtin.Block,
  isActive = false,
  isSelected = false,
  onClickQuestion = {},
  slotQuestionTypeIcon,
  textQuestionType = "Multiple Choice",
  textDuration = "2 minutes",
  textQuestion = "This is some text inside of a div block inside a question card with 3 line clamp. Clip the lines after three lines from breakpoint 1440 and above.",
  isDropping = false,
  isReordering = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "question_card", "is_added")}
      id={_utils.cx(
        _styles,
        "w-node-e2985fb3-f246-ffe1-660e-a1bd999d6cda-999d6cda"
      )}
      tag="div"
      {...onClickQuestion}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "question_card_top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "question_info", "prevent-select")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "question_typeicon")}
            tag="div"
          >
            {slotQuestionTypeIcon ?? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewbox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25%203.75H12.75C13.1719%203.76563%2013.5234%203.91406%2013.8047%204.19531C14.0859%204.47656%2014.2344%204.82812%2014.25%205.25V12.75C14.2344%2013.1719%2014.0859%2013.5234%2013.8047%2013.8047C13.5234%2014.0859%2013.1719%2014.2344%2012.75%2014.25H5.25C4.82812%2014.2344%204.47656%2014.0859%204.19531%2013.8047C3.91406%2013.5234%203.76562%2013.1719%203.75%2012.75V5.25C3.76562%204.82812%203.91406%204.47656%204.19531%204.19531C4.47656%203.91406%204.82812%203.76563%205.25%203.75ZM11.6484%207.89844C11.8672%207.63281%2011.8672%207.36719%2011.6484%207.10156C11.3828%206.88281%2011.1172%206.88281%2010.8516%207.10156L8.25%209.70312L7.14844%208.60156C6.88281%208.38281%206.61719%208.38281%206.35156%208.60156C6.13281%208.86719%206.13281%209.13281%206.35156%209.39844L7.85156%2010.8984C8.11719%2011.1172%208.38281%2011.1172%208.64844%2010.8984L11.6484%207.89844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
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
        <_Builtin.Block
          className={_utils.cx(_styles, "add_btn", "hide")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.42188%201.25C4.28125%201.25%204.17188%201.3125%204.09375%201.4375L3.74219%202H7.25781L6.90625%201.4375C6.82812%201.3125%206.71875%201.25%206.57812%201.25H4.42188ZM8.14844%202H9.25H10H10.375C10.6094%202.01563%2010.7344%202.14062%2010.75%202.375C10.7344%202.60938%2010.6094%202.73437%2010.375%202.75H9.95312L9.34375%2011.1172C9.3125%2011.5078%209.15625%2011.8359%208.875%2012.1016C8.59375%2012.3516%208.25%2012.4844%207.84375%2012.5H3.15625C2.75%2012.4844%202.40625%2012.3516%202.125%2012.1016C1.84375%2011.8359%201.6875%2011.5078%201.65625%2011.1172L1.04688%202.75H0.625C0.390625%202.73437%200.265625%202.60938%200.25%202.375C0.265625%202.14062%200.390625%202.01563%200.625%202H1H1.75H2.85156L3.46094%201.03906C3.69531%200.695312%204.01562%200.515625%204.42188%200.5H6.57812C6.98438%200.515625%207.30469%200.695312%207.53906%201.03906L8.14844%202ZM9.20312%202.75H1.79688L2.40625%2011.0469C2.42188%2011.25%202.5%2011.4141%202.64062%2011.5391C2.78125%2011.6797%202.95312%2011.75%203.15625%2011.75H7.84375C8.04688%2011.75%208.21875%2011.6797%208.35938%2011.5391C8.5%2011.4141%208.57812%2011.25%208.59375%2011.0469L9.20312%202.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "question_card_bottom")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "three_line_clamp", "prevent-select")}
          tag="div"
        >
          {textQuestion}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css")}
        value="%3Cstyle%3E%0A.four_line_clamp%7B%0Aoverflow%3A%20hidden%3B%0A%20%20display%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%204%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20line-height%3A%201.3%20!important%3B%0A%20%20max-height%3A%20calc(1%20*%204)%3B%0A%7D%0A.three_line_clamp%7B%0Aoverflow%3A%20hidden%3B%0A%20%20display%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%203%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20line-height%3A%201.5%20!important%3B%0A%20%20max-height%3A%20calc(1%20*%203)%3B%0A%7D%0A.is_recommended%3Aactive%20%7B%0A%20%20cursor%3A%20grabbing%3B%0A%7D%0A.prevent-select%20%7B%0A%20%20-webkit-user-select%3A%20none%3B%20%2F*%20Safari%20*%2F%0A%20%20-ms-user-select%3A%20none%3B%20%2F*%20IE%2010%20and%20IE%2011%20*%2F%0A%20%20user-select%3A%20none%3B%20%2F*%20Standard%20syntax%20*%2F%0A%7D%0A%3C%2Fstyle%3E"
      />
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_active_bg")}
          tag="div"
        />
      ) : null}
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_selected_bg")}
          tag="div"
        />
      ) : null}
      {isDropping ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "isdropping")}
          tag="div"
        />
      ) : null}
      {isReordering ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_reordering")}
          tag="div"
        >
          <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2223%22%20height%3D%2224%22%20viewbox%3D%220%200%2023%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5%208.5C7.9375%208.47917%207.5%208.22917%207.1875%207.75C6.9375%207.25%206.9375%206.75%207.1875%206.25C7.5%205.77083%207.9375%205.52083%208.5%205.5C9.0625%205.52083%209.5%205.77083%209.8125%206.25C10.0625%206.75%2010.0625%207.25%209.8125%207.75C9.5%208.22917%209.0625%208.47917%208.5%208.5ZM8.5%2013.5C7.9375%2013.4792%207.5%2013.2292%207.1875%2012.75C6.9375%2012.25%206.9375%2011.75%207.1875%2011.25C7.5%2010.7708%207.9375%2010.5208%208.5%2010.5C9.0625%2010.5208%209.5%2010.7708%209.8125%2011.25C10.0625%2011.75%2010.0625%2012.25%209.8125%2012.75C9.5%2013.2292%209.0625%2013.4792%208.5%2013.5ZM10%2017C9.97917%2017.5625%209.72917%2018%209.25%2018.3125C8.75%2018.5625%208.25%2018.5625%207.75%2018.3125C7.27083%2018%207.02083%2017.5625%207%2017C7.02083%2016.4375%207.27083%2016%207.75%2015.6875C8.25%2015.4375%208.75%2015.4375%209.25%2015.6875C9.72917%2016%209.97917%2016.4375%2010%2017ZM13.5%208.5C12.9375%208.47917%2012.5%208.22917%2012.1875%207.75C11.9375%207.25%2011.9375%206.75%2012.1875%206.25C12.5%205.77083%2012.9375%205.52083%2013.5%205.5C14.0625%205.52083%2014.5%205.77083%2014.8125%206.25C15.0625%206.75%2015.0625%207.25%2014.8125%207.75C14.5%208.22917%2014.0625%208.47917%2013.5%208.5ZM15%2012C14.9792%2012.5625%2014.7292%2013%2014.25%2013.3125C13.75%2013.5625%2013.25%2013.5625%2012.75%2013.3125C12.2708%2013%2012.0208%2012.5625%2012%2012C12.0208%2011.4375%2012.2708%2011%2012.75%2010.6875C13.25%2010.4375%2013.75%2010.4375%2014.25%2010.6875C14.7292%2011%2014.9792%2011.4375%2015%2012ZM13.5%2018.5C12.9375%2018.4792%2012.5%2018.2292%2012.1875%2017.75C11.9375%2017.25%2011.9375%2016.75%2012.1875%2016.25C12.5%2015.7708%2012.9375%2015.5208%2013.5%2015.5C14.0625%2015.5208%2014.5%2015.7708%2014.8125%2016.25C15.0625%2016.75%2015.0625%2017.25%2014.8125%2017.75C14.5%2018.2292%2014.0625%2018.4792%2013.5%2018.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}