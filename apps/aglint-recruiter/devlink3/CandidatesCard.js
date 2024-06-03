"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidatesCard.module.css";

export function CandidatesCard({
  as: _Component = _Builtin.Block,
  isLinks = true,
  onClickResendInvite = {},
  onClickCopyInvite = {},
  textName = "Tom Odel",
  textRole = "Senior software Engineer",
  textMail = "tomode3243@gmaIl.com",
  slotImage,
}) {
  return (
    <_Component className={_utils.cx(_styles, "candidate_card_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "candidatecard", "candi")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_candidate_image", "candi")}
          tag="div"
        >
          {slotImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "schedule_details-copy")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textName}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isLinks ? (
        <_Builtin.Block className={_utils.cx(_styles, "share_links")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "feedback-link-wrap")}
            tag="div"
            {...onClickResendInvite}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.5%203.60156C1.26562%203.61719%201.14062%203.74219%201.125%203.97656V4.49219L5.17969%207.82031C5.42969%208.00781%205.70312%208.10156%206%208.10156C6.3125%208.10156%206.59375%208.00781%206.84375%207.82031L10.875%204.49219V3.97656C10.8594%203.74219%2010.7344%203.61719%2010.5%203.60156H1.5ZM1.125%205.94531V9.97656C1.14062%2010.2109%201.26562%2010.3359%201.5%2010.3516H10.5C10.7344%2010.3359%2010.8594%2010.2109%2010.875%209.97656V5.94531L7.54688%208.6875C7.07812%209.04688%206.5625%209.22656%206%209.22656C5.4375%209.22656%204.92188%209.04688%204.45312%208.6875L1.125%205.94531ZM0%203.97656C0.015625%203.55469%200.164062%203.20312%200.445312%202.92188C0.726562%202.64062%201.07812%202.49219%201.5%202.47656H10.5C10.9219%202.49219%2011.2734%202.64062%2011.5547%202.92188C11.8359%203.20312%2011.9844%203.55469%2012%203.97656V9.97656C11.9844%2010.3984%2011.8359%2010.75%2011.5547%2011.0312C11.2734%2011.3125%2010.9219%2011.4609%2010.5%2011.4766H1.5C1.07812%2011.4609%200.726562%2011.3125%200.445312%2011.0312C0.164062%2010.75%200.015625%2010.3984%200%209.97656V3.97656Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">
              {"Resend Invite to candidate"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "feedback-link-wrap")}
            tag="div"
            {...onClickCopyInvite}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%208.85156C9.98438%208.83594%2010.1094%208.71094%2010.125%208.47656V3.69531L8.53125%202.10156H5.25C5.01562%202.11719%204.89062%202.24219%204.875%202.47656V8.47656C4.89062%208.71094%205.01562%208.83594%205.25%208.85156H9.75ZM5.25%209.97656C4.82812%209.96094%204.47656%209.8125%204.19531%209.53125C3.91406%209.25%203.76562%208.89844%203.75%208.47656V2.47656C3.76562%202.05469%203.91406%201.70312%204.19531%201.42188C4.47656%201.14062%204.82812%200.992188%205.25%200.976562H8.53125C8.84375%200.976562%209.10938%201.08594%209.32812%201.30469L10.9219%202.89844C11.1406%203.11719%2011.25%203.38281%2011.25%203.69531V8.47656C11.2344%208.89844%2011.0859%209.25%2010.8047%209.53125C10.5234%209.8125%2010.1719%209.96094%209.75%209.97656H5.25ZM2.25%203.97656H3V5.10156H2.25C2.01562%205.11719%201.89062%205.24219%201.875%205.47656V11.4766C1.89062%2011.7109%202.01562%2011.8359%202.25%2011.8516H6.75C6.98438%2011.8359%207.10938%2011.7109%207.125%2011.4766V10.7266H8.25V11.4766C8.23438%2011.8984%208.08594%2012.25%207.80469%2012.5312C7.52344%2012.8125%207.17188%2012.9609%206.75%2012.9766H2.25C1.82812%2012.9609%201.47656%2012.8125%201.19531%2012.5312C0.914062%2012.25%200.765625%2011.8984%200.75%2011.4766V5.47656C0.765625%205.05469%200.914062%204.70312%201.19531%204.42188C1.47656%204.14062%201.82812%203.99219%202.25%203.97656Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Copy Invite Link"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
