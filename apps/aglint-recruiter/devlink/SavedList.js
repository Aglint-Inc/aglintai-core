"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./SavedList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1526":{"id":"e-1526","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-575","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1527"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705738440761},"e-1527":{"id":"e-1527","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-576","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1526"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b3d68156-df23-e49f-d4ae-cc3d618aa487","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705738440764},"e-1554":{"id":"e-1554","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-595","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1555"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6617842178bd911935783342|e1da67ec-034d-729b-e12d-6fe7511a839d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6617842178bd911935783342|e1da67ec-034d-729b-e12d-6fe7511a839d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712847463895},"e-1555":{"id":"e-1555","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-596","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1554"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6617842178bd911935783342|e1da67ec-034d-729b-e12d-6fe7511a839d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6617842178bd911935783342|e1da67ec-034d-729b-e12d-6fe7511a839d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712847463895},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-575":{"id":"a-575","title":"Edit Hover (In)","actionItemGroups":[{"actionItems":[{"id":"a-575-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}},{"id":"a-575-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-575-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"flex"}},{"id":"a-575-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1705738315370},"a-576":{"id":"a-576","title":"Edit Hover (Out)","actionItemGroups":[{"actionItems":[{"id":"a-576-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}},{"id":"a-576-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705738315370},"a-595":{"id":"a-595","title":"Edit Hover (In) 2","actionItemGroups":[{"actionItems":[{"id":"a-595-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}},{"id":"a-595-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-595-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"flex"}},{"id":"a-595-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1705738315370},"a-596":{"id":"a-596","title":"Edit Hover (Out) 2","actionItemGroups":[{"actionItems":[{"id":"a-596-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":0,"unit":""}},{"id":"a-596-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".save-list-icon-wrap","selectorGuids":["726735d4-888e-4dd9-659d-06a4ecca0bff"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705738315370},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SavedList({
  as: _Component = _Builtin.Block,
  textRole = "Senior Software Engineer",
  textCountCandidate = "(28 Candidates)",
  onClickList = {},
  onClickEdit = {},
  onClickDelete = {},
  isEditVisible = true,
  slotInputTextSavedList,
  isSavedListInputVisible = false,
  isSavedListTextVisible = true,
  onClickSubmit = {},
  onClickClose = {},
  isCardVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      data-w-id="b3d68156-df23-e49f-d4ae-cc3d618aa487"
      tag="div"
      {...onClickList}
    >
      {isCardVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "save-list-input-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "save-list-input-left", "width-auto")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.5%205.5H4.5V4.5H3.5V5.5ZM2.5%204.25C2.54167%203.79167%202.79167%203.54167%203.25%203.5H4.75C5.20833%203.54167%205.45833%203.79167%205.5%204.25V5.75C5.45833%206.20833%205.20833%206.45833%204.75%206.5H3.25C2.79167%206.45833%202.54167%206.20833%202.5%205.75V4.25ZM7.5%204.5H17.5C17.8125%204.52083%2017.9792%204.6875%2018%205C17.9792%205.3125%2017.8125%205.47917%2017.5%205.5H7.5C7.1875%205.47917%207.02083%205.3125%207%205C7.02083%204.6875%207.1875%204.52083%207.5%204.5ZM7.5%209.5H17.5C17.8125%209.52083%2017.9792%209.6875%2018%2010C17.9792%2010.3125%2017.8125%2010.4792%2017.5%2010.5H7.5C7.1875%2010.4792%207.02083%2010.3125%207%2010C7.02083%209.6875%207.1875%209.52083%207.5%209.5ZM7.5%2014.5H17.5C17.8125%2014.5208%2017.9792%2014.6875%2018%2015C17.9792%2015.3125%2017.8125%2015.4792%2017.5%2015.5H7.5C7.1875%2015.4792%207.02083%2015.3125%207%2015C7.02083%2014.6875%207.1875%2014.5208%207.5%2014.5ZM3.5%209.5V10.5H4.5V9.5H3.5ZM3.25%208.5H4.75C5.20833%208.54167%205.45833%208.79167%205.5%209.25V10.75C5.45833%2011.2083%205.20833%2011.4583%204.75%2011.5H3.25C2.79167%2011.4583%202.54167%2011.2083%202.5%2010.75V9.25C2.54167%208.79167%202.79167%208.54167%203.25%208.5ZM3.5%2015.5H4.5V14.5H3.5V15.5ZM2.5%2014.25C2.54167%2013.7917%202.79167%2013.5417%203.25%2013.5H4.75C5.20833%2013.5417%205.45833%2013.7917%205.5%2014.25V15.75C5.45833%2016.2083%205.20833%2016.4583%204.75%2016.5H3.25C2.79167%2016.4583%202.54167%2016.2083%202.5%2015.75V14.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {isSavedListTextVisible ? (
              <_Builtin.Block tag="div">
                <Text content={textRole} />
              </_Builtin.Block>
            ) : null}
            {isEditVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "save-list-icon-wrap")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.1641%203.05469C12.0078%202.91406%2011.8281%202.84375%2011.625%202.84375C11.4219%202.84375%2011.2422%202.91406%2011.0859%203.05469L10.4766%203.6875L11.8125%205.02344L12.4453%204.41406C12.5859%204.25781%2012.6562%204.07812%2012.6562%203.875C12.6562%203.67187%2012.5859%203.49219%2012.4453%203.33594L12.1641%203.05469ZM5.92969%208.23438C5.83594%208.32812%205.77344%208.44531%205.74219%208.58594L5.36719%2010.1328L6.91406%209.78125C7.05469%209.73438%207.17188%209.66406%207.26562%209.57031L11.2734%205.5625L9.9375%204.22656L5.92969%208.23438ZM10.5703%202.53906C10.8828%202.24219%2011.2344%202.09375%2011.625%202.09375C12.0312%202.09375%2012.3828%202.24219%2012.6797%202.53906L12.9609%202.82031C13.2578%203.13281%2013.4062%203.48437%2013.4062%203.875C13.4062%204.28125%2013.2578%204.63281%2012.9609%204.92969L7.80469%2010.1094C7.60156%2010.3125%207.35938%2010.4453%207.07812%2010.5078L4.96875%2011C4.82812%2011.0156%204.71094%2010.9766%204.61719%2010.8828C4.52344%2010.7891%204.48438%2010.6797%204.5%2010.5547L4.99219%208.42188C5.05469%208.14062%205.1875%207.89844%205.39062%207.69531L10.5703%202.53906ZM3.375%203.5H6.375C6.60938%203.51563%206.73438%203.64062%206.75%203.875C6.73438%204.10938%206.60938%204.23438%206.375%204.25H3.375C3.0625%204.26562%202.79688%204.375%202.57812%204.57812C2.375%204.79688%202.26562%205.0625%202.25%205.375V12.125C2.26562%2012.4375%202.375%2012.7031%202.57812%2012.9219C2.79688%2013.125%203.0625%2013.2344%203.375%2013.25H10.125C10.4375%2013.2344%2010.7031%2013.125%2010.9219%2012.9219C11.125%2012.7031%2011.2344%2012.4375%2011.25%2012.125V9.125C11.2656%208.89062%2011.3906%208.76562%2011.625%208.75C11.8594%208.76562%2011.9844%208.89062%2012%209.125V12.125C11.9844%2012.6562%2011.8047%2013.1016%2011.4609%2013.4609C11.1016%2013.8047%2010.6562%2013.9844%2010.125%2014H3.375C2.84375%2013.9844%202.39844%2013.8047%202.03906%2013.4609C1.69531%2013.1016%201.51562%2012.6562%201.5%2012.125V5.375C1.51562%204.84375%201.69531%204.39844%202.03906%204.03906C2.39844%203.69531%202.84375%203.51563%203.375%203.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  {...onClickEdit}
                />
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.42188%202.75C6.28125%202.75%206.17188%202.8125%206.09375%202.9375L5.74219%203.5H9.25781L8.90625%202.9375C8.82812%202.8125%208.71875%202.75%208.57812%202.75H6.42188ZM10.1484%203.5H11.25H12H12.375C12.6094%203.51563%2012.7344%203.64062%2012.75%203.875C12.7344%204.10938%2012.6094%204.23438%2012.375%204.25H11.9531L11.3438%2012.6172C11.3125%2013.0078%2011.1562%2013.3359%2010.875%2013.6016C10.5938%2013.8516%2010.25%2013.9844%209.84375%2014H5.15625C4.75%2013.9844%204.40625%2013.8516%204.125%2013.6016C3.84375%2013.3359%203.6875%2013.0078%203.65625%2012.6172L3.04688%204.25H2.625C2.39062%204.23438%202.26562%204.10938%202.25%203.875C2.26562%203.64062%202.39062%203.51563%202.625%203.5H3H3.75H4.85156L5.46094%202.53906C5.69531%202.19531%206.01562%202.01563%206.42188%202H8.57812C8.98438%202.01563%209.30469%202.19531%209.53906%202.53906L10.1484%203.5ZM11.2031%204.25H3.79688L4.40625%2012.5469C4.42188%2012.75%204.5%2012.9141%204.64062%2013.0391C4.78125%2013.1797%204.95312%2013.25%205.15625%2013.25H9.84375C10.0469%2013.25%2010.2188%2013.1797%2010.3594%2013.0391C10.5%2012.9141%2010.5781%2012.75%2010.5938%2012.5469L11.2031%204.25Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                  {...onClickDelete}
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          {isSavedListTextVisible ? (
            <_Builtin.Block tag="div">
              <Text content={textCountCandidate} color="neutral" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isSavedListInputVisible ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "save-list-input-wrap",
            "width-auto",
            "inline-edit"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "save-list-input-left")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.5%205.5H4.5V4.5H3.5V5.5ZM2.5%204.25C2.54167%203.79167%202.79167%203.54167%203.25%203.5H4.75C5.20833%203.54167%205.45833%203.79167%205.5%204.25V5.75C5.45833%206.20833%205.20833%206.45833%204.75%206.5H3.25C2.79167%206.45833%202.54167%206.20833%202.5%205.75V4.25ZM7.5%204.5H17.5C17.8125%204.52083%2017.9792%204.6875%2018%205C17.9792%205.3125%2017.8125%205.47917%2017.5%205.5H7.5C7.1875%205.47917%207.02083%205.3125%207%205C7.02083%204.6875%207.1875%204.52083%207.5%204.5ZM7.5%209.5H17.5C17.8125%209.52083%2017.9792%209.6875%2018%2010C17.9792%2010.3125%2017.8125%2010.4792%2017.5%2010.5H7.5C7.1875%2010.4792%207.02083%2010.3125%207%2010C7.02083%209.6875%207.1875%209.52083%207.5%209.5ZM7.5%2014.5H17.5C17.8125%2014.5208%2017.9792%2014.6875%2018%2015C17.9792%2015.3125%2017.8125%2015.4792%2017.5%2015.5H7.5C7.1875%2015.4792%207.02083%2015.3125%207%2015C7.02083%2014.6875%207.1875%2014.5208%207.5%2014.5ZM3.5%209.5V10.5H4.5V9.5H3.5ZM3.25%208.5H4.75C5.20833%208.54167%205.45833%208.79167%205.5%209.25V10.75C5.45833%2011.2083%205.20833%2011.4583%204.75%2011.5H3.25C2.79167%2011.4583%202.54167%2011.2083%202.5%2010.75V9.25C2.54167%208.79167%202.79167%208.54167%203.25%208.5ZM3.5%2015.5H4.5V14.5H3.5V15.5ZM2.5%2014.25C2.54167%2013.7917%202.79167%2013.5417%203.25%2013.5H4.75C5.20833%2013.5417%205.45833%2013.7917%205.5%2014.25V15.75C5.45833%2016.2083%205.20833%2016.4583%204.75%2016.5H3.25C2.79167%2016.4583%202.54167%2016.2083%202.5%2015.75V14.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-save-list-input")}
              tag="div"
            >
              {slotInputTextSavedList}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "save-list-input-right")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "curser-hover-pointer")}
              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20fill%3D%22%23EDF8F4%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20stroke%3D%22%23D1E8DF%22%2F%3E%0A%3Cpath%20d%3D%22M26.7812%2015.2188C27.0729%2015.5729%2027.0729%2015.9271%2026.7812%2016.2812L18.5312%2024.5312C18.1771%2024.8229%2017.8229%2024.8229%2017.4688%2024.5312L13.2188%2020.2812C12.9271%2019.9271%2012.9271%2019.5729%2013.2188%2019.2188C13.5729%2018.9271%2013.9271%2018.9271%2014.2812%2019.2188L18%2022.9375L25.7188%2015.2188C26.0729%2014.9271%2026.4271%2014.9271%2026.7812%2015.2188Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickSubmit}
            />
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "curser-hover-pointer")}
              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20fill%3D%22%23FFF0F1%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20stroke%3D%22%23F5D5D8%22%2F%3E%0A%3Cpath%20d%3D%22M24.7812%2016.2812L21.0625%2020L24.7812%2023.7188C25.0729%2024.0729%2025.0729%2024.4271%2024.7812%2024.7812C24.4271%2025.0729%2024.0729%2025.0729%2023.7188%2024.7812L20%2021.0625L16.2812%2024.7812C15.9271%2025.0729%2015.5729%2025.0729%2015.2188%2024.7812C14.9271%2024.4271%2014.9271%2024.0729%2015.2188%2023.7188L18.9375%2020L15.2188%2016.2812C14.9271%2015.9271%2014.9271%2015.5729%2015.2188%2015.2188C15.5729%2014.9271%2015.9271%2014.9271%2016.2812%2015.2188L20%2018.9375L23.7188%2015.2188C24.0729%2014.9271%2024.4271%2014.9271%2024.7812%2015.2188C25.0729%2015.5729%2025.0729%2015.9271%2024.7812%2016.2812Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickClose}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
