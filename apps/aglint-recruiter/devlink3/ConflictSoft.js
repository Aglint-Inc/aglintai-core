"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ConflictReason } from "./ConflictReason";
import * as _utils from "./utils";
import _styles from "./ConflictSoft.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-79":{"id":"e-79","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-80"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"},"targets":[{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716455298207},"e-80":{"id":"e-80","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-79"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"},"targets":[{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716455298207}},"actionLists":{"a-51":{"id":"a-51","title":"Bottom Tooltip [show]","actionItemGroups":[{"actionItems":[{"id":"a-51-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"none"}},{"id":"a-51-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-51-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-51-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"flex"}}]},{"actionItems":[{"id":"a-51-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":1,"unit":""}},{"id":"a-51-n-6","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":1,"yValue":1,"locked":true}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716455303146},"a-52":{"id":"a-52","title":"Bottom Tooltip [hide]","actionItemGroups":[{"actionItems":[{"id":"a-52-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":0,"unit":""}},{"id":"a-52-n-6","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":0.95,"yValue":0.95,"locked":true}}]},{"actionItems":[{"id":"a-52-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716455303146}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ConflictSoft({
  as: _Component = _Builtin.Block,
  textConflict = "05",
  slotConflictReason,
  isHover = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "conflict", "issoft", "tooltip_on_bottom")}
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%2014C6.40625%2013.9844%205.40625%2013.7188%204.5%2013.2031C3.59375%2012.6719%202.85938%2011.9375%202.29688%2011C1.76562%2010.0469%201.5%209.04688%201.5%208C1.5%206.95312%201.76562%205.95312%202.29688%205C2.85938%204.0625%203.59375%203.32813%204.5%202.79688C5.40625%202.28125%206.40625%202.01563%207.5%202C8.59375%202.01563%209.59375%202.28125%2010.5%202.79688C11.4062%203.32813%2012.1406%204.0625%2012.7031%205C13.2344%205.95312%2013.5%206.95312%2013.5%208C13.5%209.04688%2013.2344%2010.0469%2012.7031%2011C12.1406%2011.9375%2011.4062%2012.6719%2010.5%2013.2031C9.59375%2013.7188%208.59375%2013.9844%207.5%2014ZM7.5%205C7.15625%205.03125%206.96875%205.21875%206.9375%205.5625V8.1875C6.96875%208.53125%207.15625%208.71875%207.5%208.75C7.84375%208.71875%208.03125%208.53125%208.0625%208.1875V5.5625C8.03125%205.21875%207.84375%205.03125%207.5%205ZM6.75%2010.25C6.75%2010.4688%206.82031%2010.6484%206.96094%2010.7891C7.10156%2010.9297%207.28125%2011%207.5%2011C7.71875%2011%207.89844%2010.9297%208.03906%2010.7891C8.17969%2010.6484%208.25%2010.4688%208.25%2010.25C8.25%2010.0312%208.17969%209.85156%208.03906%209.71094C7.89844%209.57031%207.71875%209.5%207.5%209.5C7.28125%209.5%207.10156%209.57031%206.96094%209.71094C6.82031%209.85156%206.75%2010.0312%206.75%2010.25Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block tag="div">{textConflict}</_Builtin.Block>
      {isHover ? (
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "info_absolute",
            "top_32",
            "move_to_top"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "tooltip_content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict_title")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%2014C6.40625%2013.9844%205.40625%2013.7188%204.5%2013.2031C3.59375%2012.6719%202.85938%2011.9375%202.29688%2011C1.76562%2010.0469%201.5%209.04688%201.5%208C1.5%206.95312%201.76562%205.95312%202.29688%205C2.85938%204.0625%203.59375%203.32813%204.5%202.79688C5.40625%202.28125%206.40625%202.01563%207.5%202C8.59375%202.01563%209.59375%202.28125%2010.5%202.79688C11.4062%203.32813%2012.1406%204.0625%2012.7031%205C13.2344%205.95312%2013.5%206.95312%2013.5%208C13.5%209.04688%2013.2344%2010.0469%2012.7031%2011C12.1406%2011.9375%2011.4062%2012.6719%2010.5%2013.2031C9.59375%2013.7188%208.59375%2013.9844%207.5%2014ZM7.5%205C7.15625%205.03125%206.96875%205.21875%206.9375%205.5625V8.1875C6.96875%208.53125%207.15625%208.71875%207.5%208.75C7.84375%208.71875%208.03125%208.53125%208.0625%208.1875V5.5625C8.03125%205.21875%207.84375%205.03125%207.5%205ZM6.75%2010.25C6.75%2010.4688%206.82031%2010.6484%206.96094%2010.7891C7.10156%2010.9297%207.28125%2011%207.5%2011C7.71875%2011%207.89844%2010.9297%208.03906%2010.7891C8.17969%2010.6484%208.25%2010.4688%208.25%2010.25C8.25%2010.0312%208.17969%209.85156%208.03906%209.71094C7.89844%209.57031%207.71875%209.5%207.5%209.5C7.28125%209.5%207.10156%209.57031%206.96094%209.71094C6.82031%209.85156%206.75%2010.0312%206.75%2010.25Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "soft_conflict_text")}
                tag="div"
              >
                {"Outside Work hours"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict_resons")}
              tag="div"
            >
              {slotConflictReason ?? <ConflictReason />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "is_normal_cursor")}
        tag="div"
      />
    </_Component>
  );
}
