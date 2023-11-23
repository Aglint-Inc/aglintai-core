import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobDetailsFilterBlock.module.css";

export function JobDetailsFilterBlock({
  as: _Component = _Builtin.Block,
  slotFilter,
  onclickTopApplicants = {},
  onclickAllApplicants = {},
  isTopApplicants = true,
  isAllApplicants = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cv-tab-filter-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-tab-filter-left")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "cv-rec-tabs")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-rec-tab-link")}
            tag="div"
            {...onclickTopApplicants}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-rec-tab-link-inner")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.97441%204.05937L11.1994%203.6L11.6588%202.375C11.7025%202.25833%2011.7827%202.2%2011.8994%202.2C12.0161%202.2%2012.0963%202.25833%2012.14%202.375L12.5994%203.6L13.8463%204.05937C13.9484%204.10312%2013.9994%204.18333%2013.9994%204.3C13.9994%204.41667%2013.9484%204.49687%2013.8463%204.54062L12.5994%205L12.14%206.24687C12.0963%206.34896%2012.0161%206.4%2011.8994%206.4C11.7827%206.4%2011.7025%206.34896%2011.6588%206.24687L11.1994%205L9.97441%204.54062C9.85775%204.49687%209.79941%204.41667%209.79941%204.3C9.79941%204.18333%209.85775%204.10312%209.97441%204.05937ZM7.28379%203.79687L8.44316%206.29062L10.9369%207.45C11.0682%207.52292%2011.1338%207.625%2011.1338%207.75625C11.1338%207.90208%2011.0682%208.01146%2010.9369%208.08437L8.44316%209.24375L7.28379%2011.7375C7.21087%2011.8687%207.10879%2011.9344%206.97754%2011.9344C6.83171%2011.9344%206.72233%2011.8687%206.64941%2011.7375L5.49004%209.24375L2.99629%208.08437C2.86504%208.02604%202.79941%207.92396%202.79941%207.77812C2.79941%207.63229%202.86504%207.52292%202.99629%207.45L5.49004%206.29062L6.64941%203.79687C6.72233%203.66562%206.83171%203.6%206.97754%203.6C7.12337%203.6%207.22546%203.66562%207.28379%203.79687ZM11.1994%2010.6L11.6588%209.375C11.7025%209.25833%2011.7827%209.2%2011.8994%209.2C12.0161%209.2%2012.0963%209.25833%2012.14%209.375L12.5994%2010.6L13.8463%2011.0594C13.9484%2011.1031%2013.9994%2011.1833%2013.9994%2011.3C13.9994%2011.4167%2013.9484%2011.4969%2013.8463%2011.5406L12.5994%2012L12.14%2013.2469C12.0963%2013.349%2012.0161%2013.4%2011.8994%2013.4C11.7827%2013.4%2011.7025%2013.349%2011.6588%2013.2469L11.1994%2012L9.97441%2011.5406C9.85775%2011.4969%209.79941%2011.4167%209.79941%2011.3C9.79941%2011.1833%209.85775%2011.1031%209.97441%2011.0594L11.1994%2010.6Z%22%20fill%3D%22currentColor%22%20%3Bfill-opacity%3A1%3B%22%3D%22%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Top Applicants"}
              </_Builtin.Block>
            </_Builtin.Block>
            {isTopApplicants ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-rec-tab-link-bg")}
                tag="div"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-rec-tab-link")}
            tag="div"
            {...onclickAllApplicants}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-rec-tab-link-inner")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"All Applicants"}
              </_Builtin.Block>
            </_Builtin.Block>
            {isAllApplicants ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-rec-tab-link-bg")}
                tag="div"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-tab-filter-right")}
        tag="div"
      >
        {slotFilter}
      </_Builtin.Block>
    </_Component>
  );
}
