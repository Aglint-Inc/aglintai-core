import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { NewTaskDropdown } from "./NewTaskDropdown";
import { NewChatButton } from "./NewChatButton";
import { AgentTask } from "./AgentTask";
import { InlineEditField } from "./InlineEditField";
import { NewChat } from "./NewChat";
import { SuggetionPill } from "./SuggetionPill";
import { TimelineBlock } from "./TimelineBlock";
import * as _utils from "./utils";
import _styles from "./AgentLayout.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-3":{"id":"e-3","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-5","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1bfee448-ace5-e9e2-32c7-caccaa5cb485","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1bfee448-ace5-e9e2-32c7-caccaa5cb485","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709100603611},"e-4":{"id":"e-4","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-6","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-3"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1bfee448-ace5-e9e2-32c7-caccaa5cb485","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1bfee448-ace5-e9e2-32c7-caccaa5cb485","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709100603612}},"actionLists":{"a-5":{"id":"a-5","title":"MoreMenu [Hover In]","actionItemGroups":[{"actionItems":[{"id":"a-5-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}},{"id":"a-5-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-5-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"flex"}}]},{"actionItems":[{"id":"a-5-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709100608565},"a-6":{"id":"a-6","title":"MoreMenu [Hover In] 2","actionItemGroups":[{"actionItems":[{"id":"a-6-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-6-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-menu-copy","selectorGuids":["ebb3f572-8d52-43db-13bc-56dcdad40aaa"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709100608565}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AgentLayout({
  as: _Component = _Builtin.Block,
  slotAgentTask,
  textCurrentTaskName = "Untitled Task",
  onClickTaskActivity = {},
  slotChat,
  slotTimelineBlock,
  isSearch = true,
  slotSearchInput,
  onClickSend = {},
  isActivity = false,
  slotSuggetionPills,
  isSuggetionPills = true,
  slotNewChatButton,
  onClickEdit = {},
  isEditTaskName = false,
  slotInlineEditField,
  onClickDeleteChat = {},
  isEditIcon = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "aglint_chatbot_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "task_list")} tag="div">
        <_Builtin.Block tag="div">
          {slotNewChatButton ?? (
            <>
              <NewTaskDropdown />
              <NewChatButton />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_task_list", "drop_op")}
          tag="div"
        >
          {slotAgentTask ?? (
            <>
              <AgentTask isActive={true} />
              <AgentTask />
              <AgentTask />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "drop_op")} tag="div" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_detail_panel")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "task_details")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "task_top_bar")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "task_name")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "capitalize")}
                tag="div"
              >
                {textCurrentTaskName}
              </_Builtin.Block>
              {isEditIcon ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons", "cursor-pointer")}
                  value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewBox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.8359%201.38281C10.5703%201.16406%2010.3047%201.16406%2010.0391%201.38281L9.35938%202.0625L10.4375%203.14062L11.1172%202.46094C11.3359%202.19531%2011.3359%201.92969%2011.1172%201.66406L10.8359%201.38281ZM5.42188%206C5.34375%206.07812%205.29688%206.16406%205.28125%206.25781L4.88281%207.61719L6.24219%207.21875C6.33594%207.20312%206.42188%207.15625%206.5%207.07812L9.64062%203.9375L8.5625%202.85938L5.42188%206ZM9.24219%200.585938C9.58594%200.257812%209.98438%200.09375%2010.4375%200.09375C10.8906%200.09375%2011.2891%200.257812%2011.6328%200.585938L11.9141%200.867188C12.2422%201.21094%2012.4062%201.60938%2012.4062%202.0625C12.4062%202.51562%2012.2422%202.91406%2011.9141%203.25781L7.29688%207.875C7.09375%208.07812%206.85156%208.21875%206.57031%208.29688L4.22656%208.97656C4.00781%209.02344%203.82031%208.97656%203.66406%208.83594C3.50781%208.67969%203.46094%208.49219%203.52344%208.27344L4.20312%205.92969C4.28125%205.66406%204.42188%205.42188%204.625%205.20312L9.24219%200.585938ZM2.5625%201.5H5.1875C5.53125%201.53125%205.71875%201.71875%205.75%202.0625C5.71875%202.40625%205.53125%202.59375%205.1875%202.625H2.5625C2.29688%202.625%202.07812%202.71875%201.90625%202.90625C1.71875%203.07812%201.625%203.29688%201.625%203.5625V9.9375C1.625%2010.2031%201.71875%2010.4219%201.90625%2010.5938C2.07812%2010.7812%202.29688%2010.875%202.5625%2010.875H8.9375C9.20312%2010.875%209.42188%2010.7812%209.59375%2010.5938C9.78125%2010.4219%209.875%2010.2031%209.875%209.9375V7.3125C9.90625%206.96875%2010.0938%206.78125%2010.4375%206.75C10.7812%206.78125%2010.9688%206.96875%2011%207.3125V9.9375C10.9844%2010.5156%2010.7812%2011%2010.3906%2011.3906C10%2011.7812%209.51562%2011.9844%208.9375%2012H2.5625C1.98438%2011.9844%201.5%2011.7812%201.10938%2011.3906C0.71875%2011%200.515625%2010.5156%200.5%209.9375V3.5625C0.515625%202.98437%200.71875%202.5%201.10938%202.10938C1.5%201.71875%201.98438%201.51563%202.5625%201.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  {...onClickEdit}
                />
              ) : null}
              {isEditTaskName ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "inputfield_absolute")}
                  tag="div"
                >
                  {slotInlineEditField ?? <InlineEditField />}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "agent_top_right")}
              tag="div"
            >
              {isActivity ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "task_list_switch", "hide")}
                  tag="div"
                  {...onClickTaskActivity}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.0625%202.89062C5.29688%203.14063%205.3125%203.40625%205.10938%203.6875L3.42188%205.5625C3.3125%205.6875%203.17969%205.75%203.02344%205.75C2.85156%205.75%202.71094%205.69531%202.60156%205.58594L1.66406%204.64844C1.44531%204.38281%201.44531%204.11719%201.66406%203.85156C1.92969%203.63281%202.19531%203.63281%202.46094%203.85156L2.97656%204.36719L4.26562%202.9375C4.51562%202.70312%204.78125%202.6875%205.0625%202.89062ZM5.0625%206.64062C5.29688%206.89062%205.3125%207.15625%205.10938%207.4375L3.42188%209.3125C3.3125%209.4375%203.17969%209.5%203.02344%209.5C2.85156%209.5%202.71094%209.44531%202.60156%209.33594L1.66406%208.39844C1.44531%208.13281%201.44531%207.86719%201.66406%207.60156C1.92969%207.38281%202.19531%207.38281%202.46094%207.60156L2.97656%208.11719L4.26562%206.6875C4.51562%206.45312%204.78125%206.4375%205.0625%206.64062ZM6.75%204.25C6.75%204.03125%206.82031%203.85156%206.96094%203.71094C7.10156%203.57031%207.28125%203.5%207.5%203.5H12.75C12.9688%203.5%2013.1484%203.57031%2013.2891%203.71094C13.4297%203.85156%2013.5%204.03125%2013.5%204.25C13.5%204.46875%2013.4297%204.64844%2013.2891%204.78906C13.1484%204.92969%2012.9688%205%2012.75%205H7.5C7.28125%205%207.10156%204.92969%206.96094%204.78906C6.82031%204.64844%206.75%204.46875%206.75%204.25ZM6.75%208C6.75%207.78125%206.82031%207.60156%206.96094%207.46094C7.10156%207.32031%207.28125%207.25%207.5%207.25H12.75C12.9688%207.25%2013.1484%207.32031%2013.2891%207.46094C13.4297%207.60156%2013.5%207.78125%2013.5%208C13.5%208.21875%2013.4297%208.39844%2013.2891%208.53906C13.1484%208.67969%2012.9688%208.75%2012.75%208.75H7.5C7.28125%208.75%207.10156%208.67969%206.96094%208.53906C6.82031%208.39844%206.75%208.21875%206.75%208ZM5.25%2011.75C5.25%2011.5312%205.32031%2011.3516%205.46094%2011.2109C5.60156%2011.0703%205.78125%2011%206%2011H12.75C12.9688%2011%2013.1484%2011.0703%2013.2891%2011.2109C13.4297%2011.3516%2013.5%2011.5312%2013.5%2011.75C13.5%2011.9688%2013.4297%2012.1484%2013.2891%2012.2891C13.1484%2012.4297%2012.9688%2012.5%2012.75%2012.5H6C5.78125%2012.5%205.60156%2012.4297%205.46094%2012.2891C5.32031%2012.1484%205.25%2011.9688%205.25%2011.75ZM2.625%2010.625C3.04688%2010.6406%203.375%2010.8281%203.60938%2011.1875C3.79688%2011.5625%203.79688%2011.9375%203.60938%2012.3125C3.375%2012.6719%203.04688%2012.8594%202.625%2012.875C2.20312%2012.8594%201.875%2012.6719%201.64062%2012.3125C1.45312%2011.9375%201.45312%2011.5625%201.64062%2011.1875C1.875%2010.8281%202.20312%2010.6406%202.625%2010.625Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{"Activity"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isEditIcon ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "more_settings")}
                  data-w-id="1bfee448-ace5-e9e2-32c7-caccaa5cb485"
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex-2")}
                    value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%2015.5C12.5625%2015.5208%2013%2015.7708%2013.3125%2016.25C13.5625%2016.75%2013.5625%2017.25%2013.3125%2017.75C13%2018.2292%2012.5625%2018.4792%2012%2018.5C11.4375%2018.4792%2011%2018.2292%2010.6875%2017.75C10.4375%2017.25%2010.4375%2016.75%2010.6875%2016.25C11%2015.7708%2011.4375%2015.5208%2012%2015.5ZM12%2010.5C12.5625%2010.5208%2013%2010.7708%2013.3125%2011.25C13.5625%2011.75%2013.5625%2012.25%2013.3125%2012.75C13%2013.2292%2012.5625%2013.4792%2012%2013.5C11.4375%2013.4792%2011%2013.2292%2010.6875%2012.75C10.4375%2012.25%2010.4375%2011.75%2010.6875%2011.25C11%2010.7708%2011.4375%2010.5208%2012%2010.5ZM13.5%207C13.4792%207.5625%2013.2292%208%2012.75%208.3125C12.25%208.5625%2011.75%208.5625%2011.25%208.3125C10.7708%208%2010.5208%207.5625%2010.5%207C10.5208%206.4375%2010.7708%206%2011.25%205.6875C11.75%205.4375%2012.25%205.4375%2012.75%205.6875C13.2292%206%2013.4792%206.4375%2013.5%207Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "more-menu-copy")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "more-menu")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "menu_drop", "hide")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "v6-icon-2")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed_flex-2")}
                            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15%2013C15.2917%2013%2015.5312%2012.9062%2015.7188%2012.7188C15.9062%2012.5312%2016%2012.2917%2016%2012V5.625C16%205.47917%2015.9479%205.36458%2015.8438%205.28125L13.7188%203.15625C13.6354%203.05208%2013.5208%203%2013.375%203H10C9.70833%203%209.46875%203.09375%209.28125%203.28125C9.09375%203.46875%209%203.70833%209%204V12C9%2012.2917%209.09375%2012.5312%209.28125%2012.7188C9.46875%2012.9062%209.70833%2013%2010%2013H15ZM16.5625%204.5625C16.8542%204.85417%2017%205.20833%2017%205.625V12C16.9792%2012.5625%2016.7812%2013.0312%2016.4062%2013.4062C16.0312%2013.7812%2015.5625%2013.9792%2015%2014H10C9.4375%2013.9792%208.96875%2013.7812%208.59375%2013.4062C8.21875%2013.0312%208.02083%2012.5625%208%2012V4C8.02083%203.4375%208.21875%202.96875%208.59375%202.59375C8.96875%202.21875%209.4375%202.02083%2010%202H13.375C13.7917%202%2014.1458%202.14583%2014.4375%202.4375L16.5625%204.5625ZM5%206H7V7H5C4.70833%207%204.46875%207.09375%204.28125%207.28125C4.09375%207.46875%204%207.70833%204%208V16C4%2016.2917%204.09375%2016.5312%204.28125%2016.7188C4.46875%2016.9062%204.70833%2017%205%2017H10C10.2917%2017%2010.5312%2016.9062%2010.7188%2016.7188C10.9062%2016.5312%2011%2016.2917%2011%2016V15H12V16C11.9792%2016.5625%2011.7812%2017.0312%2011.4062%2017.4062C11.0312%2017.7812%2010.5625%2017.9792%2010%2018H5C4.4375%2017.9792%203.96875%2017.7812%203.59375%2017.4062C3.21875%2017.0312%203.02083%2016.5625%203%2016V8C3.02083%207.4375%203.21875%206.96875%203.59375%206.59375C3.96875%206.21875%204.4375%206.02083%205%206Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text")}
                          tag="div"
                        >
                          {"Duplicate"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "", "menu_drop")}
                        tag="div"
                        {...onClickDeleteChat}
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "", "v6-icon-2")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed_flex-2")}
                            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5625%203C8.375%203%208.22917%203.08333%208.125%203.25L7.65625%204H12.3438L11.875%203.25C11.7708%203.08333%2011.625%203%2011.4375%203H8.5625ZM13.5312%204H15H16H16.5C16.8125%204.02083%2016.9792%204.1875%2017%204.5C16.9792%204.8125%2016.8125%204.97917%2016.5%205H15.9375L15.125%2016.1562C15.0833%2016.6771%2014.875%2017.1146%2014.5%2017.4688C14.125%2017.8021%2013.6667%2017.9792%2013.125%2018H6.875C6.33333%2017.9792%205.875%2017.8021%205.5%2017.4688C5.125%2017.1146%204.91667%2016.6771%204.875%2016.1562L4.0625%205H3.5C3.1875%204.97917%203.02083%204.8125%203%204.5C3.02083%204.1875%203.1875%204.02083%203.5%204H4H5H6.46875L7.28125%202.71875C7.59375%202.26042%208.02083%202.02083%208.5625%202H11.4375C11.9792%202.02083%2012.4062%202.26042%2012.7188%202.71875L13.5312%204ZM14.9375%205H5.0625L5.875%2016.0625C5.89583%2016.3333%206%2016.5521%206.1875%2016.7188C6.375%2016.9062%206.60417%2017%206.875%2017H13.125C13.3958%2017%2013.625%2016.9062%2013.8125%2016.7188C14%2016.5521%2014.1042%2016.3333%2014.125%2016.0625L14.9375%205Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-2")}
                          tag="div"
                        >
                          {"Delete"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_chat_body")}
            tag="div"
            id="chat_scroll"
          >
            {slotChat ?? <NewChat />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_search_box")}
            tag="div"
          >
            {isSuggetionPills ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_suggetion_pills")}
                tag="div"
              >
                {slotSuggetionPills ?? (
                  <>
                    <SuggetionPill textSuggetion="Specific areas of expertise or technical skills that seem" />
                    <SuggetionPill textSuggetion="Specific areas of expertise or technical skills that seem" />
                    <SuggetionPill textSuggetion="Specific areas of" />
                    <SuggetionPill textSuggetion="Specific areas of" />
                  </>
                )}
              </_Builtin.Block>
            ) : null}
            {isSearch ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "task_search_box-copy")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "chat_search")}
                  tag="div"
                >
                  {slotSearchInput}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "chat_send_button")}
                  tag="div"
                  {...onClickSend}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2225%22%20height%3D%2225%22%20viewBox%3D%220%200%2025%2025%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13.3984%204.10156L19.6484%2010.3516C19.8828%2010.612%2020%2010.9115%2020%2011.25C20%2011.5885%2019.8828%2011.888%2019.6484%2012.1484C19.388%2012.3828%2019.0885%2012.5%2018.75%2012.5C18.4115%2012.5%2018.112%2012.3828%2017.8516%2012.1484L13.75%208.00781V20C13.75%2020.3646%2013.6328%2020.6641%2013.3984%2020.8984C13.1641%2021.1328%2012.8646%2021.25%2012.5%2021.25C12.1354%2021.25%2011.8359%2021.1328%2011.6016%2020.8984C11.3672%2020.6641%2011.25%2020.3646%2011.25%2020V8.00781L7.14844%2012.1484C6.88802%2012.3828%206.58854%2012.5%206.25%2012.5C5.91146%2012.5%205.61198%2012.3828%205.35156%2012.1484C5.11719%2011.888%205%2011.5885%205%2011.25C5%2010.9115%205.11719%2010.612%205.35156%2010.3516L11.6016%204.10156C11.862%203.86719%2012.1615%203.75%2012.5%203.75C12.8385%203.75%2013.138%203.86719%2013.3984%204.10156Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_overlay_block")}
            tag="div"
          />
        </_Builtin.Block>
        {isActivity ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "task_activity")}
            tag="div"
          >
            {slotTimelineBlock ?? <TimelineBlock />}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css_block")}
        value="%3Cstyle%3E%0A.task_chat_body%7B%0Aheight%3A%20calc(100vh%20-%2060px)%20!important%3B%0A%7D%0A.chat_send_button%7B%0Abackground%3A%20linear-gradient(222deg%2C%20%23FF6224%200%25%2C%20rgba(255%2C%2098%2C%2036%2C%200.51)%20119.46%25)%3B%0A%7D%0A%0A%5Bclass*%3D%22AgentLayout_chat_send_button__%22%5D%7B%0Abackground%3A%20linear-gradient(222deg%2C%20%23FF6224%200%25%2C%20rgba(255%2C%2098%2C%2036%2C%200.51)%20119.46%25)%3B%0A%7D%0A%5Bclass*%3D%22AgentLayout_task_chat_body__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%2060px)%20!important%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
