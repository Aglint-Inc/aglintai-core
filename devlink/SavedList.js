import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SavedList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1526":{"id":"e-1526","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-575","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1527"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705738440761},"e-1527":{"id":"e-1527","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-576","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1526"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705738440764}},"actionLists":{"a-575":{"id":"a-575","title":"Edit Hover (In)","actionItemGroups":[{"actionItems":[{"id":"a-575-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-737","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}},{"id":"a-575-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-737","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-575-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-737","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"flex"}},{"id":"a-575-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-737","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1705738315370},"a-576":{"id":"a-576","title":"Edit Hover (Out)","actionItemGroups":[{"actionItems":[{"id":"a-576-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-737","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}},{"id":"a-576-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-737","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705738315370}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SavedList({
  as: _Component = _Builtin.Block,
  textRole = "Senior Software Engineer",
  textCountCandidate = "(28 Candidates)",
  onClickList = {},
  slotCheckbox,
  onClickEdit = {},
  onClickDelete = {},
  isEditVisible = false,
  slotInputTextSavedList,
  isSavedListInputVisible = false,
  isSavedListTextVisible = true,
  onClickSubmit = {},
  onClickClose = {},
  isCheckboxVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(
        _styles,
        "div-block-728",
        "cursor-pointer",
        "width-auto"
      )}
      data-w-id="b3d68156-df23-e49f-d4ae-cc3d618aa487"
      tag="div"
      {...onClickList}
    >
      {isCheckboxVisible ? (
        <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
      ) : null}
      {isSavedListInputVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-738")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotInputTextSavedList}</_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewBox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21.0547%206.94531C21.3151%207.23177%2021.3151%207.51823%2021.0547%207.80469L10.4297%2018.4297C10.1432%2018.6901%209.85677%2018.6901%209.57031%2018.4297L3.94531%2012.8047C3.6849%2012.5182%203.6849%2012.2318%203.94531%2011.9453C4.23177%2011.6849%204.51823%2011.6849%204.80469%2011.9453L10%2017.1016L20.1953%206.94531C20.4818%206.6849%2020.7682%206.6849%2021.0547%206.94531Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickSubmit}
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewBox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.6953%2019.0547L12.5%2013.8984L7.34375%2019.0547C7.03125%2019.2891%206.73177%2019.2891%206.44531%2019.0547C6.21094%2018.7682%206.21094%2018.4818%206.44531%2018.1953L11.6016%2013L6.44531%207.84375C6.21094%207.53125%206.21094%207.23177%206.44531%206.94531C6.73177%206.71094%207.03125%206.71094%207.34375%206.94531L12.5%2012.1016L17.6953%206.94531C17.9818%206.71094%2018.2682%206.71094%2018.5547%206.94531C18.7891%207.23177%2018.7891%207.53125%2018.5547%207.84375L13.3984%2013L18.5547%2018.1953C18.7891%2018.4818%2018.7891%2018.7682%2018.5547%2019.0547C18.2682%2019.2891%2017.9818%2019.2891%2017.6953%2019.0547Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickClose}
          />
        </_Builtin.Block>
      ) : null}
      {isSavedListTextVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "one-line-clamp")}
          tag="div"
        >
          {textRole}
        </_Builtin.Block>
      ) : null}
      {isSavedListTextVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textCountCandidate}
        </_Builtin.Block>
      ) : null}
      {isEditVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-737")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.1641%203.05469C12.0078%202.91406%2011.8281%202.84375%2011.625%202.84375C11.4219%202.84375%2011.2422%202.91406%2011.0859%203.05469L10.4766%203.6875L11.8125%205.02344L12.4453%204.41406C12.5859%204.25781%2012.6562%204.07812%2012.6562%203.875C12.6562%203.67187%2012.5859%203.49219%2012.4453%203.33594L12.1641%203.05469ZM5.92969%208.23438C5.83594%208.32812%205.77344%208.44531%205.74219%208.58594L5.36719%2010.1328L6.91406%209.78125C7.05469%209.73438%207.17188%209.66406%207.26562%209.57031L11.2734%205.5625L9.9375%204.22656L5.92969%208.23438ZM10.5703%202.53906C10.8828%202.24219%2011.2344%202.09375%2011.625%202.09375C12.0312%202.09375%2012.3828%202.24219%2012.6797%202.53906L12.9609%202.82031C13.2578%203.13281%2013.4062%203.48437%2013.4062%203.875C13.4062%204.28125%2013.2578%204.63281%2012.9609%204.92969L7.80469%2010.1094C7.60156%2010.3125%207.35938%2010.4453%207.07812%2010.5078L4.96875%2011C4.82812%2011.0156%204.71094%2010.9766%204.61719%2010.8828C4.52344%2010.7891%204.48438%2010.6797%204.5%2010.5547L4.99219%208.42188C5.05469%208.14062%205.1875%207.89844%205.39062%207.69531L10.5703%202.53906ZM3.375%203.5H6.375C6.60938%203.51563%206.73438%203.64062%206.75%203.875C6.73438%204.10938%206.60938%204.23438%206.375%204.25H3.375C3.0625%204.26562%202.79688%204.375%202.57812%204.57812C2.375%204.79688%202.26562%205.0625%202.25%205.375V12.125C2.26562%2012.4375%202.375%2012.7031%202.57812%2012.9219C2.79688%2013.125%203.0625%2013.2344%203.375%2013.25H10.125C10.4375%2013.2344%2010.7031%2013.125%2010.9219%2012.9219C11.125%2012.7031%2011.2344%2012.4375%2011.25%2012.125V9.125C11.2656%208.89062%2011.3906%208.76562%2011.625%208.75C11.8594%208.76562%2011.9844%208.89062%2012%209.125V12.125C11.9844%2012.6562%2011.8047%2013.1016%2011.4609%2013.4609C11.1016%2013.8047%2010.6562%2013.9844%2010.125%2014H3.375C2.84375%2013.9844%202.39844%2013.8047%202.03906%2013.4609C1.69531%2013.1016%201.51562%2012.6562%201.5%2012.125V5.375C1.51562%204.84375%201.69531%204.39844%202.03906%204.03906C2.39844%203.69531%202.84375%203.51563%203.375%203.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickEdit}
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.42188%202.75C6.28125%202.75%206.17188%202.8125%206.09375%202.9375L5.74219%203.5H9.25781L8.90625%202.9375C8.82812%202.8125%208.71875%202.75%208.57812%202.75H6.42188ZM10.1484%203.5H11.25H12H12.375C12.6094%203.51563%2012.7344%203.64062%2012.75%203.875C12.7344%204.10938%2012.6094%204.23438%2012.375%204.25H11.9531L11.3438%2012.6172C11.3125%2013.0078%2011.1562%2013.3359%2010.875%2013.6016C10.5938%2013.8516%2010.25%2013.9844%209.84375%2014H5.15625C4.75%2013.9844%204.40625%2013.8516%204.125%2013.6016C3.84375%2013.3359%203.6875%2013.0078%203.65625%2012.6172L3.04688%204.25H2.625C2.39062%204.23438%202.26562%204.10938%202.25%203.875C2.26562%203.64062%202.39062%203.51563%202.625%203.5H3H3.75H4.85156L5.46094%202.53906C5.69531%202.19531%206.01562%202.01563%206.42188%202H8.57812C8.98438%202.01563%209.30469%202.19531%209.53906%202.53906L10.1484%203.5ZM11.2031%204.25H3.79688L4.40625%2012.5469C4.42188%2012.75%204.5%2012.9141%204.64062%2013.0391C4.78125%2013.1797%204.95312%2013.25%205.15625%2013.25H9.84375C10.0469%2013.25%2010.2188%2013.1797%2010.3594%2013.0391C10.5%2012.9141%2010.5781%2012.75%2010.5938%2012.5469L11.2031%204.25Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickDelete}
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
