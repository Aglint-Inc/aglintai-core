import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { DetailedFeedbackCardSmall } from "./DetailedFeedbackCardSmall";
import { InterviewAiTranscriptCard } from "./InterviewAiTranscriptCard";
import { InterviewCandidateCard } from "./InterviewCandidateCard";
import * as _utils from "./utils";
import _styles from "./InterviewDetailedFeedback.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1440":{"id":"e-1440","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1441"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284623076},"e-1441":{"id":"e-1441","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1440"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284623078},"e-1442":{"id":"e-1442","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1443"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284775571},"e-1443":{"id":"e-1443","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1442"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284775574},"e-1528":{"id":"e-1528","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1529"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1529":{"id":"e-1529","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1528"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1530":{"id":"e-1530","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1531"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1531":{"id":"e-1531","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1530"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1532":{"id":"e-1532","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1533"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1533":{"id":"e-1533","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1532"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1534":{"id":"e-1534","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1535"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1535":{"id":"e-1535","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1534"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816}},"actionLists":{"a-518":{"id":"a-518","title":"Job Candidate tooltip hover in","actionItemGroups":[{"actionItems":[{"id":"a-518-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-518-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-518-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-518-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-519":{"id":"a-519","title":"Job Candidate tooltip hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-519-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-519-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581},"a-528":{"id":"a-528","title":"Job Candidate tooltip hover in 3","actionItemGroups":[{"actionItems":[{"id":"a-528-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-528-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-528-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-528-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-529":{"id":"a-529","title":"Job Candidate tooltip hover in 4","actionItemGroups":[{"actionItems":[{"id":"a-529-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-529-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewDetailedFeedback({
  as: _Component = _Builtin.Block,
  slotCandidateImage,
  textMail = "dianerussel@example.com",
  textName = "Dianne Russell",
  slotDetailedFeedback,
  slotTranscript,
  onClickClose = {},
  onClickNext = {},
  onClickPrev = {},
  onClickBack = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cv-sidebar-details-block")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-details-header")}
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
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-644")}
          tag="div"
        >
          <_Builtin.Block tag="div" />
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-header-nav-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cvs-header-nav-icon",
                "clickable",
                "bg-white"
              )}
              data-w-id="c444856c-2729-4453-1f48-2d50bb33d30c"
              tag="div"
              {...onClickPrev}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%227%22%20height%3D%2213%22%20viewBox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.242188%206.41406C0.169271%206.30469%200.169271%206.19531%200.242188%206.08594L6.14844%200.179688C6.25781%200.106771%206.36719%200.106771%206.47656%200.179688C6.54948%200.289062%206.54948%200.398438%206.47656%200.507812L0.707031%206.25L6.47656%2011.9922C6.54948%2012.1016%206.54948%2012.2109%206.47656%2012.3203C6.36719%2012.3932%206.25781%2012.3932%206.14844%2012.3203L0.242188%206.41406Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow-tooltips-drawer")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + ←"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cvs-header-nav-icon",
                "clickable",
                "bg-white"
              )}
              data-w-id="c444856c-2729-4453-1f48-2d50bb33d311"
              tag="div"
              {...onClickNext}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%227%22%20height%3D%2213%22%20viewBox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75781%206.58594C6.83073%206.69531%206.83073%206.80469%206.75781%206.91406L0.851562%2012.8203C0.742188%2012.8932%200.632812%2012.8932%200.523438%2012.8203C0.450521%2012.7109%200.450521%2012.6016%200.523438%2012.4922L6.29297%206.75L0.523438%201.00781C0.450521%200.898438%200.450521%200.789062%200.523438%200.679688C0.632812%200.606771%200.742188%200.606771%200.851562%200.679688L6.75781%206.58594Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow-tooltips-drawer")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + →"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-details-main")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cvs-intro-profile-block", "horizont")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-797", "cursor-pointer")}
            tag="div"
            {...onClickBack}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.39395%206.60625C3.26895%206.46875%203.26895%206.33125%203.39395%206.19375L6.99395%202.59375C7.13145%202.46875%207.26895%202.46875%207.40645%202.59375C7.53145%202.73125%207.53145%202.86875%207.40645%203.00625L4.03145%206.4L7.40645%209.79375C7.53145%209.93125%207.53145%2010.0688%207.40645%2010.2063C7.26895%2010.3313%207.13145%2010.3313%206.99395%2010.2063L3.39395%206.60625Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-intro-profile-info")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-490")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Interview Detailed feedback"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-519")}
          tag="div"
        >
          {slotDetailedFeedback ?? <DetailedFeedbackCardSmall />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-494")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
            tag="div"
          >
            {"Transcript"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-495")}
            tag="div"
          >
            {slotTranscript ?? (
              <>
                <InterviewAiTranscriptCard />
                <InterviewCandidateCard />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
