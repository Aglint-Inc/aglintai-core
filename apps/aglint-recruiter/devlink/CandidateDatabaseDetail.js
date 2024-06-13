"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CandidateDetailsCard } from "./CandidateDetailsCard";
import { CandidateEmpty } from "./CandidateEmpty";
import { AddJobButton } from "./AddJobButton";
import { CandidateDialog } from "./CandidateDialog";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseDetail.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1480":{"id":"e-1480","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-534","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1481"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d4b3858d-7766-63cc-4349-4e8a95780973","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4b3858d-7766-63cc-4349-4e8a95780973","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700662942673},"e-1481":{"id":"e-1481","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-535","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1480"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d4b3858d-7766-63cc-4349-4e8a95780973","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4b3858d-7766-63cc-4349-4e8a95780973","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700662942678},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-534":{"id":"a-534","title":"Candidate Download Open","actionItemGroups":[{"actionItems":[{"id":"a-534-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":0,"unit":""}},{"id":"a-534-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"none"}}]},{"actionItems":[{"id":"a-534-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":1,"unit":""}},{"id":"a-534-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700047434410},"a-535":{"id":"a-535","title":"Candidate Download Close","actionItemGroups":[{"actionItems":[{"id":"a-535-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":0,"unit":""}},{"id":"a-535-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700047434410},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDatabaseDetail({
  as: _Component = _Builtin.Block,
  slotSearchInput,
  onClickAll = {},
  isAllActive = true,
  isBookMarkedActive = true,
  slotCandidateDetailsCard,
  isSelected = true,
  textSelectedCount = "2",
  onClickClearSelection = {},
  onClickBookmarkSelection = {},
  slotAddtoJob,
  slotCandidateDialog,
  onClickCandidateDatabase = {},
  onClickDownloadBookmarked = {},
  onClickDowloadAllCandidate = {},
  onClickFilter = {},
  textRole = "Software Developer",
  onClickBookmarked = {},
  textAllCount = "2",
  textBookmarkCount = "2",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candidates-database-wrapper")}
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.cvs-info-content-main%20%7B%0Aheight%3A%20calc(100%25%20-%20320px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-header-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-header-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow-back-cd")}
              tag="div"
              {...onClickCandidateDatabase}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%225%22%20height%3D%229%22%20viewbox%3D%220%200%205%209%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.549479%204.70052C0.427951%204.56684%200.427951%204.43316%200.549479%204.29948L4.04948%200.799479C4.18316%200.677951%204.31684%200.677951%204.45052%200.799479C4.57205%200.93316%204.57205%201.06684%204.45052%201.20052L1.16927%204.5L4.45052%207.79948C4.57205%207.93316%204.57205%208.06684%204.45052%208.20052C4.31684%208.32205%204.18316%208.32205%204.04948%208.20052L0.549479%204.70052Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "fw-semibold",
                "one-line-clamp",
                "mx-width-662"
              )}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textRole}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "tablet-left-auto")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-blue-600",
                  "ml-8",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickFilter}
              >
                {"Edit Query"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-header-button-wrapper", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "select-action-btn",
                "outline",
                "relative"
              )}
              data-w-id="d4b3858d-7766-63cc-4349-4e8a95780973"
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%2211%22%20viewbox%3D%220%200%2010%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.05234%2010.7C0.833593%2010.6854%200.716927%2010.5688%200.702343%2010.35C0.716927%2010.1313%200.833593%2010.0146%201.05234%2010H8.75234C8.97109%2010.0146%209.08776%2010.1313%209.10234%2010.35C9.08776%2010.5688%208.97109%2010.6854%208.75234%2010.7H1.05234ZM5.14297%208.49062C4.98255%208.63646%204.82214%208.63646%204.66172%208.49062L1.86172%205.69062C1.71589%205.53021%201.71589%205.36979%201.86172%205.20937C2.02214%205.06354%202.18255%205.06354%202.34297%205.20937L4.55234%207.39687V5.1V1.25C4.56693%201.03125%204.68359%200.914583%204.90234%200.899999C5.12109%200.914583%205.23776%201.03125%205.25234%201.25V5.1V7.39687L7.46172%205.20937C7.62214%205.06354%207.78255%205.06354%207.94297%205.20937C8.0888%205.36979%208.0888%205.53021%207.94297%205.69062L5.14297%208.49062Z%22%20fill%3D%22%231F73B7%22%20style%3D%22fill%3A%231F73B7%3Bfill%3Acolor(display-p3%200.1216%200.4510%200.7176)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Download"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "download-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "download-sub-wrap")}
                  tag="div"
                  {...onClickDownloadBookmarked}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewbox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.32656%2015.05C0.998437%2015.0281%200.823437%2014.8531%200.801562%2014.525C0.823437%2014.1969%200.998437%2014.0219%201.32656%2014H12.8766C13.2047%2014.0219%2013.3797%2014.1969%2013.4016%2014.525C13.3797%2014.8531%2013.2047%2015.0281%2012.8766%2015.05H1.32656ZM7.4625%2011.7359C7.22188%2011.9547%206.98125%2011.9547%206.74063%2011.7359L2.54062%207.53594C2.32187%207.29531%202.32187%207.05469%202.54062%206.81406C2.78125%206.59531%203.02187%206.59531%203.2625%206.81406L6.57656%2010.0953V6.65V0.874999C6.59844%200.546874%206.77344%200.371874%207.10156%200.349999C7.42969%200.371874%207.60469%200.546874%207.62656%200.874999V6.65V10.0953L10.9406%206.81406C11.1813%206.59531%2011.4219%206.59531%2011.6625%206.81406C11.8813%207.05469%2011.8813%207.29531%2011.6625%207.53594L7.4625%2011.7359Z%22%20fill%3D%22%231F73B7%22%20style%3D%22fill%3A%231F73B7%3Bfill%3Acolor(display-p3%200.1216%200.4510%200.7176)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">
                    {"Download only bookmarked candidates"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "download-sub-wrap")}
                  tag="div"
                  {...onClickDowloadAllCandidate}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewbox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.32656%2015.05C0.998437%2015.0281%200.823437%2014.8531%200.801562%2014.525C0.823437%2014.1969%200.998437%2014.0219%201.32656%2014H12.8766C13.2047%2014.0219%2013.3797%2014.1969%2013.4016%2014.525C13.3797%2014.8531%2013.2047%2015.0281%2012.8766%2015.05H1.32656ZM7.4625%2011.7359C7.22188%2011.9547%206.98125%2011.9547%206.74063%2011.7359L2.54062%207.53594C2.32187%207.29531%202.32187%207.05469%202.54062%206.81406C2.78125%206.59531%203.02187%206.59531%203.2625%206.81406L6.57656%2010.0953V6.65V0.874999C6.59844%200.546874%206.77344%200.371874%207.10156%200.349999C7.42969%200.371874%207.60469%200.546874%207.62656%200.874999V6.65V10.0953L10.9406%206.81406C11.1813%206.59531%2011.4219%206.59531%2011.6625%206.81406C11.8813%207.05469%2011.8813%207.29531%2011.6625%207.53594L7.4625%2011.7359Z%22%20fill%3D%22%231F73B7%22%20style%3D%22fill%3A%231F73B7%3Bfill%3Acolor(display-p3%200.1216%200.4510%200.7176)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">
                    {"Download all candidates"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cdb-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-main-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-main-top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-search-wrapper", "hide")}
              tag="div"
            >
              {slotSearchInput}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-filters-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-tabs-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-tab-link", "pointer")}
                  tag="div"
                  {...onClickAll}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "position-relative", "z-5")}
                    tag="div"
                  >
                    {"All"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "number-wrap", "bg-grey-200")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-sm")}
                      tag="div"
                    >
                      {textAllCount}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  {isAllActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-tab-link-bg")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "position-relative",
                          "z-5"
                        )}
                        tag="div"
                      >
                        {"All"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "number-wrap")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-sm")}
                          tag="div"
                        >
                          {textAllCount}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cdb-tab-link",
                    "pointer",
                    "color-grey-800"
                  )}
                  tag="div"
                  {...onClickBookmarked}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "position-relative", "z-5")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3%202.625C3.01562%202.3125%203.125%202.04687%203.32812%201.82812C3.54688%201.625%203.8125%201.51563%204.125%201.5H10.875C11.1875%201.51563%2011.4531%201.625%2011.6719%201.82812C11.875%202.04687%2011.9844%202.3125%2012%202.625V12.9844C11.9688%2013.2969%2011.7969%2013.4688%2011.4844%2013.5C11.375%2013.5%2011.2812%2013.4688%2011.2031%2013.4062L7.5%2010.9453L3.79688%2013.4062C3.71875%2013.4688%203.625%2013.5%203.51562%2013.5C3.20312%2013.4688%203.03125%2013.2969%203%2012.9844V2.625ZM4.125%202.25C3.89062%202.26563%203.76562%202.39062%203.75%202.625V12.5391L7.28906%2010.1953C7.42969%2010.1016%207.57031%2010.1016%207.71094%2010.1953L11.25%2012.5391V2.625C11.2344%202.39062%2011.1094%202.26563%2010.875%202.25H4.125Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "position-relative", "z-5")}
                    tag="div"
                  >
                    {"Bookmarked"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "number-wrap", "bg-grey-200")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-sm")}
                      tag="div"
                    >
                      {textBookmarkCount}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  {isBookMarkedActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-tab-link-bg")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "position-relative",
                          "z-5"
                        )}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons", "color-white")}
                          value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3%202.625C3.01562%202.3125%203.125%202.04687%203.32812%201.82812C3.54688%201.625%203.8125%201.51563%204.125%201.5H10.875C11.1875%201.51563%2011.4531%201.625%2011.6719%201.82812C11.875%202.04687%2011.9844%202.3125%2012%202.625V12.9844C11.9688%2013.2969%2011.7969%2013.4688%2011.4844%2013.5C11.375%2013.5%2011.2812%2013.4688%2011.2031%2013.4062L7.5%2010.9453L3.79688%2013.4062C3.71875%2013.4688%203.625%2013.5%203.51562%2013.5C3.20312%2013.4688%203.03125%2013.2969%203%2012.9844V2.625ZM4.125%202.25C3.89062%202.26563%203.76562%202.39062%203.75%202.625V12.5391L7.28906%2010.1953C7.42969%2010.1016%207.57031%2010.1016%207.71094%2010.1953L11.25%2012.5391V2.625C11.2344%202.39062%2011.1094%202.26563%2010.875%202.25H4.125Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "position-relative",
                          "z-5"
                        )}
                        tag="div"
                      >
                        {"Bookmarked"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "number-wrap")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-sm")}
                          tag="div"
                        >
                          {textBookmarkCount}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-main-bottom")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-main-content")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-cards-wrapper")}
                tag="div"
              >
                {slotCandidateDetailsCard ?? (
                  <>
                    <CandidateDetailsCard />
                    <CandidateEmpty />
                  </>
                )}
              </_Builtin.Block>
            </_Builtin.Block>
            {isSelected ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-selection-bar")}
                tag="div"
              >
                {isSelected ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdb-select-bar-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-select-left-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-613")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "fw-semibold")}
                          tag="div"
                        >
                          {textSelectedCount}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdb-select-clear-btn")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-blue-600-2",
                            "text-underline"
                          )}
                          tag="div"
                          {...onClickClearSelection}
                        >
                          {"Clear Selection"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-select-right-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cdb-select-btn",
                          "clickable"
                        )}
                        tag="div"
                        {...onClickBookmarkSelection}
                      >
                        <_Builtin.Block tag="div">
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.1484C10.7135%2014.513%2010.513%2014.7135%2010.1484%2014.75C10.0208%2014.75%209.91146%2014.7135%209.82031%2014.6406L5.5%2011.7695L1.17969%2014.6406C1.08854%2014.7135%200.979166%2014.75%200.851562%2014.75C0.486978%2014.7135%200.286457%2014.513%200.249999%2014.1484V2.0625ZM1.5625%201.625C1.28906%201.64323%201.14323%201.78906%201.125%202.0625V13.6289L5.25391%2010.8945C5.41797%2010.7852%205.58203%2010.7852%205.74609%2010.8945L9.875%2013.6289V2.0625C9.85677%201.78906%209.71094%201.64323%209.4375%201.625H1.5625Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">
                          {"Bookmark selection"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cdb-select-dropdown",
                          "dropdown"
                        )}
                        tag="div"
                      >
                        {slotAddtoJob ?? <AddJobButton />}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "cdb-sidebar")} tag="div">
          {slotCandidateDialog ?? <CandidateDialog />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
