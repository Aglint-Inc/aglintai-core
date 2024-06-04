"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./LeverApiKey.module.css";

export function LeverApiKey({
  as: _Component = _Builtin.Block,
  slotSearch,
  onClickContinue = {},
  onClickSupport = {},
  isApiWrong = false,
  slotPrimaryButton,
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block tag="div">
        {"Enter your Lever API key to continue"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "api-key-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-search-lever-api")}
          tag="div"
        >
          {slotSearch}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-537")}
          tag="div"
        >
          {slotPrimaryButton}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "generate-api")} tag="div">
        {isApiWrong ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "warning-lever")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "warning-wraps")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M14.5112%2013.3273L8.5112%201.99398C8.04453%201.11398%206.61787%201.11398%206.1512%201.99398L0.151199%2013.3273C-0.064667%2013.7426%20-0.0484785%2014.2403%200.193914%2014.6407C0.436307%2015.041%200.869851%2015.2861%201.33787%2015.2873H13.3379C13.8045%2015.2873%2014.2312%2015.0473%2014.4845%2014.6473C14.7259%2014.2429%2014.7361%2013.7411%2014.5112%2013.3273ZM6.67122%205.95378C6.67122%205.58044%206.96456%205.28711%207.33789%205.28711C7.71122%205.28711%208.00456%205.58044%208.00456%205.95378V8.62044C8.00456%208.99378%207.71122%209.28711%207.33789%209.28711C6.96456%209.28711%206.67122%208.99378%206.67122%208.62044V5.95378ZM7.33783%2013.0207C6.75116%2013.0207%206.27116%2012.5407%206.27116%2011.954C6.27116%2011.3674%206.75116%2010.8874%207.33783%2010.8874C7.92449%2010.8874%208.40449%2011.3674%208.40449%2011.954C8.40449%2012.5407%207.92449%2013.0207%207.33783%2013.0207Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-yellow-800")}
                    tag="div"
                  >
                    {
                      "Oops something went wrong. Please retry by re-entering Api key or"
                    }
                    <_Builtin.Span
                      className={_utils.cx(
                        _styles,
                        "text-blue-500",
                        "text-underline"
                      )}
                      {...onClickSupport}
                    >
                      {" contact support"}
                    </_Builtin.Span>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
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
            value="%3Csvg%20width%3D%2210%22%20height%3D%2211%22%20viewbox%3D%220%200%2010%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.65934%2010.5906L0.809338%206.74062C0.663505%206.58021%200.663505%206.41979%200.809338%206.25937C0.969755%206.11354%201.13017%206.11354%201.29059%206.25937L4.54996%209.49687V1.25C4.56455%201.03125%204.68121%200.914583%204.89996%200.899999C5.11871%200.914583%205.23538%201.03125%205.24996%201.25V9.49687L8.50934%206.25937C8.66976%206.11354%208.83017%206.11354%208.99059%206.25937C9.13642%206.41979%209.13642%206.58021%208.99059%206.74062L5.14059%2010.5906C4.98017%2010.7365%204.81976%2010.7365%204.65934%2010.5906Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "lever-api-generate-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {"To generate lever API navigate to "}
          <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
            {"Settings > Integrations and API > API Credentials."}
          </_Builtin.Span>
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
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/653a4455cb69ad97c5d24492_Frame%201716.svg"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {
            "Click the Generate New Key button and click the Copy Key button next to the API key (which can be found next to the 'Key name' field)."
          }
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "mt-18")} tag="div">
          {"For more guidelines"}
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "text-link-lever")}
          button={false}
          block=""
          options={{
            href: "https://help.lever.co/hc/en-us/articles/360042364412-Generating-and-using-API-credentials",
            target: "_blank",
          }}
        >
          {
            "https://help.lever.co/hc/en-us/articles/360042364412-Generating-and-using-API-credentials"
          }
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
