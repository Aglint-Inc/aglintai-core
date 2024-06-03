"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./EditableListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-846":{"id":"e-846","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-350","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-847"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"245657a2-9eb4-5692-e143-091152eee3fe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"245657a2-9eb4-5692-e143-091152eee3fe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694774729446},"e-847":{"id":"e-847","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-351","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-846"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"245657a2-9eb4-5692-e143-091152eee3fe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"245657a2-9eb4-5692-e143-091152eee3fe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694774729455},"e-1238":{"id":"e-1238","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-423","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1239"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"245657a2-9eb4-5692-e143-091152eee402","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"245657a2-9eb4-5692-e143-091152eee402","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695633997381},"e-1240":{"id":"e-1240","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-424","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1241"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"46d99625-9464-2c8a-5de8-59c67598e41b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"46d99625-9464-2c8a-5de8-59c67598e41b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695634355273},"e-1242":{"id":"e-1242","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-424","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1243"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"46d99625-9464-2c8a-5de8-59c67598e41d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"46d99625-9464-2c8a-5de8-59c67598e41d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695634421151}},"actionLists":{"a-350":{"id":"a-350","title":"animated-visibility-[visible]","actionItemGroups":[{"actionItems":[{"id":"a-350-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":"none"}},{"id":"a-350-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-350-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":"block"}}]},{"actionItems":[{"id":"a-350-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694774801863},"a-351":{"id":"a-351","title":"animated-visibility-[hide]","actionItemGroups":[{"actionItems":[{"id":"a-351-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-351-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".animated-visibility","selectorGuids":["b465c2d0-5f41-a63d-5c95-d1075545ad3c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694774801863},"a-423":{"id":"a-423","title":"Skill Question Edit","actionItemGroups":[{"actionItems":[{"id":"a-423-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":0,"unit":""}},{"id":"a-423-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-423-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".slot-input-skill-question","selectorGuids":["affa1144-a391-a377-ca8f-088ce20dec9c"]},"widthValue":100,"widthUnit":"%","heightUnit":"AUTO","locked":false}},{"id":"a-423-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":0,"unit":""}},{"id":"a-423-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":1,"unit":""}},{"id":"a-423-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":"flex"}},{"id":"a-423-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695634001039},"a-424":{"id":"a-424","title":"Skill Question Edit Close","actionItemGroups":[{"actionItems":[{"id":"a-424-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".slot-input-skill-question","selectorGuids":["affa1144-a391-a377-ca8f-088ce20dec9c"]},"widthValue":0,"widthUnit":"%","heightUnit":"AUTO","locked":false}},{"id":"a-424-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":1,"unit":""}},{"id":"a-424-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":0,"unit":""}},{"id":"a-424-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":"none"}},{"id":"a-424-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695634001039}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function EditableListItem({
  as: _Component = _Builtin.Block,
  colorBlackText = "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis?",
  onClickDelete = {},
  onClickSave = {},
  onClickCancel = {},
  slotInput,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "dropdown-list-item")}
      data-w-id="245657a2-9eb4-5692-e143-091152eee3fe"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "text-wrappers-question-skill")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "color-black")} tag="div">
          {colorBlackText}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-input-skill-question")}
          tag="div"
        >
          {slotInput}
        </_Builtin.Block>
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
            data-w-id="245657a2-9eb4-5692-e143-091152eee402"
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
            {...onClickDelete}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%202V1C4%200.423858%204.42386%200%205%200H7C7.57614%200%208%200.423858%208%201V2H10C10.2761%202%2010.5%202.22386%2010.5%202.5C10.5%202.77614%2010.2761%203%2010%203H7.5H4.5H2C1.72386%203%201.5%202.77614%201.5%202.5C1.5%202.22386%201.72386%202%202%202H4ZM7%202V1H5V2H7ZM5%209.5C5%209.77614%204.77614%2010%204.5%2010C4.22386%2010%204%209.77614%204%209.5V5C4%204.72386%204.22386%204.5%204.5%204.5C4.77614%204.5%205%204.72386%205%205V9.5ZM8%209.5C8%209.77614%207.77614%2010%207.5%2010C7.22386%2010%207%209.77614%207%209.5V5C7%204.72386%207.22386%204.5%207.5%204.5C7.77614%204.5%208%204.72386%208%205V9.5ZM2%204.5C2%204.22386%202.22386%204%202.5%204C2.77614%204%203%204.22386%203%204.5V11H9V4.5C9%204.22386%209.22386%204%209.5%204C9.77614%204%2010%204.22386%2010%204.5V11C10%2011.5761%209.57614%2012%209%2012H3C2.42386%2012%202%2011.5761%202%2011V4.5Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tog-dropdown-after-edit-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "icon-24",
              "shadow-medium",
              "clickable"
            )}
            data-w-id="46d99625-9464-2c8a-5de8-59c67598e41b"
            tag="div"
            {...onClickSave}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M14.6464%202.64645C14.8417%202.45118%2015.1583%202.45118%2015.3536%202.64645C15.5488%202.84171%2015.5488%203.15829%2015.3536%203.35355L5.35355%2013.3536C5.15829%2013.5488%204.84171%2013.5488%204.64645%2013.3536L0.646447%209.35355C0.451184%209.15829%200.451184%208.84171%200.646447%208.64645C0.841709%208.45118%201.15829%208.45118%201.35355%208.64645L5%2012.2929L14.6464%202.64645Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "icon-24",
              "shadow-medium",
              "clickable"
            )}
            data-w-id="46d99625-9464-2c8a-5de8-59c67598e41d"
            tag="div"
            {...onClickCancel}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3Cmask%20id%3D%22mask0_9268_40225%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_9268_40225)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
