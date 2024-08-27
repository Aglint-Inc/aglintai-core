"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ReasonList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-71":{"id":"e-71","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-72"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"efe5a4df-475d-d3cb-6ffc-ae72fed88b30","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"efe5a4df-475d-d3cb-6ffc-ae72fed88b30","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1714990729512},"e-72":{"id":"e-72","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-71"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"efe5a4df-475d-d3cb-6ffc-ae72fed88b30","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"efe5a4df-475d-d3cb-6ffc-ae72fed88b30","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1714990729513}},"actionLists":{"a-43":{"id":"a-43","title":"Schedule Reason Card Hover in","actionItemGroups":[{"actionItems":[{"id":"a-43-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".edit_delete_button","selectorGuids":["2e4336dd-94cf-fee0-e148-fa1821ddca77"]},"value":0,"unit":""}},{"id":"a-43-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".edit_delete_button","selectorGuids":["2e4336dd-94cf-fee0-e148-fa1821ddca77"]},"value":"none"}}]},{"actionItems":[{"id":"a-43-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".edit_delete_button","selectorGuids":["2e4336dd-94cf-fee0-e148-fa1821ddca77"]},"value":1,"unit":""}},{"id":"a-43-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".edit_delete_button","selectorGuids":["2e4336dd-94cf-fee0-e148-fa1821ddca77"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1714990734398},"a-44":{"id":"a-44","title":"Schedule Reason Card Hover out","actionItemGroups":[{"actionItems":[{"id":"a-44-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".edit_delete_button","selectorGuids":["2e4336dd-94cf-fee0-e148-fa1821ddca77"]},"value":0,"unit":""}},{"id":"a-44-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".edit_delete_button","selectorGuids":["2e4336dd-94cf-fee0-e148-fa1821ddca77"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1714990734398}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ReasonList({
  as: _Component = _Builtin.Block,
  textReason = "Out of the office",
  onClickEdit = {},
  onClickDelete = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "schedule_reason")}
      data-w-id="efe5a4df-475d-d3cb-6ffc-ae72fed88b30"
      tag="div"
    >
      <Text content={textReason} weight="" />
      <_Builtin.Block className={_utils.cx(_styles, "rl-edit-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "edit_delete_button")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1674", "cursor-pointer")}
            tag="div"
            {...onClickEdit}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.1641%202.55469C12.0078%202.41406%2011.8281%202.34375%2011.625%202.34375C11.4219%202.34375%2011.2422%202.41406%2011.0859%202.55469L10.4766%203.1875L11.8125%204.52344L12.4453%203.91406C12.5859%203.75781%2012.6562%203.57813%2012.6562%203.375C12.6562%203.17187%2012.5859%202.99219%2012.4453%202.83594L12.1641%202.55469ZM5.92969%207.73438C5.83594%207.82812%205.77344%207.94531%205.74219%208.08594L5.36719%209.63281L6.91406%209.28125C7.05469%209.23438%207.17188%209.16406%207.26562%209.07031L11.2734%205.0625L9.9375%203.72656L5.92969%207.73438ZM10.5703%202.03906C10.8828%201.74219%2011.2344%201.59375%2011.625%201.59375C12.0312%201.59375%2012.3828%201.74219%2012.6797%202.03906L12.9609%202.32031C13.2578%202.63281%2013.4062%202.98437%2013.4062%203.375C13.4062%203.78125%2013.2578%204.13281%2012.9609%204.42969L7.80469%209.60938C7.60156%209.8125%207.35938%209.94531%207.07812%2010.0078L4.96875%2010.5C4.82812%2010.5156%204.71094%2010.4766%204.61719%2010.3828C4.52344%2010.2891%204.48438%2010.1797%204.5%2010.0547L4.99219%207.92188C5.05469%207.64062%205.1875%207.39844%205.39062%207.19531L10.5703%202.03906ZM3.375%203H6.375C6.60938%203.01563%206.73438%203.14062%206.75%203.375C6.73438%203.60938%206.60938%203.73437%206.375%203.75H3.375C3.0625%203.76563%202.79688%203.875%202.57812%204.07812C2.375%204.29688%202.26562%204.5625%202.25%204.875V11.625C2.26562%2011.9375%202.375%2012.2031%202.57812%2012.4219C2.79688%2012.625%203.0625%2012.7344%203.375%2012.75H10.125C10.4375%2012.7344%2010.7031%2012.625%2010.9219%2012.4219C11.125%2012.2031%2011.2344%2011.9375%2011.25%2011.625V8.625C11.2656%208.39062%2011.3906%208.26562%2011.625%208.25C11.8594%208.26562%2011.9844%208.39062%2012%208.625V11.625C11.9844%2012.1562%2011.8047%2012.6016%2011.4609%2012.9609C11.1016%2013.3047%2010.6562%2013.4844%2010.125%2013.5H3.375C2.84375%2013.4844%202.39844%2013.3047%202.03906%2012.9609C1.69531%2012.6016%201.51562%2012.1562%201.5%2011.625V4.875C1.51562%204.34375%201.69531%203.89844%202.03906%203.53906C2.39844%203.19531%202.84375%203.01563%203.375%203Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "div-block-1674",
              "cursor-pointer",
              "red"
            )}
            tag="div"
            {...onClickDelete}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.42188%202.25C6.28125%202.25%206.17188%202.3125%206.09375%202.4375L5.74219%203H9.25781L8.90625%202.4375C8.82812%202.3125%208.71875%202.25%208.57812%202.25H6.42188ZM10.1484%203H11.25H12H12.375C12.6094%203.01563%2012.7344%203.14062%2012.75%203.375C12.7344%203.60938%2012.6094%203.73437%2012.375%203.75H11.9531L11.3438%2012.1172C11.3125%2012.5078%2011.1562%2012.8359%2010.875%2013.1016C10.5938%2013.3516%2010.25%2013.4844%209.84375%2013.5H5.15625C4.75%2013.4844%204.40625%2013.3516%204.125%2013.1016C3.84375%2012.8359%203.6875%2012.5078%203.65625%2012.1172L3.04688%203.75H2.625C2.39062%203.73437%202.26562%203.60938%202.25%203.375C2.26562%203.14062%202.39062%203.01563%202.625%203H3H3.75H4.85156L5.46094%202.03906C5.69531%201.69531%206.01562%201.51563%206.42188%201.5H8.57812C8.98438%201.51563%209.30469%201.69531%209.53906%202.03906L10.1484%203ZM11.2031%203.75H3.79688L4.40625%2012.0469C4.42188%2012.25%204.5%2012.4141%204.64062%2012.5391C4.78125%2012.6797%204.95312%2012.75%205.15625%2012.75H9.84375C10.0469%2012.75%2010.2188%2012.6797%2010.3594%2012.5391C10.5%2012.4141%2010.5781%2012.25%2010.5938%2012.0469L11.2031%203.75Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
