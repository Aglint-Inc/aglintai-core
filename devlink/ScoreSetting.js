import React from "react";
import * as _Builtin from "./_Builtin";
import { ScoreCard } from "./ScoreCard";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import { ScoreWeightage } from "./ScoreWeightage";
import * as _utils from "./utils";
import _styles from "./ScoreSetting.module.css";

export function ScoreSetting({
  as: _Component = _Builtin.Block,
  slotScoreCardDetails,
  slotScoreWeight,
  isAddJob = true,
  onClickDone = {},
  slotButtonPrimaryRegular,
  slotBasicButton,
  onClickSaveDraft = {},
  isProceedDisable = true,
  onClickProceed = {},
  isEmptyWarningVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "score-setting-wrap")} tag="div">
      {isEmptyWarningVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-696")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2226%22%20height%3D%2224%22%20viewBox%3D%220%200%2026%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%201.5C13.7188%201.53125%2014.2656%201.84375%2014.6406%202.4375L24.7656%2019.6875C25.0781%2020.3125%2025.0781%2020.9375%2024.7656%2021.5625C24.3906%2022.1562%2023.8438%2022.4688%2023.125%2022.5H2.875C2.15625%2022.4688%201.60938%2022.1562%201.23438%2021.5625C0.921875%2020.9375%200.921875%2020.3125%201.23438%2019.6875L11.4062%202.4375C11.7812%201.84375%2012.3125%201.53125%2013%201.5ZM13%207.5C12.3125%207.5625%2011.9375%207.9375%2011.875%208.625V13.875C11.9375%2014.5625%2012.3125%2014.9375%2013%2015C13.6875%2014.9375%2014.0625%2014.5625%2014.125%2013.875V8.625C14.0625%207.9375%2013.6875%207.5625%2013%207.5ZM14.5%2018C14.5%2017.5625%2014.3594%2017.2031%2014.0781%2016.9219C13.7969%2016.6406%2013.4375%2016.5%2013%2016.5C12.5625%2016.5%2012.2031%2016.6406%2011.9219%2016.9219C11.6406%2017.2031%2011.5%2017.5625%2011.5%2018C11.5%2018.4375%2011.6406%2018.7969%2011.9219%2019.0781C12.2031%2019.3594%2012.5625%2019.5%2013%2019.5C13.4375%2019.5%2013.7969%2019.3594%2014.0781%2019.0781C14.3594%2018.7969%2014.5%2018.4375%2014.5%2018Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-yellow-800")}
            tag="div"
          >
            {
              "The job description is currently empty. To automatically populate score settings, please provide a job description or add the details manually."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-661")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "indicate-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "indicator-box", "blue-200")}
            tag="div"
          />
          <_Builtin.Block tag="div">{"Must have"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "indicate-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "indicator-box", "grey-200")}
            tag="div"
          />
          <_Builtin.Block tag="div">{"Nice to have"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "score-outer-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "left-score-wrap")}
            tag="div"
          >
            {slotScoreCardDetails ?? <ScoreCard />}
          </_Builtin.Block>
          {isAddJob ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "job-details-button-wrappers")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "proceed-to-apply")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "blue-process-button")}
                  tag="div"
                  {...onClickProceed}
                >
                  <_Builtin.Block tag="div">
                    {"Proceed to screening"}
                  </_Builtin.Block>
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%202.24645C9.95118%202.44171%209.95118%202.75829%2010.1464%202.95355L14.1929%207L0.499999%207C0.223857%207%20-5.04966e-07%207.22386%20-4.80825e-07%207.5C-4.56684e-07%207.77614%200.223857%208%200.5%208L14.2929%208L10.1464%2012.1464C9.95118%2012.3417%209.95118%2012.6583%2010.1464%2012.8536C10.3417%2013.0488%2010.6583%2013.0488%2010.8536%2012.8536L15.4536%208.25355C15.8488%207.85829%2015.8488%207.24171%2015.4536%206.84645L10.8536%202.24645C10.6583%202.05119%2010.3417%202.05119%2010.1464%202.24645Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                {isProceedDisable ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "grey-disable-process-button"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Proceed to screening"}
                    </_Builtin.Block>
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%202.24645C9.95118%202.44171%209.95118%202.75829%2010.1464%202.95355L14.1929%207L0.499999%207C0.223857%207%20-5.04966e-07%207.22386%20-4.80825e-07%207.5C-4.56684e-07%207.77614%200.223857%208%200.5%208L14.2929%208L10.1464%2012.1464C9.95118%2012.3417%209.95118%2012.6583%2010.1464%2012.8536C10.3417%2013.0488%2010.6583%2013.0488%2010.8536%2012.8536L15.4536%208.25355C15.8488%207.85829%2015.8488%207.24171%2015.4536%206.84645L10.8536%202.24645C10.6583%202.05119%2010.3417%202.05119%2010.1464%202.24645Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isAddJob ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "publish-email-wrap")}
              tag="div"
            >
              <_Builtin.Block tag="div" {...onClickDone}>
                {slotButtonPrimaryRegular ?? (
                  <ButtonPrimaryRegular textLabel="Publish Job" />
                )}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-basic-button")}
                tag="div"
                {...onClickSaveDraft}
              >
                {slotBasicButton}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "right-score-wrap")}
          tag="div"
        >
          {slotScoreWeight ?? <ScoreWeightage />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
