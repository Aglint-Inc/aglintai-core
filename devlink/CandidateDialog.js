import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { AddJobButton } from "./AddJobButton";
import { AddedJobList } from "./AddedJobList";
import { CandidateDetails } from "./CandidateDetails";
import * as _utils from "./utils";
import _styles from "./CandidateDialog.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1440":{"id":"e-1440","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1441"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284623076},"e-1441":{"id":"e-1441","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1440"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284623078},"e-1442":{"id":"e-1442","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1443"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284775571},"e-1443":{"id":"e-1443","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1442"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284775574},"e-1454":{"id":"e-1454","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1455"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad94","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad94","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700038932960},"e-1455":{"id":"e-1455","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1454"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad94","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad94","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700038932960},"e-1456":{"id":"e-1456","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1457"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad8f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad8f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700038932960},"e-1457":{"id":"e-1457","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1456"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad8f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad8f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700038932960}},"actionLists":{"a-518":{"id":"a-518","title":"Job Candidate tooltip hover in","actionItemGroups":[{"actionItems":[{"id":"a-518-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-518-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-518-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-518-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-519":{"id":"a-519","title":"Job Candidate tooltip hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-519-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-519-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581},"a-528":{"id":"a-528","title":"Job Candidate tooltip hover in 3","actionItemGroups":[{"actionItems":[{"id":"a-528-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-528-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-528-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-528-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-529":{"id":"a-529","title":"Job Candidate tooltip hover in 4","actionItemGroups":[{"actionItems":[{"id":"a-529-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-529-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDialog({
  as: _Component = _Builtin.Block,
  onClickPrev = {},
  onClickNext = {},
  onClickCopy = {},
  onClickClose = {},
  slotAvatar,
  textName = "Dianne Russell",
  textMail = "dianerussel@example.com",
  onClickLinkedin = {},
  textOverview = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  isOverviewVisible = true,
  textLocation = "Berlin, germany",
  textJobRoleAtCompany = "Software Engineer at Aglint",
  slotDetails,
  isStarActive = false,
  onClickStar = {},
  onClickViewResume = {},
  slotAddJob,
  arrowtooltiphide = false,
  isLinkedinVisible = true,
  isLocationVisible = true,
  slotAddedJobList,
  textJobCountwithJob = "1 job ",
  textJobCount = "1",
  isAddedToJobVisible = false,
  onClickDownloadResume = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candiate-side-drawer-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-sidebar-header-wrap")}
        tag="div"
      >
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
            data-w-id="8678ceb8-a929-4369-7ec7-1eaf5f29ad8f"
            tag="div"
            {...onClickPrev}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%227%22%20height%3D%2213%22%20viewBox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.242188%206.41406C0.169271%206.30469%200.169271%206.19531%200.242188%206.08594L6.14844%200.179688C6.25781%200.106771%206.36719%200.106771%206.47656%200.179688C6.54948%200.289062%206.54948%200.398438%206.47656%200.507812L0.707031%206.25L6.47656%2011.9922C6.54948%2012.1016%206.54948%2012.2109%206.47656%2012.3203C6.36719%2012.3932%206.25781%2012.3932%206.14844%2012.3203L0.242188%206.41406Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {arrowtooltiphide ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow-tooltips-drawer")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + ←"}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cvs-header-nav-icon",
              "clickable",
              "bg-white"
            )}
            data-w-id="8678ceb8-a929-4369-7ec7-1eaf5f29ad94"
            tag="div"
            {...onClickNext}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%227%22%20height%3D%2213%22%20viewBox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75781%206.58594C6.83073%206.69531%206.83073%206.80469%206.75781%206.91406L0.851562%2012.8203C0.742188%2012.8932%200.632812%2012.8932%200.523438%2012.8203C0.450521%2012.7109%200.450521%2012.6016%200.523438%2012.4922L6.29297%206.75L0.523438%201.00781C0.450521%200.898438%200.450521%200.789062%200.523438%200.679688C0.632812%200.606771%200.742188%200.606771%200.851562%200.679688L6.75781%206.58594Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {arrowtooltiphide ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow-tooltips-drawer")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + →"}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-577")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-header-copy-add-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cvs-header-copy-candi", "hide")}
              tag="div"
              {...onClickCopy}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2214%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3341_29946%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3341_29946)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-select-dropdown", "dropdown")}
              tag="div"
            >
              {slotAddJob ?? <AddJobButton />}
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
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3498_23410%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3498_23410)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-candiate-profile")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-sidebar-intro-wrapper-candi")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cvs-intro-profile-candi")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cvs-intro-profile-image")}
                tag="div"
              >
                {slotAvatar}
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
                    {textName}
                  </_Builtin.Block>
                  {isLinkedinVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "pointer")}
                      tag="div"
                      {...onClickLinkedin}
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2218%22%20viewBox%3D%220%200%2012%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M11.1429%201H0.854464C0.383036%201%200%201.3884%200%201.86519V12.1349C0%2012.6117%200.383036%2013.0001%200.854464%2013.0001H11.1429C11.6143%2013.0001%2012%2012.6117%2012%2012.1349V1.86519C12%201.3884%2011.6143%201%2011.1429%201ZM3.62679%2011.2858H1.84821V5.55897H3.62946V11.2858H3.62679ZM2.7375%204.77682C2.16696%204.77682%201.70625%204.31342%201.70625%203.74556C1.70625%203.1777%202.16696%202.7143%202.7375%202.7143C3.30536%202.7143%203.76875%203.1777%203.76875%203.74556C3.76875%204.3161%203.30804%204.77682%202.7375%204.77682ZM10.2937%2011.2858H8.51518V8.50007C8.51518%207.83578%208.50179%206.98131%207.59107%206.98131C6.66429%206.98131%206.52232%207.70453%206.52232%208.45186V11.2858H4.74375V5.55897H6.45V6.34112H6.47411C6.7125%205.89112%207.29375%205.41701%208.15893%205.41701C9.95893%205.41701%2010.2937%206.60362%2010.2937%208.1465V11.2858Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-600-3")}
                  tag="div"
                >
                  {textMail}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-card-header-right-candi")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-star-block")}
                  tag="div"
                  {...onClickStar}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewBox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.2776%2019.309C4.30316%2019.7962%203.15978%2019.0046%203.39333%2017.8422L4.79175%2012.4816L0.43115%208.9419C-0.333906%208.17685%200.046597%206.74996%201.20911%206.75118L6.81848%206.40059L8.89175%201.34838C9.16923%200.238476%2010.6911%200.238476%2011.2078%201.27908L13.1901%206.52645L18.7481%206.87496C19.9737%206.87496%2020.4786%208.38958%2019.5167%209.11043L15.2045%2012.6068L16.6044%2017.9734C16.8704%2019.0373%2015.6622%2019.7808%2014.6575%2019.274L9.99785%2016.2452L5.2776%2019.309ZM10.0776%201.73663L10.0674%201.7615C10.0718%201.75593%2010.0778%201.74974%2010.0776%201.73663ZM7.67912%207.59926L7.28801%207.6237L1.24902%207.99992C1.27552%207.99992%206.20543%2012.018%206.20543%2012.018L6.10378%2012.4077L4.61189%2018.1225C4.59747%2018.1946%204.64557%2018.2279%204.65841%2018.2259L9.99902%2014.7545L10.3396%2014.9759L15.2785%2018.1909C15.342%2018.2227%2015.3732%2018.2051%2015.3929%2018.2776L13.7926%2012.143L14.1054%2011.8894L18.749%208.12492C18.7685%208.1103%2012.307%207.72351%2012.307%207.72351L12.1644%207.34579L10.065%201.77943C10.0636%201.7767%207.67912%207.59926%207.67912%207.59926Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  {isStarActive ? (
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed", "absolute")}
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.3618%2019.4499C15.1243%2019.4499%2014.8868%2019.3874%2014.6868%2019.2499L9.99926%2016.2124L5.31176%2019.2499C4.87426%2019.5374%204.32426%2019.5124%203.89926%2019.2124C3.47559%2018.9107%203.28579%2018.3763%203.42426%2017.8749L4.86176%2012.4749L0.524264%208.94993C0.122975%208.62702%20-0.0363446%208.08932%200.124264%207.59993C0.286764%207.09993%200.724264%206.76243%201.24926%206.73743L6.82426%206.43743L8.83676%201.22493C9.02426%200.737427%209.47426%200.424927%209.99926%200.424927C10.5243%200.424927%2010.9743%200.737427%2011.1618%201.22493L13.1743%206.43743L18.7493%206.73743C19.2743%206.76243%2019.7118%207.09993%2019.8743%207.59993C20.0368%208.09993%2019.8743%208.62493%2019.4743%208.96243L15.1368%2012.4874L16.5743%2017.8874C16.7118%2018.3874%2016.5243%2018.9124%2016.0993%2019.2249C15.8868%2019.3624%2015.6243%2019.4499%2015.3618%2019.4499Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isAddedToJobVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cd-added-job-list")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-605")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cd-job-count-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "color-grey-600")}
                      tag="div"
                    >
                      {"Candidate added to"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "color-grey-600")}
                      tag="div"
                    >
                      {textJobCountwithJob}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "job-icon-count-wrap")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewBox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.05937%201.18099C4.94878%201.19678%204.88559%201.25998%204.86979%201.37057V2.31849H8.66146V1.37057C8.64566%201.25998%208.58247%201.19678%208.47188%201.18099H5.05937ZM3.73229%201.37057C3.74809%200.991402%203.87448%200.675429%204.11146%200.422652C4.36424%200.185672%204.68021%200.0592833%205.05937%200.0434847H8.47188C8.85104%200.0592833%209.16701%200.185672%209.41979%200.422652C9.65677%200.675429%209.78316%200.991402%209.79896%201.37057V2.31849H11.3156C11.7422%202.33428%2012.0977%202.48437%2012.382%202.76875C12.6664%203.05312%2012.8165%203.40859%2012.8323%203.83515V6.11015H8.28229H5.24896H0.698956V3.83515C0.714754%203.40859%200.864841%203.05312%201.14922%202.76875C1.43359%202.48437%201.78906%202.33428%202.21562%202.31849H3.73229V1.37057ZM12.8323%206.86849V9.90182C12.8165%2010.3284%2012.6664%2010.6839%2012.382%2010.9682C12.0977%2011.2526%2011.7422%2011.4027%2011.3156%2011.4185H2.21562C1.78906%2011.4027%201.43359%2011.2526%201.14922%2010.9682C0.864841%2010.6839%200.714754%2010.3284%200.698956%209.90182V6.86849H5.24896V7.62682C5.24896%207.848%205.32005%208.02969%205.46224%208.17187C5.60443%208.31406%205.78611%208.38516%206.00729%208.38516H7.52396C7.74514%208.38516%207.92682%208.31406%208.06901%208.17187C8.2112%208.02969%208.28229%207.848%208.28229%207.62682V6.86849H12.8323Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    <_Builtin.Block tag="div">{textJobCount}</_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-606")}
                  tag="div"
                >
                  {slotAddedJobList ?? <AddedJobList />}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isOverviewVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cvs-intro-overview-candi")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cvs-intro-top")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block-2")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-kale-800-2")}
                    tag="div"
                  >
                    {"Overview"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Paragraph
                  className={_utils.cx(_styles, "text-kale-600-2")}
                >
                  {textOverview}
                </_Builtin.Paragraph>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-599")}
              tag="div"
            >
              {isLocationVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "loc-wrap")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewBox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.87695%206C9.84049%204.76042%209.41211%203.73047%208.5918%202.91016C7.77148%202.08984%206.74154%201.66146%205.50195%201.625C4.26237%201.66146%203.23242%202.08984%202.41211%202.91016C1.5918%203.73047%201.16341%204.76042%201.12695%206C1.12695%206.4375%201.2819%207.01172%201.5918%207.72266C1.90169%208.45182%202.29362%209.20833%202.76758%209.99219C3.24154%2010.7578%203.72461%2011.4687%204.2168%2012.125C4.70898%2012.7995%205.13737%2013.3646%205.50195%2013.8203C5.86654%2013.3646%206.29492%2012.7995%206.78711%2012.125C7.2793%2011.4687%207.76237%2010.7578%208.23633%209.99219C8.72852%209.20833%209.12956%208.45182%209.43945%207.72266C9.73112%207.01172%209.87695%206.4375%209.87695%206ZM10.752%206C10.7155%206.82031%2010.4238%207.76823%209.87695%208.84375C9.31185%209.91927%208.67383%2010.9583%207.96289%2011.9609C7.25195%2012.9818%206.65039%2013.793%206.1582%2014.3945C5.97591%2014.6133%205.75716%2014.7227%205.50195%2014.7227C5.24674%2014.7227%205.02799%2014.6133%204.8457%2014.3945C4.35352%2013.793%203.75195%2012.9818%203.04102%2011.9609C2.33008%2010.9583%201.69206%209.91927%201.12695%208.84375C0.580078%207.76823%200.288411%206.82031%200.251953%206C0.288411%204.50521%200.798828%203.26562%201.7832%202.28125C2.76758%201.29687%204.00716%200.786458%205.50195%200.749999C6.99674%200.786458%208.23633%201.29687%209.2207%202.28125C10.2051%203.26562%2010.7155%204.50521%2010.752%206ZM4.18945%206C4.20768%206.49219%204.42643%206.875%204.8457%207.14844C5.2832%207.36719%205.7207%207.36719%206.1582%207.14844C6.57747%206.875%206.79622%206.49219%206.81445%206C6.79622%205.50781%206.57747%205.125%206.1582%204.85156C5.7207%204.63281%205.2832%204.63281%204.8457%204.85156C4.42643%205.125%204.20768%205.50781%204.18945%206ZM5.50195%208.1875C4.68164%208.16927%204.05273%207.80469%203.61523%207.09375C3.21419%206.36458%203.21419%205.63542%203.61523%204.90625C4.05273%204.19531%204.68164%203.83073%205.50195%203.8125C6.32227%203.83073%206.95117%204.19531%207.38867%204.90625C7.78971%205.63542%207.78971%206.36458%207.38867%207.09375C6.95117%207.80469%206.32227%208.16927%205.50195%208.1875Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{textLocation}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "loc-wrap", "mt-18")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2214%22%20viewBox%3D%220%200%2015%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.87695%202.0625V3.375H10.127V2.0625C10.1087%201.78906%209.96289%201.64323%209.68945%201.625H5.31445C5.04102%201.64323%204.89518%201.78906%204.87695%202.0625ZM4.00195%203.375V2.0625C4.02018%201.69792%204.14779%201.38802%204.38477%201.13281C4.63997%200.895833%204.94987%200.768228%205.31445%200.749999H9.68945C10.054%200.768228%2010.3639%200.895833%2010.6191%201.13281C10.8561%201.38802%2010.9837%201.69792%2011.002%202.0625V3.375H12.752C13.2441%203.39323%2013.6543%203.56641%2013.9824%203.89453C14.3105%204.22266%2014.4837%204.63281%2014.502%205.125V12.125C14.4837%2012.6172%2014.3105%2013.0273%2013.9824%2013.3555C13.6543%2013.6836%2013.2441%2013.8568%2012.752%2013.875H2.25195C1.75977%2013.8568%201.34961%2013.6836%201.02148%2013.3555C0.693359%2013.0273%200.520182%2012.6172%200.501953%2012.125V5.125C0.520182%204.63281%200.693359%204.22266%201.02148%203.89453C1.34961%203.56641%201.75977%203.39323%202.25195%203.375H4.00195ZM10.5645%204.25H4.43945H2.25195C1.99674%204.25%201.78711%204.33203%201.62305%204.49609C1.45898%204.66016%201.37695%204.86979%201.37695%205.125V7.75H5.31445H6.18945H8.81445H9.68945H13.627V5.125C13.627%204.86979%2013.5449%204.66016%2013.3809%204.49609C13.2168%204.33203%2013.0072%204.25%2012.752%204.25H10.5645ZM13.627%208.625H9.68945V9.9375C9.68945%2010.1927%209.60742%2010.4023%209.44336%2010.5664C9.2793%2010.7305%209.06966%2010.8125%208.81445%2010.8125H6.18945C5.93424%2010.8125%205.72461%2010.7305%205.56055%2010.5664C5.39648%2010.4023%205.31445%2010.1927%205.31445%209.9375V8.625H1.37695V12.125C1.37695%2012.3802%201.45898%2012.5898%201.62305%2012.7539C1.78711%2012.918%201.99674%2013%202.25195%2013H12.752C13.0072%2013%2013.2168%2012.918%2013.3809%2012.7539C13.5449%2012.5898%2013.627%2012.3802%2013.627%2012.125V8.625ZM6.18945%208.625V9.9375H8.81445V8.625H6.18945Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block tag="div">
                  {textJobRoleAtCompany}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cd-view-resume",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickViewResume}
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.99986%2010.5022C3.49288%2010.5022%201.5331%209.05872%200.209412%207.16773C-0.0709987%206.76464%20-0.0709987%206.23204%200.208768%205.84759C1.51713%203.95774%203.48959%202.5022%205.99986%202.5022C8.50685%202.5022%2010.4666%203.94567%2011.7903%205.83666C12.0695%206.23794%2012.0707%206.76756%2011.7881%207.16095C10.4797%209.04879%208.5083%2010.5022%205.99986%2010.5022ZM10.9688%206.58759C11.009%206.53204%2011.009%206.46464%2010.9702%206.40893C9.81544%204.7592%208.10883%203.5022%205.99986%203.5022C3.88855%203.5022%202.17163%204.76916%201.02423%206.42628C0.990728%206.47235%200.990728%206.53976%201.02948%206.59547C2.18429%208.2452%203.89089%209.5022%205.99986%209.5022C8.11118%209.5022%209.8281%208.23523%2010.9688%206.58759ZM5.99986%208.5022C4.8953%208.5022%203.99986%207.60677%203.99986%206.5022C3.99986%205.39763%204.8953%204.5022%205.99986%204.5022C7.10443%204.5022%207.99986%205.39763%207.99986%206.5022C7.99986%207.60677%207.10443%208.5022%205.99986%208.5022ZM5.99986%207.5022C6.55215%207.5022%206.99986%207.05448%206.99986%206.5022C6.99986%205.94991%206.55215%205.5022%205.99986%205.5022C5.44758%205.5022%204.99986%205.94991%204.99986%206.5022C4.99986%207.05448%205.44758%207.5022%205.99986%207.5022Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-600-2")}
                  tag="div"
                >
                  {"View Resume"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cd-download-resume",
                    "cursor-pointer"
                  )}
                  tag="div"
                  {...onClickDownloadResume}
                >
                  <_Builtin.Block tag="div">
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.5%208.19509L9.04645%205.64864C9.24171%205.45338%209.55829%205.45338%209.75355%205.64864C9.94882%205.84391%209.94882%206.16049%209.75355%206.35575L6.65355%209.45575C6.25829%209.85101%205.64171%209.85101%205.24645%209.45575L2.14645%206.35575C1.95118%206.16049%201.95118%205.84391%202.14645%205.64864C2.34171%205.45338%202.65829%205.45338%202.85355%205.64864L5.5%208.29509V1.0022C5.5%200.726055%205.72386%200.502197%206%200.502197C6.27614%200.502197%206.5%200.726055%206.5%201.0022V8.19509ZM1.5%2012.5022C1.22386%2012.5022%201%2012.2783%201%2012.0022C1%2011.7261%201.22386%2011.5022%201.5%2011.5022H10.5C10.7761%2011.5022%2011%2011.7261%2011%2012.0022C11%2012.2783%2010.7761%2012.5022%2010.5%2012.5022H1.5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-blue-600-2")}
                    tag="div"
                  >
                    {"Download Resume"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-candidate-details", "cd-details")}
        tag="div"
      >
        {slotDetails ?? <CandidateDetails />}
      </_Builtin.Block>
    </_Component>
  );
}
