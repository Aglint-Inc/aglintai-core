import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AddScreeningQuestion.module.css";

const _interactionsData = JSON.parse(
<<<<<<< HEAD
  '{"events":{"e-1422":{"id":"e-1422","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-503","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1423"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dc064296-d4e2-a081-3cf6-36f11be5417d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"dc064296-d4e2-a081-3cf6-36f11be5417d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698931458264}},"actionLists":{"a-503":{"id":"a-503","title":"Assessment Video Overlay hover in 5","actionItemGroups":[{"actionItems":[{"id":"a-503-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-503-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]},{"actionItems":[{"id":"a-503-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":1,"unit":""}},{"id":"a-503-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698913183271}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
=======
  '{"events":{"e-1422":{"id":"e-1422","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-503","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1423"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dc064296-d4e2-a081-3cf6-36f11be5417d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698931458264}},"actionLists":{"a-503":{"id":"a-503","title":"Assessment Video Overlay hover in 5","actionItemGroups":[{"actionItems":[{"id":"a-503-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-503-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]},{"actionItems":[{"id":"a-503-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":1,"unit":""}},{"id":"a-503-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698913183271}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
>>>>>>> 93343c40fd4ec8c2c7ed3ae665ecc62da0695241
);

export function AddScreeningQuestion({
  as: _Component = _Builtin.Block,
  slotInput,
  onClickAdd = {},
  onClickCancel = {},
  isVideoVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "new-screening-video-wrap", "grey-100")}
      tag="div"
    >
      {isVideoVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "new-screen-intro-wrap")}
          data-w-id="dc064296-d4e2-a081-3cf6-36f11be5417d"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-video-welcome")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "empty-video-image")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6543935bed55bd03ed8b38f3_Rectangle%2029.svg"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-548")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-input-new-screen")}
          tag="div"
        >
          {slotInput}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "edit-delete-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
            tag="div"
            {...onClickAdd}
          >
            {"Add"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600", "cursor-pointer")}
            tag="div"
            {...onClickCancel}
          >
            {"Cancel"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
