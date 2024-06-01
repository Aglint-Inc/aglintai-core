"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
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
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"How to connect with Greenhouse"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "po-up_close")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.28125%201.21875L8%206.9375L13.7188%201.21875C14.0729%200.927083%2014.4271%200.927083%2014.7812%201.21875C15.0729%201.57292%2015.0729%201.92708%2014.7812%202.28125L9.0625%208L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L8%209.0625L2.28125%2014.7812C1.92708%2015.0729%201.57292%2015.0729%201.21875%2014.7812C0.927083%2014.4271%200.927083%2014.0729%201.21875%2013.7188L6.9375%208L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
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
        <_Builtin.Block tag="div">
          {"For more guidelines visit :"}
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "link")}
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
