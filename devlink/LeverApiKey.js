import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./LeverApiKey.module.css";

export function LeverApiKey({
  as: _Component = _Builtin.Block,
  slotSearch,
  onClickContinue = {},
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
        <_Builtin.Block tag="div" {...onClickContinue}>
          <ButtonPrimaryRegular textLabel="Continue" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "lever-api-generate-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {"To generate lever API navigate to"}
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
