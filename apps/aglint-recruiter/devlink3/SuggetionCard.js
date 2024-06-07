"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SuggetionCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e":{"id":"e","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-2"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"43adaaae-1a1b-734e-b593-cfcafc2e1daf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"43adaaae-1a1b-734e-b593-cfcafc2e1daf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1708682613844},"e-2":{"id":"e-2","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-2","affectedElements":{},"playInReverse":false,"autoStopEventId":"e"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"43adaaae-1a1b-734e-b593-cfcafc2e1daf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"43adaaae-1a1b-734e-b593-cfcafc2e1daf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1708682613845}},"actionLists":{"a":{"id":"a","title":"Suggetioncard[hover]","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".send_icon","selectorGuids":["88b5c3ea-34f3-5284-6f6e-b1395f93683c"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".send_icon","selectorGuids":["88b5c3ea-34f3-5284-6f6e-b1395f93683c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".send_icon","selectorGuids":["88b5c3ea-34f3-5284-6f6e-b1395f93683c"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".send_icon","selectorGuids":["88b5c3ea-34f3-5284-6f6e-b1395f93683c"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1708682616541},"a-2":{"id":"a-2","title":"Suggetioncard[hover out]","actionItemGroups":[{"actionItems":[{"id":"a-2-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".send_icon","selectorGuids":["88b5c3ea-34f3-5284-6f6e-b1395f93683c"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-2-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".send_icon","selectorGuids":["88b5c3ea-34f3-5284-6f6e-b1395f93683c"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1708682616541}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SuggetionCard({
  as: _Component = _Builtin.Block,
  onClickCard = {},
  textSuggestion = "Specific areas of expertise or technical skills that seem to be in high demand among the new applicants.",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "suggetion_card")}
      id={_utils.cx(
        _styles,
        "w-node-_43adaaae-1a1b-734e-b593-cfcafc2e1daf-fc2e1daf"
      )}
      data-w-id="43adaaae-1a1b-734e-b593-cfcafc2e1daf"
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block className={_utils.cx(_styles, "send_icon")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%224%22%20fill%3D%22url(%23paint0_linear_5346_88517)%22%2F%3E%0A%3Cpath%20d%3D%22M10.3594%207.14062L12.8594%209.64062C12.9531%209.74479%2013%209.86458%2013%2010C13%2010.1354%2012.9531%2010.2552%2012.8594%2010.3594C12.7552%2010.4531%2012.6354%2010.5%2012.5%2010.5C12.3646%2010.5%2012.2448%2010.4531%2012.1406%2010.3594L10.5%208.70312V13.5C10.5%2013.6458%2010.4531%2013.7656%2010.3594%2013.8594C10.2656%2013.9531%2010.1458%2014%2010%2014C9.85417%2014%209.73438%2013.9531%209.64062%2013.8594C9.54688%2013.7656%209.5%2013.6458%209.5%2013.5V8.70312L7.85938%2010.3594C7.75521%2010.4531%207.63542%2010.5%207.5%2010.5C7.36458%2010.5%207.24479%2010.4531%207.14062%2010.3594C7.04688%2010.2552%207%2010.1354%207%2010C7%209.86458%207.04688%209.74479%207.14062%209.64062L9.64062%207.14062C9.74479%207.04688%209.86458%207%2010%207C10.1354%207%2010.2552%207.04688%2010.3594%207.14062Z%22%20fill%3D%22white%22%2F%3E%0A%3Cdefs%3E%0A%3Clineargradient%20id%3D%22paint0_linear_5346_88517%22%20x1%3D%2220%22%20y1%3D%220%22%20x2%3D%22-2.7644%22%20y2%3D%2224.9216%22%20gradientunits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%23FF6224%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23FF6224%22%20stop-opacity%3D%220.51%22%2F%3E%0A%3C%2Flineargradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A%0A%3Cstyle%3E%0A.four_line_clamp%7B%0Aoverflow%3A%20hidden%3B%0A%20%20display%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%204%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20line-height%3A%201.5%20!important%3B%0A%20%20max-height%3A%20calc(1%20*%204)%3B%0A%7D%0A%3C%2Fstyle%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "four_line_clamp")}
        tag="div"
      >
        {textSuggestion}
      </_Builtin.Block>
    </_Component>
  );
}
