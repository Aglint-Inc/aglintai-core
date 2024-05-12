import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AssessmentScore.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-141":{"id":"e-141","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-89","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560091},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-90","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560092},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-91","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-144"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711117013504}},"actionLists":{"a-89":{"id":"a-89","title":"copy-hover in invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-89-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}},{"id":"a-89-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-89-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"flex"}},{"id":"a-89-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}},{"id":"a-89-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711116769518},"a-90":{"id":"a-90","title":"copy-hover out invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-90-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}},{"id":"a-90-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711116769518},"a-91":{"id":"a-91","title":"CLick Copied Invitation Link","actionItemGroups":[{"actionItems":[{"id":"a-91-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-91-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}}]},{"actionItems":[{"id":"a-91-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"block"}},{"id":"a-91-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711117027368}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AssessmentScore({
  as: _Component = _Builtin.Block,
  textScore = "--",
  props = {},
  isError = false,
  isScoreVisible = true,
  isDurationVisible = true,
  textDuration = "--",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "assessment-score-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "assessment-score")}
        tag="div"
        {...props}
      >
        <_Builtin.Block className={_utils.cx(_styles, "icon-block")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%229%22%20height%3D%2212%22%20viewBox%3D%220%200%209%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.44531%200.140625C6.55469%200.046875%206.67969%200%206.82031%200C7.03906%200.015625%207.20312%200.101562%207.3125%200.257812C7.42188%200.414063%207.44531%200.585938%207.38281%200.773438L5.78906%205.25H8.36719C8.53906%205.25%208.6875%205.3125%208.8125%205.4375C8.9375%205.5625%209%205.71094%209%205.88281C9%206.07031%208.92969%206.22656%208.78906%206.35156L2.55469%2011.8594C2.44531%2011.9531%202.32031%2012%202.17969%2012C1.96094%2011.9844%201.79688%2011.8984%201.6875%2011.7422C1.57812%2011.5859%201.55469%2011.4141%201.61719%2011.2266L3.21094%206.75H0.609375C0.234375%206.71875%200.03125%206.51562%200%206.14062C0%205.96875%200.0703125%205.82031%200.210938%205.69531L6.44531%200.140625ZM6.44531%201.14844L0.984375%206H3.75C3.875%206%203.97656%206.05469%204.05469%206.16406C4.13281%206.27344%204.14844%206.38281%204.10156%206.49219L2.55469%2010.875L8.0625%206H5.25C5.125%206%205.02344%205.94531%204.94531%205.83594C4.86719%205.72656%204.85156%205.61719%204.89844%205.50781L6.44531%201.14844Z%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        {isScoreVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textScore}
          </_Builtin.Block>
        ) : null}
        {isError ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%203.5C10.4792%203.52083%2010.8438%203.72917%2011.0938%204.125L17.8438%2015.625C18.0521%2016.0417%2018.0521%2016.4583%2017.8438%2016.875C17.5938%2017.2708%2017.2292%2017.4792%2016.75%2017.5H3.25C2.77083%2017.4792%202.40625%2017.2708%202.15625%2016.875C1.94792%2016.4583%201.94792%2016.0417%202.15625%2015.625L8.9375%204.125C9.1875%203.72917%209.54167%203.52083%2010%203.5ZM10%207.5C9.54167%207.54167%209.29167%207.79167%209.25%208.25V11.75C9.29167%2012.2083%209.54167%2012.4583%2010%2012.5C10.4583%2012.4583%2010.7083%2012.2083%2010.75%2011.75V8.25C10.7083%207.79167%2010.4583%207.54167%2010%207.5ZM11%2014.5C11%2014.2083%2010.9062%2013.9688%2010.7188%2013.7812C10.5312%2013.5938%2010.2917%2013.5%2010%2013.5C9.70833%2013.5%209.46875%2013.5938%209.28125%2013.7812C9.09375%2013.9688%209%2014.2083%209%2014.5C9%2014.7917%209.09375%2015.0312%209.28125%2015.2188C9.46875%2015.4062%209.70833%2015.5%2010%2015.5C10.2917%2015.5%2010.5312%2015.4062%2010.7188%2015.2188C10.9062%2015.0312%2011%2014.7917%2011%2014.5Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isDurationVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-gray-600")}
          tag="div"
        >
          {textDuration}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
