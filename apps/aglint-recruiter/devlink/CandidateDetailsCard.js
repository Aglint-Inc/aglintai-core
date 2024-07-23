"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Checkbox } from "./Checkbox";
import { CandidateSkills } from "./CandidateSkills";
import { ViewMoreSkills } from "./ViewMoreSkills";
import * as _utils from "./utils";
import _styles from "./CandidateDetailsCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDetailsCard({
  as: _Component = _Builtin.Block,
  onClickCheck = {},
  isChecked = false,
  slotAvatar,
  textName = "Dianne Russell",
  textJobRoleAtCompany = "Software Engineer at Aglint",
  textLocation = "Berlin, germany",
  textOverview = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  isOverviewVisible = true,
  slotSkill,
  isStarActive = false,
  onClickStar = {},
  onClickCard = {},
  isBorderActive = false,
  isLocationVisible = true,
  textJobAddedCount = "1",
  isJobAddedVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cdb-card-block")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cdb-card-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-card-header-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-card-checkmark")}
            tag="div"
            {...onClickCheck}
          >
            {isChecked ? (
              <_Builtin.Block tag="div">
                <Checkbox />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-card-header-main")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-card-profile-image-block")}
              tag="div"
            >
              {slotAvatar}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-card-profile-info")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textName}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-card-company-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-card-company-info-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block-4")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20width%3D%2215%22%20height%3D%2214%22%20viewbox%3D%220%200%2015%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.87695%202.0625V3.375H10.127V2.0625C10.1087%201.78906%209.96289%201.64323%209.68945%201.625H5.31445C5.04102%201.64323%204.89518%201.78906%204.87695%202.0625ZM4.00195%203.375V2.0625C4.02018%201.69792%204.14779%201.38802%204.38477%201.13281C4.63997%200.895833%204.94987%200.768228%205.31445%200.749999H9.68945C10.054%200.768228%2010.3639%200.895833%2010.6191%201.13281C10.8561%201.38802%2010.9837%201.69792%2011.002%202.0625V3.375H12.752C13.2441%203.39323%2013.6543%203.56641%2013.9824%203.89453C14.3105%204.22266%2014.4837%204.63281%2014.502%205.125V12.125C14.4837%2012.6172%2014.3105%2013.0273%2013.9824%2013.3555C13.6543%2013.6836%2013.2441%2013.8568%2012.752%2013.875H2.25195C1.75977%2013.8568%201.34961%2013.6836%201.02148%2013.3555C0.693359%2013.0273%200.520182%2012.6172%200.501953%2012.125V5.125C0.520182%204.63281%200.693359%204.22266%201.02148%203.89453C1.34961%203.56641%201.75977%203.39323%202.25195%203.375H4.00195ZM10.5645%204.25H4.43945H2.25195C1.99674%204.25%201.78711%204.33203%201.62305%204.49609C1.45898%204.66016%201.37695%204.86979%201.37695%205.125V7.75H5.31445H6.18945H8.81445H9.68945H13.627V5.125C13.627%204.86979%2013.5449%204.66016%2013.3809%204.49609C13.2168%204.33203%2013.0072%204.25%2012.752%204.25H10.5645ZM13.627%208.625H9.68945V9.9375C9.68945%2010.1927%209.60742%2010.4023%209.44336%2010.5664C9.2793%2010.7305%209.06966%2010.8125%208.81445%2010.8125H6.18945C5.93424%2010.8125%205.72461%2010.7305%205.56055%2010.5664C5.39648%2010.4023%205.31445%2010.1927%205.31445%209.9375V8.625H1.37695V12.125C1.37695%2012.3802%201.45898%2012.5898%201.62305%2012.7539C1.78711%2012.918%201.99674%2013%202.25195%2013H12.752C13.0072%2013%2013.2168%2012.918%2013.3809%2012.7539C13.5449%2012.5898%2013.627%2012.3802%2013.627%2012.125V8.625ZM6.18945%208.625V9.9375H8.81445V8.625H6.18945Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-grey-600-3",
                      "one-line-clamp"
                    )}
                    tag="div"
                  >
                    {textJobRoleAtCompany}
                  </_Builtin.Block>
                </_Builtin.Block>
                {isLocationVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdb-card-company-info-block"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon-block-4")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed")}
                        value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.877%208C14.8405%206.76042%2014.4121%205.73047%2013.5918%204.91016C12.7715%204.08984%2011.7415%203.66146%2010.502%203.625C9.26237%203.66146%208.23242%204.08984%207.41211%204.91016C6.5918%205.73047%206.16341%206.76042%206.12695%208C6.12695%208.4375%206.2819%209.01172%206.5918%209.72266C6.90169%2010.4518%207.29362%2011.2083%207.76758%2011.9922C8.24154%2012.7578%208.72461%2013.4687%209.2168%2014.125C9.70898%2014.7995%2010.1374%2015.3646%2010.502%2015.8203C10.8665%2015.3646%2011.2949%2014.7995%2011.7871%2014.125C12.2793%2013.4687%2012.7624%2012.7578%2013.2363%2011.9922C13.7285%2011.2083%2014.1296%2010.4518%2014.4395%209.72266C14.7311%209.01172%2014.877%208.4375%2014.877%208ZM15.752%208C15.7155%208.82031%2015.4238%209.76823%2014.877%2010.8437C14.3118%2011.9193%2013.6738%2012.9583%2012.9629%2013.9609C12.252%2014.9818%2011.6504%2015.793%2011.1582%2016.3945C10.9759%2016.6133%2010.7572%2016.7227%2010.502%2016.7227C10.2467%2016.7227%2010.028%2016.6133%209.8457%2016.3945C9.35352%2015.793%208.75195%2014.9818%208.04102%2013.9609C7.33008%2012.9583%206.69206%2011.9193%206.12695%2010.8437C5.58008%209.76823%205.28841%208.82031%205.25195%208C5.28841%206.50521%205.79883%205.26562%206.7832%204.28125C7.76758%203.29687%209.00716%202.78646%2010.502%202.75C11.9967%202.78646%2013.2363%203.29687%2014.2207%204.28125C15.2051%205.26562%2015.7155%206.50521%2015.752%208ZM9.18945%208C9.20768%208.49219%209.42643%208.875%209.8457%209.14844C10.2832%209.36719%2010.7207%209.36719%2011.1582%209.14844C11.5775%208.875%2011.7962%208.49219%2011.8145%208C11.7962%207.50781%2011.5775%207.125%2011.1582%206.85156C10.7207%206.63281%2010.2832%206.63281%209.8457%206.85156C9.42643%207.125%209.20768%207.50781%209.18945%208ZM10.502%2010.1875C9.68164%2010.1693%209.05273%209.80469%208.61523%209.09375C8.21419%208.36458%208.21419%207.63542%208.61523%206.90625C9.05273%206.19531%209.68164%205.83073%2010.502%205.8125C11.3223%205.83073%2011.9512%206.19531%2012.3887%206.90625C12.7897%207.63542%2012.7897%208.36458%2012.3887%209.09375C11.9512%209.80469%2011.3223%2010.1693%2010.502%2010.1875Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-grey-600-3",
                        "one-line-clamp"
                      )}
                      tag="div"
                    >
                      {textLocation}
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-card-header-right")}
          tag="div"
        >
          {isJobAddedVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "job-icon-count-wrap")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.05937%201.18099C4.94878%201.19678%204.88559%201.25998%204.86979%201.37057V2.31849H8.66146V1.37057C8.64566%201.25998%208.58247%201.19678%208.47188%201.18099H5.05937ZM3.73229%201.37057C3.74809%200.991402%203.87448%200.675429%204.11146%200.422652C4.36424%200.185672%204.68021%200.0592833%205.05937%200.0434847H8.47188C8.85104%200.0592833%209.16701%200.185672%209.41979%200.422652C9.65677%200.675429%209.78316%200.991402%209.79896%201.37057V2.31849H11.3156C11.7422%202.33428%2012.0977%202.48437%2012.382%202.76875C12.6664%203.05312%2012.8165%203.40859%2012.8323%203.83515V6.11015H8.28229H5.24896H0.698956V3.83515C0.714754%203.40859%200.864841%203.05312%201.14922%202.76875C1.43359%202.48437%201.78906%202.33428%202.21562%202.31849H3.73229V1.37057ZM12.8323%206.86849V9.90182C12.8165%2010.3284%2012.6664%2010.6839%2012.382%2010.9682C12.0977%2011.2526%2011.7422%2011.4027%2011.3156%2011.4185H2.21562C1.78906%2011.4027%201.43359%2011.2526%201.14922%2010.9682C0.864841%2010.6839%200.714754%2010.3284%200.698956%209.90182V6.86849H5.24896V7.62682C5.24896%207.848%205.32005%208.02969%205.46224%208.17187C5.60443%208.31406%205.78611%208.38516%206.00729%208.38516H7.52396C7.74514%208.38516%207.92682%208.31406%208.06901%208.17187C8.2112%208.02969%208.28229%207.848%208.28229%207.62682V6.86849H12.8323Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{textJobAddedCount}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-star-block")}
            tag="div"
            {...onClickStar}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.1484C10.7135%2014.513%2010.513%2014.7135%2010.1484%2014.75C10.0208%2014.75%209.91146%2014.7135%209.82031%2014.6406L5.5%2011.7695L1.17969%2014.6406C1.08854%2014.7135%200.979166%2014.75%200.851562%2014.75C0.486978%2014.7135%200.286457%2014.513%200.249999%2014.1484V2.0625ZM1.5625%201.625C1.28906%201.64323%201.14323%201.78906%201.125%202.0625V13.6289L5.25391%2010.8945C5.41797%2010.7852%205.58203%2010.7852%205.74609%2010.8945L9.875%2013.6289V2.0625C9.85677%201.78906%209.71094%201.64323%209.4375%201.625H1.5625Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {isStarActive ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed", "absolute")}
                value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.0938C10.7135%2014.4948%2010.4948%2014.7135%2010.0938%2014.75C9.94792%2014.75%209.82031%2014.7135%209.71094%2014.6406L5.5%2011.6875L1.28906%2014.6406C1.17969%2014.7135%201.05208%2014.75%200.906249%2014.75C0.505207%2014.7135%200.286457%2014.4948%200.249999%2014.0938V2.0625Z%22%20fill%3D%22%23F79A3E%22%20style%3D%22fill%3A%23F79A3E%3Bfill%3Acolor(display-p3%200.9686%200.6039%200.2431)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cdb-card-body")} tag="div">
        {isOverviewVisible ? (
          <_Builtin.Paragraph className={_utils.cx(_styles, "text-kale-600-4")}>
            {textOverview}
          </_Builtin.Paragraph>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-card-tags-wrapper")}
          tag="div"
          id="content"
        >
          {slotSkill ?? (
            <>
              <CandidateSkills />
              <ViewMoreSkills />
              <CandidateSkills textSkill="Entry to Senior-Level Prof" />
              <CandidateSkills />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "hide")}
          value="%3Cscript%3E%0Adocument.getElementById('viewmore').addEventListener('click'%2C%20function()%20%7B%0A%20%20var%20content%20%3D%20document.getElementById('content')%3B%0A%0A%20%20%2F%2F%20Toggle%20between%20'58px'%20and%20'none'%20for%20max-height%0A%20%20content.style.maxHeight%20%3D%20content.style.maxHeight%20%3D%3D%3D%20'58px'%20%3F%20content.scrollHeight%20%2B%20'px'%20%3A%20'58px'%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
        />
      </_Builtin.Block>
      {isBorderActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "border-active-blue")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
