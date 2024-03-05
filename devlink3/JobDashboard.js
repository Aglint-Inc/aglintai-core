import React from "react";
import * as _Builtin from "./_Builtin";
import { PipeLine } from "./PipeLine";
import { ModuleCard } from "./ModuleCard";
import * as _utils from "./utils";
import _styles from "./JobDashboard.module.css";

export function JobDashboard({
  as: _Component = _Builtin.Block,
  textTopMatchPercentage = "27%",
  textGoodMatchPercentage = "27%",
  textAverageMatchPercentage = "27%",
  textBelowAveragePercentage = "27%",
  textNotAMatchPercentage = "27%",
  textTopMatchCount = "11 Candidates",
  textGoodMatchCount = "11 Candidates",
  textAveageMatchCount = "11 Candidates",
  textBelowAverageCount = "11 Candidates",
  textNotAMatchCount = "11 Candidates",
  slotPipeline,
  slotSkillGraph,
  slotLocationGraph,
  slotModuleCard,
  onClickAssistant = {},
  textCandidateCount = "125",
}) {
  return (
    <_Component className={_utils.cx(_styles, "jobdashboard")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jobdadhboard_left")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_titleblock")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "job_candidate_count")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textCandidateCount}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {"Total Applicants"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_stats_block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "jd_stat")}
            id={_utils.cx(
              _styles,
              "w-node-_7e6f5c12-f288-2e98-8a50-7d5c06b69091-06b69083"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-purple")}
              tag="div"
            >
              {"Top Match"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textTopMatchPercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textTopMatchCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "jd_stat")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-green")}
              tag="div"
            >
              {"Good Match"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textGoodMatchPercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textGoodMatchCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "jd_stat")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-yellow")}
              tag="div"
            >
              {"Average Match"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textAverageMatchPercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textAveageMatchCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "jd_stat")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-orange")}
              tag="div"
            >
              {"Below average"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textBelowAveragePercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textBelowAverageCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "jd_stat")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-red")}
              tag="div"
            >
              {"Not a match"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textNotAMatchPercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textNotAMatchCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_pipeline_pillls")}
          tag="div"
        >
          {slotPipeline ?? (
            <>
              <PipeLine isLeft={true} isRight={false} />
              <PipeLine isLeft={false} />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "jd_graph")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "graph_wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Candidates With Skills"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_grpah")}
              tag="div"
            >
              {slotSkillGraph}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "graph_wrapper")}
            id={_utils.cx(
              _styles,
              "w-node-_7e6f5c12-f288-2e98-8a50-7d5c06b690cb-06b69083"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Candidates With Skills"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_grpah")}
              tag="div"
            >
              {slotLocationGraph}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "jobdadhboard_right")}
        id={_utils.cx(
          _styles,
          "w-node-_7e6f5c12-f288-2e98-8a50-7d5c06b690d3-06b69083"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_aglint_toggle")}
          tag="div"
          {...onClickAssistant}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%228%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M27.9063%2020.0062C25.2125%2019.3312%2023.8625%2019%2022.9313%2018.0687C22%2017.1312%2021.6688%2015.7875%2020.9938%2013.0938L20%209.125L19.0062%2013.0938C18.3312%2015.7875%2018%2017.1375%2017.0687%2018.0687C16.1312%2019%2014.7875%2019.3312%2012.0938%2020.0062L8.125%2021L12.0938%2021.9938C14.7875%2022.6688%2016.1375%2023%2017.0687%2023.9313C18%2024.8688%2018.3312%2026.2125%2019.0062%2028.9063L20%2032.875L20.9938%2028.9063C21.6688%2026.2125%2022%2024.8625%2022.9313%2023.9313C23.8688%2023%2025.2125%2022.6688%2027.9063%2021.9938L31.875%2021L27.9063%2020.0062Z%22%20fill%3D%22%233353E2%22%2F%3E%0A%3Cpath%20d%3D%22M27.9063%2020.0062C25.2125%2019.3312%2023.8625%2019%2022.9313%2018.0687C22%2017.1312%2021.6688%2015.7875%2020.9938%2013.0938L20%209.125L19.0062%2013.0938C18.3312%2015.7875%2018%2017.1375%2017.0687%2018.0687C16.1312%2019%2014.7875%2019.3312%2012.0938%2020.0062L8.125%2021L12.0938%2021.9938C14.7875%2022.6688%2016.1375%2023%2017.0687%2023.9313C18%2024.8688%2018.3312%2026.2125%2019.0062%2028.9063L20%2032.875L20.9938%2028.9063C21.6688%2026.2125%2022%2024.8625%2022.9313%2023.9313C23.8688%2023%2025.2125%2022.6688%2027.9063%2021.9938L31.875%2021L27.9063%2020.0062Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M29.6367%209.66615C28.7388%209.44115%2028.2888%209.33073%2027.9784%209.02031C27.668%208.70781%2027.5576%208.2599%2027.3326%207.36198L27.0013%206.03906L26.6701%207.36198C26.4451%208.2599%2026.3346%208.7099%2026.0242%209.02031C25.7117%209.33073%2025.2638%209.44115%2024.3659%209.66615L23.043%209.9974L24.3659%2010.3286C25.2638%2010.5536%2025.7138%2010.6641%2026.0242%2010.9745C26.3346%2011.287%2026.4451%2011.7349%2026.6701%2012.6328L27.0013%2013.9557L27.3326%2012.6328C27.5576%2011.7349%2027.668%2011.2849%2027.9784%2010.9745C28.2909%2010.6641%2028.7388%2010.5536%2029.6367%2010.3286L30.9596%209.9974L29.6367%209.66615Z%22%20fill%3D%22%233353E2%22%2F%3E%0A%3Cpath%20d%3D%22M29.6367%209.66615C28.7388%209.44115%2028.2888%209.33073%2027.9784%209.02031C27.668%208.70781%2027.5576%208.2599%2027.3326%207.36198L27.0013%206.03906L26.6701%207.36198C26.4451%208.2599%2026.3346%208.7099%2026.0242%209.02031C25.7117%209.33073%2025.2638%209.44115%2024.3659%209.66615L23.043%209.9974L24.3659%2010.3286C25.2638%2010.5536%2025.7138%2010.6641%2026.0242%2010.9745C26.3346%2011.287%2026.4451%2011.7349%2026.6701%2012.6328L27.0013%2013.9557L27.3326%2012.6328C27.5576%2011.7349%2027.668%2011.2849%2027.9784%2010.9745C28.2909%2010.6641%2028.7388%2010.5536%2029.6367%2010.3286L30.9596%209.9974L29.6367%209.66615Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_5874_116344)%22%3E%0A%3Cpath%20d%3D%22M33.5813%2014.8013C33.0425%2014.6663%2032.7725%2014.6%2032.5863%2014.4138C32.4%2014.2263%2032.3338%2013.9575%2032.1988%2013.4188L32%2012.625L31.8013%2013.4188C31.6663%2013.9575%2031.6%2014.2275%2031.4138%2014.4138C31.2263%2014.6%2030.9575%2014.6663%2030.4188%2014.8013L29.625%2015L30.4188%2015.1988C30.9575%2015.3338%2031.2275%2015.4%2031.4138%2015.5863C31.6%2015.7738%2031.6663%2016.0425%2031.8013%2016.5813L32%2017.375L32.1988%2016.5813C32.3338%2016.0425%2032.4%2015.7725%2032.5863%2015.5863C32.7738%2015.4%2033.0425%2015.3338%2033.5813%2015.1988L34.375%2015L33.5813%2014.8013Z%22%20fill%3D%22%233353E2%22%2F%3E%0A%3Cpath%20d%3D%22M33.5813%2014.8013C33.0425%2014.6663%2032.7725%2014.6%2032.5863%2014.4138C32.4%2014.2263%2032.3338%2013.9575%2032.1988%2013.4188L32%2012.625L31.8013%2013.4188C31.6663%2013.9575%2031.6%2014.2275%2031.4138%2014.4138C31.2263%2014.6%2030.9575%2014.6663%2030.4188%2014.8013L29.625%2015L30.4188%2015.1988C30.9575%2015.3338%2031.2275%2015.4%2031.4138%2015.5863C31.6%2015.7738%2031.6663%2016.0425%2031.8013%2016.5813L32%2017.375L32.1988%2016.5813C32.3338%2016.0425%2032.4%2015.7725%2032.5863%2015.5863C32.7738%2015.4%2033.0425%2015.3338%2033.5813%2015.1988L34.375%2015L33.5813%2014.8013Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_5874_116344%22%3E%0A%3Crect%20width%3D%226%22%20height%3D%226%22%20fill%3D%22white%22%20transform%3D%22translate(29%2012)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Ask to Assistant"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {
              "Utilize AI to efficiently handle all tasks related to this job, ensuring seamless execution of all tasks traditionally performed manually."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_modulecard")}
          tag="div"
        >
          {slotModuleCard ?? (
            <>
              <ModuleCard textDescription="Phone screening is not enabled for this job." />
              <ModuleCard textDescription="Phone screening is not enabled for this job." />
              <ModuleCard textDescription="Phone screening is not enabled for this job." />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
