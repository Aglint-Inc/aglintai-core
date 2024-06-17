"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import * as _utils from "./utils";
import _styles from "./LearnHowGreenhouse.module.css";

export function LearnHowGreenhouse({
  as: _Component = _Builtin.Block,
  onClickClose = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "helper_popup")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "popup_title_block")}
        tag="div"
      >
        <Text
          size="3"
          weight="bold"
          align=""
          highContrast=""
          content="How to connect with Greenhouse"
        />
        <IconButtonGhost
          onClickButton={onClickClose}
          iconName="close"
          iconWeight="thin"
          iconColor="neutral"
          color="neutral"
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.RichText
          className={_utils.cx(_styles, "helper_richtext")}
          tag="div"
        >
          <_Builtin.Paragraph>
            {
              "To establish a connection with Greenhouse, you'll first need to obtain your API key. Here's how:"
            }
          </_Builtin.Paragraph>
          <_Builtin.List
            className={_utils.cx(_styles, "list", "mt-20", "mb-20")}
            tag="ul"
            unstyled={false}
          >
            <_Builtin.ListItem>
              {"Go to your Lever account settings."}
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              {"Navigate to the "}
              <_Builtin.Strong>{"Data Flow"}</_Builtin.Strong>
              {" section and select "}
              <_Builtin.Strong>{"API Management"}</_Builtin.Strong>
              {"."}
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              {"On the API Management page, locate the option to "}
              <_Builtin.Strong>{"Create a new API Key"}</_Builtin.Strong>
              {" and click on it."}
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              {"Copy the API key and paste it in Aglint's "}
              <br />
              {"‍"}
              <_Builtin.Strong>
                {"Integrations > Greenhouse > Connect"}
              </_Builtin.Strong>
            </_Builtin.ListItem>
          </_Builtin.List>
          <_Builtin.Figure
            figure={{
              type: "image",
              align: "fullwidth",
              maxWidth: "1452px",
            }}
          >
            <_Builtin.Block tag="div">
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65fa7deb35ec537dc557c2c0_image%2013.png"
              />
            </_Builtin.Block>
          </_Builtin.Figure>
        </_Builtin.RichText>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "popup_link_block")}
        tag="div"
      >
        <Text weight="" color="neutral" content="For more guidelines visit :" />
        <_Builtin.Link
          button={false}
          block=""
          options={{
            href: "https://support.greenhouse.io/hc/en-us/articles/360003470371-Generate-a-Greenhouse-Onboarding-API-key#:~:text=To%20create%20a%20new%20API,Click%20Create.",
            target: "_blank",
          }}
        >
          {"https://support.greenhouse.io/hc/en-us/articles/360003470371-..."}
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
