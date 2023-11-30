import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./AshbyApiKey.module.css";

export function AshbyApiKey({
  as: _Component = _Builtin.Block,
  slotInput,
  onClickContinue = {},
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block tag="div">
        {"Enter your Ashby API key to continue"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "api-key-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-search-lever-api")}
          tag="div"
        >
          {slotInput}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-537")}
          tag="div"
          {...onClickContinue}
        >
          <ButtonPrimaryRegular textLabel="Continue" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "generate-api")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-539")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"How to generate api Key"}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2210%22%20height%3D%2211%22%20viewBox%3D%220%200%2010%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.65934%2010.5906L0.809338%206.74062C0.663505%206.58021%200.663505%206.41979%200.809338%206.25937C0.969755%206.11354%201.13017%206.11354%201.29059%206.25937L4.54996%209.49687V1.25C4.56455%201.03125%204.68121%200.914583%204.89996%200.899999C5.11871%200.914583%205.23538%201.03125%205.24996%201.25V9.49687L8.50934%206.25937C8.66976%206.11354%208.83017%206.11354%208.99059%206.25937C9.13642%206.41979%209.13642%206.58021%208.99059%206.74062L5.14059%2010.5906C4.98017%2010.7365%204.81976%2010.7365%204.65934%2010.5906Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "lever-api-generate-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "width-581")} tag="div">
          {"To create a new API key, navigate to"}
          <_Builtin.Strong>{" Admin tab"}</_Builtin.Strong>
          {", then select "}
          <_Builtin.Strong>{"Integrations > Rectxt"}</_Builtin.Strong>
          {" from the left panel."}
          <br />
          {"Click "}
          <_Builtin.Strong>{"'Create API key for Rectxt' "}</_Builtin.Strong>
          {"button"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lever-api-image-wraps")}
          tag="div"
        >
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6566dad0d0f9b83eff0fce01_image%2014.svg"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "mt-18")} tag="div">
          {"For more guidelines visit"}
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "text-link-lever")}
          button={false}
          options={{
            href: "https://support.rectxt.com/en/articles/6746802-finding-your-ashby-api-key",
            target: "_blank",
          }}
        >
          {
            "https://support.rectxt.com/en/articles/6746802-finding-your-ashby-api-key"
          }
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
