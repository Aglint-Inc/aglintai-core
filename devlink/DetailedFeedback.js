import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { DetailedFeedbackCard } from "./DetailedFeedbackCard";
import { InterviewTranscriptCard } from "./InterviewTranscriptCard";
import * as _utils from "./utils";
import _styles from "./DetailedFeedback.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-928":{"id":"e-928","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-378","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-929"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807030","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807030","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694908197175},"e-936":{"id":"e-936","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-381","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-937"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|002821df-9a23-91c6-11fa-4b56cedb1947","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|002821df-9a23-91c6-11fa-4b56cedb1947","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694909163681},"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600},"e-1283":{"id":"e-1283","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-381","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1284"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59642c18-096f-1528-6295-a791c8c9a815","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59642c18-096f-1528-6295-a791c8c9a815","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695820203394}},"actionLists":{"a-378":{"id":"a-378","title":"screening-sidebar-[close]","actionItemGroups":[{"actionItems":[{"id":"a-378-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-378-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".screening-sidebar","selectorGuids":["9c18f576-777f-0c22-82c0-ab8821e1e97d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-378-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".screening-sidebar","selectorGuids":["9c18f576-777f-0c22-82c0-ab8821e1e97d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694898960131},"a-381":{"id":"a-381","title":"detailed-feedback-[open]","actionItemGroups":[{"actionItems":[{"id":"a-381-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper.overview","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","103615c0-baf5-f2ba-a55e-2e2680195094"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-381-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper.overview","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","103615c0-baf5-f2ba-a55e-2e2680195094"]},"value":"none"}},{"id":"a-381-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".sidebar-wrapper.detailed","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","176d92f4-5f7b-45cf-12df-142b9dea7515"]},"value":"flex"}}]},{"actionItems":[{"id":"a-381-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".sidebar-wrapper.detailed","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","176d92f4-5f7b-45cf-12df-142b9dea7515"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694909170941},"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function DetailedFeedback({
  as: _Component = _Builtin.Block,
  onClickShare = {},
  onClickDownloadFeedback = {},
  onClickBack = {},
  slotDetailedFeedback,
  slotTranscript,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "sidebar-wrapper", "detailed")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "sidebar-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "detailed-view-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-303")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "clickable")}
              tag="div"
              {...onClickBack}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.3479%2010.3591C4.54623%2010.167%204.55126%209.85044%204.35912%209.6521C4.35912%209.6521%202.67654%207.91532%201.78972%207H11.5C11.7761%207%2012%206.77614%2012%206.5C12%206.22386%2011.7761%206%2011.5%206H1.70711L4.35355%203.35355C4.54882%203.15829%204.54882%202.84171%204.35355%202.64645C4.15829%202.45118%203.84171%202.45118%203.64645%202.64645L0.546447%205.74645C0.151184%206.14171%200.151184%206.75829%200.546447%207.15355L3.64088%2010.3479C3.83302%2010.5462%204.14956%2010.5513%204.3479%2010.3591Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-lg",
                "fw-semibold",
                "color-black"
              )}
              tag="div"
            >
              {"Detailed feedback"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-298")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "aui-button-wrap")}
              tag="div"
              tabIndex=""
              {...onClickShare}
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "aui-button",
                  "is-small",
                  "is-button-outlined"
                )}
                tag="div"
                tabIndex=""
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "button-icon", "is-large")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2456_113832%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2456_113832)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Copy Link"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "aui-button-wrap")}
              tag="div"
              tabIndex=""
              {...onClickDownloadFeedback}
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "aui-button",
                  "is-small",
                  "is-button-bg-blue"
                )}
                tag="div"
                tabIndex=""
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "button-icon", "is-large")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.5%207.69289L9.04645%205.14645C9.24171%204.95118%209.55829%204.95118%209.75355%205.14645C9.94882%205.34171%209.94882%205.65829%209.75355%205.85355L6.65355%208.95355C6.25829%209.34882%205.64171%209.34882%205.24645%208.95355L2.14645%205.85355C1.95118%205.65829%201.95118%205.34171%202.14645%205.14645C2.34171%204.95118%202.65829%204.95118%202.85355%205.14645L5.5%207.79289V0.5C5.5%200.223858%205.72386%200%206%200C6.27614%200%206.5%200.223858%206.5%200.5V7.69289ZM1.5%2012C1.22386%2012%201%2011.7761%201%2011.5C1%2011.2239%201.22386%2011%201.5%2011H10.5C10.7761%2011%2011%2011.2239%2011%2011.5C11%2011.7761%2010.7761%2012%2010.5%2012H1.5Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Download Feedback"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "job-sidebar-wrapper")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "hide")}
            value="%3Cstyle%3E%0A.job-sidebar-wrapper%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A.job-sidebar-wrapper%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%0A%20%20scrollbar-width%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
          />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "job-sidebar-main-block",
              "screening"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "lan-analysis-wrapper")}
              tag="div"
            >
              {slotDetailedFeedback ?? <DetailedFeedbackCard />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-transcript-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
                tag="div"
              >
                {"Transcript"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-108")}
                tag="div"
              >
                {slotTranscript ?? <InterviewTranscriptCard />}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
