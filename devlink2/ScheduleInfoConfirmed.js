import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ScheduleInfoPlan } from "./ScheduleInfoPlan";
import * as _utils from "./utils";
import _styles from "./ScheduleInfoConfirmed.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-141":{"id":"e-141","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-89","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560091},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-90","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560092},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-91","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-144"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711117013504}},"actionLists":{"a-89":{"id":"a-89","title":"copy-hover in invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-89-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}},{"id":"a-89-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-89-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"flex"}},{"id":"a-89-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}},{"id":"a-89-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711116769518},"a-90":{"id":"a-90","title":"copy-hover out invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-90-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}},{"id":"a-90-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711116769518},"a-91":{"id":"a-91","title":"CLick Copied Invitation Link","actionItemGroups":[{"actionItems":[{"id":"a-91-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-91-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}}]},{"actionItems":[{"id":"a-91-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"block"}},{"id":"a-91-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711117027368}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScheduleInfoConfirmed({
  as: _Component = _Builtin.Block,
  slotScheduleInfoCard,
  slotProfileImage,
  textName = "Tom Odel",
  textCurrentRole = "Senior Software Engineer",
  textLocation = "Onsite , San Fransisco",
  onClickViewProfile = {},
  onClickReschedule = {},
  onClickCancel = {},
  isInterviewPlanVisible = false,
  slotInterviewPlan,
  isScheduleStatusVisible = true,
  textCompleted = "This Schedule has been completed on 24 th match 2015",
  isScheduleCompletedVisible = false,
  textScheduleCancelled = "This Schedule has been cancelled on 24t Jan 2023",
  isScheduleCancelVisible = false,
  isScheduleInfoVisible = true,
  slotAvatarWithName,
  textEmail = "tomode3243@gmaIl.com",
  onClickResendInvite = {},
  copyInviteLink = {},
  textRole = "Senior Software Engineer",
  isInviteLinkVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "scheduled-info-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule-info-sub-wrap")}
        tag="div"
      >
        {isScheduleInfoVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-info-wrapps")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Schedule Info"}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "mt-10")} tag="div">
              {slotScheduleInfoCard}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "schedule-info-wrapps", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Candidate Info"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1127")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1128")}
              tag="div"
            >
              {slotProfileImage}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{textName}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1131")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1130")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2225%22%20viewBox%3D%220%200%2024%2025%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.39844%205.47656V7.27656H15.5984V5.47656C15.5734%205.10156%2015.3734%204.90156%2014.9984%204.87656H8.99844C8.62344%204.90156%208.42344%205.10156%208.39844%205.47656ZM7.19844%207.27656V5.47656C7.22344%204.97656%207.39844%204.55156%207.72344%204.20156C8.07344%203.87656%208.49844%203.70156%208.99844%203.67656H14.9984C15.4984%203.70156%2015.9234%203.87656%2016.2734%204.20156C16.5984%204.55156%2016.7734%204.97656%2016.7984%205.47656V7.27656H19.1984C19.8734%207.30156%2020.4359%207.53906%2020.8859%207.98906C21.3359%208.43906%2021.5734%209.00156%2021.5984%209.67656V19.2766C21.5734%2019.9516%2021.3359%2020.5141%2020.8859%2020.9641C20.4359%2021.4141%2019.8734%2021.6516%2019.1984%2021.6766H4.79844C4.12344%2021.6516%203.56094%2021.4141%203.11094%2020.9641C2.66094%2020.5141%202.42344%2019.9516%202.39844%2019.2766V9.67656C2.42344%209.00156%202.66094%208.43906%203.11094%207.98906C3.56094%207.53906%204.12344%207.30156%204.79844%207.27656H7.19844ZM16.1984%208.47656H7.79844H4.79844C4.44844%208.47656%204.16094%208.58906%203.93594%208.81406C3.71094%209.03906%203.59844%209.32656%203.59844%209.67656V13.2766H8.99844H10.1984H13.7984H14.9984H20.3984V9.67656C20.3984%209.32656%2020.2859%209.03906%2020.0609%208.81406C19.8359%208.58906%2019.5484%208.47656%2019.1984%208.47656H16.1984ZM20.3984%2014.4766H14.9984V16.2766C14.9984%2016.6266%2014.8859%2016.9141%2014.6609%2017.1391C14.4359%2017.3641%2014.1484%2017.4766%2013.7984%2017.4766H10.1984C9.84844%2017.4766%209.56094%2017.3641%209.33594%2017.1391C9.11094%2016.9141%208.99844%2016.6266%208.99844%2016.2766V14.4766H3.59844V19.2766C3.59844%2019.6266%203.71094%2019.9141%203.93594%2020.1391C4.16094%2020.3641%204.44844%2020.4766%204.79844%2020.4766H19.1984C19.5484%2020.4766%2019.8359%2020.3641%2020.0609%2020.1391C20.2859%2019.9141%2020.3984%2019.6266%2020.3984%2019.2766V14.4766ZM10.1984%2014.4766V16.2766H13.7984V14.4766H10.1984Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1129")}
              tag="div"
            >
              <_Builtin.Block tag="div">{textCurrentRole}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                tag="div"
              >
                {textLocation}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1132", "cursor-pointer")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.125%201.53906C7.15625%201.19531%207.34375%201.00781%207.6875%200.976562H11.4375C11.7812%201.00781%2011.9688%201.19531%2012%201.53906V5.28906C11.9688%205.63281%2011.7812%205.82031%2011.4375%205.85156C11.0938%205.82031%2010.9062%205.63281%2010.875%205.28906V2.89844L5.64844%208.125C5.38281%208.34375%205.11719%208.34375%204.85156%208.125C4.63281%207.85938%204.63281%207.59375%204.85156%207.32812L10.0781%202.10156H7.6875C7.34375%202.07031%207.15625%201.88281%207.125%201.53906ZM1.6875%201.72656H4.6875C5.03125%201.75781%205.21875%201.94531%205.25%202.28906C5.21875%202.63281%205.03125%202.82031%204.6875%202.85156H1.6875C1.34375%202.88281%201.15625%203.07031%201.125%203.41406V11.2891C1.15625%2011.6328%201.34375%2011.8203%201.6875%2011.8516H9.5625C9.90625%2011.8203%2010.0938%2011.6328%2010.125%2011.2891V8.28906C10.1562%207.94531%2010.3438%207.75781%2010.6875%207.72656C11.0312%207.75781%2011.2188%207.94531%2011.25%208.28906V11.2891C11.2344%2011.7734%2011.0703%2012.1719%2010.7578%2012.4844C10.4453%2012.7969%2010.0469%2012.9609%209.5625%2012.9766H1.6875C1.20312%2012.9609%200.804688%2012.7969%200.492188%2012.4844C0.179688%2012.1719%200.015625%2011.7734%200%2011.2891V3.41406C0.015625%202.92969%200.179688%202.53125%200.492188%202.21875C0.804688%201.90625%201.20312%201.74219%201.6875%201.72656Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500")}
              tag="div"
            >
              {"View Candidate Profile"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule-info-right-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1232")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Candidate"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1233")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1235")}
              tag="div"
            >
              {slotProfileImage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1234")}
              tag="div"
            >
              <_Builtin.Block tag="div">{textName}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                tag="div"
              >
                {textCurrentRole}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                tag="div"
              >
                {textEmail}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-sm",
                  "text-blue-500",
                  "text-underline",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickViewProfile}
              >
                {"View Profile"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {isInviteLinkVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1266")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-1265",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickResendInvite}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.5%202.625C1.26562%202.64063%201.14062%202.76562%201.125%203V3.51562L5.17969%206.84375C5.42969%207.03125%205.70312%207.125%206%207.125C6.3125%207.125%206.59375%207.03125%206.84375%206.84375L10.875%203.51562V3C10.8594%202.76562%2010.7344%202.64063%2010.5%202.625H1.5ZM1.125%204.96875V9C1.14062%209.23438%201.26562%209.35938%201.5%209.375H10.5C10.7344%209.35938%2010.8594%209.23438%2010.875%209V4.96875L7.54688%207.71094C7.07812%208.07031%206.5625%208.25%206%208.25C5.4375%208.25%204.92188%208.07031%204.45312%207.71094L1.125%204.96875ZM0%203C0.015625%202.57812%200.164062%202.22656%200.445312%201.94531C0.726562%201.66406%201.07812%201.51563%201.5%201.5H10.5C10.9219%201.51563%2011.2734%201.66406%2011.5547%201.94531C11.8359%202.22656%2011.9844%202.57812%2012%203V9C11.9844%209.42188%2011.8359%209.77344%2011.5547%2010.0547C11.2734%2010.3359%2010.9219%2010.4844%2010.5%2010.5H1.5C1.07812%2010.4844%200.726562%2010.3359%200.445312%2010.0547C0.164062%209.77344%200.015625%209.42188%200%209V3Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Resend Invite"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-1265",
                  "cursor-pointer",
                  "relative"
                )}
                data-w-id="060ed27d-d611-fc60-5986-c253a6e2933e"
                tag="div"
                {...copyInviteLink}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%207.875C9.98438%207.85938%2010.1094%207.73438%2010.125%207.5V2.71875L8.53125%201.125H5.25C5.01562%201.14063%204.89062%201.26562%204.875%201.5V7.5C4.89062%207.73438%205.01562%207.85938%205.25%207.875H9.75ZM5.25%209C4.82812%208.98438%204.47656%208.83594%204.19531%208.55469C3.91406%208.27344%203.76562%207.92188%203.75%207.5V1.5C3.76562%201.07812%203.91406%200.726562%204.19531%200.445312C4.47656%200.164062%204.82812%200.015625%205.25%200H8.53125C8.84375%200%209.10938%200.109375%209.32812%200.328125L10.9219%201.92188C11.1406%202.14062%2011.25%202.40625%2011.25%202.71875V7.5C11.2344%207.92188%2011.0859%208.27344%2010.8047%208.55469C10.5234%208.83594%2010.1719%208.98438%209.75%209H5.25ZM2.25%203H3V4.125H2.25C2.01562%204.14062%201.89062%204.26562%201.875%204.5V10.5C1.89062%2010.7344%202.01562%2010.8594%202.25%2010.875H6.75C6.98438%2010.8594%207.10938%2010.7344%207.125%2010.5V9.75H8.25V10.5C8.23438%2010.9219%208.08594%2011.2734%207.80469%2011.5547C7.52344%2011.8359%207.17188%2011.9844%206.75%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5C0.765625%204.07812%200.914062%203.72656%201.19531%203.44531C1.47656%203.16406%201.82812%203.01563%202.25%203Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Copy Invite Link"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1279")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-sm", "copy")}
                    tag="div"
                  >
                    {"Copy"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-sm", "copied")}
                    tag="div"
                  >
                    {"Copied!"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1093")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Job Details"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1095")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.3984%2012.5V14.3H23.5984V12.5C23.5734%2012.125%2023.3734%2011.925%2022.9984%2011.9H16.9984C16.6234%2011.925%2016.4234%2012.125%2016.3984%2012.5ZM15.1984%2014.3V12.5C15.2234%2012%2015.3984%2011.575%2015.7234%2011.225C16.0734%2010.9%2016.4984%2010.725%2016.9984%2010.7H22.9984C23.4984%2010.725%2023.9234%2010.9%2024.2734%2011.225C24.5984%2011.575%2024.7734%2012%2024.7984%2012.5V14.3H27.1984C27.8734%2014.325%2028.4359%2014.5625%2028.8859%2015.0125C29.3359%2015.4625%2029.5734%2016.025%2029.5984%2016.7V26.3C29.5734%2026.975%2029.3359%2027.5375%2028.8859%2027.9875C28.4359%2028.4375%2027.8734%2028.675%2027.1984%2028.7H12.7984C12.1234%2028.675%2011.5609%2028.4375%2011.1109%2027.9875C10.6609%2027.5375%2010.4234%2026.975%2010.3984%2026.3V16.7C10.4234%2016.025%2010.6609%2015.4625%2011.1109%2015.0125C11.5609%2014.5625%2012.1234%2014.325%2012.7984%2014.3H15.1984ZM24.1984%2015.5H15.7984H12.7984C12.4484%2015.5%2012.1609%2015.6125%2011.9359%2015.8375C11.7109%2016.0625%2011.5984%2016.35%2011.5984%2016.7V20.3H16.9984H18.1984H21.7984H22.9984H28.3984V16.7C28.3984%2016.35%2028.2859%2016.0625%2028.0609%2015.8375C27.8359%2015.6125%2027.5484%2015.5%2027.1984%2015.5H24.1984ZM28.3984%2021.5H22.9984V23.3C22.9984%2023.65%2022.8859%2023.9375%2022.6609%2024.1625C22.4359%2024.3875%2022.1484%2024.5%2021.7984%2024.5H18.1984C17.8484%2024.5%2017.5609%2024.3875%2017.3359%2024.1625C17.1109%2023.9375%2016.9984%2023.65%2016.9984%2023.3V21.5H11.5984V26.3C11.5984%2026.65%2011.7109%2026.9375%2011.9359%2027.1625C12.1609%2027.3875%2012.4484%2027.5%2012.7984%2027.5H27.1984C27.5484%2027.5%2027.8359%2027.3875%2028.0609%2027.1625C28.2859%2026.9375%2028.3984%2026.65%2028.3984%2026.3V21.5ZM18.1984%2021.5V23.3H21.7984V21.5H18.1984Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">
              <_Builtin.Block tag="div">{textRole}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-gray-600")}
                tag="div"
              >
                {textLocation}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isScheduleStatusVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-info-wrapps")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Schedule Status"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1119")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25%202C5.59375%202.03125%205.78125%202.21875%205.8125%202.5625V3.5H9.1875V2.5625C9.21875%202.21875%209.40625%202.03125%209.75%202C10.0938%202.03125%2010.2812%202.21875%2010.3125%202.5625V3.5H11.25C11.6719%203.51563%2012.0234%203.66406%2012.3047%203.94531C12.5859%204.22656%2012.7344%204.57812%2012.75%205V5.375V6.5V12.5C12.7344%2012.9219%2012.5859%2013.2734%2012.3047%2013.5547C12.0234%2013.8359%2011.6719%2013.9844%2011.25%2014H3.75C3.32812%2013.9844%202.97656%2013.8359%202.69531%2013.5547C2.41406%2013.2734%202.26562%2012.9219%202.25%2012.5V6.5V5.375V5C2.26562%204.57812%202.41406%204.22656%202.69531%203.94531C2.97656%203.66406%203.32812%203.51563%203.75%203.5H4.6875V2.5625C4.71875%202.21875%204.90625%202.03125%205.25%202ZM11.625%206.5H3.375V12.5C3.39062%2012.7344%203.51562%2012.8594%203.75%2012.875H11.25C11.4844%2012.8594%2011.6094%2012.7344%2011.625%2012.5V6.5ZM9.96094%208.96094L7.33594%2011.5859C7.07031%2011.8047%206.80469%2011.8047%206.53906%2011.5859L5.03906%2010.0859C4.82031%209.82031%204.82031%209.55469%205.03906%209.28906C5.30469%209.07031%205.57031%209.07031%205.83594%209.28906L6.9375%2010.3906L9.16406%208.16406C9.42969%207.94531%209.69531%207.94531%209.96094%208.16406C10.1797%208.42969%2010.1797%208.69531%209.96094%208.96094Z%22%20fill%3D%22%23144A75%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Confirmed"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Candidate confirmed schedule"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1165")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-1120",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickReschedule}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.539062%206.5625C0.195312%206.51562%200.015625%206.32031%200%205.97656V5.78906C0.09375%204.61719%200.539062%203.64844%201.33594%202.88281C2.14844%202.11719%203.14062%201.71875%204.3125%201.6875H7.125V0.84375C7.125%200.59375%207.20312%200.390625%207.35938%200.234375C7.51562%200.078125%207.71875%200%207.96875%200C8.17188%200%208.35156%200.0703125%208.50781%200.210938L10.3125%201.82812C10.4375%201.9375%2010.5%202.07813%2010.5%202.25C10.5%202.42187%2010.4375%202.5625%2010.3125%202.67188L8.50781%204.28906C8.35156%204.42969%208.17188%204.5%207.96875%204.5C7.73438%204.48438%207.53125%204.39844%207.35938%204.24219C7.20312%204.08594%207.125%203.89062%207.125%203.65625V2.8125H4.3125C3.4375%202.82813%202.70312%203.11719%202.10938%203.67969C1.51562%204.25781%201.1875%204.97656%201.125%205.83594V6.02344C1.07812%206.36719%200.882812%206.54688%200.539062%206.5625ZM8.25%203.02344L9.09375%202.25L8.25%201.5V3.02344ZM11.4609%205.4375C11.8047%205.48438%2011.9844%205.67969%2012%206.02344V6.21094C11.9062%207.38281%2011.4609%208.35156%2010.6641%209.11719C9.85156%209.88281%208.85938%2010.2812%207.6875%2010.3125H4.875V11.1562C4.875%2011.3906%204.79688%2011.5938%204.64062%2011.7656C4.48438%2011.9219%204.28125%2012%204.03125%2012C3.82812%2012%203.64844%2011.9297%203.49219%2011.7891L1.6875%2010.1719C1.5625%2010.0625%201.5%209.92188%201.5%209.75C1.5%209.57812%201.5625%209.4375%201.6875%209.32812L3.49219%207.71094C3.64844%207.57031%203.82812%207.5%204.03125%207.5C4.26562%207.51562%204.46875%207.60156%204.64062%207.75781C4.79688%207.91406%204.875%208.10938%204.875%208.34375V9.1875H7.6875C8.5625%209.17188%209.29688%208.88281%209.89062%208.32031C10.4844%207.74219%2010.8125%207.02344%2010.875%206.16406V5.97656C10.9219%205.63281%2011.1172%205.45312%2011.4609%205.4375ZM3.75%209L2.90625%209.75L3.75%2010.5234V9Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Reschedule"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-1164",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickCancel}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.75%200C4.09375%200.03125%204.28125%200.21875%204.3125%200.5625V1.5H7.6875V0.5625C7.71875%200.21875%207.90625%200.03125%208.25%200C8.59375%200.03125%208.78125%200.21875%208.8125%200.5625V1.5H9.75C10.1719%201.51563%2010.5234%201.66406%2010.8047%201.94531C11.0859%202.22656%2011.2344%202.57812%2011.25%203V3.375V4.5V10.5C11.2344%2010.9219%2011.0859%2011.2734%2010.8047%2011.5547C10.5234%2011.8359%2010.1719%2011.9844%209.75%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5V3.375V3C0.765625%202.57812%200.914062%202.22656%201.19531%201.94531C1.47656%201.66406%201.82812%201.51563%202.25%201.5H3.1875V0.5625C3.21875%200.21875%203.40625%200.03125%203.75%200ZM10.125%204.5H1.875V10.5C1.89062%2010.7344%202.01562%2010.8594%202.25%2010.875H9.75C9.98438%2010.8594%2010.1094%2010.7344%2010.125%2010.5V4.5ZM7.89844%206.58594L6.79688%207.6875L7.89844%208.78906C8.11719%209.05469%208.11719%209.32031%207.89844%209.58594C7.63281%209.80469%207.36719%209.80469%207.10156%209.58594L6%208.48438L4.89844%209.58594C4.63281%209.80469%204.36719%209.80469%204.10156%209.58594C3.88281%209.32031%203.88281%209.05469%204.10156%208.78906L5.20312%207.6875L4.10156%206.58594C3.88281%206.32031%203.88281%206.05469%204.10156%205.78906C4.36719%205.57031%204.63281%205.57031%204.89844%205.78906L6%206.89062L7.10156%205.78906C7.36719%205.57031%207.63281%205.57031%207.89844%205.78906C8.11719%206.05469%208.11719%206.32031%207.89844%206.58594Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-red-500")}
                  tag="div"
                >
                  {"Cancel Schedule"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isInterviewPlanVisible ? (
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Interview Plan"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1219")}
              tag="div"
            >
              {slotInterviewPlan}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1237")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {"Co-ordinator :"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">{slotAvatarWithName}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isScheduleCompletedVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-info-wrapps")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Schedule Status"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1119", "green")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%203.125C6.60938%203.125%205.79688%203.34375%205.0625%203.78125C4.32812%204.20312%203.73438%204.79688%203.28125%205.5625C2.84375%206.32812%202.625%207.14062%202.625%208C2.625%208.85938%202.84375%209.67188%203.28125%2010.4375C3.73438%2011.2031%204.32812%2011.7969%205.0625%2012.2188C5.79688%2012.6562%206.60938%2012.875%207.5%2012.875C8.39062%2012.875%209.20312%2012.6562%209.9375%2012.2188C10.6719%2011.7969%2011.2656%2011.2031%2011.7188%2010.4375C12.1562%209.67188%2012.375%208.85938%2012.375%208C12.375%207.14062%2012.1562%206.32812%2011.7188%205.5625C11.2656%204.79688%2010.6719%204.20312%209.9375%203.78125C9.20312%203.34375%208.39062%203.125%207.5%203.125ZM7.5%2014C6.40625%2013.9844%205.40625%2013.7188%204.5%2013.2031C3.59375%2012.6719%202.85938%2011.9375%202.29688%2011C1.76562%2010.0469%201.5%209.04688%201.5%208C1.5%206.95312%201.76562%205.95312%202.29688%205C2.85938%204.0625%203.59375%203.32813%204.5%202.79688C5.40625%202.28125%206.40625%202.01563%207.5%202C8.59375%202.01563%209.59375%202.28125%2010.5%202.79688C11.4062%203.32813%2012.1406%204.0625%2012.7031%205C13.2344%205.95312%2013.5%206.95312%2013.5%208C13.5%209.04688%2013.2344%2010.0469%2012.7031%2011C12.1406%2011.9375%2011.4062%2012.6719%2010.5%2013.2031C9.59375%2013.7188%208.59375%2013.9844%207.5%2014ZM10.1484%206.89844L7.14844%209.89844C6.88281%2010.1172%206.61719%2010.1172%206.35156%209.89844L4.85156%208.39844C4.63281%208.13281%204.63281%207.86719%204.85156%207.60156C5.11719%207.38281%205.38281%207.38281%205.64844%207.60156L6.75%208.70312L9.35156%206.10156C9.61719%205.88281%209.88281%205.88281%2010.1484%206.10156C10.3672%206.36719%2010.3672%206.63281%2010.1484%206.89844Z%22%20fill%3D%22%23186146%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Completed"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textCompleted}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isScheduleCancelVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-info-wrapps")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Schedule Status"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1119", "red")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.5234%2011.8203L3.67969%204.97656C2.99219%205.82031%202.64062%206.82812%202.625%208C2.65625%209.375%203.13281%2010.5234%204.05469%2011.4453C4.97656%2012.3672%206.125%2012.8438%207.5%2012.875C8.67188%2012.8594%209.67969%2012.5078%2010.5234%2011.8203ZM11.3203%2011.0234C12.0078%2010.1797%2012.3594%209.17188%2012.375%208C12.3438%206.625%2011.8672%205.47656%2010.9453%204.55469C10.0234%203.63281%208.875%203.15625%207.5%203.125C6.32812%203.14063%205.32031%203.49219%204.47656%204.17969L11.3203%2011.0234ZM1.5%208C1.51562%206.90625%201.78125%205.90625%202.29688%205C2.82812%204.09375%203.5625%203.35938%204.5%202.79688C5.45312%202.26562%206.45312%202%207.5%202C8.54688%202%209.54688%202.26562%2010.5%202.79688C11.4375%203.35938%2012.1719%204.09375%2012.7031%205C13.2188%205.90625%2013.4844%206.90625%2013.5%208C13.4844%209.09375%2013.2188%2010.0938%2012.7031%2011C12.1719%2011.9062%2011.4375%2012.6406%2010.5%2013.2031C9.54688%2013.7344%208.54688%2014%207.5%2014C6.45312%2014%205.45312%2013.7344%204.5%2013.2031C3.5625%2012.6406%202.82812%2011.9062%202.29688%2011C1.78125%2010.0938%201.51562%209.09375%201.5%208Z%22%20fill%3D%22%238C232C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Cancelled"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textScheduleCancelled}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1165")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-1120",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickReschedule}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.539062%206.5625C0.195312%206.51562%200.015625%206.32031%200%205.97656V5.78906C0.09375%204.61719%200.539062%203.64844%201.33594%202.88281C2.14844%202.11719%203.14062%201.71875%204.3125%201.6875H7.125V0.84375C7.125%200.59375%207.20312%200.390625%207.35938%200.234375C7.51562%200.078125%207.71875%200%207.96875%200C8.17188%200%208.35156%200.0703125%208.50781%200.210938L10.3125%201.82812C10.4375%201.9375%2010.5%202.07813%2010.5%202.25C10.5%202.42187%2010.4375%202.5625%2010.3125%202.67188L8.50781%204.28906C8.35156%204.42969%208.17188%204.5%207.96875%204.5C7.73438%204.48438%207.53125%204.39844%207.35938%204.24219C7.20312%204.08594%207.125%203.89062%207.125%203.65625V2.8125H4.3125C3.4375%202.82813%202.70312%203.11719%202.10938%203.67969C1.51562%204.25781%201.1875%204.97656%201.125%205.83594V6.02344C1.07812%206.36719%200.882812%206.54688%200.539062%206.5625ZM8.25%203.02344L9.09375%202.25L8.25%201.5V3.02344ZM11.4609%205.4375C11.8047%205.48438%2011.9844%205.67969%2012%206.02344V6.21094C11.9062%207.38281%2011.4609%208.35156%2010.6641%209.11719C9.85156%209.88281%208.85938%2010.2812%207.6875%2010.3125H4.875V11.1562C4.875%2011.3906%204.79688%2011.5938%204.64062%2011.7656C4.48438%2011.9219%204.28125%2012%204.03125%2012C3.82812%2012%203.64844%2011.9297%203.49219%2011.7891L1.6875%2010.1719C1.5625%2010.0625%201.5%209.92188%201.5%209.75C1.5%209.57812%201.5625%209.4375%201.6875%209.32812L3.49219%207.71094C3.64844%207.57031%203.82812%207.5%204.03125%207.5C4.26562%207.51562%204.46875%207.60156%204.64062%207.75781C4.79688%207.91406%204.875%208.10938%204.875%208.34375V9.1875H7.6875C8.5625%209.17188%209.29688%208.88281%209.89062%208.32031C10.4844%207.74219%2010.8125%207.02344%2010.875%206.16406V5.97656C10.9219%205.63281%2011.1172%205.45312%2011.4609%205.4375ZM3.75%209L2.90625%209.75L3.75%2010.5234V9Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Reschedule"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
