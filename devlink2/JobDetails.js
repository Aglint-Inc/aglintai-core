import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { RefreshButton } from "./RefreshButton";
import { JobDetailsTabs } from "./JobDetailsTabs";
import { SelectActionBar } from "./SelectActionBar";
import { JobDetailsFilterBlock } from "./JobDetailsFilterBlock";
import { CandidatesListPagination } from "./CandidatesListPagination";
import * as _utils from "./utils";
import _styles from "./JobDetails.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-41":{"id":"e-41","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-42"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8e250e4a-68d7-8f39-2620-4fb80934db07","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8e250e4a-68d7-8f39-2620-4fb80934db07","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697536528611},"e-43":{"id":"e-43","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-16","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-44"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8e250e4a-68d7-8f39-2620-4fb80934db3a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8e250e4a-68d7-8f39-2620-4fb80934db3a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697536528611},"e-45":{"id":"e-45","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-46"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8e250e4a-68d7-8f39-2620-4fb80934dbea","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8e250e4a-68d7-8f39-2620-4fb80934dbea","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697536528611}},"actionLists":{"a-19":{"id":"a-19","title":"cv-sidebar-[close]","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"selector":".candidates-view-sidebar","selectorGuids":["9fe62391-7b37-03f4-4bdf-c39a91950395"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697457373169},"a-16":{"id":"a-16","title":"cvs-details-[open]","actionItemGroups":[{"actionItems":[{"id":"a-16-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"none"}},{"id":"a-16-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-16-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"block"}}]},{"actionItems":[{"id":"a-16-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697456726613},"a-20":{"id":"a-20","title":"cvs-details-[close]","actionItemGroups":[{"actionItems":[{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697456726613}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobDetails({
  as: _Component = _Builtin.Block,
  textJobStatus = "Active",
  textRole = "Software Developer",
  textApplicantsNumber = "(Total 1200 Applicants)",
  onClickEditJobs = {},
  isPreviewVisible = true,

  jobLink = {
    href: "#",
  },

  slotSidebar,
  slotTabs,
  slotFilters,
  onclickHeaderJobs = {},
  onclickAddCandidates = {},
  slotTable,
  slotRefresh,
  slotPagination,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "job-details-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "job-details-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "job-details-header-block")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "jdet-main")} tag="div">
            <_Builtin.Link
              className={_utils.cx(_styles, "link-block", "bold-text-mobile")}
              button={false}
              options={{
                href: "#",
              }}
              {...onclickHeaderJobs}
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "inline-block",
                  "ml-0-mobile",
                  "text-lg"
                )}
                tag="div"
              >
                {textJobStatus}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inline-block", "text-lg")}
                tag="div"
              >
                {"Jobs"}
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.60958%203.31233C5.43708%203.0967%205.47204%202.78205%205.68767%202.60955C5.87934%202.45621%206.14925%202.46679%206.32802%202.62249L6.39045%202.68763L10.3905%207.68763C10.5157%207.84416%2010.5336%208.05715%2010.4441%208.22981L10.3905%208.31233L6.39045%2013.3123C6.21795%2013.528%205.9033%2013.5629%205.68767%2013.3904C5.496%2013.2371%205.44708%2012.9714%205.55973%2012.7628L5.60958%2012.6876L9.35902%207.99998L5.60958%203.31233Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-lg")}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textRole}
            </_Builtin.Block>
            <_Builtin.Block
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textApplicantsNumber}
            </_Builtin.Block>
            {isPreviewVisible ? (
              <_Builtin.Link
                className={_utils.cx(
                  _styles,
                  "tablet-left-auto",
                  "no-underline",
                  "clickable"
                )}
                button={false}
                options={jobLink}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"View Job"}
                </_Builtin.Block>
              </_Builtin.Link>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-main-action-menu")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotRefresh ?? <RefreshButton />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cv-upload-icon-block",
                "clickable"
              )}
              tag="div"
              {...onclickAddCandidates}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20width%3D%2218%22%20height%3D%2213%22%20viewbox%3D%220%200%2018%2013%22%20fill%3D%22%23337fbd%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.9136%203.16797C10.549%202.65755%2010.0841%202.25651%209.51904%201.96484C8.97217%201.65495%208.36149%201.5%207.68701%201.5C6.61149%201.51823%205.70003%201.88281%204.95264%202.59375C4.22347%203.30469%203.82243%204.19792%203.74951%205.27344C3.71305%205.63802%203.52165%205.89323%203.17529%206.03906C2.57373%206.25781%202.08154%206.63151%201.69873%207.16016C1.33415%207.67057%201.14274%208.26302%201.12451%208.9375C1.14274%209.8125%201.44352%2010.5326%202.02685%2011.0977C2.59196%2011.681%203.31201%2011.9818%204.18701%2012H14.2495C14.9969%2011.9818%2015.6167%2011.7266%2016.1089%2011.2344C16.6011%2010.7422%2016.8563%2010.1224%2016.8745%209.375C16.8745%208.86458%2016.7469%208.40885%2016.4917%208.00781C16.2365%207.60677%2015.8993%207.28776%2015.48%207.05078C15.0972%206.8138%2014.9513%206.47656%2015.0425%206.03906C15.0972%205.85677%2015.1245%205.65625%2015.1245%205.4375C15.1063%204.81771%2014.8966%204.29818%2014.4956%203.87891C14.0763%203.47786%2013.5568%203.26823%2012.937%203.25C12.5907%203.25%2012.2808%203.32292%2012.0073%203.46875C11.5698%203.63281%2011.2052%203.53255%2010.9136%203.16797ZM7.68701%200.624998C8.50732%200.624998%209.25472%200.80729%209.9292%201.17187C10.6219%201.53646%2011.187%202.03776%2011.6245%202.67578C12.0256%202.47526%2012.4631%202.375%2012.937%202.375C13.812%202.39323%2014.5321%202.69401%2015.0972%203.27734C15.6805%203.84245%2015.9813%204.5625%2015.9995%205.4375C15.9995%205.72917%2015.9631%206.01172%2015.8901%206.28516C16.4552%206.57682%2016.9019%206.99609%2017.23%207.54297C17.5763%208.08984%2017.7495%208.70052%2017.7495%209.375C17.7313%2010.3594%2017.394%2011.1888%2016.7378%2011.8633C16.0633%2012.5195%2015.2339%2012.8568%2014.2495%2012.875H4.18701C3.07503%2012.8385%202.14534%2012.4557%201.39795%2011.7266C0.668782%2010.9792%200.285969%2010.0495%200.249511%208.9375C0.26774%208.0625%200.513834%207.29687%200.987792%206.64062C1.46175%205.98437%202.09066%205.51042%202.87451%205.21875C2.96566%203.90625%203.45784%202.82161%204.35107%201.96484C5.2443%201.10807%206.35628%200.661457%207.68701%200.624998ZM6.51123%206.44922L8.69873%204.26172C8.89925%204.07943%209.09977%204.07943%209.30029%204.26172L11.4878%206.44922C11.6701%206.64974%2011.6701%206.85026%2011.4878%207.05078C11.2873%207.23307%2011.0868%207.23307%2010.8862%207.05078L9.43701%205.62891V9.8125C9.41878%2010.0859%209.27295%2010.2318%208.99951%2010.25C8.72607%2010.2318%208.58024%2010.0859%208.56201%209.8125V5.62891L7.11279%207.05078C6.91227%207.23307%206.71175%207.23307%206.51123%207.05078C6.32894%206.85026%206.32894%206.64974%206.51123%206.44922Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"Add Candidates"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "select-action-btn", "blue-500")}
              tag="div"
              {...onClickEditJobs}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-color-white")}
                tag="div"
              >
                {"Edit Job"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidates-view-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "candidates-view-main")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-tab-content-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-tabs")}
              tag="div"
            >
              {slotTabs ?? <JobDetailsTabs />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-actions-bar")}
              tag="div"
            >
              {slotFilters ?? (
                <>
                  <SelectActionBar />
                  <JobDetailsFilterBlock />
                </>
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-table")}
              tag="div"
            >
              {slotTable}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-page-nav-bar")}
              tag="div"
            >
              {slotPagination ?? <CandidatesListPagination />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "candidates-view-sidebar")}
          tag="div"
        >
          {slotSidebar ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "candidates-view-sidebar-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-sidebar-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-sidebar-header-block")}
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
                        "clickable"
                      )}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed")}
                        value="%3Csvg%20width%3D%227%22%20height%3D%2213%22%20viewbox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.242188%206.41406C0.169271%206.30469%200.169271%206.19531%200.242188%206.08594L6.14844%200.179688C6.25781%200.106771%206.36719%200.106771%206.47656%200.179688C6.54948%200.289062%206.54948%200.398438%206.47656%200.507812L0.707031%206.25L6.47656%2011.9922C6.54948%2012.1016%206.54948%2012.2109%206.47656%2012.3203C6.36719%2012.3932%206.25781%2012.3932%206.14844%2012.3203L0.242188%206.41406Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cvs-header-nav-icon",
                        "clickable"
                      )}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed")}
                        value="%3Csvg%20width%3D%227%22%20height%3D%2213%22%20viewbox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75781%206.58594C6.83073%206.69531%206.83073%206.80469%206.75781%206.91406L0.851562%2012.8203C0.742188%2012.8932%200.632812%2012.8932%200.523438%2012.8203C0.450521%2012.7109%200.450521%2012.6016%200.523438%2012.4922L6.29297%206.75L0.523438%201.00781C0.450521%200.898438%200.450521%200.789062%200.523438%200.679688C0.632812%200.606771%200.742188%200.606771%200.851562%200.679688L6.75781%206.58594Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cvs-header-copy-block",
                      "clickable"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Copy Profile"}</_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-header-copy-icon")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3341_29946%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3341_29946)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cvs-header-close-button",
                      "clickable"
                    )}
                    data-w-id="8e250e4a-68d7-8f39-2620-4fb80934db07"
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3498_23410%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3498_23410)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-sidebar-intro-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cvs-intro-profile-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-intro-profile-image")}
                      tag="div"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-intro-profile-info")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-347")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "fw-semibold")}
                          tag="div"
                        >
                          {"Dianne Russell"}
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2214%22%20viewbox%3D%220%200%2012%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M11.1429%201H0.854464C0.383036%201%200%201.3884%200%201.86519V12.1349C0%2012.6117%200.383036%2013.0001%200.854464%2013.0001H11.1429C11.6143%2013.0001%2012%2012.6117%2012%2012.1349V1.86519C12%201.3884%2011.6143%201%2011.1429%201ZM3.62679%2011.2858H1.84821V5.55897H3.62946V11.2858H3.62679ZM2.7375%204.77682C2.16696%204.77682%201.70625%204.31342%201.70625%203.74556C1.70625%203.1777%202.16696%202.7143%202.7375%202.7143C3.30536%202.7143%203.76875%203.1777%203.76875%203.74556C3.76875%204.3161%203.30804%204.77682%202.7375%204.77682ZM10.2937%2011.2858H8.51518V8.50007C8.51518%207.83578%208.50179%206.98131%207.59107%206.98131C6.66429%206.98131%206.52232%207.70453%206.52232%208.45186V11.2858H4.74375V5.55897H6.45V6.34112H6.47411C6.7125%205.89112%207.29375%205.41701%208.15893%205.41701C9.95893%205.41701%2010.2937%206.60362%2010.2937%208.1465V11.2858Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-grey-600")}
                        tag="div"
                      >
                        {"dianerussel@example.com"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-grey-600")}
                        tag="div"
                      >
                        {"(704) 555-0127"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cvs-intro-overview-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-intro-top")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "icon-block")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon-embed")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-kale-800")}
                        tag="div"
                      >
                        {"Overview"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Paragraph
                      className={_utils.cx(_styles, "text-kale-600")}
                    >
                      {
                        "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles."
                      }
                    </_Builtin.Paragraph>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-sidebar-info-wrapper")}
                  tag="div"
                >
                  <_Builtin.NavbarWrapper
                    className={_utils.cx(_styles, "cvs-info-navbar")}
                    tag="div"
                    config={{
                      animation: "default",
                      collapse: "medium",
                      docHeight: false,
                      duration: 400,
                      easing: "ease",
                      easing2: "ease",
                      noScroll: false,
                    }}
                  >
                    <_Builtin.NavbarMenu
                      className={_utils.cx(_styles, "cvs-info-nav-menu")}
                      tag="nav"
                      role="navigation"
                    >
                      <_Builtin.NavbarLink
                        className={_utils.cx(_styles, "cvs-nav-link")}
                        options={{
                          href: "#",
                        }}
                      >
                        {"Score"}
                      </_Builtin.NavbarLink>
                      <_Builtin.NavbarLink
                        className={_utils.cx(_styles, "cvs-nav-link")}
                        options={{
                          href: "#",
                        }}
                      >
                        {"Education"}
                      </_Builtin.NavbarLink>
                      <_Builtin.NavbarLink
                        className={_utils.cx(_styles, "cvs-nav-link")}
                        options={{
                          href: "#",
                        }}
                      >
                        {"Experience"}
                      </_Builtin.NavbarLink>
                      <_Builtin.NavbarLink
                        className={_utils.cx(_styles, "cvs-nav-link")}
                        options={{
                          href: "#",
                        }}
                      >
                        {"Skills"}
                      </_Builtin.NavbarLink>
                    </_Builtin.NavbarMenu>
                    <_Builtin.NavbarButton
                      className={_utils.cx(_styles, "hide")}
                      tag="div"
                    >
                      <_Builtin.Icon
                        widget={{
                          type: "icon",
                          icon: "nav-menu",
                        }}
                      />
                    </_Builtin.NavbarButton>
                  </_Builtin.NavbarWrapper>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cvs-info-content-main")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Interview Score"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cvs-score-block")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-score-overview-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-count-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(_styles, "icon-embed")}
                                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2219%22%20viewbox%3D%220%200%2018%2019%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M9.00067%2012.4245C8.41848%2012.4245%207.86015%2012.1933%207.44848%2011.7816C7.03682%2011.3699%206.80554%2010.8116%206.80554%2010.2294C6.80554%209.40991%207.25189%208.69284%207.90311%208.31967L15.008%204.20748L10.9616%2011.2172C10.5958%2011.9343%209.85676%2012.4245%209.00067%2012.4245ZM9.00067%202.91235C10.3251%202.91235%2011.5616%203.27821%2012.6373%203.87821L11.1007%204.76357C10.4641%204.51479%209.73237%204.37577%209.00067%204.37577C7.44818%204.37577%205.95928%204.99249%204.86151%206.09027C3.76373%207.18804%203.14701%208.67694%203.14701%2010.2294C3.14701%2011.8465%203.79823%2013.3099%204.8592%2014.3636H4.86652C5.15189%2014.6489%205.15189%2015.1099%204.86652%2015.3953C4.58115%2015.6806%204.11286%2015.6806%203.8275%2015.4026C2.50311%2014.0782%201.68359%2012.2489%201.68359%2010.2294C1.68359%208.28882%202.4545%206.42769%203.82671%205.05547C5.19893%203.68326%207.06006%202.91235%209.00067%202.91235ZM16.3177%2010.2294C16.3177%2012.2489%2015.4982%2014.0782%2014.1738%2015.4026C13.8885%2015.6806%2013.4275%2015.6806%2013.1421%2015.3953C12.8568%2015.1099%2012.8568%2014.6489%2013.1421%2014.3636C14.2031%2013.3026%2014.8543%2011.8465%2014.8543%2010.2294C14.8543%209.49772%2014.7153%208.76601%2014.4592%208.10748L15.3446%206.57089C15.9519%207.66845%2016.3177%208.89772%2016.3177%2010.2294Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"78/100"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-info-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "ps-analysis-text")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "fw-semibold",
                                  "text-yellow-700"
                                )}
                                tag="div"
                              >
                                {"Average"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-btn",
                                "clickable"
                              )}
                              data-w-id="8e250e4a-68d7-8f39-2620-4fb80934db3a"
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "text-blue-600")}
                                tag="div"
                              >
                                {"Detailed feedback"}
                              </_Builtin.Block>
                              <_Builtin.Block tag="div">
                                <_Builtin.HtmlEmbed
                                  className={_utils.cx(_styles, "icon-embed")}
                                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.625%202.7478C11.8091%202.7478%2011.9622%202.88046%2011.994%203.0554L12%203.1228V6.1228C12%206.32991%2011.8321%206.4978%2011.625%206.4978C11.4409%206.4978%2011.2878%206.36515%2011.256%206.19021L11.25%206.1228V4.0273L7.39017%207.88797C7.25999%208.01814%207.05792%208.03261%206.91177%207.93136L6.85983%207.88797L4.875%205.90305L0.640165%2010.138C0.50999%2010.2681%200.307922%2010.2826%200.161771%2010.1814L0.109835%2010.138C-0.0203398%2010.0078%20-0.0348037%209.80572%200.0664434%209.65957L0.109835%209.60764L4.60984%205.10764C4.74001%204.97746%204.94208%204.963%205.08823%205.06425L5.14016%205.10764L7.125%207.09255L10.719%203.4978H8.625C8.4409%203.4978%208.28779%203.36515%208.25604%203.19021L8.25%203.1228C8.25%202.93871%208.38266%202.7856%208.55759%202.75384L8.625%202.7478H11.625Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                                />
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-score-details-wrapper"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Language quality"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cvs-score-detail-icon"
                                )}
                                tag="div"
                              />
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"50%"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Cultural fit"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cvs-score-detail-icon"
                                )}
                                tag="div"
                              />
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"50%"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Skill based assessment"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cvs-score-detail-icon"
                                )}
                                tag="div"
                              />
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"50%"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Personality fit"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cvs-score-detail-icon"
                                )}
                                tag="div"
                              />
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"50%"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Resume Score"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cvs-score-block")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-score-overview-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-res-score-block"
                            )}
                            tag="div"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-info-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "ps-analysis-text")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "fw-semibold",
                                  "text-yellow-700"
                                )}
                                tag="div"
                              >
                                {"Excellent"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-download-res-btn",
                                "clickable"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block tag="div">
                                <_Builtin.HtmlEmbed
                                  className={_utils.cx(_styles, "icon-embed")}
                                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.5%208.19509L9.04645%205.64864C9.24171%205.45338%209.55829%205.45338%209.75355%205.64864C9.94882%205.84391%209.94882%206.16049%209.75355%206.35575L6.65355%209.45575C6.25829%209.85101%205.64171%209.85101%205.24645%209.45575L2.14645%206.35575C1.95118%206.16049%201.95118%205.84391%202.14645%205.64864C2.34171%205.45338%202.65829%205.45338%202.85355%205.64864L5.5%208.29509V1.0022C5.5%200.726055%205.72386%200.502197%206%200.502197C6.27614%200.502197%206.5%200.726055%206.5%201.0022V8.19509ZM1.5%2012.5022C1.22386%2012.5022%201%2012.2783%201%2012.0022C1%2011.7261%201.22386%2011.5022%201.5%2011.5022H10.5C10.7761%2011.5022%2011%2011.7261%2011%2012.0022C11%2012.2783%2010.7761%2012.5022%2010.5%2012.5022H1.5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                                />
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(_styles, "text-blue-600")}
                                tag="div"
                              >
                                {"Download Resume"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-view-res-btn",
                                "clickable"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block tag="div">
                                <_Builtin.HtmlEmbed
                                  className={_utils.cx(_styles, "icon-embed")}
                                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.99986%2010.5022C3.49288%2010.5022%201.5331%209.05872%200.209412%207.16773C-0.0709987%206.76464%20-0.0709987%206.23204%200.208768%205.84759C1.51713%203.95774%203.48959%202.5022%205.99986%202.5022C8.50685%202.5022%2010.4666%203.94567%2011.7903%205.83666C12.0695%206.23794%2012.0707%206.76756%2011.7881%207.16095C10.4797%209.04879%208.5083%2010.5022%205.99986%2010.5022ZM10.9688%206.58759C11.009%206.53204%2011.009%206.46464%2010.9702%206.40893C9.81544%204.7592%208.10883%203.5022%205.99986%203.5022C3.88855%203.5022%202.17163%204.76916%201.02423%206.42628C0.990728%206.47235%200.990728%206.53976%201.02948%206.59547C2.18429%208.2452%203.89089%209.5022%205.99986%209.5022C8.11118%209.5022%209.8281%208.23523%2010.9688%206.58759ZM5.99986%208.5022C4.8953%208.5022%203.99986%207.60677%203.99986%206.5022C3.99986%205.39763%204.8953%204.5022%205.99986%204.5022C7.10443%204.5022%207.99986%205.39763%207.99986%206.5022C7.99986%207.60677%207.10443%208.5022%205.99986%208.5022ZM5.99986%207.5022C6.55215%207.5022%206.99986%207.05448%206.99986%206.5022C6.99986%205.94991%206.55215%205.5022%205.99986%205.5022C5.44758%205.5022%204.99986%205.94991%204.99986%206.5022C4.99986%207.05448%205.44758%207.5022%205.99986%207.5022Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                                />
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(_styles, "text-blue-600")}
                                tag="div"
                              >
                                {"View Resume"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-score-details-wrapper"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Summary"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"Good"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Experience"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"Less"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Education"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"More"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Projects"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"Not present"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Certifications"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"Less"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-score-details-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block tag="div">
                              {"Skills"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cvs-score-detail-count-block"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"0"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Education"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cvs-education-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-education-block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cvs-school-logo")}
                            tag="div"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-school-info-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"University Of Waterloo"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "text-grey-500"
                              )}
                              tag="div"
                            >
                              {"May 2015"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-education-block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cvs-school-logo")}
                            tag="div"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-school-info-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"Turner Fenton Secondary Scholl"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "text-grey-500"
                              )}
                              tag="div"
                            >
                              {"May 2006 - May 2010"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-education-block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cvs-school-logo")}
                            tag="div"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-school-info-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {
                                "Thompson Rivers UniversityCompany NameDateLocation"
                              }
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Experiences"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cvs-experiences-wrapper"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-experiences-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cvs-company-logo")}
                            tag="div"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-company-info-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"Senior Software Engineer"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"Google"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "text-grey-500"
                              )}
                              tag="div"
                            >
                              {"May 2017"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "text-grey-500"
                              )}
                              tag="div"
                            >
                              {"New York, New York, United States"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-experiences-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cvs-company-logo")}
                            tag="div"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-company-info-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"Chief Technology Officer & Co-Founder"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"Kira Talent"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "text-grey-500"
                              )}
                              tag="div"
                            >
                              {"Apr 2012 - May 2016"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "text-grey-500"
                              )}
                              tag="div"
                            >
                              {"Lotoronto, Ontario, Canada"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-experiences-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cvs-company-logo")}
                            tag="div"
                          />
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cvs-company-info-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"Software Engineering Intern"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "fw-semibold")}
                              tag="div"
                            >
                              {"Microsoft"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "text-grey-500"
                              )}
                              tag="div"
                            >
                              {"Jan 2012 - Apr 2012"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "text-grey-500"
                              )}
                              tag="div"
                            >
                              {"San Fransisco"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Skills"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cvs-skills-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-skills-block")}
                          tag="div"
                        >
                          {"Entry to Senior-Level Professionals"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-skills-block")}
                          tag="div"
                        >
                          {"Business HR"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-skills-block")}
                          tag="div"
                        >
                          {"Business Operations"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-skills-block")}
                          tag="div"
                        >
                          {"Business Management"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-skills-block")}
                          tag="div"
                        >
                          {"Customer Service"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-skills-block")}
                          tag="div"
                        >
                          {"PR/Communications"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-skills-block")}
                          tag="div"
                        >
                          {"Healthcare"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cvs-skills-block")}
                          tag="div"
                        >
                          {"Education"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-sidebar-details-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-sidebar-details-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cvs-details-header")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "fw-semibold")}
                      tag="div"
                    >
                      {"Interview Detailed feedback"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cvs-details-close-btn",
                        "clickable"
                      )}
                      data-w-id="8e250e4a-68d7-8f39-2620-4fb80934dbea"
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3498_21624%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3498_21624)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cvs-details-main")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cvs-intro-profile-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cvs-intro-profile-image"
                        )}
                        tag="div"
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cvs-intro-profile-info")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-347")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "fw-semibold")}
                            tag="div"
                          >
                            {"Dianne Russell"}
                          </_Builtin.Block>
                          <_Builtin.Block tag="div">
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icon-embed")}
                              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2214%22%20viewbox%3D%220%200%2012%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M11.1429%201H0.854464C0.383036%201%200%201.3884%200%201.86519V12.1349C0%2012.6117%200.383036%2013.0001%200.854464%2013.0001H11.1429C11.6143%2013.0001%2012%2012.6117%2012%2012.1349V1.86519C12%201.3884%2011.6143%201%2011.1429%201ZM3.62679%2011.2858H1.84821V5.55897H3.62946V11.2858H3.62679ZM2.7375%204.77682C2.16696%204.77682%201.70625%204.31342%201.70625%203.74556C1.70625%203.1777%202.16696%202.7143%202.7375%202.7143C3.30536%202.7143%203.76875%203.1777%203.76875%203.74556C3.76875%204.3161%203.30804%204.77682%202.7375%204.77682ZM10.2937%2011.2858H8.51518V8.50007C8.51518%207.83578%208.50179%206.98131%207.59107%206.98131C6.66429%206.98131%206.52232%207.70453%206.52232%208.45186V11.2858H4.74375V5.55897H6.45V6.34112H6.47411C6.7125%205.89112%207.29375%205.41701%208.15893%205.41701C9.95893%205.41701%2010.2937%206.60362%2010.2937%208.1465V11.2858Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-grey-600")}
                          tag="div"
                        >
                          {"dianerussel@example.com"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-grey-600")}
                          tag="div"
                        >
                          {"(704) 555-0127"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block tag="div" />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-353")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "fw-semibold",
                          "text-grey-600"
                        )}
                        tag="div"
                      >
                        {"Transcript"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-354")}
                        tag="div"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
