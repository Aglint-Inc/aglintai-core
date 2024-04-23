import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { StatusBadge } from "./StatusBadge";
import { ScheduleInfoPlan } from "./ScheduleInfoPlan";
import * as _utils from "./utils";
import _styles from "./ScheduleInfoPending.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-141":{"id":"e-141","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-89","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560091},"e-142":{"id":"e-142","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-90","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-141"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711116560092},"e-143":{"id":"e-143","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-91","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-144"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"060ed27d-d611-fc60-5986-c253a6e2933e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711117013504}},"actionLists":{"a-89":{"id":"a-89","title":"copy-hover in invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-89-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}},{"id":"a-89-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-89-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"flex"}},{"id":"a-89-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-89-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}},{"id":"a-89-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711116769518},"a-90":{"id":"a-90","title":"copy-hover out invitation schedular","actionItemGroups":[{"actionItems":[{"id":"a-90-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":0,"unit":""}},{"id":"a-90-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1279","selectorGuids":["f3b9e718-5093-2bff-65a2-730e873c8f84"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711116769518},"a-91":{"id":"a-91","title":"CLick Copied Invitation Link","actionItemGroups":[{"actionItems":[{"id":"a-91-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"block"}},{"id":"a-91-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"none"}}]},{"actionItems":[{"id":"a-91-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copied","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","9252ac6e-77b5-8e17-c28a-254683bcd6bd"]},"value":"block"}},{"id":"a-91-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sm.copy","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe130","d5f9b086-8c8b-d31e-a39f-a50695a82c6a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711117027368}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScheduleInfoPending({
  as: _Component = _Builtin.Block,
  onClickRequest = {},
  slotProfileImage,
  textName = "Tom Odel",
  textRole = "Senior Software Engineer",
  textLocation = "Onsite , San Fransisco",
  onClickViewProfile = {},
  onClickCancelSchedule = {},
  isCancelSheduleVisible = true,
  slotScheduleInfoPlan,
  isConfirmedVisible = false,
  isPendingVisible = true,
  slotProvidedOption,
  textCurrentRole = "Senior Software Engineer",
  textEmail = "tomode3243@gmaIl.com",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "scheduled-info-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule-info-sub-wrap")}
        tag="div"
      >
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
          <StatusBadge isWaitingVisible={true} isConfirmedVisible={false} />
          {isConfirmedVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Candidate picked slots and interview is confirmed"}
            </_Builtin.Block>
          ) : null}
          {isPendingVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Waiting for candidate to choose"}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1165")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1120", "cursor-pointer")}
              tag="div"
              {...onClickRequest}
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
            {isCancelSheduleVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-1164",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickCancelSchedule}
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
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        {isConfirmedVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-info-wrapps", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Interview Plan"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1135")}
              tag="div"
            >
              {slotScheduleInfoPlan ?? <ScheduleInfoPlan />}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
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
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1196")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Provided Options"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "The candidate has received a link containing the following options. Once the candidate selects one of these options, the schedule will be confirmed."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1197")}
          tag="div"
        >
          {slotProvidedOption}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
