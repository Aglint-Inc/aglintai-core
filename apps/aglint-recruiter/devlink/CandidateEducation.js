"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { CandidateEducationCard } from "./CandidateEducationCard";
import * as _utils from "./utils";
import _styles from "./CandidateEducation.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateEducation({
  as: _Component = _Builtin.Block,
  slotEducationCard,
  onClickIcons = {},
  onClickCard = {},
  propsCollapse = {},
  slotEducationScore,
  isArrowVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "jd-analysis-wrap")}
      tag="div"
      {...onClickCard}
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
              value="%3Csvg%20width%3D%2219%22%20height%3D%2216%22%20viewbox%3D%220%200%2019%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.14453%203.05859L2.0625%205.62891L4.08594%206.36719C4.35938%206.16667%204.66016%206.01172%204.98828%205.90234L9.33594%204.26172C9.60938%204.1888%209.80078%204.27083%209.91016%204.50781C9.98307%204.76302%209.90104%204.95443%209.66406%205.08203L5.28906%206.72266C5.2526%206.72266%205.21615%206.73177%205.17969%206.75L9.14453%208.19922C9.25391%208.23568%209.3724%208.25391%209.5%208.25391C9.6276%208.25391%209.74609%208.23568%209.85547%208.19922L16.9375%205.62891L9.85547%203.05859C9.74609%203.02214%209.6276%203.00391%209.5%203.00391C9.3724%203.00391%209.25391%203.02214%209.14453%203.05859ZM8.84375%209.01953L4.22266%207.35156C3.4388%208.02604%203.01042%208.88281%202.9375%209.92188C3.10156%2010.2865%203.22917%2010.6602%203.32031%2011.043C3.53906%2011.8268%203.55729%2012.8203%203.375%2014.0234C3.33854%2014.151%203.27474%2014.2422%203.18359%2014.2969C3.07422%2014.3698%202.95573%2014.388%202.82812%2014.3516L1.07812%2013.9141C0.932292%2013.8776%200.832031%2013.7865%200.777344%2013.6406C0.722656%2013.4948%200.740885%2013.3581%200.832031%2013.2305C1.06901%2012.9206%201.27865%2012.5833%201.46094%2012.2188C1.80729%2011.5443%202.00781%2010.806%202.0625%2010.0039C2.0625%209.98568%202.0625%209.96745%202.0625%209.94922C2.11719%208.80078%202.52734%207.82552%203.29297%207.02344L1.1875%206.25781C0.914062%206.13021%200.768229%205.92057%200.75%205.62891C0.768229%205.33724%200.914062%205.1276%201.1875%205L8.84375%202.23828C9.0625%202.16536%209.28125%202.12891%209.5%202.12891C9.71875%202.12891%209.9375%202.16536%2010.1562%202.23828L17.8125%205C18.0859%205.1276%2018.2318%205.33724%2018.25%205.62891C18.2318%205.92057%2018.0859%206.13021%2017.8125%206.25781L10.1562%209.01953C9.9375%209.09245%209.71875%209.12891%209.5%209.12891C9.28125%209.12891%209.0625%209.09245%208.84375%209.01953ZM5.50781%208.74609L5.125%2012.3555C5.125%2012.3555%205.13411%2012.3555%205.15234%2012.3555C5.17057%2012.3919%205.19792%2012.4284%205.23438%2012.4648C5.39844%2012.6107%205.6901%2012.7747%206.10938%2012.957C6.98438%2013.3034%208.11458%2013.4857%209.5%2013.5039C10.8854%2013.4857%2012.0156%2013.2943%2012.8906%2012.9297C13.3099%2012.7656%2013.6016%2012.6107%2013.7656%2012.4648C13.8203%2012.4284%2013.8568%2012.3919%2013.875%2012.3555L13.4922%208.74609L14.3398%208.44531L14.75%2012.4102C14.7135%2012.9206%2014.2031%2013.3672%2013.2188%2013.75C12.2344%2014.151%2010.9948%2014.3607%209.5%2014.3789C8.00521%2014.3607%206.76562%2014.151%205.78125%2013.75C4.79688%2013.3672%204.28646%2012.9206%204.25%2012.4102L4.66016%208.44531L5.50781%208.74609ZM13.9023%2012.3281C13.8841%2012.3281%2013.875%2012.3281%2013.875%2012.3281C13.8932%2012.3281%2013.9023%2012.3281%2013.9023%2012.3281ZM2.58203%2013.3945C2.63672%2012.8294%202.63672%2012.319%202.58203%2011.8633C2.47266%2012.1367%202.35417%2012.3828%202.22656%2012.6016C2.13542%2012.8203%202.02604%2013.0299%201.89844%2013.2305L2.58203%2013.3945Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <Text content="Education" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd-analysis-right")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotEducationScore}</_Builtin.Block>
          {isArrowVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "mlc-drop-wrap", "small")}
              tag="div"
              {...onClickIcons}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "pointer")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%2212%22%20viewBox%3D%220%200%2010%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.11065%200.289517C0.902374%200.0812288%200.564689%200.0812288%200.356411%200.289517C0.148123%200.497794%200.148123%200.835479%200.356411%201.04376L4.62308%205.31042C4.83136%205.51871%205.16904%205.51871%205.37732%205.31042L9.64404%201.04376C9.85225%200.835479%209.85225%200.497794%209.64404%200.289517C9.43572%200.0812288%209.09801%200.0812288%208.88969%200.289517L5.0002%204.17905L1.11065%200.289517ZM1.11065%206.68952C0.902374%206.48123%200.564689%206.48123%200.356411%206.68952C0.148123%206.89779%200.148123%207.23548%200.356411%207.44376L4.62308%2011.7105C4.83136%2011.9187%205.16904%2011.9187%205.37732%2011.7105L9.64404%207.44376C9.85225%207.23548%209.85225%206.89779%209.64404%206.68952C9.43572%206.48123%209.09801%206.48123%208.88969%206.68952L5.0002%2010.5791L1.11065%206.68952Z%22%20fill%3D%22%23080800%22%20fill-opacity%3D%220.631373%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-education-wrapper")}
        tag="div"
        {...propsCollapse}
      >
        {slotEducationCard ?? <CandidateEducationCard />}
      </_Builtin.Block>
    </_Component>
  );
}
