"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JdAnalysis.module.css";

export function JdAnalysis({
  as: _Component = _Builtin.Block,
  bgColorProps = {},
  slotExperienceScore,
  slotSkillScore,
  slotEducationScore,
  textSkillDesc = "The candidate's prior work experiences align closely with the job requirements, showcasing leadership, community engagement, content creation, and strategic planning, which are essential for the Head of Developer Experience role.",
  textExperienceDesc = "The candidate's prior work experiences align closely with the job requirements, showcasing leadership, community engagement, content creation, and strategic planning, which are essential for the Head of Developer Experience role.",
  textEducationDesc = "The candidate's prior work experiences align closely with the job requirements, showcasing leadership, community engagement, content creation, and strategic planning, which are essential for the Head of Developer Experience role.",
  onClickIcons = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "jd-analysis-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-774")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-781")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-773")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2212%22%20viewBox%3D%220%200%2014%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.7188%202.08594L8.96875%205.08594C8.67188%205.30469%208.36719%205.3125%208.05469%205.10938L5.52344%203.21094L2.21875%205.83594C2.04688%205.96094%201.85938%206.01562%201.65625%206C1.46875%205.96875%201.30469%205.875%201.16406%205.71875C1.03906%205.54688%200.984375%205.35938%201%205.15625C1.03125%204.96875%201.125%204.80469%201.28125%204.66406L5.03125%201.66406C5.32812%201.44531%205.63281%201.4375%205.94531%201.64062L8.47656%203.5625L11.7812%200.914062C11.9531%200.789063%2012.1406%200.734375%2012.3438%200.75C12.5312%200.78125%2012.6953%200.875%2012.8359%201.03125C12.9609%201.20312%2013.0156%201.39062%2013%201.59375C12.9688%201.78125%2012.875%201.94531%2012.7188%202.08594ZM4.75%206C4.75%205.78125%204.82031%205.60156%204.96094%205.46094C5.10156%205.32031%205.28125%205.25%205.5%205.25C5.71875%205.25%205.89844%205.32031%206.03906%205.46094C6.17969%205.60156%206.25%205.78125%206.25%206V10.5C6.25%2010.7188%206.17969%2010.8984%206.03906%2011.0391C5.89844%2011.1797%205.71875%2011.25%205.5%2011.25C5.28125%2011.25%205.10156%2011.1797%204.96094%2011.0391C4.82031%2010.8984%204.75%2010.7188%204.75%2010.5V6ZM1.75%208.25C1.75%208.03125%201.82031%207.85156%201.96094%207.71094C2.10156%207.57031%202.28125%207.5%202.5%207.5C2.71875%207.5%202.89844%207.57031%203.03906%207.71094C3.17969%207.85156%203.25%208.03125%203.25%208.25V10.5C3.25%2010.7188%203.17969%2010.8984%203.03906%2011.0391C2.89844%2011.1797%202.71875%2011.25%202.5%2011.25C2.28125%2011.25%202.10156%2011.1797%201.96094%2011.0391C1.82031%2010.8984%201.75%2010.7188%201.75%2010.5V8.25ZM8.5%206.75C8.71875%206.75%208.89844%206.82031%209.03906%206.96094C9.17969%207.10156%209.25%207.28125%209.25%207.5V10.5C9.25%2010.7188%209.17969%2010.8984%209.03906%2011.0391C8.89844%2011.1797%208.71875%2011.25%208.5%2011.25C8.28125%2011.25%208.10156%2011.1797%207.96094%2011.0391C7.82031%2010.8984%207.75%2010.7188%207.75%2010.5V7.5C7.75%207.28125%207.82031%207.10156%207.96094%206.96094C8.10156%206.82031%208.28125%206.75%208.5%206.75ZM10.75%206C10.75%205.78125%2010.8203%205.60156%2010.9609%205.46094C11.1016%205.32031%2011.2812%205.25%2011.5%205.25C11.7188%205.25%2011.8984%205.32031%2012.0391%205.46094C12.1797%205.60156%2012.25%205.78125%2012.25%206V10.5C12.25%2010.7188%2012.1797%2010.8984%2012.0391%2011.0391C11.8984%2011.1797%2011.7188%2011.25%2011.5%2011.25C11.2812%2011.25%2011.1016%2011.1797%2010.9609%2011.0391C10.8203%2010.8984%2010.75%2010.7188%2010.75%2010.5V6Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Analysis"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "match-jd-wrap")}
            tag="div"
            {...bgColorProps}
          >
            <_Builtin.Block tag="div">{"Good match - 76%"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-780")}
          tag="div"
          {...onClickIcons}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.60156%204.60156C7.86719%204.38281%208.13281%204.38281%208.39844%204.60156L12.8984%209.10156C13.1172%209.36719%2013.1172%209.63281%2012.8984%209.89844C12.6328%2010.1172%2012.3672%2010.1172%2012.1016%209.89844L8%205.79688L3.89844%209.89844C3.63281%2010.1172%203.36719%2010.1172%203.10156%209.89844C2.88281%209.63281%202.88281%209.36719%203.10156%209.10156L7.60156%204.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-779")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-778")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-777")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Experience"}</_Builtin.Block>
            <_Builtin.Block tag="div">{slotExperienceScore}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600", "")}
            tag="div"
          >
            {textExperienceDesc}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-778")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-777")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Skill"}</_Builtin.Block>
            <_Builtin.Block tag="div">{slotSkillScore}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textSkillDesc}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-778")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-777")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Education"}</_Builtin.Block>
            <_Builtin.Block tag="div">{slotEducationScore}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textEducationDesc}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
