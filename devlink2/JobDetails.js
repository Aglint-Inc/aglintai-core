import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { JobStatus } from "./JobStatus";
import { JobDetailsTabs } from "./JobDetailsTabs";
import { JobDetailsFilterBlock } from "./JobDetailsFilterBlock";
import { SortArrows } from "./SortArrows";
import { CandidateListItem } from "./CandidateListItem";
import { ListItemSkeletalLoader } from "./ListItemSkeletalLoader";
import { SelectActionBar } from "./SelectActionBar";
import * as _utils from "./utils";
import _styles from "./JobDetails.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-33":{"id":"e-33","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-16","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-34"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"652f80e122406995b2c1cab3|9c94dded-44ad-d099-9739-c6b82983d23b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"652f80e122406995b2c1cab3|9c94dded-44ad-d099-9739-c6b82983d23b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697456720752},"e-35":{"id":"e-35","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-36"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"652f80e122406995b2c1cab3|9ea7b547-111e-ef7f-d32b-dd873a5025f3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"652f80e122406995b2c1cab3|9ea7b547-111e-ef7f-d32b-dd873a5025f3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697457005651},"e-39":{"id":"e-39","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-40"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"652f80e122406995b2c1cab3|af308b96-73f9-2165-a39a-a702753dc284","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"652f80e122406995b2c1cab3|af308b96-73f9-2165-a39a-a702753dc284","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697457765433},"e-41":{"id":"e-41","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-42"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8e250e4a-68d7-8f39-2620-4fb80934db07","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8e250e4a-68d7-8f39-2620-4fb80934db07","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697536528611},"e-43":{"id":"e-43","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-16","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-44"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8e250e4a-68d7-8f39-2620-4fb80934db3a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8e250e4a-68d7-8f39-2620-4fb80934db3a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697536528611},"e-45":{"id":"e-45","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-46"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8e250e4a-68d7-8f39-2620-4fb80934dbea","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8e250e4a-68d7-8f39-2620-4fb80934dbea","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697536528611},"e-49":{"id":"e-49","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-column","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-column","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1698671045933},"e-57":{"id":"e-57","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-58"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6530d26319fe0366b3c3a2a1|6f1a9892-8027-6c6e-0c15-1a92750cdc26","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698995836530},"e-59":{"id":"e-59","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-31","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-60"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6530d26319fe0366b3c3a2a1|6f1a9892-8027-6c6e-0c15-1a92750cdc59","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698995836530},"e-61":{"id":"e-61","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-32","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-62"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6530d26319fe0366b3c3a2a1|6f1a9892-8027-6c6e-0c15-1a92750cdd09","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698995836530}},"actionLists":{"a-16":{"id":"a-16","title":"cvs-details-[open]","actionItemGroups":[{"actionItems":[{"id":"a-16-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"none"}},{"id":"a-16-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-16-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"block"}}]},{"actionItems":[{"id":"a-16-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697456726613},"a-20":{"id":"a-20","title":"cvs-details-[close]","actionItemGroups":[{"actionItems":[{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697456726613},"a-19":{"id":"a-19","title":"cv-sidebar-[close]","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"selector":".candidates-view-sidebar","selectorGuids":["9fe62391-7b37-03f4-4bdf-c39a91950395"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697457373169},"a-25":{"id":"a-25","title":"skeletal-loader","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"yValue":-50,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":2000,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698671059774},"a-30":{"id":"a-30","title":"cv-sidebar-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-30-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"selector":".candidates-view-sidebar","selectorGuids":["9fe62391-7b37-03f4-4bdf-c39a91950395"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697457373169},"a-31":{"id":"a-31","title":"cvs-details-[open] 2","actionItemGroups":[{"actionItems":[{"id":"a-31-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"none"}},{"id":"a-31-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-31-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"block"}}]},{"actionItems":[{"id":"a-31-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697456726613},"a-32":{"id":"a-32","title":"cvs-details-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-32-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".cv-sidebar-details-block","selectorGuids":["ffb99878-2924-1151-7e76-bb598762069f"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-32-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cv-sidebar-details-wrapper","selectorGuids":["1ad5af18-c008-2aab-a5bf-430b3c53bc9c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697456726613}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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

  slotJobStatus,
  slotBottomBar,
  slotSidebar,
  slotTabs,
  slotFilterBlock,
  slotCandidatesList,
  onclickSelectAll = {},
  isListTopBarVisible = true,
  isInterviewVisible = false,
  isAllChecked = false,
  slotResumeSort,
  slotNameSort,
  slotInterviewSort,
  slotEmailSort,
  slotDateSort,
  onclickHeaderJobs = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "job-details-wrapper")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.cvs-info-content-main%20%7B%0Aheight%3A%20calc(100%25%20-%20320px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
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
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.60958%203.31233C5.43708%203.0967%205.47204%202.78205%205.68767%202.60955C5.87934%202.45621%206.14925%202.46679%206.32802%202.62249L6.39045%202.68763L10.3905%207.68763C10.5157%207.84416%2010.5336%208.05715%2010.4441%208.22981L10.3905%208.31233L6.39045%2013.3123C6.21795%2013.528%205.9033%2013.5629%205.68767%2013.3904C5.496%2013.2371%205.44708%2012.9714%205.55973%2012.7628L5.60958%2012.6876L9.35902%207.99998L5.60958%203.31233Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
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
                className={_utils.cx(_styles, "tablet-left-auto")}
                button={false}
                options={jobLink}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Preview"}
                </_Builtin.Block>
              </_Builtin.Link>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-371")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-edit-controls-wrapper")}
              tag="div"
            >
              {slotJobStatus ?? <JobStatus />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "select-action-btn", "outline")}
              tag="div"
              {...onClickEditJobs}
            >
              <_Builtin.Block tag="div">{"Edit Job"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "select-action-btn",
                "blue-500",
                "hide"
              )}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.83205%200.4453C6.43623%20-0.148433%205.56377%20-0.148433%205.16795%200.4453L3.16795%203.4453C2.72491%204.10985%203.2013%205%204%205H8C8.7987%205%209.27509%204.10985%208.83205%203.4453L6.83205%200.4453ZM4%204L6%201L8%204H4ZM1%207C0.447715%207%200%207.44772%200%208V11C0%2011.5523%200.447715%2012%201%2012H4C4.55228%2012%205%2011.5523%205%2011V8C5%207.44772%204.55228%207%204%207H1ZM1%2011V8H4V11H1ZM9.25%2012C10.7688%2012%2012%2010.7688%2012%209.25C12%207.73122%2010.7688%206.5%209.25%206.5C7.73122%206.5%206.5%207.73122%206.5%209.25C6.5%2010.7688%207.73122%2012%209.25%2012ZM9.25%2011C8.2835%2011%207.5%2010.2165%207.5%209.25C7.5%208.2835%208.2835%207.5%209.25%207.5C10.2165%207.5%2011%208.2835%2011%209.25C11%2010.2165%2010.2165%2011%209.25%2011Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-color-white")}
                tag="div"
              >
                {"Workflow"}
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
          <_Builtin.Block className={_utils.cx(_styles, "jdet-tabs")} tag="div">
            {slotTabs ?? <JobDetailsTabs />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-tab-content-wrapper")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotFilterBlock ?? <JobDetailsFilterBlock />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-358")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list")}
                tag="div"
              >
                {isListTopBarVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cv-list-row", "top")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cv-list-column",
                        "checkbox",
                        "grey-100"
                      )}
                      tag="div"
                      {...onclickSelectAll}
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cv-list-checkbox")}
                        tag="div"
                      >
                        {isAllChecked ? (
                          <_Builtin.Image
                            className={_utils.cx(_styles, "cli-check-image")}
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt=""
                            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
                          />
                        ) : null}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cv-list-checkbox-ghost",
                          "hide"
                        )}
                        tag="div"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cv-list-row-main")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cv-list-column",
                          "name",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20width%3D%2213%22%20height%3D%2215%22%20viewbox%3D%220%200%2013%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.1875%204.25C9.1875%203.70312%209.05078%203.19271%208.77734%202.71875C8.50391%202.24479%208.13021%201.87109%207.65625%201.59766C7.18229%201.32422%206.67188%201.1875%206.125%201.1875C5.57812%201.1875%205.06771%201.32422%204.59375%201.59766C4.11979%201.87109%203.74609%202.24479%203.47266%202.71875C3.19922%203.19271%203.0625%203.70312%203.0625%204.25C3.0625%204.79688%203.19922%205.30729%203.47266%205.78125C3.74609%206.25521%204.11979%206.62891%204.59375%206.90234C5.06771%207.17578%205.57812%207.3125%206.125%207.3125C6.67188%207.3125%207.18229%207.17578%207.65625%206.90234C8.13021%206.62891%208.50391%206.25521%208.77734%205.78125C9.05078%205.30729%209.1875%204.79688%209.1875%204.25ZM2.625%204.25C2.625%203.61198%202.77995%203.02865%203.08984%202.5C3.39974%201.97135%203.82812%201.54297%204.375%201.21484C4.92188%200.904948%205.50521%200.75%206.125%200.75C6.74479%200.75%207.32812%200.904948%207.875%201.21484C8.42188%201.54297%208.85026%201.97135%209.16016%202.5C9.47005%203.02865%209.625%203.61198%209.625%204.25C9.625%204.88802%209.47005%205.47135%209.16016%206C8.85026%206.52865%208.42188%206.95703%207.875%207.28516C7.32812%207.59505%206.74479%207.75%206.125%207.75C5.50521%207.75%204.92188%207.59505%204.375%207.28516C3.82812%206.95703%203.39974%206.52865%203.08984%206C2.77995%205.47135%202.625%204.88802%202.625%204.25ZM0.4375%2013.9297C0.455729%2014.1667%200.583333%2014.2943%200.820312%2014.3125H11.4297C11.6667%2014.2943%2011.7943%2014.1667%2011.8125%2013.9297C11.776%2012.6719%2011.3385%2011.6328%2010.5%2010.8125C9.67969%209.97396%208.64062%209.53646%207.38281%209.5H4.86719C3.60938%209.53646%202.57031%209.97396%201.75%2010.8125C0.911458%2011.6328%200.473958%2012.6719%200.4375%2013.9297ZM0%2013.9297C0.0364583%2012.5625%200.510417%2011.4141%201.42188%2010.4844C2.35156%209.57292%203.5%209.09896%204.86719%209.0625H7.38281C8.75%209.09896%209.89844%209.57292%2010.8281%2010.4844C11.7396%2011.4141%2012.2135%2012.5625%2012.25%2013.9297C12.25%2014.1667%2012.168%2014.3581%2012.0039%2014.5039C11.8581%2014.668%2011.6667%2014.75%2011.4297%2014.75H0.820312C0.583333%2014.75%200.391927%2014.668%200.246094%2014.5039C0.0820312%2014.3581%200%2014.1667%200%2013.9297Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "sort-arrows-wrapper")}
                          tag="div"
                        >
                          {slotNameSort ?? <SortArrows />}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cv-list-column",
                          "title",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.9375%201.84375V3.375H10.0625V1.84375C10.026%201.44271%209.80729%201.22396%209.40625%201.1875H4.59375C4.19271%201.22396%203.97396%201.44271%203.9375%201.84375ZM3.5%203.375V1.84375C3.5%201.53385%203.60938%201.27865%203.82812%201.07812C4.02865%200.859375%204.28385%200.75%204.59375%200.75H9.40625C9.71615%200.75%209.97135%200.859375%2010.1719%201.07812C10.3906%201.27865%2010.5%201.53385%2010.5%201.84375V3.375H12.25C12.7422%203.39323%2013.1523%203.56641%2013.4805%203.89453C13.8086%204.22266%2013.9818%204.63281%2014%205.125V7.96875V12.125C13.9818%2012.6172%2013.8086%2013.0273%2013.4805%2013.3555C13.1523%2013.6836%2012.7422%2013.8568%2012.25%2013.875H1.75C1.25781%2013.8568%200.847656%2013.6836%200.519531%2013.3555C0.191406%2013.0273%200.0182292%2012.6172%200%2012.125V7.96875V5.125C0.0182292%204.63281%200.191406%204.22266%200.519531%203.89453C0.847656%203.56641%201.25781%203.39323%201.75%203.375H3.5ZM0.4375%208.1875V12.125C0.455729%2012.4896%200.583333%2012.7995%200.820312%2013.0547C1.07552%2013.2917%201.38542%2013.4193%201.75%2013.4375H12.25C12.6146%2013.4193%2012.9245%2013.2917%2013.1797%2013.0547C13.4167%2012.7995%2013.5443%2012.4896%2013.5625%2012.125V8.1875H9.1875V9.5C9.1875%209.75521%209.10547%209.96484%208.94141%2010.1289C8.77734%2010.293%208.56771%2010.375%208.3125%2010.375H5.6875C5.43229%2010.375%205.22266%2010.293%205.05859%2010.1289C4.89453%209.96484%204.8125%209.75521%204.8125%209.5V8.1875H0.4375ZM4.8125%207.75H5.25H8.75H9.1875H13.5625V5.125C13.5443%204.76042%2013.4167%204.45052%2013.1797%204.19531C12.9245%203.95833%2012.6146%203.83073%2012.25%203.8125H10.2812H3.71875H1.75C1.38542%203.83073%201.07552%203.95833%200.820312%204.19531C0.583333%204.45052%200.455729%204.76042%200.4375%205.125V7.75H4.8125ZM5.25%208.1875V9.5C5.26823%209.77344%205.41406%209.91927%205.6875%209.9375H8.3125C8.58594%209.91927%208.73177%209.77344%208.75%209.5V8.1875H5.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">
                          {"Current Job Title"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cv-list-column",
                          "score",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.75%200.9375C2.25781%200.955729%201.875%201.17448%201.60156%201.59375C1.38281%202.03125%201.38281%202.46875%201.60156%202.90625C1.875%203.32552%202.25781%203.54427%202.75%203.5625C3.24219%203.54427%203.625%203.32552%203.89844%202.90625C4.11719%202.46875%204.11719%202.03125%203.89844%201.59375C3.625%201.17448%203.24219%200.955729%202.75%200.9375ZM2.75%204C2.09375%203.98177%201.59245%203.6901%201.24609%203.125C0.917969%202.54167%200.917969%201.95833%201.24609%201.375C1.59245%200.809896%202.09375%200.518229%202.75%200.5C3.40625%200.518229%203.90755%200.809896%204.25391%201.375C4.58203%201.95833%204.58203%202.54167%204.25391%203.125C3.90755%203.6901%203.40625%203.98177%202.75%204ZM9.75%207.9375C9.25781%207.95573%208.875%208.17448%208.60156%208.59375C8.38281%209.03125%208.38281%209.46875%208.60156%209.90625C8.875%2010.3255%209.25781%2010.5443%209.75%2010.5625C10.2422%2010.5443%2010.625%2010.3255%2010.8984%209.90625C11.1172%209.46875%2011.1172%209.03125%2010.8984%208.59375C10.625%208.17448%2010.2422%207.95573%209.75%207.9375ZM9.75%2011C9.09375%2010.9818%208.59245%2010.6901%208.24609%2010.125C7.91797%209.54167%207.91797%208.95833%208.24609%208.375C8.59245%207.8099%209.09375%207.51823%209.75%207.5C10.4062%207.51823%2010.9076%207.8099%2011.2539%208.375C11.582%208.95833%2011.582%209.54167%2011.2539%2010.125C10.9076%2010.6901%2010.4062%2010.9818%209.75%2011ZM11.2266%201.10156L1.60156%2010.7266C1.49219%2010.7995%201.38281%2010.7995%201.27344%2010.7266C1.20052%2010.6172%201.20052%2010.5078%201.27344%2010.3984L10.8984%200.773438C11.0078%200.700521%2011.1172%200.700521%2011.2266%200.773438C11.2995%200.882812%2011.2995%200.992188%2011.2266%201.10156Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">
                          {"Resume Score"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "sort-arrows-wrapper")}
                          tag="div"
                        >
                          {slotResumeSort ?? <SortArrows />}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      {isInterviewVisible ? (
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cv-list-column",
                            "score",
                            "grey-100"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "icon-block")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icon-embed")}
                              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.75%200.9375C2.25781%200.955729%201.875%201.17448%201.60156%201.59375C1.38281%202.03125%201.38281%202.46875%201.60156%202.90625C1.875%203.32552%202.25781%203.54427%202.75%203.5625C3.24219%203.54427%203.625%203.32552%203.89844%202.90625C4.11719%202.46875%204.11719%202.03125%203.89844%201.59375C3.625%201.17448%203.24219%200.955729%202.75%200.9375ZM2.75%204C2.09375%203.98177%201.59245%203.6901%201.24609%203.125C0.917969%202.54167%200.917969%201.95833%201.24609%201.375C1.59245%200.809896%202.09375%200.518229%202.75%200.5C3.40625%200.518229%203.90755%200.809896%204.25391%201.375C4.58203%201.95833%204.58203%202.54167%204.25391%203.125C3.90755%203.6901%203.40625%203.98177%202.75%204ZM9.75%207.9375C9.25781%207.95573%208.875%208.17448%208.60156%208.59375C8.38281%209.03125%208.38281%209.46875%208.60156%209.90625C8.875%2010.3255%209.25781%2010.5443%209.75%2010.5625C10.2422%2010.5443%2010.625%2010.3255%2010.8984%209.90625C11.1172%209.46875%2011.1172%209.03125%2010.8984%208.59375C10.625%208.17448%2010.2422%207.95573%209.75%207.9375ZM9.75%2011C9.09375%2010.9818%208.59245%2010.6901%208.24609%2010.125C7.91797%209.54167%207.91797%208.95833%208.24609%208.375C8.59245%207.8099%209.09375%207.51823%209.75%207.5C10.4062%207.51823%2010.9076%207.8099%2011.2539%208.375C11.582%208.95833%2011.582%209.54167%2011.2539%2010.125C10.9076%2010.6901%2010.4062%2010.9818%209.75%2011ZM11.2266%201.10156L1.60156%2010.7266C1.49219%2010.7995%201.38281%2010.7995%201.27344%2010.7266C1.20052%2010.6172%201.20052%2010.5078%201.27344%2010.3984L10.8984%200.773438C11.0078%200.700521%2011.1172%200.700521%2011.2266%200.773438C11.2995%200.882812%2011.2995%200.992188%2011.2266%201.10156Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block tag="div">
                            {"Interview Score"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "sort-arrows-wrapper"
                            )}
                            tag="div"
                          >
                            {slotInterviewSort ?? <SortArrows />}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      ) : null}
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cv-list-column",
                          "email",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20width%3D%2215%22%20height%3D%2212%22%20viewBox%3D%220%200%2014%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.75%200.9375C1.38542%200.955729%201.07552%201.08333%200.820312%201.32031C0.583333%201.57552%200.455729%201.88542%200.4375%202.25V3.01562L6.04297%207.52734C6.33464%207.76432%206.65365%207.88281%207%207.88281C7.34635%207.88281%207.66536%207.76432%207.95703%207.52734L13.5625%203.01562V2.25C13.5443%201.88542%2013.4167%201.57552%2013.1797%201.32031C12.9245%201.08333%2012.6146%200.955729%2012.25%200.9375H1.75ZM0.4375%203.58984V9.25C0.455729%209.61458%200.583333%209.92448%200.820312%2010.1797C1.07552%2010.4167%201.38542%2010.5443%201.75%2010.5625H12.25C12.6146%2010.5443%2012.9245%2010.4167%2013.1797%2010.1797C13.4167%209.92448%2013.5443%209.61458%2013.5625%209.25V3.58984L8.23047%207.88281C7.86589%208.17448%207.45573%208.32031%207%208.32031C6.54427%208.32031%206.13411%208.17448%205.76953%207.88281L0.4375%203.58984ZM0%202.25C0.0182292%201.75781%200.191406%201.34766%200.519531%201.01953C0.847656%200.691406%201.25781%200.518229%201.75%200.5H12.25C12.7422%200.518229%2013.1523%200.691406%2013.4805%201.01953C13.8086%201.34766%2013.9818%201.75781%2014%202.25V9.25C13.9818%209.74219%2013.8086%2010.1523%2013.4805%2010.4805C13.1523%2010.8086%2012.7422%2010.9818%2012.25%2011H1.75C1.25781%2010.9818%200.847656%2010.8086%200.519531%2010.4805C0.191406%2010.1523%200.0182292%209.74219%200%209.25V2.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">{"Email"}</_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "sort-arrows-wrapper")}
                          tag="div"
                        >
                          {slotEmailSort}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cv-list-column",
                          "phone",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20width%3D%2210%22%20height%3D%2216%22%20viewbox%3D%220%200%2010%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.625%201.1875C2.26042%201.20573%201.95052%201.33333%201.69531%201.57031C1.45833%201.82552%201.33073%202.13542%201.3125%202.5V13C1.33073%2013.3646%201.45833%2013.6745%201.69531%2013.9297C1.95052%2014.1667%202.26042%2014.2943%202.625%2014.3125H7.875C8.23958%2014.2943%208.54948%2014.1667%208.80469%2013.9297C9.04167%2013.6745%209.16927%2013.3646%209.1875%2013V2.5C9.16927%202.13542%209.04167%201.82552%208.80469%201.57031C8.54948%201.33333%208.23958%201.20573%207.875%201.1875H2.625ZM0.875%202.5C0.893229%202.00781%201.06641%201.59766%201.39453%201.26953C1.72266%200.941406%202.13281%200.768229%202.625%200.75H7.875C8.36719%200.768229%208.77734%200.941406%209.10547%201.26953C9.43359%201.59766%209.60677%202.00781%209.625%202.5V13C9.60677%2013.4922%209.43359%2013.9023%209.10547%2014.2305C8.77734%2014.5586%208.36719%2014.7318%207.875%2014.75H2.625C2.13281%2014.7318%201.72266%2014.5586%201.39453%2014.2305C1.06641%2013.9023%200.893229%2013.4922%200.875%2013V2.5ZM3.9375%2012.5625H6.5625C6.6901%2012.5807%206.76302%2012.6536%206.78125%2012.7812C6.76302%2012.9089%206.6901%2012.9818%206.5625%2013H3.9375C3.8099%2012.9818%203.73698%2012.9089%203.71875%2012.7812C3.73698%2012.6536%203.8099%2012.5807%203.9375%2012.5625Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">{"Phone"}</_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cv-list-column",
                          "date",
                          "grey-100"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.82706%203.2458C1.67474%203.47613%201.36454%203.53938%201.1342%203.38706C0.90387%203.23474%200.840625%202.92454%200.992943%202.6942C1.44005%202.01809%202.01809%201.44005%202.6942%200.992943C2.92454%200.840625%203.23474%200.90387%203.38706%201.1342C3.53938%201.36454%203.47613%201.67474%203.2458%201.82706C2.68191%202.19995%202.19995%202.68191%201.82706%203.2458ZM1.10081%207.01457C1.15351%207.28563%200.9765%207.5481%200.705435%207.60081C0.434369%207.65352%200.171899%207.4765%200.119192%207.20543C0.0406179%206.80134%200%206.40057%200%206C0%205.6015%200.040072%205.21147%200.119192%204.80457C0.171899%204.5335%200.434369%204.35649%200.705435%204.40919C0.9765%204.4619%201.15351%204.72437%201.10081%204.99543C1.03354%205.34139%201%205.66783%201%206C1%206.33476%201.03416%206.67181%201.10081%207.01457ZM3.23892%2010.175C3.4681%2010.3291%203.52902%2010.6397%203.37498%2010.8689C3.22093%2011.0981%202.91027%2011.159%202.68108%2011.005C2.01735%2010.5589%201.44114%209.98265%200.995024%209.31892C0.840982%209.08973%200.901897%208.77907%201.13108%208.62502C1.36027%208.47098%201.67093%208.5319%201.82498%208.76108C2.19886%209.31735%202.68265%209.80114%203.23892%2010.175ZM7.01456%2010.8992C7.28563%2010.8465%207.5481%2011.0235%207.60081%2011.2946C7.65351%2011.5656%207.4765%2011.8281%207.20543%2011.8808C6.80134%2011.9594%206.40057%2012%205.99873%2012C5.59696%2011.999%205.19625%2011.9589%204.80224%2011.8803C4.53142%2011.8264%204.35566%2011.563%204.40965%2011.2922C4.46364%2011.0214%204.72695%2010.8457%204.99776%2010.8997C5.32822%2010.9655%205.66431%2010.9991%206%2011C6.33476%2011%206.67181%2010.9658%207.01456%2010.8992ZM10.1729%208.7542C10.3253%208.52387%2010.6355%208.46063%2010.8658%208.61294C11.0961%208.76526%2011.1594%209.07546%2011.0071%209.3058C10.56%209.98191%209.98191%2010.56%209.3058%2011.0071C9.07546%2011.1594%208.76526%2011.0961%208.61294%2010.8658C8.46063%2010.6355%208.52387%2010.3253%208.7542%2010.1729C9.31809%209.80005%209.80005%209.31809%2010.1729%208.7542ZM10.8992%204.99543C10.8465%204.72437%2011.0235%204.4619%2011.2946%204.40919C11.5656%204.35649%2011.8281%204.5335%2011.8808%204.80457C11.9599%205.21147%2012%205.6015%2012%206C12%206.3985%2011.9599%206.78853%2011.8808%207.19544C11.8281%207.4665%2011.5656%207.64352%2011.2946%207.59081C11.0235%207.5381%2010.8465%207.27563%2010.8992%207.00457C10.9665%206.65861%2011%206.33217%2011%206C11%205.66783%2010.9665%205.34139%2010.8992%204.99543ZM8.7542%201.82706C8.52387%201.67474%208.46063%201.36454%208.61294%201.1342C8.76526%200.90387%209.07546%200.840625%209.3058%200.992943C9.98191%201.44005%2010.56%202.01809%2011.0071%202.6942C11.1594%202.92454%2011.0961%203.23474%2010.8658%203.38706C10.6355%203.53938%2010.3253%203.47613%2010.1729%203.2458C9.80005%202.68191%209.31809%202.19995%208.7542%201.82706ZM4.99543%201.10081C4.72437%201.15351%204.4619%200.9765%204.40919%200.705435C4.35649%200.434369%204.5335%200.171899%204.80457%200.119192C5.21147%200.040072%205.6015%200%206%200C6.3985%200%206.78853%200.040072%207.19544%200.119192C7.4665%200.171899%207.64352%200.434369%207.59081%200.705435C7.5381%200.9765%207.27563%201.15351%207.00457%201.10081C6.65861%201.03354%206.33217%201%206%201C5.66783%201%205.34139%201.03354%204.99543%201.10081Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">
                          {"Applied Date"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "sort-arrows-wrapper")}
                          tag="div"
                        >
                          {slotDateSort}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-list-body")}
                  tag="div"
                >
                  {slotCandidatesList ?? (
                    <>
                      <CandidateListItem />
                      <ListItemSkeletalLoader
                        isListTopBarVisible={isListTopBarVisible}
                        onclickSelectAll={onclickSelectAll}
                        isInterviewVisible={isInterviewVisible}
                      />
                    </>
                  )}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-details-selection-bar")}
              tag="div"
            >
              {slotBottomBar ?? <SelectActionBar />}
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
