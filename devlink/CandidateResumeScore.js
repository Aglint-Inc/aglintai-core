import React from "react";
import * as _Builtin from "./_Builtin";
import { ResumeFeedbackScore } from "./ResumeFeedbackScore";
import * as _utils from "./utils";
import _styles from "./CandidateResumeScore.module.css";

export function CandidateResumeScore({
  as: _Component = _Builtin.Block,
  slotScoreGraph,
  textScoreState = "Excellent",
  propsTextColor = {},
  onClickDownloadResume = {},
  onClickViewResume = {},
  slotFeedbackScore,
  textStyleProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cvs-info-block", "mt-20")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "fw-semibold")}
        tag="div"
        {...textStyleProps}
      >
        {"Resume Score"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-score-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cvs-score-overview-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-res-score-block")}
            tag="div"
          >
            {slotScoreGraph}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-score-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-491")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "text-yellow-700")}
                tag="div"
                {...propsTextColor}
              >
                {textScoreState}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cvs-download-res-btn",
                "clickable"
              )}
              tag="div"
              {...onClickDownloadResume}
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.5%208.19509L9.04645%205.64864C9.24171%205.45338%209.55829%205.45338%209.75355%205.64864C9.94882%205.84391%209.94882%206.16049%209.75355%206.35575L6.65355%209.45575C6.25829%209.85101%205.64171%209.85101%205.24645%209.45575L2.14645%206.35575C1.95118%206.16049%201.95118%205.84391%202.14645%205.64864C2.34171%205.45338%202.65829%205.45338%202.85355%205.64864L5.5%208.29509V1.0022C5.5%200.726055%205.72386%200.502197%206%200.502197C6.27614%200.502197%206.5%200.726055%206.5%201.0022V8.19509ZM1.5%2012.5022C1.22386%2012.5022%201%2012.2783%201%2012.0022C1%2011.7261%201.22386%2011.5022%201.5%2011.5022H10.5C10.7761%2011.5022%2011%2011.7261%2011%2012.0022C11%2012.2783%2010.7761%2012.5022%2010.5%2012.5022H1.5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-600-2")}
                tag="div"
              >
                {"Download Resume"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cvs-view-res-btn", "clickable")}
              tag="div"
              {...onClickViewResume}
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.99986%2010.5022C3.49288%2010.5022%201.5331%209.05872%200.209412%207.16773C-0.0709987%206.76464%20-0.0709987%206.23204%200.208768%205.84759C1.51713%203.95774%203.48959%202.5022%205.99986%202.5022C8.50685%202.5022%2010.4666%203.94567%2011.7903%205.83666C12.0695%206.23794%2012.0707%206.76756%2011.7881%207.16095C10.4797%209.04879%208.5083%2010.5022%205.99986%2010.5022ZM10.9688%206.58759C11.009%206.53204%2011.009%206.46464%2010.9702%206.40893C9.81544%204.7592%208.10883%203.5022%205.99986%203.5022C3.88855%203.5022%202.17163%204.76916%201.02423%206.42628C0.990728%206.47235%200.990728%206.53976%201.02948%206.59547C2.18429%208.2452%203.89089%209.5022%205.99986%209.5022C8.11118%209.5022%209.8281%208.23523%2010.9688%206.58759ZM5.99986%208.5022C4.8953%208.5022%203.99986%207.60677%203.99986%206.5022C3.99986%205.39763%204.8953%204.5022%205.99986%204.5022C7.10443%204.5022%207.99986%205.39763%207.99986%206.5022C7.99986%207.60677%207.10443%208.5022%205.99986%208.5022ZM5.99986%207.5022C6.55215%207.5022%206.99986%207.05448%206.99986%206.5022C6.99986%205.94991%206.55215%205.5022%205.99986%205.5022C5.44758%205.5022%204.99986%205.94991%204.99986%206.5022C4.99986%207.05448%205.44758%207.5022%205.99986%207.5022Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-600-2")}
                tag="div"
              >
                {"View Resume"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cvs-score-details-wrapper")}
          tag="div"
        >
          {slotFeedbackScore ?? <ResumeFeedbackScore />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
