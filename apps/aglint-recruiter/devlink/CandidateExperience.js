"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { CandidateExperienceCard } from "./CandidateExperienceCard";
import * as _utils from "./utils";
import _styles from "./CandidateExperience.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateExperience({
  as: _Component = _Builtin.Block,
  slotCandidateExperienceCard,
  onClickCards = {},
  onClickIcons = {},
  slotExperienceScore,
  isArrowVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "jd-analysis-wrap")}
      tag="div"
      {...onClickCards}
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
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.375%204.86328C1.99479%203.76953%202.83333%202.89453%203.89062%202.23828C4.96615%201.60026%206.16927%201.27214%207.5%201.25391C8.8125%201.27214%209.98828%201.59115%2011.0273%202.21094C12.0846%202.83073%2012.9232%203.66927%2013.543%204.72656C14.1628%205.76562%2014.4818%206.94141%2014.5%208.25391C14.4818%209.56641%2014.1628%2010.7422%2013.543%2011.7812C12.9232%2012.8385%2012.0846%2013.6771%2011.0273%2014.2969C9.98828%2014.9167%208.8125%2015.2357%207.5%2015.2539C6.35156%2015.2357%205.29427%2014.9805%204.32812%2014.4883C3.36198%2013.9961%202.55078%2013.3216%201.89453%2012.4648C1.76693%2012.2279%201.79427%2012.0182%201.97656%2011.8359C2.21354%2011.7083%202.42318%2011.7357%202.60547%2011.918C3.17057%2012.6836%203.8724%2013.2852%204.71094%2013.7227C5.56771%2014.1602%206.4974%2014.3789%207.5%2014.3789C8.64844%2014.3607%209.67839%2014.0781%2010.5898%2013.5312C11.5195%2013.0026%2012.2487%2012.2734%2012.7773%2011.3438C13.3242%2010.4323%2013.6068%209.40234%2013.625%208.25391C13.6068%207.10547%2013.3242%206.07552%2012.7773%205.16406C12.2487%204.23438%2011.5195%203.50521%2010.5898%202.97656C9.67839%202.42969%208.64844%202.14714%207.5%202.12891C6.26042%202.14714%205.15755%202.47526%204.19141%203.11328C3.20703%203.73307%202.46875%204.57161%201.97656%205.62891H4.4375C4.71094%205.64714%204.85677%205.79297%204.875%206.06641C4.85677%206.33984%204.71094%206.48568%204.4375%206.50391H0.9375C0.664062%206.48568%200.518229%206.33984%200.5%206.06641V2.56641C0.518229%202.29297%200.664062%202.14714%200.9375%202.12891C1.21094%202.14714%201.35677%202.29297%201.375%202.56641V4.86328ZM7.5%204.75391C7.77344%204.77214%207.91927%204.91797%207.9375%205.19141V8.0625L9.98828%2010.1406C10.1706%2010.3411%2010.1706%2010.5417%209.98828%2010.7422C9.78776%2010.9245%209.58724%2010.9245%209.38672%2010.7422L7.19922%208.55469C7.10807%208.48177%207.0625%208.38151%207.0625%208.25391V5.19141C7.08073%204.91797%207.22656%204.77214%207.5%204.75391Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <Text content="Experience" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd-analysis-right")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotExperienceScore}</_Builtin.Block>
          {isArrowVisible ? (
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
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-experiences-wrapper")}
        tag="div"
      >
        {slotCandidateExperienceCard ?? <CandidateExperienceCard />}
      </_Builtin.Block>
    </_Component>
  );
}
