import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ScreeningQuestionLoader.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1420":{"id":"e-1420","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-502","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1421"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5185a2c8-d850-23b5-9d41-285ce5647aab","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5185a2c8-d850-23b5-9d41-285ce5647aab","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698927391146}},"actionLists":{"a-502":{"id":"a-502","title":"Assessment Video Overlay hover in 4","actionItemGroups":[{"actionItems":[{"id":"a-502-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-502-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]},{"actionItems":[{"id":"a-502-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":1,"unit":""}},{"id":"a-502-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698913183271}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScreeningQuestionLoader({
  as: _Component = _Builtin.Block,
  isVideoVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "new-screening-video-wrap")}
      tag="div"
    >
      {isVideoVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "new-screen-intro-wrap")}
          data-w-id="5185a2c8-d850-23b5-9d41-285ce5647aab"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-video-welcome")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-548")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "skeloton-screening")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-width-100")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-item")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-width-80")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-item")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-width-60")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-item")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-552")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skleton-screening-btn")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-item")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "skleton-screening-btn")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-item")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
