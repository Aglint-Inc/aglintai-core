"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./BrowseAssessment.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function BrowseAssessment({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotBrowseCard,
  slotSearch,
  onClickAddSelectedTemplates = {},
  textTemplatesCount = "3 templates selected",
  isSelected = true,
  isYourAssessment = false,
  isAglintAssessment = false,
  onClickAglintAssessment = {},
  onClickYourAssessment = {},
  slotEmpty,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-1046")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1047")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tab_search_wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotSearch}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(
            _styles,
            "icons",
            "relative-1",
            "cursor-pointer"
          )}
          value="%3Csvg%20width%3D%2213%22%20height%3D%2216%22%20viewbox%3D%220%200%2013%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.5938%205.21875L8.28125%208.5L11.5938%2011.7812C11.7812%2011.9896%2011.875%2012.2292%2011.875%2012.5C11.875%2012.7708%2011.7812%2013.0104%2011.5938%2013.2188C11.3854%2013.4062%2011.1458%2013.5%2010.875%2013.5C10.6042%2013.5%2010.3646%2013.4062%2010.1562%2013.2188L6.875%209.90625L3.59375%2013.2188C3.38542%2013.4062%203.14583%2013.5%202.875%2013.5C2.60417%2013.5%202.36458%2013.4062%202.15625%2013.2188C1.96875%2013.0104%201.875%2012.7708%201.875%2012.5C1.875%2012.2292%201.96875%2011.9896%202.15625%2011.7812L5.46875%208.5L2.15625%205.21875C1.96875%205.01042%201.875%204.77083%201.875%204.5C1.875%204.22917%201.96875%203.98958%202.15625%203.78125C2.36458%203.59375%202.60417%203.5%202.875%203.5C3.14583%203.5%203.38542%203.59375%203.59375%203.78125L6.875%207.09375L10.1562%203.78125C10.3646%203.59375%2010.6042%203.5%2010.875%203.5C11.1458%203.5%2011.3854%203.59375%2011.5938%203.78125C11.7812%203.98958%2011.875%204.22917%2011.875%204.5C11.875%204.77083%2011.7812%205.01042%2011.5938%205.21875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickClose}
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotEmpty}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1049")}
        tag="div"
      >
        {slotBrowseCard}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22BrowseAssessment_div-block-1049__%22%5D%7B%0Aheight%3Acalc(100vh%20-%2062px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1050")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1051")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5%209C4.44772%209%204%208.55228%204%208C4%207.44772%204.44772%207%205%207H11C11.5523%207%2012%207.44772%2012%208C12%208.55228%2011.5523%209%2011%209H5Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{textTemplatesCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1052", "cursor-pointer")}
            tag="div"
            {...onClickAddSelectedTemplates}
          >
            <_Builtin.Block tag="div">
              {"Add selected templates"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
