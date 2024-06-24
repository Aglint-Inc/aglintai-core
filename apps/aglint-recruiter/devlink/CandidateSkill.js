"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CandidateSkill.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateSkill({
  as: _Component = _Builtin.Block,
  slotCandidateSkill,
  onClickIcons = {},
  slotSkillsScore,
  propsStyle = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "jd-analysis-wrap")}
      tag="div"
      {...propsStyle}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "jd-analysis-header-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jd-analysis-header-left")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "cd_title")} tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.27734%202.21094L1.45703%203.03125L3.45312%205.62891H4.875V4.20703L2.27734%202.21094ZM5.75%205.875L8.53906%208.66406C8.95833%208.40885%209.41406%208.29948%209.90625%208.33594C10.3802%208.39062%2010.8086%208.59115%2011.1914%208.9375L14.2539%2012C14.418%2012.1823%2014.5%2012.3919%2014.5%2012.6289C14.5%2012.8659%2014.418%2013.0755%2014.2539%2013.2578L12.5039%2015.0078C12.3216%2015.1719%2012.112%2015.2539%2011.875%2015.2539C11.638%2015.2539%2011.4284%2015.1719%2011.2461%2015.0078L8.18359%2011.9453C7.83724%2011.5625%207.63672%2011.1341%207.58203%2010.6602C7.54557%2010.168%207.65495%209.71224%207.91016%209.29297L5.12109%206.50391C5.10286%206.50391%205.09375%206.50391%205.09375%206.50391H3.34375C3.125%206.50391%202.95182%206.42188%202.82422%206.25781L0.636719%203.41406C0.436198%203.10417%200.454427%202.8125%200.691406%202.53906L1.78516%201.44531C2.05859%201.20833%202.35026%201.1901%202.66016%201.39062L5.50391%203.57812C5.66797%203.70573%205.75%203.87891%205.75%204.09766V5.84766C5.75%205.84766%205.75%205.85677%205.75%205.875ZM8.8125%209.56641C8.57552%209.82161%208.45703%2010.1133%208.45703%2010.4414C8.45703%2010.7695%208.57552%2011.0612%208.8125%2011.3164L11.875%2014.3789L13.625%2012.6289L10.5625%209.56641C10.3073%209.32943%2010.0156%209.21094%209.6875%209.21094C9.35938%209.21094%209.06771%209.32943%208.8125%209.56641ZM3.34375%2012.8477C3.32552%2013.1211%203.17969%2013.2669%202.90625%2013.2852C2.63281%2013.2669%202.48698%2013.1211%202.46875%2012.8477C2.48698%2012.5742%202.63281%2012.4284%202.90625%2012.4102C3.17969%2012.4284%203.32552%2012.5742%203.34375%2012.8477ZM1.12891%2011.5625L5.03906%207.65234L5.66797%208.28125L1.75781%2012.1914C1.52083%2012.4466%201.40234%2012.7474%201.40234%2013.0938C1.40234%2013.4583%201.52083%2013.7591%201.75781%2013.9961C1.99479%2014.2331%202.29557%2014.3516%202.66016%2014.3516C3.00651%2014.3516%203.30729%2014.2331%203.5625%2013.9961L6.73438%2010.8242C6.77083%2011.1706%206.87109%2011.4987%207.03516%2011.8086L4.19141%2014.625C3.77214%2015.0443%203.26172%2015.2539%202.66016%2015.2539C2.05859%2015.2357%201.54818%2015.026%201.12891%2014.625C0.727865%2014.2057%200.518229%2013.6953%200.5%2013.0938C0.5%2012.4922%200.709635%2011.9818%201.12891%2011.5625ZM13.5977%205.62891C13.5977%205.35547%2013.5703%205.08203%2013.5156%204.80859L12.2031%206.12109C11.9297%206.3763%2011.6107%206.51302%2011.2461%206.53125H10.5625C10.1797%206.51302%209.86979%206.3763%209.63281%206.12109C9.3776%205.88411%209.24089%205.57422%209.22266%205.19141V4.50781C9.24089%204.14323%209.3776%203.82422%209.63281%203.55078L10.9453%202.23828C10.6719%202.18359%2010.3984%202.15625%2010.125%202.15625C9.50521%202.15625%208.9401%202.30208%208.42969%202.59375C7.91927%202.88542%207.5%203.27734%207.17188%203.76953L6.46094%203.22266C6.86198%202.62109%207.38151%202.14714%208.01953%201.80078C8.65755%201.4362%209.35938%201.25391%2010.125%201.25391C10.7995%201.25391%2011.4284%201.39974%2012.0117%201.69141C12.2669%201.85547%2012.3034%202.0651%2012.1211%202.32031L10.2617%204.17969C10.1706%204.27083%2010.125%204.38021%2010.125%204.50781V5.19141C10.1432%205.46484%2010.2891%205.61068%2010.5625%205.62891H11.2461C11.3737%205.62891%2011.4831%205.58333%2011.5742%205.49219L13.4336%203.63281C13.6888%203.45052%2013.8984%203.48698%2014.0625%203.74219C14.3542%204.30729%2014.5%204.9362%2014.5%205.62891C14.5%206.3763%2014.3359%207.05078%2014.0078%207.65234C13.6797%208.27214%2013.2331%208.78255%2012.668%209.18359L12.0117%208.55469C12.5039%208.22656%2012.8867%207.81641%2013.1602%207.32422C13.4518%206.8138%2013.5977%206.2487%2013.5977%205.62891Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <Text content="Skills" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd-analysis-right")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotSkillsScore}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dropdown-icon-wrap")}
            tag="div"
            {...onClickIcons}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.60156%204.60156C7.86719%204.38281%208.13281%204.38281%208.39844%204.60156L12.8984%209.10156C13.1172%209.36719%2013.1172%209.63281%2012.8984%209.89844C12.6328%2010.1172%2012.3672%2010.1172%2012.1016%209.89844L8%205.79688L3.89844%209.89844C3.63281%2010.1172%203.36719%2010.1172%203.10156%209.89844C2.88281%209.63281%202.88281%209.36719%203.10156%209.10156L7.60156%204.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cs-skill")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "cvs-skills-wrapper")}
          tag="div"
        >
          {slotCandidateSkill}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
