import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScheduleCollapseCard.module.css";

export function ScheduleCollapseCard({
  as: _Component = _Builtin.Block,
  textMonth = "Feb",
  textDate = "27",
  textDay = "FRIDAY",
  textTitle = "Phase 1: Interview for software engineer",
  textTime = "09:00 AM to 09:30 AM (30 Minutes)",
  slotPlatformLogo,
  textPlatformName = "Google Meet",
  slotAvatarCandidate,
  textCandidateName = "Michel Oven",
  slotPannelAvatar,
  isUpcomingVisible = false,
  isCompletedVisible = true,
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-888")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block tag="div">
        {isCompletedVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-909")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-911")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {textMonth}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-40")}
                tag="div"
              >
                {textDate}
              </_Builtin.Block>
              <_Builtin.Block tag="div">{textDay}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-910")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Completed"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isUpcomingVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-909")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-911")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {"Feb"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-40")}
                tag="div"
              >
                {"27"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"FRIDAY"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-910", "upcoming")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Upcoming"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-912")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textTitle}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textTime}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-913")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotPlatformLogo}</_Builtin.Block>
          <_Builtin.Block tag="div">{textPlatformName}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-915")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-914")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotAvatarCandidate}</_Builtin.Block>
            <_Builtin.Block tag="div">{textCandidateName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-915")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-914")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotPannelAvatar}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
