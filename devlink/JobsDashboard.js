import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { JobsListingCard } from "./JobsListingCard";
import * as _utils from "./utils";
import _styles from "./JobsDashboard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobsDashboard({
  as: _Component = _Builtin.Block,
  onClickCreateNewJob = {},
  slotAllJobs,
  slotSearchInputJob,
  jobCount = "0",
  textJobsHeader = "All Jobs",
  isJobCountTagVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "rd-main-wrapper")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-271")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-jobs-header-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-372")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {textJobsHeader}
            </_Builtin.Block>
            {isJobCountTagVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-373")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {jobCount}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-371")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "slot-input-search-job",
                "mobile-hide"
              )}
              tag="div"
            >
              {slotSearchInputJob}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "aui-button-wrap")}
                tag="div"
                tabIndex="0"
                {...onClickCreateNewJob}
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "aui-button",
                    "is-button-bg-blue"
                  )}
                  tag="div"
                  tabIndex="0"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "button-icon", "is-large")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%209%209%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.72502%201.4375V2.225H5.87502V1.4375C5.86408%201.27344%205.77658%201.18594%205.61252%201.175H2.98752C2.82346%201.18594%202.73596%201.27344%202.72502%201.4375ZM2.20002%202.225V1.4375C2.21096%201.21875%202.28752%201.03281%202.42971%200.879687C2.58283%200.7375%202.76877%200.660937%202.98752%200.649999H5.61252C5.83127%200.660937%206.01721%200.7375%206.17033%200.879687C6.31252%201.03281%206.38908%201.21875%206.40002%201.4375V2.225H7.45002C7.74533%202.23594%207.99142%202.33984%208.1883%202.53672C8.38517%202.73359%208.48908%202.97969%208.50002%203.275V7.475C8.48908%207.77031%208.38517%208.01641%208.1883%208.21328C7.99142%208.41016%207.74533%208.51406%207.45002%208.525H1.15002C0.854706%208.51406%200.608612%208.41016%200.411737%208.21328C0.214862%208.01641%200.110956%207.77031%200.100018%207.475V3.275C0.110956%202.97969%200.214862%202.73359%200.411737%202.53672C0.608612%202.33984%200.854706%202.23594%201.15002%202.225H2.20002ZM6.13752%202.75H2.46252H1.15002C0.996893%202.75%200.871112%202.79922%200.772674%202.89766C0.674237%202.99609%200.625018%203.12187%200.625018%203.275V7.475C0.625018%207.62812%200.674237%207.75391%200.772674%207.85234C0.871112%207.95078%200.996893%208%201.15002%208H7.45002C7.60314%208%207.72892%207.95078%207.82736%207.85234C7.9258%207.75391%207.97502%207.62812%207.97502%207.475V3.275C7.97502%203.12187%207.9258%202.99609%207.82736%202.89766C7.72892%202.79922%207.60314%202.75%207.45002%202.75H6.13752Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-md")}
                    tag="div"
                  >
                    {"Add Job"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-input-search-job", "mobile-show")}
          tag="div"
        >
          {slotSearchInputJob}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-jobs-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "all-job-list")}
          tag="div"
        >
          {slotAllJobs ?? <JobsListingCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
