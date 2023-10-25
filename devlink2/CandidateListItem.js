import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateListItem.module.css";

export function CandidateListItem({
  as: _Component = _Builtin.Block,
  onclickSelect = {},
  isChecked = true,
  slotProfileImage,
  name = "Dianne Russell",
  jobTitle = "Assosiate software engineer",
  resumeScore = "32%",
  email = "sara.cruz@example.com",
  phone = "(704) 555-0127",
  isInterviewVisible = false,
  interviewScore = "32%",
}) {
  return (
    <_Component className={_utils.cx(_styles, "cv-list-row", "item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column", "checkbox")}
        tag="div"
        {...onclickSelect}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-checkbox")}
          tag="div"
        >
          {isChecked ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%209.08579L10.2929%205.79289C10.6834%205.40237%2011.3166%205.40237%2011.7071%205.79289C12.0976%206.18342%2012.0976%206.81658%2011.7071%207.20711L7.70711%2011.2071C7.31658%2011.5976%206.68342%2011.5976%206.29289%2011.2071L4.29289%209.20711C3.90237%208.81658%203.90237%208.18342%204.29289%207.79289C4.68342%207.40237%205.31658%207.40237%205.70711%207.79289L7%209.08579Z%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%221.5%22%20y%3D%222%22%20width%3D%2213%22%20height%3D%2213%22%20rx%3D%223.5%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column", "name")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-profile-image")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{name}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column", "title")}
        tag="div"
      >
        <_Builtin.Block tag="div">{jobTitle}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "cv-list-column",
          "resume-score",
          "gap-4"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-res-score-icon")}
          tag="div"
        />
        <_Builtin.Block tag="div">{resumeScore}</_Builtin.Block>
      </_Builtin.Block>
      {isInterviewVisible ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column",
            "resume-score",
            "gap-4"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-res-score-icon")}
            tag="div"
          />
          <_Builtin.Block tag="div">{interviewScore}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column", "email")}
        tag="div"
      >
        <_Builtin.Block tag="div">{email}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column", "phone")}
        tag="div"
      >
        <_Builtin.Block tag="div">{phone}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
