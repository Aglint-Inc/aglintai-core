import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InterviewWelcome.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview-start-wrapper")}
      tag="div"
    >
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
            {"Welcome to the AI based interview for"}
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
          <_Builtin.Block
            className={_utils.cx(_styles, "instruction-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-lg",
                "fw-semibold",
                "color-grey-600"
              )}
              tag="div"
            >
              {"Interview Instructions"}
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
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                    {"Quiet Environment"}
                  </_Builtin.Span>
                  <br />
                  <_Builtin.Span
                    className={_utils.cx(_styles, "list-nxt-text")}
                  >
                    {
                      "Choose a quiet place to take the interview where you will not be interrupted."
                    }
                  </_Builtin.Span>
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "instruction-list")}
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                    {"Interruptions"}
                  </_Builtin.Span>
                  <br />
                  <_Builtin.Span
                    className={_utils.cx(_styles, "list-nxt-text")}
                  >
                    {
                      "If the interview is stopped for any reason, you will need to start over from the beginning."
                    }
                  </_Builtin.Span>
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "instruction-list")}
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                    {"Question Types"}
                  </_Builtin.Span>
                  <br />
                  <_Builtin.Span
                    className={_utils.cx(_styles, "list-nxt-text")}
                  >
                    {
                      "The AI will ask you questions based on your resume and the job requirements. Prepare yourself accordingly."
                    }
                  </_Builtin.Span>
                </_Builtin.ListItem>
                <_Builtin.ListItem
                  className={_utils.cx(_styles, "instruction-list")}
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
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
                  <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
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
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "start-interview-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {
                'Once you\'re ready, click the "Start Interview" button. Good luck, and we look forward to hearing your responses!'
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-471")}
              tag="div"
            >
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
            className={_utils.cx(_styles, "start-button")}
            tag="div"
            {...onClickStart}
          >
            <_Builtin.Block tag="div">{"Start Interview"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "disclaimer-ai-wrappers")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.5%205C6.05228%205%206.5%204.55228%206.5%204C6.5%203.44772%206.05228%203%205.5%203C4.94772%203%204.5%203.44772%204.5%204C4.5%204.55228%204.94772%205%205.5%205ZM5.5%2010C5.77614%2010%206%209.77614%206%209.5V6.5C6%206.22386%205.77614%206%205.5%206C5.22386%206%205%206.22386%205%206.5V9.5C5%209.77614%205.22386%2010%205.5%2010ZM5.5%2012C2.46243%2012%200%209.53757%200%206.5C0%203.46243%202.46243%201%205.5%201C8.53757%201%2011%203.46243%2011%206.5C11%209.53757%208.53757%2012%205.5%2012ZM5.5%2011C7.98528%2011%2010%208.98528%2010%206.5C10%204.01472%207.98528%202%205.5%202C3.01472%202%201%204.01472%201%206.5C1%208.98528%203.01472%2011%205.5%2011Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
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
              <_Builtin.Block tag="div">{"30 minitues"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600")}
              tag="div"
            >
              {
                "Please ensure you have sufficient time to complete it in one sitting."
              }
            </_Builtin.Block>
          </_Builtin.Block>
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
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%201.0625C7.51562%200.953125%207.57812%200.890625%207.6875%200.875H11.4375C11.5469%200.890625%2011.6094%200.953125%2011.625%201.0625V4.8125C11.6094%204.92188%2011.5469%204.98438%2011.4375%205C11.3281%204.98438%2011.2656%204.92188%2011.25%204.8125V1.50781L5.01562%207.76562C4.92188%207.82812%204.82812%207.82812%204.73438%207.76562C4.67188%207.67188%204.67188%207.57812%204.73438%207.48438L10.9922%201.25H7.6875C7.57812%201.23437%207.51562%201.17188%207.5%201.0625ZM1.3125%201.25H4.6875C4.79688%201.26563%204.85938%201.32812%204.875%201.4375C4.85938%201.54688%204.79688%201.60937%204.6875%201.625H1.3125C1.04688%201.625%200.828125%201.71875%200.65625%201.90625C0.46875%202.07812%200.375%202.29688%200.375%202.5625V11.1875C0.375%2011.4531%200.46875%2011.6719%200.65625%2011.8438C0.828125%2012.0312%201.04688%2012.125%201.3125%2012.125H9.9375C10.2031%2012.125%2010.4219%2012.0312%2010.5938%2011.8438C10.7812%2011.6719%2010.875%2011.4531%2010.875%2011.1875V7.8125C10.8906%207.70312%2010.9531%207.64062%2011.0625%207.625C11.1719%207.64062%2011.2344%207.70312%2011.25%207.8125V11.1875C11.2344%2011.5625%2011.1094%2011.875%2010.875%2012.125C10.625%2012.3594%2010.3125%2012.4844%209.9375%2012.5H1.3125C0.9375%2012.4844%200.625%2012.3594%200.375%2012.125C0.140625%2011.875%200.015625%2011.5625%200%2011.1875V2.5625C0.015625%202.1875%200.140625%201.875%200.375%201.625C0.625%201.39062%200.9375%201.26563%201.3125%201.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
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
              className={_utils.cx(_styles, "instruction")}
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
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
