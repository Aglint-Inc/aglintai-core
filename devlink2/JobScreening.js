import React from "react";
import * as _Builtin from "./_Builtin";
import { JobStatus } from "./JobStatus";
import { ApplicantsListEmpty } from "./ApplicantsListEmpty";
import * as _utils from "./utils";
import _styles from "./JobScreening.module.css";

export function JobScreening({
  as: _Component = _Builtin.Block,
  textRole = "Software Developer",
  slotStopSubmission,
  onClickAllApplicant = {},
  onClickInterviewing = {},
  countInterviewing = "45",
  onClickRejected = {},
  countRejected = "451",
  onClickSelected = {},
  countSelected = "0",
  slotSearch,
  slotCandidateJobCard,
  textApplicantsNumber = "(1200 Total Applicants)",
  textJobStatus = "Active",
  slotAddCandidates,
  countAll = "804",
  isAll = true,
  isInterviewing = false,
  isSelected = false,
  isRejected = false,
}) {
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
                className={_utils.cx(_styles, "inline-block")}
                tag="div"
              >
                {textJobStatus}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inline-block")}
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
              className={_utils.cx(_styles, "div-block-329")}
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
                dyn={{
                  bind: {},
                }}
                tag="div"
              >
                {textApplicantsNumber}
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.32843%205.17645L4.001%205.849L3.3%206.564L2.97487%206.23834L1.57843%207.63355C0.807191%208.40479%200.807191%209.65521%201.57843%2010.4264L1.68648%2010.5268C2.46235%2011.1961%203.63514%2011.1626%204.37132%2010.4264L5.76724%209.03071L5.422%208.685L6.122%207.97L6.82843%208.67645C7.02369%208.87171%207.02369%209.18829%206.82843%209.38355L5.07843%2011.1336C3.91667%2012.2953%202.03308%2012.2953%200.87132%2011.1336C-0.29044%209.97179%20-0.29044%208.08821%200.87132%206.92645L2.62132%205.17645C2.81658%204.98118%203.13316%204.98118%203.32843%205.17645ZM8.21984%203.08575C8.41606%202.95272%208.68528%202.97472%208.85709%203.15002C9.0289%203.32532%209.04548%203.59492%208.90853%203.78843L8.84998%203.85709L6.32486%206.33196L3.85709%208.84998L3.78843%208.90853C3.59492%209.04548%203.32532%209.0289%203.15002%208.85709C2.97472%208.68528%202.95272%208.41606%203.08575%208.21984L3.14291%208.15002L5.61778%205.62489L8.15002%203.14291L8.21984%203.08575ZM11.1336%200.87132C12.2953%202.03308%2012.2953%203.91667%2011.1336%205.07843L9.38355%206.82843C9.18829%207.02369%208.87171%207.02369%208.67645%206.82843L7.971%206.123L8.686%205.422L9.03%205.76653L10.4264%204.37132C11.1977%203.60008%2011.1977%202.34966%2010.4264%201.57843L10.3184%201.47804C9.54253%200.808784%208.36973%200.842247%207.63355%201.57843L6.23764%202.97417L6.564%203.301L5.849%204.001L5.17645%203.32843C4.98118%203.13316%204.98118%202.81658%205.17645%202.62132L6.92645%200.87132C8.08821%20-0.29044%209.97179%20-0.29044%2011.1336%200.87132Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "submission-controls")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-334")}
                tag="div"
              >
                {slotStopSubmission}
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
          className={_utils.cx(_styles, "cdd-job-list-tab")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-333")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "rd-job-list-tab-menu")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cdd-tab-link", "all")}
                tag="div"
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
                      "grey-600"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.9999%209C9.34304%209%207.99989%207.65685%207.99989%206C7.99989%204.34315%209.34304%203%2010.9999%203C12.6567%203%2013.9999%204.34315%2013.9999%206C13.9999%207.65685%2012.6567%209%2010.9999%209ZM10.9999%208C12.1045%208%2012.9999%207.10457%2012.9999%206C12.9999%204.89543%2012.1045%204%2010.9999%204C9.89532%204%208.99989%204.89543%208.99989%206C8.99989%207.10457%209.89532%208%2010.9999%208ZM4.49989%206C3.11918%206%201.99989%204.88071%201.99989%203.5C1.99989%202.11929%203.11918%201%204.49989%201C5.8806%201%206.99989%202.11929%206.99989%203.5C6.99989%204.88071%205.8806%206%204.49989%206ZM4.49989%205C5.32832%205%205.99989%204.32843%205.99989%203.5C5.99989%202.67157%205.32832%202%204.49989%202C3.67146%202%202.99989%202.67157%202.99989%203.5C2.99989%204.32843%203.67146%205%204.49989%205ZM15.9978%2014.4547C16.0228%2014.7297%2015.8202%2014.9729%2015.5452%2014.9979C15.2702%2015.0229%2015.0269%2014.8203%2015.0019%2014.5453C14.8248%2012.597%2013.0351%2011%2010.9999%2011C8.96465%2011%207.17496%2012.597%206.99784%2014.5453C6.97284%2014.8203%206.72963%2015.0229%206.45462%2014.9979C6.17962%2014.9729%205.97694%2014.7297%206.00195%2014.4547C6.22635%2011.9863%208.45237%2010%2010.9999%2010C13.5474%2010%2015.7734%2011.9863%2015.9978%2014.4547ZM7.97423%209.34189C8.06156%209.60386%207.91998%209.88702%207.65801%209.97434C7.39603%2010.0617%207.11287%209.92009%207.02555%209.65811C6.70672%208.70162%205.62923%208%204.49989%208C3.37055%208%202.29307%208.70162%201.97423%209.65811C1.88691%209.92009%201.60375%2010.0617%201.34178%209.97434C1.07981%209.88702%200.938226%209.60386%201.02555%209.34189C1.48692%207.95779%202.9578%207%204.49989%207C6.04198%207%207.51287%207.95779%207.97423%209.34189Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "inline-block"
                      )}
                      tag="div"
                    >
                      {countAll}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "inline-block"
                      )}
                      tag="div"
                    >
                      {"Applied"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                {isAll ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdd-tab-link-bg",
                      "grey-700"
                    )}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdd-tab-link", "interviewing")}
                tag="div"
                {...onClickInterviewing}
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
                      "blue-600"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.03%206H8.52L10.48%202.28C10.54%202.13%2010.47%202%2010.31%202H7.39C7.23%202%207.05%202.13%206.99%202.28L5.53%205.68C5.46%205.84%205.53%206%205.69%206H7L5.58%2010.07C5.47%2010.36%205.55%2010.61%205.92%2010.28L10.05%206.39C10.28%206.16%2010.27%206%2010.03%206ZM3.99995%2014.7929L7.79289%2011H15V1H1V11H4V11.5L3.99995%2014.7929ZM3%2012H1C0.443858%2012%200%2011.5561%200%2011V1C0%200.443858%200.443858%200%201%200H15C15.5561%200%2016%200.443858%2016%201V11C16%2011.5561%2015.5561%2012%2015%2012H8.20711L4.70005%2015.507C4.41435%2015.7871%203.98918%2015.87%203.6192%2015.7177C3.24922%2015.5653%203.00567%2015.2071%203%2014.8V12Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "inline-block"
                      )}
                      tag="div"
                    >
                      {countInterviewing}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "inline-block"
                      )}
                      tag="div"
                    >
                      {"Interviewing"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                {isInterviewing ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdd-tab-link-bg",
                      "blue-700"
                    )}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdd-tab-link", "selected")}
                tag="div"
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
                      "green-600"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%204.64645C10.3417%204.45118%2010.6583%204.45118%2010.8536%204.64645C11.0488%204.84171%2011.0488%205.15829%2010.8536%205.35355L4.35355%2011.8536C4.15829%2012.0488%203.84171%2012.0488%203.64645%2011.8536L1.14645%209.35355C0.951184%209.15829%200.951184%208.84171%201.14645%208.64645C1.34171%208.45118%201.65829%208.45118%201.85355%208.64645L4%2010.7929L10.1464%204.64645ZM8.35355%2011.8536C8.15829%2012.0488%207.84171%2012.0488%207.64645%2011.8536C7.45118%2011.6583%207.45118%2011.3417%207.64645%2011.1464L14.1464%204.64645C14.3417%204.45118%2014.6583%204.45118%2014.8536%204.64645C15.0488%204.84171%2015.0488%205.15829%2014.8536%205.35355L8.35355%2011.8536Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "inline-block"
                      )}
                      tag="div"
                    >
                      {countSelected}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "inline-block"
                      )}
                      tag="div"
                    >
                      {"Selected"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                {isSelected ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdd-tab-link-bg",
                      "green-700"
                    )}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdd-tab-link", "rejected")}
                tag="div"
                {...onClickRejected}
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
                      "red-600"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M9.33366%209.50166V14.667H2.66699C2.66699%2011.7215%205.05481%209.33366%208.00033%209.33366C8.46073%209.33366%208.90753%209.39199%209.33366%209.50166ZM8.00033%208.66699C5.79033%208.66699%204.00033%206.87699%204.00033%204.66699C4.00033%202.45699%205.79033%200.666992%208.00033%200.666992C10.2103%200.666992%2012.0003%202.45699%2012.0003%204.66699C12.0003%206.87699%2010.2103%208.66699%208.00033%208.66699ZM12.667%2011.0575L14.0812%209.64333L15.024%2010.5861L13.6098%2012.0003L15.024%2013.4145L14.0812%2014.3573L12.667%2012.9431L11.2528%2014.3573L10.31%2013.4145L11.7242%2012.0003L10.31%2010.5861L11.2528%209.64333L12.667%2011.0575Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "inline-block"
                      )}
                      tag="div"
                    >
                      {countRejected}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "inline-block"
                      )}
                      tag="div"
                    >
                      {"Rejected"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                {isRejected ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdd-tab-link-bg", "red-700")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-job-status-wrapper")}
              tag="div"
            >
              <JobStatus isScheduled={true} />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-job-list-tab-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-tab-content-top")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-284")}
                tag="div"
              >
                <_Builtin.Block tag="div">{slotAddCandidates}</_Builtin.Block>
                <_Builtin.Block tag="div">{slotSearch}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-content-main")}
              tag="div"
            >
              {slotCandidateJobCard ?? <ApplicantsListEmpty />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
