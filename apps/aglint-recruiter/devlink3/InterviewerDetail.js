"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { NewTabPill } from "./NewTabPill";
import { InterviewerDetailOverview } from "./InterviewerDetailOverview";
import { TextWithIcon } from "./TextWithIcon";
import { UpcomingInterviewList } from "./UpcomingInterviewList";
import * as _utils from "./utils";
import _styles from "./InterviewerDetail.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-99":{"id":"e-99","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-72","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-100"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"48dc49b4-b6a7-0079-3fcc-fe0a232312e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"48dc49b4-b6a7-0079-3fcc-fe0a232312e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724165395241},"e-100":{"id":"e-100","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-73","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-99"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"48dc49b4-b6a7-0079-3fcc-fe0a232312e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"48dc49b4-b6a7-0079-3fcc-fe0a232312e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724165395241}},"actionLists":{"a-72":{"id":"a-72","title":"InterviewerDetail Info Hover In","actionItemGroups":[{"actionItems":[{"id":"a-72-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".id-details-right","selectorGuids":["0cd754d5-6eaa-6ed5-2765-8b49d58eafa5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-72-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".id-details-right","selectorGuids":["0cd754d5-6eaa-6ed5-2765-8b49d58eafa5"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1724165399483},"a-73":{"id":"a-73","title":"InterviewerDetail Info Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-73-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".id-details-right","selectorGuids":["0cd754d5-6eaa-6ed5-2765-8b49d58eafa5"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1724165399483}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewerDetail({
  as: _Component = _Builtin.Block,
  textInterviewerName = "Dileep B C",
  textDepartment = "Sales and operations",
  textTimeZone = "Asia, Kolkata, Chennai (GMT+5:30)",
  slotInterviewerAvatar,
  slotTabContent,
  slotNewTabPill,
  textMail = "dileep@aglinthq.com",
  textLocation = "San Fransisco, California",
  textRole = "Engineering",
  slotEditButton,
  onClickLinkedIn = {},
  isLinkedInVisible = true,
  textPhone = "Asia, Kolkata, Chennai (GMT+5:30)",
  textInterviewer = "dileep@aglinthq.com",
  slotUpcomingList,
  isUpcomingInterviewVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "interviewerdetail")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewerdetail-left")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer_basic_details")}
            data-w-id="48dc49b4-b6a7-0079-3fcc-fe0a232312e4"
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "id-name-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "interviewer_info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "interviewr_avatar")}
                  tag="div"
                >
                  {slotInterviewerAvatar ?? (
                    <_Builtin.Image
                      className={_utils.cx(_styles, "image_cover")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
                    />
                  )}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "id-details-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "interviewer_detail")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "id-name-wrappers")}
                      tag="div"
                    >
                      <Text
                        content={textInterviewerName}
                        weight="medium"
                        size="3"
                      />
                      {isLinkedInVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(_styles, "id-linkedin-wrap")}
                          tag="div"
                          {...onClickLinkedIn}
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%2216%22%20height%3D%2220%22%20viewBox%3D%220%200%2016%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.8571%201.99609H1.13929C0.510714%201.99609%200%202.51395%200%203.14967V16.8425C0%2017.4782%200.510714%2017.9961%201.13929%2017.9961H14.8571C15.4857%2017.9961%2016%2017.4782%2016%2016.8425V3.14967C16%202.51395%2015.4857%201.99609%2014.8571%201.99609ZM4.83571%2015.7104H2.46429V8.07467H4.83929V15.7104H4.83571ZM3.65%207.03181C2.88929%207.03181%202.275%206.41395%202.275%205.65681C2.275%204.89967%202.88929%204.28181%203.65%204.28181C4.40714%204.28181%205.025%204.89967%205.025%205.65681C5.025%206.41752%204.41071%207.03181%203.65%207.03181ZM13.725%2015.7104H11.3536V11.9961C11.3536%2011.1104%2011.3357%209.97109%2010.1214%209.97109C8.88571%209.97109%208.69643%2010.9354%208.69643%2011.9318V15.7104H6.325V8.07467H8.6V9.11752H8.63214C8.95%208.51752%209.725%207.88538%2010.8786%207.88538C13.2786%207.88538%2013.725%209.46752%2013.725%2011.5247V15.7104Z%22%20fill%3D%22%2363635E%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                      ) : null}
                    </_Builtin.Block>
                    <Text content={textDepartment} weight="" color="neutral" />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "flex_hr_auto")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "id-details-wrap")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "id-detail--item")}
                        tag="div"
                      >
                        <GlobalIcon iconName="corporate_fare " />
                        <Text content={textRole} weight="" />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "id-detail--item")}
                        tag="div"
                      >
                        <GlobalIcon iconName="location_on" />
                        <Text content={textLocation} weight="" />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "id-detail--item")}
                        tag="div"
                      >
                        <GlobalIcon iconName="public" />
                        <Text content={textTimeZone} weight="" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "id-details-wrap",
                        "bottom-details"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "id-detail--item")}
                        tag="div"
                      >
                        <GlobalIcon iconName="person" />
                        <Text content={textInterviewer} weight="" />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "id-detail--item")}
                        tag="div"
                      >
                        <GlobalIcon iconName="mail" />
                        <Text content={textMail} weight="" />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "id-detail--item")}
                        tag="div"
                      >
                        <GlobalIcon iconName="smartphone" />
                        <Text content={textPhone} weight="" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "id-details-right")}
                  tag="div"
                >
                  {slotEditButton}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "tab_wrapper")} tag="div">
          {slotNewTabPill ?? <NewTabPill isPillActive={true} />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_interviewer_detail_overview")}
          tag="div"
        >
          {slotTabContent ?? <InterviewerDetailOverview />}
        </_Builtin.Block>
      </_Builtin.Block>
      {isUpcomingInterviewVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer-detail-right")}
          id={_utils.cx(
            _styles,
            "w-node-d697b9d2-697e-1d44-8a38-92ee4bcede30-4e99ee91"
          )}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <TextWithIcon
              iconName="event_upcoming"
              fontWeight="medium"
              iconWeight="medium"
              textContent="Upcoming Interview"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-detail-right-list")}
            tag="div"
          >
            {slotUpcomingList ?? <UpcomingInterviewList />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
