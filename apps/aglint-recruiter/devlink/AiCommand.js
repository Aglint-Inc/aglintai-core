"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AiCommand.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AiCommand({
  as: _Component = _Builtin.Block,
  onClickAiCommand = {},
  onClickCandidateName = {},
  isAiCommandActive = false,
  isCandidateNameActive = false,
  onClickRecruiterName = {},
  isRecruiterActive = false,
  isAiCommandVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "ai-command-wrap")} tag="div">
      {isAiCommandVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "relative", "ai-comm")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-640")}
            tag="div"
            {...onClickAiCommand}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2217%22%20viewbox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.25%203.15625L12%202.5L12.6562%200.75C12.7188%200.583333%2012.8333%200.5%2013%200.5C13.1667%200.5%2013.2812%200.583333%2013.3438%200.75L14%202.5L15.7812%203.15625C15.9271%203.21875%2016%203.33333%2016%203.5C16%203.66667%2015.9271%203.78125%2015.7812%203.84375L14%204.5L13.3438%206.28125C13.2812%206.42708%2013.1667%206.5%2013%206.5C12.8333%206.5%2012.7188%206.42708%2012.6562%206.28125L12%204.5L10.25%203.84375C10.0833%203.78125%2010%203.66667%2010%203.5C10%203.33333%2010.0833%203.21875%2010.25%203.15625ZM6.40625%202.78125L8.0625%206.34375L11.625%208C11.8125%208.10417%2011.9062%208.25%2011.9062%208.4375C11.9062%208.64583%2011.8125%208.80208%2011.625%208.90625L8.0625%2010.5625L6.40625%2014.125C6.30208%2014.3125%206.15625%2014.4062%205.96875%2014.4062C5.76042%2014.4062%205.60417%2014.3125%205.5%2014.125L3.84375%2010.5625L0.28125%208.90625C0.09375%208.82292%200%208.67708%200%208.46875C0%208.26042%200.09375%208.10417%200.28125%208L3.84375%206.34375L5.5%202.78125C5.60417%202.59375%205.76042%202.5%205.96875%202.5C6.17708%202.5%206.32292%202.59375%206.40625%202.78125ZM12%2012.5L12.6562%2010.75C12.7188%2010.5833%2012.8333%2010.5%2013%2010.5C13.1667%2010.5%2013.2812%2010.5833%2013.3438%2010.75L14%2012.5L15.7812%2013.1562C15.9271%2013.2188%2016%2013.3333%2016%2013.5C16%2013.6667%2015.9271%2013.7812%2015.7812%2013.8438L14%2014.5L13.3438%2016.2812C13.2812%2016.4271%2013.1667%2016.5%2013%2016.5C12.8333%2016.5%2012.7188%2016.4271%2012.6562%2016.2812L12%2014.5L10.25%2013.8438C10.0833%2013.7812%2010%2013.6667%2010%2013.5C10%2013.3333%2010.0833%2013.2188%2010.25%2013.1562L12%2012.5Z%22%20fill%3D%22%2317494D%22%20style%3D%22fill%3A%2317494D%3Bfill%3Acolor(display-p3%200.0902%200.2863%200.3020)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-kale-600")}
              tag="div"
            >
              {"AI Command"}
            </_Builtin.Block>
          </_Builtin.Block>
          {isAiCommandActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active-class-tab")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "relative", "ai-comm")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-640")}
          tag="div"
          {...onClickCandidateName}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.25%202.25V3C2.25%203.21875%202.17969%203.39844%202.03906%203.53906C1.89844%203.67969%201.71875%203.75%201.5%203.75C1.28125%203.75%201.10156%203.67969%200.960938%203.53906C0.820312%203.39844%200.75%203.21875%200.75%203V1.875C0.765625%201.5625%200.875%201.29687%201.07812%201.07812C1.29688%200.875%201.5625%200.765625%201.875%200.75H6H10.125C10.4375%200.765625%2010.7031%200.875%2010.9219%201.07812C11.125%201.29687%2011.2344%201.5625%2011.25%201.875V3C11.25%203.21875%2011.1797%203.39844%2011.0391%203.53906C10.8984%203.67969%2010.7188%203.75%2010.5%203.75C10.2812%203.75%2010.1016%203.67969%209.96094%203.53906C9.82031%203.39844%209.75%203.21875%209.75%203V2.25H6.75V9.75H7.875C8.09375%209.75%208.27344%209.82031%208.41406%209.96094C8.55469%2010.1016%208.625%2010.2812%208.625%2010.5C8.625%2010.7188%208.55469%2010.8984%208.41406%2011.0391C8.27344%2011.1797%208.09375%2011.25%207.875%2011.25H4.125C3.90625%2011.25%203.72656%2011.1797%203.58594%2011.0391C3.44531%2010.8984%203.375%2010.7188%203.375%2010.5C3.375%2010.2812%203.44531%2010.1016%203.58594%209.96094C3.72656%209.82031%203.90625%209.75%204.125%209.75H5.25V2.25H2.25Z%22%20fill%3D%22%23012B30%22%20style%3D%22fill%3A%23012B30%3Bfill%3Acolor(display-p3%200.0039%200.1686%200.1882)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-kale-600")}
            tag="div"
          >
            {"Candidate Name"}
          </_Builtin.Block>
        </_Builtin.Block>
        {isCandidateNameActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "active-class-tab")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "relative", "ai-comm")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-640")}
          tag="div"
          {...onClickRecruiterName}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.25%202.25V3C2.25%203.21875%202.17969%203.39844%202.03906%203.53906C1.89844%203.67969%201.71875%203.75%201.5%203.75C1.28125%203.75%201.10156%203.67969%200.960938%203.53906C0.820312%203.39844%200.75%203.21875%200.75%203V1.875C0.765625%201.5625%200.875%201.29687%201.07812%201.07812C1.29688%200.875%201.5625%200.765625%201.875%200.75H6H10.125C10.4375%200.765625%2010.7031%200.875%2010.9219%201.07812C11.125%201.29687%2011.2344%201.5625%2011.25%201.875V3C11.25%203.21875%2011.1797%203.39844%2011.0391%203.53906C10.8984%203.67969%2010.7188%203.75%2010.5%203.75C10.2812%203.75%2010.1016%203.67969%209.96094%203.53906C9.82031%203.39844%209.75%203.21875%209.75%203V2.25H6.75V9.75H7.875C8.09375%209.75%208.27344%209.82031%208.41406%209.96094C8.55469%2010.1016%208.625%2010.2812%208.625%2010.5C8.625%2010.7188%208.55469%2010.8984%208.41406%2011.0391C8.27344%2011.1797%208.09375%2011.25%207.875%2011.25H4.125C3.90625%2011.25%203.72656%2011.1797%203.58594%2011.0391C3.44531%2010.8984%203.375%2010.7188%203.375%2010.5C3.375%2010.2812%203.44531%2010.1016%203.58594%209.96094C3.72656%209.82031%203.90625%209.75%204.125%209.75H5.25V2.25H2.25Z%22%20fill%3D%22%23012B30%22%20style%3D%22fill%3A%23012B30%3Bfill%3Acolor(display-p3%200.0039%200.1686%200.1882)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-kale-600")}
            tag="div"
          >
            {"Recruiter Name"}
          </_Builtin.Block>
        </_Builtin.Block>
        {isRecruiterActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "active-class-tab")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
