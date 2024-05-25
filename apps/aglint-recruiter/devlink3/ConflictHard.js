"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ConflictReason } from "./ConflictReason";
import * as _utils from "./utils";
import _styles from "./ConflictHard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-79":{"id":"e-79","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-51","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-80"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"},"targets":[{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716455298207},"e-80":{"id":"e-80","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-79"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"},"targets":[{"selector":".tooltip_on_bottom","originalId":"b2e9dee4-b000-4ce4-52bf-f4679099b866","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716455298207}},"actionLists":{"a-51":{"id":"a-51","title":"Bottom Tooltip [show]","actionItemGroups":[{"actionItems":[{"id":"a-51-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"none"}},{"id":"a-51-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-51-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-51-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"flex"}}]},{"actionItems":[{"id":"a-51-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":1,"unit":""}},{"id":"a-51-n-6","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":1,"yValue":1,"locked":true}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716455303146},"a-52":{"id":"a-52","title":"Bottom Tooltip [hide]","actionItemGroups":[{"actionItems":[{"id":"a-52-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":0,"unit":""}},{"id":"a-52-n-6","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"xValue":0.95,"yValue":0.95,"locked":true}}]},{"actionItems":[{"id":"a-52-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".info_absolute","selectorGuids":["4da17e9f-3e1a-c3e5-825b-831924cbc27d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716455303146}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ConflictHard({
  as: _Component = _Builtin.Block,
  textConflict = "89",
  slotConflictReason,
  isHover = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "conflict", "is_hard", "tooltip_on_bottom")}
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%202.75C7.85938%202.76563%208.13281%202.92187%208.32031%203.21875L13.3828%2011.8438C13.5391%2012.1562%2013.5391%2012.4688%2013.3828%2012.7812C13.1953%2013.0781%2012.9219%2013.2344%2012.5625%2013.25H2.4375C2.07812%2013.2344%201.80469%2013.0781%201.61719%2012.7812C1.46094%2012.4688%201.46094%2012.1562%201.61719%2011.8438L6.70312%203.21875C6.89062%202.92187%207.15625%202.76563%207.5%202.75ZM7.5%205.75C7.15625%205.78125%206.96875%205.96875%206.9375%206.3125V8.9375C6.96875%209.28125%207.15625%209.46875%207.5%209.5C7.84375%209.46875%208.03125%209.28125%208.0625%208.9375V6.3125C8.03125%205.96875%207.84375%205.78125%207.5%205.75ZM8.25%2011C8.25%2010.7812%208.17969%2010.6016%208.03906%2010.4609C7.89844%2010.3203%207.71875%2010.25%207.5%2010.25C7.28125%2010.25%207.10156%2010.3203%206.96094%2010.4609C6.82031%2010.6016%206.75%2010.7812%206.75%2011C6.75%2011.2188%206.82031%2011.3984%206.96094%2011.5391C7.10156%2011.6797%207.28125%2011.75%207.5%2011.75C7.71875%2011.75%207.89844%2011.6797%208.03906%2011.5391C8.17969%2011.3984%208.25%2011.2188%208.25%2011Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
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
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%202.75C7.85938%202.76563%208.13281%202.92187%208.32031%203.21875L13.3828%2011.8438C13.5391%2012.1562%2013.5391%2012.4688%2013.3828%2012.7812C13.1953%2013.0781%2012.9219%2013.2344%2012.5625%2013.25H2.4375C2.07812%2013.2344%201.80469%2013.0781%201.61719%2012.7812C1.46094%2012.4688%201.46094%2012.1562%201.61719%2011.8438L6.70312%203.21875C6.89062%202.92187%207.15625%202.76563%207.5%202.75ZM7.5%205.75C7.15625%205.78125%206.96875%205.96875%206.9375%206.3125V8.9375C6.96875%209.28125%207.15625%209.46875%207.5%209.5C7.84375%209.46875%208.03125%209.28125%208.0625%208.9375V6.3125C8.03125%205.96875%207.84375%205.78125%207.5%205.75ZM8.25%2011C8.25%2010.7812%208.17969%2010.6016%208.03906%2010.4609C7.89844%2010.3203%207.71875%2010.25%207.5%2010.25C7.28125%2010.25%207.10156%2010.3203%206.96094%2010.4609C6.82031%2010.6016%206.75%2010.7812%206.75%2011C6.75%2011.2188%206.82031%2011.3984%206.96094%2011.5391C7.10156%2011.6797%207.28125%2011.75%207.5%2011.75C7.71875%2011.75%207.89844%2011.6797%208.03906%2011.5391C8.17969%2011.3984%208.25%2011.2188%208.25%2011Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text_hard_conflict")}
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
