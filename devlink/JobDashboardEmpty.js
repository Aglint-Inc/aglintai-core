import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./JobDashboardEmpty.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobDashboardEmpty({
  as: _Component = _Builtin.Block,
  onClickHowItWorks = {},
  onClickRequestIntegration = {},
  slotImport,
  onClickAddJob = {},
  onClickGreenHouse = {},
  textHeader = "Jobs",
  onClickAshby = {},
  onClickLever = {},
  isOldTitleVisible = true,
  isSelectTitleVisible = true,
  slotAts,
  isAtsOptionVisible = true,
  isConnectedVisible = true,
  isGreenhouseConnected = false,
  isAshbyConnected = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "job-dashboard-empty-landing-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "job-header-empty", "no-sticky")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {textHeader}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "job-empty-landing-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-274")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-option-wrapper")}
            tag="div"
          >
            {isSelectTitleVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Select an option to continue with"}
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-option-block-white")}
              tag="div"
              {...onClickAddJob}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-option-icon-block")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2225%22%20height%3D%2221%22%20viewBox%3D%220%200%2025%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.28137%200.937498C5.69153%200.964842%205.91028%201.18359%205.93762%201.59375C5.91028%202.0039%205.69153%202.22265%205.28137%202.25H4.297C3.64075%202.27734%203.09387%202.49609%202.65637%202.90625C2.24622%203.34375%202.02746%203.89062%202.00012%204.54687V5.53125C1.97278%205.94141%201.75403%206.16016%201.34387%206.1875C0.933715%206.16016%200.714965%205.94141%200.687621%205.53125V4.54687C0.714965%203.53515%201.07043%202.6875%201.75403%202.0039C2.43762%201.32031%203.28528%200.964842%204.297%200.937498H5.28137ZM0.687621%2012.0937V8.15625C0.714965%207.74609%200.933715%207.52734%201.34387%207.5C1.75403%207.52734%201.97278%207.74609%202.00012%208.15625V12.0937C1.97278%2012.5039%201.75403%2012.7227%201.34387%2012.75C0.933715%2012.7227%200.714965%2012.5039%200.687621%2012.0937ZM1.34387%2014.0625C1.75403%2014.0898%201.97278%2014.3086%202.00012%2014.7187V15.7031C2.02746%2016.3594%202.24622%2016.9062%202.65637%2017.3437C3.09387%2017.7539%203.64075%2017.9727%204.297%2018H5.28137C5.69153%2018.0273%205.91028%2018.2461%205.93762%2018.6563C5.91028%2019.0664%205.69153%2019.2852%205.28137%2019.3125H4.297C3.28528%2019.2852%202.43762%2018.9297%201.75403%2018.2461C1.07043%2017.5625%200.714965%2016.7148%200.687621%2015.7031V14.7187C0.714965%2014.3086%200.933715%2014.0898%201.34387%2014.0625ZM18.4474%207.54101C18.0372%207.51367%2017.8048%207.29492%2017.7501%206.88476V4.54687C17.7228%203.89062%2017.504%203.34375%2017.0939%202.90625C16.6564%202.49609%2016.1095%202.27734%2015.4532%202.25H14.4689C14.0587%202.22265%2013.84%202.0039%2013.8126%201.59375C13.84%201.18359%2014.0587%200.964842%2014.4689%200.937498H15.4532C16.465%200.964842%2017.3126%201.32031%2017.9962%202.0039C18.6798%202.6875%2019.0353%203.53515%2019.0626%204.54687V6.88476C19.0353%207.26758%2018.8302%207.48633%2018.4474%207.54101ZM7.25012%2018.6563C7.27747%2018.2461%207.49622%2018.0273%207.90637%2018H11.8439C12.254%2018.0273%2012.4728%2018.2461%2012.5001%2018.6563C12.4728%2019.0664%2012.254%2019.2852%2011.8439%2019.3125H7.90637C7.49622%2019.2852%207.27747%2019.0664%207.25012%2018.6563ZM11.8439%202.25H7.90637C7.49622%202.22265%207.27747%202.0039%207.25012%201.59375C7.27747%201.18359%207.49622%200.964842%207.90637%200.937498H11.8439C12.254%200.964842%2012.4728%201.18359%2012.5001%201.59375C12.4728%202.0039%2012.254%202.22265%2011.8439%202.25ZM23.0001%2014.7187C23.0001%2013.8984%2022.795%2013.1328%2022.3849%2012.4219C21.9747%2011.7109%2021.4142%2011.1504%2020.7032%2010.7402C19.9923%2010.3301%2019.2267%2010.125%2018.4064%2010.125C17.5861%2010.125%2016.8204%2010.3301%2016.1095%2010.7402C15.3986%2011.1504%2014.838%2011.7109%2014.4279%2012.4219C14.0177%2013.1328%2013.8126%2013.8984%2013.8126%2014.7187C13.8126%2015.5391%2014.0177%2016.3047%2014.4279%2017.0156C14.838%2017.7266%2015.3986%2018.2871%2016.1095%2018.6973C16.8204%2019.1074%2017.5861%2019.3125%2018.4064%2019.3125C19.2267%2019.3125%2019.9923%2019.1074%2020.7032%2018.6973C21.4142%2018.2871%2021.9747%2017.7266%2022.3849%2017.0156C22.795%2016.3047%2023.0001%2015.5391%2023.0001%2014.7187ZM12.5001%2014.7187C12.5001%2013.6523%2012.7599%2012.668%2013.2794%2011.7656C13.799%2010.8633%2014.5236%2010.1387%2015.4532%209.5918C16.3829%209.07226%2017.3673%208.8125%2018.4064%208.8125C19.4454%208.8125%2020.4298%209.07226%2021.3595%209.5918C22.2892%2010.1387%2023.0138%2010.8633%2023.5333%2011.7656C24.0529%2012.668%2024.3126%2013.6523%2024.3126%2014.7187C24.3126%2015.7852%2024.0529%2016.7695%2023.5333%2017.6719C23.0138%2018.5742%2022.2892%2019.2988%2021.3595%2019.8457C20.4298%2020.3652%2019.4454%2020.625%2018.4064%2020.625C17.3673%2020.625%2016.3829%2020.3652%2015.4532%2019.8457C14.5236%2019.2988%2013.799%2018.5742%2013.2794%2017.6719C12.7599%2016.7695%2012.5001%2015.7852%2012.5001%2014.7187ZM19.0626%2012.0937V14.0625H21.0314C21.4415%2014.0898%2021.6603%2014.3086%2021.6876%2014.7187C21.6603%2015.1289%2021.4415%2015.3477%2021.0314%2015.375H19.0626V17.3437C19.0353%2017.7539%2018.8165%2017.9727%2018.4064%2018C17.9962%2017.9727%2017.7775%2017.7539%2017.7501%2017.3437V15.375H15.7814C15.3712%2015.3477%2015.1525%2015.1289%2015.1251%2014.7187C15.1525%2014.3086%2015.3712%2014.0898%2015.7814%2014.0625H17.7501V12.0937C17.7775%2011.6836%2017.9962%2011.4648%2018.4064%2011.4375C18.8165%2011.4648%2019.0353%2011.6836%2019.0626%2012.0937Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-option-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Create job from scratch"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-imports-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-375")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Or Connect with your Applicant Tracking System (ATS)"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {slotAts ??
                (isAtsOptionVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-imports-options")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cj-option-block",
                        "grey-100"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-option-icon-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(_styles, "image-38")}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65155ad803eafe8aa1c3b68c_lever_rgb_logo_standard%201%20(2).svg"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-option-info")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "fw-semibold",
                            "text-kale-800"
                          )}
                          tag="div"
                        >
                          {"Lever"}
                        </_Builtin.Block>
                        {isConnectedVisible ? (
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-551")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "text-sm",
                                "fw-semibold",
                                "text-green-500"
                              )}
                              tag="div"
                            >
                              {"Connected"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        ) : null}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "click-fake-div")}
                        tag="div"
                        {...onClickLever}
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-option-block", "grey")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-option-icon-block")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2232%22%20viewBox%3D%220%200%2016%2032%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_2425_14921)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M8.26568%2031.4574C4.15195%2031.5176%200.79769%2027.9891%200.87484%2023.912C0.907438%2021.951%201.71299%2020.0821%203.11628%2018.7119C4.51958%2017.3417%206.4071%2016.581%208.36832%2016.5953C12.2867%2016.6059%2015.5673%2019.9688%2015.6381%2023.8908C15.7132%2028.0457%2012.2881%2031.5211%208.26568%2031.4574ZM14.3138%2024.0734C14.3386%2020.7056%2011.6461%2017.9564%208.29754%2017.9309C4.94894%2017.9055%202.21966%2020.6136%202.19135%2023.9807C2.17398%2025.5989%202.79991%2027.1579%203.93154%2028.3147C5.06316%2029.4716%206.60786%2030.1318%208.22605%2030.1501C11.5378%2030.1918%2014.2891%2027.4455%2014.3138%2024.0734ZM0.889704%208.95081C0.883169%208.14682%201.03572%207.34948%201.33859%206.6047C1.64145%205.85991%202.08864%205.18239%202.65441%204.61115C3.22018%204.0399%203.89335%203.58621%204.63517%203.2762C5.37698%202.96619%206.17279%202.80597%206.97678%202.80479C10.3176%202.79842%2013.0695%205.55751%2013.0745%208.91754C13.0801%2012.3257%2010.3714%2015.0848%207.01076%2015.0947C3.60058%2015.1039%200.899613%2012.3915%200.889704%208.95081ZM2.22815%208.91258C2.22206%209.53578%202.33878%2010.1541%202.57164%2010.7322C2.80449%2011.3103%203.14893%2011.8368%203.58528%2012.2818C4.02163%2012.7268%204.54135%2013.0814%205.11476%2013.3256C5.68818%2013.5697%206.30405%2013.6984%206.92724%2013.7045C7.55042%2013.7106%208.16869%2013.5939%208.74677%2013.361C9.32484%2013.1282%209.85139%2012.7837%2010.2963%2012.3474C10.7413%2011.911%2011.096%2011.3913%2011.3401%2010.8178C11.5842%2010.2444%2011.713%209.62851%2011.719%209.00531C11.736%206.34885%209.63386%204.18292%207.01925%204.16168C4.39119%204.14328%202.24868%206.26674%202.22815%208.91258ZM10.5781%201.24192C10.5803%200.91133%2010.7138%200.595179%2010.9491%200.363013C11.0657%200.248056%2011.2037%200.157178%2011.3554%200.095567C11.507%200.0339563%2011.6693%200.00281976%2011.833%200.00393519C11.9967%200.00505062%2012.1585%200.0383961%2012.3093%200.102068C12.4601%200.16574%2012.5969%200.258491%2012.7119%200.375025C12.8268%200.49156%2012.9177%200.629596%2012.9793%200.781252C13.0409%200.932908%2013.0721%201.09521%2013.0709%201.2589C13.0727%201.42424%2013.0415%201.58826%2012.979%201.74134C12.9165%201.89442%2012.8241%202.03347%2012.7071%202.15032C12.5901%202.26717%2012.451%202.35946%2012.2978%202.42177C12.1447%202.48408%2011.9806%202.51515%2011.8153%202.51316C11.1146%202.50821%2010.5781%201.95611%2010.5781%201.24192Z%22%20fill%3D%22%2338B2A7%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip0_2425_14921%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2231.5219%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-option-info")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "fw-semibold",
                            "new-greenhouse"
                          )}
                          tag="div"
                        >
                          {"Greenhouse"}
                        </_Builtin.Block>
                        {isGreenhouseConnected ? (
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-551")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "text-sm",
                                "fw-semibold",
                                "text-green-500"
                              )}
                              tag="div"
                            >
                              {"Connected"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        ) : null}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "click-fake-div")}
                        tag="div"
                        {...onClickGreenHouse}
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-option-block", "asley")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-option-icon-block",
                          "asby"
                        )}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(_styles, "asby-image")}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65438807454d4544425709f4_ash%20-%20png.svg"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-option-info")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "fw-semibold",
                            "new-greenhouse"
                          )}
                          tag="div"
                        >
                          {"Ashby"}
                        </_Builtin.Block>
                        {isAshbyConnected ? (
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-551")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "text-sm",
                                "fw-semibold",
                                "text-green-500"
                              )}
                              tag="div"
                            >
                              {"Connected"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        ) : null}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "click-fake-div")}
                        tag="div"
                        {...onClickAshby}
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null)}
            </_Builtin.Block>
            {isAtsOptionVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "If the applicant tracking system (ATS) you are using is not listed here, please don't hesitate to "
                }
                <_Builtin.Span
                  className={_utils.cx(
                    _styles,
                    "text-blue-500",
                    "cursor-pointer"
                  )}
                  {...onClickRequestIntegration}
                >
                  {"request integration"}
                </_Builtin.Span>
                {
                  ". In addition to ATS, we also support integrations with a variety of other tools such as Slack, Dropbox, Google Drive, and more to enhance your workflow and improve efficiency."
                }
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
