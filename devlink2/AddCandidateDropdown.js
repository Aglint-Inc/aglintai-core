import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AddCandidateDropdown.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-5":{"id":"e-5","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-2","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-6"}},"mediaQueries":["main"],"target":{"id":"edd98ae4-5ea0-a7bb-af24-b123c27eacc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"edd98ae4-5ea0-a7bb-af24-b123c27eacc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695992442274},"e-6":{"id":"e-6","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-5"}},"mediaQueries":["main"],"target":{"id":"edd98ae4-5ea0-a7bb-af24-b123c27eacc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"edd98ae4-5ea0-a7bb-af24-b123c27eacc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695992442274},"e-31":{"id":"e-31","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-2","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-32"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"edd98ae4-5ea0-a7bb-af24-b123c27eacc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"edd98ae4-5ea0-a7bb-af24-b123c27eacc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697215591737},"e-32":{"id":"e-32","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-31"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"edd98ae4-5ea0-a7bb-af24-b123c27eacc6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"edd98ae4-5ea0-a7bb-af24-b123c27eacc6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697215591738}},"actionLists":{"a-2":{"id":"a-2","title":"ac-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-2-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ac-dropdown-content","selectorGuids":["37e31ec8-14e9-7762-0efa-49cacf1193a1"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-2-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ac-dropdown-content","selectorGuids":["37e31ec8-14e9-7762-0efa-49cacf1193a1"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695992309043},"a-3":{"id":"a-3","title":"ac-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ac-dropdown-content","selectorGuids":["37e31ec8-14e9-7762-0efa-49cacf1193a1"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695992372694}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AddCandidateDropdown({
  as: _Component = _Builtin.Block,
  onClickManual = {},
  onClickImport = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "add-candidates-dropdown")}
      data-w-id="edd98ae4-5ea0-a7bb-af24-b123c27eacc6"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ac-dropdown-trigger")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.99815%2011.5433C1.97423%2011.8184%201.73182%2012.022%201.45672%2011.9981C1.18161%2011.9742%200.977987%2011.7318%201.00191%2011.4567C1.22227%208.92255%203.41465%207%206.00003%207C8.58541%207%2010.7778%208.92255%2010.9981%2011.4567C11.0221%2011.7318%2010.8184%2011.9742%2010.5433%2011.9981C10.2682%2012.022%2010.0258%2011.8184%2010.0019%2011.5433C9.82734%209.53574%208.07605%208%206.00003%208C3.92401%208%202.17272%209.53574%201.99815%2011.5433ZM6.00003%206C4.34318%206%203.00003%204.65685%203.00003%203C3.00003%201.34315%204.34318%200%206.00003%200C7.65688%200%209.00003%201.34315%209.00003%203C9.00003%204.65685%207.65688%206%206.00003%206ZM6.00003%205C7.1046%205%208.00003%204.10457%208.00003%203C8.00003%201.89543%207.1046%201%206.00003%201C4.89546%201%204.00003%201.89543%204.00003%203C4.00003%204.10457%204.89546%205%206.00003%205Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-600")}
          tag="div"
        >
          {"Add Candidates"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64645%203.64645C1.82001%203.47288%202.08944%203.4536%202.28431%203.58859L2.35355%203.64645L6%207.293L9.64645%203.64645C9.82001%203.47288%2010.0894%203.4536%2010.2843%203.58859L10.3536%203.64645C10.5271%203.82001%2010.5464%204.08944%2010.4114%204.28431L10.3536%204.35355L6.35355%208.35355C6.17999%208.52712%205.91056%208.5464%205.71569%208.41141L5.64645%208.35355L1.64645%204.35355C1.45118%204.15829%201.45118%203.84171%201.64645%203.64645Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ac-dropdown-content")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ac-button")}
          tag="div"
          {...onClickManual}
        >
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{"Add Manually"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ac-button")}
          tag="div"
          {...onClickImport}
        >
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.14645%208.35355C4.34171%208.54882%204.65829%208.54882%204.85355%208.35355L6%207.20711V10.5C6%2010.7761%206.22386%2011%206.5%2011C6.77614%2011%207%2010.7761%207%2010.5V7.27465L8.15732%208.3641C8.35841%208.55336%208.67484%208.54377%208.8641%208.34268C9.05336%208.1416%209.04377%207.82516%208.84268%207.6359L7.14268%206.0359C6.75829%205.65118%206.14171%205.65118%205.74645%206.04645L4.14645%207.64645C3.95118%207.84171%203.95118%208.15829%204.14645%208.35355ZM12%207.3C12%209.26845%2010.49%2010.8838%208.52936%2010.9991C8.25369%2011.0154%208.01708%2010.805%208.00086%2010.5294C7.98465%2010.2537%208.19497%2010.0171%208.47064%2010.0009C9.90081%209.91674%2011%208.74086%2011%207.3C11%205.77614%209.72386%204.5%208.2%204.5H7.49579L7.4111%204.10476C7.15552%202.91206%206.04077%202%204.8%202C3.27614%202%202%203.27614%202%204.8C2%205.08896%202.06495%205.41372%202.17434%205.74189L2.30396%206.13075L1.94807%206.33412C1.3798%206.65885%201%207.30674%201%208C1%209.12386%201.87614%2010%203%2010H4.5C4.77614%2010%205%2010.2239%205%2010.5C5%2010.7761%204.77614%2011%204.5%2011H3C1.32386%2011%200%209.67614%200%208C0%207.08644%200.431032%206.22957%201.11806%205.69065C1.04287%205.39081%201%205.09183%201%204.8C1%202.72386%202.72386%201%204.8%201C6.37532%201%207.78646%202.04975%208.27994%203.50085C10.3202%203.54441%2012%205.25056%2012%207.3Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{"Import Candidates"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
