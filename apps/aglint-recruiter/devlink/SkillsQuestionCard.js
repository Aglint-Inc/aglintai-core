"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SkillsQuestionCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1238":{"id":"e-1238","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-423","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1239"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"245657a2-9eb4-5692-e143-091152eee402","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"245657a2-9eb4-5692-e143-091152eee402","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695633997381},"e-1240":{"id":"e-1240","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-424","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1241"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"46d99625-9464-2c8a-5de8-59c67598e41b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"46d99625-9464-2c8a-5de8-59c67598e41b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695634355273},"e-1242":{"id":"e-1242","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-424","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1243"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"46d99625-9464-2c8a-5de8-59c67598e41d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"46d99625-9464-2c8a-5de8-59c67598e41d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695634421151},"e-1300":{"id":"e-1300","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-440","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1301"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d7ea651d-2f72-68c7-7ef2-34d79afee36e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d7ea651d-2f72-68c7-7ef2-34d79afee36e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695827110943},"e-1302":{"id":"e-1302","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-440","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1303"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8ae952a-098e-e142-7b17-1357095b8df5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8ae952a-098e-e142-7b17-1357095b8df5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695827157581},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-423":{"id":"a-423","title":"Skill Question Edit","actionItemGroups":[{"actionItems":[{"id":"a-423-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":0,"unit":""}},{"id":"a-423-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-423-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".slot-input-skill-question","selectorGuids":["affa1144-a391-a377-ca8f-088ce20dec9c"]},"widthValue":100,"widthUnit":"%","heightUnit":"AUTO","locked":false}},{"id":"a-423-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":0,"unit":""}},{"id":"a-423-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":1,"unit":""}},{"id":"a-423-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":"flex"}},{"id":"a-423-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695634001039},"a-424":{"id":"a-424","title":"Skill Question Edit Close","actionItemGroups":[{"actionItems":[{"id":"a-424-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".slot-input-skill-question","selectorGuids":["affa1144-a391-a377-ca8f-088ce20dec9c"]},"widthValue":0,"widthUnit":"%","heightUnit":"AUTO","locked":false}},{"id":"a-424-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":1,"unit":""}},{"id":"a-424-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":0,"unit":""}},{"id":"a-424-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".tog-dropdown-after-edit-wrapper","selectorGuids":["164c6378-8fc4-47b0-7d68-172d6b2d926d"]},"value":"none"}},{"id":"a-424-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".tog-dropdown-edit-wrapper","selectorGuids":["db8f224c-efb6-fefd-94b4-2eafe76a6be9"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695634001039},"a-440":{"id":"a-440","title":"Skill Input Question Close","actionItemGroups":[{"actionItems":[{"id":"a-440-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".correct-wrappers","selectorGuids":["fda8e435-2bc5-d413-de21-6a19adaa2a4e"]},"value":0,"unit":""}},{"id":"a-440-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".slot-input-form","selectorGuids":["60597497-5635-80e9-8ed0-ded634800601"]},"value":"none"}},{"id":"a-440-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".slot-input-form","selectorGuids":["60597497-5635-80e9-8ed0-ded634800601"]},"value":0,"unit":""}},{"id":"a-440-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".correct-wrappers","selectorGuids":["fda8e435-2bc5-d413-de21-6a19adaa2a4e"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695826966230},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SkillsQuestionCard({
  as: _Component = _Builtin.Block,
  textQuestion = "How do you see your values aligning with our company's culture?",
  onClickDislike = {},
  onClickLike = {},
  onClickEdit = {},
  onClickDelete = {},
  slotInput,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "dropdown-list-item-2")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "color-black-2")} tag="div">
        {textQuestion}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "tog-dropdown-block-2",
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
              "icon-24-2",
              "shadow-medium",
              "clickable"
            )}
            tag="div"
            {...onClickEdit}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3.2071%207.94427L8.27815%202.8732L7.57105%202.16609L2.5%207.23717V7.94427H3.2071ZM3.62132%208.94427H1.5V6.82297L7.2175%201.10543C7.4128%200.910168%207.72935%200.910168%207.9246%201.10543L9.33885%202.51964C9.5341%202.71491%209.5341%203.03149%209.33885%203.22675L3.62132%208.94427ZM1.5%209.94427H10.5V10.9443H1.5V9.94427Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "icon-24-2",
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-input-form")}
        tag="div"
      >
        {slotInput}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "correct-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "correct-div-wrappers")}
          data-w-id="d7ea651d-2f72-68c7-7ef2-34d79afee36e"
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%209.29289L10.6464%202.64645C10.8417%202.45118%2011.1583%202.45118%2011.3536%202.64645C11.5488%202.84171%2011.5488%203.15829%2011.3536%203.35355L4.35355%2010.3536C4.15829%2010.5488%203.84171%2010.5488%203.64645%2010.3536L0.646447%207.35355C0.451184%207.15829%200.451184%206.84171%200.646447%206.64645C0.841709%206.45118%201.15829%206.45118%201.35355%206.64645L4%209.29289Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "correct-div-wrappers")}
          data-w-id="f8ae952a-098e-e142-7b17-1357095b8df5"
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%209.35355C2.84171%209.54882%203.15829%209.54882%203.35355%209.35355L6%206.70711L8.64645%209.35355C8.84171%209.54882%209.15829%209.54882%209.35355%209.35355C9.54882%209.15829%209.54882%208.84171%209.35355%208.64645L6.70711%206L9.35355%203.35355C9.54882%203.15829%209.54882%202.84171%209.35355%202.64645C9.15829%202.45118%208.84171%202.45118%208.64645%202.64645L6%205.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L5.29289%206L2.64645%208.64645C2.45118%208.84171%202.45118%209.15829%202.64645%209.35355Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
