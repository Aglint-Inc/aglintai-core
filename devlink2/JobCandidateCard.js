import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobCandidateCard.module.css";

export function JobCandidateCard({
  as: _Component = _Builtin.Block,
  isChecked = false,
  textOrder = "1.",
  slotProfilePic,
  textName = "Mariana Diaz",
  textRole = "Design Engineer",
  textMail = "nathan.roberts@example.com",
  textPhone = "(303) 555-0105",
  slotScore,
  scoreTextColor = {},
  textScore = "--",
  statusBgColor = {},
  statusTextColor = {},
  textStatus = "In Progress",
  textAppliedOn = "Applied on 17 Aug 2023 11:30PM",
  onClickCard = {},
  onClickCheckbox = {},
  isInterview = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "candidate-list-item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cli-checkbox", "padding-large")}
        tag="div"
        {...onClickCheckbox}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "checkbox-wrappers-job")}
          tag="div"
        >
          {isChecked ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "add-icon")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%209.08579L10.2929%205.79289C10.6834%205.40237%2011.3166%205.40237%2011.7071%205.79289C12.0976%206.18342%2012.0976%206.81658%2011.7071%207.20711L7.70711%2011.2071C7.31658%2011.5976%206.68342%2011.5976%206.29289%2011.2071L4.29289%209.20711C3.90237%208.81658%203.90237%208.18342%204.29289%207.79289C4.68342%207.40237%205.31658%207.40237%205.70711%207.79289L7%209.08579Z%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%221.5%22%20y%3D%222%22%20width%3D%2213%22%20height%3D%2213%22%20rx%3D%223.5%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-list-number")}
          tag="div"
        >
          <_Builtin.Block
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {textOrder}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "list-main-info")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cli-column", "candidate-info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "candidate-profile-info")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-profile")}
              tag="div"
            >
              {slotProfilePic}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "frame-1020")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                dyn={{
                  bind: {},
                }}
                tag="div"
              >
                {textName}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                dyn={{
                  bind: {},
                }}
                tag="div"
              >
                {textRole}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "frame-1018")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "vectors-wrapper-46")}
                  width="11.999947547912598"
                  height="11.999947547912598"
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb624dfe721c77c1cf3f_Vectors-Wrapper.svg"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "", "text-grey-600")}
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                >
                  {textMail}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "frame-1018")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "vectors-wrapper-43")}
                  width="12"
                  height="12"
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb634328f76be652b614_Vectors-Wrapper.svg"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "", "text-grey-600")}
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                >
                  {textPhone}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cli-column", "score")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "vectors-wrapper-44")}
            tag="div"
          >
            {slotScore}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cli-column", "score")}
          tag="div"
        >
          {isInterview ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cli-int-score-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "speedometer")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "vectors-wrapper-47")}
                  width="10"
                  height="8.676880836486816"
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb65d61e8c06f83171d1_Vectors-Wrapper.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-288")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-yellow-600"
                  )}
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                  {...scoreTextColor}
                >
                  {textScore}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-yellow-600"
                  )}
                  tag="div"
                  {...scoreTextColor}
                >
                  {"/100"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cli-column", "status")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "frame-1024")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "frame-1096")}
              tag="div"
              {...statusBgColor}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                dyn={{
                  bind: {},
                }}
                tag="div"
                {...statusTextColor}
              >
                {textStatus}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textAppliedOn}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isChecked ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "checked-bg")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
