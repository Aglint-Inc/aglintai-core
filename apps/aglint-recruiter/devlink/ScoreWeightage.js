"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ScorePercentage } from "./ScorePercentage";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./ScoreWeightage.module.css";

export function ScoreWeightage({
  as: _Component = _Builtin.Block,
  slotScoreWheel,
  slotScorePercent,
  slotResetButton,
  slotBanner,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "score-weightage-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "slot_banners")} tag="div">
        {slotBanner ?? (
          <>
            <_Builtin.Block
              className={_utils.cx(_styles, "global_banner-2")}
              id={_utils.cx(
                _styles,
                "w-node-_0583b42b-f0ee-6517-e470-a6caf9eb64b8-879bdc0a"
              )}
              tag="div"
              data-banner-color="neutral"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "info_main_block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_0583b42b-f0ee-6517-e470-a6caf9eb64ba-879bdc0a"
                  )}
                  tag="div"
                  data-color="inherit"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon_general-2")}
                      tag="div"
                      icon-font="true"
                      icon-size="3"
                      icon-weight="medium"
                      icon-color="inherit"
                    >
                      <_Builtin.Block tag="div">{"info"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight="medium"
                    font-color="inherit"
                    high-contrast="false"
                  >
                    {"How it Works"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight=""
                    font-color="neutral"
                    high-contrast="false"
                  >
                    {
                      "Adjust the weightage for Experience, Skills, and Education to customize the profile score. The total must equal 100%. Use the input fields to set percentages. Click 'Reset' to restore default settings."
                    }
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "info_close")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2219%22%20height%3D%2219%22%20rx%3D%229.5%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2219%22%20height%3D%2219%22%20rx%3D%229.5%22%20stroke%3D%22%23DAD9D6%22%2F%3E%0A%3Cmask%20id%3D%22mask0_4585_227390%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%224%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22%23D9D9D9%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_4585_227390)%22%3E%0A%3Cpath%20d%3D%22M10%2010.5266L7.46351%2013.0633C7.39426%2013.1324%207.30721%2013.1678%207.20238%2013.1695C7.09763%2013.1711%207.00901%2013.1357%206.93651%2013.0633C6.86409%2012.9908%206.82788%2012.9029%206.82788%2012.7998C6.82788%2012.6966%206.86409%2012.6088%206.93651%2012.5363L9.47313%209.99976L6.93651%207.46326C6.86734%207.39401%206.83192%207.30697%206.83026%207.20214C6.82867%207.09739%206.86409%207.00876%206.93651%206.93626C7.00901%206.86385%207.09684%206.82764%207.20001%206.82764C7.30317%206.82764%207.39101%206.86385%207.46351%206.93626L10%209.47289L12.5365%206.93626C12.6058%206.8671%2012.6928%206.83168%2012.7976%206.83001C12.9024%206.82843%2012.991%206.86385%2013.0635%206.93626C13.1359%207.00876%2013.1721%207.0966%2013.1721%207.19976C13.1721%207.30293%2013.1359%207.39076%2013.0635%207.46326L10.5269%209.99976L13.0635%2012.5363C13.1327%2012.6055%2013.1681%2012.6926%2013.1698%2012.7974C13.1713%2012.9021%2013.1359%2012.9908%2013.0635%2013.0633C12.991%2013.1357%2012.9032%2013.1719%2012.8%2013.1719C12.6968%2013.1719%2012.609%2013.1357%2012.5365%2013.0633L10%2010.5266Z%22%20fill%3D%22%2363635E%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "global_banner-2")}
              id={_utils.cx(
                _styles,
                "w-node-_3ab5e24b-9627-8aa8-fc46-9dab19d381e9-879bdc0a"
              )}
              tag="div"
              data-banner-color="purple"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "info_main_block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_3ab5e24b-9627-8aa8-fc46-9dab19d381eb-879bdc0a"
                  )}
                  tag="div"
                  data-color="inherit"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon_general-2")}
                      tag="div"
                      icon-font="true"
                      icon-size="3"
                      icon-weight="medium"
                      icon-color="inherit"
                    >
                      <_Builtin.Block tag="div">{"lightbulb"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight="medium"
                    font-color="inherit"
                    high-contrast="false"
                  >
                    {"Pro Tip"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight=""
                    font-color="neutral"
                    high-contrast="false"
                  >
                    {
                      "Tailor the evaluation criteria to match the specific needs of the role you are hiring for by adjusting the weightages."
                    }
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "right-score-card")}
        tag="div"
      >
        <Text content="Score Weightage" weight="medium" align="center" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-score-wrap")}
          tag="div"
        >
          {slotScoreWheel}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sw-slot-score")}
          tag="div"
        >
          {slotScorePercent ?? <ScorePercentage />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sw-button-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotResetButton ?? <SlotComp componentName="ButtonSolid" />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
