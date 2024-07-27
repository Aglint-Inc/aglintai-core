"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { CandidateDatabaseRow } from "./CandidateDatabaseRow";
import { Pagination } from "./Pagination";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseTable.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1450":{"id":"e-1450","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-526","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1451"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-column-2","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-column-2","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1698671045933},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-526":{"id":"a-526","title":"skeletal-loader","actionItemGroups":[{"actionItems":[{"id":"a-526-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"xValue":-100,"yValue":-50,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-526-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":2000,"target":{},"xValue":100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-526-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698671059774},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDatabaseTable({
  as: _Component = _Builtin.Block,
  textCandidateCount = "20",
  slotButtonOutlinedPrimary,
  slotCandidateRows,
  onClickCheck = {},
  isChecked = false,
  slotCandidateDetails,
  slotPagination,
  onClickAiSearch = {},
  propsOpacity = {},
  slotAddtoJob,
  slotFilter,
  slotSort,
  onClickReset = {},
  isAddToJobVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candidate-database-main-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-database-main-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-left-wrap-text")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-761", "cursor-pointer")}
            tag="div"
            {...onClickAiSearch}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.35355%201.64645C8.52712%201.82001%208.5464%202.08944%208.41141%202.28431L8.35355%202.35355L4.707%206L8.35355%209.64645C8.52712%209.82001%208.5464%2010.0894%208.41141%2010.2843L8.35355%2010.3536C8.17999%2010.5271%207.91056%2010.5464%207.71569%2010.4114L7.64645%2010.3536L3.64645%206.35355C3.47288%206.17999%203.4536%205.91056%203.58859%205.71569L3.64645%205.64645L7.64645%201.64645C7.84171%201.45118%208.15829%201.45118%208.35355%201.64645Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Back"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Candidate Database"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-760")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"("}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textCandidateCount}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {")"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-right-wrap-btn")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "hide")} tag="div">
            {slotButtonOutlinedPrimary ?? (
              <ButtonOutlinedRegular textLabel="Import Candidate" />
            )}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotSort ?? <SortButton />}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotFilter ?? <FilterButton />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cdcard-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "cdcard-sub-wrap", "no-wrapp")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-627")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cv-list-row-2",
                "top",
                "height-48"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-column-2", "checkbox")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-list-checkbox-2")}
                  tag="div"
                  {...onClickCheck}
                >
                  {isChecked ? (
                    <_Builtin.Image
                      className={_utils.cx(_styles, "cli-check-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544e03f56a77e2226e848a3_Frame%201%20(2).png"
                    />
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-row-main")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cv-list-column-2",
                    "name-cd-wrap"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cv-list-profile-image-2")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2213%22%20height%3D%2215%22%20viewbox%3D%220%200%2013%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.75%204.25C8.75%203.77604%208.63151%203.33854%208.39453%202.9375C8.15755%202.53646%207.83854%202.21745%207.4375%201.98047C7.01823%201.74349%206.58073%201.625%206.125%201.625C5.66927%201.625%205.23177%201.74349%204.8125%201.98047C4.41146%202.21745%204.09245%202.53646%203.85547%202.9375C3.61849%203.33854%203.5%203.77604%203.5%204.25C3.5%204.72396%203.61849%205.16146%203.85547%205.5625C4.09245%205.96354%204.41146%206.28255%204.8125%206.51953C5.23177%206.75651%205.66927%206.875%206.125%206.875C6.58073%206.875%207.01823%206.75651%207.4375%206.51953C7.83854%206.28255%208.15755%205.96354%208.39453%205.5625C8.63151%205.16146%208.75%204.72396%208.75%204.25ZM2.625%204.25C2.625%203.61198%202.77995%203.02865%203.08984%202.5C3.39974%201.97135%203.82812%201.54297%204.375%201.21484C4.92188%200.904948%205.50521%200.75%206.125%200.75C6.74479%200.75%207.32812%200.904948%207.875%201.21484C8.42188%201.54297%208.85026%201.97135%209.16016%202.5C9.47005%203.02865%209.625%203.61198%209.625%204.25C9.625%204.88802%209.47005%205.47135%209.16016%206C8.85026%206.52865%208.42188%206.95703%207.875%207.28516C7.32812%207.59505%206.74479%207.75%206.125%207.75C5.50521%207.75%204.92188%207.59505%204.375%207.28516C3.82812%206.95703%203.39974%206.52865%203.08984%206C2.77995%205.47135%202.625%204.88802%202.625%204.25ZM0.875%2013.875H11.375C11.3385%2012.763%2010.9375%2011.8333%2010.1719%2011.0859C9.42448%2010.3568%208.49479%209.97396%207.38281%209.9375H4.86719C3.75521%209.97396%202.82552%2010.3568%202.07812%2011.0859C1.3125%2011.8333%200.911458%2012.763%200.875%2013.875ZM0%2013.9297C0.0364583%2012.5625%200.510417%2011.4141%201.42188%2010.4844C2.35156%209.57292%203.5%209.09896%204.86719%209.0625H7.38281C8.75%209.09896%209.89844%209.57292%2010.8281%2010.4844C11.7396%2011.4141%2012.2135%2012.5625%2012.25%2013.9297C12.25%2014.1667%2012.168%2014.3581%2012.0039%2014.5039C11.8581%2014.668%2011.6667%2014.75%2011.4297%2014.75H0.820312C0.583333%2014.75%200.391927%2014.668%200.246094%2014.5039C0.0820312%2014.3581%200%2014.1667%200%2013.9297Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "line-clamp-1")}
                    tag="div"
                  >
                    {"Candidates"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-list-column-2", "title")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"Assosiate software engineer"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cv-list-column-2",
                    "applied-job"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cv-list-profile-image-2")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.375%202.0625V3.375H9.625V2.0625C9.60677%201.78906%209.46094%201.64323%209.1875%201.625H4.8125C4.53906%201.64323%204.39323%201.78906%204.375%202.0625ZM3.5%203.375V2.0625C3.51823%201.69792%203.64583%201.38802%203.88281%201.13281C4.13802%200.895833%204.44792%200.768229%204.8125%200.75H9.1875C9.55208%200.768229%209.86198%200.895833%2010.1172%201.13281C10.3542%201.38802%2010.4818%201.69792%2010.5%202.0625V3.375H12.25C12.7422%203.39323%2013.1523%203.56641%2013.4805%203.89453C13.8086%204.22266%2013.9818%204.63281%2014%205.125V12.125C13.9818%2012.6172%2013.8086%2013.0273%2013.4805%2013.3555C13.1523%2013.6836%2012.7422%2013.8568%2012.25%2013.875H1.75C1.25781%2013.8568%200.847656%2013.6836%200.519531%2013.3555C0.191406%2013.0273%200.0182292%2012.6172%200%2012.125V5.125C0.0182292%204.63281%200.191406%204.22266%200.519531%203.89453C0.847656%203.56641%201.25781%203.39323%201.75%203.375H3.5ZM10.0625%204.25H3.9375H1.75C1.49479%204.25%201.28516%204.33203%201.12109%204.49609C0.957031%204.66016%200.875%204.86979%200.875%205.125V7.75H4.8125H5.6875H8.3125H9.1875H13.125V5.125C13.125%204.86979%2013.043%204.66016%2012.8789%204.49609C12.7148%204.33203%2012.5052%204.25%2012.25%204.25H10.0625ZM13.125%208.625H9.1875V9.9375C9.1875%2010.1927%209.10547%2010.4023%208.94141%2010.5664C8.77734%2010.7305%208.56771%2010.8125%208.3125%2010.8125H5.6875C5.43229%2010.8125%205.22266%2010.7305%205.05859%2010.5664C4.89453%2010.4023%204.8125%2010.1927%204.8125%209.9375V8.625H0.875V12.125C0.875%2012.3802%200.957031%2012.5898%201.12109%2012.7539C1.28516%2012.918%201.49479%2013%201.75%2013H12.25C12.5052%2013%2012.7148%2012.918%2012.8789%2012.7539C13.043%2012.5898%2013.125%2012.3802%2013.125%2012.125V8.625ZM5.6875%208.625V9.9375H8.3125V8.625H5.6875Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "line-clamp-1")}
                    tag="div"
                  >
                    {"Current Job Title"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-list-column-2", "email")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cv-list-profile-image-2")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2014%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.75%201.375C1.49479%201.375%201.28516%201.45703%201.12109%201.62109C0.957031%201.78516%200.875%201.99479%200.875%202.25V3.34375L6.23438%207.25391C6.74479%207.60026%207.25521%207.60026%207.76562%207.25391L13.125%203.34375V2.25C13.125%201.99479%2013.043%201.78516%2012.8789%201.62109C12.7148%201.45703%2012.5052%201.375%2012.25%201.375H1.75ZM0.875%204.4375V9.25C0.875%209.50521%200.957031%209.71484%201.12109%209.87891C1.28516%2010.043%201.49479%2010.125%201.75%2010.125H12.25C12.5052%2010.125%2012.7148%2010.043%2012.8789%209.87891C13.043%209.71484%2013.125%209.50521%2013.125%209.25V4.4375L8.28516%207.96484C7.90234%208.25651%207.47396%208.40234%207%208.40234C6.52604%208.40234%206.09766%208.25651%205.71484%207.96484L0.875%204.4375ZM0%202.25C0.0182292%201.75781%200.191406%201.34766%200.519531%201.01953C0.847656%200.691406%201.25781%200.518229%201.75%200.5H12.25C12.7422%200.518229%2013.1523%200.691406%2013.4805%201.01953C13.8086%201.34766%2013.9818%201.75781%2014%202.25V9.25C13.9818%209.74219%2013.8086%2010.1523%2013.4805%2010.4805C13.1523%2010.8086%2012.7422%2010.9818%2012.25%2011H1.75C1.25781%2010.9818%200.847656%2010.8086%200.519531%2010.4805C0.191406%2010.1523%200.0182292%209.74219%200%209.25V2.25Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "line-clamp-1")}
                    tag="div"
                  >
                    {"Email"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cv-list-column-2",
                    "locations",
                    "bg-grey-100"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cv-list-profile-image-2")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.625%206C9.58854%204.76042%209.16016%203.73047%208.33984%202.91016C7.51953%202.08984%206.48958%201.66146%205.25%201.625C4.01042%201.66146%202.98047%202.08984%202.16016%202.91016C1.33984%203.73047%200.911458%204.76042%200.875%206C0.875%206.4375%201.02995%207.01172%201.33984%207.72266C1.64974%208.45182%202.04167%209.20833%202.51562%209.99219C2.98958%2010.7578%203.47266%2011.4688%203.96484%2012.125C4.45703%2012.7995%204.88542%2013.3646%205.25%2013.8203C5.61458%2013.3646%206.04297%2012.7995%206.53516%2012.125C7.02734%2011.4688%207.51042%2010.7578%207.98438%209.99219C8.47656%209.20833%208.8776%208.45182%209.1875%207.72266C9.47917%207.01172%209.625%206.4375%209.625%206ZM10.5%206C10.4635%206.82031%2010.1719%207.76823%209.625%208.84375C9.0599%209.91927%208.42188%2010.9583%207.71094%2011.9609C7%2012.9818%206.39844%2013.793%205.90625%2014.3945C5.72396%2014.6133%205.50521%2014.7227%205.25%2014.7227C4.99479%2014.7227%204.77604%2014.6133%204.59375%2014.3945C4.10156%2013.793%203.5%2012.9818%202.78906%2011.9609C2.07812%2010.9583%201.4401%209.91927%200.875%208.84375C0.328125%207.76823%200.0364583%206.82031%200%206C0.0364583%204.50521%200.546875%203.26562%201.53125%202.28125C2.51562%201.29688%203.75521%200.786458%205.25%200.75C6.74479%200.786458%207.98438%201.29688%208.96875%202.28125C9.95312%203.26562%2010.4635%204.50521%2010.5%206ZM3.9375%206C3.95573%206.49219%204.17448%206.875%204.59375%207.14844C5.03125%207.36719%205.46875%207.36719%205.90625%207.14844C6.32552%206.875%206.54427%206.49219%206.5625%206C6.54427%205.50781%206.32552%205.125%205.90625%204.85156C5.46875%204.63281%205.03125%204.63281%204.59375%204.85156C4.17448%205.125%203.95573%205.50781%203.9375%206ZM5.25%208.1875C4.42969%208.16927%203.80078%207.80469%203.36328%207.09375C2.96224%206.36458%202.96224%205.63542%203.36328%204.90625C3.80078%204.19531%204.42969%203.83073%205.25%203.8125C6.07031%203.83073%206.69922%204.19531%207.13672%204.90625C7.53776%205.63542%207.53776%206.36458%207.13672%207.09375C6.69922%207.80469%206.07031%208.16927%205.25%208.1875Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "line-clamp-1")}
                    tag="div"
                  >
                    {"Location"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cv-list-column-2",
                    "date",
                    "bg-grey-100"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cv-list-profile-image-2")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2210%22%20height%3D%2215%22%20viewbox%3D%220%200%2010%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.625%201.625C2.36979%201.625%202.16016%201.70703%201.99609%201.87109C1.83203%202.03516%201.75%202.24479%201.75%202.5V13C1.75%2013.2552%201.83203%2013.4648%201.99609%2013.6289C2.16016%2013.793%202.36979%2013.875%202.625%2013.875H7.875C8.13021%2013.875%208.33984%2013.793%208.50391%2013.6289C8.66797%2013.4648%208.75%2013.2552%208.75%2013V2.5C8.75%202.24479%208.66797%202.03516%208.50391%201.87109C8.33984%201.70703%208.13021%201.625%207.875%201.625H2.625ZM0.875%202.5C0.893229%202.00781%201.06641%201.59766%201.39453%201.26953C1.72266%200.941406%202.13281%200.768229%202.625%200.75H7.875C8.36719%200.768229%208.77734%200.941406%209.10547%201.26953C9.43359%201.59766%209.60677%202.00781%209.625%202.5V13C9.60677%2013.4922%209.43359%2013.9023%209.10547%2014.2305C8.77734%2014.5586%208.36719%2014.7318%207.875%2014.75H2.625C2.13281%2014.7318%201.72266%2014.5586%201.39453%2014.2305C1.06641%2013.9023%200.893229%2013.4922%200.875%2013V2.5ZM4.375%2011.6875H6.125C6.39844%2011.7057%206.54427%2011.8516%206.5625%2012.125C6.54427%2012.3984%206.39844%2012.5443%206.125%2012.5625H4.375C4.10156%2012.5443%203.95573%2012.3984%203.9375%2012.125C3.95573%2011.8516%204.10156%2011.7057%204.375%2011.6875Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{"Phone"}</_Builtin.Block>
                </_Builtin.Block>
                {isAddToJobVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "slot-candidate-header-second"
                    )}
                    tag="div"
                  >
                    {slotAddtoJob}
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-763")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-620")}
              tag="div"
              {...propsOpacity}
            >
              {slotCandidateRows ?? (
                <>
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                  <CandidateDatabaseRow />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-page-nav-bar")}
            tag="div"
          >
            {slotPagination ?? <Pagination />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-616")}
          tag="div"
        >
          {slotCandidateDetails}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%40media%20only%20screen%20and%20(max-width%3A%201840px)%20%7B%0A%20%20%0A%0A%5Bclass*%3D%22CandidateDatabaseTable_div-block-620__%22%5D%7B%0Awidth%3A100%25%3B%0A%7D%0A%7D%0A%5Bclass*%3D%22CandidateDatabaseTable_cv-list-row-2__%22%5D%7B%0Awidth%3A100%25%20!important%3B%0A%7D%0A%0A%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
