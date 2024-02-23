import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { AgentTask } from "./AgentTask";
import { NewChat } from "./NewChat";
import { SuggetionPill } from "./SuggetionPill";
import { TimelineBlock } from "./TimelineBlock";
import * as _utils from "./utils";
import _styles from "./AgentLayout.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-3":{"id":"e-3","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-4"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"55c04306-3a2d-ab39-4420-f962d24017af"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1708683900973},"e-4":{"id":"e-4","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-4","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-3"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"55c04306-3a2d-ab39-4420-f962d24017af"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1708683900973}},"actionLists":{"a-3":{"id":"a-3","title":"TaskCardHoverIN","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]}}},{"id":"a-3-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".drop_op","selectorGuids":["55a025fb-507d-e633-1b3d-02935106f68a"]},"value":1,"unit":""}},{"id":"a-3-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-3-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-3-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"flex","target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]}}}]},{"actionItems":[{"id":"a-3-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]},"value":1,"unit":""}},{"id":"a-3-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"selector":".drop_op","selectorGuids":["55a025fb-507d-e633-1b3d-02935106f68a"]},"value":0.6,"unit":""}},{"id":"a-3-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"createdOn":1708683905783,"useFirstGroupAsInitialState":true},"a-4":{"id":"a-4","title":"TaskCardHoveout","actionItemGroups":[{"actionItems":[{"id":"a-4-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".drop_op","selectorGuids":["55a025fb-507d-e633-1b3d-02935106f68a"]},"value":1,"unit":""}},{"id":"a-4-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-4-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-4-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".dropdownelement","selectorGuids":["32f9fb3e-6d4c-7fed-f2d6-b5ded4ef515d"]}}}]}],"createdOn":1708683905783,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
  onClickSchedulerAgent = {},
  onClickJobAssistant = {},
  onClickSourcingAgent = {},
  onClickScreeningAgent = {},
  slotSuggetionPills,
  isSuggetionPills = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "aglint_chatbot_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "task_list")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "task_card", "is_new_with_dropdown")}
          data-w-id="55c04306-3a2d-ab39-4420-f962d24017af"
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex", "drop_op")}
            value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.5%209.5H27.5C28.3438%209.53125%2029.0469%209.82812%2029.6094%2010.3906C30.1719%2010.9531%2030.4688%2011.6562%2030.5%2012.5V27.5C30.4688%2028.3438%2030.1719%2029.0469%2029.6094%2029.6094C29.0469%2030.1719%2028.3438%2030.4688%2027.5%2030.5H12.5C11.6562%2030.4688%2010.9531%2030.1719%2010.3906%2029.6094C9.82812%2029.0469%209.53125%2028.3438%209.5%2027.5V12.5C9.53125%2011.6562%209.82812%2010.9531%2010.3906%2010.3906C10.9531%209.82812%2011.6562%209.53125%2012.5%209.5ZM18.875%2024.125C18.9375%2024.8125%2019.3125%2025.1875%2020%2025.25C20.6875%2025.1875%2021.0625%2024.8125%2021.125%2024.125V21.125H24.125C24.8125%2021.0625%2025.1875%2020.6875%2025.25%2020C25.1875%2019.3125%2024.8125%2018.9375%2024.125%2018.875H21.125V15.875C21.0625%2015.1875%2020.6875%2014.8125%2020%2014.75C19.3125%2014.8125%2018.9375%2015.1875%2018.875%2015.875V18.875H15.875C15.1875%2018.9375%2014.8125%2019.3125%2014.75%2020C14.8125%2020.6875%2015.1875%2021.0625%2015.875%2021.125H18.875V24.125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "drop_op")}
            tag="div"
          >
            {"New "}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dropdownelement")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "dropdownelement_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "drop_item")}
                tag="div"
                {...onClickSchedulerAgent}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.375%204.5C7.60938%204.51562%207.73438%204.64062%207.75%204.875V6H12.25V4.875C12.2656%204.64062%2012.3906%204.51562%2012.625%204.5C12.8594%204.51562%2012.9844%204.64062%2013%204.875V6H13.75C14.1719%206.01562%2014.5234%206.16406%2014.8047%206.44531C15.0859%206.72656%2015.2344%207.07812%2015.25%207.5V8.25V9V15C15.2344%2015.4219%2015.0859%2015.7734%2014.8047%2016.0547C14.5234%2016.3359%2014.1719%2016.4844%2013.75%2016.5H6.25C5.82812%2016.4844%205.47656%2016.3359%205.19531%2016.0547C4.91406%2015.7734%204.76562%2015.4219%204.75%2015V9V8.25V7.5C4.76562%207.07812%204.91406%206.72656%205.19531%206.44531C5.47656%206.16406%205.82812%206.01562%206.25%206H7V4.875C7.01562%204.64062%207.14062%204.51562%207.375%204.5ZM14.5%209H5.5V15C5.5%2015.2188%205.57031%2015.3984%205.71094%2015.5391C5.85156%2015.6797%206.03125%2015.75%206.25%2015.75H13.75C13.9688%2015.75%2014.1484%2015.6797%2014.2891%2015.5391C14.4297%2015.3984%2014.5%2015.2188%2014.5%2015V9ZM13.75%206.75H6.25C6.03125%206.75%205.85156%206.82031%205.71094%206.96094C5.57031%207.10156%205.5%207.28125%205.5%207.5V8.25H14.5V7.5C14.5%207.28125%2014.4297%207.10156%2014.2891%206.96094C14.1484%206.82031%2013.9688%206.75%2013.75%206.75Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Scheduler Agent"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "drop_item")}
                tag="div"
                {...onClickJobAssistant}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%223%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M7.75%205.625V6.75H12.25V5.625C12.2344%205.39062%2012.1094%205.26562%2011.875%205.25H8.125C7.89062%205.26562%207.76562%205.39062%207.75%205.625ZM7%206.75V5.625C7.01562%205.3125%207.125%205.04688%207.32812%204.82812C7.54688%204.625%207.8125%204.51562%208.125%204.5H11.875C12.1875%204.51562%2012.4531%204.625%2012.6719%204.82812C12.875%205.04688%2012.9844%205.3125%2013%205.625V6.75H14.5C14.9219%206.76562%2015.2734%206.91406%2015.5547%207.19531C15.8359%207.47656%2015.9844%207.82812%2016%208.25V14.25C15.9844%2014.6719%2015.8359%2015.0234%2015.5547%2015.3047C15.2734%2015.5859%2014.9219%2015.7344%2014.5%2015.75H5.5C5.07812%2015.7344%204.72656%2015.5859%204.44531%2015.3047C4.16406%2015.0234%204.01562%2014.6719%204%2014.25V8.25C4.01562%207.82812%204.16406%207.47656%204.44531%207.19531C4.72656%206.91406%205.07812%206.76562%205.5%206.75H7ZM12.625%207.5H7.375H5.5C5.28125%207.5%205.10156%207.57031%204.96094%207.71094C4.82031%207.85156%204.75%208.03125%204.75%208.25V10.5H8.125H8.875H11.125H11.875H15.25V8.25C15.25%208.03125%2015.1797%207.85156%2015.0391%207.71094C14.8984%207.57031%2014.7188%207.5%2014.5%207.5H12.625ZM15.25%2011.25H11.875V12.375C11.875%2012.5938%2011.8047%2012.7734%2011.6641%2012.9141C11.5234%2013.0547%2011.3438%2013.125%2011.125%2013.125H8.875C8.65625%2013.125%208.47656%2013.0547%208.33594%2012.9141C8.19531%2012.7734%208.125%2012.5938%208.125%2012.375V11.25H4.75V14.25C4.75%2014.4688%204.82031%2014.6484%204.96094%2014.7891C5.10156%2014.9297%205.28125%2015%205.5%2015H14.5C14.7188%2015%2014.8984%2014.9297%2015.0391%2014.7891C15.1797%2014.6484%2015.25%2014.4688%2015.25%2014.25V11.25ZM8.875%2011.25V12.375H11.125V11.25H8.875Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Job Assistant"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "drop_item")}
                tag="div"
                {...onClickSourcingAgent}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%223%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M14.5%206.375C14.5%206.35938%2014.4531%206.30469%2014.3594%206.21094C14.1875%206.07031%2013.8906%205.92188%2013.4688%205.76562C12.5781%205.4375%2011.4219%205.26562%2010%205.25C8.57812%205.26562%207.42188%205.4375%206.53125%205.76562C6.10938%205.92188%205.8125%206.07031%205.64062%206.21094C5.54688%206.30469%205.5%206.35938%205.5%206.375V8.76562C5.84375%209.01562%206.38281%209.23438%207.11719%209.42188C7.94531%209.64062%208.90625%209.75%2010%209.75C11.0938%209.75%2012.0547%209.64062%2012.8828%209.42188C13.6172%209.23438%2014.1562%209.01562%2014.5%208.76562V6.375ZM14.5%209.65625C14.0938%209.85938%2013.6172%2010.0312%2013.0703%2010.1719C12.1641%2010.3906%2011.1406%2010.5%2010%2010.5C8.85938%2010.5%207.83594%2010.3828%206.92969%2010.1484C6.38281%2010.0234%205.90625%209.85938%205.5%209.65625V11.7656C5.84375%2012.0312%206.38281%2012.25%207.11719%2012.4219C7.94531%2012.6406%208.90625%2012.75%2010%2012.75C11.0938%2012.75%2012.0547%2012.6406%2012.8828%2012.4219C13.6172%2012.2344%2014.1562%2012.0156%2014.5%2011.7656V9.65625ZM5.5%2014.625C5.5%2014.6406%205.54688%2014.6953%205.64062%2014.7891C5.8125%2014.9297%206.10938%2015.0781%206.53125%2015.2344C7.42188%2015.5625%208.57812%2015.7344%2010%2015.75C11.4219%2015.7344%2012.5781%2015.5625%2013.4688%2015.2344C13.8906%2015.0781%2014.1875%2014.9297%2014.3594%2014.7891C14.4531%2014.6953%2014.5%2014.6406%2014.5%2014.625V12.6562C14.0938%2012.8594%2013.6172%2013.0312%2013.0703%2013.1719C12.1641%2013.3906%2011.1406%2013.5%2010%2013.5C8.85938%2013.5%207.83594%2013.3906%206.92969%2013.1719C6.38281%2013.0312%205.90625%2012.8594%205.5%2012.6562V14.625ZM5.5%206.39844C5.5%206.38281%205.5%206.38281%205.5%206.39844V6.39844ZM15.25%2014.625C15.2188%2015.1562%2014.7031%2015.6016%2013.7031%2015.9609C12.7188%2016.3047%2011.4844%2016.4844%2010%2016.5C8.51562%2016.4844%207.28125%2016.3047%206.29688%2015.9609C5.29688%2015.6016%204.78125%2015.1562%204.75%2014.625V6.375C4.78125%205.84375%205.29688%205.39844%206.29688%205.03906C7.28125%204.69531%208.51562%204.51562%2010%204.5C11.4844%204.51562%2012.7188%204.69531%2013.7031%205.03906C14.7031%205.39844%2015.2188%205.84375%2015.25%206.375V14.625Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Sourcing Agent"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "drop_item")}
                tag="div"
                {...onClickScreeningAgent}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%223%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M4.75%206.375C4.76562%206.79688%204.95312%207.125%205.3125%207.35938C5.6875%207.54688%206.0625%207.54688%206.4375%207.35938C6.79688%207.125%206.98438%206.79688%207%206.375C6.98438%205.95312%206.79688%205.625%206.4375%205.39062C6.0625%205.20312%205.6875%205.20312%205.3125%205.39062C4.95312%205.625%204.76562%205.95312%204.75%206.375ZM7.75%206.375C7.73438%207.07812%207.42188%207.61719%206.8125%207.99219C6.1875%208.33594%205.5625%208.33594%204.9375%207.99219C4.32812%207.61719%204.01562%207.07812%204%206.375C4.01562%205.67188%204.32812%205.13281%204.9375%204.75781C5.5625%204.41406%206.1875%204.41406%206.8125%204.75781C7.42188%205.13281%207.73438%205.67188%207.75%206.375ZM10%208.25C9.4375%208.26562%209.00781%208.51562%208.71094%209C8.42969%209.5%208.42969%2010%208.71094%2010.5C9.00781%2010.9844%209.4375%2011.2344%2010%2011.25C10.5625%2011.2344%2010.9922%2010.9844%2011.2891%2010.5C11.5703%2010%2011.5703%209.5%2011.2891%209C10.9922%208.51562%2010.5625%208.26562%2010%208.25ZM10%2012C9.59375%2012%209.21875%2011.8984%208.875%2011.6953C8.53125%2011.4922%208.25781%2011.2188%208.05469%2010.875C7.85156%2010.5156%207.75%2010.1406%207.75%209.75C7.75%209.35938%207.85156%208.98438%208.05469%208.625C8.25781%208.28125%208.53125%208.00781%208.875%207.80469C9.21875%207.60156%209.59375%207.5%2010%207.5C10.4062%207.5%2010.7812%207.60156%2011.125%207.80469C11.4688%208.00781%2011.7422%208.28125%2011.9453%208.625C12.1484%208.98438%2012.25%209.35938%2012.25%209.75C12.25%2010.1406%2012.1484%2010.5156%2011.9453%2010.875C11.7422%2011.2188%2011.4688%2011.4922%2011.125%2011.6953C10.7812%2011.8984%2010.4062%2012%2010%2012ZM8.61719%2013.5C7.97656%2013.5156%207.42969%2013.7344%206.97656%2014.1562C6.53906%2014.5781%206.29688%2015.1094%206.25%2015.75H13.75C13.7031%2015.1094%2013.4609%2014.5781%2013.0234%2014.1562C12.5703%2013.7344%2012.0234%2013.5156%2011.3828%2013.5H8.61719ZM8.61719%2012.75H11.3828C12.2578%2012.7656%2012.9922%2013.0703%2013.5859%2013.6641C14.1797%2014.2578%2014.4844%2014.9922%2014.5%2015.8672C14.4688%2016.2578%2014.2578%2016.4688%2013.8672%2016.5H6.13281C5.74219%2016.4688%205.53125%2016.2578%205.5%2015.8672C5.51562%2014.9922%205.82031%2014.2578%206.41406%2013.6641C7.00781%2013.0703%207.74219%2012.7656%208.61719%2012.75ZM14.5%205.25C14.0781%205.26562%2013.75%205.45312%2013.5156%205.8125C13.3281%206.1875%2013.3281%206.5625%2013.5156%206.9375C13.75%207.29688%2014.0781%207.48438%2014.5%207.5C14.9219%207.48438%2015.25%207.29688%2015.4844%206.9375C15.6719%206.5625%2015.6719%206.1875%2015.4844%205.8125C15.25%205.45312%2014.9219%205.26562%2014.5%205.25ZM14.5%208.25C13.7969%208.23438%2013.2578%207.92188%2012.8828%207.3125C12.5391%206.6875%2012.5391%206.0625%2012.8828%205.4375C13.2578%204.82812%2013.7969%204.51562%2014.5%204.5C15.2031%204.51562%2015.7422%204.82812%2016.1172%205.4375C16.4609%206.0625%2016.4609%206.6875%2016.1172%207.3125C15.7422%207.92188%2015.2031%208.23438%2014.5%208.25ZM14.875%209.75H13C13%209.48438%2012.9688%209.23438%2012.9062%209H14.875C15.625%209.01562%2016.2422%209.27344%2016.7266%209.77344C17.2266%2010.2578%2017.4844%2010.875%2017.5%2011.625C17.4844%2011.8594%2017.3594%2011.9844%2017.125%2012C16.8906%2011.9844%2016.7656%2011.8594%2016.75%2011.625C16.7344%2011.0938%2016.5547%2010.6484%2016.2109%2010.2891C15.8516%209.94531%2015.4062%209.76562%2014.875%209.75ZM7%209.75H5.125C4.59375%209.76562%204.14844%209.94531%203.78906%2010.2891C3.44531%2010.6484%203.26562%2011.0938%203.25%2011.625C3.23438%2011.8594%203.10938%2011.9844%202.875%2012C2.64062%2011.9844%202.51562%2011.8594%202.5%2011.625C2.51562%2010.875%202.77344%2010.2578%203.27344%209.77344C3.75781%209.27344%204.375%209.01562%205.125%209H7.09375C7.03125%209.23438%207%209.48438%207%209.75Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Screening Agent"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
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
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textCurrentTaskName}
            </_Builtin.Block>
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
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_chat_body")}
            tag="div"
            id="chat_scroll"
          >
            {slotChat ?? <NewChat />}
          </_Builtin.Block>
          {isSearch ? (
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
                      <SuggetionPill textSuggetion="Specific areas of expertise or technical skills that seem" />
                    </>
                  )}
                </_Builtin.Block>
              ) : null}
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
            </_Builtin.Block>
          ) : null}
          {isSearch ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "task_overlay_block")}
              tag="div"
            />
          ) : null}
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
