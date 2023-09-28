import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./JobsListingCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1308":{"id":"e-1308","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-443","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1309"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4c8f5e59-2551-ecd2-b94c-afc3e4f6dd07","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4c8f5e59-2551-ecd2-b94c-afc3e4f6dd07","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695892125484},"e-1309":{"id":"e-1309","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-444","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1308"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4c8f5e59-2551-ecd2-b94c-afc3e4f6dd07","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4c8f5e59-2551-ecd2-b94c-afc3e4f6dd07","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695892125487}},"actionLists":{"a-443":{"id":"a-443","title":"Job Card Hover In","actionItemGroups":[{"actionItems":[{"id":"a-443-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".applicants-number.selected","selectorGuids":["f5f55dd6-917b-0ffc-bcec-dec748becaa4","cc6fc94f-ada0-ae9b-262b-af75e2fa8f5f"]},"globalSwatchId":"287ff474","rValue":34,"bValue":103,"gValue":143,"aValue":1}},{"id":"a-443-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".applicants-number.selected","selectorGuids":["f5f55dd6-917b-0ffc-bcec-dec748becaa4","cc6fc94f-ada0-ae9b-262b-af75e2fa8f5f"]},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-443-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-24.text-green-700","selectorGuids":["35e9d16b-c2e9-846f-7103-916aec42eab4","19b6b36c-6d91-704c-abf0-673091f056cb"]},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695892134302},"a-444":{"id":"a-444","title":"Job Card Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-444-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".applicants-number.selected","selectorGuids":["f5f55dd6-917b-0ffc-bcec-dec748becaa4","cc6fc94f-ada0-ae9b-262b-af75e2fa8f5f"]},"globalSwatchId":"8db28f70","rValue":237,"bValue":244,"gValue":248,"aValue":1}},{"id":"a-444-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".applicants-number.selected","selectorGuids":["f5f55dd6-917b-0ffc-bcec-dec748becaa4","cc6fc94f-ada0-ae9b-262b-af75e2fa8f5f"]},"globalSwatchId":"a1b0a24f","rValue":24,"bValue":70,"gValue":97,"aValue":1}},{"id":"a-444-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-24.text-green-700","selectorGuids":["35e9d16b-c2e9-846f-7103-916aec42eab4","19b6b36c-6d91-704c-abf0-673091f056cb"]},"globalSwatchId":"a1b0a24f","rValue":24,"bValue":70,"gValue":97,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695892134302}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobsListingCard({
  as: _Component = _Builtin.Block,
  textJobRole = "Software Developer",
  textCompanyLocation = "Microsoft, California, United States",
  textPostedDate = "Posted 2 months ago",
  rejectedCount = "0",
  interviewingCount = "0",
  selectedCount = "0",
  bgColorProps = {},
  textJobsStatus = "Draft",
  onClickCard = {},
  textColorActivePropsSourcing = {},
  textColorActiveInterviewingProps = {},
  slotStatusIcon,
  candidateCount = "0",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "rd-job-list-item")}
      data-w-id="4c8f5e59-2551-ecd2-b94c-afc3e4f6dd07"
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-job-info-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-company-info-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "job-details")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "one-line-clamp")}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textJobRole}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "tittle-company-location")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "company-location")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-grey-600"
                  )}
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                >
                  {textCompanyLocation}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-grey-500")}
          dyn={{
            bind: {},
          }}
          tag="div"
        >
          {textPostedDate}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "applicants-number-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "applicants-number")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-24", "text-grey-600")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {candidateCount}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "",
              "text-sm",
              "fw-semibold",
              "text-grey-600"
            )}
            tag="div"
          >
            {"Candidates"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "applicants-number")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-24", "text-grey-700")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {interviewingCount}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "",
              "text-sm",
              "fw-semibold",
              "text-grey-600"
            )}
            tag="div"
          >
            {"Interviewing"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "applicants-number", "selected")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-24", "text-green-700")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {selectedCount}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "fw-semibold")}
            tag="div"
          >
            {"Selected"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "applicants-number")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-24", "text-grey-500")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {rejectedCount}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "",
              "text-sm",
              "fw-semibold",
              "text-grey-500"
            )}
            tag="div"
          >
            {"Rejected"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-370")}
        id={_utils.cx(
          _styles,
          "w-node-ca45e366-fcfe-0176-2cef-1032591f3083-e4f6dd07"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-status-badge")}
          dyn={{
            bind: {},
          }}
          tag="div"
          {...bgColorProps}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-status-icons")}
            tag="div"
          >
            {slotStatusIcon}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-sm",
              "fw-semibold",
              "text-white",
              "text-first-capitialize"
            )}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {textJobsStatus}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-369")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-368")}
            tag="div"
            {...textColorActivePropsSourcing}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%204.64645C10.3417%204.45118%2010.6583%204.45118%2010.8536%204.64645C11.0488%204.84171%2011.0488%205.15829%2010.8536%205.35355L4.35355%2011.8536C4.15829%2012.0488%203.84171%2012.0488%203.64645%2011.8536L1.14645%209.35355C0.951184%209.15829%200.951184%208.84171%201.14645%208.64645C1.34171%208.45118%201.65829%208.45118%201.85355%208.64645L4%2010.7929L10.1464%204.64645ZM8.35355%2011.8536C8.15829%2012.0488%207.84171%2012.0488%207.64645%2011.8536C7.45118%2011.6583%207.45118%2011.3417%207.64645%2011.1464L14.1464%204.64645C14.3417%204.45118%2014.6583%204.45118%2014.8536%204.64645C15.0488%204.84171%2015.0488%205.15829%2014.8536%205.35355L8.35355%2011.8536Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Sourcing"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-368")}
            tag="div"
            {...textColorActiveInterviewingProps}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%204.64645C10.3417%204.45118%2010.6583%204.45118%2010.8536%204.64645C11.0488%204.84171%2011.0488%205.15829%2010.8536%205.35355L4.35355%2011.8536C4.15829%2012.0488%203.84171%2012.0488%203.64645%2011.8536L1.14645%209.35355C0.951184%209.15829%200.951184%208.84171%201.14645%208.64645C1.34171%208.45118%201.65829%208.45118%201.85355%208.64645L4%2010.7929L10.1464%204.64645ZM8.35355%2011.8536C8.15829%2012.0488%207.84171%2012.0488%207.64645%2011.8536C7.45118%2011.6583%207.45118%2011.3417%207.64645%2011.1464L14.1464%204.64645C14.3417%204.45118%2014.6583%204.45118%2014.8536%204.64645C15.0488%204.84171%2015.0488%205.15829%2014.8536%205.35355L8.35355%2011.8536Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Interviewing"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
