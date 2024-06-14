"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InterviewWelcome.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1388":{"id":"e-1388","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-491","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1389"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"12a2d91a-7668-4d3c-6f7d-217c73bd52c8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"12a2d91a-7668-4d3c-6f7d-217c73bd52c8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697782416892},"e-1390":{"id":"e-1390","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-491","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1391"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"12a2d91a-7668-4d3c-6f7d-217c73bd5370","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"12a2d91a-7668-4d3c-6f7d-217c73bd5370","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697782214993},"e-1392":{"id":"e-1392","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-491","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1393"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"12a2d91a-7668-4d3c-6f7d-217c73bd537c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"12a2d91a-7668-4d3c-6f7d-217c73bd537c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697744051630},"e-1394":{"id":"e-1394","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-492","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1395"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"12a2d91a-7668-4d3c-6f7d-217c73bd5382","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"12a2d91a-7668-4d3c-6f7d-217c73bd5382","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697743748577},"e-1396":{"id":"e-1396","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-492","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1397"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a28c5e5f-5732-456b-f7c4-7e1c449eb8af","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a28c5e5f-5732-456b-f7c4-7e1c449eb8af","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697792557660},"e-1400":{"id":"e-1400","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-492","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1401"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"480911d7-c6cf-5ff6-539d-ecaccabd7e08","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"480911d7-c6cf-5ff6-539d-ecaccabd7e08","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697817962975},"e-1466":{"id":"e-1466","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-536","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1467"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7b3dfdf9-b2e7-63e8-1017-189b33267da3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7b3dfdf9-b2e7-63e8-1017-189b33267da3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700055514155},"e-1467":{"id":"e-1467","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-537","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1466"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7b3dfdf9-b2e7-63e8-1017-189b33267da3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7b3dfdf9-b2e7-63e8-1017-189b33267da3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700055514158},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-491":{"id":"a-491","title":"End Tour","actionItemGroups":[{"actionItems":[{"id":"a-491-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".tour_wrapper.scaled_down","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62f95","47c70c30-605f-2505-03c7-c15de2e62fbb"]},"value":0,"unit":""}},{"id":"a-491-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"ease","duration":300,"target":{"selector":".tour_popup_overlay","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62f92"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-491-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".tour_popup","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62fa2"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697743751343},"a-492":{"id":"a-492","title":"Start Tour","actionItemGroups":[{"actionItems":[{"id":"a-492-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".tour_popup","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62fa2"]},"value":"none"}},{"id":"a-492-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".profile-completion-indicator-wrap","selectorGuids":["0b8edd79-9c19-935b-1209-3e1b7eebe306"]},"value":"flex"}},{"id":"a-492-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".tour_wrapper.scaled_down","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62f95","47c70c30-605f-2505-03c7-c15de2e62fbb"]},"value":0,"unit":""}},{"id":"a-492-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".tour_popup_overlay","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62f92"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-492-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".tour_popup","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62fa2"]},"value":"flex"}}]},{"actionItems":[{"id":"a-492-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":500,"target":{"selector":".tour_popup_overlay","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62f92"]},"value":1,"unit":""}},{"id":"a-492-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".profile-completion-indicator-wrap","selectorGuids":["0b8edd79-9c19-935b-1209-3e1b7eebe306"]},"value":"none"}},{"id":"a-492-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".tour_wrapper.scaled_down","selectorGuids":["47c70c30-605f-2505-03c7-c15de2e62f95","47c70c30-605f-2505-03c7-c15de2e62fbb"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697743751343},"a-536":{"id":"a-536","title":"Welcome Interview Overlay Hover in","actionItemGroups":[{"actionItems":[{"id":"a-536-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".welcome-video-overlay","selectorGuids":["bba2548d-7cab-3fc7-3c6f-34bfdfc157cd"]},"value":0,"unit":""}},{"id":"a-536-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".welcome-video-overlay","selectorGuids":["bba2548d-7cab-3fc7-3c6f-34bfdfc157cd"]},"value":"none"}}]},{"actionItems":[{"id":"a-536-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".welcome-video-overlay","selectorGuids":["bba2548d-7cab-3fc7-3c6f-34bfdfc157cd"]},"value":1,"unit":""}},{"id":"a-536-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".welcome-video-overlay","selectorGuids":["bba2548d-7cab-3fc7-3c6f-34bfdfc157cd"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700055521829},"a-537":{"id":"a-537","title":"Welcome Interview Overlay Hover out","actionItemGroups":[{"actionItems":[{"id":"a-537-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".welcome-video-overlay","selectorGuids":["bba2548d-7cab-3fc7-3c6f-34bfdfc157cd"]},"value":0,"unit":""}},{"id":"a-537-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".welcome-video-overlay","selectorGuids":["bba2548d-7cab-3fc7-3c6f-34bfdfc157cd"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700055521829},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewWelcome({
  as: _Component = _Builtin.Block,
  slotLogo,
  textRole = "Senior Product Designer",
  textCompany = "Adidas",
  onClickStart = {},
  onClickAboutCompany = {},
  onClickSupport = {},
  textCompanyDescription = "Aglint is a San Francisco-based startup founded by successful founders who are passionate about making a difference in the talent development industry. Our team is in stealth mode, working hard to develop an all-in-one talent development platform that provides solutions to help companies develop, retain, and support their employees.",
  isAboutVisible = true,
  slotWelcomeVideo,
  isPlayPuaseVisible = true,
  isPauseButtonVisible = false,
  isPlayButtonVisible = true,
  onClickPlay = {},
  onClickPause = {},
  isWelcomeVideoVisible = true,
  slotAssessmentInstruction,
  isPreviewWarningVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview-start-wrapper")}
      tag="address"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3C!--%3Clink%20rel%3D%22stylesheet%22%20href%3D%22http%3A%2F%2F127.0.0.1%3A5500%2Fmywebflow%2FAglint%2Fanimation.css%22%3E%0A%3Cscript%20defer%20src%3D%22http%3A%2F%2F127.0.0.1%3A5500%2Fmywebflow%2FAglint%2Ftour.js%22%3E%3C%2Fscript%3E--%3E%0A%3Cstyle%3E%0A%5Btour-box%5D%7B%0A%20%20%20%20display%3Anone%3B%0A%20%20%20%20animation%3A%20fade-out%200.3s%20ease-in-out%20forwards%3B%0A%20%7D%0A%5Btour-box-active%3D%22true%22%5D%20%7B%0A%20%20%20display%3Aflex%20!important%3B%0A%20%20%20animation%3A%20fade-in%200.3s%20ease-in-out%20forwards%3B%0A%7D%0A%5Bdata-active-step%3D%22true%22%5D%7B%0A%20%20%20%20opacity%3A1%3B%0A%20%20%20%20box-shadow%3A%200%200%200%204px%20%23ADCCE4%3B%0A%20%20%20%20transition%3A%20opacity%200.3s%20ease-in%2C%20box-shadow%200.3s%20ease-in%3B%0A%7D%0A%5Bdata-active-step%3D%22false%22%5D%7B%0A%20%20%20%20opacity%3A0.3%3B%0A%20%20%20%20box-shadow%3A%200%200%200%200px%20%23ADCCE4%3B%0A%20%20%20%20transition%3A%20opacity%200.3s%20ease-in%2C%20box-shadow%200.3s%20ease-in%3B%0A%7D%0A%5Bdata-tour-completed%3D%22true%22%5D%7B%0A%20%20%20%20display%3Aflex%20!important%3B%0A%20%20%20%20animation%3A%20fade-in%200.3s%20ease-in-out%20forwards%3B%0A%7D%0A%5Bdata-tour-completed%3D%22false%22%5D%7B%0A%20%20%20%20animation%3A%20fade-out%200.3s%20ease-in-out%20forwards%3B%0A%20%20%20%20display%3Anone%20!important%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-welcome-header-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-company-logo-interview-welcome")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interview-start-header-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-xxl",
              "fw-semibold",
              "text-grey-700"
            )}
            tag="div"
          >
            {"Welcome to the AI based Assessment for"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-xxl",
              "fw-semibold",
              "inline-at"
            )}
            tag="div"
          >
            {textRole}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-xxl",
              "fw-semibold",
              "text-grey-700",
              "inline-start"
            )}
            tag="div"
          >
            {"position at"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-xxl",
              "fw-semibold",
              "inline-start"
            )}
            tag="div"
          >
            {textCompany}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-start-sub-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interview-start-left")}
          tag="div"
        >
          {isWelcomeVideoVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "welcome-video-wrap")}
              data-w-id="7b3dfdf9-b2e7-63e8-1017-189b33267da3"
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-welcome-video")}
                tag="div"
              >
                {slotWelcomeVideo}
              </_Builtin.Block>
              {isPlayPuaseVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "welcome-video-overlay")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {isPlayButtonVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "play-wrappers-wlcome")}
                        tag="div"
                        {...onClickPlay}
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons", "ml-5")}
                          value="%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewbox%3D%220%200%2011%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.85689%205.076C10.523%205.46185%2010.5216%206.4241%209.85443%206.80805L1.71375%2011.4927C1.04654%2011.8766%200.213886%2011.3943%200.21498%2010.6245L0.228327%201.23216C0.229421%200.462363%201.06344%20-0.0175788%201.72956%200.368268L9.85689%205.076Z%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                    ) : null}
                    {isPauseButtonVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "play-wrappers-wlcome")}
                        tag="div"
                        {...onClickPause}
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2218%22%20height%3D%2221%22%20viewbox%3D%220%200%208%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Crect%20x%3D%225%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "instruction-wrapper")}
            tag="div"
          >
            {slotAssessmentInstruction ?? (
              <>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-lg",
                    "fw-semibold",
                    "color-grey-600"
                  )}
                  tag="div"
                >
                  {"Assessment Instructions"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  <_Builtin.List
                    className={_utils.cx(_styles, "instruction")}
                    tag="ul"
                    unstyled={false}
                  >
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "instruction-list")}
                    >
                      <_Builtin.Span
                        className={_utils.cx(_styles, "fw-semibold")}
                      >
                        {"Quiet Environment"}
                      </_Builtin.Span>
                      <br />
                      <_Builtin.Span
                        className={_utils.cx(_styles, "list-nxt-text")}
                      >
                        {
                          "Choose a quiet place to take the assessment where you will not be interrupted."
                        }
                      </_Builtin.Span>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "instruction-list")}
                    >
                      <_Builtin.Span
                        className={_utils.cx(_styles, "fw-semibold")}
                      >
                        {"Interruptions"}
                      </_Builtin.Span>
                      <br />
                      <_Builtin.Span
                        className={_utils.cx(_styles, "list-nxt-text")}
                      >
                        {
                          "If the assessment is stopped for any reason, you will need to start over from the beginning."
                        }
                      </_Builtin.Span>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "instruction-list")}
                    >
                      <_Builtin.Span
                        className={_utils.cx(_styles, "fw-semibold")}
                      >
                        {"Question Types"}
                      </_Builtin.Span>
                      <br />
                      <_Builtin.Span
                        className={_utils.cx(_styles, "list-nxt-text")}
                      >
                        {
                          "You will be asked questions based on the job requirements. Prepare yourself accordingly."
                        }
                      </_Builtin.Span>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "instruction-list")}
                    >
                      <_Builtin.Span
                        className={_utils.cx(_styles, "fw-semibold")}
                      >
                        {"Answer Submission"}
                        <br />
                      </_Builtin.Span>
                      <_Builtin.Span
                        className={_utils.cx(_styles, "list-nxt-text")}
                      >
                        {
                          "You have the option to submit your answers via voice or by typing them out."
                        }
                      </_Builtin.Span>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "instruction-list")}
                    >
                      <_Builtin.Span
                        className={_utils.cx(_styles, "fw-semibold")}
                      >
                        {"Timing"}
                        <br />
                      </_Builtin.Span>
                      <_Builtin.Span
                        className={_utils.cx(_styles, "list-nxt-text")}
                      >
                        {
                          "Feel free to answer the questions right after they are asked. There's no need to wait for a prompt to proceed."
                        }
                      </_Builtin.Span>
                    </_Builtin.ListItem>
                  </_Builtin.List>
                </_Builtin.Block>
              </>
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "start-interview-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-471")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.Block tag="div">
                  {
                    "Note: Please be aware that the video will not be recorded and stored for any type of further processing. It will be used only for assessing assessment quality."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "terms-wrappers")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-medium")}
                  tag="div"
                >
                  {"By clicking start you are agreeing aglint’s "}
                </_Builtin.Block>
                <_Builtin.Link
                  className={_utils.cx(_styles, "terms-link")}
                  button={false}
                  block=""
                  options={{
                    href: "https://www.aglinthq.com/terms",
                    target: "_blank",
                  }}
                >
                  {"terms and conditions"}
                </_Builtin.Link>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "start-tour-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "start-button")}
              tag="div"
              {...onClickStart}
            >
              <_Builtin.Block tag="div">{"Start Assessment"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-525")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-blue-500",
                  "text-underline"
                )}
                data-w-id="a28c5e5f-5732-456b-f7c4-7e1c449eb8af"
                tag="div"
                data-next-button="1"
              >
                {"Take the Tour"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "profile-completion-indicator-wrap"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "profile-indicator-incomplete-wrap"
                  )}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "indicator-bg")}
                    value="%3Cstyle%3E%0A.incomplete-animating-bg%7B%0Aposition%3A%20absolute%3B%0A%20%20%20%20width%3A%2010px%3B%0A%20%20%20%20height%3A%2010px%3B%0A%20%20%20%20border-radius%3A%2050%25%3B%0A%20%20%20%20background-color%3A%20%23aecfc2%3B%0Aanimation%3A%20sizeprogress%201.5s%20ease%20infinite%3B%0A%7D%0A%40keyframes%20sizeprogress%20%7B%0A%20%200%25%20%7B%0A%20%20%20%20width%3A%2010px%3B%0A%20%20%20%20height%3A10px%3B%0A%20%20%20%20opacity%3A1%3B%0A%20%20%7D%0A%20%20100%25%20%7B%0A%20%20%20%20width%3A%2024px%3B%0A%20%20%20%20height%3A24px%3B%0A%20%20%20%20opacity%3A0.2%3B%0A%20%20%7D%0A%7D%0A%3C%2Fstyle%3E%0A%3Cdiv%20class%3D%22incomplete-animating-bg%22%3E%0A%0A%3C%2Fdiv%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "profile-completion-indicator"
                    )}
                    tag="div"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "tour_comp")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "tour_popup")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "tour_popup_overlay")}
                  data-w-id="12a2d91a-7668-4d3c-6f7d-217c73bd52c8"
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "tour_wrapper", "scaled_down")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "tour_container")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "tour_top_bar")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "emebed_flex")}
                        value="%3Csvg%20width%3D%22120%22%20height%3D%2229%22%20viewbox%3D%220%200%20120%2029%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M23.6132%2013.4393C20.3976%2012.6336%2018.7861%2012.2382%2017.6745%2011.1265C16.5628%2010.0074%2016.1674%208.40334%2015.3616%205.18776L14.1754%200.450195L12.9891%205.18776C12.1834%208.40334%2011.7879%2010.0149%2010.6763%2011.1265C9.55718%2012.2382%207.95313%2012.6336%204.73756%2013.4393L0%2014.6256L4.73756%2015.8118C7.95313%2016.6176%209.56465%2017.013%2010.6763%2018.1247C11.7879%2019.2438%2012.1834%2020.8478%2012.9891%2024.0634L14.1754%2028.801L15.3616%2024.0634C16.1674%2020.8478%2016.5628%2019.2363%2017.6745%2018.1247C18.7936%2017.013%2020.3976%2016.6176%2023.6132%2015.8118L28.3507%2014.6256L23.6132%2013.4393Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M38.1563%2023.2642C37.1557%2023.2642%2036.2218%2023.0863%2035.3546%2022.7306C34.5096%2022.3526%2033.8203%2021.8078%2033.2867%2021.0962C32.7752%2020.3625%2032.5195%2019.4508%2032.5195%2018.3612C32.5195%2016.8047%2033.0643%2015.5595%2034.1539%2014.6256C35.2657%2013.6917%2036.9%2013.2247%2039.0569%2013.2247H43.7264V12.7911C43.7264%2011.8127%2043.4485%2011.1234%2042.8926%2010.7232C42.3589%2010.3229%2041.2693%2010.1228%2039.6239%2010.1228C37.8228%2010.1228%2036.0884%2010.4008%2034.4207%2010.9567V7.78804C35.1545%207.49898%2036.0439%207.2655%2037.089%207.08761C38.1563%206.88749%2039.3126%206.78743%2040.5578%206.78743C42.937%206.78743%2044.7715%207.27662%2046.0612%208.255C47.3731%209.21114%2048.0291%2010.7565%2048.0291%2012.8912V22.9307H44.1267L43.8932%2021.4965C43.2706%2022.0524%2042.5034%2022.486%2041.5918%2022.7973C40.6801%2023.1086%2039.535%2023.2642%2038.1563%2023.2642ZM39.3904%2020.2957C40.391%2020.2957%2041.2582%2020.129%2041.992%2019.7954C42.7258%2019.4619%2043.3039%2019.0394%2043.7264%2018.528V16.0264H39.1569C37.4003%2016.0264%2036.522%2016.7491%2036.522%2018.1944C36.522%2019.5953%2037.4781%2020.2957%2039.3904%2020.2957Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M58.6593%2028.801C57.4808%2028.801%2056.2689%2028.7232%2055.0237%2028.5675C53.8007%2028.4118%2052.7668%2028.1895%2051.9218%2027.9004V24.5317C52.8112%2024.8208%2053.8563%2025.0431%2055.0571%2025.1988C56.2578%2025.3766%2057.3807%2025.4656%2058.4258%2025.4656C59.9601%2025.4656%2061.0719%2025.3766%2061.7612%2025.1988C62.4505%2025.0431%2062.7952%2024.754%2062.7952%2024.3316C62.7952%2023.9758%2062.6395%2023.7312%2062.3282%2023.5978C62.0391%2023.4644%2061.4165%2023.3977%2060.4604%2023.3977H56.1577C53.3338%2023.3977%2051.9218%2022.3526%2051.9218%2020.2624C51.9218%2019.6175%2052.0997%2019.0283%2052.4555%2018.4946C52.8112%2017.961%2053.3783%2017.5385%2054.1565%2017.2272C52.3554%2016.3155%2051.4549%2014.7812%2051.4549%2012.6244C51.4549%2010.5787%2052.0886%209.09996%2053.356%208.18829C54.6235%207.25438%2056.5024%206.78743%2058.9928%206.78743C59.5042%206.78743%2060.0601%206.8319%2060.6605%206.92084C61.2831%206.98755%2061.7501%207.05426%2062.0614%207.12097H67.9984L67.8983%209.95605H65.3968C66.0861%2010.6009%2066.4307%2011.5014%2066.4307%2012.6577C66.4307%2014.2809%2065.9193%2015.5817%2064.8964%2016.5601C63.8736%2017.5163%2062.3616%2017.9943%2060.3603%2017.9943C60.0046%2017.9943%2059.6599%2017.9832%2059.3264%2017.961C59.0151%2017.9165%2058.6926%2017.872%2058.3591%2017.8276C57.692%2017.9165%2057.125%2018.0722%2056.6581%2018.2945C56.2133%2018.5169%2055.991%2018.8171%2055.991%2019.1951C55.991%2019.7065%2056.4468%2019.9622%2057.3585%2019.9622H61.8279C63.4289%2019.9622%2064.663%2020.3291%2065.5302%2021.0629C66.3974%2021.7744%2066.831%2022.8195%2066.831%2024.1981C66.831%2025.7547%2066.1305%2026.9109%2064.7297%2027.6669C63.3288%2028.423%2061.3054%2028.801%2058.6593%2028.801ZM59.0262%2015.4594C60.3603%2015.4594%2061.2831%2015.2371%2061.7945%2014.7924C62.3282%2014.3254%2062.595%2013.5471%2062.595%2012.4576C62.595%2011.368%2062.3282%2010.5787%2061.7945%2010.0895C61.2831%209.60027%2060.3603%209.35568%2059.0262%209.35568C57.7587%209.35568%2056.8471%209.60027%2056.2912%2010.0895C55.7353%2010.5564%2055.4573%2011.3458%2055.4573%2012.4576C55.4573%2013.4804%2055.713%2014.2365%2056.2245%2014.7256C56.7581%2015.2148%2057.692%2015.4594%2059.0262%2015.4594Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M75.4537%2023.2642C73.9194%2023.2642%2072.7965%2022.9085%2072.085%2022.1969C71.3957%2021.4854%2071.051%2020.3513%2071.051%2018.7948V0.450195H75.5538V18.4279C75.5538%2018.9838%2075.665%2019.373%2075.8873%2019.5953C76.1097%2019.7954%2076.4321%2019.8955%2076.8546%2019.8955C77.4327%2019.8955%2077.9552%2019.8177%2078.4222%2019.662V22.7639C77.5772%2023.0975%2076.5877%2023.2642%2075.4537%2023.2642Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M81.2471%204.21918V0.683671H86.1501V4.21918H81.2471ZM81.614%2022.9307V10.4564H79.2459L79.6461%207.12097H86.1168V22.9307H81.614Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M90.2842%2022.9307V7.12097H94.4534L94.6202%208.62189C95.265%208.1327%2096.0766%207.71022%2097.055%207.35444C98.0556%206.97643%2099.1007%206.78743%20100.19%206.78743C102.28%206.78743%20103.804%207.27662%20104.76%208.255C105.716%209.23338%20106.194%2010.7454%20106.194%2012.7911V22.9307H101.691V13.0246C101.691%2011.9573%20101.469%2011.2013%20101.024%2010.7565C100.602%2010.3118%2099.8011%2010.0895%2098.6226%2010.0895C97.9333%2010.0895%2097.2329%2010.2451%2096.5213%2010.5564C95.832%2010.8677%2095.2539%2011.2568%2094.7869%2011.7238V22.9307H90.2842Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M116.464%2023.2642C114.641%2023.2642%20113.284%2022.7862%20112.395%2021.83C111.528%2020.8739%20111.094%2019.5731%20111.094%2017.9276V10.5898H108.859V7.12097H111.094V3.71887L115.597%202.38472V7.12097H119.599L119.332%2010.5898H115.597V17.6274C115.597%2018.4946%20115.797%2019.095%20116.197%2019.4285C116.597%2019.7398%20117.22%2019.8955%20118.065%2019.8955C118.688%2019.8955%20119.332%2019.7843%20120%2019.562V22.6639C119.51%2022.864%20118.977%2023.0085%20118.399%2023.0975C117.82%2023.2086%20117.176%2023.2642%20116.464%2023.2642Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_top_buttons")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "tour_button",
                            "transcript"
                          )}
                          tag="div"
                          data-tour-step="7"
                          data-active-step=""
                        >
                          <_Builtin.Block tag="div">
                            {"Transcript"}
                          </_Builtin.Block>
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "emebed_flex")}
                            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.3333%202.66699C15.6606%202.66699%2015.9328%202.90283%2015.9893%203.21382L16%203.33366V7.33366C16%207.70185%2015.7015%208.00033%2015.3333%208.00033C15.0061%208.00033%2014.7339%207.76449%2014.6774%207.45349L14.6667%207.33366V4.94166L9.13807%2010.4717C8.90665%2010.7032%208.54742%2010.7289%208.28759%2010.5489L8.19526%2010.4717L6%208.27632L1.13807%2013.1384C0.906649%2013.3698%200.547417%2013.3955%200.287593%2013.2155L0.195262%2013.1384C-0.0361597%2012.907%20-0.0618732%2012.5477%200.118122%2012.2879L0.195262%2012.1956L5.5286%206.86225C5.76002%206.63083%206.11925%206.60512%206.37907%206.78511L6.4714%206.86225L8.66667%209.05766L13.7227%204.00033H11.3333C11.0061%204.00033%2010.7339%203.76449%2010.6774%203.45349L10.6667%203.33366C10.6667%203.00638%2010.9025%202.73418%2011.2135%202.67773L11.3333%202.66699H15.3333Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "tour_button",
                            "end_interview"
                          )}
                          tag="div"
                          data-tour-step="8"
                          data-active-step=""
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "emebed_flex")}
                            value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.66797%2011.0859C8.52214%2011.25%208.34896%2011.2865%208.14844%2011.1953C7.1276%2010.7214%206.22526%2010.0924%205.44141%209.30859C4.65755%208.52474%204.02865%207.6224%203.55469%206.60156C3.46354%206.40104%203.5%206.22786%203.66406%206.08203L5.00391%204.98828C5.24089%204.76953%205.30469%204.51432%205.19531%204.22266L4.10156%201.59766C3.9375%201.26953%203.68229%201.14193%203.33594%201.21484L0.929688%201.87109C0.619792%201.96224%200.455729%202.17188%200.4375%202.5C0.455729%204.70573%200.99349%206.69271%202.05078%208.46094C3.10807%2010.2292%204.52083%2011.6419%206.28906%2012.6992C8.05729%2013.7565%2010.0443%2014.2943%2012.25%2014.3125C12.5781%2014.2943%2012.7878%2014.1302%2012.8789%2013.8203L13.5352%2011.4141C13.6081%2011.0677%2013.4805%2010.8125%2013.1523%2010.6484L10.5273%209.55469C10.2357%209.44531%209.98958%209.50911%209.78906%209.74609L8.66797%2011.0859ZM8.33984%2010.8125L9.43359%209.47266C9.77995%209.08984%2010.1992%208.98047%2010.6914%209.14453L13.3164%2010.2383C13.5716%2010.3477%2013.763%2010.5208%2013.8906%2010.7578C14%2011.013%2014.0273%2011.2773%2013.9727%2011.5508L13.3164%2013.957C13.1341%2014.4492%2012.7786%2014.7135%2012.25%2014.75C9.97135%2014.7318%207.91146%2014.1758%206.07031%2013.082C4.22917%2011.9883%202.76172%2010.5208%201.66797%208.67969C0.574219%206.83854%200.0182292%204.77865%200%202.5C0.0364583%201.97135%200.309896%201.61589%200.820312%201.43359L3.22656%200.777344C3.48177%200.722656%203.73698%200.75%203.99219%200.859375C4.22917%200.96875%204.40234%201.16016%204.51172%201.43359L5.60547%204.05859C5.76953%204.55078%205.66016%204.97005%205.27734%205.31641L3.9375%206.41016C4.39323%207.3763%204.99479%208.24219%205.74219%209.00781C6.50781%209.75521%207.3737%2010.3568%208.33984%2010.8125Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block tag="div">
                            {"End interview"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_box_step_7")}
                        tag="div"
                        tour-box="7"
                        tour-box-active=""
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "tour_indicator_right",
                            "indi_7"
                          )}
                          value="%3Csvg%20width%3D%2227%22%20height%3D%22129%22%20viewbox%3D%220%200%2027%20129%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_d_3755_53515)%22%3E%0A%3Ccircle%20cx%3D%2213.6152%22%20cy%3D%22111.756%22%20r%3D%225%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cline%20x1%3D%2213.0957%22%20y1%3D%22106.687%22%20x2%3D%2213.0957%22%20y2%3D%224.68652%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_3755_53515%22%20x%3D%22-0.404297%22%20y%3D%220.686523%22%20width%3D%2227.0195%22%20height%3D%22128.069%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3Cfecolormatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3Cfeoffset%20dy%3D%224%22%2F%3E%0A%3Cfegaussianblur%20stddeviation%3D%224%22%2F%3E%0A%3Cfecolormatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200.0156863%200%200%200%200%200.266667%200%200%200%200%200.301961%200%200%200%200.15%200%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_3755_53515%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_3755_53515%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_description_box")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_title")}
                            tag="div"
                          >
                            {"View Transcript"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tour_box_description"
                            )}
                            tag="div"
                          >
                            {
                              "View the current transcript of the interview here."
                            }
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_bottom")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_box_title")}
                              tag="div"
                            >
                              {"7 / 8"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_button_flex")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_prec"
                                )}
                                tag="div"
                                data-next-button="6"
                              >
                                <_Builtin.Block tag="div">
                                  {"Prev"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_button"
                                )}
                                tag="div"
                                data-next-button="8"
                              >
                                <_Builtin.Block tag="div">
                                  {"Next"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_box_step_8")}
                        tag="div"
                        tour-box="8"
                        tour-box-active=""
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "tour_indicator_right",
                            "indi_7"
                          )}
                          value="%3Csvg%20width%3D%2227%22%20height%3D%22129%22%20viewbox%3D%220%200%2027%20129%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_d_3755_53515)%22%3E%0A%3Ccircle%20cx%3D%2213.6152%22%20cy%3D%22111.756%22%20r%3D%225%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cline%20x1%3D%2213.0957%22%20y1%3D%22106.687%22%20x2%3D%2213.0957%22%20y2%3D%224.68652%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_3755_53515%22%20x%3D%22-0.404297%22%20y%3D%220.686523%22%20width%3D%2227.0195%22%20height%3D%22128.069%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3Cfecolormatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3Cfeoffset%20dy%3D%224%22%2F%3E%0A%3Cfegaussianblur%20stddeviation%3D%224%22%2F%3E%0A%3Cfecolormatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200.0156863%200%200%200%200%200.266667%200%200%200%200%200.301961%200%200%200%200.15%200%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_3755_53515%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_3755_53515%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_description_box")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_title")}
                            tag="div"
                          >
                            {"End Interview"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tour_box_description"
                            )}
                            tag="div"
                          >
                            {
                              "Interview will be completed automatically once you finishes all questions. But if you want to cancel the interview you can end interview.Remember your interview status will be marked as incomplete by ending interview"
                            }
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_bottom")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_box_title")}
                              tag="div"
                            >
                              {"8 / 8"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_button_flex")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_prec"
                                )}
                                tag="div"
                                data-next-button="7"
                              >
                                <_Builtin.Block tag="div">
                                  {"Prev"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_button"
                                )}
                                tag="div"
                                data-next-button="finish"
                              >
                                <_Builtin.Block tag="div">
                                  {"Finish"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "tour_grid_layout")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_candidate_block")}
                        id={_utils.cx(
                          _styles,
                          "w-node-_12a2d91a-7668-4d3c-6f7d-217c73bd52f9-c25f4a74"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_candidate_video")}
                          tag="div"
                          data-tour-step="2"
                          data-active-step=""
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "tour_cover_image")}
                            loading="eager"
                            width="auto"
                            height="auto"
                            alt=""
                            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65324132c153f2d8cc942777_candidate_sample.png"
                          />
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "timer_embed")}
                            value="%3Csvg%20width%3D%22105%22%20height%3D%2235%22%20viewbox%3D%220%200%20105%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%22105%22%20height%3D%2235.0002%22%20rx%3D%2217.5001%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M31.0944%2016.7676C31.0944%2014.5201%2031.4603%2012.7692%2032.192%2011.5148C32.9238%2010.2473%2034.2043%209.61356%2036.0336%209.61356C37.8499%209.61356%2039.1239%2010.2473%2039.8556%2011.5148C40.5874%2012.7692%2040.9532%2014.5201%2040.9532%2016.7676C40.9532%2019.0543%2040.5874%2020.8313%2039.8556%2022.0988C39.1239%2023.3663%2037.8499%2024%2036.0336%2024C34.2043%2024%2032.9238%2023.3663%2032.192%2022.0988C31.4603%2020.8313%2031.0944%2019.0543%2031.0944%2016.7676ZM39.1892%2016.7676C39.1892%2015.6308%2039.1108%2014.6704%2038.954%2013.8864C38.8103%2013.0893%2038.5032%2012.449%2038.0328%2011.9656C37.5755%2011.4821%2036.9091%2011.2404%2036.0336%2011.2404C35.1451%2011.2404%2034.4656%2011.4821%2033.9952%2011.9656C33.5379%2012.449%2033.2308%2013.0893%2033.074%2013.8864C32.9303%2014.6704%2032.8584%2015.6308%2032.8584%2016.7676C32.8584%2017.9436%2032.9303%2018.9301%2033.074%2019.7272C33.2308%2020.5243%2033.5379%2021.1645%2033.9952%2021.648C34.4656%2022.1315%2035.1451%2022.3732%2036.0336%2022.3732C36.9091%2022.3732%2037.5755%2022.1315%2038.0328%2021.648C38.5032%2021.1645%2038.8103%2020.5243%2038.954%2019.7272C39.1108%2018.9301%2039.1892%2017.9436%2039.1892%2016.7676ZM43.1863%2022.5692C44.8457%2021.2364%2046.1459%2020.1453%2047.0867%2019.296C48.0275%2018.4336%2048.818%2017.5385%2049.4583%2016.6108C50.1116%2015.67%2050.4383%2014.7488%2050.4383%2013.8472C50.4383%2012.9978%2050.2292%2012.3314%2049.8111%2011.848C49.406%2011.3514%2048.7462%2011.1032%2047.8315%2011.1032C46.9429%2011.1032%2046.2504%2011.3841%2045.7539%2011.946C45.2704%2012.4948%2045.0091%2013.233%2044.9699%2014.1608H43.2451C43.2973%2012.6973%2043.7416%2011.567%2044.5779%2010.77C45.4141%209.9729%2046.4921%209.57436%2047.8119%209.57436C49.1578%209.57436%2050.2227%209.94676%2051.0067%2010.6916C51.8038%2011.4364%2052.2023%2012.4621%2052.2023%2013.7688C52.2023%2014.8533%2051.8756%2015.9117%2051.2223%2016.944C50.582%2017.9632%2049.8503%2018.8648%2049.0271%2019.6488C48.2039%2020.4197%2047.152%2021.3213%2045.8715%2022.3536H52.6139V23.8432H43.1863V22.5692ZM60.7635%2024.1176C60.4238%2024.1176%2060.1363%2024%2059.9011%2023.7648C59.6659%2023.5296%2059.5483%2023.2421%2059.5483%2022.9024C59.5483%2022.5627%2059.6659%2022.2752%2059.9011%2022.04C60.1363%2021.8048%2060.4238%2021.6872%2060.7635%2021.6872C61.0902%2021.6872%2061.3646%2021.8048%2061.5867%2022.04C61.8219%2022.2752%2061.9395%2022.5627%2061.9395%2022.9024C61.9395%2023.2421%2061.8219%2023.5296%2061.5867%2023.7648C61.3646%2024%2061.0902%2024.1176%2060.7635%2024.1176ZM60.7635%2015.7288C60.4238%2015.7288%2060.1363%2015.6112%2059.9011%2015.376C59.6659%2015.1408%2059.5483%2014.8533%2059.5483%2014.5136C59.5483%2014.1738%2059.6659%2013.8864%2059.9011%2013.6512C60.1363%2013.416%2060.4238%2013.2984%2060.7635%2013.2984C61.0902%2013.2984%2061.3646%2013.416%2061.5867%2013.6512C61.8219%2013.8864%2061.9395%2014.1738%2061.9395%2014.5136C61.9395%2014.8533%2061.8219%2015.1408%2061.5867%2015.376C61.3646%2015.6112%2061.0902%2015.7288%2060.7635%2015.7288ZM69.26%2013.3964C69.3515%2012.1942%2069.8153%2011.2534%2070.6516%2010.574C71.4879%209.8945%2072.5724%209.55476%2073.9052%209.55476C74.7938%209.55476%2075.5582%209.7181%2076.1984%2010.0448C76.8518%2010.3584%2077.3418%2010.7896%2077.6684%2011.3384C78.0082%2011.8872%2078.178%2012.5078%2078.178%2013.2004C78.178%2014.0105%2077.9428%2014.7096%2077.4724%2015.2976C77.0151%2015.8856%2076.414%2016.2645%2075.6692%2016.4344V16.5324C76.5186%2016.7414%2077.1915%2017.153%2077.688%2017.7672C78.1846%2018.3813%2078.4328%2019.1849%2078.4328%2020.178C78.4328%2020.9228%2078.263%2021.5957%2077.9232%2022.1968C77.5835%2022.7848%2077.0739%2023.2487%2076.3944%2023.5884C75.715%2023.9281%2074.8983%2024.098%2073.9444%2024.098C72.5593%2024.098%2071.4225%2023.7387%2070.534%2023.02C69.6455%2022.2883%2069.1489%2021.256%2069.0444%2019.9232H70.7692C70.8607%2020.7072%2071.1808%2021.3475%2071.7296%2021.844C72.2784%2022.3405%2073.0101%2022.5888%2073.9248%2022.5888C74.8395%2022.5888%2075.532%2022.3536%2076.0024%2021.8832C76.4859%2021.3997%2076.7276%2020.7791%2076.7276%2020.0212C76.7276%2019.0412%2076.401%2018.3356%2075.7476%2017.9044C75.0943%2017.4732%2074.1077%2017.2576%2072.788%2017.2576H72.3372V15.768H72.8076C74.0097%2015.7549%2074.9179%2015.5589%2075.532%2015.18C76.1462%2014.788%2076.4532%2014.1869%2076.4532%2013.3768C76.4532%2012.6842%2076.2246%2012.1289%2075.7672%2011.7108C75.323%2011.2926%2074.6827%2011.0836%2073.8464%2011.0836C73.0363%2011.0836%2072.3829%2011.2926%2071.8864%2011.7108C71.3899%2012.1289%2071.0959%2012.6908%2071.0044%2013.3964H69.26ZM80.841%2016.7676C80.841%2014.5201%2081.2069%2012.7692%2081.9386%2011.5148C82.6704%2010.2473%2083.9509%209.61356%2085.7802%209.61356C87.5965%209.61356%2088.8705%2010.2473%2089.6023%2011.5148C90.334%2012.7692%2090.6999%2014.5201%2090.6999%2016.7676C90.6999%2019.0543%2090.334%2020.8313%2089.6023%2022.0988C88.8705%2023.3663%2087.5965%2024%2085.7802%2024C83.9509%2024%2082.6704%2023.3663%2081.9386%2022.0988C81.2069%2020.8313%2080.841%2019.0543%2080.841%2016.7676ZM88.9359%2016.7676C88.9359%2015.6308%2088.8575%2014.6704%2088.7007%2013.8864C88.5569%2013.0893%2088.2499%2012.449%2087.7795%2011.9656C87.3221%2011.4821%2086.6557%2011.2404%2085.7802%2011.2404C84.8917%2011.2404%2084.2122%2011.4821%2083.7418%2011.9656C83.2845%2012.449%2082.9774%2013.0893%2082.8206%2013.8864C82.6769%2014.6704%2082.605%2015.6308%2082.605%2016.7676C82.605%2017.9436%2082.6769%2018.9301%2082.8206%2019.7272C82.9774%2020.5243%2083.2845%2021.1645%2083.7418%2021.648C84.2122%2022.1315%2084.8917%2022.3732%2085.7802%2022.3732C86.6557%2022.3732%2087.3221%2022.1315%2087.7795%2021.648C88.2499%2021.1645%2088.5569%2020.5243%2088.7007%2019.7272C88.8575%2018.9301%2088.9359%2017.9436%2088.9359%2016.7676Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cellipse%20cx%3D%2215.4031%22%20cy%3D%2217.6932%22%20rx%3D%224.2%22%20ry%3D%224.20002%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "tour_candidate_submissions"
                          )}
                          tag="div"
                          data-tour-step="3"
                          data-active-step=""
                        >
                          <_Builtin.Block tag="div">
                            {
                              "This is an illustrative response for your employer's question. Your spoken answers will be displayed here while speaking. "
                            }
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_buttons_block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_buttons_wrap")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "button_edit")}
                              data-tour-step="5"
                              data-active-step=""
                              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%2220%22%20fill%3D%22currentColor%22%2F%3E%0A%3Cpath%20d%3D%22M26.1902%2014.065C25.9976%2013.8917%2025.7761%2013.805%2025.5258%2013.805C25.2754%2013.805%2025.0539%2013.8917%2024.8613%2014.065L24.1102%2014.845L25.7569%2016.4916L26.5369%2015.7405C26.7102%2015.548%2026.7968%2015.3265%2026.7968%2015.0761C26.7968%2014.8257%2026.7102%2014.6043%2026.5369%2014.4117L26.1902%2014.065ZM18.5059%2020.4493C18.3903%2020.5649%2018.3133%2020.7093%2018.2748%2020.8827L17.8126%2022.7893L19.7192%2022.356C19.8925%2022.2982%2020.037%2022.2115%2020.1525%2022.096L25.0924%2017.1561L23.4458%2015.5094L18.5059%2020.4493ZM24.2258%2013.4295C24.611%2013.0636%2025.0443%2012.8806%2025.5258%2012.8806C26.0265%2012.8806%2026.4598%2013.0636%2026.8257%2013.4295L27.1724%2013.7761C27.5383%2014.1613%2027.7213%2014.5946%2027.7213%2015.0761C27.7213%2015.5768%2027.5383%2016.0102%2027.1724%2016.3761L20.817%2022.7604C20.5666%2023.0108%2020.2681%2023.1745%2019.9214%2023.2515L17.3215%2023.8582C17.1481%2023.8774%2017.0037%2023.8293%2016.8881%2023.7137C16.7726%2023.5982%2016.7244%2023.4634%2016.7437%2023.3093L17.3504%2020.6805C17.4274%2020.3338%2017.5911%2020.0353%2017.8415%2019.7849L24.2258%2013.4295ZM15.3571%2014.6139H19.0548C19.3436%2014.6332%2019.4977%2014.7872%2019.517%2015.0761C19.4977%2015.365%2019.3436%2015.5191%2019.0548%2015.5383H15.3571C14.9719%2015.5576%2014.6445%2015.6924%2014.3749%2015.9428C14.1245%2016.2124%2013.9897%2016.5398%2013.9704%2016.925V25.2448C13.9897%2025.63%2014.1245%2025.9574%2014.3749%2026.227C14.6445%2026.4774%2014.9719%2026.6122%2015.3571%2026.6315H23.6769C24.0621%2026.6122%2024.3895%2026.4774%2024.6591%2026.227C24.9095%2025.9574%2025.0443%2025.63%2025.0635%2025.2448V21.5471C25.0828%2021.2582%2025.2369%2021.1042%2025.5258%2021.0849C25.8146%2021.1042%2025.9687%2021.2582%2025.988%2021.5471V25.2448C25.9687%2025.8996%2025.7472%2026.4485%2025.3235%2026.8915C24.8806%2027.3152%2024.3317%2027.5366%2023.6769%2027.5559H15.3571C14.7023%2027.5366%2014.1534%2027.3152%2013.7104%2026.8915C13.2867%2026.4485%2013.0652%2025.8996%2013.046%2025.2448V16.925C13.0652%2016.2702%2013.2867%2015.7213%2013.7104%2015.2783C14.1534%2014.8546%2014.7023%2014.6332%2015.3571%2014.6139Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "button_mic")}
                              data-tour-step="4"
                              data-active-step=""
                              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%2220%22%20fill%3D%22currentColor%22%2F%3E%0A%3Cpath%20d%3D%22M22.3316%2014.5287C22.3071%2013.8669%2022.0742%2013.3154%2021.633%2012.8742C21.1918%2012.433%2020.6403%2012.2001%2019.9785%2012.1756C19.3167%2012.2001%2018.7652%2012.433%2018.324%2012.8742C17.8828%2013.3154%2017.6499%2013.8669%2017.6254%2014.5287V20.4114C17.6499%2021.0732%2017.8828%2021.6247%2018.324%2022.066C18.7652%2022.5072%2019.3167%2022.74%2019.9785%2022.7645C20.6403%2022.74%2021.1918%2022.5072%2021.633%2022.066C22.0742%2021.6247%2022.3071%2021.0732%2022.3316%2020.4114V14.5287ZM16.4489%2014.5287C16.4734%2013.5238%2016.8166%2012.6904%2017.4784%2012.0286C18.1402%2011.3668%2018.9736%2011.0236%2019.9785%2010.9991C20.9835%2011.0236%2021.8169%2011.3668%2022.4787%2012.0286C23.1405%2012.6904%2023.4836%2013.5238%2023.5081%2014.5287V20.4114C23.4836%2021.4164%2023.1405%2022.2498%2022.4787%2022.9116C21.8169%2023.5734%2020.9835%2023.9166%2019.9785%2023.9411C18.9736%2023.9166%2018.1402%2023.5734%2017.4784%2022.9116C16.8166%2022.2498%2016.4734%2021.4164%2016.4489%2020.4114V14.5287ZM15.2723%2018.6466V20.4114C15.2969%2021.7351%2015.7503%2022.8503%2016.6327%2023.7572C17.5396%2024.6396%2018.6549%2025.0931%2019.9785%2025.1176C21.3021%2025.0931%2022.4174%2024.6396%2023.3243%2023.7572C24.2067%2022.8503%2024.6602%2021.7351%2024.6847%2020.4114V18.6466C24.7092%2018.279%2024.9053%2018.0829%2025.273%2018.0583C25.6406%2018.0829%2025.8367%2018.279%2025.8612%2018.6466V20.4114C25.8367%2021.9802%2025.322%2023.3038%2024.317%2024.3823C23.3366%2025.4608%2022.0865%2026.0858%2020.5668%2026.2574V28.6472H22.9199C23.2875%2028.6718%2023.4836%2028.8678%2023.5081%2029.2355C23.4836%2029.6032%2023.2875%2029.7993%2022.9199%2029.8238H19.9785H17.0372C16.6695%2029.7993%2016.4734%2029.6032%2016.4489%2029.2355C16.4734%2028.8678%2016.6695%2028.6718%2017.0372%2028.6472H19.3902V26.2574C17.8705%2026.0858%2016.6205%2025.4608%2015.64%2024.3823C14.635%2023.3038%2014.1203%2021.9802%2014.0958%2020.4114V18.6466C14.1203%2018.279%2014.3164%2018.0829%2014.6841%2018.0583C15.0517%2018.0829%2015.2478%2018.279%2015.2723%2018.6466Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "tour_submit_button"
                              )}
                              tag="div"
                              data-tour-step="6"
                              data-active-step=""
                            >
                              <_Builtin.Block tag="div">
                                {"Submit"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_employer_block")}
                        id={_utils.cx(
                          _styles,
                          "w-node-_12a2d91a-7668-4d3c-6f7d-217c73bd5307-c25f4a74"
                        )}
                        tag="div"
                        data-tour-step="1"
                        data-active-step=""
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "tour_cover_image",
                            "emplyer_smapl"
                          )}
                          loading="eager"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65324132c153f2d8cc94277d_employer_smaple.png"
                        />
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "emebed_flex",
                            "question_count"
                          )}
                          value="%3Csvg%20width%3D%22126%22%20height%3D%2224%22%20viewbox%3D%220%200%20126%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%22126%22%20height%3D%2224%22%20rx%3D%2212%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M21.8125%205.84375C21.9401%205.86198%2022.013%205.9349%2022.0312%206.0625V7.59375H23.5625C23.6901%207.61198%2023.763%207.6849%2023.7812%207.8125C23.763%207.9401%2023.6901%208.01302%2023.5625%208.03125H22.0312V9.5625C22.013%209.6901%2021.9401%209.76302%2021.8125%209.78125C21.6849%209.76302%2021.612%209.6901%2021.5938%209.5625V8.03125H20.0625C19.9349%208.01302%2019.862%207.9401%2019.8438%207.8125C19.862%207.6849%2019.9349%207.61198%2020.0625%207.59375H21.5938V6.0625C21.612%205.9349%2021.6849%205.86198%2021.8125%205.84375ZM21.8125%2013.7188C21.9401%2013.737%2022.013%2013.8099%2022.0312%2013.9375V15.4688H23.5625C23.6901%2015.487%2023.763%2015.5599%2023.7812%2015.6875C23.763%2015.8151%2023.6901%2015.888%2023.5625%2015.9062H22.0312V17.4375C22.013%2017.5651%2021.9401%2017.638%2021.8125%2017.6562C21.6849%2017.638%2021.612%2017.5651%2021.5938%2017.4375V15.9062H20.0625C19.9349%2015.888%2019.862%2015.8151%2019.8438%2015.6875C19.862%2015.5599%2019.9349%2015.487%2020.0625%2015.4688H21.5938V13.9375C21.612%2013.8099%2021.6849%2013.737%2021.8125%2013.7188ZM13.5547%2010.2734L10.4375%2011.7227L13.5547%2013.1445C13.6458%2013.1992%2013.7188%2013.2721%2013.7734%2013.3633L15.2227%2016.4805L16.6445%2013.3633C16.6992%2013.2721%2016.7721%2013.1992%2016.8633%2013.1445L19.9805%2011.7227L16.8633%2010.2734C16.7721%2010.2188%2016.6992%2010.1458%2016.6445%2010.0547L15.2227%206.9375L13.7734%2010.0547C13.7188%2010.1458%2013.6458%2010.2188%2013.5547%2010.2734ZM15.6055%206.74609L17.0547%209.86328L20.1719%2011.3125C20.3359%2011.4036%2020.418%2011.5312%2020.418%2011.6953C20.418%2011.8776%2020.3359%2012.0143%2020.1719%2012.1055L17.0547%2013.5547L15.6055%2016.6719C15.5143%2016.8359%2015.3867%2016.918%2015.2227%2016.918C15.0404%2016.918%2014.9036%2016.8359%2014.8125%2016.6719L13.3633%2013.5547L10.2461%2012.1055C10.082%2012.0326%2010%2011.9049%2010%2011.7227C10%2011.5404%2010.082%2011.4036%2010.2461%2011.3125L13.3633%209.86328L14.8125%206.74609C14.9036%206.58203%2015.0404%206.5%2015.2227%206.5C15.4049%206.5%2015.5326%206.58203%2015.6055%206.74609Z%22%20fill%3D%22black%22%2F%3E%0A%3Cpath%20d%3D%22M33.8908%2017.2324C31.0607%2017.2324%2029.3654%2015.2227%2029.3654%2012.0713V12.0576C29.3654%208.89258%2031.1017%206.90332%2033.8908%206.90332C36.6935%206.90332%2038.4162%208.89941%2038.4162%2012.0576V12.0713C38.4162%2013.9785%2037.7873%2015.4688%2036.6662%2016.3506L37.9513%2018.1143H36.5705L35.6955%2016.9043C35.1554%2017.123%2034.5539%2017.2324%2033.8908%2017.2324ZM33.8908%2016.0977C34.2804%2016.0977%2034.6496%2016.0361%2034.9777%2015.9268L33.7062%2014.1768H35.0871L35.9484%2015.3594C36.7209%2014.6621%2037.1584%2013.5137%2037.1584%2012.0713V12.0576C37.1584%209.59668%2035.9074%208.03809%2033.8908%208.03809C31.881%208.03809%2030.6232%209.59668%2030.6232%2012.0576V12.0713C30.6232%2014.5117%2031.84%2016.0977%2033.8908%2016.0977ZM42.7124%2017.1299C41.0376%2017.1299%2040.1762%2016.1455%2040.1762%2014.4023V9.63086H41.3657V14.1152C41.3657%2015.4414%2041.8442%2016.0771%2043.02%2016.0771C44.3188%2016.0771%2045.0093%2015.2842%2045.0093%2013.9922V9.63086H46.1987V17H45.0093V15.8994H44.8999C44.5376%2016.6855%2043.7925%2017.1299%2042.7124%2017.1299ZM51.2742%2017.1299C49.1687%2017.1299%2047.8972%2015.6533%2047.8972%2013.3428V13.3359C47.8972%2011.0596%2049.1961%209.50098%2051.199%209.50098C53.2019%209.50098%2054.4187%2010.9912%2054.4187%2013.1924V13.6572H49.114C49.1482%2015.1816%2049.989%2016.0703%2051.3015%2016.0703C52.2996%2016.0703%2052.9148%2015.5986%2053.1131%2015.1543L53.1404%2015.0928H54.3299L54.3162%2015.1475C54.0633%2016.1455%2053.0105%2017.1299%2051.2742%2017.1299ZM51.1922%2010.5605C50.0984%2010.5605%2049.2644%2011.3057%2049.1346%2012.707H53.2088C53.0857%2011.251%2052.2791%2010.5605%2051.1922%2010.5605ZM58.6397%2017.1299C56.9991%2017.1299%2055.8712%2016.3369%2055.7345%2015.1201H56.9513C57.1495%2015.7354%2057.7374%2016.1387%2058.6807%2016.1387C59.672%2016.1387%2060.3761%2015.667%2060.3761%2014.9971V14.9834C60.3761%2014.4844%2060.0001%2014.1357%2059.0909%2013.917L57.9493%2013.6436C56.5684%2013.3154%2055.9464%2012.7139%2055.9464%2011.6543V11.6475C55.9464%2010.4238%2057.1222%209.50098%2058.6876%209.50098C60.2325%209.50098%2061.3057%2010.2734%2061.4698%2011.4766H60.3009C60.1436%2010.8955%2059.5694%2010.4922%2058.6807%2010.4922C57.8057%2010.4922%2057.1632%2010.9434%2057.1632%2011.5928V11.6064C57.1632%2012.1055%2057.5323%2012.4199%2058.4005%2012.6318L59.5352%2012.9053C60.9229%2013.2402%2061.5929%2013.8418%2061.5929%2014.8945V14.9082C61.5929%2016.2207%2060.3145%2017.1299%2058.6397%2017.1299ZM65.8344%2017.0547C64.3168%2017.0547%2063.681%2016.4941%2063.681%2015.0859V10.6152H62.5189V9.63086H63.681V7.72363H64.9115V9.63086H66.5248V10.6152H64.9115V14.7852C64.9115%2015.6533%2065.2123%2016.002%2065.9779%2016.002C66.1898%2016.002%2066.306%2015.9951%2066.5248%2015.9746V16.9863C66.2924%2017.0273%2066.0668%2017.0547%2065.8344%2017.0547ZM68.777%208.20898C68.3259%208.20898%2067.9567%207.83984%2067.9567%207.38867C67.9567%206.9375%2068.3259%206.56836%2068.777%206.56836C69.2282%206.56836%2069.5974%206.9375%2069.5974%207.38867C69.5974%207.83984%2069.2282%208.20898%2068.777%208.20898ZM68.1755%2017V9.63086H69.3649V17H68.1755ZM74.4814%2017.1299C72.3828%2017.1299%2071.084%2015.6807%2071.084%2013.3223V13.3086C71.084%2010.9434%2072.3828%209.50098%2074.4814%209.50098C76.5801%209.50098%2077.8789%2010.9434%2077.8789%2013.3086V13.3223C77.8789%2015.6807%2076.5801%2017.1299%2074.4814%2017.1299ZM74.4814%2016.0771C75.876%2016.0771%2076.6621%2015.0586%2076.6621%2013.3223V13.3086C76.6621%2011.5654%2075.876%2010.5537%2074.4814%2010.5537C73.0869%2010.5537%2072.3008%2011.5654%2072.3008%2013.3086V13.3223C72.3008%2015.0586%2073.0869%2016.0771%2074.4814%2016.0771ZM79.5706%2017V9.63086H80.7601V10.7383H80.8694C81.2386%209.95898%2081.929%209.50098%2083.0159%209.50098C84.6702%209.50098%2085.5931%2010.4785%2085.5931%2012.2285V17H84.4036V12.5156C84.4036%2011.1895%2083.8567%2010.5537%2082.681%2010.5537C81.5052%2010.5537%2080.7601%2011.3467%2080.7601%2012.6387V17H79.5706ZM93.7821%2017V8.50293H93.6728L91.164%2010.3213V9.02246L93.789%207.13574H95.0126V17H93.7821ZM100.867%206.70508L97.7502%2019.4609H96.6086L99.7258%206.70508H100.867ZM104.234%2017V8.50293H104.125L101.616%2010.3213V9.02246L104.241%207.13574H105.464V17H104.234ZM108.161%2017V16.1523L111.497%2012.543C112.755%2011.1826%20113.124%2010.6699%20113.124%209.80859V9.79492C113.124%208.75586%20112.42%207.97656%20111.258%207.97656C110.075%207.97656%20109.289%208.74902%20109.289%209.91113L109.282%209.9248L108.106%209.91797L108.093%209.91113C108.099%208.16113%20109.453%206.90332%20111.34%206.90332C113.062%206.90332%20114.382%208.07227%20114.382%209.66504V9.67871C114.382%2010.8066%20113.896%2011.627%20112.112%2013.4658L109.87%2015.7832V15.8926H114.546V17H108.161Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_question_text")}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            {
                              "Greetings, I am your interviewer today. The questions I ask will be transcribed here, and it's important that you respond to each of them comprehensively and thoughtfully."
                            }
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_box_step_1")}
                        tag="div"
                        tour-box="1"
                        tour-box-active=""
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_description_box")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_title")}
                            tag="div"
                          >
                            {"Interviewer speaking"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tour_box_description"
                            )}
                            tag="div"
                          >
                            {
                              "Interviewer will be asking questions on the right side of the screen. To play and pause hover on the interviewer card."
                            }
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_bottom")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_box_title")}
                              tag="div"
                            >
                              {"1 / 8"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "tour_button",
                                "box_button"
                              )}
                              tag="div"
                              data-next-button="2"
                            >
                              <_Builtin.Block tag="div">
                                {"Next"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "tour_indicator_right")}
                          value="%3Csvg%20width%3D%2292%22%20height%3D%2227%22%20viewbox%3D%220%200%2092%2027%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3787_53984)%22%20filter%3D%22url(%23filter0_d_3787_53984)%22%3E%0A%3Ccircle%20cx%3D%2278.1465%22%20cy%3D%229.94238%22%20r%3D%225%22%20transform%3D%22rotate(-90%2078.1465%209.94238)%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cline%20x1%3D%2273.0781%22%20y1%3D%2210.4619%22%20x2%3D%22-28.9219%22%20y2%3D%2210.4619%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_3787_53984%22%20x%3D%220%22%20y%3D%22-1%22%20width%3D%2294%22%20height%3D%2232%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3Cfecolormatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3Cfeoffset%20dy%3D%224%22%2F%3E%0A%3Cfegaussianblur%20stddeviation%3D%224%22%2F%3E%0A%3Cfecolormatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200.0156863%200%200%200%200%200.266667%200%200%200%200%200.301961%200%200%200%200.15%200%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_3787_53984%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_3787_53984%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3Cclippath%20id%3D%22clip0_3787_53984%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2278%22%20fill%3D%22white%22%20transform%3D%22matrix(0%20-1%201%200%208%2019)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_box_step_2")}
                        tag="div"
                        tour-box="2"
                        tour-box-active=""
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "tour_indicator_right",
                            "indicator_2"
                          )}
                          value="%3Csvg%20width%3D%2292%22%20height%3D%2227%22%20viewbox%3D%220%200%2092%2027%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3787_53984)%22%20filter%3D%22url(%23filter0_d_3787_53984)%22%3E%0A%3Ccircle%20cx%3D%2278.1465%22%20cy%3D%229.94238%22%20r%3D%225%22%20transform%3D%22rotate(-90%2078.1465%209.94238)%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cline%20x1%3D%2273.0781%22%20y1%3D%2210.4619%22%20x2%3D%22-28.9219%22%20y2%3D%2210.4619%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_3787_53984%22%20x%3D%220%22%20y%3D%22-1%22%20width%3D%2294%22%20height%3D%2232%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3Cfecolormatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3Cfeoffset%20dy%3D%224%22%2F%3E%0A%3Cfegaussianblur%20stddeviation%3D%224%22%2F%3E%0A%3Cfecolormatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200.0156863%200%200%200%200%200.266667%200%200%200%200%200.301961%200%200%200%200.15%200%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_3787_53984%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_3787_53984%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3Cclippath%20id%3D%22clip0_3787_53984%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2278%22%20fill%3D%22white%22%20transform%3D%22matrix(0%20-1%201%200%208%2019)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_description_box")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_title")}
                            tag="div"
                          >
                            {"You are answering"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tour_box_description"
                            )}
                            tag="div"
                          >
                            {
                              "You will be answering on the left side and the video will be visible throughout the interview"
                            }
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_bottom")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_box_title")}
                              tag="div"
                            >
                              {"2 / 8"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_button_flex")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_prec"
                                )}
                                tag="div"
                                data-next-button="1"
                              >
                                <_Builtin.Block tag="div">
                                  {"Prev"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_button"
                                )}
                                tag="div"
                                data-next-button="3"
                              >
                                <_Builtin.Block tag="div">
                                  {"Next"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_box_step_3")}
                        tag="div"
                        tour-box="3"
                        tour-box-active=""
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "tour_indicator_right",
                            "indicator-3"
                          )}
                          value="%3Csvg%20width%3D%2292%22%20height%3D%2227%22%20viewbox%3D%220%200%2092%2027%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3787_53984)%22%20filter%3D%22url(%23filter0_d_3787_53984)%22%3E%0A%3Ccircle%20cx%3D%2278.1465%22%20cy%3D%229.94238%22%20r%3D%225%22%20transform%3D%22rotate(-90%2078.1465%209.94238)%22%20fill%3D%22white%22%2F%3E%0A%3Cline%20x1%3D%2273.0781%22%20y1%3D%2210.4619%22%20x2%3D%22-28.9219%22%20y2%3D%2210.4619%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_3787_53984%22%20x%3D%220%22%20y%3D%22-1%22%20width%3D%2294%22%20height%3D%2232%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3Cfecolormatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3Cfeoffset%20dy%3D%224%22%2F%3E%0A%3Cfegaussianblur%20stddeviation%3D%224%22%2F%3E%0A%3Cfecolormatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200.0156863%200%200%200%200%200.266667%200%200%200%200%200.301961%200%200%200%200.15%200%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_3787_53984%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_3787_53984%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3Cclippath%20id%3D%22clip0_3787_53984%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2278%22%20fill%3D%22white%22%20transform%3D%22matrix(0%20-1%201%200%208%2019)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_description_box")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_title")}
                            tag="div"
                          >
                            {"Your answer will show here"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tour_box_description"
                            )}
                            tag="div"
                          >
                            {
                              "Your answer will be generated qutomatically here or you can hit edit to type manually"
                            }
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_bottom")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_box_title")}
                              tag="div"
                            >
                              {"3 / 8"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "tour_button",
                                "box_prec"
                              )}
                              tag="div"
                              data-next-button="2"
                            >
                              <_Builtin.Block tag="div">
                                {"Prev"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_button_flex")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_button"
                                )}
                                tag="div"
                                data-next-button="4"
                              >
                                <_Builtin.Block tag="div">
                                  {"Next"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_box_step_4")}
                        tag="div"
                        tour-box="4"
                        tour-box-active=""
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_description_box")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_title")}
                            tag="div"
                          >
                            {"Toggle Mic"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tour_box_description"
                            )}
                            tag="div"
                          >
                            {
                              "To begin or end speaking, simply toggle the microphone button. mic will be on automatically after asking the question"
                            }
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_bottom")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_box_title")}
                              tag="div"
                            >
                              {"4 / 8"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "tour_button",
                                "box_prec"
                              )}
                              tag="div"
                              data-next-button="3"
                            >
                              <_Builtin.Block tag="div">
                                {"Prev"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_button_flex")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_button"
                                )}
                                tag="div"
                                data-next-button="5"
                              >
                                <_Builtin.Block tag="div">
                                  {"Next"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "tour_indicator_right",
                            "indi_4"
                          )}
                          value="%3Csvg%20width%3D%2210%22%20height%3D%22111%22%20viewbox%3D%220%200%2010%20111%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%225%22%20cy%3D%22106%22%20r%3D%225%22%20fill%3D%22white%22%2F%3E%0A%3Cline%20x1%3D%225.5%22%20y1%3D%22102%22%20x2%3D%225.5%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_box_step_5")}
                        tag="div"
                        tour-box="5"
                        tour-box-active=""
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_description_box")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_title")}
                            tag="div"
                          >
                            {"Edit answer"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tour_box_description"
                            )}
                            tag="div"
                          >
                            {
                              "Click on the pencil button to edit / type your answer"
                            }
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_bottom")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_box_title")}
                              tag="div"
                            >
                              {"5 / 8"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_button_flex")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_prec"
                                )}
                                tag="div"
                                data-next-button="4"
                              >
                                <_Builtin.Block tag="div">
                                  {"Prev"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_button"
                                )}
                                tag="div"
                                data-next-button="6"
                              >
                                <_Builtin.Block tag="div">
                                  {"Next"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "tour_indicator_right",
                            "indi_4"
                          )}
                          value="%3Csvg%20width%3D%2210%22%20height%3D%22111%22%20viewbox%3D%220%200%2010%20111%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%225%22%20cy%3D%22106%22%20r%3D%225%22%20fill%3D%22white%22%2F%3E%0A%3Cline%20x1%3D%225.5%22%20y1%3D%22102%22%20x2%3D%225.5%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_box_step_6")}
                        tag="div"
                        tour-box="6"
                        tour-box-active=""
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_description_box")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_title")}
                            tag="div"
                          >
                            {"Submit answer"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tour_box_description"
                            )}
                            tag="div"
                          >
                            {
                              "Once you finished answering a question hit on the submit button for the next question"
                            }
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "tour_box_bottom")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_box_title")}
                              tag="div"
                            >
                              {"6 / 8"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "tour_button_flex")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_prec"
                                )}
                                tag="div"
                                data-next-button="5"
                              >
                                <_Builtin.Block tag="div">
                                  {"Prev"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "tour_button",
                                  "box_button"
                                )}
                                tag="div"
                                data-next-button="7"
                              >
                                <_Builtin.Block tag="div">
                                  {"Next"}
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "tour_indicator_right",
                            "indi_4"
                          )}
                          value="%3Csvg%20width%3D%2210%22%20height%3D%22111%22%20viewbox%3D%220%200%2010%20111%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%225%22%20cy%3D%22106%22%20r%3D%225%22%20fill%3D%22white%22%2F%3E%0A%3Cline%20x1%3D%225.5%22%20y1%3D%22102%22%20x2%3D%225.5%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "tour_bottom_bar")}
                      tag="div"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "tour_button", "exit_tour")}
                      data-w-id="12a2d91a-7668-4d3c-6f7d-217c73bd5370"
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "emebed_flex")}
                        value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewbox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M24.6465%2015.043L19.2324%209.95703C19.1777%209.90234%2019.123%209.875%2019.0684%209.875C18.9043%209.90234%2018.8086%209.99805%2018.7813%2010.1621V12.5C18.7539%2012.9102%2018.5352%2013.1289%2018.125%2013.1562H13.2031C13.0117%2013.1836%2012.9023%2013.293%2012.875%2013.4844V16.7656C12.9023%2016.957%2013.0117%2017.0664%2013.2031%2017.0937H18.125C18.5352%2017.1211%2018.7539%2017.3398%2018.7813%2017.75V20.0879C18.8086%2020.252%2018.9043%2020.3477%2019.0684%2020.375C19.123%2020.375%2019.1777%2020.3477%2019.2324%2020.293L24.6465%2015.207C24.6738%2015.1797%2024.6875%2015.1523%2024.6875%2015.125C24.6875%2015.0977%2024.6738%2015.0703%2024.6465%2015.043ZM26%2015.125C26%2015.5352%2025.8496%2015.877%2025.5488%2016.1504L20.1348%2021.2773C19.834%2021.5508%2019.4785%2021.6875%2019.0684%2021.6875C18.6035%2021.6875%2018.2207%2021.5371%2017.9199%2021.2363C17.6191%2020.9355%2017.4688%2020.5527%2017.4688%2020.0879V18.4062H13.2031C12.7383%2018.4062%2012.3555%2018.2422%2012.0547%2017.9141C11.7266%2017.6133%2011.5625%2017.2305%2011.5625%2016.7656V13.4844C11.5625%2013.0195%2011.7266%2012.6367%2012.0547%2012.3359C12.3555%2012.0078%2012.7383%2011.8437%2013.2031%2011.8437H17.4688V10.1621C17.4688%209.69726%2017.6191%209.31445%2017.9199%209.01367C18.2207%208.71289%2018.6035%208.5625%2019.0684%208.5625C19.4785%208.5625%2019.834%208.71289%2020.1348%209.01367L25.5488%2014.0996C25.8496%2014.373%2026%2014.7148%2026%2015.125ZM12.2187%207.25H8.28125C7.73437%207.27734%207.26953%207.46875%206.88672%207.82422C6.53125%208.20703%206.33984%208.67187%206.3125%209.21875V21.0312C6.33984%2021.5781%206.53125%2022.043%206.88672%2022.4258C7.26953%2022.7812%207.73437%2022.9727%208.28125%2023H12.2187C12.6289%2023.0273%2012.8477%2023.2461%2012.875%2023.6563C12.8477%2024.0664%2012.6289%2024.2852%2012.2187%2024.3125H8.28125C7.35156%2024.2852%206.57226%2023.9707%205.94336%2023.3691C5.3418%2022.7402%205.02734%2021.9609%205%2021.0312V9.21875C5.02734%208.28906%205.3418%207.50976%205.94336%206.88086C6.57226%206.2793%207.35156%205.96484%208.28125%205.9375H12.2187C12.6289%205.96484%2012.8477%206.18359%2012.875%206.59375C12.8477%207.0039%2012.6289%207.22265%2012.2187%207.25Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block tag="div">{"Exit Tour"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "tour_reset", "scaled-in")}
                    tag="div"
                    data-tour-completed=""
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "tour_reset_div")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_success_text")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_success-title")}
                          tag="div"
                        >
                          {"You're Interview-Ready!"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_succeess_desc")}
                          tag="div"
                        >
                          {
                            "Thank you for taking the tour. You're now well-prepared to begin your interview journey with confidence."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "tour_success_actions")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "tour_button",
                            "exit_after"
                          )}
                          data-w-id="12a2d91a-7668-4d3c-6f7d-217c73bd537c"
                          tag="div"
                          data-next-button="reset"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "emebed_flex")}
                            value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewbox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M24.6465%2015.043L19.2324%209.95703C19.1777%209.90234%2019.123%209.875%2019.0684%209.875C18.9043%209.90234%2018.8086%209.99805%2018.7813%2010.1621V12.5C18.7539%2012.9102%2018.5352%2013.1289%2018.125%2013.1562H13.2031C13.0117%2013.1836%2012.9023%2013.293%2012.875%2013.4844V16.7656C12.9023%2016.957%2013.0117%2017.0664%2013.2031%2017.0937H18.125C18.5352%2017.1211%2018.7539%2017.3398%2018.7813%2017.75V20.0879C18.8086%2020.252%2018.9043%2020.3477%2019.0684%2020.375C19.123%2020.375%2019.1777%2020.3477%2019.2324%2020.293L24.6465%2015.207C24.6738%2015.1797%2024.6875%2015.1523%2024.6875%2015.125C24.6875%2015.0977%2024.6738%2015.0703%2024.6465%2015.043ZM26%2015.125C26%2015.5352%2025.8496%2015.877%2025.5488%2016.1504L20.1348%2021.2773C19.834%2021.5508%2019.4785%2021.6875%2019.0684%2021.6875C18.6035%2021.6875%2018.2207%2021.5371%2017.9199%2021.2363C17.6191%2020.9355%2017.4688%2020.5527%2017.4688%2020.0879V18.4062H13.2031C12.7383%2018.4062%2012.3555%2018.2422%2012.0547%2017.9141C11.7266%2017.6133%2011.5625%2017.2305%2011.5625%2016.7656V13.4844C11.5625%2013.0195%2011.7266%2012.6367%2012.0547%2012.3359C12.3555%2012.0078%2012.7383%2011.8437%2013.2031%2011.8437H17.4688V10.1621C17.4688%209.69726%2017.6191%209.31445%2017.9199%209.01367C18.2207%208.71289%2018.6035%208.5625%2019.0684%208.5625C19.4785%208.5625%2019.834%208.71289%2020.1348%209.01367L25.5488%2014.0996C25.8496%2014.373%2026%2014.7148%2026%2015.125ZM12.2187%207.25H8.28125C7.73437%207.27734%207.26953%207.46875%206.88672%207.82422C6.53125%208.20703%206.33984%208.67187%206.3125%209.21875V21.0312C6.33984%2021.5781%206.53125%2022.043%206.88672%2022.4258C7.26953%2022.7812%207.73437%2022.9727%208.28125%2023H12.2187C12.6289%2023.0273%2012.8477%2023.2461%2012.875%2023.6563C12.8477%2024.0664%2012.6289%2024.2852%2012.2187%2024.3125H8.28125C7.35156%2024.2852%206.57226%2023.9707%205.94336%2023.3691C5.3418%2022.7402%205.02734%2021.9609%205%2021.0312V9.21875C5.02734%208.28906%205.3418%207.50976%205.94336%206.88086C6.57226%206.2793%207.35156%205.96484%208.28125%205.9375H12.2187C12.6289%205.96484%2012.8477%206.18359%2012.875%206.59375C12.8477%207.0039%2012.6289%207.22265%2012.2187%207.25Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block tag="div">
                            {"Exit Tour"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "tour_restart_button")}
                          tag="div"
                          data-next-button="reset"
                        >
                          {"Restart"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tour_button", "initial_trigger")}
                data-w-id="12a2d91a-7668-4d3c-6f7d-217c73bd5382"
                tag="div"
                data-next-button="1"
              >
                <_Builtin.Block tag="div">{"Start"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "disclaimer-ai-wrappers", "hide")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.5%205C6.05228%205%206.5%204.55228%206.5%204C6.5%203.44772%206.05228%203%205.5%203C4.94772%203%204.5%203.44772%204.5%204C4.5%204.55228%204.94772%205%205.5%205ZM5.5%2010C5.77614%2010%206%209.77614%206%209.5V6.5C6%206.22386%205.77614%206%205.5%206C5.22386%206%205%206.22386%205%206.5V9.5C5%209.77614%205.22386%2010%205.5%2010ZM5.5%2012C2.46243%2012%200%209.53757%200%206.5C0%203.46243%202.46243%201%205.5%201C8.53757%201%2011%203.46243%2011%206.5C11%209.53757%208.53757%2012%205.5%2012ZM5.5%2011C7.98528%2011%2010%208.98528%2010%206.5C10%204.01472%207.98528%202%205.5%202C3.01472%202%201%204.01472%201%206.5C1%208.98528%203.01472%2011%205.5%2011Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "color-grey-600")}
              tag="div"
            >
              {
                "AI-generated content may contain inaccuracies and does not reflect any official stance"
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interview-start-right")}
          id={_utils.cx(
            _styles,
            "w-node-b76ed82f-7570-5436-bd0d-9af7c25f4ab5-c25f4a74"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-estimate-company")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "estimated-time-wrappers")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.Strong>{"Estimated Time :"}</_Builtin.Strong>
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"30 minutes"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600")}
              tag="div"
            >
              {
                "Please ensure you have sufficient time to complete it in one session."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          {isAboutVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "interview-about-company")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-472")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"About Company and Role"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "link-iconss")}
                  tag="div"
                  {...onClickAboutCompany}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%201.0625C7.51562%200.953125%207.57812%200.890625%207.6875%200.875H11.4375C11.5469%200.890625%2011.6094%200.953125%2011.625%201.0625V4.8125C11.6094%204.92188%2011.5469%204.98438%2011.4375%205C11.3281%204.98438%2011.2656%204.92188%2011.25%204.8125V1.50781L5.01562%207.76562C4.92188%207.82812%204.82812%207.82812%204.73438%207.76562C4.67188%207.67188%204.67188%207.57812%204.73438%207.48438L10.9922%201.25H7.6875C7.57812%201.23437%207.51562%201.17188%207.5%201.0625ZM1.3125%201.25H4.6875C4.79688%201.26563%204.85938%201.32812%204.875%201.4375C4.85938%201.54688%204.79688%201.60937%204.6875%201.625H1.3125C1.04688%201.625%200.828125%201.71875%200.65625%201.90625C0.46875%202.07812%200.375%202.29688%200.375%202.5625V11.1875C0.375%2011.4531%200.46875%2011.6719%200.65625%2011.8438C0.828125%2012.0312%201.04688%2012.125%201.3125%2012.125H9.9375C10.2031%2012.125%2010.4219%2012.0312%2010.5938%2011.8438C10.7812%2011.6719%2010.875%2011.4531%2010.875%2011.1875V7.8125C10.8906%207.70312%2010.9531%207.64062%2011.0625%207.625C11.1719%207.64062%2011.2344%207.70312%2011.25%207.8125V11.1875C11.2344%2011.5625%2011.1094%2011.875%2010.875%2012.125C10.625%2012.3594%2010.3125%2012.4844%209.9375%2012.5H1.3125C0.9375%2012.4844%200.625%2012.3594%200.375%2012.125C0.140625%2011.875%200.015625%2011.5625%200%2011.1875V2.5625C0.015625%202.1875%200.140625%201.875%200.375%201.625C0.625%201.39062%200.9375%201.26563%201.3125%201.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {textCompanyDescription}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-imp-reminder")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "reminder-header-wrappers")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "reminder-icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M16.459%206.30048V5.98328C16.459%205.91701%2016.4053%205.86328%2016.339%205.86328H14.8498C14.7835%205.86328%2014.7298%205.91701%2014.7298%205.98328V6.30048C14.7298%206.36676%2014.7835%206.42048%2014.8498%206.42048H16.339C16.4053%206.42048%2016.459%206.36676%2016.459%206.30048Z%22%20fill%3D%22%23F9BB0D%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M15.835%203.91341L15.6579%203.65031C15.6208%203.59534%2015.5463%203.58079%2015.4913%203.61781L14.2561%204.4497C14.2011%204.48672%2014.1866%204.5613%2014.2236%204.61627L14.4008%204.87936C14.4378%204.93433%2014.5124%204.94888%2014.5674%204.91186L15.8025%204.07997C15.8575%204.04295%2015.8721%203.96838%2015.835%203.91341Z%22%20fill%3D%22%23F9BB0D%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M5.26953%206.30439V5.98719C5.26953%205.92091%205.21581%205.86719%205.14953%205.86719H3.66033C3.59406%205.86719%203.54033%205.92091%203.54033%205.98719V6.30439C3.54033%206.37066%203.59406%206.42439%203.66033%206.42439H5.14953C5.21581%206.42439%205.26953%206.37066%205.26953%206.30439Z%22%20fill%3D%22%23F9BB0D%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M5.59855%204.88606L5.77574%204.62297C5.81276%204.568%205.79821%204.49343%205.74324%204.4564L4.50806%203.62452C4.45309%203.58749%204.37851%203.60204%204.34149%203.65701L4.1643%203.92011C4.12728%203.97508%204.14183%204.04965%204.1968%204.08667L5.43198%204.91856C5.48695%204.95558%205.56153%204.94103%205.59855%204.88606Z%22%20fill%3D%22%23F9BB0D%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M9.56014%204.37705C7.49294%204.56385%205.86174%206.29185%205.79174%208.36625C5.76573%209.09017%205.92968%209.80829%206.2673%2010.4492C6.60491%2011.0901%207.10441%2011.6315%207.71614%2012.0195C8.16798%2012.3144%208.48754%2012.7733%208.60734%2013.2995L8.89054%2014.4887L10.0677%2014.4639L11.2449%2014.4395L11.4801%2013.2291C11.5849%2012.6942%2011.8922%2012.2205%2012.3377%2011.9067C13.0852%2011.3792%2013.6376%2010.6197%2013.9092%209.74613C14.1808%208.87255%2014.1564%207.93374%2013.8398%207.07545C13.5232%206.21716%2012.932%205.4874%2012.1582%204.99948C11.3844%204.51155%2010.4711%204.29275%209.56014%204.37705Z%22%20fill%3D%22%23F9BB0D%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M9.69378%2014.9522H9.67938C9.64786%2014.949%209.61887%2014.9336%209.59871%2014.9091C9.57856%2014.8847%209.56888%2014.8533%209.57178%2014.8218C9.72658%2013.1906%209.61778%2011.7514%209.39738%2010.9018L9.31058%2010.8974C8.80498%2010.8822%208.61778%2010.6706%208.55058%2010.5454C8.51368%2010.4773%208.49563%2010.4007%208.49831%2010.3233C8.50098%2010.2459%208.52427%2010.1707%208.56578%2010.1054C8.61285%2010.0341%208.67807%209.97677%208.75471%209.93915C8.83135%209.90153%208.91664%209.88504%209.00178%209.89136C9.09938%209.89616%209.19178%209.94816%209.27618%2010.0458C9.38498%2010.171%209.48618%2010.3846%209.57378%2010.671C9.8411%2010.6804%2010.1087%2010.667%2010.3738%2010.631C10.4938%2010.343%2010.6486%2010.1026%2010.8214%209.96616C10.9874%209.83536%2011.1282%209.83656%2011.2174%209.85936C11.4026%209.90816%2011.5078%2010.0594%2011.4798%2010.2342C11.4398%2010.4742%2011.1658%2010.7262%2010.5498%2010.8442C10.4372%2011.1553%2010.381%2011.4841%2010.3838%2011.815C10.3534%2012.8754%2010.4458%2014.797%2010.4466%2014.815C10.4473%2014.8307%2010.4449%2014.8465%2010.4396%2014.8613C10.4342%2014.8762%2010.426%2014.8898%2010.4154%2014.9015C10.4048%2014.9131%2010.392%2014.9226%2010.3777%2014.9293C10.3634%2014.936%2010.3479%2014.9398%2010.3322%2014.9406C10.3164%2014.9413%2010.3007%2014.9389%2010.2858%2014.9336C10.271%2014.9282%2010.2573%2014.92%2010.2457%2014.9094C10.234%2014.8988%2010.2246%2014.8859%2010.2179%2014.8717C10.2111%2014.8574%2010.2073%2014.8419%2010.2066%2014.8262C10.2066%2014.807%2010.113%2012.8758%2010.1434%2011.8122C10.1407%2011.4961%2010.188%2011.1815%2010.2834%2010.8802C10.0702%2010.903%209.85575%2010.9124%209.64138%2010.9082C9.86178%2011.8022%209.96378%2013.2214%209.81018%2014.843C9.80754%2014.8723%209.79422%2014.8996%209.77276%2014.9197C9.7513%2014.9399%209.72319%2014.9514%209.69378%2014.9522ZM8.96938%2010.1278C8.93003%2010.1269%208.89109%2010.1359%208.85614%2010.154C8.8212%2010.1721%208.79136%2010.1987%208.76938%2010.2314C8.75059%2010.2611%208.74012%2010.2954%208.73906%2010.3305C8.73801%2010.3657%208.7464%2010.4005%208.76338%2010.4314C8.83498%2010.5658%209.03858%2010.6478%209.32338%2010.6562H9.32818C9.25858%2010.4478%209.18138%2010.2922%209.09938%2010.1978C9.07446%2010.1615%209.03696%2010.1359%208.99418%2010.1258L8.96938%2010.1278ZM11.1214%2010.0838C11.0649%2010.0892%2011.0117%2010.1128%2010.9698%2010.151C10.8658%2010.231%2010.759%2010.381%2010.6658%2010.569C11.0854%2010.457%2011.2302%2010.2814%2011.2442%2010.1938C11.2554%2010.1246%2011.1946%2010.0978%2011.157%2010.0878C11.1453%2010.0848%2011.1334%2010.0835%2011.1214%2010.0838Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M10.703%2016.4168L9.51343%2016.442L9.24023%2015.868L10.9518%2015.832L10.703%2016.4168Z%22%20fill%3D%22%230086F4%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M11.4099%2014.3517L8.71946%2014.4081C8.68238%2014.4086%208.64577%2014.4165%208.61176%2014.4312C8.57775%2014.446%208.54701%2014.4674%208.52134%2014.4942C8.49566%2014.5209%208.47555%2014.5525%208.46219%2014.5871C8.44882%2014.6217%208.44245%2014.6586%208.44346%2014.6957L8.45026%2015.0185C8.45083%2015.0555%208.45875%2015.0921%208.47355%2015.126C8.48835%2015.16%208.50975%2015.1907%208.5365%2015.2163C8.56325%2015.242%208.59483%2015.262%208.62939%2015.2754C8.66396%2015.2887%208.70083%2015.2951%208.73786%2015.2941H8.75586C8.69588%2015.3576%208.65601%2015.4374%208.64127%2015.5234C8.62653%2015.6095%208.63758%2015.698%208.67302%2015.7779C8.70846%2015.8577%208.76672%2015.9253%208.84047%2015.972C8.91421%2016.0188%209.00015%2016.0428%209.08746%2016.0409L11.1103%2015.9985C11.1976%2015.9967%2011.2824%2015.9692%2011.3541%2015.9193C11.4258%2015.8695%2011.4812%2015.7996%2011.5133%2015.7183C11.5453%2015.6371%2011.5527%2015.5482%2011.5343%2015.4628C11.516%2015.3774%2011.4728%2015.2994%2011.4103%2015.2385H11.4283C11.503%2015.2368%2011.5741%2015.2055%2011.6258%2015.1515C11.6776%2015.0975%2011.7058%2015.0252%2011.7043%2014.9505L11.6975%2014.6277C11.6969%2014.5906%2011.6891%2014.554%2011.6743%2014.52C11.6595%2014.486%2011.6381%2014.4552%2011.6114%2014.4295C11.5846%2014.4039%2011.553%2014.3838%2011.5184%2014.3704C11.4838%2014.357%2011.4469%2014.3507%2011.4099%2014.3517Z%22%20fill%3D%22%230099F5%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M11.4098%2014.3517L10.0938%2014.3793L10.139%2016.0193L11.1101%2015.9989C11.1975%2015.9971%2011.2823%2015.9696%2011.354%2015.9197C11.4257%2015.8699%2011.4811%2015.8%2011.5132%2015.7187C11.5452%2015.6375%2011.5525%2015.5486%2011.5342%2015.4632C11.5159%2015.3778%2011.4727%2015.2998%2011.4101%2015.2389H11.4281C11.5029%2015.2372%2011.574%2015.2059%2011.6257%2015.1519C11.6774%2015.0979%2011.7057%2015.0256%2011.7041%2014.9509L11.6974%2014.6281C11.6969%2014.591%2011.689%2014.5543%2011.6743%2014.5202C11.6595%2014.4862%2011.6382%2014.4554%2011.6114%2014.4297C11.5846%2014.404%2011.553%2014.3838%2011.5184%2014.3704C11.4838%2014.357%2011.4469%2014.3507%2011.4098%2014.3517Z%22%20fill%3D%22%230086F4%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "text-yellow-800")}
                tag="div"
              >
                {"Important Reminders"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(_styles, "instruction", "margin-left-10")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem
                className={_utils.cx(_styles, "instruction-list")}
              >
                {"Ensure you have a stable internet connection."}
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "instruction-list")}
              >
                {
                  "Test your microphone and keyboard before starting the interview to make sure they are working properly."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "instruction-list")}
              >
                {
                  "Keep your resume and job description handy for quick reference."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem
                className={_utils.cx(_styles, "instruction-list")}
              >
                {
                  "If you encounter any technical difficulties or have questions, please "
                }
                <_Builtin.Link
                  className={_utils.cx(_styles, "contact-support")}
                  button={false}
                  block=""
                  options={{
                    href: "#",
                  }}
                  {...onClickSupport}
                >
                  {"contact support."}
                </_Builtin.Link>
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-take-tour-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "question-wrappers-interview")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2232%22%20height%3D%2233%22%20viewbox%3D%220%200%2037%2038%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.37402%202.1875C4.28027%202.24218%203.35058%202.625%202.58496%203.33593C1.87402%204.10156%201.49121%205.03125%201.43652%206.125V32.375C1.49121%2033.4687%201.87402%2034.3984%202.58496%2035.1641C3.35058%2035.875%204.28027%2036.2578%205.37402%2036.3125H31.624C32.7178%2036.2578%2033.6475%2035.875%2034.4131%2035.1641C35.124%2034.3984%2035.5068%2033.4687%2035.5615%2032.375V6.125C35.5068%205.03125%2035.124%204.10156%2034.4131%203.33593C33.6475%202.625%2032.7178%202.24218%2031.624%202.1875H5.37402ZM0.124022%206.125C0.178709%204.64843%200.69824%203.41797%201.68262%202.43359C2.66699%201.44922%203.89746%200.929684%205.37402%200.874997H31.624C33.1006%200.929684%2034.3311%201.44922%2035.3154%202.43359C36.2998%203.41797%2036.8193%204.64843%2036.874%206.125V32.375C36.8193%2033.8516%2036.2998%2035.082%2035.3154%2036.0664C34.3311%2037.0508%2033.1006%2037.5703%2031.624%2037.625H5.37402C3.89746%2037.5703%202.66699%2037.0508%201.68262%2036.0664C0.69824%2035.082%200.178709%2033.8516%200.124022%2032.375V6.125ZM11.2803%2014.6562C11.335%2013.3437%2011.7725%2012.25%2012.5928%2011.375C13.4678%2010.5547%2014.5615%2010.1172%2015.874%2010.0625H20.4678C21.9443%2010.1172%2023.1748%2010.6367%2024.1592%2011.6211C25.1436%2012.6055%2025.6631%2013.8359%2025.7178%2015.3125C25.6631%2017.1719%2024.8701%2018.6211%2023.3389%2019.6602L19.1553%2022.4492V24.5C19.1006%2024.8828%2018.8818%2025.1016%2018.499%2025.1562C18.1162%2025.1016%2017.8975%2024.8828%2017.8428%2024.5V22.1211C17.8428%2021.8477%2017.9521%2021.6562%2018.1709%2021.5469L22.6826%2018.5937C23.7764%2017.7734%2024.3506%2016.6797%2024.4053%2015.3125C24.3506%2014.1641%2023.9678%2013.2344%2023.2568%2012.5234C22.5459%2011.7578%2021.6162%2011.375%2020.4678%2011.375H15.874C14.9443%2011.375%2014.1787%2011.7031%2013.5771%2012.3594C12.9209%2012.9609%2012.5928%2013.7266%2012.5928%2014.6562V15.1484C12.5381%2015.5859%2012.3193%2015.8047%2011.9365%2015.8047C11.5537%2015.8047%2011.335%2015.5859%2011.2803%2015.1484V14.6562ZM17.1865%2028.4375C17.2412%2027.6172%2017.6787%2027.1797%2018.499%2027.125C19.3193%2027.1797%2019.7568%2027.6172%2019.8115%2028.4375C19.7568%2029.2578%2019.3193%2029.6953%2018.499%2029.75C17.6787%2029.6953%2017.2412%2029.2578%2017.1865%2028.4375Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "text-blue-800")}
                tag="div"
              >
                {"Want to know how it works?"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-800")}
                tag="div"
              >
                <_Builtin.Span
                  className={_utils.cx(
                    _styles,
                    "text-blue-500",
                    "text-underline"
                  )}
                  data-w-id="480911d7-c6cf-5ff6-539d-ecaccabd7e08"
                  data-next-button="1"
                >
                  {"Take a quick"}
                </_Builtin.Span>
                {" tour before starting assessment."}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
