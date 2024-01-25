import React from "react";
import * as _Builtin from "./_Builtin";
import { JobStatus } from "./JobStatus";
import { SelectActionBar } from "./SelectActionBar";
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
  onClickEditJob = {},
  onClickWorkflow = {},
  slotSelectActionBar,
  bottomBarVisibility = true,

  jobLink = {
    href: "#",
  },

  linkActiveJobs = {
    href: "#",
  },

  slotJobStatus,
  isTopbarVisible = true,
  interviewScore = true,
  selectAllCheckbox = {},
  isSelectAllChecked = false,
  onClickAddCandidates = {},
  isPreviewVisible = true,
  slotAtsBadge,
}) {
  return (
    <_Component className={_utils.cx(_styles, "rd-main-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "job-details-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "job-details-header-block")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "jdet-main")} tag="div">
            <_Builtin.Link
              className={_utils.cx(_styles, "link-block", "bold-text-mobile")}
              button={false}
              block="inline"
              options={linkActiveJobs}
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "inline-block",
                  "ml-0-mobile",
                  "text-lg"
                )}
                tag="div"
              >
                {textJobStatus}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inline-block", "text-lg")}
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
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.60958%203.31233C5.43708%203.0967%205.47204%202.78205%205.68767%202.60955C5.87934%202.45621%206.14925%202.46679%206.32802%202.62249L6.39045%202.68763L10.3905%207.68763C10.5157%207.84416%2010.5336%208.05715%2010.4441%208.22981L10.3905%208.31233L6.39045%2013.3123C6.21795%2013.528%205.9033%2013.5629%205.68767%2013.3904C5.496%2013.2371%205.44708%2012.9714%205.55973%2012.7628L5.60958%2012.6876L9.35902%207.99998L5.60958%203.31233Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-header-title-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "text-lg")}
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
              {isPreviewVisible ? (
                <_Builtin.Link button={false} block="inline" options={jobLink}>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-blue-500")}
                    tag="div"
                  >
                    {"View Job"}
                  </_Builtin.Block>
                </_Builtin.Link>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotAtsBadge}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-edit-controls-wrapper")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "jdet-edit-controls-block")}
                tag="div"
              >
                {slotStopSubmission ?? (
                  <>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "select-action-btn")}
                      tag="div"
                      {...onClickEditJob}
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "svg-icon")}
                        value="%3Csvg%20width%3D%2211%22%20height%3D%2212%22%20viewbox%3D%220%200%209%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.56485%201.38828C7.45547%201.28984%207.32969%201.24062%207.1875%201.24062C7.04532%201.24062%206.91953%201.28984%206.81016%201.38828L6.3836%201.83125L7.31875%202.76641L7.76172%202.33984C7.86016%202.23047%207.90938%202.10469%207.90938%201.9625C7.90938%201.82031%207.86016%201.69453%207.76172%201.58516L7.56485%201.38828ZM3.20078%205.01406C3.13516%205.07969%203.09141%205.16172%203.06953%205.26016L2.80703%206.34297L3.88985%206.09687C3.98828%206.06406%204.07032%206.01484%204.13594%205.94922L6.94141%203.14375L6.00625%202.20859L3.20078%205.01406ZM6.44922%201.02734C6.66797%200.819531%206.91407%200.715625%207.1875%200.715625C7.47188%200.715625%207.71797%200.819531%207.92578%201.02734L8.12266%201.22422C8.33047%201.44297%208.43438%201.68906%208.43438%201.9625C8.43438%202.24687%208.33047%202.49297%208.12266%202.70078L4.51328%206.32656C4.3711%206.46875%204.20157%206.56172%204.00469%206.60547L2.52813%206.95C2.42969%206.96094%202.34766%206.93359%202.28203%206.86797C2.21641%206.80234%202.18907%206.72578%202.2%206.63828L2.54453%205.14531C2.58828%204.94844%202.68125%204.77891%202.82344%204.63672L6.44922%201.02734ZM1.4125%201.7H3.5125C3.67657%201.71094%203.76407%201.79844%203.775%201.9625C3.76407%202.12656%203.67657%202.21406%203.5125%202.225H1.4125C1.19375%202.23594%201.00782%202.3125%200.85469%202.45469C0.712503%202.60781%200.63594%202.79375%200.625003%203.0125V7.7375C0.63594%207.95625%200.712503%208.14219%200.85469%208.29531C1.00782%208.4375%201.19375%208.51406%201.4125%208.525H6.1375C6.35625%208.51406%206.54219%208.4375%206.69532%208.29531C6.8375%208.14219%206.91407%207.95625%206.925%207.7375V5.6375C6.93594%205.47344%207.02344%205.38594%207.1875%205.375C7.35157%205.38594%207.43907%205.47344%207.45%205.6375V7.7375C7.43907%208.10938%207.31328%208.42109%207.07266%208.67266C6.8211%208.91328%206.50938%209.03906%206.1375%209.05H1.4125C1.04063%209.03906%200.728909%208.91328%200.477347%208.67266C0.236722%208.42109%200.11094%208.10938%200.100003%207.7375V3.0125C0.11094%202.64062%200.236722%202.32891%200.477347%202.07734C0.728909%201.83672%201.04063%201.71094%201.4125%201.7Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-blue-500")}
                        tag="div"
                      >
                        {"Edit Job Details"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "select-action-btn",
                        "blue-500",
                        "hide"
                      )}
                      tag="div"
                      {...onClickWorkflow}
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "svg-icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.83205%200.4453C6.43623%20-0.148433%205.56377%20-0.148433%205.16795%200.4453L3.16795%203.4453C2.72491%204.10985%203.2013%205%204%205H8C8.7987%205%209.27509%204.10985%208.83205%203.4453L6.83205%200.4453ZM4%204L6%201L8%204H4ZM1%207C0.447715%207%200%207.44772%200%208V11C0%2011.5523%200.447715%2012%201%2012H4C4.55228%2012%205%2011.5523%205%2011V8C5%207.44772%204.55228%207%204%207H1ZM1%2011V8H4V11H1ZM9.25%2012C10.7688%2012%2012%2010.7688%2012%209.25C12%207.73122%2010.7688%206.5%209.25%206.5C7.73122%206.5%206.5%207.73122%206.5%209.25C6.5%2010.7688%207.73122%2012%209.25%2012ZM9.25%2011C8.2835%2011%207.5%2010.2165%207.5%209.25C7.5%208.2835%208.2835%207.5%209.25%207.5C10.2165%207.5%2011%208.2835%2011%209.25C11%2010.2165%2010.2165%2011%209.25%2011Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-color-white")}
                        tag="div"
                      >
                        {"Workflow"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </>
                )}
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
                      {"New"}
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
                      {"Assessment"}
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
                      {"Qualified"}
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
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M9.33366%209.50166V14.667H2.66699C2.66699%2011.7215%205.05481%209.33366%208.00033%209.33366C8.46073%209.33366%208.90753%209.39199%209.33366%209.50166ZM8.00033%208.66699C5.79033%208.66699%204.00033%206.87699%204.00033%204.66699C4.00033%202.45699%205.79033%200.666992%208.00033%200.666992C10.2103%200.666992%2012.0003%202.45699%2012.0003%204.66699C12.0003%206.87699%2010.2103%208.66699%208.00033%208.66699ZM12.667%2011.0575L14.0812%209.64333L15.024%2010.5861L13.6098%2012.0003L15.024%2013.4145L14.0812%2014.3573L12.667%2012.9431L11.2528%2014.3573L10.31%2013.4145L11.7242%2012.0003L10.31%2010.5861L11.2528%209.64333L12.667%2011.0575Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
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
                      {"Disqualified"}
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
              {slotJobStatus ?? <JobStatus isScheduled={true} />}
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
                <_Builtin.Block
                  className={_utils.cx(_styles, "add-candidates-dropdown")}
                  tag="div"
                  {...onClickAddCandidates}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "ac-dropdown-trigger")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "svg-icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.99815%2011.5433C1.97423%2011.8184%201.73182%2012.022%201.45672%2011.9981C1.18161%2011.9742%200.977987%2011.7318%201.00191%2011.4567C1.22227%208.92255%203.41465%207%206.00003%207C8.58541%207%2010.7778%208.92255%2010.9981%2011.4567C11.0221%2011.7318%2010.8184%2011.9742%2010.5433%2011.9981C10.2682%2012.022%2010.0258%2011.8184%2010.0019%2011.5433C9.82734%209.53574%208.07605%208%206.00003%208C3.92401%208%202.17272%209.53574%201.99815%2011.5433ZM6.00003%206C4.34318%206%203.00003%204.65685%203.00003%203C3.00003%201.34315%204.34318%200%206.00003%200C7.65688%200%209.00003%201.34315%209.00003%203C9.00003%204.65685%207.65688%206%206.00003%206ZM6.00003%205C7.1046%205%208.00003%204.10457%208.00003%203C8.00003%201.89543%207.1046%201%206.00003%201C4.89546%201%204.00003%201.89543%204.00003%203C4.00003%204.10457%204.89546%205%206.00003%205Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-blue-600")}
                      tag="div"
                    >
                      {"Add Candidates"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block tag="div">{slotSearch}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-370")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-342")}
                tag="div"
              >
                {isTopbarVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "candidate-list-item",
                      "top-bar"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cli-column", "grey-100")}
                      tag="div"
                      {...selectAllCheckbox}
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cli-checkbox", "top")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "checkbox-wrappers-job"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "checkbox-border-block"
                            )}
                            tag="div"
                          />
                          {isSelectAllChecked ? (
                            <_Builtin.Image
                              className={_utils.cx(_styles, "cli-check-image")}
                              loading="lazy"
                              width="auto"
                              height="auto"
                              alt=""
                              src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
                            />
                          ) : null}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "list-main-info",
                        "top-bar"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cli-column",
                          "candidate-info",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "list-top-bar-description-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "svg-icon")}
                              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.99662%2010.4416C8.02889%2010.7158%207.83272%2010.9643%207.55847%2010.9966C7.28422%2011.0288%207.03574%2010.8327%207.00347%2010.5584C6.83287%209.10827%205.54418%208%204.00005%208C2.45592%208%201.16723%209.10827%200.996623%2010.5584C0.964359%2010.8327%200.715878%2011.0288%200.441627%2010.9966C0.167377%2010.9643%20-0.028792%2010.7158%200.0034728%2010.4416C0.234176%208.4806%201.95581%207%204.00005%207C6.04429%207%207.76592%208.4806%207.99662%2010.4416ZM8.00005%204C7.72391%204%207.50005%203.77614%207.50005%203.5C7.50005%203.22386%207.72391%203%208.00005%203H11.5C11.7762%203%2012%203.22386%2012%203.5C12%203.77614%2011.7762%204%2011.5%204H8.00005ZM8.50005%207C8.22391%207%208.00005%206.77614%208.00005%206.5C8.00005%206.22386%208.22391%206%208.50005%206H11.5C11.7762%206%2012%206.22386%2012%206.5C12%206.77614%2011.7762%207%2011.5%207H8.50005ZM10%2010C9.72391%2010%209.50005%209.77614%209.50005%209.5C9.50005%209.22386%209.72391%209%2010%209H11.5C11.7762%209%2012%209.22386%2012%209.5C12%209.77614%2011.7762%2010%2011.5%2010H10ZM4.00005%206C2.61934%206%201.50005%204.88071%201.50005%203.5C1.50005%202.11929%202.61934%201%204.00005%201C5.38076%201%206.50005%202.11929%206.50005%203.5C6.50005%204.88071%205.38076%206%204.00005%206ZM4.00005%205C4.82848%205%205.50005%204.32843%205.50005%203.5C5.50005%202.67157%204.82848%202%204.00005%202C3.17162%202%202.50005%202.67157%202.50005%203.5C2.50005%204.32843%203.17162%205%204.00005%205Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-gray-600")}
                            tag="div"
                          >
                            {"Candidate Info"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cli-column",
                          "score",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "list-top-bar-description-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "svg-icon")}
                              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%201.001H2V11.001H10V4.001H8C7.44386%204.001%207%203.55714%207%203.001V1.001ZM11%203.52899V11.001C11%2011.5571%2010.5561%2012.001%2010%2012.001H2C1.44386%2012.001%201%2011.5571%201%2011.001V1.001C1%200.44486%201.44386%200.00100238%202%200.00100238H7.47202C7.49295%20-0.000325182%207.51402%20-0.000343044%207.53509%200.00100238H7.79C8.0626%200.00100238%208.32673%200.111057%208.49355%200.297449L10.6845%202.48936C10.8913%202.6755%2011%202.93092%2011%203.211V3.46591C11.0013%203.48698%2011.0013%203.50805%2011%203.52899ZM8%203.001H9.29289L8%201.70811V3.001ZM3.5%205.001H8.5C9.16667%205.001%209.16667%206.001%208.5%206.001H3.5C2.83333%206.001%202.83333%205.001%203.5%205.001ZM3.5%207.001H8.5C9.16667%207.001%209.16667%208.001%208.5%208.001H3.5C2.83333%208.001%202.83333%207.001%203.5%207.001ZM3.5%209.001H8.5C9.16667%209.001%209.16667%2010.001%208.5%2010.001H3.5C2.83333%2010.001%202.83333%209.001%203.5%209.001Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-gray-600")}
                            tag="div"
                          >
                            {"Resume Score"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cli-column",
                          "score",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        {interviewScore ? (
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "list-top-bar-description-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(_styles, "svg-icon")}
                                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.86804%203.99886H6.82864L7.85805%202.19989C7.89802%202.08995%207.84805%202%207.74811%202H5.71927C5.61933%202%205.4894%202.08995%205.43943%202.19989L4.47998%204.77841C4.43001%204.88835%204.47998%204.99828%204.58992%204.99828H5.4994L4.47998%207.56681C4.40003%207.7667%204.45999%207.9366%204.70985%207.71673L7.87803%204.2687C8.04794%204.10879%208.03794%203.99886%207.86804%203.99886ZM5.79289%208.14042H11V1.01755H1V8.14042H3V8.6492L2.99995%2010.9824L5.79289%208.14042ZM2%209.15797H1C0.443858%209.15797%200%208.70632%200%208.14042V1.01755C0%200.451648%200.443858%200%201%200H11C11.5561%200%2012%200.451648%2012%201.01755V8.14042C12%208.70632%2011.5561%209.15797%2011%209.15797H6.2071L3.70005%2011.709C3.41435%2011.994%202.98918%2012.0783%202.6192%2011.9233C2.24922%2011.7683%202.00567%2011.4038%202%2010.9896V9.15797Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "text-gray-600")}
                              tag="div"
                            >
                              {"Assessment Score"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        ) : null}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cli-column",
                          "status",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "list-top-bar-description-block",
                            "status-right"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "svg-icon")}
                              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.82706%203.2458C1.67474%203.47613%201.36454%203.53938%201.1342%203.38706C0.90387%203.23474%200.840625%202.92454%200.992943%202.6942C1.44005%202.01809%202.01809%201.44005%202.6942%200.992943C2.92454%200.840625%203.23474%200.90387%203.38706%201.1342C3.53938%201.36454%203.47613%201.67474%203.2458%201.82706C2.68191%202.19995%202.19995%202.68191%201.82706%203.2458ZM1.10081%207.01457C1.15351%207.28563%200.9765%207.5481%200.705435%207.60081C0.434369%207.65352%200.171899%207.4765%200.119192%207.20543C0.0406179%206.80134%200%206.40057%200%206C0%205.6015%200.040072%205.21147%200.119192%204.80457C0.171899%204.5335%200.434369%204.35649%200.705435%204.40919C0.9765%204.4619%201.15351%204.72437%201.10081%204.99543C1.03354%205.34139%201%205.66783%201%206C1%206.33476%201.03416%206.67181%201.10081%207.01457ZM3.23892%2010.175C3.4681%2010.3291%203.52902%2010.6397%203.37498%2010.8689C3.22093%2011.0981%202.91027%2011.159%202.68108%2011.005C2.01735%2010.5589%201.44114%209.98265%200.995024%209.31892C0.840982%209.08973%200.901897%208.77907%201.13108%208.62502C1.36027%208.47098%201.67093%208.5319%201.82498%208.76108C2.19886%209.31735%202.68265%209.80114%203.23892%2010.175ZM7.01456%2010.8992C7.28563%2010.8465%207.5481%2011.0235%207.60081%2011.2946C7.65351%2011.5656%207.4765%2011.8281%207.20543%2011.8808C6.80134%2011.9594%206.40057%2012%205.99873%2012C5.59696%2011.999%205.19625%2011.9589%204.80224%2011.8803C4.53142%2011.8264%204.35566%2011.563%204.40965%2011.2922C4.46364%2011.0214%204.72695%2010.8457%204.99776%2010.8997C5.32822%2010.9655%205.66431%2010.9991%206%2011C6.33476%2011%206.67181%2010.9658%207.01456%2010.8992ZM10.1729%208.7542C10.3253%208.52387%2010.6355%208.46063%2010.8658%208.61294C11.0961%208.76526%2011.1594%209.07546%2011.0071%209.3058C10.56%209.98191%209.98191%2010.56%209.3058%2011.0071C9.07546%2011.1594%208.76526%2011.0961%208.61294%2010.8658C8.46063%2010.6355%208.52387%2010.3253%208.7542%2010.1729C9.31809%209.80005%209.80005%209.31809%2010.1729%208.7542ZM10.8992%204.99543C10.8465%204.72437%2011.0235%204.4619%2011.2946%204.40919C11.5656%204.35649%2011.8281%204.5335%2011.8808%204.80457C11.9599%205.21147%2012%205.6015%2012%206C12%206.3985%2011.9599%206.78853%2011.8808%207.19544C11.8281%207.4665%2011.5656%207.64352%2011.2946%207.59081C11.0235%207.5381%2010.8465%207.27563%2010.8992%207.00457C10.9665%206.65861%2011%206.33217%2011%206C11%205.66783%2010.9665%205.34139%2010.8992%204.99543ZM8.7542%201.82706C8.52387%201.67474%208.46063%201.36454%208.61294%201.1342C8.76526%200.90387%209.07546%200.840625%209.3058%200.992943C9.98191%201.44005%2010.56%202.01809%2011.0071%202.6942C11.1594%202.92454%2011.0961%203.23474%2010.8658%203.38706C10.6355%203.53938%2010.3253%203.47613%2010.1729%203.2458C9.80005%202.68191%209.31809%202.19995%208.7542%201.82706ZM4.99543%201.10081C4.72437%201.15351%204.4619%200.9765%204.40919%200.705435C4.35649%200.434369%204.5335%200.171899%204.80457%200.119192C5.21147%200.040072%205.6015%200%206%200C6.3985%200%206.78853%200.040072%207.19544%200.119192C7.4665%200.171899%207.64352%200.434369%207.59081%200.705435C7.5381%200.9765%207.27563%201.15351%207.00457%201.10081C6.65861%201.03354%206.33217%201%206%201C5.66783%201%205.34139%201.03354%204.99543%201.10081Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-gray-600")}
                            tag="div"
                          >
                            {"Status"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdd-content-main")}
                  tag="div"
                >
                  {slotCandidateJobCard}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {bottomBarVisibility ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "job-page-nav-bar")}
          tag="div"
        >
          {slotSelectActionBar ?? <SelectActionBar />}
        </_Builtin.Block>
      ) : null}
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3C!--%20%3Cstyle%3E%0A%5Bclass*%3D%22JobScreening_div-block-342__%22%5D%7B%0Aoverflow-x%3A%20auto%3B%0A%20%20%20%20%20%20%0A%7D%0A%0A%3C%2Fstyle%3E%20--%3E"
      />
    </_Component>
  );
}
