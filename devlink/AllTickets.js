import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { InboxTickets } from "./InboxTickets";
import * as _utils from "./utils";
import _styles from "./AllTickets.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1474":{"id":"e-1474","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-538","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1475"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206216610},"e-1476":{"id":"e-1476","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-539","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1477"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206230806}},"actionLists":{"a-538":{"id":"a-538","title":"Chat Bubble Open","actionItemGroups":[{"actionItems":[{"id":"a-538-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}},{"id":"a-538-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-538-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-538-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-538-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-538-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-538-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":0,"unit":""}},{"id":"a-538-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":0.9,"yValue":0.9,"locked":true}},{"id":"a-538-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"block"}},{"id":"a-538-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":1,"unit":""}},{"id":"a-538-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"none"}},{"id":"a-538-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":1,"unit":""}},{"id":"a-538-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700132612161},"a-539":{"id":"a-539","title":"Chat Bubble Close","actionItemGroups":[{"actionItems":[{"id":"a-539-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}},{"id":"a-539-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":1,"yValue":1,"locked":true}},{"id":"a-539-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-539-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-539-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-539-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-539-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-539-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700132612161}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

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
  _interactions.useInteractions(_interactionsData, _styles);

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
                      value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%209.08579L10.2929%205.79289C10.6834%205.40237%2011.3166%205.40237%2011.7071%205.79289C12.0976%206.18342%2012.0976%206.81658%2011.7071%207.20711L7.70711%2011.2071C7.31658%2011.5976%206.68342%2011.5976%206.29289%2011.2071L4.29289%209.20711C3.90237%208.81658%203.90237%208.18342%204.29289%207.79289C4.68342%207.40237%205.31658%207.40237%205.70711%207.79289L7%209.08579Z%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%221.5%22%20y%3D%222%22%20width%3D%2213%22%20height%3D%2213%22%20rx%3D%223.5%22%20stroke%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
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
        value="%3Cstyle%3E%0A%0A%0A%5Bclass*%3D%22AllTickets_il-list-block__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%20100px)%3B%0A%0A%7D%0A%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
