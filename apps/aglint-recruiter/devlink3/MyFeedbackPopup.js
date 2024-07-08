"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { RoundedNumber } from "./RoundedNumber";
import * as _utils from "./utils";
import _styles from "./MyFeedbackPopup.module.css";

export function MyFeedbackPopup({
  as: _Component = _Builtin.Block,
  slotRoundedNumber,
  onClickClose = {},
  slotObjective,
  textRecommendation = "Not Recommended",
  onClickSubmitFeedback = {},
  slotButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup-copy-copy")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "myfeedbacl_header")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          <Text content="My Feedback" weight="medium" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "popup_close")}
          tag="div"
          {...onClickClose}
        >
          <GlobalIcon iconName="close" size="5" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "my_feedback_body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "input_filed_wrap")}
          tag="div"
        >
          <Text weight="" content="Recommendation Level" />
          <_Builtin.Block
            className={_utils.cx(_styles, "recommendation_level_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "recommendation-level")}
              tag="div"
            >
              {slotRoundedNumber ?? (
                <>
                  <RoundedNumber isActive={true} />
                  <RoundedNumber
                    textNumber={
                      <>
                        {"2"}
                        <br />
                      </>
                    }
                    isActive={true}
                  />
                  <RoundedNumber textNumber="3" isActive={true} />
                  <RoundedNumber
                    textNumber={
                      <>
                        {"4"}
                        <br />
                      </>
                    }
                    isActive={true}
                  />
                  <RoundedNumber textNumber="5" />
                  <RoundedNumber
                    textNumber={
                      <>
                        {"6"}
                        <br />
                      </>
                    }
                  />
                  <RoundedNumber
                    textNumber={
                      <>
                        {"7"}
                        <br />
                      </>
                    }
                  />
                  <RoundedNumber
                    textNumber={
                      <>
                        {"8"}
                        <br />
                      </>
                    }
                  />
                  <RoundedNumber
                    textNumber={
                      <>
                        {"9"}
                        <br />
                      </>
                    }
                  />
                  <RoundedNumber
                    textNumber={
                      <>
                        {"10"}
                        <br />
                      </>
                    }
                  />
                </>
              )}
            </_Builtin.Block>
            <Text
              content={textRecommendation}
              weight=""
              color="neutral"
              size="1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "input_filed_wrap")}
          tag="div"
        >
          <Text weight="" content="Feedback" />
          <_Builtin.Block tag="div">{slotObjective}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "wide_button-copy-copy", "bottom_space")}
        tag="div"
      >
        {slotButton ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "wide_button", "width-100")}
            tag="div"
          />
        )}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css_block")}
        value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.hide-scrollbar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.hide-scrollbar%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
