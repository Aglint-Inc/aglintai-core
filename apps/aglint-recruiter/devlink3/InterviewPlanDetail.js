"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { SlotComp } from "./SlotComp";
import { ButtonSoft } from "./ButtonSoft";
import { AddScheduleCard } from "./AddScheduleCard";
import * as _utils from "./utils";
import _styles from "./InterviewPlanDetail.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-89":{"id":"e-89","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-62","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-90"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dfd7b5cf-5883-bb31-ee83-39d727ddef77","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"dfd7b5cf-5883-bb31-ee83-39d727ddef77","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722594860484},"e-90":{"id":"e-90","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-63","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-89"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dfd7b5cf-5883-bb31-ee83-39d727ddef77","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"dfd7b5cf-5883-bb31-ee83-39d727ddef77","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722594860484}},"actionLists":{"a-62":{"id":"a-62","title":"Interview Plan Detail Hover in","actionItemGroups":[{"actionItems":[{"id":"a-62-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":0,"unit":""}},{"id":"a-62-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":"none"}}]},{"actionItems":[{"id":"a-62-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":1,"unit":""}},{"id":"a-62-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1722594864157},"a-63":{"id":"a-63","title":"Interview Plan Detail Hover out","actionItemGroups":[{"actionItems":[{"id":"a-63-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":0,"unit":""}},{"id":"a-63-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ipc-right-btn-wrap","selectorGuids":["062431b2-5122-bd10-27e6-7c4754658a1d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1722594864157}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewPlanDetail({
  as: _Component = _Builtin.Block,
  slotInterviewers,
  slotButtons,
  textModuleName = "Personality and cultural fit",
  isOnetoOneIconVisible = false,
  isPanelIconVisible = true,
  isDebriefIconVisible = false,
  textPlatformName = "Google Meet",
  textDuration = "45 Minutes",
  textLink = "Company Introduction",
  onClickLink = {},
  isLinkVisible = true,
  textSelected = "Interviewers(1 out of 4 members will be selected)",
  slotPlatformIcon,
  slotAddScheduleCard,
  isAddCardVisible = false,
  isBreakCardVisible = false,
  slotBreakCard,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "", "ipd-wraper")}
      data-w-id="dfd7b5cf-5883-bb31-ee83-39d727ddef77"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-plan-card-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "gsc-header-title")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {isOnetoOneIconVisible ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.5%204H19.5C20.2083%204.02083%2020.8021%204.26042%2021.2812%204.71875C21.7396%205.19792%2021.9792%205.79167%2022%206.5V17.5C21.9792%2018.2083%2021.7396%2018.8021%2021.2812%2019.2812C20.8021%2019.7396%2020.2083%2019.9792%2019.5%2020H4.5C3.79167%2019.9792%203.19792%2019.7396%202.71875%2019.2812C2.26042%2018.8021%202.02083%2018.2083%202%2017.5V6.5C2.02083%205.79167%202.26042%205.19792%202.71875%204.71875C3.19792%204.26042%203.79167%204.02083%204.5%204ZM3%206.5V17.5C3.02083%2017.9167%203.16667%2018.2708%203.4375%2018.5625C3.72917%2018.8333%204.08333%2018.9792%204.5%2019H19.5C19.9167%2018.9792%2020.2708%2018.8333%2020.5625%2018.5625C20.8333%2018.2708%2020.9792%2017.9167%2021%2017.5V6.5C20.9792%206.08333%2020.8333%205.72917%2020.5625%205.4375C20.2708%205.16667%2019.9167%205.02083%2019.5%205H4.5C4.08333%205.02083%203.72917%205.16667%203.4375%205.4375C3.16667%205.72917%203.02083%206.08333%203%206.5ZM11%2010C11%2010.2917%2011.0938%2010.5312%2011.2812%2010.7188C11.4688%2010.9062%2011.7083%2011%2012%2011C12.2917%2011%2012.5312%2010.9062%2012.7188%2010.7188C12.9062%2010.5312%2013%2010.2917%2013%2010C13%209.70833%2012.9062%209.46875%2012.7188%209.28125C12.5312%209.09375%2012.2917%209%2012%209C11.7083%209%2011.4688%209.09375%2011.2812%209.28125C11.0938%209.46875%2011%209.70833%2011%2010ZM14%2010C13.9792%2010.75%2013.6458%2011.3229%2013%2011.7188C12.3333%2012.0938%2011.6667%2012.0938%2011%2011.7188C10.3542%2011.3229%2010.0208%2010.75%2010%2010C10.0208%209.25%2010.3542%208.67708%2011%208.28125C11.6667%207.90625%2012.3333%207.90625%2013%208.28125C13.6458%208.67708%2013.9792%209.25%2014%2010ZM13.25%2014H10.75C10.1042%2014.0417%209.69792%2014.375%209.53125%2015H14.4688C14.3021%2014.375%2013.8958%2014.0417%2013.25%2014ZM10.75%2013H13.25C13.8958%2013.0208%2014.4271%2013.2396%2014.8438%2013.6562C15.2604%2014.0729%2015.4792%2014.6042%2015.5%2015.25C15.4583%2015.7083%2015.2083%2015.9583%2014.75%2016H9.25C8.79167%2015.9583%208.54167%2015.7083%208.5%2015.25C8.52083%2014.6042%208.73958%2014.0729%209.15625%2013.6562C9.57292%2013.2396%2010.1042%2013.0208%2010.75%2013Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
              {isPanelIconVisible ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.5%204H19.5C20.2083%204.02083%2020.8021%204.26042%2021.2812%204.71875C21.7396%205.19792%2021.9792%205.79167%2022%206.5V17.5C21.9792%2018.2083%2021.7396%2018.8021%2021.2812%2019.2812C20.8021%2019.7396%2020.2083%2019.9792%2019.5%2020H4.5C3.79167%2019.9792%203.19792%2019.7396%202.71875%2019.2812C2.26042%2018.8021%202.02083%2018.2083%202%2017.5V6.5C2.02083%205.79167%202.26042%205.19792%202.71875%204.71875C3.19792%204.26042%203.79167%204.02083%204.5%204ZM3%206.5V17.5C3.02083%2017.9167%203.16667%2018.2708%203.4375%2018.5625C3.72917%2018.8333%204.08333%2018.9792%204.5%2019H19.5C19.9167%2018.9792%2020.2708%2018.8333%2020.5625%2018.5625C20.8333%2018.2708%2020.9792%2017.9167%2021%2017.5V6.5C20.9792%206.08333%2020.8333%205.72917%2020.5625%205.4375C20.2708%205.16667%2019.9167%205.02083%2019.5%205H4.5C4.08333%205.02083%203.72917%205.16667%203.4375%205.4375C3.16667%205.72917%203.02083%206.08333%203%206.5ZM11%2010C11%2010.2917%2011.0938%2010.5312%2011.2812%2010.7188C11.4688%2010.9062%2011.7083%2011%2012%2011C12.2917%2011%2012.5312%2010.9062%2012.7188%2010.7188C12.9062%2010.5312%2013%2010.2917%2013%2010C13%209.70833%2012.9062%209.46875%2012.7188%209.28125C12.5312%209.09375%2012.2917%209%2012%209C11.7083%209%2011.4688%209.09375%2011.2812%209.28125C11.0938%209.46875%2011%209.70833%2011%2010ZM14%2010C13.9792%2010.75%2013.6458%2011.3229%2013%2011.7188C12.3333%2012.0938%2011.6667%2012.0938%2011%2011.7188C10.3542%2011.3229%2010.0208%2010.75%2010%2010C10.0208%209.25%2010.3542%208.67708%2011%208.28125C11.6667%207.90625%2012.3333%207.90625%2013%208.28125C13.6458%208.67708%2013.9792%209.25%2014%2010ZM13.25%2014H10.75C10.1042%2014.0417%209.69792%2014.375%209.53125%2015H14.4688C14.3021%2014.375%2013.8958%2014.0417%2013.25%2014ZM10.75%2013H12H13.25C13.8958%2013.0208%2014.4271%2013.2396%2014.8438%2013.6562C15.2604%2014.0729%2015.4792%2014.6042%2015.5%2015.25C15.4583%2015.7083%2015.2083%2015.9583%2014.75%2016H9.25C8.79167%2015.9583%208.54167%2015.7083%208.5%2015.25C8.52083%2014.6042%208.73958%2014.0729%209.15625%2013.6562C9.57292%2013.2396%2010.1042%2013.0208%2010.75%2013ZM7%209.5C7.02083%209.8125%207.1875%209.97917%207.5%2010C7.79167%209.97917%207.95833%209.8125%208%209.5C7.95833%209.1875%207.79167%209.02083%207.5%209C7.1875%209.02083%207.02083%209.1875%207%209.5ZM9%209.5C8.97917%2010.0625%208.72917%2010.5%208.25%2010.8125C7.75%2011.0625%207.25%2011.0625%206.75%2010.8125C6.27083%2010.5%206.02083%2010.0625%206%209.5C6.02083%208.9375%206.27083%208.5%206.75%208.1875C7.25%207.9375%207.75%207.9375%208.25%208.1875C8.72917%208.5%208.97917%208.9375%209%209.5ZM6%2013.75V14C5.97917%2014.3125%205.8125%2014.4792%205.5%2014.5C5.1875%2014.4792%205.02083%2014.3125%205%2014V13.75C5.02083%2013.25%205.1875%2012.8333%205.5%2012.5C5.83333%2012.1875%206.25%2012.0208%206.75%2012H8.5C8.8125%2012.0208%208.97917%2012.1875%209%2012.5C8.97917%2012.8125%208.8125%2012.9792%208.5%2013H6.75C6.29167%2013.0417%206.04167%2013.2917%206%2013.75ZM16.5%209C16.2083%209.02083%2016.0417%209.1875%2016%209.5C16.0417%209.8125%2016.2083%209.97917%2016.5%2010C16.8125%209.97917%2016.9792%209.8125%2017%209.5C16.9792%209.1875%2016.8125%209.02083%2016.5%209ZM16.5%2011C15.9375%2010.9792%2015.5104%2010.7292%2015.2188%2010.25C14.9479%209.75%2014.9479%209.25%2015.2188%208.75C15.5104%208.27083%2015.9375%208.02083%2016.5%208C17.0625%208.02083%2017.5%208.27083%2017.8125%208.75C18.0833%209.25%2018.0833%209.75%2017.8125%2010.25C17.5%2010.7292%2017.0625%2010.9792%2016.5%2011ZM17.25%2013H15.5C15.1875%2012.9792%2015.0208%2012.8125%2015%2012.5C15.0208%2012.1875%2015.1875%2012.0208%2015.5%2012H17.25C17.75%2012.0208%2018.1667%2012.1875%2018.5%2012.5C18.8125%2012.8333%2018.9792%2013.25%2019%2013.75V14C18.9792%2014.3125%2018.8125%2014.4792%2018.5%2014.5C18.1875%2014.4792%2018.0208%2014.3125%2018%2014V13.75C17.9583%2013.2917%2017.7083%2013.0417%2017.25%2013Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
              {isDebriefIconVisible ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2222%22%20height%3D%2216%22%20viewbox%3D%220%200%2022%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%205.5C2.04167%206.64583%202.51042%207.65625%203.40625%208.53125C3.55208%208.69792%203.58333%208.88542%203.5%209.09375C3.16667%209.73958%202.77083%2010.3646%202.3125%2010.9688C3.3125%2010.8646%204.27083%2010.5938%205.1875%2010.1562C5.35417%2010.0729%205.54167%209.97917%205.75%209.875C5.83333%209.83333%205.9375%209.82292%206.0625%209.84375C6.54167%209.94792%207.02083%2010%207.5%2010C9.125%209.95833%2010.4375%209.5%2011.4375%208.625C12.4583%207.75%2012.9792%206.70833%2013%205.5C12.9792%204.29167%2012.4583%203.25%2011.4375%202.375C10.4375%201.5%209.125%201.04167%207.5%201C5.875%201.04167%204.5625%201.5%203.5625%202.375C2.54167%203.25%202.02083%204.29167%202%205.5ZM7.5%200C9.33333%200.0416667%2010.8646%200.583333%2012.0938%201.625C13.3229%202.64583%2013.9583%203.9375%2014%205.5C13.9583%207.0625%2013.3229%208.36458%2012.0938%209.40625C10.8646%2010.4271%209.33333%2010.9583%207.5%2011C7%2011%206.51042%2010.9583%206.03125%2010.875C5.88542%2010.9375%205.73958%2011%205.59375%2011.0625C4.40625%2011.625%203.125%2011.9375%201.75%2012C1.4375%2011.9792%201.20833%2011.8229%201.0625%2011.5312C0.9375%2011.2396%200.979167%2010.9792%201.1875%2010.75H1.21875C1.67708%2010.2083%202.08333%209.60417%202.4375%208.9375C2.02083%208.47917%201.67708%207.95833%201.40625%207.375C1.13542%206.8125%201%206.1875%201%205.5C1.04167%203.9375%201.67708%202.64583%202.90625%201.625C4.13542%200.583333%205.66667%200.0416667%207.5%200ZM14.9688%205.03125C14.9479%204.67708%2014.8958%204.33333%2014.8125%204C16.5833%204.10417%2018.0417%204.66667%2019.1875%205.6875C20.3542%206.72917%2020.9583%208%2021%209.5C21%2010.1875%2020.8646%2010.8125%2020.5938%2011.375C20.3229%2011.9583%2019.9792%2012.4792%2019.5625%2012.9375C19.9167%2013.6042%2020.3333%2014.2083%2020.8125%2014.75C21%2014.9792%2021.0417%2015.25%2020.9375%2015.5625C20.7917%2015.8333%2020.5625%2015.9792%2020.25%2016C18.875%2015.9375%2017.5938%2015.625%2016.4062%2015.0625C16.2604%2015%2016.1146%2014.9271%2015.9688%2014.8438C15.4896%2014.9479%2015%2015%2014.5%2015C13.2083%2014.9792%2012.0417%2014.6979%2011%2014.1562C9.97917%2013.5938%209.19792%2012.8542%208.65625%2011.9375C9.01042%2011.875%209.36458%2011.8021%209.71875%2011.7188C10.1771%2012.3854%2010.8229%2012.9271%2011.6562%2013.3438C12.4688%2013.7604%2013.4167%2013.9792%2014.5%2014C14.9792%2014%2015.4583%2013.9479%2015.9375%2013.8438C16.0625%2013.8229%2016.1771%2013.8333%2016.2812%2013.875C16.4688%2013.9792%2016.6562%2014.0729%2016.8438%2014.1562C17.7396%2014.5729%2018.6875%2014.8438%2019.6875%2014.9688C19.2292%2014.3646%2018.8333%2013.7396%2018.5%2013.0938C18.4167%2012.8854%2018.4479%2012.6979%2018.5938%2012.5312C19.4896%2011.6562%2019.9583%2010.6458%2020%209.5C19.9792%208.35417%2019.5104%207.35417%2018.5938%206.5C17.6771%205.64583%2016.4688%205.15625%2014.9688%205.03125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
            <Text content={textModuleName} weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-plan-details")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "gsc-date-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "gsc-time-wrap")}
              tag="div"
            >
              <GlobalIcon iconName="hourglass" />
              <Text content={textDuration} weight="" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "gsc-meeting-wrap")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {slotPlatformIcon ?? <SlotComp componentNeme="Icon" />}
              </_Builtin.Block>
              <Text content={textPlatformName} weight="" />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isLinkVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-plan-badge")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "gsc-module-link-wrap")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <ButtonSoft
                  textButton={textLink}
                  onClickButton={onClickLink}
                  size="1"
                  isRightIcon={true}
                  iconName="open_in_new"
                  iconSize="3"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "plan-candidate-wrap")}
          tag="div"
        >
          <Text
            content={textSelected}
            weight="regular"
            color="neutral"
            size="1"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-plan-candidate-wrap")}
            tag="div"
          >
            {slotInterviewers}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ipc-right-btn-wrap")}
          tag="div"
        >
          {slotButtons}
        </_Builtin.Block>
      </_Builtin.Block>
      {isBreakCardVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "gsc-break-wrapper-2")}
          tag="div"
        >
          {slotBreakCard}
        </_Builtin.Block>
      ) : null}
      {isAddCardVisible ? (
        <_Builtin.Block tag="div">
          {slotAddScheduleCard ?? <AddScheduleCard />}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
