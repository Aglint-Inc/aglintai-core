import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ResumeResult.module.css";

export function ResumeResult({
  as: _Component = _Builtin.Block,
  slotResumeScore,
  textFeedback = "This is some text inside of a div block.",
  onClickDownloadResume = {},
  onClickViewResume = {},
  textSummaryScore = "50%",
  textExperienceScore = "50%",
  textEducationScore = "50%",
  textProjectScore = "Not Present ",
  textCertificationScore = "50%",
  textSkillsScore = "50%",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "resume-result-sub-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "resume-result-left")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-resume-score")}
          tag="div"
        >
          {slotResumeScore}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-yellow-600")}
          tag="div"
        >
          {textFeedback}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-382")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-add-skill-btn-new")}
            tag="div"
            {...onClickDownloadResume}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "add-icon-2")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.5%207.69289L9.04645%205.14645C9.24171%204.95118%209.55829%204.95118%209.75355%205.14645C9.94882%205.34171%209.94882%205.65829%209.75355%205.85355L6.65355%208.95355C6.25829%209.34882%205.64171%209.34882%205.24645%208.95355L2.14645%205.85355C1.95118%205.65829%201.95118%205.34171%202.14645%205.14645C2.34171%204.95118%202.65829%204.95118%202.85355%205.14645L5.5%207.79289V0.5C5.5%200.223858%205.72386%200%206%200C6.27614%200%206.5%200.223858%206.5%200.5V7.69289ZM1.5%2012C1.22386%2012%201%2011.7761%201%2011.5C1%2011.2239%201.22386%2011%201.5%2011H10.5C10.7761%2011%2011%2011.2239%2011%2011.5C11%2011.7761%2010.7761%2012%2010.5%2012H1.5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "label-13")}
              tag="div"
            >
              {"Download Resume"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-add-skill-btn-new")}
            tag="div"
            {...onClickViewResume}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "add-icon-2")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.00084%2010C3.49386%2010%201.53408%208.55652%200.210388%206.66553C-0.0700221%206.26244%20-0.0700222%205.72985%200.209745%205.3454C1.51811%203.45554%203.49057%202%206.00084%202C8.50783%202%2010.4676%203.44348%2011.7913%205.33447C12.0704%205.73574%2012.0717%206.26536%2011.7891%206.65876C10.4807%208.54659%208.50928%2010%206.00084%2010ZM10.9697%206.08539C11.01%206.02985%2011.01%205.96244%2010.9712%205.90673C9.81641%204.257%208.10981%203%206.00084%203C3.88953%203%202.17261%204.26697%201.02521%205.92409C0.991704%205.97016%200.991704%206.03756%201.03046%206.09327C2.18527%207.743%203.89187%209%206.00084%209C8.11215%209%209.82907%207.73303%2010.9697%206.08539ZM6.00084%208C4.89627%208%204.00084%207.10457%204.00084%206C4.00084%204.89543%204.89627%204%206.00084%204C7.10541%204%208.00084%204.89543%208.00084%206C8.00084%207.10457%207.10541%208%206.00084%208ZM6.00084%207C6.55313%207%207.00084%206.55228%207.00084%206C7.00084%205.44772%206.55313%205%206.00084%205C5.44856%205%205.00084%205.44772%205.00084%206C5.00084%206.55228%205.44856%207%206.00084%207Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "label-13")}
              tag="div"
            >
              {"View Resume"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "resumes-result-right")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-header-block")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Summary"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "lan-analysis-score-block-resume")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textSummaryScore}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-header-block")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Experience"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "lan-analysis-score-block-resume")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textExperienceScore}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-header-block")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Education"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "lan-analysis-score-block-resume")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textEducationScore}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-header-block")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Projects"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "lan-analysis-score-block-resume")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textProjectScore}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-header-block")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Certifications"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "lan-analysis-score-block-resume")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textCertificationScore}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-header-block")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Skills"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "lan-analysis-score-block-resume")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textSkillsScore}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
