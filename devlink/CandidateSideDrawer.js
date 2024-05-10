"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ViewTask } from "./ViewTask";
import { JdAnalysis } from "./JdAnalysis";
import { JdScreening } from "./JdScreening";
import { CandidateInterviewScore } from "./CandidateInterviewScore";
import { CandidateExperience } from "./CandidateExperience";
import { CandidateDetails } from "./CandidateDetails";
import * as _utils from "./utils";
import _styles from "./CandidateSideDrawer.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1440":{"id":"e-1440","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1441"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284623076},"e-1441":{"id":"e-1441","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1440"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284623078},"e-1442":{"id":"e-1442","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1443"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284775571},"e-1443":{"id":"e-1443","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1442"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284775574},"e-1528":{"id":"e-1528","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1529"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1529":{"id":"e-1529","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1528"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1530":{"id":"e-1530","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1531"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1531":{"id":"e-1531","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1530"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1532":{"id":"e-1532","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1533"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1533":{"id":"e-1533","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1532"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1534":{"id":"e-1534","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1535"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1535":{"id":"e-1535","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1534"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816}},"actionLists":{"a-518":{"id":"a-518","title":"Job Candidate tooltip hover in","actionItemGroups":[{"actionItems":[{"id":"a-518-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-518-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-518-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-518-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-519":{"id":"a-519","title":"Job Candidate tooltip hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-519-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-519-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581},"a-528":{"id":"a-528","title":"Job Candidate tooltip hover in 3","actionItemGroups":[{"actionItems":[{"id":"a-528-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-528-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-528-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-528-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-529":{"id":"a-529","title":"Job Candidate tooltip hover in 4","actionItemGroups":[{"actionItems":[{"id":"a-529-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-529-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateSideDrawer({
  as: _Component = _Builtin.Block,
  onClickPrev = {},
  onClickNext = {},
  onClickClose = {},
  slotCandidateImage,
  textName = "Dianne Russell",
  slotCandidateDetails,
  slotMoveTo,
  textAppliedOn = "This is some text inside of a div block.",
  isAppliedOnVisible = true,
  slotOverview,
  onClickResume = {},
  textRole = "Senior Software Engineer",
  textLocation = "Belarus, Belgium",
  isLocationVisible = true,
  isRoleVisible = true,
  isResumeVisible = true,
  isOverviewVisible = true,
  isLocationRoleVisible = true,
  slotSocialLink,
  isNavigationButtonVisible = true,
  isLeftRightVisible = true,
  isHeaderVisible = true,
  isNameImageVisible = false,
  isFullWidthVisible = false,
  isSmallWidthVisible = true,
  onClickPhoneScreening = {},
  isPhoneScreeningVisible = false,
  isBookMarkIconVisible = true,
  onClickBookmark = {},
  isBookMarked = false,
  onClickUnBook = {},
  slotViewTask,
  isViewTaskVisible = false,
  onClickLinkedin = {},
  isLinkedInVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candiate-side-drawer-wrapper")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-714")} tag="div">
        {isHeaderVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-sidebar-header-block", "heading")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-815")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-787")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cvs-intro-profile-image")}
                  tag="div"
                >
                  {slotCandidateImage}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold", "text-no-wrap")}
                  tag="div"
                >
                  {textName}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-969")}
                  tag="div"
                >
                  {isLinkedInVisible ? (
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2218%22%20height%3D%2218%22%20rx%3D%222.45455%22%20fill%3D%22%23347FBC%22%2F%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_10328_54119)%22%3E%0A%3Crect%20x%3D%221.38379%22%20y%3D%221.38477%22%20width%3D%2215.2308%22%20height%3D%2215.2308%22%20rx%3D%221.38462%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M15.5257%201.38477H2.46732C1.86897%201.38477%201.38281%201.87773%201.38281%202.48288V15.5174C1.38281%2016.1226%201.86897%2016.6155%202.46732%2016.6155H15.5257C16.124%2016.6155%2016.6136%2016.1226%2016.6136%2015.5174V2.48288C16.6136%201.87773%2016.124%201.38477%2015.5257%201.38477ZM5.98604%2014.4397H3.72862V7.1711H5.98944V14.4397H5.98604ZM4.85733%206.17838C4.13319%206.17838%203.54844%205.59023%203.54844%204.86948C3.54844%204.14874%204.13319%203.56059%204.85733%203.56059C5.57807%203.56059%206.16623%204.14874%206.16623%204.86948C6.16623%205.59363%205.58147%206.17838%204.85733%206.17838ZM14.448%2014.4397H12.1905V10.904C12.1905%2010.0609%2012.1735%208.97635%2011.0176%208.97635C9.84133%208.97635%209.66114%209.89428%209.66114%2010.8428V14.4397H7.40373V7.1711H9.56935V8.16382H9.59995C9.90252%207.59266%2010.6403%206.99091%2011.7384%206.99091C14.023%206.99091%2014.448%208.49699%2014.448%2010.4552V14.4397Z%22%20fill%3D%22%23347FBC%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_10328_54119%22%3E%0A%3Crect%20x%3D%221.38379%22%20y%3D%221.38477%22%20width%3D%2215.2308%22%20height%3D%2215.2308%22%20rx%3D%221.38462%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      {...onClickLinkedin}
                    />
                  ) : null}
                  {isResumeVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "resume-candidate-details")}
                      tag="div"
                      {...onClickResume}
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.5%201.5C1.51562%201.07812%201.66406%200.726562%201.94531%200.445312C2.22656%200.164062%202.57812%200.015625%203%200H6.75V3C6.75%203.21875%206.82031%203.39844%206.96094%203.53906C7.10156%203.67969%207.28125%203.75%207.5%203.75H10.5V10.5C10.4844%2010.9219%2010.3359%2011.2734%2010.0547%2011.5547C9.77344%2011.8359%209.42188%2011.9844%209%2012H3C2.57812%2011.9844%202.22656%2011.8359%201.94531%2011.5547C1.66406%2011.2734%201.51562%2010.9219%201.5%2010.5V1.5ZM10.5%203H7.5V0L10.5%203Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "text-blue-800"
                        )}
                        tag="div"
                      >
                        {"Resume"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
              {isNavigationButtonVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-644")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-968")}
                    tag="div"
                    {...onClickBookmark}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23F7F9FB%22%2F%3E%0A%3Cpath%20d%3D%22M7.25098%206.28125C7.2692%205.84375%207.41504%205.47917%207.68848%205.1875C7.98014%204.91406%208.34473%204.76823%208.78223%204.75H16.2197C16.6572%204.76823%2017.0218%204.91406%2017.3135%205.1875C17.5869%205.47917%2017.7327%205.84375%2017.751%206.28125V18.0391C17.7145%2018.4766%2017.4775%2018.7135%2017.04%2018.75C16.8942%2018.75%2016.7575%2018.7044%2016.6299%2018.6133L12.501%2015.7422L8.37207%2018.6133C8.26269%2018.7044%208.12598%2018.75%207.96191%2018.75C7.76139%2018.75%207.59733%2018.6771%207.46973%2018.5313C7.32389%2018.4036%207.25098%2018.2396%207.25098%2018.0391V6.28125ZM8.78223%205.1875C8.47233%205.1875%208.21712%205.29687%208.0166%205.51562C7.79785%205.71614%207.68848%205.97135%207.68848%206.28125V18.0391C7.7067%2018.2031%207.79785%2018.2943%207.96191%2018.3125C8.0166%2018.3125%208.07129%2018.2943%208.12598%2018.2578L12.3643%2015.2773C12.4554%2015.2409%2012.5465%2015.2409%2012.6377%2015.2773L16.876%2018.2578C16.9307%2018.2943%2016.9854%2018.3125%2017.04%2018.3125C17.2041%2018.2943%2017.2952%2018.2031%2017.3135%2018.0391V6.28125C17.3135%205.97135%2017.2041%205.71614%2016.9854%205.51562C16.7848%205.29687%2016.5296%205.1875%2016.2197%205.1875H8.78223Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    {isBookMarked ? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons", "bookmarked")}
                        value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2224%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23FFEEDB%22%2F%3E%0A%3Cpath%20d%3D%22M7.25098%206.0625C7.2692%205.69792%207.39681%205.38802%207.63379%205.13281C7.889%204.89583%208.19889%204.76823%208.56348%204.75H16.4385C16.8031%204.76823%2017.113%204.89583%2017.3682%205.13281C17.6051%205.38802%2017.7327%205.69792%2017.751%206.0625V18.0938C17.7145%2018.4948%2017.4958%2018.7135%2017.0947%2018.75C16.9489%2018.75%2016.8213%2018.7135%2016.7119%2018.6406L12.501%2015.6875L8.29004%2018.6406C8.18066%2018.7135%208.05306%2018.75%207.90723%2018.75C7.50618%2018.7135%207.28743%2018.4948%207.25098%2018.0938V6.0625Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{slotMoveTo}</_Builtin.Block>
                  {isLeftRightVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-header-nav-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cvs-header-nav-icon",
                          "clickable",
                          "bg-white",
                          "width-24"
                        )}
                        data-w-id="6f48177e-f948-6cb4-f8f5-030771445e68"
                        tag="div"
                        {...onClickPrev}
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon-embed")}
                          value="%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.74219%200.742188C4.91406%200.585938%205.08594%200.585938%205.25781%200.742188L9.75781%205.24219C9.91406%205.41406%209.91406%205.58594%209.75781%205.75781C9.58594%205.91406%209.41406%205.91406%209.24219%205.75781L5%201.53906L0.757812%205.75781C0.585938%205.91406%200.414062%205.91406%200.242188%205.75781C0.0859375%205.58594%200.0859375%205.41406%200.242188%205.24219L4.74219%200.742188Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "arrow-tooltips-drawer"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            {"Shift + ←"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cvs-header-nav-icon",
                          "clickable",
                          "bg-white",
                          "width-24"
                        )}
                        data-w-id="6f48177e-f948-6cb4-f8f5-030771445e6a"
                        tag="div"
                        {...onClickNext}
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon-embed")}
                          value="%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25781%205.25781C5.08594%205.41406%204.91406%205.41406%204.74219%205.25781L0.242188%200.757812C0.0859375%200.585938%200.0859375%200.414062%200.242188%200.242188C0.414062%200.0859375%200.585938%200.0859375%200.757812%200.242188L5%204.46094L9.24219%200.242188C9.41406%200.0859375%209.58594%200.0859375%209.75781%200.242188C9.91406%200.414062%209.91406%200.585938%209.75781%200.757812L5.25781%205.25781Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "arrow-tooltips-drawer"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            {"Shift + →"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cvs-header-close-button",
                      "cursor-pointer"
                    )}
                    tag="div"
                    {...onClickClose}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20width%3D%2211%22%20height%3D%2211%22%20viewBox%3D%220%200%2011%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.14082%209.76016L5.4002%206.04766L1.6877%209.76016C1.4627%209.92891%201.24707%209.92891%201.04082%209.76016C0.872071%209.55391%200.872071%209.34766%201.04082%209.14141L4.75332%205.40078L1.04082%201.68828C0.872071%201.46328%200.872071%201.24766%201.04082%201.04141C1.24707%200.872656%201.4627%200.872656%201.6877%201.04141L5.4002%204.75391L9.14082%201.04141C9.34707%200.872656%209.55332%200.872656%209.75957%201.04141C9.92832%201.24766%209.92832%201.46328%209.75957%201.68828L6.04707%205.40078L9.75957%209.14141C9.92832%209.34766%209.92832%209.55391%209.75957%209.76016C9.55332%209.92891%209.34707%209.92891%209.14082%209.76016Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-candiate-profile")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {isSmallWidthVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-sidebar-intro-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cvs-intro-profile-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-970")}
                    tag="div"
                  >
                    {isLocationRoleVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "div-block-789",
                          "width50"
                        )}
                        tag="div"
                      >
                        {isRoleVisible ? (
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-788")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.9%203.25V4.3H8.1V3.25C8.08542%203.03125%207.96875%202.91458%207.75%202.9H4.25C4.03125%202.91458%203.91458%203.03125%203.9%203.25ZM3.2%204.3V3.25C3.21458%202.95833%203.31667%202.71042%203.50625%202.50625C3.71042%202.31667%203.95833%202.21458%204.25%202.2H7.75C8.04167%202.21458%208.28958%202.31667%208.49375%202.50625C8.68333%202.71042%208.78542%202.95833%208.8%203.25V4.3H10.2C10.5938%204.31458%2010.9219%204.45312%2011.1844%204.71562C11.4469%204.97812%2011.5854%205.30625%2011.6%205.7V11.3C11.5854%2011.6937%2011.4469%2012.0219%2011.1844%2012.2844C10.9219%2012.5469%2010.5938%2012.6854%2010.2%2012.7H1.8C1.40625%2012.6854%201.07812%2012.5469%200.815625%2012.2844C0.553125%2012.0219%200.414583%2011.6937%200.4%2011.3V5.7C0.414583%205.30625%200.553125%204.97812%200.815625%204.71562C1.07812%204.45312%201.40625%204.31458%201.8%204.3H3.2ZM8.45%205H3.55H1.8C1.59583%205%201.42812%205.06562%201.29687%205.19687C1.16562%205.32812%201.1%205.49583%201.1%205.7V7.8H4.25H4.95H7.05H7.75H10.9V5.7C10.9%205.49583%2010.8344%205.32812%2010.7031%205.19687C10.5719%205.06562%2010.4042%205%2010.2%205H8.45ZM10.9%208.5H7.75V9.55C7.75%209.75417%207.68438%209.92187%207.55313%2010.0531C7.42188%2010.1844%207.25417%2010.25%207.05%2010.25H4.95C4.74583%2010.25%204.57812%2010.1844%204.44687%2010.0531C4.31562%209.92187%204.25%209.75417%204.25%209.55V8.5H1.1V11.3C1.1%2011.5042%201.16562%2011.6719%201.29687%2011.8031C1.42812%2011.9344%201.59583%2012%201.8%2012H10.2C10.4042%2012%2010.5719%2011.9344%2010.7031%2011.8031C10.8344%2011.6719%2010.9%2011.5042%2010.9%2011.3V8.5ZM4.95%208.5V9.55H7.05V8.5H4.95Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "text-grey-600")}
                              tag="div"
                            >
                              {textRole}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        ) : null}
                        {isLocationVisible ? (
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-788")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%229%22%20height%3D%2216%22%20viewBox%3D%220%200%209%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%206.4C7.97083%205.40833%207.62813%204.58437%206.97188%203.92812C6.31563%203.27187%205.49167%202.92917%204.5%202.9C3.50833%202.92917%202.68437%203.27187%202.02812%203.92812C1.37187%204.58437%201.02917%205.40833%201%206.4C1%206.75%201.12396%207.20937%201.37187%207.77812C1.61979%208.36146%201.93333%208.96667%202.3125%209.59375C2.69167%2010.2062%203.07812%2010.775%203.47187%2011.3C3.86562%2011.8396%204.20833%2012.2917%204.5%2012.6563C4.79167%2012.2917%205.13438%2011.8396%205.52813%2011.3C5.92188%2010.775%206.30833%2010.2062%206.6875%209.59375C7.08125%208.96667%207.40208%208.36146%207.65%207.77812C7.88333%207.20937%208%206.75%208%206.4ZM8.7%206.4C8.67083%207.05625%208.4375%207.81458%208%208.675C7.54792%209.53542%207.0375%2010.3667%206.46875%2011.1687C5.9%2011.9854%205.41875%2012.6344%205.025%2013.1156C4.87917%2013.2906%204.70417%2013.3781%204.5%2013.3781C4.29583%2013.3781%204.12083%2013.2906%203.975%2013.1156C3.58125%2012.6344%203.1%2011.9854%202.53125%2011.1687C1.9625%2010.3667%201.45208%209.53542%201%208.675C0.5625%207.81458%200.329166%207.05625%200.3%206.4C0.329166%205.20417%200.7375%204.2125%201.525%203.425C2.3125%202.6375%203.30417%202.22917%204.5%202.2C5.69583%202.22917%206.6875%202.6375%207.475%203.425C8.2625%204.2125%208.67083%205.20417%208.7%206.4ZM3.45%206.4C3.46458%206.79375%203.63958%207.1%203.975%207.31875C4.325%207.49375%204.675%207.49375%205.025%207.31875C5.36042%207.1%205.53542%206.79375%205.55%206.4C5.53542%206.00625%205.36042%205.7%205.025%205.48125C4.675%205.30625%204.325%205.30625%203.975%205.48125C3.63958%205.7%203.46458%206.00625%203.45%206.4ZM4.5%208.15C3.84375%208.13542%203.34062%207.84375%202.99062%207.275C2.66979%206.69167%202.66979%206.10833%202.99062%205.525C3.34062%204.95625%203.84375%204.66458%204.5%204.65C5.15625%204.66458%205.65938%204.95625%206.00938%205.525C6.33021%206.10833%206.33021%206.69167%206.00938%207.275C5.65938%207.84375%205.15625%208.13542%204.5%208.15Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "text-grey-600")}
                              tag="div"
                            >
                              {textLocation}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        ) : null}
                      </_Builtin.Block>
                    ) : null}
                    {isLocationRoleVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-789")}
                        tag="div"
                      >
                        {isRoleVisible ? (
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-788")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.9%203.25V4.3H8.1V3.25C8.08542%203.03125%207.96875%202.91458%207.75%202.9H4.25C4.03125%202.91458%203.91458%203.03125%203.9%203.25ZM3.2%204.3V3.25C3.21458%202.95833%203.31667%202.71042%203.50625%202.50625C3.71042%202.31667%203.95833%202.21458%204.25%202.2H7.75C8.04167%202.21458%208.28958%202.31667%208.49375%202.50625C8.68333%202.71042%208.78542%202.95833%208.8%203.25V4.3H10.2C10.5938%204.31458%2010.9219%204.45312%2011.1844%204.71562C11.4469%204.97812%2011.5854%205.30625%2011.6%205.7V11.3C11.5854%2011.6937%2011.4469%2012.0219%2011.1844%2012.2844C10.9219%2012.5469%2010.5938%2012.6854%2010.2%2012.7H1.8C1.40625%2012.6854%201.07812%2012.5469%200.815625%2012.2844C0.553125%2012.0219%200.414583%2011.6937%200.4%2011.3V5.7C0.414583%205.30625%200.553125%204.97812%200.815625%204.71562C1.07812%204.45312%201.40625%204.31458%201.8%204.3H3.2ZM8.45%205H3.55H1.8C1.59583%205%201.42812%205.06562%201.29687%205.19687C1.16562%205.32812%201.1%205.49583%201.1%205.7V7.8H4.25H4.95H7.05H7.75H10.9V5.7C10.9%205.49583%2010.8344%205.32812%2010.7031%205.19687C10.5719%205.06562%2010.4042%205%2010.2%205H8.45ZM10.9%208.5H7.75V9.55C7.75%209.75417%207.68438%209.92187%207.55313%2010.0531C7.42188%2010.1844%207.25417%2010.25%207.05%2010.25H4.95C4.74583%2010.25%204.57812%2010.1844%204.44687%2010.0531C4.31562%209.92187%204.25%209.75417%204.25%209.55V8.5H1.1V11.3C1.1%2011.5042%201.16562%2011.6719%201.29687%2011.8031C1.42812%2011.9344%201.59583%2012%201.8%2012H10.2C10.4042%2012%2010.5719%2011.9344%2010.7031%2011.8031C10.8344%2011.6719%2010.9%2011.5042%2010.9%2011.3V8.5ZM4.95%208.5V9.55H7.05V8.5H4.95Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "text-grey-600")}
                              tag="div"
                            >
                              {textRole}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        ) : null}
                        {isLocationVisible ? (
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-788")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%229%22%20height%3D%2216%22%20viewBox%3D%220%200%209%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%206.4C7.97083%205.40833%207.62813%204.58437%206.97188%203.92812C6.31563%203.27187%205.49167%202.92917%204.5%202.9C3.50833%202.92917%202.68437%203.27187%202.02812%203.92812C1.37187%204.58437%201.02917%205.40833%201%206.4C1%206.75%201.12396%207.20937%201.37187%207.77812C1.61979%208.36146%201.93333%208.96667%202.3125%209.59375C2.69167%2010.2062%203.07812%2010.775%203.47187%2011.3C3.86562%2011.8396%204.20833%2012.2917%204.5%2012.6563C4.79167%2012.2917%205.13438%2011.8396%205.52813%2011.3C5.92188%2010.775%206.30833%2010.2062%206.6875%209.59375C7.08125%208.96667%207.40208%208.36146%207.65%207.77812C7.88333%207.20937%208%206.75%208%206.4ZM8.7%206.4C8.67083%207.05625%208.4375%207.81458%208%208.675C7.54792%209.53542%207.0375%2010.3667%206.46875%2011.1687C5.9%2011.9854%205.41875%2012.6344%205.025%2013.1156C4.87917%2013.2906%204.70417%2013.3781%204.5%2013.3781C4.29583%2013.3781%204.12083%2013.2906%203.975%2013.1156C3.58125%2012.6344%203.1%2011.9854%202.53125%2011.1687C1.9625%2010.3667%201.45208%209.53542%201%208.675C0.5625%207.81458%200.329166%207.05625%200.3%206.4C0.329166%205.20417%200.7375%204.2125%201.525%203.425C2.3125%202.6375%203.30417%202.22917%204.5%202.2C5.69583%202.22917%206.6875%202.6375%207.475%203.425C8.2625%204.2125%208.67083%205.20417%208.7%206.4ZM3.45%206.4C3.46458%206.79375%203.63958%207.1%203.975%207.31875C4.325%207.49375%204.675%207.49375%205.025%207.31875C5.36042%207.1%205.53542%206.79375%205.55%206.4C5.53542%206.00625%205.36042%205.7%205.025%205.48125C4.675%205.30625%204.325%205.30625%203.975%205.48125C3.63958%205.7%203.46458%206.00625%203.45%206.4ZM4.5%208.15C3.84375%208.13542%203.34062%207.84375%202.99062%207.275C2.66979%206.69167%202.66979%206.10833%202.99062%205.525C3.34062%204.95625%203.84375%204.66458%204.5%204.65C5.15625%204.66458%205.65938%204.95625%206.00938%205.525C6.33021%206.10833%206.33021%206.69167%206.00938%207.275C5.65938%207.84375%205.15625%208.13542%204.5%208.15Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "text-grey-600")}
                              tag="div"
                            >
                              {textLocation}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        ) : null}
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cvs-intro-profile-info",
                      "hide"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-629")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-818")}
                        tag="div"
                      >
                        {slotSocialLink}
                      </_Builtin.Block>
                      {isResumeVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "resume-candidate-details"
                          )}
                          tag="div"
                          {...onClickResume}
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.5%201.5C1.51562%201.07812%201.66406%200.726562%201.94531%200.445312C2.22656%200.164062%202.57812%200.015625%203%200H6.75V3C6.75%203.21875%206.82031%203.39844%206.96094%203.53906C7.10156%203.67969%207.28125%203.75%207.5%203.75H10.5V10.5C10.4844%2010.9219%2010.3359%2011.2734%2010.0547%2011.5547C9.77344%2011.8359%209.42188%2011.9844%209%2012H3C2.57812%2011.9844%202.22656%2011.8359%201.94531%2011.5547C1.66406%2011.2734%201.51562%2010.9219%201.5%2010.5V1.5ZM10.5%203H7.5V0L10.5%203Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "text-blue-800"
                            )}
                            tag="div"
                          >
                            {"Resume"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      ) : null}
                      {isPhoneScreeningVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(_styles, "relative")}
                          tag="div"
                          {...onClickPhoneScreening}
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "email-outreach-button",
                              "p-4"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "text-email-out")}
                              tag="div"
                            >
                              {"Phone Screening"}
                            </_Builtin.Block>
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icons")}
                              value="%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.66328%200.225C5.82734%200.235937%205.91484%200.323437%205.92578%200.4875V4.1625C5.91484%204.32656%205.82734%204.41406%205.66328%204.425C5.49922%204.41406%205.41172%204.32656%205.40078%204.1625V1.12734L1.11875%205.39297C0.998437%205.50234%200.878125%205.50234%200.757812%205.39297C0.648437%205.27266%200.648437%205.15234%200.757812%205.03203L5.02344%200.75H1.98828C1.82422%200.739062%201.73672%200.651562%201.72578%200.4875C1.73672%200.323437%201.82422%200.235937%201.98828%200.225H5.66328Z%22%20fill%3D%22%23A81897%22%20style%3D%22fill%3A%23A81897%3Bfill%3Acolor(display-p3%200.6588%200.0941%200.5922)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      ) : null}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block tag="div" />
              </_Builtin.Block>
            ) : null}
            {isFullWidthVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-sidebar-intro-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cvs-intro-profile-block",
                    "width-600"
                  )}
                  tag="div"
                >
                  {isNameImageVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-787")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cvs-intro-profile-image"
                        )}
                        tag="div"
                      >
                        {slotCandidateImage}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "fw-semibold",
                          "text-no-wrap"
                        )}
                        tag="div"
                      >
                        {textName}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                  {isLocationRoleVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-789")}
                      tag="div"
                    >
                      {isRoleVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-788")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.9%203.25V4.3H8.1V3.25C8.08542%203.03125%207.96875%202.91458%207.75%202.9H4.25C4.03125%202.91458%203.91458%203.03125%203.9%203.25ZM3.2%204.3V3.25C3.21458%202.95833%203.31667%202.71042%203.50625%202.50625C3.71042%202.31667%203.95833%202.21458%204.25%202.2H7.75C8.04167%202.21458%208.28958%202.31667%208.49375%202.50625C8.68333%202.71042%208.78542%202.95833%208.8%203.25V4.3H10.2C10.5938%204.31458%2010.9219%204.45312%2011.1844%204.71562C11.4469%204.97812%2011.5854%205.30625%2011.6%205.7V11.3C11.5854%2011.6937%2011.4469%2012.0219%2011.1844%2012.2844C10.9219%2012.5469%2010.5938%2012.6854%2010.2%2012.7H1.8C1.40625%2012.6854%201.07812%2012.5469%200.815625%2012.2844C0.553125%2012.0219%200.414583%2011.6937%200.4%2011.3V5.7C0.414583%205.30625%200.553125%204.97812%200.815625%204.71562C1.07812%204.45312%201.40625%204.31458%201.8%204.3H3.2ZM8.45%205H3.55H1.8C1.59583%205%201.42812%205.06562%201.29687%205.19687C1.16562%205.32812%201.1%205.49583%201.1%205.7V7.8H4.25H4.95H7.05H7.75H10.9V5.7C10.9%205.49583%2010.8344%205.32812%2010.7031%205.19687C10.5719%205.06562%2010.4042%205%2010.2%205H8.45ZM10.9%208.5H7.75V9.55C7.75%209.75417%207.68438%209.92187%207.55313%2010.0531C7.42188%2010.1844%207.25417%2010.25%207.05%2010.25H4.95C4.74583%2010.25%204.57812%2010.1844%204.44687%2010.0531C4.31562%209.92187%204.25%209.75417%204.25%209.55V8.5H1.1V11.3C1.1%2011.5042%201.16562%2011.6719%201.29687%2011.8031C1.42812%2011.9344%201.59583%2012%201.8%2012H10.2C10.4042%2012%2010.5719%2011.9344%2010.7031%2011.8031C10.8344%2011.6719%2010.9%2011.5042%2010.9%2011.3V8.5ZM4.95%208.5V9.55H7.05V8.5H4.95Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-grey-600")}
                            tag="div"
                          >
                            {textRole}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      ) : null}
                      {isLocationVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-788")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%229%22%20height%3D%2216%22%20viewBox%3D%220%200%209%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%206.4C7.97083%205.40833%207.62813%204.58437%206.97188%203.92812C6.31563%203.27187%205.49167%202.92917%204.5%202.9C3.50833%202.92917%202.68437%203.27187%202.02812%203.92812C1.37187%204.58437%201.02917%205.40833%201%206.4C1%206.75%201.12396%207.20937%201.37187%207.77812C1.61979%208.36146%201.93333%208.96667%202.3125%209.59375C2.69167%2010.2062%203.07812%2010.775%203.47187%2011.3C3.86562%2011.8396%204.20833%2012.2917%204.5%2012.6563C4.79167%2012.2917%205.13438%2011.8396%205.52813%2011.3C5.92188%2010.775%206.30833%2010.2062%206.6875%209.59375C7.08125%208.96667%207.40208%208.36146%207.65%207.77812C7.88333%207.20937%208%206.75%208%206.4ZM8.7%206.4C8.67083%207.05625%208.4375%207.81458%208%208.675C7.54792%209.53542%207.0375%2010.3667%206.46875%2011.1687C5.9%2011.9854%205.41875%2012.6344%205.025%2013.1156C4.87917%2013.2906%204.70417%2013.3781%204.5%2013.3781C4.29583%2013.3781%204.12083%2013.2906%203.975%2013.1156C3.58125%2012.6344%203.1%2011.9854%202.53125%2011.1687C1.9625%2010.3667%201.45208%209.53542%201%208.675C0.5625%207.81458%200.329166%207.05625%200.3%206.4C0.329166%205.20417%200.7375%204.2125%201.525%203.425C2.3125%202.6375%203.30417%202.22917%204.5%202.2C5.69583%202.22917%206.6875%202.6375%207.475%203.425C8.2625%204.2125%208.67083%205.20417%208.7%206.4ZM3.45%206.4C3.46458%206.79375%203.63958%207.1%203.975%207.31875C4.325%207.49375%204.675%207.49375%205.025%207.31875C5.36042%207.1%205.53542%206.79375%205.55%206.4C5.53542%206.00625%205.36042%205.7%205.025%205.48125C4.675%205.30625%204.325%205.30625%203.975%205.48125C3.63958%205.7%203.46458%206.00625%203.45%206.4ZM4.5%208.15C3.84375%208.13542%203.34062%207.84375%202.99062%207.275C2.66979%206.69167%202.66979%206.10833%202.99062%205.525C3.34062%204.95625%203.84375%204.66458%204.5%204.65C5.15625%204.66458%205.65938%204.95625%206.00938%205.525C6.33021%206.10833%206.33021%206.69167%206.00938%207.275C5.65938%207.84375%205.15625%208.13542%204.5%208.15Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-grey-600")}
                            tag="div"
                          >
                            {textLocation}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      ) : null}
                    </_Builtin.Block>
                  ) : null}
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cvs-intro-profile-info")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-629")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-818")}
                        tag="div"
                      >
                        {slotSocialLink}
                      </_Builtin.Block>
                      {isResumeVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "resume-candidate-details"
                          )}
                          tag="div"
                          {...onClickResume}
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.5%201.5C1.51562%201.07812%201.66406%200.726562%201.94531%200.445312C2.22656%200.164062%202.57812%200.015625%203%200H6.75V3C6.75%203.21875%206.82031%203.39844%206.96094%203.53906C7.10156%203.67969%207.28125%203.75%207.5%203.75H10.5V10.5C10.4844%2010.9219%2010.3359%2011.2734%2010.0547%2011.5547C9.77344%2011.8359%209.42188%2011.9844%209%2012H3C2.57812%2011.9844%202.22656%2011.8359%201.94531%2011.5547C1.66406%2011.2734%201.51562%2010.9219%201.5%2010.5V1.5ZM10.5%203H7.5V0L10.5%203Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "text-blue-800"
                            )}
                            tag="div"
                          >
                            {"Resume"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      ) : null}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                {isOverviewVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-673", "width-600")}
                    tag="div"
                  >
                    {slotOverview}
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        {isViewTaskVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-958")}
            tag="div"
          >
            {slotViewTask ?? <ViewTask />}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-candidate-details")}
          tag="div"
        >
          {slotCandidateDetails ?? (
            <>
              <JdAnalysis />
              <JdScreening />
              <CandidateInterviewScore />
              <CandidateExperience />
              <CandidateDetails />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      {isAppliedOnVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-645")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.61723%203.60323C1.50235%203.77555%201.26953%203.82212%201.0972%203.70723C0.92488%203.59235%200.878315%203.35953%200.993197%203.1872C1.44066%202.51601%202.01601%201.94066%202.6872%201.4932C2.85953%201.37831%203.09235%201.42488%203.20723%201.5972C3.32212%201.76953%203.27555%202.00235%203.10323%202.11723C2.51442%202.50977%202.00977%203.01442%201.61723%203.60323ZM0.854926%207.55759C0.89634%207.76051%200.765409%207.95859%200.562485%208C0.359561%208.04141%200.161487%207.91048%200.120073%207.70756C0.0398175%207.3143%200%206.91414%200%206.50007C0%206.09251%200.0400122%205.69239%200.120073%205.30009C0.161487%205.09716%200.359561%204.96623%200.562485%205.00765C0.765409%205.04906%200.89634%205.24713%200.854926%205.45006C0.784988%205.79276%200.75%206.14264%200.75%206.50007C0.75%206.86413%200.784818%207.21406%200.854926%207.55759ZM3.10252%2010.8758C3.27504%2010.9904%203.322%2011.2232%203.20741%2011.3957C3.09282%2011.5682%202.86008%2011.6151%202.68756%2011.5006C2.01622%2011.0546%201.44193%2010.4776%200.999193%209.80419C0.885421%209.63113%200.933481%209.39861%201.10654%209.28484C1.2796%209.17107%201.51212%209.21913%201.62589%209.39218C2.01311%209.98117%202.51537%2010.4858%203.10252%2010.8758ZM7.05759%2011.6449C7.26051%2011.6034%207.45859%2011.7344%207.5%2011.9373C7.54142%2012.1402%207.41048%2012.3383%207.20756%2012.3797C6.81431%2012.46%206.41414%2012.4998%206.00008%2012.4998C5.58949%2012.4998%205.18163%2012.4592%204.79859%2012.3794C4.59584%2012.3372%204.46572%2012.1386%204.50796%2011.9358C4.5502%2011.733%204.74881%2011.6029%204.95156%2011.6452C5.28338%2011.7143%205.64003%2011.7498%206.00008%2011.7498C6.36414%2011.7498%206.71406%2011.715%207.05759%2011.6449ZM10.3835%209.3975C10.4984%209.22517%2010.7312%209.17861%2010.9035%209.29349C11.0758%209.40837%2011.1224%209.6412%2011.0075%209.81352C10.5601%2010.4847%209.98472%2011.0601%209.31352%2011.5075C9.1412%2011.6224%208.90837%2011.5758%208.79349%2011.4035C8.67861%2011.2312%208.72517%2010.9984%208.8975%2010.8835C9.4863%2010.491%209.99095%209.9863%2010.3835%209.3975ZM11.1452%205.45156C11.1029%205.24881%2011.233%205.0502%2011.4358%205.00796C11.6386%204.96572%2011.8372%205.09584%2011.8794%205.29859C11.9592%205.68163%2011.9998%206.08949%2011.9998%206.50008C11.9998%206.91066%2011.9592%207.31853%2011.8794%207.70156C11.8372%207.90431%2011.6386%208.03443%2011.4358%207.99219C11.233%207.94995%2011.1029%207.75135%2011.1452%207.54859C11.2143%207.21677%2011.2498%206.86012%2011.2498%206.50008C11.2498%206.14003%2011.2143%205.78338%2011.1452%205.45156ZM8.89017%202.11723C8.71785%202.00235%208.67128%201.76953%208.78617%201.5972C8.90105%201.42488%209.13387%201.37831%209.3062%201.4932C9.98265%201.94417%2010.5636%202.52106%2011.0077%203.1872C11.1226%203.35953%2011.076%203.59235%2010.9037%203.70723C10.7314%203.82212%2010.4985%203.77555%2010.3837%203.60323C9.995%203.02023%209.48497%202.51377%208.89017%202.11723ZM4.95156%201.35462C4.74881%201.39686%204.5502%201.26674%204.50796%201.06398C4.46572%200.861229%204.59584%200.662623%204.79859%200.620382C5.18163%200.540584%205.58949%200.5%206.00008%200.5C6.41066%200.5%206.81853%200.540584%207.20156%200.620382C7.40431%200.662623%207.53443%200.861229%207.49219%201.06398C7.44995%201.26674%207.25135%201.39686%207.04859%201.35462C6.71677%201.28549%206.36012%201.25%206.00008%201.25C5.64003%201.25%205.28338%201.28549%204.95156%201.35462Z%22%20fill%3D%22%2387929D%22%20style%3D%22fill%3A%2387929D%3Bfill%3Acolor(display-p3%200.5294%200.5725%200.6157)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Applied on"}</_Builtin.Block>
          <_Builtin.Block tag="div">{textAppliedOn}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
