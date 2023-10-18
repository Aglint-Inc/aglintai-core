import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CandidateStatusDropdown.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-21":{"id":"e-21","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-10","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-22"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"00e31f4b-1ffa-93eb-d6c9-87f6beba1a08","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"00e31f4b-1ffa-93eb-d6c9-87f6beba1a08","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696413609252},"e-22":{"id":"e-22","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-21"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"00e31f4b-1ffa-93eb-d6c9-87f6beba1a08","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"00e31f4b-1ffa-93eb-d6c9-87f6beba1a08","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696413609252}},"actionLists":{"a-10":{"id":"a-10","title":"ac-dropdown-[open] 2","actionItemGroups":[{"actionItems":[{"id":"a-10-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ac-dropdown-content-2","selectorGuids":["221297d0-3bf4-43ec-e7e8-810855a0ee3e"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-10-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ac-dropdown-content-2","selectorGuids":["221297d0-3bf4-43ec-e7e8-810855a0ee3e"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695992309043},"a-11":{"id":"a-11","title":"ac-dropdown-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ac-dropdown-content-2","selectorGuids":["221297d0-3bf4-43ec-e7e8-810855a0ee3e"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695992372694}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateStatusDropdown({
  as: _Component = _Builtin.Block,
  slotOptions,
  title = "Applied",
  onClick = {},
  arrowProps = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "add-candidates-dropdown-2")}
      data-w-id="00e31f4b-1ffa-93eb-d6c9-87f6beba1a08"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ac-dropdown-trigger-2")}
        tag="div"
        {...onClick}
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {title}
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...arrowProps}>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64645%203.64645C1.82001%203.47288%202.08944%203.4536%202.28431%203.58859L2.35355%203.64645L6%207.293L9.64645%203.64645C9.82001%203.47288%2010.0894%203.4536%2010.2843%203.58859L10.3536%203.64645C10.5271%203.82001%2010.5464%204.08944%2010.4114%204.28431L10.3536%204.35355L6.35355%208.35355C6.17999%208.52712%205.91056%208.5464%205.71569%208.41141L5.64645%208.35355L1.64645%204.35355C1.45118%204.15829%201.45118%203.84171%201.64645%203.64645Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ac-dropdown-content-2")}
        tag="div"
      >
        {slotOptions}
      </_Builtin.Block>
    </_Component>
  );
}
