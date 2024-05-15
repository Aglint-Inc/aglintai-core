import React from "react";
import * as _Builtin from "./_Builtin";
import { SidebarBlockPending } from "./SidebarBlockPending";
import { SidebarBlockNotScheduled } from "./SidebarBlockNotScheduled";
import { SidebarBlockConfirmed } from "./SidebarBlockConfirmed";
import * as _utils from "./utils";
import _styles from "./CandidateDetailSidebar.module.css";

export function CandidateDetailSidebar({
  as: _Component = _Builtin.Block,
  slotSidebarContent,
  textCandidateName,
  slotAvatar,
  onClickLeft = {},
  onClickRight = {},
  onClickClose = {},
  textScheduleName = "Phase 1: Interview for software engineer",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidate_detail_sidebar")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_detail_topbar")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_candidate_avatar")}
            tag="div"
          >
            {slotAvatar}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textCandidateName ?? "candidate name"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "table_operations",
            "sidebar_operations"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sidebar_arrow")}
            tag="div"
            {...onClickLeft}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex", "rotate_180")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3086%208.09141C12.4961%208.29766%2012.4961%208.50391%2012.3086%208.71016L6.90859%2014.1102C6.70234%2014.2977%206.49609%2014.2977%206.28984%2014.1102C6.10234%2013.9039%206.10234%2013.6977%206.28984%2013.4914L11.3523%208.40078L6.28984%203.31016C6.10234%203.10391%206.10234%202.89766%206.28984%202.69141C6.49609%202.50391%206.70234%202.50391%206.90859%202.69141L12.3086%208.09141Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sidebar_arrow")}
            tag="div"
            {...onClickRight}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3086%208.09141C12.4961%208.29766%2012.4961%208.50391%2012.3086%208.71016L6.90859%2014.1102C6.70234%2014.2977%206.49609%2014.2977%206.28984%2014.1102C6.10234%2013.9039%206.10234%2013.6977%206.28984%2013.4914L11.3523%208.40078L6.28984%203.31016C6.10234%203.10391%206.10234%202.89766%206.28984%202.69141C6.49609%202.50391%206.70234%202.50391%206.90859%202.69141L12.3086%208.09141Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sidebar_arrow")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewBox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.9406%2015.5609L11.2%2011.8484L7.4875%2015.5609C7.2625%2015.7297%207.04688%2015.7297%206.84063%2015.5609C6.67188%2015.3547%206.67188%2015.1484%206.84063%2014.9422L10.5531%2011.2016L6.84063%207.48906C6.67188%207.26406%206.67188%207.04844%206.84063%206.84219C7.04688%206.67344%207.2625%206.67344%207.4875%206.84219L11.2%2010.5547L14.9406%206.84219C15.1469%206.67344%2015.3531%206.67344%2015.5594%206.84219C15.7281%207.04844%2015.7281%207.26406%2015.5594%207.48906L11.8469%2011.2016L15.5594%2014.9422C15.7281%2015.1484%2015.7281%2015.3547%2015.5594%2015.5609C15.3531%2015.7297%2015.1469%2015.7297%2014.9406%2015.5609Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_body_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_interview_detail")}
          tag="div"
        >
          {slotSidebarContent ?? (
            <>
              <SidebarBlockPending />
              <SidebarBlockNotScheduled />
              <SidebarBlockConfirmed />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22CandidateDetailSidebar__candidate_body_wrap__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%20160px)%3B%0Aoverflow%3A%20auto%3B%0A%7D%0A%0A.candidate_body_wrap%7B%0Aheight%3A%20calc(100vh%20-%20160px)%3B%0Aoverflow%3A%20auto%3B%0A%7D%0A.candidate_interview_detail%7B%0Aheight%3A%20max-content%3B%0A%7D%0A%0A%5Bclass*%3D%22CandidateDetailSidebar__candidate_interview_detail__%22%5D%7B%0Aheight%3A%20max-content%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
