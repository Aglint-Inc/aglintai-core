import React from "react";
import * as _Builtin from "./_Builtin";
import { ScorePillNice } from "./ScorePillNice";
import { ScorePillMust } from "./ScorePillMust";
import * as _utils from "./utils";
import _styles from "./ScoreCard.module.css";

export function ScoreCard({
  as: _Component = _Builtin.Block,
  slotScorePills,
  onClickAdd = {},
  textAddButton = "Add required skills",
  textHeading = "Skills",
  colorPropsHeading = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "score-card-detail-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "fw-semibold")}
        tag="div"
        {...colorPropsHeading}
      >
        {textHeading}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "skills-wrap-details")}
        tag="div"
      >
        {slotScorePills ?? (
          <>
            <ScorePillNice />
            <ScorePillMust />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "add-button-wrap")}
        tag="div"
        {...onClickAdd}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5625%201.6875V5.4375H10.3125C10.6562%205.46875%2010.8438%205.65625%2010.875%206C10.8438%206.34375%2010.6562%206.53125%2010.3125%206.5625H6.5625V10.3125C6.53125%2010.6562%206.34375%2010.8438%206%2010.875C5.65625%2010.8438%205.46875%2010.6562%205.4375%2010.3125V6.5625H1.6875C1.34375%206.53125%201.15625%206.34375%201.125%206C1.15625%205.65625%201.34375%205.46875%201.6875%205.4375H5.4375V1.6875C5.46875%201.34375%205.65625%201.15625%206%201.125C6.34375%201.15625%206.53125%201.34375%206.5625%201.6875Z%22%20fill%3D%22%23337FBD%22%20style%3D%22fill%3A%23337FBD%3Bfill%3Acolor(display-p3%200.2000%200.4980%200.7412)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-500")}
          tag="div"
        >
          {textAddButton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
