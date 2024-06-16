"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import * as _utils from "./utils";
import _styles from "./LearnHowAshby.module.css";

export function LearnHowAshby({
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
          content="How to connect with Ashby"
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
              "To establish a connection with Ashby, you'll first need to obtain your API key. Here's how:"
            }
          </_Builtin.Paragraph>
          <_Builtin.List
            className={_utils.cx(_styles, "list", "mt-20", "mb-20")}
            tag="ul"
            unstyled={false}
          >
            <_Builtin.ListItem>
              {"To create a new API key, navigate to "}
              <_Builtin.Strong>{"Admin tab."}</_Builtin.Strong>
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              {"Select"}
              <_Builtin.Strong>{" Integrations > Rectxt"}</_Builtin.Strong>
              {" from the left panel."}
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              {"Click '"}
              <_Builtin.Strong>{"Create API key for Rectxt"}</_Builtin.Strong>
              {"' button"}
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              {"Copy the API key and paste it in Aglint's "}
              <br />
              {"‍"}
              <_Builtin.Strong>
                {"Integrations > Ashby > Connect"}
              </_Builtin.Strong>
            </_Builtin.ListItem>
          </_Builtin.List>
          <_Builtin.Figure
            figure={{
              type: "image",
              align: "fullwidth",
              maxWidth: "1812px",
            }}
          >
            <_Builtin.Block tag="div">
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65fa80f45e7949c3cf5d387b_image%2014.png"
              />
            </_Builtin.Block>
          </_Builtin.Figure>
        </_Builtin.RichText>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "popup_link_block")}
        tag="div"
      >
        <Text size="2" weight="" color="neutral" content="" />
        <_Builtin.Link
          button={false}
          block=""
          options={{
            href: "https://support.rectxt.com/en/articles/6746802-finding-your-ashby-api-key",
            target: "_blank",
          }}
        >
          {
            "https://support.rectxt.com/en/articles/6746802-finding-your-ashby-a.."
          }
        </_Builtin.Link>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22LearnHowAshby_figure__%22%5D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
