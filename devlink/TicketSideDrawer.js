import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { TicketChatBubble } from "./TicketChatBubble";
import { TicketMessageSuggestion } from "./TicketMessageSuggestion";
import { PrioritySmall } from "./PrioritySmall";
import { AssigneeSmall } from "./AssigneeSmall";
import { StatusPillSmall } from "./StatusPillSmall";
import * as _utils from "./utils";
import _styles from "./TicketSideDrawer.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1348":{"id":"e-1348","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-469","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1349"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dc3bee88-5415-402f-888b-22866a4b23fd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"dc3bee88-5415-402f-888b-22866a4b23fd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697451293249},"e-1349":{"id":"e-1349","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-470","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1348"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dc3bee88-5415-402f-888b-22866a4b23fd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"dc3bee88-5415-402f-888b-22866a4b23fd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697451293252},"e-1350":{"id":"e-1350","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-469","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1351"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"420e28e0-89ba-8764-3ae6-a727881c7453","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"420e28e0-89ba-8764-3ae6-a727881c7453","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697451618328},"e-1351":{"id":"e-1351","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-470","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1350"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"420e28e0-89ba-8764-3ae6-a727881c7453","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"420e28e0-89ba-8764-3ae6-a727881c7453","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697451618332}},"actionLists":{"a-469":{"id":"a-469","title":"Tool Tips Hover Arrow Tickets In","actionItemGroups":[{"actionItems":[{"id":"a-469-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips","selectorGuids":["a5e97eb6-5aeb-bfd2-c374-bc898e1a59d2"]},"value":0,"unit":""}},{"id":"a-469-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips","selectorGuids":["a5e97eb6-5aeb-bfd2-c374-bc898e1a59d2"]},"value":"none"}}]},{"actionItems":[{"id":"a-469-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips","selectorGuids":["a5e97eb6-5aeb-bfd2-c374-bc898e1a59d2"]},"value":1,"unit":""}},{"id":"a-469-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips","selectorGuids":["a5e97eb6-5aeb-bfd2-c374-bc898e1a59d2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697451298718},"a-470":{"id":"a-470","title":"Tool Tips Hover Arrow Tickets out","actionItemGroups":[{"actionItems":[{"id":"a-470-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips","selectorGuids":["a5e97eb6-5aeb-bfd2-c374-bc898e1a59d2"]},"value":0,"unit":""}},{"id":"a-470-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips","selectorGuids":["a5e97eb6-5aeb-bfd2-c374-bc898e1a59d2"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697451298718}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TicketSideDrawer({
  as: _Component = _Builtin.Block,
  textIssuesTitle = "#8293 - Issue title will be here.",
  slotChatBox,
  slotTypeMessage,
  slotMessageSuggestion,
  textTicketId = "9849238",
  textCreatedDate = "11-12-2025",
  slotCandidateImage,
  textCandidateName = "Maria Johnson",
  textCandidateMail = "nathan.roberts@example.com",
  textCandiatePhone = "(303) 555-0105",
  textCandidateSite = "janecooper.com",
  onClickClose = {},
  textAppliedJobRole = "Software Developer",
  textAppliedJobCompany = "Microsoft, California, United States",
  textAppliedJobPostedDate = "Posted 3 days ago",
  onClickAppliedViewJob = {},
  textCandidateStatus = "Incomplete Interview",
  colorPropsCandidateStatus = {},
  onClickInterviewLink = {},
  slotStatus,
  slotAssignee,
  slotPriority,
  onClickPrev = {},
  onClickNext = {},
  slotStatusHeading,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "inbox-details-wrapper-2")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "inde-header-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-478")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {textIssuesTitle}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotStatusHeading}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "close-slide-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-476")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow-wrapeprs")}
              data-w-id="420e28e0-89ba-8764-3ae6-a727881c7453"
              tag="div"
              {...onClickNext}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%229%22%20height%3D%2215%22%20viewBox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75781%206.58594C6.83073%206.69531%206.83073%206.80469%206.75781%206.91406L0.851562%2012.8203C0.742188%2012.8932%200.632812%2012.8932%200.523438%2012.8203C0.450521%2012.7109%200.450521%2012.6016%200.523438%2012.4922L6.29297%206.75L0.523438%201.00781C0.450521%200.898438%200.450521%200.789062%200.523438%200.679688C0.632812%200.606771%200.742188%200.606771%200.851562%200.679688L6.75781%206.58594Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow-tooltips")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + →"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow-wrapeprs")}
              data-w-id="dc3bee88-5415-402f-888b-22866a4b23fd"
              tag="div"
              {...onClickPrev}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "rotate-180")}
                value="%3Csvg%20width%3D%229%22%20height%3D%2215%22%20viewBox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75781%206.58594C6.83073%206.69531%206.83073%206.80469%206.75781%206.91406L0.851562%2012.8203C0.742188%2012.8932%200.632812%2012.8932%200.523438%2012.8203C0.450521%2012.7109%200.450521%2012.6016%200.523438%2012.4922L6.29297%206.75L0.523438%201.00781C0.450521%200.898438%200.450521%200.789062%200.523438%200.679688C0.632812%200.606771%200.742188%200.606771%200.851562%200.679688L6.75781%206.58594Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow-tooltips")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + ←"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "inde-close-btn", "clickable")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2675_20884%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2675_20884)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inde-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "inde-chat-wrapper")}
          id={_utils.cx(
            _styles,
            "w-node-_3b8246a3-aa09-b40c-4a21-cd175fe7b8db-5fe7b8d4"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "inde-chat-body")}
            tag="div"
          >
            {slotChatBox ?? <TicketChatBubble />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "inde-chat-compose-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-chat-options-wrapper")}
              tag="div"
            >
              {slotMessageSuggestion ?? <TicketMessageSuggestion />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-chat-compose-block")}
              tag="div"
            >
              {slotTypeMessage}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "inde-overview-wrapper")}
          id={_utils.cx(
            _styles,
            "w-node-_3b8246a3-aa09-b40c-4a21-cd175fe7b8f1-5fe7b8d4"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "inde-details-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
              tag="div"
            >
              {"Ticket Details"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-details-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-info-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-600")}
                  tag="div"
                >
                  {"Ticket ID"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{textTicketId}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-info-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-600")}
                  tag="div"
                >
                  {"Priority Level"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {slotPriority ?? <PrioritySmall />}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-info-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-600")}
                  tag="div"
                >
                  {"Assigned to"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {slotAssignee ?? <AssigneeSmall />}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-info-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-600")}
                  tag="div"
                >
                  {"Status"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {slotStatus ?? <StatusPillSmall />}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-info-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-600")}
                  tag="div"
                >
                  {"Created at"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{textCreatedDate}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "inde-details-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
              tag="div"
            >
              {"Candidate Info"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-details-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-479")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "inde-candidate-image")}
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
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-contact-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "inde-contact-block")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11%201H0.999996C0.447713%201%200%201.44771%200%202V9.99996C0%2010.5522%200.447713%2011%200.999996%2011H11C11.5522%2011%2011.9999%2010.5522%2011.9999%209.99996V2C11.9999%201.44771%2011.5522%201%2011%201ZM0.999973%202.70708V9.29291L3.14644%207.14645C3.3417%206.95118%203.65828%206.95118%203.85354%207.14645C4.0488%207.34171%204.0488%207.65829%203.85354%207.85355L1.70736%209.99972H10.2926L8.14645%207.85355C7.95118%207.65829%207.95118%207.34171%208.14645%207.14645C8.34171%206.95118%208.65829%206.95118%208.85355%207.14645L10.9999%209.29283V2.70789L6.71497%207.00208C6.52721%207.19139%206.27161%207.29787%206.00498%207.29787C5.73834%207.29787%205.48275%207.19139%205.29643%207.00353L0.999973%202.70708ZM10.2938%201.99976H1.70686L6.00498%206.29788L10.2938%201.99976Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{textCandidateMail}</_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "inde-contact-block")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%200H9C9.55228%200%2010%200.447715%2010%201V11C10%2011.5523%209.55228%2012%209%2012H3C2.44772%2012%202%2011.5523%202%2011V1C2%200.447715%202.44772%200%203%200ZM3.00012%209V1.99988H9.00012V9H3.00012ZM7.00012%2011.0001H5.00012C4.70012%2011.0001%204.50012%2010.8001%204.50012%2010.5001C4.50012%2010.2001%204.70012%2010.0001%205.00012%2010.0001H7.00012C7.30012%2010.0001%207.50012%2010.2001%207.50012%2010.5001C7.50012%2010.8001%207.30012%2011.0001%207.00012%2011.0001Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{textCandiatePhone}</_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "inde-contact-block")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%2012C2.68629%2012%200%209.31371%200%206C0%202.68629%202.68629%200%206%200C9.31371%200%2012%202.68629%2012%206C12%209.31371%209.31371%2012%206%2012ZM10.9%207C10.9656%206.67689%2011%206.34247%2011%206C11%205.65753%2010.9656%205.32311%2010.9%205H9V7H10.9ZM1.41604%208C2.06409%209.48321%203.41091%2010.5913%205.04038%2010.908L3.22288%208H1.41604ZM6%2010.5566L7.59788%208H4.40212L6%2010.5566ZM6.95962%2010.908C8.58909%2010.5913%209.93591%209.48321%2010.584%208H8.77712L6.95962%2010.908ZM1.10002%207C1.03443%206.67689%201%206.34247%201%206C1%205.65753%201.03443%205.32311%201.10002%205H3V7H1.10002ZM4%207V5H8V7H4ZM1.41604%204C2.06409%202.51679%203.41091%201.40874%205.04038%201.092L3.22288%204H1.41604ZM6%201.4434L4.40212%204H7.59788L6%201.4434ZM8.77712%204H10.584C9.93591%202.51679%208.58909%201.40874%206.95962%201.092L8.77712%204Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2656_40722%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%2012C2.68629%2012%200%209.31371%200%206C0%202.68629%202.68629%200%206%200C9.31371%200%2012%202.68629%2012%206C12%209.31371%209.31371%2012%206%2012ZM10.9%207C10.9656%206.67689%2011%206.34247%2011%206C11%205.65753%2010.9656%205.32311%2010.9%205H9V7H10.9ZM1.41604%208C2.06409%209.48321%203.41091%2010.5913%205.04038%2010.908L3.22288%208H1.41604ZM6%2010.5566L7.59788%208H4.40212L6%2010.5566ZM6.95962%2010.908C8.58909%2010.5913%209.93591%209.48321%2010.584%208H8.77712L6.95962%2010.908ZM1.10002%207C1.03443%206.67689%201%206.34247%201%206C1%205.65753%201.03443%205.32311%201.10002%205H3V7H1.10002ZM4%207V5H8V7H4ZM1.41604%204C2.06409%202.51679%203.41091%201.40874%205.04038%201.092L3.22288%204H1.41604ZM6%201.4434L4.40212%204H7.59788L6%201.4434ZM8.77712%204H10.584C9.93591%202.51679%208.58909%201.40874%206.95962%201.092L8.77712%204Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2656_40722)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{textCandidateSite}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-candidate-status-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-400")}
                tag="div"
              >
                {"Candidate Status"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-candidate-status-text")}
                tag="div"
                {...colorPropsCandidateStatus}
              >
                {textCandidateStatus}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-int-copy-btn-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-add-skill-btn-new")}
                tag="div"
                {...onClickInterviewLink}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2743_27651%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2743_27651)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-600")}
                  tag="div"
                >
                  {"Interview Link"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "inde-details-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
              tag="div"
            >
              {"Applied Job"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "inde-details-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "inde-job-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "inde-job-info-header")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {textAppliedJobRole}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "text-grey-600"
                    )}
                    tag="div"
                  >
                    {textAppliedJobCompany}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "inde-job-bottom")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-500")}
                    tag="div"
                  >
                    {textAppliedJobPostedDate}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "inde-job-view-btn")}
                    tag="div"
                    {...onClickAppliedViewJob}
                  >
                    {"View Job"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%0A%5Bclass*%3D%22TicketSideDrawer_inde-chat-wrapper__%22%5D%7B%0A%20%20%20%20height%3A%20calc(100vh%20-%2058px)%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
