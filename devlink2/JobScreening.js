import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { JobCandidateCard } from "./JobCandidateCard";
import { JobsScreening } from "./JobsScreening";
import * as _utils from "./utils";
import _styles from "./JobScreening.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e":{"id":"e","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-2"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a":{"id":"a","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe136"]},"value":0,"unit":""}},{"id":"a-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe0d1"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe136"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobScreening({
  as: _Component = _Builtin.Block,
  slotSmallProfileImage,
  textRole = "This is some text inside of a div block.",
  statusBgColor = {},
  textStatus = "Interviewing",
  slotStopSubmission,
  slotSubmissionControlBtn,
  slotProfileImage,
  textCompanyLocation = "This is some text inside of a div block.",
  onClickAllApplicant = {},
  countAllApplicant = "19 Applicants",
  onClickViewJobPost = {},
  textpostedDates = "Posted 3 days ago",
  onClickScreening = {},
  countScreening = "Applicants",
  onClickShortlisted = {},
  countShortlisted = "Applicants",
  onClickSelected = {},
  countSelected = "1 Applicant",
  onClickImportCandidate = {},
  onClickSortBy = {},
  onClickResumeMatch = {},
  onClickFilter = {},
  textShowResults = "Showing 19 out of 19 Candidates",
  slotSearchInput,
  slotCandidateJobCard,
  slotViewJobPost,
  slotScreening,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "rd-main-wrapper")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-271")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-jobs-header-wrapper-jobs")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-281")}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "link-block")}
              button={false}
              options={{
                href: "#",
              }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                tag="div"
              >
                {"Jobs"}
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-283")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.29289%2010.7071C2.93241%2010.3466%202.90468%209.77939%203.2097%209.3871L3.29289%209.29289L6.585%206L3.29289%202.70711C2.93241%202.34662%202.90468%201.77939%203.2097%201.3871L3.29289%201.29289C3.65338%200.932409%204.22061%200.904679%204.6129%201.2097L4.70711%201.29289L8.70711%205.29289C9.06759%205.65338%209.09532%206.22061%208.7903%206.6129L8.70711%206.70711L4.70711%2010.7071C4.31658%2011.0976%203.68342%2011.0976%203.29289%2010.7071Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-282")}
              tag="div"
            >
              {slotSmallProfileImage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-lg",
                "text-grey-700",
                "letter-spacing-small"
              )}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textRole}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "submission-controls")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-290")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-sm",
                  "fw-semibold",
                  "color-grey-500"
                )}
                tag="div"
              >
                {"Status"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdd-submission-status")}
                tag="div"
                {...statusBgColor}
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-kale-800"
                  )}
                  tag="div"
                >
                  {textStatus}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <_Builtin.Block tag="div">{slotStopSubmission}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "stop-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "stop-bg")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "stop-card")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                    tag="div"
                  >
                    {"Are you sure want to stop the submission?"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-323")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cancel-text")}
                      tag="div"
                    >
                      {"Cancel "}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "link-block-3")}
                      tag="div"
                      href="#"
                    >
                      {slotSubmissionControlBtn}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-jobs-wrapper")}
        tag="div"
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
              className={_utils.cx(_styles, "rd-company-icon-block")}
              tag="div"
            >
              {slotProfileImage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-details")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                dyn={{
                  bind: {},
                }}
                tag="div"
              >
                {textRole}
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
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-job-list-wrapper")}
          tag="div"
        >
          <_Builtin.TabsWrapper
            className={_utils.cx(_styles, "cdd-job-list-tab")}
            current="All Applicants"
            easing="ease"
            fadeIn={300}
            fadeOut={100}
          >
            <_Builtin.TabsMenu
              className={_utils.cx(_styles, "rd-job-list-tab-menu")}
              tag="div"
            >
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "cdd-tab-link", "all")}
                data-w-tab="All Applicants"
                {...onClickAllApplicant}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdd-tab-link-title")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdd-tab-link-icon-block",
                      "kale-700"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.9999%209C9.34304%209%207.99989%207.65685%207.99989%206C7.99989%204.34315%209.34304%203%2010.9999%203C12.6567%203%2013.9999%204.34315%2013.9999%206C13.9999%207.65685%2012.6567%209%2010.9999%209ZM10.9999%208C12.1045%208%2012.9999%207.10457%2012.9999%206C12.9999%204.89543%2012.1045%204%2010.9999%204C9.89532%204%208.99989%204.89543%208.99989%206C8.99989%207.10457%209.89532%208%2010.9999%208ZM4.49989%206C3.11918%206%201.99989%204.88071%201.99989%203.5C1.99989%202.11929%203.11918%201%204.49989%201C5.8806%201%206.99989%202.11929%206.99989%203.5C6.99989%204.88071%205.8806%206%204.49989%206ZM4.49989%205C5.32832%205%205.99989%204.32843%205.99989%203.5C5.99989%202.67157%205.32832%202%204.49989%202C3.67146%202%202.99989%202.67157%202.99989%203.5C2.99989%204.32843%203.67146%205%204.49989%205ZM15.9978%2014.4547C16.0228%2014.7297%2015.8202%2014.9729%2015.5452%2014.9979C15.2702%2015.0229%2015.0269%2014.8203%2015.0019%2014.5453C14.8248%2012.597%2013.0351%2011%2010.9999%2011C8.96465%2011%207.17496%2012.597%206.99784%2014.5453C6.97284%2014.8203%206.72963%2015.0229%206.45462%2014.9979C6.17962%2014.9729%205.97694%2014.7297%206.00195%2014.4547C6.22635%2011.9863%208.45237%2010%2010.9999%2010C13.5474%2010%2015.7734%2011.9863%2015.9978%2014.4547ZM7.97423%209.34189C8.06156%209.60386%207.91998%209.88702%207.65801%209.97434C7.39603%2010.0617%207.11287%209.92009%207.02555%209.65811C6.70672%208.70162%205.62923%208%204.49989%208C3.37055%208%202.29307%208.70162%201.97423%209.65811C1.88691%209.92009%201.60375%2010.0617%201.34178%209.97434C1.07981%209.88702%200.938226%209.60386%201.02555%209.34189C1.48692%207.95779%202.9578%207%204.49989%207C6.04198%207%207.51287%207.95779%207.97423%209.34189Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "text-kale-800"
                    )}
                    tag="div"
                  >
                    {"All Applicants"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-xsm", "text-kale-600")}
                  tag="div"
                >
                  {countAllApplicant}
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "cdd-tab-link", "screening")}
                data-w-tab="Screening"
                {...onClickScreening}
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cdd-tab-link-title",
                    "height-mesa"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdd-tab-link-icon-block",
                      "blue-700"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.03%206H8.52L10.48%202.28C10.54%202.13%2010.47%202%2010.31%202H7.39C7.23%202%207.05%202.13%206.99%202.28L5.53%205.68C5.46%205.84%205.53%206%205.69%206H7L5.58%2010.07C5.47%2010.36%205.55%2010.61%205.92%2010.28L10.05%206.39C10.28%206.16%2010.27%206%2010.03%206ZM3.99995%2014.7929L7.79289%2011H15V1H1V11H4V11.5L3.99995%2014.7929ZM3%2012H1C0.443858%2012%200%2011.5561%200%2011V1C0%200.443858%200.443858%200%201%200H15C15.5561%200%2016%200.443858%2016%201V11C16%2011.5561%2015.5561%2012%2015%2012H8.20711L4.70005%2015.507C4.41435%2015.7871%203.98918%2015.87%203.6192%2015.7177C3.24922%2015.5653%203.00567%2015.2071%203%2014.8V12Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "color-blue-800"
                    )}
                    tag="div"
                  >
                    {"Screening"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-327")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-xsm", "text-blue-800")}
                    tag="div"
                  >
                    {countScreening}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "cdd-tab-link", "shortlisted")}
                data-w-tab="Shortlisted"
                {...onClickShortlisted}
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cdd-tab-link-title",
                    "height-mesa"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdd-tab-link-icon-block",
                      "purple-700"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.5%204C3.32843%204%204%203.32843%204%202.5C4%201.67157%203.32843%201%202.5%201C1.67157%201%201%201.67157%201%202.5C1%203.32843%201.67157%204%202.5%204ZM5%202.5C5%202.77614%205.22386%203%205.5%203H14.5C14.7761%203%2015%202.77614%2015%202.5C15%202.22386%2014.7761%202%2014.5%202H5.5C5.22386%202%205%202.22386%205%202.5ZM5%207.5C5%207.77614%205.22386%208%205.5%208H14.5C14.7761%208%2015%207.77614%2015%207.5C15%207.22386%2014.7761%207%2014.5%207H5.5C5.22386%207%205%207.22386%205%207.5ZM5%2012.5C5%2012.7761%205.22386%2013%205.5%2013H14.5C14.7761%2013%2015%2012.7761%2015%2012.5C15%2012.2239%2014.7761%2012%2014.5%2012H5.5C5.22386%2012%205%2012.2239%205%2012.5ZM4%207.5C4%208.32843%203.32843%209%202.5%209C1.67157%209%201%208.32843%201%207.5C1%206.67157%201.67157%206%202.5%206C3.32843%206%204%206.67157%204%207.5ZM2.5%2014C3.32843%2014%204%2013.3284%204%2012.5C4%2011.6716%203.32843%2011%202.5%2011C1.67157%2011%201%2011.6716%201%2012.5C1%2013.3284%201.67157%2014%202.5%2014Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold", "pink-800")}
                    tag="div"
                  >
                    {"Shortlisted"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-327")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-xsm", "text-blue-800")}
                    tag="div"
                  >
                    {countShortlisted}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "cdd-tab-link", "selected")}
                data-w-tab="Selected"
                {...onClickSelected}
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cdd-tab-link-title",
                    "height-mesa"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdd-tab-link-icon-block",
                      "green-700"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%204.64645C10.3417%204.45118%2010.6583%204.45118%2010.8536%204.64645C11.0488%204.84171%2011.0488%205.15829%2010.8536%205.35355L4.35355%2011.8536C4.15829%2012.0488%203.84171%2012.0488%203.64645%2011.8536L1.14645%209.35355C0.951184%209.15829%200.951184%208.84171%201.14645%208.64645C1.34171%208.45118%201.65829%208.45118%201.85355%208.64645L4%2010.7929L10.1464%204.64645ZM8.35355%2011.8536C8.15829%2012.0488%207.84171%2012.0488%207.64645%2011.8536C7.45118%2011.6583%207.45118%2011.3417%207.64645%2011.1464L14.1464%204.64645C14.3417%204.45118%2014.6583%204.45118%2014.8536%204.64645C15.0488%204.84171%2015.0488%205.15829%2014.8536%205.35355L8.35355%2011.8536Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "text-green-800"
                    )}
                    tag="div"
                  >
                    {"Selected"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-xsm", "text-green-700")}
                  tag="div"
                >
                  {countSelected}
                </_Builtin.Block>
              </_Builtin.TabsLink>
            </_Builtin.TabsMenu>
            <_Builtin.TabsContent
              className={_utils.cx(_styles, "rd-job-list-tab-content", "mt-60")}
              tag="div"
            >
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="All Applicants"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdd-tab-content-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdd-tab-content-top")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-285")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                        tag="div"
                      >
                        {"All Applicants"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "content-6", "clickable")}
                        tag="div"
                        {...onClickImportCandidate}
                      >
                        <_Builtin.Image
                          className={_utils.cx(_styles, "vectors-wrapper-40")}
                          width={12}
                          height={12}
                          loading="lazy"
                          src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65046d076826d94d7da6abcc_Vectors-Wrapper.svg"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "label-7")}
                          tag="div"
                        >
                          {"Import Candidates"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdd-search-filter")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdd-filter-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "rd-filter-block")}
                          tag="div"
                          {...onClickSortBy}
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "rd-filter-icon")}
                            width={12}
                            height={12}
                            loading="lazy"
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d085ea1a69e3594c991_Vectors-Wrapper.svg"
                          />
                          <_Builtin.Block tag="div">{"Sort by"}</_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdd-filter-resume-match"
                          )}
                          tag="div"
                          {...onClickResumeMatch}
                        >
                          {"Resume Match Asc"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "", "rd-filter-block")}
                          tag="div"
                          {...onClickFilter}
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "filter-token")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-18"
                              )}
                              width={10.939278602600098}
                              height={10.930898666381836}
                              loading="lazy"
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d090b86d460a1805107_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "")}
                            tag="div"
                          >
                            {"Filter"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-284")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-sm",
                            "color-grey-600"
                          )}
                          tag="div"
                        >
                          {textShowResults}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "input")}
                          tag="div"
                        >
                          {slotSearchInput}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "slot-job-candidate-card")}
                      tag="div"
                    >
                      {slotCandidateJobCard ?? <JobCandidateCard />}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="Screening"
              >
                <_Builtin.Block tag="div">
                  {slotScreening ?? <JobsScreening />}
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="Shortlisted"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdd-tab-content-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdd-tab-content-top")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-285")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                        tag="div"
                      >
                        {"Shortlisted"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdd-import-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "content-7",
                            "clickable"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "vectors-wrapper-41")}
                            width={12}
                            height={12}
                            loading="lazy"
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65047121f55e98229ef58e02_Vectors-Wrapper.svg"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "label-8")}
                            tag="div"
                          >
                            {"Export CSV"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "content-6",
                            "clickable"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "vectors-wrapper-40")}
                            width={12}
                            height={12}
                            loading="lazy"
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65046d076826d94d7da6abcc_Vectors-Wrapper.svg"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "label-7")}
                            tag="div"
                          >
                            {"Import Candidates"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdd-search-filter")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdd-filter-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "rd-filter-block")}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "rd-filter-icon")}
                            width={12}
                            height={12}
                            loading="lazy"
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d085ea1a69e3594c991_Vectors-Wrapper.svg"
                          />
                          <_Builtin.Block tag="div">{"Sort by"}</_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdd-filter-resume-match"
                          )}
                          tag="div"
                        >
                          {"Resume Match Asc"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "", "rd-filter-block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "filter-token")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-18"
                              )}
                              width={10.939278602600098}
                              height={10.930898666381836}
                              loading="lazy"
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d090b86d460a1805107_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "")}
                            tag="div"
                          >
                            {"Filter"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-284")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-sm",
                            "color-grey-600"
                          )}
                          tag="div"
                        >
                          {"Showing 1 out of 19 Candidates"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "input")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "rd-search-icon-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(_styles, "icon")}
                              width={15.5}
                              height={15.5}
                              loading="lazy"
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d0ada1b1e8bdf3f48e1_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                          <_Builtin.FormWrapper
                            className={_utils.cx(_styles, "form-block-3")}
                          >
                            <_Builtin.FormForm
                              className={_utils.cx(_styles, "form-4")}
                              name="email-form"
                              data-name="Email Form"
                              method="get"
                              id="email-form"
                            >
                              <_Builtin.FormTextInput
                                className={_utils.cx(_styles, "text-field-3")}
                                name="email-3"
                                maxLength={256}
                                data-name="Email 3"
                                placeholder="Search"
                                disabled={false}
                                type="email"
                                required={true}
                                autoFocus={false}
                                id="email-3"
                              />
                            </_Builtin.FormForm>
                            <_Builtin.FormSuccessMessage
                              className={_utils.cx(_styles, "hide")}
                            >
                              <_Builtin.Block tag="div">
                                {
                                  "Thank you! Your submission has been received!"
                                }
                              </_Builtin.Block>
                            </_Builtin.FormSuccessMessage>
                            <_Builtin.FormErrorMessage
                              className={_utils.cx(_styles, "hide")}
                            >
                              <_Builtin.Block tag="div">
                                {
                                  "Oops! Something went wrong while submitting the form."
                                }
                              </_Builtin.Block>
                            </_Builtin.FormErrorMessage>
                          </_Builtin.FormWrapper>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot-job-candidate-card")}
                    tag="div"
                  />
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="Selected"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdd-tab-content-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdd-tab-content-top")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-285")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                        tag="div"
                      >
                        {"Selected"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdd-import-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "content-7",
                            "clickable"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "vectors-wrapper-41")}
                            width={12}
                            height={12}
                            loading="lazy"
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65047121f55e98229ef58e02_Vectors-Wrapper.svg"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "label-8")}
                            tag="div"
                          >
                            {"Export CSV"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "content-6",
                            "clickable"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "vectors-wrapper-40")}
                            width={12}
                            height={12}
                            loading="lazy"
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65046d076826d94d7da6abcc_Vectors-Wrapper.svg"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "label-7")}
                            tag="div"
                          >
                            {"Import Candidates"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdd-search-filter")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdd-filter-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "rd-filter-block")}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "rd-filter-icon")}
                            width={12}
                            height={12}
                            loading="lazy"
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d085ea1a69e3594c991_Vectors-Wrapper.svg"
                          />
                          <_Builtin.Block tag="div">{"Sort by"}</_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdd-filter-resume-match"
                          )}
                          tag="div"
                        >
                          {"Resume Match Asc"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "", "rd-filter-block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "filter-token")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-18"
                              )}
                              width={10.939278602600098}
                              height={10.930898666381836}
                              loading="lazy"
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d090b86d460a1805107_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "")}
                            tag="div"
                          >
                            {"Filter"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-284")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-sm",
                            "color-grey-600"
                          )}
                          tag="div"
                        >
                          {"Showing 1 out of 19 Candidates"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "input")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "rd-search-icon-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(_styles, "icon")}
                              width={15.5}
                              height={15.5}
                              loading="lazy"
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d0ada1b1e8bdf3f48e1_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                          <_Builtin.FormWrapper
                            className={_utils.cx(_styles, "form-block-3")}
                          >
                            <_Builtin.FormForm
                              className={_utils.cx(_styles, "form-4")}
                              name="email-form"
                              data-name="Email Form"
                              method="get"
                              id="email-form"
                            >
                              <_Builtin.FormTextInput
                                className={_utils.cx(_styles, "text-field-3")}
                                name="email-2"
                                maxLength={256}
                                data-name="Email 2"
                                placeholder="Search"
                                disabled={false}
                                type="email"
                                required={true}
                                autoFocus={false}
                                id="email-2"
                              />
                            </_Builtin.FormForm>
                            <_Builtin.FormSuccessMessage
                              className={_utils.cx(_styles, "hide")}
                            >
                              <_Builtin.Block tag="div">
                                {
                                  "Thank you! Your submission has been received!"
                                }
                              </_Builtin.Block>
                            </_Builtin.FormSuccessMessage>
                            <_Builtin.FormErrorMessage
                              className={_utils.cx(_styles, "hide")}
                            >
                              <_Builtin.Block tag="div">
                                {
                                  "Oops! Something went wrong while submitting the form."
                                }
                              </_Builtin.Block>
                            </_Builtin.FormErrorMessage>
                          </_Builtin.FormWrapper>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdd-content-main")}
                    tag="div"
                  >
                    <_Builtin.Block
                      id={_utils.cx(
                        _styles,
                        "w-node-_2f12da64-29fb-20e5-751e-e8d0b5d0d0b1-b5d0ce3b"
                      )}
                      tag="div"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdd-content-side")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cdd-template-block",
                          "jobs-templ"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-292")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "fw-semibold",
                              "color-grey-500"
                            )}
                            tag="div"
                          >
                            {"Selected Email"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "rd-email-edit-btn",
                              "clickable"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "label-8")}
                              tag="div"
                            >
                              {"Edit"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "rd-company-sidebar")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "rd-email-edit-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(_styles, "hide")}
                                value="%3Cstyle%3E%0A.rd-email-edit-wrapper%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A.rd-email-edit-wrapper%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%0A%20%20scrollbar-width%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
                              />
                              <_Builtin.Block
                                className={_utils.cx(_styles, "div-block-307")}
                                tag="div"
                              >
                                <_Builtin.Block
                                  className={_utils.cx(
                                    _styles,
                                    "text-lg",
                                    "fw-semibold",
                                    "text-grey-500"
                                  )}
                                  tag="div"
                                >
                                  {"Interview Email"}
                                </_Builtin.Block>
                                <_Builtin.Block
                                  className={_utils.cx(
                                    _styles,
                                    "rd-company-edit-btns"
                                  )}
                                  tag="div"
                                >
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "aui-button-wrap",
                                      "email"
                                    )}
                                    tag="div"
                                    tabIndex="0"
                                  >
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "aui-button",
                                        "is-small",
                                        "is-button-outlined"
                                      )}
                                      tag="div"
                                      tabIndex="0"
                                    >
                                      <_Builtin.Block tag="div">
                                        {"Save Changes"}
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                  </_Builtin.Block>
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "aui-button-wrap",
                                      "email"
                                    )}
                                    tag="div"
                                    tabIndex="0"
                                  >
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "aui-button",
                                        "is-small",
                                        "is-button-outlined",
                                        "danger"
                                      )}
                                      tag="div"
                                      tabIndex="0"
                                    >
                                      <_Builtin.Block tag="div">
                                        {"Close"}
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                  </_Builtin.Block>
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(_styles, "div-block-308")}
                                tag="div"
                              >
                                <_Builtin.Block
                                  className={_utils.cx(
                                    _styles,
                                    "sidebar-wrapper",
                                    "rd-company"
                                  )}
                                  tag="div"
                                >
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "sidebar-block"
                                    )}
                                    tag="div"
                                  >
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "rd-email-edit-block"
                                      )}
                                      tag="div"
                                    >
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "text-sm",
                                          "fw-semibold",
                                          "color-black"
                                        )}
                                        tag="div"
                                      >
                                        {"Title"}
                                      </_Builtin.Block>
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "input",
                                          "para"
                                        )}
                                        tag="div"
                                      >
                                        <_Builtin.FormWrapper
                                          className={_utils.cx(
                                            _styles,
                                            "form-block-3"
                                          )}
                                        >
                                          <_Builtin.FormForm
                                            className={_utils.cx(
                                              _styles,
                                              "form-4"
                                            )}
                                            name="email-form"
                                            data-name="Email Form"
                                            method="get"
                                            id="email-form"
                                          >
                                            <_Builtin.Block tag="div">
                                              {
                                                "Congratulations! You've Been Shortlisted for the Next Round of Interviews at Nike 🎉"
                                              }
                                            </_Builtin.Block>
                                          </_Builtin.FormForm>
                                          <_Builtin.FormSuccessMessage
                                            className={_utils.cx(
                                              _styles,
                                              "hide"
                                            )}
                                          >
                                            <_Builtin.Block tag="div">
                                              {
                                                "Thank you! Your submission has been received!"
                                              }
                                            </_Builtin.Block>
                                          </_Builtin.FormSuccessMessage>
                                          <_Builtin.FormErrorMessage
                                            className={_utils.cx(
                                              _styles,
                                              "hide"
                                            )}
                                          >
                                            <_Builtin.Block tag="div">
                                              {
                                                "Oops! Something went wrong while submitting the form."
                                              }
                                            </_Builtin.Block>
                                          </_Builtin.FormErrorMessage>
                                        </_Builtin.FormWrapper>
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "rd-email-edit-block"
                                      )}
                                      tag="div"
                                    >
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "text-sm",
                                          "fw-semibold",
                                          "color-black"
                                        )}
                                        tag="div"
                                      >
                                        {"Body Content"}
                                      </_Builtin.Block>
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "cj-richtext-editor-wrapper"
                                        )}
                                        tag="div"
                                      >
                                        <_Builtin.Block
                                          className={_utils.cx(
                                            _styles,
                                            "cj-richtext-cotrols"
                                          )}
                                          tag="div"
                                        >
                                          <_Builtin.Block
                                            className={_utils.cx(
                                              _styles,
                                              "cj-rt-paragraph"
                                            )}
                                            tag="div"
                                          >
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "medium-default-11"
                                              )}
                                              tag="div"
                                            >
                                              {"Paragraph"}
                                            </_Builtin.Block>
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "chevron-down---16px-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.Image
                                                className={_utils.cx(
                                                  _styles,
                                                  "vectors-wrapper-31"
                                                )}
                                                width={11.00003719329834}
                                                height={5.00001859664917}
                                                loading="lazy"
                                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504043394863d835c0a86cc_Vectors-Wrapper.svg"
                                              />
                                            </_Builtin.Block>
                                          </_Builtin.Block>
                                          <_Builtin.Block
                                            className={_utils.cx(
                                              _styles,
                                              "cj-rt-controls-block"
                                            )}
                                            tag="div"
                                          >
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "cj-rt-control-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.HtmlEmbed
                                                className={_utils.cx(
                                                  _styles,
                                                  "icon"
                                                )}
                                                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%201.5C3%201.22386%203.22386%201%203.5%201H7C9.17614%201%2011%202.82386%2011%205C11%206.31462%2010.3344%207.50068%209.32761%208.23374C10.87%208.79245%2012%2010.2871%2012%2012C12%2014.1761%2010.1761%2016%208%2016H3.5C3.22386%2016%203%2015.7761%203%2015.5V8.5V1.5ZM4%208H7C8.62386%208%2010%206.62386%2010%205C10%203.37614%208.62386%202%207%202H4V8ZM4%209V15H8C9.62386%2015%2011%2013.6239%2011%2012C11%2010.3761%209.62386%209%208%209H7H4Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                                              />
                                            </_Builtin.Block>
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "cj-rt-control-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.HtmlEmbed
                                                className={_utils.cx(
                                                  _styles,
                                                  "icon"
                                                )}
                                                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%202.0001H8.38151L5.59579%2015.0001H4.5C4.22386%2015.0001%204%2015.224%204%2015.5001C4%2015.7762%204.22386%2016.0001%204.5%2016.0001H5.99031C5.99712%2016.0002%206.0039%2016.0002%206.01067%2016.0001H7.5C7.77614%2016.0001%208%2015.7762%208%2015.5001C8%2015.224%207.77614%2015.0001%207.5%2015.0001H6.61849L9.40421%202.0001H10.5C10.7761%202.0001%2011%201.77625%2011%201.5001C11%201.22396%2010.7761%201.0001%2010.5%201.0001H9.00965C9.00287%200.999965%208.99611%200.999966%208.98937%201.0001H7.5C7.22386%201.0001%207%201.22396%207%201.5001C7%201.77625%207.22386%202.0001%207.5%202.0001Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                                              />
                                            </_Builtin.Block>
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "cj-rt-control-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.HtmlEmbed
                                                className={_utils.cx(
                                                  _styles,
                                                  "icon"
                                                )}
                                                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.5%2016C2.22386%2016%202%2015.7761%202%2015.5C2%2015.2239%202.22386%2015%202.5%2015H12.5C12.7761%2015%2013%2015.2239%2013%2015.5C13%2015.7761%2012.7761%2016%2012.5%2016H2.5ZM3%201.5C3%201.22386%203.22386%201%203.5%201C3.77614%201%204%201.22386%204%201.5V9.5C4%2011.4239%205.57614%2013%207.5%2013C9.42386%2013%2011%2011.4239%2011%209.5V1.5C11%201.22386%2011.2239%201%2011.5%201C11.7761%201%2012%201.22386%2012%201.5V9.5C12%2011.9761%209.97614%2014%207.5%2014C5.02386%2014%203%2011.9761%203%209.5V1.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                                              />
                                            </_Builtin.Block>
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "cj-rt-control-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.HtmlEmbed
                                                className={_utils.cx(
                                                  _styles,
                                                  "icon"
                                                )}
                                                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.6464%205.85369C11.4512%205.65842%2011.4512%205.34184%2011.6464%205.14658C11.8417%204.95132%2012.1583%204.95132%2012.3536%205.14658L14.4536%207.24658C14.8488%207.64184%2014.8488%208.25842%2014.4617%208.64537L12.3617%2010.8454C12.171%2011.0451%2011.8545%2011.0525%2011.6548%2010.8618C11.455%2010.6711%2011.4477%2010.3546%2011.6383%2010.1549L13.743%207.95022L11.6464%205.85369ZM4.36168%2010.1549C4.55235%2010.3546%204.54499%2010.6711%204.34524%2010.8618C4.14549%2011.0525%203.82899%2011.0451%203.63832%2010.8454L1.54645%208.65369C1.15118%208.25842%201.15118%207.64184%201.54645%207.24658L3.64645%205.14658C3.84171%204.95132%204.15829%204.95132%204.35355%205.14658C4.54882%205.34184%204.54882%205.65842%204.35355%205.85369L2.25651%207.95073C2.25794%207.95151%204.36168%2010.1549%204.36168%2010.1549ZM9.53576%202.81444C9.63832%202.55805%209.9293%202.43334%2010.1857%202.53589C10.4421%202.63845%2010.5668%202.92944%2010.4642%203.18583L6.46424%2013.1858C6.36168%2013.4422%206.0707%2013.5669%205.8143%2013.4644C5.55791%2013.3618%205.43321%2013.0708%205.53576%2012.8144L9.53576%202.81444Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                                              />
                                            </_Builtin.Block>
                                          </_Builtin.Block>
                                          <_Builtin.Block
                                            className={_utils.cx(
                                              _styles,
                                              "cj-rt-controls-block"
                                            )}
                                            tag="div"
                                          >
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "cj-rt-control-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.Image
                                                className={_utils.cx(
                                                  _styles,
                                                  "vectors-wrapper-33"
                                                )}
                                                width={14}
                                                height={13}
                                                loading="lazy"
                                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650406032fb689392940aa9d_Vectors-Wrapper.svg"
                                              />
                                            </_Builtin.Block>
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "",
                                                "cj-rt-control-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.Image
                                                className={_utils.cx(
                                                  _styles,
                                                  "vectors-wrapper-34"
                                                )}
                                                width={13.769068717956543}
                                                height={13.850000381469727}
                                                loading="lazy"
                                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040604bc4e5ef14157a09d_Vectors-Wrapper.svg"
                                              />
                                            </_Builtin.Block>
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "",
                                                "cj-rt-control-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.Image
                                                className={_utils.cx(
                                                  _styles,
                                                  "",
                                                  "vectors-wrapper-33"
                                                )}
                                                width={14}
                                                height={13}
                                                loading="lazy"
                                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040605c8b96fcc667a74b1_Vectors-Wrapper.svg"
                                              />
                                            </_Builtin.Block>
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "",
                                                "cj-rt-control-icon"
                                              )}
                                              tag="div"
                                            >
                                              <_Builtin.Image
                                                className={_utils.cx(
                                                  _styles,
                                                  "vectors-wrapper-32"
                                                )}
                                                width={14.25}
                                                height={13}
                                                loading="lazy"
                                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504060655c5313f7f217aa2_Vectors-Wrapper.svg"
                                              />
                                            </_Builtin.Block>
                                          </_Builtin.Block>
                                        </_Builtin.Block>
                                        <_Builtin.Block
                                          className={_utils.cx(
                                            _styles,
                                            "cj-rt-input-block"
                                          )}
                                          tag="div"
                                        >
                                          <_Builtin.FormWrapper
                                            className={_utils.cx(
                                              _styles,
                                              "form-block-4"
                                            )}
                                          >
                                            <_Builtin.FormForm
                                              className={_utils.cx(
                                                _styles,
                                                "form-4"
                                              )}
                                              name="email-form-2"
                                              data-name="Email Form 2"
                                              method="get"
                                              id="email-form-2"
                                            >
                                              <_Builtin.FormButton
                                                className={_utils.cx(
                                                  _styles,
                                                  "hide"
                                                )}
                                                type="submit"
                                                value="Submit"
                                                data-wait="Please wait..."
                                              />
                                              <_Builtin.Paragraph
                                                className={_utils.cx(
                                                  _styles,
                                                  "paragraph-2"
                                                )}
                                              >
                                                {"Dear [Candidate's Name],"}
                                                <br />
                                                {
                                                  "We hope this message finds you well. We were impressed by your application and are excited to inform you that your resume has been shortlisted for the next round of our interview process."
                                                }
                                                <br />
                                                {
                                                  "The next stage involves an AI-based interview that will give us an opportunity to know you better and for you to showcase your skills and qualifications in greater detail."
                                                }
                                              </_Builtin.Paragraph>
                                            </_Builtin.FormForm>
                                            <_Builtin.FormSuccessMessage
                                              className={_utils.cx(
                                                _styles,
                                                "hide"
                                              )}
                                            >
                                              <_Builtin.Block tag="div">
                                                {
                                                  "Thank you! Your submission has been received!"
                                                }
                                              </_Builtin.Block>
                                            </_Builtin.FormSuccessMessage>
                                            <_Builtin.FormErrorMessage
                                              className={_utils.cx(
                                                _styles,
                                                "hide"
                                              )}
                                            >
                                              <_Builtin.Block tag="div">
                                                {
                                                  "Oops! Something went wrong while submitting the form."
                                                }
                                              </_Builtin.Block>
                                            </_Builtin.FormErrorMessage>
                                          </_Builtin.FormWrapper>
                                        </_Builtin.Block>
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "rd-email-edit-block"
                                      )}
                                      tag="div"
                                    >
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "text-sm",
                                          "fw-semibold",
                                          "color-black"
                                        )}
                                        tag="div"
                                      >
                                        {"CTA text"}
                                      </_Builtin.Block>
                                      <_Builtin.Block
                                        className={_utils.cx(_styles, "input")}
                                        tag="div"
                                      >
                                        <_Builtin.FormWrapper
                                          className={_utils.cx(
                                            _styles,
                                            "form-block-3"
                                          )}
                                        >
                                          <_Builtin.FormForm
                                            className={_utils.cx(
                                              _styles,
                                              "form-4"
                                            )}
                                            name="email-form"
                                            data-name="Email Form"
                                            method="get"
                                            id="email-form"
                                          >
                                            <_Builtin.FormTextInput
                                              className={_utils.cx(
                                                _styles,
                                                "text-field-3"
                                              )}
                                              name="email-2"
                                              maxLength={256}
                                              data-name="Email 2"
                                              placeholder="Take Interview"
                                              disabled={false}
                                              type="email"
                                              required={false}
                                              autoFocus={false}
                                              id="email-2"
                                            />
                                          </_Builtin.FormForm>
                                          <_Builtin.FormSuccessMessage
                                            className={_utils.cx(
                                              _styles,
                                              "hide"
                                            )}
                                          >
                                            <_Builtin.Block tag="div">
                                              {
                                                "Thank you! Your submission has been received!"
                                              }
                                            </_Builtin.Block>
                                          </_Builtin.FormSuccessMessage>
                                          <_Builtin.FormErrorMessage
                                            className={_utils.cx(
                                              _styles,
                                              "hide"
                                            )}
                                          >
                                            <_Builtin.Block tag="div">
                                              {
                                                "Oops! Something went wrong while submitting the form."
                                              }
                                            </_Builtin.Block>
                                          </_Builtin.FormErrorMessage>
                                        </_Builtin.FormWrapper>
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "rd-email-edit-block"
                                      )}
                                      tag="div"
                                    >
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "text-sm",
                                          "fw-semibold",
                                          "color-black"
                                        )}
                                        tag="div"
                                      >
                                        {"Interview Link"}
                                      </_Builtin.Block>
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "text-sm",
                                          "color-grey-600"
                                        )}
                                        tag="div"
                                      >
                                        {
                                          "The interview link will be automatically generated by aglint. no action required"
                                        }
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "toggle-dropdown"
                                      )}
                                      tag="div"
                                    >
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "toggle-dropdown-toggle",
                                          "company"
                                        )}
                                        tag="div"
                                      >
                                        <_Builtin.Block tag="div">
                                          <_Builtin.Block
                                            className={_utils.cx(
                                              _styles,
                                              "fw-semibold",
                                              "color-black"
                                            )}
                                            tag="div"
                                          >
                                            {
                                              "Automatically send inerview emails"
                                            }
                                          </_Builtin.Block>
                                          <_Builtin.Block
                                            className={_utils.cx(
                                              _styles,
                                              "text-grey-600",
                                              "mt-5"
                                            )}
                                            tag="div"
                                          >
                                            {
                                              "Automate the process of sending emails for taking interview to the candidates those who have marked interviewing."
                                            }
                                          </_Builtin.Block>
                                        </_Builtin.Block>
                                        <_Builtin.Block
                                          className={_utils.cx(
                                            _styles,
                                            "toggle-btn-block"
                                          )}
                                          tag="div"
                                        >
                                          <_Builtin.NotSupported _atom="Animation" />
                                        </_Builtin.Block>
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                  </_Builtin.Block>
                                </_Builtin.Block>
                                <_Builtin.Block
                                  className={_utils.cx(
                                    _styles,
                                    "sidebar-wrapper",
                                    "rd-company",
                                    "max-width-300"
                                  )}
                                  tag="div"
                                >
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "sidebar-block"
                                    )}
                                    tag="div"
                                  >
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "rd-email-edit-block"
                                      )}
                                      tag="div"
                                    >
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "text-sm",
                                          "fw-semibold",
                                          "color-black"
                                        )}
                                        tag="div"
                                      >
                                        {"Preview"}
                                      </_Builtin.Block>
                                      <_Builtin.Image
                                        width="auto"
                                        height="auto"
                                        alt="__wf_reserved_inherit"
                                        loading="eager"
                                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089022b_Rectangle%20349.png"
                                      />
                                    </_Builtin.Block>
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "rd-email-edit-block"
                                      )}
                                      tag="div"
                                    >
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "text-sm",
                                          "fw-semibold",
                                          "color-black"
                                        )}
                                        tag="div"
                                      >
                                        {"Switch template"}
                                      </_Builtin.Block>
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "div-block-310"
                                        )}
                                        tag="div"
                                      >
                                        <_Builtin.Image
                                          width="auto"
                                          height="auto"
                                          alt="__wf_reserved_inherit"
                                          loading="lazy"
                                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890212_36413fdbae77050b8f006cb7b0099e1c.png"
                                        />
                                        <_Builtin.Image
                                          width="auto"
                                          height="auto"
                                          alt="__wf_reserved_inherit"
                                          loading="lazy"
                                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089021a_8d2be2254997c1696ce7b0e9f2ccdbbd.png"
                                        />
                                        <_Builtin.Image
                                          width="auto"
                                          height="auto"
                                          alt="__wf_reserved_inherit"
                                          loading="lazy"
                                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890213_abc7bfd9cfc0e34b54dcccc1b45fada9.png"
                                        />
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block
                                      className={_utils.cx(
                                        _styles,
                                        "rd-email-edit-block"
                                      )}
                                      tag="div"
                                    >
                                      <_Builtin.Block
                                        className={_utils.cx(
                                          _styles,
                                          "email-note-block"
                                        )}
                                        tag="div"
                                      >
                                        <_Builtin.Block
                                          className={_utils.cx(
                                            _styles,
                                            "text-sm",
                                            "fw-semibold",
                                            "text-yellow-800"
                                          )}
                                          tag="div"
                                        >
                                          {"Note"}
                                        </_Builtin.Block>
                                        <_Builtin.Block
                                          className={_utils.cx(
                                            _styles,
                                            "text-sm",
                                            "color-grey-600"
                                          )}
                                          tag="div"
                                        >
                                          {
                                            "The company details, including the name, logo, and social media links..etc mentioned in the template, are sourced from the company settings. To make adjustments to this information, you can edit the company settings accordingly."
                                          }
                                        </_Builtin.Block>
                                        <_Builtin.Block
                                          className={_utils.cx(
                                            _styles,
                                            "aui-button-wrap"
                                          )}
                                          tag="div"
                                          tabIndex=""
                                        >
                                          <_Builtin.Block
                                            className={_utils.cx(
                                              _styles,
                                              "aui-button",
                                              "is-small"
                                            )}
                                            tag="div"
                                            tabIndex=""
                                          >
                                            <_Builtin.Block
                                              className={_utils.cx(
                                                _styles,
                                                "text-blue-500"
                                              )}
                                              tag="div"
                                            >
                                              {"Got it"}
                                            </_Builtin.Block>
                                          </_Builtin.Block>
                                        </_Builtin.Block>
                                      </_Builtin.Block>
                                    </_Builtin.Block>
                                  </_Builtin.Block>
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-293")}
                          tag="div"
                        >
                          <_Builtin.Image
                            width="auto"
                            height="auto"
                            alt="__wf_reserved_inherit"
                            loading="lazy"
                            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890213_abc7bfd9cfc0e34b54dcccc1b45fada9.png"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.TabsPane>
            </_Builtin.TabsContent>
          </_Builtin.TabsWrapper>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
