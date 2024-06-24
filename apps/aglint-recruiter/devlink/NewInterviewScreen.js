"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { InterviewCandidateScreen } from "./InterviewCandidateScreen";
import { InterviewInterviewerScreen } from "./InterviewInterviewerScreen";
import * as _utils from "./utils";
import _styles from "./NewInterviewScreen.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NewInterviewScreen({
  as: _Component = _Builtin.Block,
  slotInterviewLogo,
  onClickTransscript = {},
  onClickEndInterview = {},
  slotInterviewLeft,
  slotInterviewRight,
  onClickSupport = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "new-interview-starting-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-container-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-interview-start-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "new-interview-header-left")}
            tag="div"
          >
            {slotInterviewLogo}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "new-interview-header-right")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "button-blue-link-icon",
                "mobile-landscape-hide"
              )}
              tag="div"
              {...onClickTransscript}
            >
              <_Builtin.Block tag="div">{"Transcript"}</_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.3333%202.6665C15.6606%202.6665%2015.9328%202.90234%2015.9893%203.21334L16%203.33317V7.33317C16%207.70136%2015.7015%207.99984%2015.3333%207.99984C15.0061%207.99984%2014.7339%207.764%2014.6774%207.453L14.6667%207.33317V4.94117L9.13807%2010.4712C8.90665%2010.7027%208.54742%2010.7284%208.28759%2010.5484L8.19526%2010.4712L6%208.27584L1.13807%2013.1379C0.906649%2013.3693%200.547417%2013.395%200.287593%2013.215L0.195262%2013.1379C-0.0361597%2012.9065%20-0.0618732%2012.5473%200.118122%2012.2874L0.195262%2012.1951L5.5286%206.86177C5.76002%206.63034%206.11925%206.60463%206.37907%206.78463L6.4714%206.86177L8.66667%209.05717L13.7227%203.99984H11.3333C11.0061%203.99984%2010.7339%203.764%2010.6774%203.453L10.6667%203.33317C10.6667%203.00589%2010.9025%202.73369%2011.2135%202.67724L11.3333%202.6665H15.3333Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "new-end-interview-btn")}
              tag="div"
              {...onClickEndInterview}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.66797%2011.0859C8.52214%2011.25%208.34896%2011.2865%208.14844%2011.1953C7.1276%2010.7214%206.22526%2010.0924%205.44141%209.30859C4.65755%208.52474%204.02865%207.6224%203.55469%206.60156C3.46354%206.40104%203.5%206.22786%203.66406%206.08203L5.00391%204.98828C5.24089%204.76953%205.30469%204.51432%205.19531%204.22266L4.10156%201.59766C3.9375%201.26953%203.68229%201.14193%203.33594%201.21484L0.929688%201.87109C0.619792%201.96224%200.455729%202.17188%200.4375%202.5C0.455729%204.70573%200.99349%206.69271%202.05078%208.46094C3.10807%2010.2292%204.52083%2011.6419%206.28906%2012.6992C8.05729%2013.7565%2010.0443%2014.2943%2012.25%2014.3125C12.5781%2014.2943%2012.7878%2014.1302%2012.8789%2013.8203L13.5352%2011.4141C13.6081%2011.0677%2013.4805%2010.8125%2013.1523%2010.6484L10.5273%209.55469C10.2357%209.44531%209.98958%209.50911%209.78906%209.74609L8.66797%2011.0859ZM8.33984%2010.8125L9.43359%209.47266C9.77995%209.08984%2010.1992%208.98047%2010.6914%209.14453L13.3164%2010.2383C13.5716%2010.3477%2013.763%2010.5208%2013.8906%2010.7578C14%2011.013%2014.0273%2011.2773%2013.9727%2011.5508L13.3164%2013.957C13.1341%2014.4492%2012.7786%2014.7135%2012.25%2014.75C9.97135%2014.7318%207.91146%2014.1758%206.07031%2013.082C4.22917%2011.9883%202.76172%2010.5208%201.66797%208.67969C0.574219%206.83854%200.0182292%204.77865%200%202.5C0.0364583%201.97135%200.309896%201.61589%200.820312%201.43359L3.22656%200.777344C3.48177%200.722656%203.73698%200.75%203.99219%200.859375C4.22917%200.96875%204.40234%201.16016%204.51172%201.43359L5.60547%204.05859C5.76953%204.55078%205.66016%204.97005%205.27734%205.31641L3.9375%206.41016C4.39323%207.3763%204.99479%208.24219%205.74219%209.00781C6.50781%209.75521%207.3737%2010.3568%208.33984%2010.8125Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"End Interview"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "height-calc-interview")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "new-interview-start-grid")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-new-interview-left")}
              id={_utils.cx(
                _styles,
                "w-node-_385b081c-3541-f9a8-5d87-1d87d8f86e30-d8f86e21"
              )}
              tag="div"
            >
              {slotInterviewLeft ?? <InterviewCandidateScreen />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-new-interview-right")}
              id={_utils.cx(
                _styles,
                "w-node-_385b081c-3541-f9a8-5d87-1d87d8f86e46-d8f86e21"
              )}
              tag="div"
            >
              {slotInterviewRight ?? (
                <InterviewInterviewerScreen textAi="Hi, Im your interviewer today. I would like to ask some ase indroduce yourself?" />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "new-interview-footer",
            "mobile-landscape-hide"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "new-interview-left-footer")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm", "color-grey-600")}
              tag="div"
            >
              {"Powered By"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/652e2aac29ef51064769b7eb_Frame%202%20(1).svg"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm", "color-grey-600")}
              tag="div"
            >
              {"© 2023 Aglint Inc. All Rights Reserved"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "new-interview-right-footer")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-blue-link-icon")}
              tag="div"
              {...onClickSupport}
            >
              <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2214%22%20height%3D%2215%22%20viewbox%3D%220%200%2014%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.4375%207.75V9.28125C0.419271%209.40885%200.346354%209.48177%200.21875%209.5C0.0911458%209.48177%200.0182292%209.40885%200%209.28125V7.75C0.0182292%206.4375%200.33724%205.26172%200.957031%204.22266C1.57682%203.16536%202.41536%202.32682%203.47266%201.70703C4.51172%201.08724%205.6875%200.768229%207%200.75C8.3125%200.768229%209.48828%201.08724%2010.5273%201.70703C11.5846%202.32682%2012.4232%203.16536%2013.043%204.22266C13.6628%205.26172%2013.9818%206.4375%2014%207.75V11.6875C13.9818%2012.2526%2013.7904%2012.7174%2013.4258%2013.082C13.0612%2013.4466%2012.5964%2013.638%2012.0312%2013.6562H8.72266C8.66797%2013.9661%208.52214%2014.2305%208.28516%2014.4492C8.04818%2014.6497%207.76562%2014.75%207.4375%2014.75H6.5625C6.19792%2014.7318%205.88802%2014.6042%205.63281%2014.3672C5.39583%2014.112%205.26823%2013.8021%205.25%2013.4375C5.26823%2013.0729%205.39583%2012.763%205.63281%2012.5078C5.88802%2012.2708%206.19792%2012.1432%206.5625%2012.125H7.4375C7.76562%2012.125%208.04818%2012.2253%208.28516%2012.4258C8.52214%2012.6445%208.66797%2012.9089%208.72266%2013.2188H12.0312C12.4688%2013.2005%2012.8333%2013.0547%2013.125%2012.7812C13.3984%2012.4896%2013.5443%2012.125%2013.5625%2011.6875V7.75C13.5443%206.52865%2013.2435%205.42578%2012.6602%204.44141C12.0768%203.45703%2011.293%202.67318%2010.3086%202.08984C9.32422%201.50651%208.22135%201.20573%207%201.1875C5.77865%201.20573%204.67578%201.50651%203.69141%202.08984C2.70703%202.67318%201.92318%203.45703%201.33984%204.44141C0.75651%205.42578%200.455729%206.52865%200.4375%207.75ZM4.375%206.875C4.35677%206.60156%204.21094%206.45573%203.9375%206.4375C3.44531%206.45573%203.03516%206.62891%202.70703%206.95703C2.37891%207.28516%202.20573%207.69531%202.1875%208.1875V9.0625C2.20573%209.55469%202.37891%209.96484%202.70703%2010.293C3.03516%2010.6211%203.44531%2010.7943%203.9375%2010.8125C4.21094%2010.7943%204.35677%2010.6484%204.375%2010.375V6.875ZM1.75%208.1875C1.76823%207.56771%201.97786%207.04818%202.37891%206.62891C2.79818%206.22786%203.31771%206.01823%203.9375%206C4.19271%206%204.40234%206.08203%204.56641%206.24609C4.73047%206.41016%204.8125%206.61979%204.8125%206.875V10.375C4.8125%2010.6302%204.73047%2010.8398%204.56641%2011.0039C4.40234%2011.168%204.19271%2011.25%203.9375%2011.25C3.31771%2011.2318%202.79818%2011.0221%202.37891%2010.6211C1.97786%2010.2018%201.76823%209.68229%201.75%209.0625V8.1875ZM9.625%206.875V10.375C9.64323%2010.6484%209.78906%2010.7943%2010.0625%2010.8125C10.5547%2010.7943%2010.9648%2010.6211%2011.293%2010.293C11.6211%209.96484%2011.7943%209.55469%2011.8125%209.0625V8.1875C11.7943%207.69531%2011.6211%207.28516%2011.293%206.95703C10.9648%206.62891%2010.5547%206.45573%2010.0625%206.4375C9.78906%206.45573%209.64323%206.60156%209.625%206.875ZM12.25%208.1875V9.0625C12.2318%209.68229%2012.0221%2010.2018%2011.6211%2010.6211C11.2018%2011.0221%2010.6823%2011.2318%2010.0625%2011.25C9.80729%2011.25%209.59766%2011.168%209.43359%2011.0039C9.26953%2010.8398%209.1875%2010.6302%209.1875%2010.375V6.875C9.1875%206.61979%209.26953%206.41016%209.43359%206.24609C9.59766%206.08203%209.80729%206%2010.0625%206C10.6823%206.01823%2011.2018%206.22786%2011.6211%206.62891C12.0221%207.04818%2012.2318%207.56771%2012.25%208.1875ZM8.3125%2013.4375C8.3125%2013.1823%208.23047%2012.9727%208.06641%2012.8086C7.90234%2012.6445%207.69271%2012.5625%207.4375%2012.5625H6.5625C6.30729%2012.5625%206.09766%2012.6445%205.93359%2012.8086C5.76953%2012.9727%205.6875%2013.1823%205.6875%2013.4375C5.6875%2013.6927%205.76953%2013.9023%205.93359%2014.0664C6.09766%2014.2305%206.30729%2014.3125%206.5625%2014.3125H7.4375C7.69271%2014.3125%207.90234%2014.2305%208.06641%2014.0664C8.23047%2013.9023%208.3125%2013.6927%208.3125%2013.4375Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E" />
              <_Builtin.Block tag="div">{"Contact Support"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22NewInterviewScreen_height-calc-interview__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%20160px)%3B%0A%7D%0A%0A%40media%20only%20screen%20and%20(max-width%3A%20990px)%7B%0A%5Bclass*%3D%22NewInterviewScreen_height-calc-interview__%22%5D%7B%0Aheight%3A%20auto%3B%0A%7D%0A%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
