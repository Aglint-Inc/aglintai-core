import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./EditableListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-846":{"id":"e-846","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-350","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-847"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"245657a2-9eb4-5692-e143-091152eee3fe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"245657a2-9eb4-5692-e143-091152eee3fe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694774729446},"e-847":{"id":"e-847","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-351","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-846"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"245657a2-9eb4-5692-e143-091152eee3fe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"245657a2-9eb4-5692-e143-091152eee3fe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694774729455}},"actionLists":{"a-350":{"id":"a-350","title":"animated-visibility-[visible]","actionItemGroups":[{"actionItems":[{"id":"a-350-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":"none"}},{"id":"a-350-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-350-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":"block"}}]},{"actionItems":[{"id":"a-350-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694774801863},"a-351":{"id":"a-351","title":"animated-visibility-[hide]","actionItemGroups":[{"actionItems":[{"id":"a-351-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-351-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694774801863}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function EditableListItem({
  as: _Component = _Builtin.Block,
  colorBlackText = "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis?",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "dropdown-list-item")}
      data-w-id="245657a2-9eb4-5692-e143-091152eee3fe"
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "color-black")} tag="div">
        {colorBlackText}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "tog-dropdown-block",
          "animated-visibility"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tog-dropdown-edit-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "icon-24",
              "shadow-medium",
              "clickable"
            )}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3.2071%207.94427L8.27815%202.8732L7.57105%202.16609L2.5%207.23717V7.94427H3.2071ZM3.62132%208.94427H1.5V6.82297L7.2175%201.10543C7.4128%200.910168%207.72935%200.910168%207.9246%201.10543L9.33885%202.51964C9.5341%202.71491%209.5341%203.03149%209.33885%203.22675L3.62132%208.94427ZM1.5%209.94427H10.5V10.9443H1.5V9.94427Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "icon-24",
              "shadow-medium",
              "clickable"
            )}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%202V1C4%200.423858%204.42386%200%205%200H7C7.57614%200%208%200.423858%208%201V2H10C10.2761%202%2010.5%202.22386%2010.5%202.5C10.5%202.77614%2010.2761%203%2010%203H7.5H4.5H2C1.72386%203%201.5%202.77614%201.5%202.5C1.5%202.22386%201.72386%202%202%202H4ZM7%202V1H5V2H7ZM5%209.5C5%209.77614%204.77614%2010%204.5%2010C4.22386%2010%204%209.77614%204%209.5V5C4%204.72386%204.22386%204.5%204.5%204.5C4.77614%204.5%205%204.72386%205%205V9.5ZM8%209.5C8%209.77614%207.77614%2010%207.5%2010C7.22386%2010%207%209.77614%207%209.5V5C7%204.72386%207.22386%204.5%207.5%204.5C7.77614%204.5%208%204.72386%208%205V9.5ZM2%204.5C2%204.22386%202.22386%204%202.5%204C2.77614%204%203%204.22386%203%204.5V11H9V4.5C9%204.22386%209.22386%204%209.5%204C9.77614%204%2010%204.22386%2010%204.5V11C10%2011.5761%209.57614%2012%209%2012H3C2.42386%2012%202%2011.5761%202%2011V4.5Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
