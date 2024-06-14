"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateAssesmentCard.module.css";

export function CandidateAssesmentCard({
  as: _Component = _Builtin.Block,
  slotLogo,
  textQuestionCount = "10 Questions",
  textDuration = "15 Mins",
  onClickStart = {},
  textHeader = "Culture fit check and behavioural assessment",
  onClickSubmitted = {},
  isSubmittedVisible = false,
  isStartButtonVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-960")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-964")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-wrap-assesment")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-963")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textHeader}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-962")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textQuestionCount}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-961")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewbox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9%203C10.125%203.01563%2011.1328%203.28906%2012.0234%203.82031C12.9297%204.35156%2013.6484%205.07031%2014.1797%205.97656C14.7109%206.86719%2014.9844%207.875%2015%209C14.9844%2010.125%2014.7109%2011.1328%2014.1797%2012.0234C13.6484%2012.9297%2012.9297%2013.6484%2012.0234%2014.1797C11.1328%2014.7109%2010.125%2014.9844%209%2015C7.875%2014.9844%206.86719%2014.7109%205.97656%2014.1797C5.07031%2013.6484%204.35156%2012.9297%203.82031%2012.0234C3.28906%2011.1328%203.01562%2010.125%203%209C3.01562%207.73438%203.35938%206.60938%204.03125%205.625C4.1875%205.45312%204.35938%205.42188%204.54688%205.53125C4.73438%205.67188%204.77344%205.84375%204.66406%206.04688C4.07031%206.90625%203.76562%207.89062%203.75%209C3.76562%209.98438%204.00781%2010.8672%204.47656%2011.6484C4.92969%2012.4453%205.55469%2013.0703%206.35156%2013.5234C7.13281%2013.9922%208.01562%2014.2344%209%2014.25C9.98438%2014.2344%2010.8672%2013.9922%2011.6484%2013.5234C12.4453%2013.0703%2013.0703%2012.4453%2013.5234%2011.6484C13.9922%2010.8672%2014.2344%209.98438%2014.25%209C14.2188%207.57812%2013.75%206.38281%2012.8438%205.41406C11.9219%204.44531%2010.7656%203.89844%209.375%203.77344V5.625C9.35938%205.85938%209.23438%205.98438%209%206C8.76562%205.98438%208.64062%205.85938%208.625%205.625V3.375C8.64062%203.14062%208.76562%203.01563%209%203ZM7.00781%206.49219L9.25781%208.74219C9.41406%208.91406%209.41406%209.08594%209.25781%209.25781C9.08594%209.41406%208.91406%209.41406%208.74219%209.25781L6.49219%207.00781C6.33594%206.83594%206.33594%206.66406%206.49219%206.49219C6.66406%206.33594%206.83594%206.33594%207.00781%206.49219Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {textDuration}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isStartButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "button-start-wrap", "cursor-pointer")}
          tag="div"
          {...onClickStart}
        >
          <_Builtin.Block tag="div">{"Start"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isSubmittedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-998")}
          tag="div"
          {...onClickSubmitted}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-green-600")}
            tag="div"
          >
            {"Submitted"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
