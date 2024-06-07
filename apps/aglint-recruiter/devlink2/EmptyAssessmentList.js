"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./EmptyAssessmentList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function EmptyAssessmentList({
  as: _Component = _Builtin.Block,
  onClickBrowseAssessment = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1032")}
      tag="div"
      {...onClickBrowseAssessment}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1034")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2215%22%20height%3D%2220%22%20viewbox%3D%220%200%2015%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.7749%202.75C5.6749%203.025%205.4749%203.175%205.1749%203.2H4.4999C4.1249%203.225%203.9249%203.425%203.8999%203.8V5H7.4999H11.0999V3.8C11.0749%203.425%2010.8749%203.225%2010.4999%203.2H9.8249C9.5249%203.175%209.3374%203.025%209.2624%202.75C9.1374%202.35%208.9249%202.025%208.6249%201.775C8.2999%201.525%207.9249%201.4%207.4999%201.4C7.0749%201.4%206.6999%201.525%206.3749%201.775C6.0749%202.025%205.8749%202.35%205.7749%202.75ZM7.4999%200.199999C8.1249%200.199999%208.6749%200.362499%209.1499%200.687499C9.6499%201.0125%2010.0124%201.45%2010.2374%202H10.4999C11.3249%202.05%2011.8874%202.45%2012.1874%203.2H12.2999C12.9749%203.225%2013.5374%203.4625%2013.9874%203.9125C14.4374%204.3625%2014.6749%204.925%2014.6999%205.6V17C14.6749%2017.675%2014.4374%2018.2375%2013.9874%2018.6875C13.5374%2019.1375%2012.9749%2019.375%2012.2999%2019.4H2.6999C2.0249%2019.375%201.4624%2019.1375%201.0124%2018.6875C0.562402%2018.2375%200.324902%2017.675%200.299902%2017V5.6C0.324902%204.925%200.562402%204.3625%201.0124%203.9125C1.4624%203.4625%202.0249%203.225%202.6999%203.2H2.8124C3.1124%202.45%203.6749%202.05%204.4999%202H4.7624C4.9874%201.45%205.3499%201.0125%205.8499%200.687499C6.3249%200.362499%206.8749%200.199999%207.4999%200.199999ZM12.2999%204.4V5C12.2999%205.35%2012.1874%205.6375%2011.9624%205.8625C11.7374%206.0875%2011.4499%206.2%2011.0999%206.2H7.4999H3.8999C3.5499%206.2%203.2624%206.0875%203.0374%205.8625C2.8124%205.6375%202.6999%205.35%202.6999%205V4.4C2.3499%204.4%202.0624%204.5125%201.8374%204.7375C1.6124%204.9625%201.4999%205.25%201.4999%205.6V17C1.4999%2017.35%201.6124%2017.6375%201.8374%2017.8625C2.0624%2018.0875%202.3499%2018.2%202.6999%2018.2H12.2999C12.6499%2018.2%2012.9374%2018.0875%2013.1624%2017.8625C13.3874%2017.6375%2013.4999%2017.35%2013.4999%2017V5.6C13.4999%205.25%2013.3874%204.9625%2013.1624%204.7375C12.9374%204.5125%2012.6499%204.4%2012.2999%204.4ZM8.0999%203.2C8.0749%203.575%207.8749%203.775%207.4999%203.8C7.1249%203.775%206.9249%203.575%206.8999%203.2C6.9249%202.825%207.1249%202.625%207.4999%202.6C7.8749%202.625%208.0749%202.825%208.0999%203.2ZM5.3999%2010.4C5.3499%2010.95%205.0499%2011.25%204.4999%2011.3C3.9499%2011.25%203.6499%2010.95%203.5999%2010.4C3.6499%209.85%203.9499%209.55%204.4999%209.5C5.0499%209.55%205.3499%209.85%205.3999%2010.4ZM6.8999%209.8H10.4999C10.8749%209.825%2011.0749%2010.025%2011.0999%2010.4C11.0749%2010.775%2010.8749%2010.975%2010.4999%2011H6.8999C6.5249%2010.975%206.3249%2010.775%206.2999%2010.4C6.3249%2010.025%206.5249%209.825%206.8999%209.8ZM6.8999%2013.4H10.4999C10.8749%2013.425%2011.0749%2013.625%2011.0999%2014C11.0749%2014.375%2010.8749%2014.575%2010.4999%2014.6H6.8999C6.5249%2014.575%206.3249%2014.375%206.2999%2014C6.3249%2013.625%206.5249%2013.425%206.8999%2013.4ZM4.4999%2014.9C3.9499%2014.85%203.6499%2014.55%203.5999%2014C3.6499%2013.45%203.9499%2013.15%204.4999%2013.1C5.0499%2013.15%205.3499%2013.45%205.3999%2014C5.3499%2014.55%205.0499%2014.85%204.4999%2014.9Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"No assessments added"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1035")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.125%201.0625C7.15625%200.71875%207.34375%200.53125%207.6875%200.5H11.4375C11.7812%200.53125%2011.9688%200.71875%2012%201.0625V4.8125C11.9688%205.15625%2011.7812%205.34375%2011.4375%205.375C11.0938%205.34375%2010.9062%205.15625%2010.875%204.8125V2.42188L5.64844%207.64844C5.38281%207.86719%205.11719%207.86719%204.85156%207.64844C4.63281%207.38281%204.63281%207.11719%204.85156%206.85156L10.0781%201.625H7.6875C7.34375%201.59375%207.15625%201.40625%207.125%201.0625ZM1.6875%201.25H4.6875C5.03125%201.28125%205.21875%201.46875%205.25%201.8125C5.21875%202.15625%205.03125%202.34375%204.6875%202.375H1.6875C1.34375%202.40625%201.15625%202.59375%201.125%202.9375V10.8125C1.15625%2011.1562%201.34375%2011.3438%201.6875%2011.375H9.5625C9.90625%2011.3438%2010.0938%2011.1562%2010.125%2010.8125V7.8125C10.1562%207.46875%2010.3438%207.28125%2010.6875%207.25C11.0312%207.28125%2011.2188%207.46875%2011.25%207.8125V10.8125C11.2344%2011.2969%2011.0703%2011.6953%2010.7578%2012.0078C10.4453%2012.3203%2010.0469%2012.4844%209.5625%2012.5H1.6875C1.20312%2012.4844%200.804688%2012.3203%200.492188%2012.0078C0.179688%2011.6953%200.015625%2011.2969%200%2010.8125V2.9375C0.015625%202.45312%200.179688%202.05469%200.492188%201.74219C0.804688%201.42969%201.20312%201.26563%201.6875%201.25Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500")}
            tag="div"
          >
            {"Browse Your Assessments"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
