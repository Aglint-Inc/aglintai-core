"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CreateJob.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CreateJob({
  as: _Component = _Builtin.Block,
  onClickCreateNewJob = {},
  onClickLeverImport = {},
  isGreenhouseVisible = true,
  isAshbyVisible = false,
  onClickGreenhouse = {},
  onClickAshby = {},
  onClickRequestIntegration = {},
  isLeverConnected = false,
  isLeverVisible = true,
  isGreenhouseConnected = false,
  isAshbyConnected = false,
  onClickLinktoIntegration = {},
  isEmpty = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "create-job-wrap-onclick")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "add-job-wrappers")}
        tag="div"
        {...onClickCreateNewJob}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "create-icon-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.7188%206.125C11.7188%205.89715%2011.6455%205.70995%2011.499%205.5635C11.3525%205.417%2011.1654%205.34375%2010.9375%205.34375H1.5625C1.33464%205.34375%201.14746%205.417%201.00098%205.5635C0.85449%205.70995%200.78125%205.89715%200.78125%206.125V12.375C0.78125%2012.6029%200.85449%2012.79%201.00098%2012.9365C1.14746%2013.083%201.33464%2013.1562%201.5625%2013.1562H8.78905C9.0332%2013.4492%209.31805%2013.7096%209.64355%2013.9375H1.5625C1.12304%2013.9212%200.756835%2013.7666%200.463867%2013.4736C0.170898%2013.1806%200.0162761%2012.8144%200%2012.375V6.125C0.0162761%205.68555%200.170898%205.31935%200.463867%205.02635C0.756835%204.7334%201.12304%204.57877%201.5625%204.5625H10.9375C11.3769%204.57877%2011.7431%204.7334%2012.0361%205.02635C12.3291%205.31935%2012.4837%205.68555%2012.5%206.125V6.1494C12.3698%206.13315%2012.2396%206.125%2012.1094%206.125C11.9791%206.125%2011.8489%206.13315%2011.7188%206.1494V6.125ZM10.9375%203C11.1816%203.01627%2011.3119%203.14649%2011.3281%203.39062C11.3119%203.63476%2011.1816%203.76498%2010.9375%203.78125H1.5625C1.31836%203.76498%201.18815%203.63476%201.17188%203.39062C1.18815%203.14649%201.31836%203.01627%201.5625%203H10.9375ZM9.7656%201.4375C10.0098%201.45377%2010.1399%201.58399%2010.1562%201.82812C10.1399%202.07226%2010.0098%202.20248%209.7656%202.21875H2.73438C2.49024%202.20248%202.36002%202.07226%202.34375%201.82812C2.36002%201.58399%202.49024%201.45377%202.73438%201.4375H9.7656ZM9.375%2010.4219C9.375%2010.9101%209.49705%2011.3659%209.7412%2011.7891C9.98535%2012.2123%2010.319%2012.5459%2010.7422%2012.79C11.1653%2013.0342%2011.6211%2013.1562%2012.1094%2013.1562C12.5976%2013.1562%2013.0534%2013.0342%2013.4766%2012.79C13.8998%2012.5459%2014.2334%2012.2123%2014.4775%2011.7891C14.7217%2011.3659%2014.8438%2010.9101%2014.8438%2010.4219C14.8438%209.9336%2014.7217%209.47785%2014.4775%209.0547C14.2334%208.6315%2013.8998%208.29785%2013.4766%208.0537C13.0534%207.80955%2012.5976%207.6875%2012.1094%207.6875C11.6211%207.6875%2011.1653%207.80955%2010.7422%208.0537C10.319%208.29785%209.98535%208.6315%209.7412%209.0547C9.49705%209.47785%209.375%209.9336%209.375%2010.4219ZM15.625%2010.4219C15.625%2011.0566%2015.4704%2011.6426%2015.1611%2012.1797C14.8519%2012.7168%2014.4205%2013.1481%2013.8672%2013.4736C13.3138%2013.7829%2012.7278%2013.9375%2012.1094%2013.9375C11.4909%2013.9375%2010.905%2013.7829%2010.3516%2013.4736C9.7982%2013.1481%209.36685%2012.7168%209.0576%2012.1797C8.74835%2011.6426%208.59375%2011.0566%208.59375%2010.4219C8.59375%209.7871%208.74835%209.20115%209.0576%208.66405C9.36685%208.12695%209.7982%207.69565%2010.3516%207.3701C10.905%207.06085%2011.4909%206.90625%2012.1094%206.90625C12.7278%206.90625%2013.3138%207.06085%2013.8672%207.3701C14.4205%207.69565%2014.8519%208.12695%2015.1611%208.66405C15.4704%209.20115%2015.625%209.7871%2015.625%2010.4219ZM12.5%208.8594V10.0312H13.6719C13.916%2010.0476%2014.0462%2010.1777%2014.0625%2010.4219C14.0462%2010.666%2013.916%2010.7962%2013.6719%2010.8125H12.5V11.9844C12.4837%2012.2285%2012.3535%2012.3587%2012.1094%2012.375C11.8652%2012.3587%2011.7351%2012.2285%2011.7188%2011.9844V10.8125H10.5469C10.3027%2010.7962%2010.1726%2010.666%2010.1562%2010.4219C10.1726%2010.1777%2010.3027%2010.0476%2010.5469%2010.0312H11.7188V8.8594C11.7351%208.61525%2011.8652%208.48505%2012.1094%208.46875C12.3535%208.48505%2012.4837%208.61525%2012.5%208.8594Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <Text content="Add Job" weight="medium" />
      </_Builtin.Block>
      {isLeverVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "add-job-wrappers")}
          tag="div"
          {...onClickLeverImport}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "create-icon-wrap")}
            tag="div"
          >
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65aa8ecf5a01f0a04d3df45f_6cbf247f647a05997dd059e987d56546%201.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <Text content="Import jobs from Lever" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isGreenhouseVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "add-job-wrappers")}
          tag="div"
          {...onClickGreenhouse}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "create-icon-wrap")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2217%22%20height%3D%2216%22%20viewBox%3D%220%200%2017%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.13278%2015.7284C7.07592%2015.7585%205.39878%2013.9943%205.43736%2011.9558C5.45366%2010.9752%205.85643%2010.0408%206.55808%209.3557C7.25973%208.6706%208.20349%208.29025%209.1841%208.2974C11.1433%208.3027%2012.7836%209.98415%2012.819%2011.9451C12.8565%2014.0226%2011.144%2015.7603%209.13278%2015.7284ZM12.1569%2012.0364C12.1693%2010.3525%2010.823%208.97795%209.14871%208.96525C7.47441%208.9525%206.10977%2010.3065%206.09562%2011.9901C6.08693%2012.7992%206.3999%2013.5787%206.96571%2014.1571C7.53152%2014.7355%208.30387%2015.0656%209.11297%2015.0748C10.7689%2015.0956%2012.1445%2013.7225%2012.1569%2012.0364ZM5.44479%204.47516C5.44152%204.07316%205.5178%203.67449%205.66923%203.3021C5.82066%202.92971%206.04426%202.59095%206.32715%202.30533C6.61003%202.0197%206.94661%201.79286%207.31752%201.63785C7.68843%201.48285%208.08634%201.40274%208.48833%201.40215C10.1588%201.39896%2011.5347%202.77851%2011.5372%204.45852C11.54%206.1626%2010.1857%207.54215%208.50532%207.5471C6.80023%207.5517%205.44975%206.1955%205.44479%204.47516ZM6.11402%204.45605C6.11097%204.76764%206.16933%205.0768%206.28576%205.36585C6.40219%205.6549%206.57441%205.91815%206.79258%206.14065C7.01076%206.36315%207.27062%206.5405%207.55732%206.66255C7.84403%206.7846%208.15197%206.849%208.46356%206.852C8.77515%206.85505%209.08429%206.7967%209.37332%206.6803C9.66236%206.56385%209.92564%206.3916%2010.1481%206.17345C10.3706%205.95525%2010.5479%205.6954%2010.67%205.40865C10.7921%205.12195%2010.8564%204.81401%2010.8595%204.50241C10.868%203.17418%209.81687%202.09121%208.50957%202.08059C7.19554%202.07139%206.12428%203.13313%206.11402%204.45605ZM10.289%200.620715C10.2901%200.455421%2010.3569%200.297345%2010.4745%200.181262C10.5328%200.123784%2010.6018%200.0783445%2010.6776%200.0475393C10.7535%200.016734%2010.8346%200.00116574%2010.9165%200.00172346C10.9983%200.00228117%2011.0792%200.0189539%2011.1546%200.05079C11.23%200.0826255%2011.2984%200.129001%2011.3559%200.187268C11.4134%200.245535%2011.4588%200.314554%2011.4896%200.390382C11.5204%200.46621%2011.536%200.547365%2011.5354%200.62921C11.5363%200.711875%2011.5207%200.793885%2011.4895%200.870425C11.4582%200.94697%2011.412%201.01649%2011.3535%201.07492C11.295%201.13334%2011.2255%201.17948%2011.1489%201.21064C11.0723%201.24179%2010.9903%201.25733%2010.9076%201.25634C10.5573%201.25386%2010.289%200.97781%2010.289%200.620715Z%22%20fill%3D%22%2338B2A7%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <Text content="Import from Greenhouse" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isAshbyVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "add-job-wrappers")}
          tag="div"
          {...onClickAshby}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "create-icon-wrap")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "code-embed-2")}
              value="%3Csvg%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%226%22%20fill%3D%22url(%23ashby_platform_svg__paint0_linear_109_3992)%22%3E%3C%2Frect%3E%3Cg%20filter%3D%22url(%23ashby_platform_svg__filter0_dd_109_3992)%22%3E%3Cpath%20d%3D%22M30.112%2029.123c.295.722.613%201.264.953%201.625.364.338.715.52%201.056.542v.677c-1.635-.068-3.7-.102-6.198-.102-2.589%200-4.496.034-5.722.102v-.677c.863-.046%201.476-.147%201.839-.305.363-.18.545-.485.545-.914%200-.406-.136-.948-.409-1.625l-2.01-5.552h-6.879l-.579%201.524c-.749%201.918-1.124%203.385-1.124%204.4%200%20.926.261%201.558.784%201.896.522.339%201.294.53%202.316.576v.677a114.14%20114.14%200%2000-4.462-.102c-1.067%200-1.941.034-2.622.102v-.677c.567-.09%201.1-.44%201.6-1.05.5-.61%201.01-1.58%201.533-2.911L18.293%208c.727.045%201.329.068%201.806.068.454%200%201.044-.023%201.77-.068l8.243%2021.123zm-10.183-6.905l-3.1-8.463-3.27%208.463h6.37z%22%20fill%3D%22%23fff%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22ashby_platform_svg__paint0_linear_109_3992%22%20x1%3D%2220%22%20y1%3D%220%22%20x2%3D%2220%22%20y2%3D%2240%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%233F34BC%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235246D8%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3Cfilter%20id%3D%22ashby_platform_svg__filter0_dd_109_3992%22%20x%3D%226.6%22%20y%3D%227%22%20width%3D%2226.521%22%20height%3D%2227.967%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%3E%3C%2FfeFlood%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%3E%3C%2FfeColorMatrix%3E%3CfeMorphology%20radius%3D%222%22%20in%3D%22SourceAlpha%22%20result%3D%22effect1_dropShadow_109_3992%22%3E%3C%2FfeMorphology%3E%3CfeOffset%20dy%3D%222%22%3E%3C%2FfeOffset%3E%3CfeGaussianBlur%20stdDeviation%3D%221.5%22%3E%3C%2FfeGaussianBlur%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%3E%3C%2FfeComposite%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200.0784314%200%200%200%200%200.0784314%200%200%200%200%200.0823529%200%200%200%200.3%200%22%3E%3C%2FfeColorMatrix%3E%3CfeBlend%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_109_3992%22%3E%3C%2FfeBlend%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%3E%3C%2FfeColorMatrix%3E%3CfeOffset%3E%3C%2FfeOffset%3E%3CfeGaussianBlur%20stdDeviation%3D%220.5%22%3E%3C%2FfeGaussianBlur%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%3E%3C%2FfeComposite%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200.0784314%200%200%200%200%200.0784314%200%200%200%200%200.0823529%200%200%200%200.18%200%22%3E%3C%2FfeColorMatrix%3E%3CfeBlend%20in2%3D%22effect1_dropShadow_109_3992%22%20result%3D%22effect2_dropShadow_109_3992%22%3E%3C%2FfeBlend%3E%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22effect2_dropShadow_109_3992%22%20result%3D%22shape%22%3E%3C%2FfeBlend%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <Text content="Import jobs from Ashby" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isEmpty ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-empty")}
          tag="div"
        >
          <Text content="To connect with your ATS, go to " />
          <_Builtin.Block
            className={_utils.cx(_styles, "integration-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cursor-pointer")}
              tag="div"
              {...onClickLinktoIntegration}
            >
              <Text content="Integration" color="accent" />
            </_Builtin.Block>
            <Text content="app." />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
