import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WelcomeMatCandidateDb.module.css";

export function WelcomeMatCandidateDb({
  as: _Component = _Builtin.Block,
  onClickFind = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "welcome_mat")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "top_bar")} tag="div">
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
          className={_utils.cx(_styles, "wm_header_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Your Gateway to Top Talent!"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-md", "text-gray-600")}
            tag="div"
          >
            {
              "Effortlessly build your dream team using our Candidate Database. Craft intelligent queries, connect seamlessly, and organize candidates for efficient hiring. Plus, conveniently access a separate table containing all candidates who have applied to your jobs. Streamline your hiring process like never before!"
            }
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "custom_btn")}
            tag="div"
            {...onClickFind}
          >
            <_Builtin.Block tag="div">{"Find Candidates"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "wm_image_wrapper")}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "wm_img", "mx_wd_600")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65b74873bb47859d70a3da92_CD_1.png"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "wm_cards")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-_36f1adf0-16df-51c6-25d7-1866c8c00a28-c8c00a1d"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Smart Candidate Search"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                'Find your ideal candidates effortlessly by entering queries like "Software Engineer in San Francisco." Our intelligent search system delivers precise results tailored to your hiring needs.'
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-_36f1adf0-16df-51c6-25d7-1866c8c00a2d-c8c00a1d"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Seamless Outreach"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Connect with potential candidates directly within the system. Streamline your communication and make the hiring process more efficient by reaching out to promising talents effortlessly."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-_36f1adf0-16df-51c6-25d7-1866c8c00a32-c8c00a1d"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Strategic List Building"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {
                "Organize your candidates efficiently by creating lists. Save and categorize individuals based on skills, experience, or any criteria that suits your hiring strategy."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wm_card")}
            id={_utils.cx(
              _styles,
              "w-node-_36f1adf0-16df-51c6-25d7-1866c8c00a37-c8c00a1d"
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
                "Access a centralized table for a quick overview of all candidates who've applied to your jobs, streamlining your hiring process with efficiency and ease."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%20%20%5Bclass%3D%22WelcomeMatCandidateDb_welcome_mat_wm__CiaIz%22%5D%20%7B%0A%20%20%20%20height%3A%20calc(100vh%20-%2060px)%3B%0A%20%20%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
