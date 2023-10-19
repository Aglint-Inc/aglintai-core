import React from "react";
import * as _Builtin from "./_Builtin";
import { FeedbackScore } from "./FeedbackScore";
import { DetailedFeedbackCard } from "./DetailedFeedbackCard";
import * as _utils from "./utils";
import _styles from "./ProfileInterviewScore.module.css";

export function ProfileInterviewScore({
  as: _Component = _Builtin.Block,
  textInterviewScoreState = "Average",
  propsTextColor = {},
  textInterviewScore = "78/100",
  propsTextColorInterviewScore = {},
  propsBgColorInterviewScore = {},
  slotFeedbackScore,
  slotDetailedFeedback,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cvs-info-block-2")} tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-lg",
            "fw-semibold",
            "inline-block"
          )}
          tag="div"
        >
          {"Interview Score : "}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps-analysis-text", "inline-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
            {...propsTextColor}
          >
            {textInterviewScoreState}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ps-score-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cvs-score-overview-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-score-count-block")}
            tag="div"
            {...propsBgColorInterviewScore}
          >
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2219%22%20viewbox%3D%220%200%2018%2019%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M9.00067%2012.4245C8.41848%2012.4245%207.86015%2012.1933%207.44848%2011.7816C7.03682%2011.3699%206.80554%2010.8116%206.80554%2010.2294C6.80554%209.40991%207.25189%208.69284%207.90311%208.31967L15.008%204.20748L10.9616%2011.2172C10.5958%2011.9343%209.85676%2012.4245%209.00067%2012.4245ZM9.00067%202.91235C10.3251%202.91235%2011.5616%203.27821%2012.6373%203.87821L11.1007%204.76357C10.4641%204.51479%209.73237%204.37577%209.00067%204.37577C7.44818%204.37577%205.95928%204.99249%204.86151%206.09027C3.76373%207.18804%203.14701%208.67694%203.14701%2010.2294C3.14701%2011.8465%203.79823%2013.3099%204.8592%2014.3636H4.86652C5.15189%2014.6489%205.15189%2015.1099%204.86652%2015.3953C4.58115%2015.6806%204.11286%2015.6806%203.8275%2015.4026C2.50311%2014.0782%201.68359%2012.2489%201.68359%2010.2294C1.68359%208.28882%202.4545%206.42769%203.82671%205.05547C5.19893%203.68326%207.06006%202.91235%209.00067%202.91235ZM16.3177%2010.2294C16.3177%2012.2489%2015.4982%2014.0782%2014.1738%2015.4026C13.8885%2015.6806%2013.4275%2015.6806%2013.1421%2015.3953C12.8568%2015.1099%2012.8568%2014.6489%2013.1421%2014.3636C14.2031%2013.3026%2014.8543%2011.8465%2014.8543%2010.2294C14.8543%209.49772%2014.7153%208.76601%2014.4592%208.10748L15.3446%206.57089C15.9519%207.66845%2016.3177%208.89772%2016.3177%2010.2294Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
              {...propsTextColorInterviewScore}
            >
              {textInterviewScore}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps-score-intro-wrapper")}
          tag="div"
        >
          {slotFeedbackScore ?? <FeedbackScore />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps-score-details-wrapper")}
          tag="div"
        >
          {slotDetailedFeedback ?? <DetailedFeedbackCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
