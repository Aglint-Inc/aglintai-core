import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WelcomeMatTalentRediscovery.module.css";

export function WelcomeMatTalentRediscovery({
  as: _Component = _Builtin.Block,
  slotSearch,
  isLoading = false,
  slotLoader,
  isSearchVisible = false,
  onclickSearch = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "welcome_mat")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "top_bar", "hide")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-md", "fw-semibold")}
          tag="div"
        >
          {"Candidate Database"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "welcome_mat_wm")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "wm_image_wrapper")}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "wm_img", "max_width_800")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65bb5a8ec3ef64978cd4b9ab_Frame%2031521.png"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "welcome_mat_header")}
          tag="div"
        >
          {"Reconnect with Previous Applicants Using Smart Technology"}
        </_Builtin.Block>
        {isSearchVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "search_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "input_slot")}
              tag="div"
            >
              {slotSearch}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "search_icon_block")}
              tag="div"
              {...onclickSearch}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2225%22%20viewBox%3D%220%200%2024%2025%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15.5%2010.9229C15.5%2010.027%2015.2812%209.19368%2014.8438%208.42285C14.3854%207.65202%2013.7708%207.03743%2013%206.5791C12.2083%206.1416%2011.375%205.92285%2010.5%205.92285C9.625%205.92285%208.79167%206.1416%208%206.5791C7.22917%207.03743%206.61458%207.65202%206.15625%208.42285C5.71875%209.19368%205.5%2010.027%205.5%2010.9229C5.5%2011.8187%205.71875%2012.652%206.15625%2013.4229C6.61458%2014.1937%207.22917%2014.8083%208%2015.2666C8.79167%2015.7041%209.625%2015.9229%2010.5%2015.9229C11.375%2015.9229%2012.2083%2015.7041%2013%2015.2666C13.7708%2014.8083%2014.3854%2014.1937%2014.8438%2013.4229C15.2812%2012.652%2015.5%2011.8187%2015.5%2010.9229ZM14.5312%2016.0166C13.4062%2016.9333%2012.0625%2017.402%2010.5%2017.4229C8.66667%2017.3812%207.13542%2016.7458%205.90625%2015.5166C4.67708%2014.2874%204.04167%2012.7562%204%2010.9229C4.04167%209.08952%204.67708%207.55827%205.90625%206.3291C7.13542%205.09993%208.66667%204.46452%2010.5%204.42285C12.3333%204.46452%2013.8646%205.09993%2015.0938%206.3291C16.3229%207.55827%2016.9583%209.08952%2017%2010.9229C16.9792%2012.4854%2016.5104%2013.8291%2015.5938%2014.9541L19.7812%2019.1416C20.0729%2019.4958%2020.0729%2019.8499%2019.7812%2020.2041C19.4271%2020.4958%2019.0729%2020.4958%2018.7188%2020.2041L14.5312%2016.0166Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              {isLoading ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "loading_div")}
                  tag="div"
                >
                  {slotLoader}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block className={_utils.cx(_styles, "wm_cards")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-_7d35c56c-0f30-5e6f-8683-cecbd30aa75f-d30aa753"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Revive Past Applications"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Rediscover talent in your candidate pool. AI matches past applicants with current job openings, ensuring no talent goes unnoticed."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-_7d35c56c-0f30-5e6f-8683-cecbd30aa764-d30aa753"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Semantic Search"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Our intelligent search understands job requirements beyond keywords. It brings candidates whose skills truly align with the role."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-_7d35c56c-0f30-5e6f-8683-cecbd30aa769-d30aa753"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Effortless Matching"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Simply input your job criteria, and let our AI do the rest. It analyzes past applications to suggest candidates who are not just qualified, but potentially ideal for the role."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-_7d35c56c-0f30-5e6f-8683-cecbd30aa76e-d30aa753"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Smart Suggestions"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Stay ahead with proactive recommendations. Talent Rediscovery suggests past applicants who might be a perfect fit even before you start searching for new roles."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%20%20%5Bclass%3D%22WelcomeMatTalentRediscovery_welcome_mat__RACPz%22%5D%20%7B%0A%20%20%20%20height%3A%20calc(100vh%20-%2060px)%3B%0A%20%20%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
