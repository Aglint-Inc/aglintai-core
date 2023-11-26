import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobDescriptionModal.module.css";

export function JobDescriptionModal({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  onClickSearch = {},
  slotJobDescription,
  slotButtonPrimaryRegular,
}) {
  return (
    <_Component className={_utils.cx(_styles, "candidate-job-modal")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Paste your job description"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-input-job-description")}
        tag="div"
      >
        {slotJobDescription}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "search-wrap-job")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotButtonPrimaryRegular}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "close-jobs-desc")}
        tag="div"
        {...onClickClose}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2211%22%20height%3D%2212%22%20viewBox%3D%220%200%209%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.13867%208.98828L4.50195%205.37891L0.892577%208.98828C0.673827%209.15234%200.464192%209.15234%200.263671%208.98828C0.0996085%208.78776%200.0996085%208.58724%200.263671%208.38672L3.87305%204.75L0.263671%201.14062C0.0996085%200.921874%200.0996085%200.712238%200.263671%200.511717C0.464192%200.347655%200.673827%200.347655%200.892577%200.511717L4.50195%204.12109L8.13867%200.511717C8.33919%200.347655%208.53971%200.347655%208.74023%200.511717C8.9043%200.712238%208.9043%200.921874%208.74023%201.14062L5.13086%204.75L8.74023%208.38672C8.9043%208.58724%208.9043%208.78776%208.74023%208.98828C8.53971%209.15234%208.33919%209.15234%208.13867%208.98828Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
