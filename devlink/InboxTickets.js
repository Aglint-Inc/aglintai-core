import React from "react";
import * as _Builtin from "./_Builtin";
import { Priority } from "./Priority";
import { Assignee } from "./Assignee";
import { StatusPill } from "./StatusPill";
import * as _utils from "./utils";
import _styles from "./InboxTickets.module.css";

export function InboxTickets({
  as: _Component = _Builtin.Block,
  textIssues = "Qorem ipsum dolor sit amet, consectetur adipiscing elit.",
  textTicketsId = "887",
  slotCandidateImage,
  textCandidateName = "Maria Johnson",
  textJobRole = "Software Developer",
  textCompanyLocations = "Microsoft, California, United States",
  textDate = "11-12-2023",
  onClickCheck = {},
  isChecked = true,
  onClickCard = {},
  slotStatus,
  slotPriority,
  slotAssignee,
  slotIssue,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-474")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "inbox-list-sl-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tli-column", "id")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "checkbox-block")}
            tag="div"
            {...onClickCheck}
          >
            {isChecked ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "add-icon")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%209.08579L10.2929%205.79289C10.6834%205.40237%2011.3166%205.40237%2011.7071%205.79289C12.0976%206.18342%2012.0976%206.81658%2011.7071%207.20711L7.70711%2011.2071C7.31658%2011.5976%206.68342%2011.5976%206.29289%2011.2071L4.29289%209.20711C3.90237%208.81658%203.90237%208.18342%204.29289%207.79289C4.68342%207.40237%205.31658%207.40237%205.70711%207.79289L7%209.08579Z%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%221.5%22%20y%3D%222%22%20width%3D%2213%22%20height%3D%2213%22%20rx%3D%223.5%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-color-black")}
            tag="div"
          >
            {textTicketsId}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tli-column", "issue", "vertical")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-color-black")}
            tag="div"
          >
            {textIssues}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotIssue}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tli-column", "priority")}
          tag="div"
        >
          {slotPriority ?? <Priority />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tli-column", "assignee")}
          tag="div"
        >
          {slotAssignee ?? <Assignee />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tli-column", "name")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "il-candidate-name")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "il-candidate-image")}
              tag="div"
            >
              {slotCandidateImage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textCandidateName}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tli-column", "job-info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "il-job-info")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textJobRole}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "fw-semibold",
                "text-grey-600"
              )}
              tag="div"
            >
              {textCompanyLocations}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tli-column", "status")}
          tag="div"
        >
          {slotStatus ?? <StatusPill />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tli-column", "date")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-color-black")}
            tag="div"
          >
            {textDate}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
