"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ConflictOnVacation.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-79":{"id":"e-79","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-80"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"},"targets":[{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716455298207},"e-80":{"id":"e-80","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-79"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"},"targets":[{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716455298207}},"actionLists":{"a-51":{"id":"a-51","title":"Bottom Tooltip [show]","actionItemGroups":[{"actionItems":[{"id":"a-51-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"none"}},{"id":"a-51-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-51-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-51-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"flex"}}]},{"actionItems":[{"id":"a-51-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":1,"unit":""}},{"id":"a-51-n-6","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":1,"yValue":1,"locked":true}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716455303146},"a-52":{"id":"a-52","title":"Bottom Tooltip [hide]","actionItemGroups":[{"actionItems":[{"id":"a-52-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":0,"unit":""}},{"id":"a-52-n-6","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":0.95,"yValue":0.95,"locked":true}}]},{"actionItems":[{"id":"a-52-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716455303146}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ConflictOnVacation({
  as: _Component = _Builtin.Block,
  textConflict = "conflict count / conflict message",
  textReason = "some reasons for the conflict wll appar here. i e committed to another schedule",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(
        _styles,
        "conflict",
        "is_onvacation",
        "tooltip_on_bottom"
      )}
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.16406%204.13281C3.05469%204.02344%202.94531%204.02344%202.83594%204.13281L2.39062%204.90625C2.34375%204.96875%202.28906%205%202.22656%205H1.125C0.890625%204.98438%200.78125%204.85938%200.796875%204.625C0.890625%204.03125%201.24219%203.45312%201.85156%202.89062C2.44531%202.34375%203.32812%202.04688%204.5%202C5.53125%202.03125%206.33594%202.26562%206.91406%202.70312C7.50781%203.15625%207.89844%203.65625%208.08594%204.20312C8.67969%203.76562%209.48438%203.53125%2010.5%203.5C11.6719%203.54688%2012.5547%203.84375%2013.1484%204.39062C13.7578%204.95312%2014.1094%205.53125%2014.2031%206.125C14.2188%206.35938%2014.1094%206.48438%2013.875%206.5H12.7734C12.7109%206.5%2012.6641%206.46875%2012.6328%206.40625L12.1641%205.63281C12.0547%205.52344%2011.9453%205.52344%2011.8359%205.63281L11.3906%206.40625C11.3438%206.46875%2011.2891%206.5%2011.2266%206.5H8.25C8.60938%207.51562%208.85938%208.61719%209%209.80469C9.14062%2010.9922%209.14062%2012.1719%209%2013.3438C8.90625%2013.75%208.65625%2013.9688%208.25%2014H6.75C6.5%2014%206.29688%2013.8984%206.14062%2013.6953C6%2013.4922%205.96094%2013.2734%206.02344%2013.0391C6.38281%2011.8672%206.61719%2010.8594%206.72656%2010.0156C6.83594%209.1875%206.85938%208.5%206.79688%207.95312C6.75%207.46875%206.67188%207.10156%206.5625%206.85156L3.32812%2010.0859C3.14062%2010.2422%202.97656%2010.2344%202.83594%2010.0625C2.47656%209.57812%202.3125%208.92188%202.34375%208.09375C2.375%207.28125%202.78906%206.44531%203.58594%205.58594C3.63281%205.53906%203.67969%205.49219%203.72656%205.44531C3.77344%205.41406%203.82031%205.375%203.86719%205.32812L3.16406%204.13281Z%22%20fill%3D%22%235EAE91%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block tag="div">{textConflict}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "info_absolute", "top_32")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textReason}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
