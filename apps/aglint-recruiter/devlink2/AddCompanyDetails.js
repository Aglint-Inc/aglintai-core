"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./AddCompanyDetails.module.css";

export function AddCompanyDetails({
  as: _Component = _Builtin.Block,
  isCompanyLogo = true,
  slotLogo,
  slotCompanyDetails,
  isFetchSuccessful = true,
  isFetchFailed = false,
  onclickChangeLogo = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cs-sidebar-company-info")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-details-warning-wrapper", "hide")}
        tag="div"
      >
        {isFetchSuccessful ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-details-warning-block", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block", "_16x16")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "svg-icon")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8%200C3.58667%200%200%203.58667%200%208C0%2012.4133%203.58667%2016%208%2016C12.4133%2016%2016%2012.4133%2016%208C16%203.58667%2012.4133%200%208%200ZM12.5865%206.58667L7.91984%2011.2533C7.75984%2011.4133%207.54651%2011.4933%207.33318%2011.4933C7.11984%2011.4933%206.90651%2011.4133%206.74651%2011.2533L4.07984%208.58667C3.75984%208.26667%203.75984%207.73334%204.07984%207.41334C4.39984%207.09334%204.93318%207.09334%205.25318%207.41334L7.33318%209.49334L11.4132%205.41334C11.7332%205.09334%2012.2665%205.09334%2012.5865%205.41334C12.9198%205.73334%2012.9198%206.26667%2012.5865%206.58667Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-green-500")}
              tag="div"
            >
              {"Company details fetched successfully."}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isFetchFailed ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-details-warning-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block", "_16x16")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "svg-icon")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.33333%2016C3.28%2016%200%2012.72%200%208.66668C0%204.61334%203.28%201.33334%207.33333%201.33334C11.3867%201.33334%2014.6667%204.61334%2014.6667%208.66668C14.6667%2012.72%2011.3867%2016%207.33333%2016ZM6.66667%2012.6667C6.66667%2013.04%206.96%2013.3334%207.33333%2013.3334C7.70667%2013.3334%208%2013.04%208%2012.6667V8.6667C8%208.29336%207.70667%208.00003%207.33333%208.00003C6.96%208.00003%206.66667%208.29336%206.66667%208.6667V12.6667ZM7.33333%204.00003C6.6%204.00003%206%204.60003%206%205.33336C6%206.0667%206.6%206.6667%207.33333%206.6667C8.06667%206.6667%208.66667%206.0667%208.66667%205.33336C8.66667%204.60003%208.06667%204.00003%207.33333%204.00003Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-yellow-500")}
              tag="div"
            >
              {"Unable to fetch company information. enter details manually."}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isCompanyLogo ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-detail-block")}
          tag="div"
        >
          <Text content="Company Logo" />
          <_Builtin.Block
            className={_utils.cx(_styles, "sl-company-title-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "sl-company-image-block")}
              tag="div"
            >
              {slotLogo ?? <SlotComp componentName="Image" />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "sl-com-title-info-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cs-change-button", "chang-btn")}
                tag="div"
                {...onclickChangeLogo}
              >
                <Text content="Change Logo" color="accent" />
              </_Builtin.Block>
              <Text
                content="Upload a company logo (PNG or JPEG). Maximum size: 2 MB."
                weight=""
                color="neutral"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-sidebar-company-form")}
        tag="div"
      >
        {slotCompanyDetails}
      </_Builtin.Block>
    </_Component>
  );
}
