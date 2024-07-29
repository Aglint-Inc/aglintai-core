"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CompanyInfoDetails.module.css";

export function CompanyInfoDetails({
  as: _Component = _Builtin.Block,
  slotImage,
  textCompanyName = "Microsoft",
  textCompanySites = "microsoft.com",
  slotEditButton,
  slotDetails,
  slotSocialLink,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "company-info-details-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cid-header-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cid-header-wrapper-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cid-header-image")}
            tag="div"
          >
            {slotImage}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cid-header-text-wrap")}
            tag="div"
          >
            <Text content={textCompanyName} weight="medium" size="3" />
            <Text content={textCompanySites} color="neutral" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotEditButton}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cid-company-details")}
        tag="div"
      >
        {slotDetails}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cid-social-link-wraps")}
        tag="div"
      >
        <Text size="1" color="neutral" content="" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-cid-social-link")}
          tag="div"
        >
          {slotSocialLink}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
