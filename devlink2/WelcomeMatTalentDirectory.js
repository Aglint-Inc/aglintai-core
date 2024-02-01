import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WelcomeMatTalentDirectory.module.css";

export function WelcomeMatTalentDirectory({
  as: _Component = _Builtin.Block,
  onClickImport = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "welcome_mat")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "top_bar", "hide")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-md", "fw-semibold")}
          tag="div"
        >
          {"Candidate Database"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "welcome_mat_wm")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "wm_image_wrapper")}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "wm_img", "max_width_800")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65bb5eacd718d145190af7c6_Browser.png"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "welcome_mat_header")}
          tag="div"
        >
          {"Your Central Hub for Candidate Information"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "wm_cards")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-bcf4729e-1614-1b37-52f4-f436b68585ec-b68585e1"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Candidate Database"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Access a rich reservoir of candidate profiles. Your Talent Directory is your go-to source for detailed information on potential hires, from background and skills to contact details."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-bcf4729e-1614-1b37-52f4-f436b68585f1-b68585e1"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Edit and Customize Profiles"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Keep candidate information current and relevant. Easily update profiles with new information or notes from your interactions, ensuring you always have the most accurate data at your fingertips."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-bcf4729e-1614-1b37-52f4-f436b68585f6-b68585e1"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Streamlined Outreach"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Reach out directly from their profile with our integrated communication tools. Whether it's a first-time introduction or a follow-up, effective engagement is just a click away."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-bcf4729e-1614-1b37-52f4-f436b68585fb-b68585e1"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Efficiency in Action"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Sort, filter, and manage candidates with ease. Whether you're preparing for a recruitment drive or looking for specific skills, our user-friendly interface lets you navigate and organize profiles effortlessly."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%20%20%5Bclass%3D%22WelcomeMatTalentDirectory_welcome_mat__btO_L%22%5D%20%7B%0A%20%20%20%20height%3A%20calc(100vh%20-%2060px)%3B%0A%20%20%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
