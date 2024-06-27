"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import * as _utils from "./utils";
import _styles from "./LearnHowLever.module.css";

export function LearnHowLever({
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
          weight="medium"
          align=""
          highContrast=""
          content="How to connect with Lever"
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
              "To establish a connection with Lever, you'll first need to obtain your API key. Here's how:"
            }
          </_Builtin.Paragraph>
          <_Builtin.List
            className={_utils.cx(_styles, "learn-list-how")}
            tag="ul"
            unstyled={false}
          >
            <_Builtin.ListItem>
              {"To generate lever API navigate to "}
              <_Builtin.Strong>
                {" Settings > Integrations and API > API Credentials."}
              </_Builtin.Strong>
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              {"Click the "}
              <_Builtin.Strong>{"Generate New Key"}</_Builtin.Strong>
              {
                " button and click the Copy Key button next to the API key (which can be found next to the 'Key name' field)."
              }
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              {"Copy the API key and paste it in Aglint's "}
              <br />
              {"‍"}
              <_Builtin.Strong>
                {"Integrations > Lever > Connect"}
              </_Builtin.Strong>
            </_Builtin.ListItem>
          </_Builtin.List>
          <_Builtin.Figure
            figure={{
              align: "fullwidth",
              type: "image",
              maxWidth: "900px",
            }}
          >
            <_Builtin.Block tag="div">
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65fa8282e60eaa06dd0f0c68_Frame%201716.png"
              />
            </_Builtin.Block>
          </_Builtin.Figure>
        </_Builtin.RichText>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "popup_link_block")}
        tag="div"
      >
        <Text content="" weight="" color="neutral" />
        <_Builtin.Link
          className={_utils.cx(_styles, "link")}
          button={false}
          block=""
          options={{
            href: "https://help.lever.co/hc/en-us/articles/360042364412-Generating-and-using-API-credentials",
            target: "_blank",
          }}
        >
          {
            "https://help.lever.co/hc/en-us/articles/360042364412-Generating-and..."
          }
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
