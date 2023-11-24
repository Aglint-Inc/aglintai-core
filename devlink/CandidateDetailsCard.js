import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateSkills } from "./CandidateSkills";
import { ViewMoreSkills } from "./ViewMoreSkills";
import * as _utils from "./utils";
import _styles from "./CandidateDetailsCard.module.css";

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
}) {
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
              <_Builtin.Image
                className={_utils.cx(_styles, "checkbox-image")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544e03f56a77e2226e848a3_Frame%201%20(2).png"
              />
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
                      value="%3Csvg%20width%3D%2215%22%20height%3D%2214%22%20viewBox%3D%220%200%2015%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.87695%202.0625V3.375H10.127V2.0625C10.1087%201.78906%209.96289%201.64323%209.68945%201.625H5.31445C5.04102%201.64323%204.89518%201.78906%204.87695%202.0625ZM4.00195%203.375V2.0625C4.02018%201.69792%204.14779%201.38802%204.38477%201.13281C4.63997%200.895833%204.94987%200.768228%205.31445%200.749999H9.68945C10.054%200.768228%2010.3639%200.895833%2010.6191%201.13281C10.8561%201.38802%2010.9837%201.69792%2011.002%202.0625V3.375H12.752C13.2441%203.39323%2013.6543%203.56641%2013.9824%203.89453C14.3105%204.22266%2014.4837%204.63281%2014.502%205.125V12.125C14.4837%2012.6172%2014.3105%2013.0273%2013.9824%2013.3555C13.6543%2013.6836%2013.2441%2013.8568%2012.752%2013.875H2.25195C1.75977%2013.8568%201.34961%2013.6836%201.02148%2013.3555C0.693359%2013.0273%200.520182%2012.6172%200.501953%2012.125V5.125C0.520182%204.63281%200.693359%204.22266%201.02148%203.89453C1.34961%203.56641%201.75977%203.39323%202.25195%203.375H4.00195ZM10.5645%204.25H4.43945H2.25195C1.99674%204.25%201.78711%204.33203%201.62305%204.49609C1.45898%204.66016%201.37695%204.86979%201.37695%205.125V7.75H5.31445H6.18945H8.81445H9.68945H13.627V5.125C13.627%204.86979%2013.5449%204.66016%2013.3809%204.49609C13.2168%204.33203%2013.0072%204.25%2012.752%204.25H10.5645ZM13.627%208.625H9.68945V9.9375C9.68945%2010.1927%209.60742%2010.4023%209.44336%2010.5664C9.2793%2010.7305%209.06966%2010.8125%208.81445%2010.8125H6.18945C5.93424%2010.8125%205.72461%2010.7305%205.56055%2010.5664C5.39648%2010.4023%205.31445%2010.1927%205.31445%209.9375V8.625H1.37695V12.125C1.37695%2012.3802%201.45898%2012.5898%201.62305%2012.7539C1.78711%2012.918%201.99674%2013%202.25195%2013H12.752C13.0072%2013%2013.2168%2012.918%2013.3809%2012.7539C13.5449%2012.5898%2013.627%2012.3802%2013.627%2012.125V8.625ZM6.18945%208.625V9.9375H8.81445V8.625H6.18945Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-600-3")}
                    tag="div"
                  >
                    {textJobRoleAtCompany}
                  </_Builtin.Block>
                </_Builtin.Block>
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
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.877%208C14.8405%206.76042%2014.4121%205.73047%2013.5918%204.91016C12.7715%204.08984%2011.7415%203.66146%2010.502%203.625C9.26237%203.66146%208.23242%204.08984%207.41211%204.91016C6.5918%205.73047%206.16341%206.76042%206.12695%208C6.12695%208.4375%206.2819%209.01172%206.5918%209.72266C6.90169%2010.4518%207.29362%2011.2083%207.76758%2011.9922C8.24154%2012.7578%208.72461%2013.4687%209.2168%2014.125C9.70898%2014.7995%2010.1374%2015.3646%2010.502%2015.8203C10.8665%2015.3646%2011.2949%2014.7995%2011.7871%2014.125C12.2793%2013.4687%2012.7624%2012.7578%2013.2363%2011.9922C13.7285%2011.2083%2014.1296%2010.4518%2014.4395%209.72266C14.7311%209.01172%2014.877%208.4375%2014.877%208ZM15.752%208C15.7155%208.82031%2015.4238%209.76823%2014.877%2010.8437C14.3118%2011.9193%2013.6738%2012.9583%2012.9629%2013.9609C12.252%2014.9818%2011.6504%2015.793%2011.1582%2016.3945C10.9759%2016.6133%2010.7572%2016.7227%2010.502%2016.7227C10.2467%2016.7227%2010.028%2016.6133%209.8457%2016.3945C9.35352%2015.793%208.75195%2014.9818%208.04102%2013.9609C7.33008%2012.9583%206.69206%2011.9193%206.12695%2010.8437C5.58008%209.76823%205.28841%208.82031%205.25195%208C5.28841%206.50521%205.79883%205.26562%206.7832%204.28125C7.76758%203.29687%209.00716%202.78646%2010.502%202.75C11.9967%202.78646%2013.2363%203.29687%2014.2207%204.28125C15.2051%205.26562%2015.7155%206.50521%2015.752%208ZM9.18945%208C9.20768%208.49219%209.42643%208.875%209.8457%209.14844C10.2832%209.36719%2010.7207%209.36719%2011.1582%209.14844C11.5775%208.875%2011.7962%208.49219%2011.8145%208C11.7962%207.50781%2011.5775%207.125%2011.1582%206.85156C10.7207%206.63281%2010.2832%206.63281%209.8457%206.85156C9.42643%207.125%209.20768%207.50781%209.18945%208ZM10.502%2010.1875C9.68164%2010.1693%209.05273%209.80469%208.61523%209.09375C8.21419%208.36458%208.21419%207.63542%208.61523%206.90625C9.05273%206.19531%209.68164%205.83073%2010.502%205.8125C11.3223%205.83073%2011.9512%206.19531%2012.3887%206.90625C12.7897%207.63542%2012.7897%208.36458%2012.3887%209.09375C11.9512%209.80469%2011.3223%2010.1693%2010.502%2010.1875Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-600-3")}
                    tag="div"
                  >
                    {textLocation}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-card-header-right")}
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
      <_Builtin.Block className={_utils.cx(_styles, "cdb-card-body")} tag="div">
        {isOverviewVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-intro-overview-block-2")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cvs-intro-top")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block-4")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
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
              className={_utils.cx(_styles, "text-kale-600-4")}
            >
              {textOverview}
            </_Builtin.Paragraph>
          </_Builtin.Block>
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
