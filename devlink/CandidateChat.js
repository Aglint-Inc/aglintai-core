import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateChat.module.css";

export function CandidateChat({
  as: _Component = _Builtin.Block,
  slotCompanyLogo,
  textRole = "This is some text inside of a div block.",
  textCompany = "This is some text inside of a div block.",
  textStatus = "Open",
  bgColorPropsStatus = {},
  textTicketId = "Ticket ID #823u98",
  slotChatInbox,
  slotTypeMessage,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidate-chat-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-chat")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate-chat-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "candidate-chat-left-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-company-logo-chat")}
              tag="div"
            >
              {slotCompanyLogo}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-447")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "color-white")}
                tag="div"
              >
                {textRole}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-sm",
                  "fw-semibold",
                  "color-white"
                )}
                tag="div"
              >
                {textCompany}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-448")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-info-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-500")}
                tag="div"
              >
                {"Ticket ID"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "color-white")}
                tag="div"
              >
                {textTicketId}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-info-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-500")}
                tag="div"
              >
                {"Status"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-status-block")}
                tag="div"
                {...bgColorPropsStatus}
              >
                {textStatus}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat-inbox-bubble")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "chat-inbox-wrappers")}
            tag="div"
          >
            {slotChatInbox}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-type-messages")}
            tag="div"
          >
            {slotTypeMessage}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
