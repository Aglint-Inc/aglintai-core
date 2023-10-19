import React from "react";
import * as _Builtin from "./_Builtin";
import { InboxTickets } from "./InboxTickets";
import * as _utils from "./utils";
import _styles from "./AllTickets.module.css";

export function AllTickets({
  as: _Component = _Builtin.Block,
  slotTicketList,
  slotSearch,
  onClickAllTicketCheck = {},
  isAllTicketChecked = true,
  onClickPriority = {},
  isSortPriorityArrowVisible = true,
  onClickSortAssignee = {},
  isSortAssigneeArrowVisible = true,
  onClickSortCandidateName = {},
  isSortCandidateArrowVisible = true,
  onClickSortJobInfo = {},
  isSortJobArrowVisible = true,
  onClickSortStatus = {},
  isSortStatusVisible = true,
  onClickSortLastUpdate = {},
  isSortUpdateArrowVisible = true,
  textHeaderStatus = "All",
}) {
  return (
    <_Component className={_utils.cx(_styles, "inbox-main-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "inbox-header-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-513")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-lg",
              "fw-semibold",
              "text-color-black"
            )}
            tag="div"
          >
            {"Tickets -"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-lg",
              "fw-semibold",
              "text-color-black"
            )}
            tag="div"
          >
            {textHeaderStatus}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotSearch}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "inbox-list")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "il-list-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-475")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "inbox-list-sl-block", "top-bar")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "tli-column", "id")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "checkbox-block")}
                  tag="div"
                  {...onClickAllTicketCheck}
                >
                  {isAllTicketChecked ? (
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "add-icon")}
                      value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%209.08579L10.2929%205.79289C10.6834%205.40237%2011.3166%205.40237%2011.7071%205.79289C12.0976%206.18342%2012.0976%206.81658%2011.7071%207.20711L7.70711%2011.2071C7.31658%2011.5976%206.68342%2011.5976%206.29289%2011.2071L4.29289%209.20711C3.90237%208.81658%203.90237%208.18342%204.29289%207.79289C4.68342%207.40237%205.31658%207.40237%205.70711%207.79289L7%209.08579Z%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%221.5%22%20y%3D%222%22%20width%3D%2213%22%20height%3D%2213%22%20rx%3D%223.5%22%20stroke%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-color-black")}
                  tag="div"
                >
                  {"Ticket ID"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tli-column", "issue")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-color-black")}
                  tag="div"
                >
                  {"Issue"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tli-column", "priority")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sort-prio")}
                  tag="div"
                  {...onClickPriority}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-color-black")}
                    tag="div"
                  >
                    {"Priority"}
                  </_Builtin.Block>
                  {isSortPriorityArrowVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-477")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons", "rotate-180")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tli-column", "assignee")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sort-prio")}
                  tag="div"
                  {...onClickSortAssignee}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-color-black")}
                    tag="div"
                  >
                    {"Assignee"}
                  </_Builtin.Block>
                  {isSortAssigneeArrowVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-477")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons", "rotate-180")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tli-column", "name")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sort-prio")}
                  tag="div"
                  {...onClickSortCandidateName}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-color-black")}
                    tag="div"
                  >
                    {"Candidate Name"}
                  </_Builtin.Block>
                  {isSortCandidateArrowVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-477")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons", "rotate-180")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tli-column", "job-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sort-prio")}
                  tag="div"
                  {...onClickSortJobInfo}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-color-black")}
                    tag="div"
                  >
                    {"Job Info"}
                  </_Builtin.Block>
                  {isSortJobArrowVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-477")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons", "rotate-180")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tli-column", "status")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sort-prio")}
                  tag="div"
                  {...onClickSortStatus}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-color-black")}
                    tag="div"
                  >
                    {"Status"}
                  </_Builtin.Block>
                  {isSortStatusVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-477")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons", "rotate-180")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tli-column", "date")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sort-prio")}
                  tag="div"
                  {...onClickSortLastUpdate}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-color-black")}
                    tag="div"
                  >
                    {"Last Updated"}
                  </_Builtin.Block>
                  {isSortUpdateArrowVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-477")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons", "rotate-180")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3536%208.35355C10.18%208.52712%209.91056%208.5464%209.71569%208.41141L9.64645%208.35355L6%204.707L2.35355%208.35355C2.17999%208.52712%201.91056%208.5464%201.71569%208.41141L1.64645%208.35355C1.47288%208.17999%201.4536%207.91056%201.58859%207.71569L1.64645%207.64645L5.64645%203.64645C5.82001%203.47288%206.08944%203.4536%206.28431%203.58859L6.35355%203.64645L10.3536%207.64645C10.5488%207.84171%2010.5488%208.15829%2010.3536%208.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "il-list-block")}
            tag="div"
          >
            {slotTicketList ?? <InboxTickets />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22AllTickets_il-list-wrapper__%22%5D%7B%0Aoverflow-y%3Ahidden%3B%0A%0A%7D%0A%0A%5Bclass*%3D%22AllTickets_il-list-block__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%20100px)%3B%0A%0A%7D%0A%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
