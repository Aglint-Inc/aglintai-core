import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./DraftCoverBtn.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-750":{"id":"e-750","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-321","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-751"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2633aea2-638a-1625-363f-2dc4c02743f3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2633aea2-638a-1625-363f-2dc4c02743f3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692610189079}},"actionLists":{"a-321":{"id":"a-321","title":"cover-popup-[open]","actionItemGroups":[{"actionItems":[{"id":"a-321-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"none"}},{"id":"a-321-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":0,"unit":""}},{"id":"a-321-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-321-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"flex"}}]},{"actionItems":[{"id":"a-321-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-321-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1692610196403}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function DraftCoverBtn({
  as: _Component = _Builtin.Block,
  draftBtnProps = {},
  isDisabled = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "button-with-icon")}
      data-w-id="2633aea2-638a-1625-363f-2dc4c02743f3"
      tag="div"
      {...draftBtnProps}
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "cover-glitter-icon")}
        loading="lazy"
        width="auto"
        height="auto"
        alt="__wf_reserved_inherit"
        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901dd_glitter.png"
      />
      <_Builtin.Block className={_utils.cx(_styles, "text-kale-800")} tag="div">
        {"Draft Cover Letter"}
      </_Builtin.Block>
      {isDisabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-239")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
