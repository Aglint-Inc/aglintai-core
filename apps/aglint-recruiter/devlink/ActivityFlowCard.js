import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ActivityFlowCard.module.css";

export function ActivityFlowCard({
  as: _Component = _Builtin.Block,
  textActivity = "Applied",
  textDateTime = "27 Jan 2023 11:30 PM",
  isActivityActive = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "ps-activity-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "ps-activity-left")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ps-activity-indicator-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-activity-indicator-block")}
            tag="div"
          >
            {isActivityActive ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-active-icon")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%0A%20%20%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%2210%22%20fill%3D%22%23EDF7FF%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%229.99999%22%20cy%3D%229.99981%22%20r%3D%227.22222%22%20fill%3D%22%23CEE2F2%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%229.99999%22%20cy%3D%229.99986%22%20r%3D%224.44444%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ps-activity-line-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ps-activity-line-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "ps-activity-line-dot")}
                tag="div"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ps-activity-right")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-515")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
            {textActivity}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600-3")}
            tag="div"
          >
            {textDateTime}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
