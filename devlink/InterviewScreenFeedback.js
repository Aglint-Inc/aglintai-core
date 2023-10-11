import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { InterviewResult } from "./InterviewResult";
import { DetailedFeedbackCard } from "./DetailedFeedbackCard";
import { ResumeResult } from "./ResumeResult";
import * as _utils from "./utils";
import _styles from "./InterviewScreenFeedback.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewScreenFeedback({
  as: _Component = _Builtin.Block,
  slotCompanyLogo,
  onClickCopyProfile = {},
  slotFeedbackCard,
  slotProfileImage,
  textName = "Mariana Diaz",
  textRole = "This is some text inside of a div block.",
  textMail = "This is some text inside of a div block.",
  textDate = "23 September 2023",
  textDuration = "5 Minutes 34 seconds",
  textTime = "10:15 AM",
  textNumberQuestion = "10",
  slotDetailedFeedback,
  textPhone = "This is some text inside of a div block.",
  slotInterviewResult,
  slotResumeResult,
  isInterviewResultVisible = true,
  isResumeResultVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview-screen-feedback-wrappers")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-377")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "nav-new-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-company-interview-logo")}
            tag="div"
          >
            {slotCompanyLogo}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-298")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "aui-button-wrap")}
                tag="div"
                tabIndex=""
                {...onClickCopyProfile}
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "aui-button",
                    "is-small",
                    "is-button-outlined"
                  )}
                  tag="div"
                  tabIndex=""
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "button-icon", "is-large")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2456_113832%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2456_113832)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    {"Copy Profile URL"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "container-878")} tag="div">
        {slotFeedbackCard ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-381")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "all-profile-left-info")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "profile-cards-wrappers")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "profile-category-tag")}
                  tag="div"
                >
                  {"Candidate Info"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "profile-card-wrappers-left")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot-image-profile")}
                    tag="div"
                  >
                    {slotProfileImage}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "profile-content")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                      tag="div"
                    >
                      {textName}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-grey-700")}
                      tag="div"
                    >
                      {textRole}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "profile-mail-wrappers")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11%201H0.999996C0.447713%201%200%201.44771%200%202V9.99996C0%2010.5522%200.447713%2011%200.999996%2011H11C11.5522%2011%2011.9999%2010.5522%2011.9999%209.99996V2C11.9999%201.44771%2011.5522%201%2011%201ZM0.999973%202.70683V9.29315L3.14668%207.14645C3.34194%206.95118%203.65852%206.95118%203.85378%207.14645C4.04904%207.34171%204.04904%207.65829%203.85378%207.85355L1.70761%209.99972H10.2929L8.14669%207.85355C7.95143%207.65829%207.95143%207.34171%208.14669%207.14645C8.34195%206.95118%208.65853%206.95118%208.85379%207.14645L10.9999%209.29258V2.70813L6.71522%207.00208C6.52745%207.19139%206.27186%207.29787%206.00522%207.29787C5.73858%207.29787%205.48299%207.19139%205.29667%207.00353L0.999973%202.70683ZM10.2941%201.99976H1.70711L6.00522%206.29788L10.2941%201.99976Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E" />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-grey-700")}
                        tag="div"
                      >
                        {textMail}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "profile-mail-wrappers")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%200H9C9.55228%200%2010%200.447715%2010%201V11C10%2011.5523%209.55228%2012%209%2012H3C2.44772%2012%202%2011.5523%202%2011V1C2%200.447715%202.44772%200%203%200ZM3.00049%209V1.99805H9.00049V9H3.00049ZM7.00049%2011.002H5.00049C4.70049%2011.002%204.50049%2010.802%204.50049%2010.502C4.50049%2010.202%204.70049%2010.002%205.00049%2010.002H7.00049C7.30049%2010.002%207.50049%2010.202%207.50049%2010.502C7.50049%2010.802%207.30049%2011.002%207.00049%2011.002Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E" />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-grey-700")}
                        tag="div"
                      >
                        {textPhone}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              {isInterviewResultVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "interview-details-wrappers")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "profile-category-tag")}
                    tag="div"
                  >
                    {"Interview Details"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "interview-screen-date-wrappers"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "interview-date-left")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "date-all-wrappers")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "date-wrappers-feed")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M5.99992%200.666016V1.99935H9.99992V0.666016H11.3333V1.99935H13.9999C14.3681%201.99935%2014.6666%202.29783%2014.6666%202.66602V13.3327C14.6666%2013.7009%2014.3681%2013.9993%2013.9999%2013.9993H1.99992C1.63173%2013.9993%201.33325%2013.7009%201.33325%2013.3327V2.66602C1.33325%202.29783%201.63173%201.99935%201.99992%201.99935H4.66658V0.666016H5.99992ZM13.3333%207.33268H2.66659V12.666H13.3333V7.33268ZM4.66658%203.33268H2.66659V5.99935H13.3333V3.33268H11.3333V4.66602H9.99992V3.33268H5.99992V4.66602H4.66658V3.33268Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-grey-600")}
                            tag="div"
                          >
                            {"Date"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "fw-semibold",
                            "color-blue-800"
                          )}
                          tag="div"
                        >
                          {textDate}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "date-all-wrappers")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "date-wrappers-feed")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M7.99967%2014.6693C4.31777%2014.6693%201.33301%2011.6845%201.33301%208.0026C1.33301%204.3207%204.31777%201.33594%207.99967%201.33594C11.6815%201.33594%2014.6663%204.3207%2014.6663%208.0026C14.6663%2011.6845%2011.6815%2014.6693%207.99967%2014.6693ZM7.99967%2013.3359C10.9452%2013.3359%2013.333%2010.9481%2013.333%208.0026C13.333%205.05708%2010.9452%202.66927%207.99967%202.66927C5.05415%202.66927%202.66634%205.05708%202.66634%208.0026C2.66634%2010.9481%205.05415%2013.3359%207.99967%2013.3359ZM8.66634%208.0026H11.333V9.33594H7.33301V4.66927H8.66634V8.0026Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-grey-600")}
                            tag="div"
                          >
                            {"Time"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "fw-semibold",
                            "color-blue-800"
                          )}
                          tag="div"
                        >
                          {textTime}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "interview-date-left")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "date-all-wrappers")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "date-wrappers-feed")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3.99984%202.66732H2.6665V1.33398H13.3332V2.66732H11.9998V4.00065C11.9998%205.0776%2011.4557%205.94377%2010.7706%206.65176C10.302%207.13598%209.73184%207.58198%209.15377%208.00065C9.73184%208.41932%2010.302%208.86532%2010.7706%209.34952C11.4557%2010.0575%2011.9998%2010.9237%2011.9998%2012.0007V13.334H13.3332V14.6673H2.6665V13.334H3.99984V12.0007C3.99984%2010.9237%204.54394%2010.0575%205.2291%209.34952C5.69772%208.86532%206.26785%208.41932%206.8459%208.00065C6.26785%207.58198%205.69772%207.13598%205.2291%206.65176C4.54394%205.94377%203.99984%205.0776%203.99984%204.00065V2.66732ZM5.33317%202.66732V4.00065C5.33317%204.59036%205.6224%205.14086%206.18724%205.72454C6.67184%206.22531%207.30304%206.69385%207.99984%207.18605C8.69664%206.69385%209.32784%206.22531%209.81244%205.72454C10.3773%205.14086%2010.6665%204.59036%2010.6665%204.00065V2.66732H5.33317ZM7.99984%208.81525C7.30304%209.30745%206.67184%209.77598%206.18724%2010.2768C5.6224%2010.8605%205.33317%2011.4109%205.33317%2012.0007V13.334H10.6665V12.0007C10.6665%2011.4109%2010.3773%2010.8605%209.81244%2010.2768C9.32784%209.77598%208.69664%209.30745%207.99984%208.81525Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-grey-600")}
                            tag="div"
                          >
                            {"Duration"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "fw-semibold",
                            "color-blue-800"
                          )}
                          tag="div"
                        >
                          {textDuration}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "date-all-wrappers")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "date-wrappers-feed")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3.8418%2011.3353H13.3333V3.33529H2.66659V12.2587L3.8418%2011.3353ZM4.30295%2012.6686L1.33325%2015.002V2.66862C1.33325%202.30043%201.63173%202.00195%201.99992%202.00195H13.9999C14.3681%202.00195%2014.6666%202.30043%2014.6666%202.66862V12.002C14.6666%2012.3702%2014.3681%2012.6686%2013.9999%2012.6686H4.30295ZM7.33325%209.33529H8.66658V10.6686H7.33325V9.33529ZM5.71146%205.87759C5.92417%204.80808%206.86792%204.00195%207.99992%204.00195C9.28858%204.00195%2010.3333%205.04662%2010.3333%206.33529C10.3333%207.62395%209.28858%208.66862%207.99992%208.66862H7.33325V7.33529H7.99992C8.55219%207.33529%208.99992%206.88755%208.99992%206.33529C8.99992%205.783%208.55219%205.33529%207.99992%205.33529C7.51478%205.33529%207.11032%205.68077%207.01912%206.13913L5.71146%205.87759Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-grey-600")}
                            tag="div"
                          >
                            {"Number of Questions"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "fw-semibold",
                            "color-blue-800"
                          )}
                          tag="div"
                        >
                          {textNumberQuestion}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isInterviewResultVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-interview-result-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-600")}
                    tag="div"
                  >
                    {"Interview Result"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot-interview-result")}
                    tag="div"
                  >
                    {slotInterviewResult ?? <InterviewResult />}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isInterviewResultVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "feedback-score-detailed")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-500")}
                    tag="div"
                  >
                    {"Detailed feedback"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot-detailed-feedback")}
                    tag="div"
                  >
                    {slotDetailedFeedback ?? <DetailedFeedbackCard />}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isResumeResultVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-resume-result-profile")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "profile-category-tag")}
                    tag="div"
                  >
                    {"Resume Results"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_resume-result")}
                    tag="div"
                  >
                    {slotResumeResult ?? <ResumeResult />}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "all-powered-wrappers")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "powered-wrappers")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-powered")}
                    tag="div"
                  >
                    {"Powered by"}
                  </_Builtin.Block>
                  <_Builtin.Image
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6515c71a265110c954626cb3_Frame%202%20(1).svg"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "activity-card-wrappers")}
              tag="div"
            />
          </_Builtin.Block>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
