import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobDetailsStatus.module.css";

export function JobDetailsStatus({
  as: _Component = _Builtin.Block,
  onClickEditJobs = {},
  isSourcingScheduled = false,
  isSourcingActive = false,
  sourcingInfoText = "sourcing status",
  isInterviewingScheduled = false,
  isInterviewingActive = false,
  interviewStatusText = "interview status",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "jdet-edit-controls-block")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "jdet-status")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "text-kale-600")}
          tag="div"
        >
          {"Sourcing"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jdet-status-info-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-status-info-icon")}
            tag="div"
          >
            {isSourcingScheduled ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM8%207H5.5C5.22%207%205%206.78%205%206.5V3C5%202.72%205.22%202.5%205.5%202.5C5.78%202.5%206%202.72%206%203V6H8C8.28%206%208.5%206.22%208.5%206.5C8.5%206.78%208.28%207%208%207Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isSourcingActive ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%204.64645C10.3417%204.45118%2010.6583%204.45118%2010.8536%204.64645C11.0488%204.84171%2011.0488%205.15829%2010.8536%205.35355L4.35355%2011.8536C4.15829%2012.0488%203.84171%2012.0488%203.64645%2011.8536L1.14645%209.35355C0.951184%209.15829%200.951184%208.84171%201.14645%208.64645C1.34171%208.45118%201.65829%208.45118%201.85355%208.64645L4%2010.7929L10.1464%204.64645ZM8.35355%2011.8536C8.15829%2012.0488%207.84171%2012.0488%207.64645%2011.8536C7.45118%2011.6583%207.45118%2011.3417%207.64645%2011.1464L14.1464%204.64645C14.3417%204.45118%2014.6583%204.45118%2014.8536%204.64645C15.0488%204.84171%2015.0488%205.15829%2014.8536%205.35355L8.35355%2011.8536Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-kale-800")}
            tag="div"
          >
            {sourcingInfoText}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "jdet-status")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "text-kale-600")}
          tag="div"
        >
          {"Interviewing"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jdet-status-info-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-status-info-icon")}
            tag="div"
          >
            {isInterviewingScheduled ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM8%207H5.5C5.22%207%205%206.78%205%206.5V3C5%202.72%205.22%202.5%205.5%202.5C5.78%202.5%206%202.72%206%203V6H8C8.28%206%208.5%206.22%208.5%206.5C8.5%206.78%208.28%207%208%207Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isInterviewingActive ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%204.64645C10.3417%204.45118%2010.6583%204.45118%2010.8536%204.64645C11.0488%204.84171%2011.0488%205.15829%2010.8536%205.35355L4.35355%2011.8536C4.15829%2012.0488%203.84171%2012.0488%203.64645%2011.8536L1.14645%209.35355C0.951184%209.15829%200.951184%208.84171%201.14645%208.64645C1.34171%208.45118%201.65829%208.45118%201.85355%208.64645L4%2010.7929L10.1464%204.64645ZM8.35355%2011.8536C8.15829%2012.0488%207.84171%2012.0488%207.64645%2011.8536C7.45118%2011.6583%207.45118%2011.3417%207.64645%2011.1464L14.1464%204.64645C14.3417%204.45118%2014.6583%204.45118%2014.8536%204.64645C15.0488%204.84171%2015.0488%205.15829%2014.8536%205.35355L8.35355%2011.8536Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-kale-800")}
            tag="div"
          >
            {interviewStatusText}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "select-action-btn")}
        tag="div"
        {...onClickEditJobs}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20width%3D%2211%22%20height%3D%2212%22%20viewBox%3D%220%200%209%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.56485%201.38828C7.45547%201.28984%207.32969%201.24062%207.1875%201.24062C7.04532%201.24062%206.91953%201.28984%206.81016%201.38828L6.3836%201.83125L7.31875%202.76641L7.76172%202.33984C7.86016%202.23047%207.90938%202.10469%207.90938%201.9625C7.90938%201.82031%207.86016%201.69453%207.76172%201.58516L7.56485%201.38828ZM3.20078%205.01406C3.13516%205.07969%203.09141%205.16172%203.06953%205.26016L2.80703%206.34297L3.88985%206.09687C3.98828%206.06406%204.07032%206.01484%204.13594%205.94922L6.94141%203.14375L6.00625%202.20859L3.20078%205.01406ZM6.44922%201.02734C6.66797%200.819531%206.91407%200.715625%207.1875%200.715625C7.47188%200.715625%207.71797%200.819531%207.92578%201.02734L8.12266%201.22422C8.33047%201.44297%208.43438%201.68906%208.43438%201.9625C8.43438%202.24687%208.33047%202.49297%208.12266%202.70078L4.51328%206.32656C4.3711%206.46875%204.20157%206.56172%204.00469%206.60547L2.52813%206.95C2.42969%206.96094%202.34766%206.93359%202.28203%206.86797C2.21641%206.80234%202.18907%206.72578%202.2%206.63828L2.54453%205.14531C2.58828%204.94844%202.68125%204.77891%202.82344%204.63672L6.44922%201.02734ZM1.4125%201.7H3.5125C3.67657%201.71094%203.76407%201.79844%203.775%201.9625C3.76407%202.12656%203.67657%202.21406%203.5125%202.225H1.4125C1.19375%202.23594%201.00782%202.3125%200.85469%202.45469C0.712503%202.60781%200.63594%202.79375%200.625003%203.0125V7.7375C0.63594%207.95625%200.712503%208.14219%200.85469%208.29531C1.00782%208.4375%201.19375%208.51406%201.4125%208.525H6.1375C6.35625%208.51406%206.54219%208.4375%206.69532%208.29531C6.8375%208.14219%206.91407%207.95625%206.925%207.7375V5.6375C6.93594%205.47344%207.02344%205.38594%207.1875%205.375C7.35157%205.38594%207.43907%205.47344%207.45%205.6375V7.7375C7.43907%208.10938%207.31328%208.42109%207.07266%208.67266C6.8211%208.91328%206.50938%209.03906%206.1375%209.05H1.4125C1.04063%209.03906%200.728909%208.91328%200.477347%208.67266C0.236722%208.42109%200.11094%208.10938%200.100003%207.7375V3.0125C0.11094%202.64062%200.236722%202.32891%200.477347%202.07734C0.728909%201.83672%201.04063%201.71094%201.4125%201.7Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-500")}
          tag="div"
        >
          {"Edit Job Details"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "select-action-btn", "blue-500", "hide")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.83205%200.4453C6.43623%20-0.148433%205.56377%20-0.148433%205.16795%200.4453L3.16795%203.4453C2.72491%204.10985%203.2013%205%204%205H8C8.7987%205%209.27509%204.10985%208.83205%203.4453L6.83205%200.4453ZM4%204L6%201L8%204H4ZM1%207C0.447715%207%200%207.44772%200%208V11C0%2011.5523%200.447715%2012%201%2012H4C4.55228%2012%205%2011.5523%205%2011V8C5%207.44772%204.55228%207%204%207H1ZM1%2011V8H4V11H1ZM9.25%2012C10.7688%2012%2012%2010.7688%2012%209.25C12%207.73122%2010.7688%206.5%209.25%206.5C7.73122%206.5%206.5%207.73122%206.5%209.25C6.5%2010.7688%207.73122%2012%209.25%2012ZM9.25%2011C8.2835%2011%207.5%2010.2165%207.5%209.25C7.5%208.2835%208.2835%207.5%209.25%207.5C10.2165%207.5%2011%208.2835%2011%209.25C11%2010.2165%2010.2165%2011%209.25%2011Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-color-white")}
          tag="div"
        >
          {"Workflow"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
