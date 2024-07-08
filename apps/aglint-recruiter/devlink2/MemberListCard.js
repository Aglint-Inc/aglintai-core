"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { TrainingProgressDetail } from "./TrainingProgressDetail";
import * as _utils from "./utils";
import _styles from "./MemberListCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-133":{"id":"e-133","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-79","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-134"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0bfca0bc-3dfe-c6f1-5bb7-98e2636cb68c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0bfca0bc-3dfe-c6f1-5bb7-98e2636cb68c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710409408376},"e-134":{"id":"e-134","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-80","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-133"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0bfca0bc-3dfe-c6f1-5bb7-98e2636cb68c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0bfca0bc-3dfe-c6f1-5bb7-98e2636cb68c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710409408377}},"actionLists":{"a-79":{"id":"a-79","title":"MemberListCard Hover IN","actionItemGroups":[{"actionItems":[{"id":"a-79-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".mlc-three-dot-content","selectorGuids":["1bf41171-9dea-7b98-63d3-f51ced602df1"]},"value":"none"}},{"id":"a-79-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".mlc-three-dot-content","selectorGuids":["1bf41171-9dea-7b98-63d3-f51ced602df1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-79-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".mlc-three-dot-content","selectorGuids":["1bf41171-9dea-7b98-63d3-f51ced602df1"]},"value":1,"unit":""}},{"id":"a-79-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".mlc-three-dot-content","selectorGuids":["1bf41171-9dea-7b98-63d3-f51ced602df1"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1709551132201},"a-80":{"id":"a-80","title":"MemberListCard Hover OUT","actionItemGroups":[{"actionItems":[{"id":"a-80-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".mlc-three-dot-content","selectorGuids":["1bf41171-9dea-7b98-63d3-f51ced602df1"]},"value":0,"unit":""}},{"id":"a-80-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".mlc-three-dot-content","selectorGuids":["1bf41171-9dea-7b98-63d3-f51ced602df1"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1709551132201}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MemberListCard({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textName = "Leslie Alexander",
  textRole = "Design Engineer",
  countCompletedSchedule = "1",
  onHoverDot = {},
  onClickPauseInterview = {},
  onClickResumeInterview = {},
  onClickRemoveModule = {},
  isPauseVisible = true,
  isResumeVisible = true,
  isScheduleCountVisible = false,
  isProfileVisible = true,
  isRoleVisible = true,
  isTrainingCompletedVisible = false,
  isTrainingProgessVisible = true,
  onClickApproveCandidate = {},
  slotProgressBar,
  isMoveToQualifierVisible = true,
  onClickMoveToQualifier = {},
  isApproveCandidateButtonVisible = true,
  isPendingApprovalVisible = false,
  textPauseResumeDate = "16 April 2024",
  isPauseResumeVisible = true,
  onClickCard = {},
  isTextObjectiveVisible = false,
  textObjective = "Design Engineer",
  isThreeDotVisible = true,
  slotTrainingProgressDetail,
  isTrainingProgressDetailVisible = false,
  textConfirmed = "1",
  textCancel = "1",
  textTodayInterview = "2 / 3 Interviews",
  textWeekInterview = "2 / 3 Interviews",
  onClickDropdownIcon = {},
  isDropdownIconVisible = false,
  textPause = "Paused from assigning to new interviews with this interviewer",
  isInterviewsVisible = true,
  isRemoveVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "memberl-list-card-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-sub-table-card")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "member-list-left-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "mlc-name-wrap")}
            tag="div"
            {...onClickCard}
          >
            {isProfileVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "avatar_40")}
                tag="div"
              >
                {slotProfileImage ?? (
                  <_Builtin.Image
                    className={_utils.cx(_styles, "cover_image")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/660575d2376f14b089565d8b_IMG_1491.jpg"
                  />
                )}
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "mlc-name")}
              tag="div"
            >
              <Text content={textName} weight="medium" />
              <Text content={textRole} color="neutral" weight="" size="1" />
              {isTextObjectiveVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "two-line-clamp")}
                  tag="div"
                >
                  <Text content={textObjective} color="neutral" weight="" />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          {isScheduleCountVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "schedule-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "mlc-count-wrap")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5%202C6.8125%202.02083%206.97917%202.1875%207%202.5V4H13V2.5C13.0208%202.1875%2013.1875%202.02083%2013.5%202C13.8125%202.02083%2013.9792%202.1875%2014%202.5V4H15C15.5625%204.02083%2016.0312%204.21875%2016.4062%204.59375C16.7812%204.96875%2016.9792%205.4375%2017%206V7V8V16C16.9792%2016.5625%2016.7812%2017.0312%2016.4062%2017.4062C16.0312%2017.7812%2015.5625%2017.9792%2015%2018H5C4.4375%2017.9792%203.96875%2017.7812%203.59375%2017.4062C3.21875%2017.0312%203.02083%2016.5625%203%2016V8V7V6C3.02083%205.4375%203.21875%204.96875%203.59375%204.59375C3.96875%204.21875%204.4375%204.02083%205%204H6V2.5C6.02083%202.1875%206.1875%202.02083%206.5%202ZM16%208H4V16C4%2016.2917%204.09375%2016.5312%204.28125%2016.7188C4.46875%2016.9062%204.70833%2017%205%2017H15C15.2917%2017%2015.5312%2016.9062%2015.7188%2016.7188C15.9062%2016.5312%2016%2016.2917%2016%2016V8ZM15%205H5C4.70833%205%204.46875%205.09375%204.28125%205.28125C4.09375%205.46875%204%205.70833%204%206V7H16V6C16%205.70833%2015.9062%205.46875%2015.7188%205.28125C15.5312%205.09375%2015.2917%205%2015%205Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content={textConfirmed} weight="" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "mlc-count-wrap")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%202.5V4H13V2.5C13.0208%202.1875%2013.1875%202.02083%2013.5%202C13.8125%202.02083%2013.9792%202.1875%2014%202.5V4H15C15.5625%204.02083%2016.0312%204.21875%2016.4062%204.59375C16.7812%204.96875%2016.9792%205.4375%2017%206V7V8V16C16.9792%2016.5625%2016.7812%2017.0312%2016.4062%2017.4062C16.0312%2017.7812%2015.5625%2017.9792%2015%2018H5C4.4375%2017.9792%203.96875%2017.7812%203.59375%2017.4062C3.21875%2017.0312%203.02083%2016.5625%203%2016V8V7V6C3.02083%205.4375%203.21875%204.96875%203.59375%204.59375C3.96875%204.21875%204.4375%204.02083%205%204H6V2.5C6.02083%202.1875%206.1875%202.02083%206.5%202C6.8125%202.02083%206.97917%202.1875%207%202.5ZM4%208V16C4%2016.2917%204.09375%2016.5312%204.28125%2016.7188C4.46875%2016.9062%204.70833%2017%205%2017H15C15.2917%2017%2015.5312%2016.9062%2015.7188%2016.7188C15.9062%2016.5312%2016%2016.2917%2016%2016V8H4ZM5%205C4.70833%205%204.46875%205.09375%204.28125%205.28125C4.09375%205.46875%204%205.70833%204%206V7H16V6C16%205.70833%2015.9062%205.46875%2015.7188%205.28125C15.5312%205.09375%2015.2917%205%2015%205H5ZM13.3438%2010.8438L9.84375%2014.3438C9.61458%2014.5521%209.38542%2014.5521%209.15625%2014.3438L7.15625%2012.3438C6.94792%2012.1146%206.94792%2011.8854%207.15625%2011.6562C7.38542%2011.4479%207.61458%2011.4479%207.84375%2011.6562L9.5%2013.2812L12.6562%2010.1562C12.8854%209.94792%2013.1146%209.94792%2013.3438%2010.1562C13.5521%2010.3854%2013.5521%2010.6146%2013.3438%2010.8438Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content={countCompletedSchedule} weight="" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "mlc-count-wrap")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%202.5V4H13V2.5C13.0208%202.1875%2013.1875%202.02083%2013.5%202C13.8125%202.02083%2013.9792%202.1875%2014%202.5V4H15C15.5625%204.02083%2016.0312%204.21875%2016.4062%204.59375C16.7812%204.96875%2016.9792%205.4375%2017%206V7V8V16C16.9792%2016.5625%2016.7812%2017.0312%2016.4062%2017.4062C16.0312%2017.7812%2015.5625%2017.9792%2015%2018H5C4.4375%2017.9792%203.96875%2017.7812%203.59375%2017.4062C3.21875%2017.0312%203.02083%2016.5625%203%2016V8V7V6C3.02083%205.4375%203.21875%204.96875%203.59375%204.59375C3.96875%204.21875%204.4375%204.02083%205%204H6V2.5C6.02083%202.1875%206.1875%202.02083%206.5%202C6.8125%202.02083%206.97917%202.1875%207%202.5ZM4%208V16C4%2016.2917%204.09375%2016.5312%204.28125%2016.7188C4.46875%2016.9062%204.70833%2017%205%2017H15C15.2917%2017%2015.5312%2016.9062%2015.7188%2016.7188C15.9062%2016.5312%2016%2016.2917%2016%2016V8H4ZM5%205C4.70833%205%204.46875%205.09375%204.28125%205.28125C4.09375%205.46875%204%205.70833%204%206V7H16V6C16%205.70833%2015.9062%205.46875%2015.7188%205.28125C15.5312%205.09375%2015.2917%205%2015%205H5ZM12.3438%2010.8438L10.7188%2012.5L12.3438%2014.1562C12.5521%2014.3854%2012.5521%2014.6146%2012.3438%2014.8438C12.1146%2015.0521%2011.8854%2015.0521%2011.6562%2014.8438L10%2013.2188L8.34375%2014.8438C8.11458%2015.0521%207.88542%2015.0521%207.65625%2014.8438C7.44792%2014.6146%207.44792%2014.3854%207.65625%2014.1562L9.28125%2012.5L7.65625%2010.8438C7.44792%2010.6146%207.44792%2010.3854%207.65625%2010.1562C7.88542%209.94792%208.11458%209.94792%208.34375%2010.1562L10%2011.7812L11.6562%2010.1562C11.8854%209.94792%2012.1146%209.94792%2012.3438%2010.1562C12.5521%2010.3854%2012.5521%2010.6146%2012.3438%2010.8438Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content={textCancel} weight="" />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block tag="div">
            {isTrainingProgessVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "mlc-slot-progress-bar")}
                tag="div"
              >
                {slotProgressBar}
              </_Builtin.Block>
            ) : null}
            {isTrainingCompletedVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "training-completed-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "mlc-training-complete")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5%2012C5.40625%2011.9844%204.40625%2011.7188%203.5%2011.2031C2.59375%2010.6719%201.85938%209.9375%201.29688%209C0.765625%208.04688%200.5%207.04688%200.5%206C0.5%204.95312%200.765625%203.95313%201.29688%203C1.85938%202.0625%202.59375%201.32813%203.5%200.796875C4.40625%200.28125%205.40625%200.015625%206.5%200C7.59375%200.015625%208.59375%200.28125%209.5%200.796875C10.4062%201.32813%2011.1406%202.0625%2011.7031%203C12.2344%203.95313%2012.5%204.95312%2012.5%206C12.5%207.04688%2012.2344%208.04688%2011.7031%209C11.1406%209.9375%2010.4062%2010.6719%209.5%2011.2031C8.59375%2011.7188%207.59375%2011.9844%206.5%2012ZM9.14844%204.89844C9.36719%204.63281%209.36719%204.36719%209.14844%204.10156C8.88281%203.88281%208.61719%203.88281%208.35156%204.10156L5.75%206.70312L4.64844%205.60156C4.38281%205.38281%204.11719%205.38281%203.85156%205.60156C3.63281%205.86719%203.63281%206.13281%203.85156%206.39844L5.35156%207.89844C5.61719%208.11719%205.88281%208.11719%206.14844%207.89844L9.14844%204.89844Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <Text
                    content="Training Completed"
                    color="success"
                    weight=""
                  />
                </_Builtin.Block>
                {isApproveCandidateButtonVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "accent-link")}
                    tag="div"
                    {...onClickApproveCandidate}
                  >
                    <Text weight="" content="Approve candidate as qualified" />
                  </_Builtin.Block>
                ) : null}
                {isPendingApprovalVisible ? (
                  <_Builtin.Block tag="div">
                    <Text
                      color="neutral"
                      content="Pending approval."
                      weight=""
                    />
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "mlc-right-wrap")}
          tag="div"
        >
          {isInterviewsVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "mlc-interview-count-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "mlc-interview-count-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "mlc-count-head")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons", "hide")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.75%200.375V1.5H8.25V0.375C8.26562%200.140625%208.39062%200.015625%208.625%200C8.85938%200.015625%208.98438%200.140625%209%200.375V1.5H9.75C10.1719%201.51563%2010.5234%201.66406%2010.8047%201.94531C11.0859%202.22656%2011.2344%202.57812%2011.25%203V3.75V4.5V10.5C11.2344%2010.9219%2011.0859%2011.2734%2010.8047%2011.5547C10.5234%2011.8359%2010.1719%2011.9844%209.75%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5V3.75V3C0.765625%202.57812%200.914062%202.22656%201.19531%201.94531C1.47656%201.66406%201.82812%201.51563%202.25%201.5H3V0.375C3.01562%200.140625%203.14062%200.015625%203.375%200C3.60938%200.015625%203.73438%200.140625%203.75%200.375ZM1.5%204.5V10.5C1.5%2010.7188%201.57031%2010.8984%201.71094%2011.0391C1.85156%2011.1797%202.03125%2011.25%202.25%2011.25H9.75C9.96875%2011.25%2010.1484%2011.1797%2010.2891%2011.0391C10.4297%2010.8984%2010.5%2010.7188%2010.5%2010.5V4.5H1.5ZM2.25%202.25C2.03125%202.25%201.85156%202.32031%201.71094%202.46094C1.57031%202.60156%201.5%202.78125%201.5%203V3.75H10.5V3C10.5%202.78125%2010.4297%202.60156%2010.2891%202.46094C10.1484%202.32031%209.96875%202.25%209.75%202.25H2.25ZM3.1875%206C3.07812%206.01562%203.01562%206.07812%203%206.1875V8.0625C3.01562%208.17188%203.07812%208.23438%203.1875%208.25H5.0625C5.17188%208.23438%205.23438%208.17188%205.25%208.0625V6.1875C5.23438%206.07812%205.17188%206.01562%205.0625%206H3.1875ZM2.25%206.1875C2.25%205.92188%202.34375%205.70312%202.53125%205.53125C2.70312%205.34375%202.92188%205.25%203.1875%205.25H5.0625C5.32812%205.25%205.54688%205.34375%205.71875%205.53125C5.90625%205.70312%206%205.92188%206%206.1875V8.0625C6%208.32812%205.90625%208.54688%205.71875%208.71875C5.54688%208.90625%205.32812%209%205.0625%209H3.1875C2.92188%209%202.70312%208.90625%202.53125%208.71875C2.34375%208.54688%202.25%208.32812%202.25%208.0625V6.1875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <Text size="1" color="neutral" weight="" content="Today" />
                </_Builtin.Block>
                <Text content={textTodayInterview} weight="" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "mlc-interview-count-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "mlc-count-head")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons", "hide")}
                    value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.25%200.375V1.5H8.75V0.375C8.76562%200.140625%208.89062%200.015625%209.125%200C9.35938%200.015625%209.48438%200.140625%209.5%200.375V1.5H10.25C10.6719%201.51563%2011.0234%201.66406%2011.3047%201.94531C11.5859%202.22656%2011.7344%202.57812%2011.75%203V3.75V4.5V10.5C11.7344%2010.9219%2011.5859%2011.2734%2011.3047%2011.5547C11.0234%2011.8359%2010.6719%2011.9844%2010.25%2012H2.75C2.32812%2011.9844%201.97656%2011.8359%201.69531%2011.5547C1.41406%2011.2734%201.26562%2010.9219%201.25%2010.5V4.5V3.75V3C1.26562%202.57812%201.41406%202.22656%201.69531%201.94531C1.97656%201.66406%202.32812%201.51563%202.75%201.5H3.5V0.375C3.51562%200.140625%203.64062%200.015625%203.875%200C4.10938%200.015625%204.23438%200.140625%204.25%200.375ZM2%204.5V10.5C2%2010.7188%202.07031%2010.8984%202.21094%2011.0391C2.35156%2011.1797%202.53125%2011.25%202.75%2011.25H10.25C10.4688%2011.25%2010.6484%2011.1797%2010.7891%2011.0391C10.9297%2010.8984%2011%2010.7188%2011%2010.5V4.5H2ZM2.75%202.25C2.53125%202.25%202.35156%202.32031%202.21094%202.46094C2.07031%202.60156%202%202.78125%202%203V3.75H11V3C11%202.78125%2010.9297%202.60156%2010.7891%202.46094C10.6484%202.32031%2010.4688%202.25%2010.25%202.25H2.75ZM3.6875%206C3.57812%206.01562%203.51562%206.07812%203.5%206.1875V8.0625C3.51562%208.17188%203.57812%208.23438%203.6875%208.25H9.3125C9.42188%208.23438%209.48438%208.17188%209.5%208.0625V6.1875C9.48438%206.07812%209.42188%206.01562%209.3125%206H3.6875ZM2.75%206.1875C2.75%205.92188%202.84375%205.70312%203.03125%205.53125C3.20312%205.34375%203.42188%205.25%203.6875%205.25H9.3125C9.57812%205.25%209.79688%205.34375%209.96875%205.53125C10.1562%205.70312%2010.25%205.92188%2010.25%206.1875V8.0625C10.25%208.32812%2010.1562%208.54688%209.96875%208.71875C9.79688%208.90625%209.57812%209%209.3125%209H3.6875C3.42188%209%203.20312%208.90625%203.03125%208.71875C2.84375%208.54688%202.75%208.32812%202.75%208.0625V6.1875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <Text
                    size="1"
                    color="neutral"
                    weight=""
                    content="This Week"
                  />
                </_Builtin.Block>
                <Text content={textWeekInterview} weight="" />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "mlc-dropdown-wrap")}
            tag="div"
          >
            {isDropdownIconVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "mlc-drop-wrap")}
                tag="div"
                {...onClickDropdownIcon}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons", "pointer")}
                  value="%3Csvg%20width%3D%2210%22%20height%3D%2212%22%20viewBox%3D%220%200%2010%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.11065%200.289517C0.902374%200.0812288%200.564689%200.0812288%200.356411%200.289517C0.148123%200.497794%200.148123%200.835479%200.356411%201.04376L4.62308%205.31042C4.83136%205.51871%205.16904%205.51871%205.37732%205.31042L9.64404%201.04376C9.85225%200.835479%209.85225%200.497794%209.64404%200.289517C9.43572%200.0812288%209.09801%200.0812288%208.88969%200.289517L5.0002%204.17905L1.11065%200.289517ZM1.11065%206.68952C0.902374%206.48123%200.564689%206.48123%200.356411%206.68952C0.148123%206.89779%200.148123%207.23548%200.356411%207.44376L4.62308%2011.7105C4.83136%2011.9187%205.16904%2011.9187%205.37732%2011.7105L9.64404%207.44376C9.85225%207.23548%209.85225%206.89779%209.64404%206.68952C9.43572%206.48123%209.09801%206.48123%208.88969%206.68952L5.0002%2010.5791L1.11065%206.68952Z%22%20fill%3D%22%23080800%22%20fill-opacity%3D%220.631373%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
            {isThreeDotVisible ? (
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "mlc-three-dot")}
                  data-w-id="0bfca0bc-3dfe-c6f1-5bb7-98e2636cb68c"
                  tag="div"
                  {...onHoverDot}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%224%22%20height%3D%2214%22%20viewbox%3D%220%200%204%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%2010.5C2.5625%2010.5208%203%2010.7708%203.3125%2011.25C3.5625%2011.75%203.5625%2012.25%203.3125%2012.75C3%2013.2292%202.5625%2013.4792%202%2013.5C1.4375%2013.4792%201%2013.2292%200.6875%2012.75C0.4375%2012.25%200.4375%2011.75%200.6875%2011.25C1%2010.7708%201.4375%2010.5208%202%2010.5ZM2%205.5C2.5625%205.52083%203%205.77083%203.3125%206.25C3.5625%206.75%203.5625%207.25%203.3125%207.75C3%208.22917%202.5625%208.47917%202%208.5C1.4375%208.47917%201%208.22917%200.6875%207.75C0.4375%207.25%200.4375%206.75%200.6875%206.25C1%205.77083%201.4375%205.52083%202%205.5ZM3.5%202C3.47917%202.5625%203.22917%203%202.75%203.3125C2.25%203.5625%201.75%203.5625%201.25%203.3125C0.770833%203%200.520833%202.5625%200.5%202C0.520833%201.4375%200.770833%201%201.25%200.6875C1.75%200.4375%202.25%200.4375%202.75%200.6875C3.22917%201%203.47917%201.4375%203.5%202Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "mlc-three-dot-content")}
                    tag="div"
                    box-shadow="4"
                  >
                    {isMoveToQualifierVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "mlc-three-dot-list")}
                        tag="div"
                        {...onClickMoveToQualifier}
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewbox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.9375%204.5C9.79167%204.5%209.66667%204.55208%209.5625%204.65625L5.125%209.34375C5.04167%209.40625%205%209.48958%205%209.59375C5.02083%209.84375%205.15625%209.97917%205.40625%2010H8C8.3125%2010.0208%208.47917%2010.1875%208.5%2010.5V16C8.52083%2016.3125%208.6875%2016.4792%209%2016.5H11C11.3125%2016.4792%2011.4792%2016.3125%2011.5%2016V10.5C11.5208%2010.1875%2011.6875%2010.0208%2012%2010H14.5938C14.8438%209.97917%2014.9792%209.85417%2015%209.625C15%209.5%2014.9688%209.40625%2014.9062%209.34375L10.4375%204.65625C10.3333%204.55208%2010.2083%204.5%2010.0625%204.5H9.9375ZM16%209.59375C16%209.98958%2015.8646%2010.3229%2015.5938%2010.5938C15.3229%2010.8646%2014.9896%2011%2014.5938%2011H12.5V16C12.4792%2016.4167%2012.3333%2016.7708%2012.0625%2017.0625C11.7708%2017.3333%2011.4167%2017.4792%2011%2017.5H9C8.58333%2017.4792%208.22917%2017.3333%207.9375%2017.0625C7.66667%2016.7708%207.52083%2016.4167%207.5%2016V11H5.40625C5.01042%2011%204.67708%2010.8646%204.40625%2010.5938C4.13542%2010.3229%204%209.98958%204%209.59375C4%209.23958%204.125%208.92708%204.375%208.65625L8.84375%203.96875C9.13542%203.65625%209.5%203.5%209.9375%203.5H10.0625C10.5%203.5%2010.8646%203.65625%2011.1562%203.96875L15.625%208.65625C15.875%208.92708%2016%209.23958%2016%209.59375Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <Text content="Move to qualified" weight="" />
                      </_Builtin.Block>
                    ) : null}
                    {isPauseVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "mlc-three-dot-list")}
                        tag="div"
                        {...onClickPauseInterview}
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5%205C6.1875%205.02083%206.02083%205.1875%206%205.5V14.5C6.02083%2014.8125%206.1875%2014.9792%206.5%2015H8C8.3125%2014.9792%208.47917%2014.8125%208.5%2014.5V5.5C8.47917%205.1875%208.3125%205.02083%208%205H6.5ZM5%205.5C5.02083%205.08333%205.16667%204.72917%205.4375%204.4375C5.72917%204.16667%206.08333%204.02083%206.5%204H8C8.41667%204.02083%208.77083%204.16667%209.0625%204.4375C9.33333%204.72917%209.47917%205.08333%209.5%205.5V14.5C9.47917%2014.9167%209.33333%2015.2708%209.0625%2015.5625C8.77083%2015.8333%208.41667%2015.9792%208%2016H6.5C6.08333%2015.9792%205.72917%2015.8333%205.4375%2015.5625C5.16667%2015.2708%205.02083%2014.9167%205%2014.5V5.5ZM12%205C11.6875%205.02083%2011.5208%205.1875%2011.5%205.5V14.5C11.5208%2014.8125%2011.6875%2014.9792%2012%2015H13.5C13.8125%2014.9792%2013.9792%2014.8125%2014%2014.5V5.5C13.9792%205.1875%2013.8125%205.02083%2013.5%205H12ZM10.5%205.5C10.5208%205.08333%2010.6667%204.72917%2010.9375%204.4375C11.2292%204.16667%2011.5833%204.02083%2012%204H13.5C13.9167%204.02083%2014.2708%204.16667%2014.5625%204.4375C14.8333%204.72917%2014.9792%205.08333%2015%205.5V14.5C14.9792%2014.9167%2014.8333%2015.2708%2014.5625%2015.5625C14.2708%2015.8333%2013.9167%2015.9792%2013.5%2016H12C11.5833%2015.9792%2011.2292%2015.8333%2010.9375%2015.5625C10.6667%2015.2708%2010.5208%2014.9167%2010.5%2014.5V5.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <Text content="Pause" weight="" />
                      </_Builtin.Block>
                    ) : null}
                    {isResumeVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "mlc-three-dot-list")}
                        tag="div"
                        {...onClickResumeInterview}
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.75%204.0625C5.58333%203.97917%205.41667%203.97917%205.25%204.0625C5.08333%204.16667%205%204.3125%205%204.5V15.5C5%2015.6875%205.08333%2015.8333%205.25%2015.9375C5.41667%2016.0208%205.58333%2016.0208%205.75%2015.9375L14.75%2010.4375C14.9167%2010.3333%2015%2010.1875%2015%2010C15%209.8125%2014.9167%209.66667%2014.75%209.5625L5.75%204.0625ZM4.78125%203.1875C5.28125%202.91667%205.78125%202.92708%206.28125%203.21875L15.2812%208.71875C15.7396%209.01042%2015.9792%209.4375%2016%2010C15.9792%2010.5625%2015.7396%2010.9896%2015.2812%2011.2812L6.28125%2016.7812C5.78125%2017.0729%205.28125%2017.0833%204.78125%2016.8125C4.28125%2016.5208%204.02083%2016.0833%204%2015.5V4.5C4.02083%203.91667%204.28125%203.47917%204.78125%203.1875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <Text content="Resume" weight="" color="inherit" />
                      </_Builtin.Block>
                    ) : null}
                    {isRemoveVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "mlc-three-dot-list",
                          "error_hover"
                        )}
                        tag="div"
                        {...onClickRemoveModule}
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5625%203C8.375%203%208.22917%203.08333%208.125%203.25L7.65625%204H12.3438L11.875%203.25C11.7708%203.08333%2011.625%203%2011.4375%203H8.5625ZM13.5312%204H15H16H16.5C16.8125%204.02083%2016.9792%204.1875%2017%204.5C16.9792%204.8125%2016.8125%204.97917%2016.5%205H15.9375L15.125%2016.1562C15.0833%2016.6771%2014.875%2017.1146%2014.5%2017.4688C14.125%2017.8021%2013.6667%2017.9792%2013.125%2018H6.875C6.33333%2017.9792%205.875%2017.8021%205.5%2017.4688C5.125%2017.1146%204.91667%2016.6771%204.875%2016.1562L4.0625%205H3.5C3.1875%204.97917%203.02083%204.8125%203%204.5C3.02083%204.1875%203.1875%204.02083%203.5%204H4H5H6.46875L7.28125%202.71875C7.59375%202.26042%208.02083%202.02083%208.5625%202H11.4375C11.9792%202.02083%2012.4062%202.26042%2012.7188%202.71875L13.5312%204ZM14.9375%205H5.0625L5.875%2016.0625C5.89583%2016.3333%206%2016.5521%206.1875%2016.7188C6.375%2016.9062%206.60417%2017%206.875%2017H13.125C13.3958%2017%2013.625%2016.9062%2013.8125%2016.7188C14%2016.5521%2014.1042%2016.3333%2014.125%2016.0625L14.9375%205Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <Text content="Remove" weight="" color="error" />
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isTrainingProgressDetailVisible ? (
        <_Builtin.Block tag="div">
          {slotTrainingProgressDetail ?? <TrainingProgressDetail />}
        </_Builtin.Block>
      ) : null}
      {isPauseResumeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "mlc-pause-resume-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "pause-resume-text")}
            tag="div"
            {...onClickPauseInterview}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.375%202.25C3.14062%202.26563%203.01562%202.39062%203%202.625V9.375C3.01562%209.60938%203.14062%209.73438%203.375%209.75H4.5C4.73438%209.73438%204.85938%209.60938%204.875%209.375V2.625C4.85938%202.39062%204.73438%202.26563%204.5%202.25H3.375ZM2.25%202.625C2.26562%202.3125%202.375%202.04687%202.57812%201.82812C2.79688%201.625%203.0625%201.51563%203.375%201.5H4.5C4.8125%201.51563%205.07812%201.625%205.29688%201.82812C5.5%202.04687%205.60938%202.3125%205.625%202.625V9.375C5.60938%209.6875%205.5%209.95312%205.29688%2010.1719C5.07812%2010.375%204.8125%2010.4844%204.5%2010.5H3.375C3.0625%2010.4844%202.79688%2010.375%202.57812%2010.1719C2.375%209.95312%202.26562%209.6875%202.25%209.375V2.625ZM7.5%202.25C7.26562%202.26563%207.14062%202.39062%207.125%202.625V9.375C7.14062%209.60938%207.26562%209.73438%207.5%209.75H8.625C8.85938%209.73438%208.98438%209.60938%209%209.375V2.625C8.98438%202.39062%208.85938%202.26563%208.625%202.25H7.5ZM6.375%202.625C6.39062%202.3125%206.5%202.04687%206.70312%201.82812C6.92188%201.625%207.1875%201.51563%207.5%201.5H8.625C8.9375%201.51563%209.20312%201.625%209.42188%201.82812C9.625%202.04687%209.73438%202.3125%209.75%202.625V9.375C9.73438%209.6875%209.625%209.95312%209.42188%2010.1719C9.20312%2010.375%208.9375%2010.4844%208.625%2010.5H7.5C7.1875%2010.4844%206.92188%2010.375%206.70312%2010.1719C6.5%209.95312%206.39062%209.6875%206.375%209.375V2.625Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <Text content={textPause} size="1" weight="" color="" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "pause-resume-date-wrap")}
            tag="div"
          >
            <Text content={textPauseResumeDate} size="1" weight="" color="" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
