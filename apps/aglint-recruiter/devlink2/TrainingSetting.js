"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TrainingSettingItem } from "./TrainingSettingItem";
import * as _utils from "./utils";
import _styles from "./TrainingSetting.module.css";

export function TrainingSetting({
  as: _Component = _Builtin.Block,
  slotButton,
  textHeading = "Training is enabled for this module",
  textShadow = "This is a global text component",
  textReverseShadow = "This is a global text component",
  slotApproval,
  isEnable = true,
  textDisable = "This is a global text component",
  isDisable = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "training_setting_wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ts-header-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ts-text-heading-wrap")}
          tag="div"
        >
          <Text content={textHeading} />
          {isDisable ? (
            <_Builtin.Block tag="div">
              <Text
                content="Enable training from settings to add trainee interviewers and track their training progress"
                color="neutral"
                weight="regular"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
      </_Builtin.Block>
      {isEnable ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ts-body-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ts-shadow-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ts-shadow-list")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%2210%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.408163%22%20y%3D%220.408163%22%20width%3D%2219.1837%22%20height%3D%2219.1837%22%20rx%3D%229.59184%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.816327%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%221.84%201.84%22%2F%3E%0A%3Cpath%20d%3D%22M10.0279%2015.2372C7.82366%2015.2372%206.40067%2014.0792%206.25418%2012.44L6.24721%2012.3633H7.50279L7.50977%2012.44C7.60045%2013.4445%208.64676%2014.0792%2010.0977%2014.0792C11.4648%2014.0792%2012.4623%2013.3747%2012.4623%2012.3493V12.3424C12.4623%2011.5053%2011.8834%2010.9333%2010.5022%2010.6264L9.38616%2010.3823C7.37026%209.93583%206.49833%209.00809%206.49833%207.55022V7.54325C6.5053%205.87612%207.96317%204.69727%2010.0419%204.69727C12.0508%204.69727%2013.4528%205.88309%2013.5575%207.38281L13.5645%207.48047H12.3089L12.2949%207.38979C12.1554%206.50391%2011.3184%205.84821%2010.007%205.85519C8.75139%205.86216%207.78181%206.45508%207.78181%207.50837V7.51535C7.78181%208.31752%208.33287%208.86161%209.70006%209.16155L10.8161%209.41267C12.9157%209.88002%2013.7458%2010.7241%2013.7458%2012.1749V12.1819C13.7458%2014.0653%2012.274%2015.2372%2010.0279%2015.2372Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <Text content={textShadow} weight="regular" color="neutral" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ts-shadow-list")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%2210%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.408163%22%20y%3D%220.408163%22%20width%3D%2219.1837%22%20height%3D%2219.1837%22%20rx%3D%229.59184%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.816327%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M6.61691%2015V4.93443H10.4604C12.3996%204.93443%2013.6691%206.12026%2013.6691%207.9269V7.94085C13.6691%209.33594%2012.9088%2010.4241%2011.6462%2010.8217L13.976%2015H12.5042L10.3488%2011.017H7.87249V15H6.61691ZM7.87249%209.90095H10.3488C11.6392%209.90095%2012.3717%209.21038%2012.3717%207.9827V7.96875C12.3717%206.76897%2011.5904%206.0505%2010.293%206.0505H7.87249V9.90095Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <Text
                content={textReverseShadow}
                weight="regular"
                color="neutral"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ts-bottom-wrap")}
            tag="div"
          >
            <Text
              content="Following persons approval is required before moving to qualified state:"
              weight="regular"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "ts-bottom-list-card")}
              tag="div"
            >
              {slotApproval ?? <TrainingSettingItem />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
