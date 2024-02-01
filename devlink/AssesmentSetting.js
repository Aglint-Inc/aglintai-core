import React from "react";
import * as _Builtin from "./_Builtin";
import { AvatarCard } from "./AvatarCard";
import { AudioAvatarCard } from "./AudioAvatarCard";
import * as _utils from "./utils";
import _styles from "./AssesmentSetting.module.css";

export function AssesmentSetting({
  as: _Component = _Builtin.Block,
  slotAvatarVideo,
  textAvatarName = "Avatar_name",
  onClickChangeAvatar = {},
  slotToggleButton,
  onClickToggle = {},
  textChooseAvatar = "Choose your avatar, this avatar will be featured in AI-generated videos.By default an avatar is selected by aglint",
  textDesc = "Activate the toggle to enable the use of AI-generated videos for the assessment. You can also set this option at the job level. If configured here, it will serve as the default setting",
  isSwitchVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment-setting-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ai-assessment-setting-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Avatar settings"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {textDesc}
        </_Builtin.Block>
        {isSwitchVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "toggle-ai-assesment")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-toggle-screening")}
              tag="div"
              {...onClickToggle}
            >
              {slotToggleButton}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {"Use AI generated videos for assessment"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isSwitchVisible ? (
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600", "mt-10")}
            tag="div"
          >
            {textChooseAvatar}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "mt-26")} tag="div">
        {slotAvatarVideo ?? (
          <>
            <AvatarCard />
            <AudioAvatarCard />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
