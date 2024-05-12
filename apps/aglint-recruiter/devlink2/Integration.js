"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IntegrationCard } from "./IntegrationCard";
import * as _utils from "./utils";
import _styles from "./Integration.module.css";

export function Integration({
  as: _Component = _Builtin.Block,
  slotHrTools,
  slotScheduling,
  slotMessaging,
}) {
  return (
    <_Component className={_utils.cx(_styles, "integration-wrapp")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1240")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "integration_title")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"ATS"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {
              "Easily manage job postings and candidate information by connecting your preferred ATS."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1241")}
          tag="div"
        >
          {slotHrTools ?? <IntegrationCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1240")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "integration_title")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Scheduling Tools"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {
              "Connect your calendar and video conferencing tools to simplify interview scheduling."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1241")}
          tag="div"
        >
          {slotScheduling}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1240", "border-none")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "integration_title")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Communication Platforms"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {
              "Coming soon! You’ll be able to connect popular communication tools to enhance your team’s coordination."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1241")}
          tag="div"
        >
          {slotMessaging}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
