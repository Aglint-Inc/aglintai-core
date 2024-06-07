"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IntegrationFetching.module.css";

export function IntegrationFetching({
  as: _Component = _Builtin.Block,
  slotLottie,
  slotIntegrationLogo,
  textCompany = " lever",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "fetching-job-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "logo-fetching-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-integration-logo")}
          tag="div"
        >
          {slotIntegrationLogo ?? (
            <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2254%22%20height%3D%2242%22%20viewbox%3D%220%200%2054%2042%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_4170_64578)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.0574%2038.8087L32.4456%2031.1949C32.2052%2030.9592%2031.882%2030.8271%2031.5453%2030.8271C31.2086%2030.8271%2030.8854%2030.9592%2030.645%2031.1949L23.0332%2038.8087C22.8517%2038.9818%2022.7271%2039.206%2022.6762%2039.4516C22.6252%2039.6972%2022.6502%2039.9525%2022.7479%2040.1836C22.8456%2040.4146%2023.0113%2040.6104%2023.2229%2040.745C23.4346%2040.8795%2023.6822%2040.9464%2023.9329%2040.9367H39.1577C39.4069%2040.943%2039.6522%2040.874%2039.8616%2040.7389C40.0711%2040.6038%2040.235%2040.4087%2040.3321%2040.1791C40.4292%2039.9495%2040.4549%2039.696%2040.4059%2039.4515C40.3569%2039.2071%2040.2354%2038.9831%2040.0574%2038.8087Z%22%20fill%3D%22%23C3C6CC%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40.311%2011.4618L37.9266%204.38252C37.819%204.06237%2037.6475%203.76743%2037.4224%203.51562L0.293457%2040.6469C0.51135%2040.8419%200.795974%2040.9456%201.08825%2040.9363H11.6341C11.9288%2040.9377%2012.2209%2040.881%2012.4937%2040.7693C12.7665%2040.6576%2013.0145%2040.4932%2013.2236%2040.2855L39.8055%2013.701C40.0944%2013.4148%2040.2955%2013.0519%2040.3851%2012.6552C40.4746%2012.2584%2040.4489%2011.8444%2040.311%2011.4618Z%22%20fill%3D%22%23E1E3E6%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M36.5542%203.00786L29.4757%200.624519C29.0931%200.486568%2028.6791%200.460853%2028.2824%200.55041C27.8857%200.639967%2027.5228%200.841063%2027.2366%201.13L0.653471%2027.7144C0.2353%2028.1376%200.00177199%2028.7092%200.00399186%2029.3041V39.851C-0.00529071%2040.1433%200.0983307%2040.4279%200.29335%2040.6458L37.4223%203.51464C37.1702%203.28879%2036.8749%203.11639%2036.5542%203.00786Z%22%20fill%3D%22%23C3C6CC%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_4170_64578%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2253.3865%22%20height%3D%2240.5737%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.499023)%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E" />
          )}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotLottie}</_Builtin.Block>
        <_Builtin.Image
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/653a4f0772ec5dfeaf85b44a_Frame%201717.svg"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-578")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Fetching jobs from "}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-579")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textCompany}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"This won’t take long."}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
