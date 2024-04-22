"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { HistoryTrainingCard } from "./HistoryTrainingCard";
import * as _utils from "./utils";
import _styles from "./HistoryPill.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-49":{"id":"e-49","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"405f0cb4-c513-d2ad-8607-c9f502edf686"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713765164992},"e-50":{"id":"e-50","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-49"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"405f0cb4-c513-d2ad-8607-c9f502edf686"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713765164992}},"actionLists":{"a-27":{"id":"a-27","title":"History PillCard Hover in","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-training-card","selectorGuids":["3d29bc5f-fec6-b736-5c1b-5d451adcb201"]},"value":0,"unit":""}},{"id":"a-27-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".slot-training-card","selectorGuids":["3d29bc5f-fec6-b736-5c1b-5d451adcb201"]}}}]},{"actionItems":[{"id":"a-27-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"useEventTarget":"CHILDREN","selector":".slot-training-card","selectorGuids":["3d29bc5f-fec6-b736-5c1b-5d451adcb201"]}}},{"id":"a-27-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-training-card","selectorGuids":["3d29bc5f-fec6-b736-5c1b-5d451adcb201"]},"value":1,"unit":""}}]}],"createdOn":1713765169490,"useFirstGroupAsInitialState":true},"a-28":{"id":"a-28","title":"History PillCard Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-28-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-training-card","selectorGuids":["3d29bc5f-fec6-b736-5c1b-5d451adcb201"]},"value":0,"unit":""}},{"id":"a-28-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".slot-training-card","selectorGuids":["3d29bc5f-fec6-b736-5c1b-5d451adcb201"]}}}]}],"createdOn":1713765169490,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function HistoryPill({
  as: _Component = _Builtin.Block,
  isReverseShadow = false,
  isShadow = true,
  isActive = false,
  isStartActive = false,
  isMiddleActive = false,
  isEndActive = false,
  isStart = true,
  isMiddle = false,
  isEnd = false,
  slotHistoryTrainingCard,
  isHistoryTrainingCardVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1524")}
      data-w-id="405f0cb4-c513-d2ad-8607-c9f502edf686"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1523")}
        tag="div"
      >
        {isShadow ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222.29%202.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.97656%2012.3594C6.10156%2012.3594%204.8125%2011.4531%204.65625%2010.0625H6.04688C6.27344%2010.7656%206.94531%2011.2266%208.02344%2011.2266C9.15625%2011.2266%209.96094%2010.6875%209.96094%209.92188V9.90625C9.96094%209.33594%209.53125%208.9375%208.49219%208.6875L7.1875%208.375C5.60938%208%204.89844%207.3125%204.89844%206.10156V6.09375C4.89844%204.69531%206.24219%203.64062%208.03125%203.64062C9.79688%203.64062%2011.0234%204.52344%2011.2109%205.89844H9.875C9.69531%205.23438%209.03906%204.77344%208.02344%204.77344C7.02344%204.77344%206.28906%205.28906%206.28906%206.03125V6.04688C6.28906%206.61719%206.71094%206.97656%207.70313%207.21875L9%207.53125C10.5859%207.91406%2011.3516%208.60156%2011.3516%209.80469V9.82031C11.3516%2011.3203%209.89062%2012.3594%207.97656%2012.3594Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
        {isReverseShadow ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%221.26667%22%20y%3D%221.26667%22%20width%3D%2215.4667%22%20height%3D%2215.4667%22%20rx%3D%227.73333%22%20stroke%3D%22white%22%20stroke-width%3D%220.533333%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M6.04688%2013.0503V4.95312H9.13874C10.6987%204.95312%2011.72%205.90706%2011.72%207.3604V7.37163C11.72%208.4939%2011.1083%209.36928%2010.0927%209.68912L11.9669%2013.0503H10.7829L9.04896%209.84624H7.05692V13.0503H6.04688ZM7.05692%208.94842H9.04896C10.0871%208.94842%2010.6763%208.3929%2010.6763%207.4053V7.39407C10.6763%206.42892%2010.0478%205.85094%209.00407%205.85094H7.05692V8.94842Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1523", "active")}
          tag="div"
        >
          {isShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20stroke%3D%22white%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222.29%202.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.97656%2012.3594C6.10156%2012.3594%204.8125%2011.4531%204.65625%2010.0625H6.04688C6.27344%2010.7656%206.94531%2011.2266%208.02344%2011.2266C9.15625%2011.2266%209.96094%2010.6875%209.96094%209.92188V9.90625C9.96094%209.33594%209.53125%208.9375%208.49219%208.6875L7.1875%208.375C5.60938%208%204.89844%207.3125%204.89844%206.10156V6.09375C4.89844%204.69531%206.24219%203.64062%208.03125%203.64062C9.79688%203.64062%2011.0234%204.52344%2011.2109%205.89844H9.875C9.69531%205.23438%209.03906%204.77344%208.02344%204.77344C7.02344%204.77344%206.28906%205.28906%206.28906%206.03125V6.04688C6.28906%206.61719%206.71094%206.97656%207.70313%207.21875L9%207.53125C10.5859%207.91406%2011.3516%208.60156%2011.3516%209.80469V9.82031C11.3516%2011.3203%209.89062%2012.3594%207.97656%2012.3594Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isReverseShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%221.26667%22%20y%3D%221.26667%22%20width%3D%2215.4667%22%20height%3D%2215.4667%22%20rx%3D%227.73333%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.533333%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20stroke%3D%22white%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M6.04688%2013.0503V4.95312H9.13874C10.6987%204.95312%2011.72%205.90706%2011.72%207.3604V7.37163C11.72%208.4939%2011.1083%209.36928%2010.0927%209.68912L11.9669%2013.0503H10.7829L9.04896%209.84624H7.05692V13.0503H6.04688ZM7.05692%208.94842H9.04896C10.0871%208.94842%2010.6763%208.3929%2010.6763%207.4053V7.39407C10.6763%206.42892%2010.0478%205.85094%209.00407%205.85094H7.05692V8.94842Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isHistoryTrainingCardVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-training-card")}
          tag="div"
        >
          {slotHistoryTrainingCard ?? <HistoryTrainingCard />}
        </_Builtin.Block>
      ) : null}
      {isStartActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1552", "start-active")}
          tag="div"
        >
          {isShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20stroke%3D%22white%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222.29%202.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.97656%2012.3594C6.10156%2012.3594%204.8125%2011.4531%204.65625%2010.0625H6.04688C6.27344%2010.7656%206.94531%2011.2266%208.02344%2011.2266C9.15625%2011.2266%209.96094%2010.6875%209.96094%209.92188V9.90625C9.96094%209.33594%209.53125%208.9375%208.49219%208.6875L7.1875%208.375C5.60938%208%204.89844%207.3125%204.89844%206.10156V6.09375C4.89844%204.69531%206.24219%203.64062%208.03125%203.64062C9.79688%203.64062%2011.0234%204.52344%2011.2109%205.89844H9.875C9.69531%205.23438%209.03906%204.77344%208.02344%204.77344C7.02344%204.77344%206.28906%205.28906%206.28906%206.03125V6.04688C6.28906%206.61719%206.71094%206.97656%207.70313%207.21875L9%207.53125C10.5859%207.91406%2011.3516%208.60156%2011.3516%209.80469V9.82031C11.3516%2011.3203%209.89062%2012.3594%207.97656%2012.3594Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isReverseShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%221.26667%22%20y%3D%221.26667%22%20width%3D%2215.4667%22%20height%3D%2215.4667%22%20rx%3D%227.73333%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.533333%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20stroke%3D%22white%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M6.04688%2013.0503V4.95312H9.13874C10.6987%204.95312%2011.72%205.90706%2011.72%207.3604V7.37163C11.72%208.4939%2011.1083%209.36928%2010.0927%209.68912L11.9669%2013.0503H10.7829L9.04896%209.84624H7.05692V13.0503H6.04688ZM7.05692%208.94842H9.04896C10.0871%208.94842%2010.6763%208.3929%2010.6763%207.4053V7.39407C10.6763%206.42892%2010.0478%205.85094%209.00407%205.85094H7.05692V8.94842Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isMiddleActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1552", "middle-active")}
          tag="div"
        >
          {isShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20stroke%3D%22white%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222.29%202.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.97656%2012.3594C6.10156%2012.3594%204.8125%2011.4531%204.65625%2010.0625H6.04688C6.27344%2010.7656%206.94531%2011.2266%208.02344%2011.2266C9.15625%2011.2266%209.96094%2010.6875%209.96094%209.92188V9.90625C9.96094%209.33594%209.53125%208.9375%208.49219%208.6875L7.1875%208.375C5.60938%208%204.89844%207.3125%204.89844%206.10156V6.09375C4.89844%204.69531%206.24219%203.64062%208.03125%203.64062C9.79688%203.64062%2011.0234%204.52344%2011.2109%205.89844H9.875C9.69531%205.23438%209.03906%204.77344%208.02344%204.77344C7.02344%204.77344%206.28906%205.28906%206.28906%206.03125V6.04688C6.28906%206.61719%206.71094%206.97656%207.70313%207.21875L9%207.53125C10.5859%207.91406%2011.3516%208.60156%2011.3516%209.80469V9.82031C11.3516%2011.3203%209.89062%2012.3594%207.97656%2012.3594Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isReverseShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%221.26667%22%20y%3D%221.26667%22%20width%3D%2215.4667%22%20height%3D%2215.4667%22%20rx%3D%227.73333%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.533333%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20stroke%3D%22white%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M6.04688%2013.0503V4.95312H9.13874C10.6987%204.95312%2011.72%205.90706%2011.72%207.3604V7.37163C11.72%208.4939%2011.1083%209.36928%2010.0927%209.68912L11.9669%2013.0503H10.7829L9.04896%209.84624H7.05692V13.0503H6.04688ZM7.05692%208.94842H9.04896C10.0871%208.94842%2010.6763%208.3929%2010.6763%207.4053V7.39407C10.6763%206.42892%2010.0478%205.85094%209.00407%205.85094H7.05692V8.94842Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isEndActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1552", "end-active")}
          tag="div"
        >
          {isShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20stroke%3D%22white%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222.29%202.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.97656%2012.3594C6.10156%2012.3594%204.8125%2011.4531%204.65625%2010.0625H6.04688C6.27344%2010.7656%206.94531%2011.2266%208.02344%2011.2266C9.15625%2011.2266%209.96094%2010.6875%209.96094%209.92188V9.90625C9.96094%209.33594%209.53125%208.9375%208.49219%208.6875L7.1875%208.375C5.60938%208%204.89844%207.3125%204.89844%206.10156V6.09375C4.89844%204.69531%206.24219%203.64062%208.03125%203.64062C9.79688%203.64062%2011.0234%204.52344%2011.2109%205.89844H9.875C9.69531%205.23438%209.03906%204.77344%208.02344%204.77344C7.02344%204.77344%206.28906%205.28906%206.28906%206.03125V6.04688C6.28906%206.61719%206.71094%206.97656%207.70313%207.21875L9%207.53125C10.5859%207.91406%2011.3516%208.60156%2011.3516%209.80469V9.82031C11.3516%2011.3203%209.89062%2012.3594%207.97656%2012.3594Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isReverseShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%221.26667%22%20y%3D%221.26667%22%20width%3D%2215.4667%22%20height%3D%2215.4667%22%20rx%3D%227.73333%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.533333%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20stroke%3D%22white%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M6.04688%2013.0503V4.95312H9.13874C10.6987%204.95312%2011.72%205.90706%2011.72%207.3604V7.37163C11.72%208.4939%2011.1083%209.36928%2010.0927%209.68912L11.9669%2013.0503H10.7829L9.04896%209.84624H7.05692V13.0503H6.04688ZM7.05692%208.94842H9.04896C10.0871%208.94842%2010.6763%208.3929%2010.6763%207.4053V7.39407C10.6763%206.42892%2010.0478%205.85094%209.00407%205.85094H7.05692V8.94842Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isStart ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1553", "start")}
          tag="div"
        />
      ) : null}
      {isMiddle ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1553")}
          tag="div"
        />
      ) : null}
      {isEnd ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1553", "end")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
