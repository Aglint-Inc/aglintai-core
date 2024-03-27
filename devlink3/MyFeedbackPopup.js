import React from "react";
import * as _Builtin from "./_Builtin";
import { RoundedNumber } from "./RoundedNumber";
import * as _utils from "./utils";
import _styles from "./MyFeedbackPopup.module.css";

export function MyFeedbackPopup({
  as: _Component = _Builtin.Block,
  slotRoundedNumber,
  onClickClose = {},
  slotObjective,
  textRecommendation = "Not Recommend",
  onClickSubmitFeedback = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup-copy-copy")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "popup_header-copy-copy")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"My Feedback"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "po-up_close")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex-2", "cursor")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7188%204.71875L7.40625%208L10.7188%2011.2812C10.9062%2011.4896%2011%2011.7292%2011%2012C11%2012.2708%2010.9062%2012.5104%2010.7188%2012.7188C10.5104%2012.9062%2010.2708%2013%2010%2013C9.72917%2013%209.48958%2012.9062%209.28125%2012.7188L6%209.40625L2.71875%2012.7188C2.51042%2012.9062%202.27083%2013%202%2013C1.72917%2013%201.48958%2012.9062%201.28125%2012.7188C1.09375%2012.5104%201%2012.2708%201%2012C1%2011.7292%201.09375%2011.4896%201.28125%2011.2812L4.59375%208L1.28125%204.71875C1.09375%204.51042%201%204.27083%201%204C1%203.72917%201.09375%203.48958%201.28125%203.28125C1.48958%203.09375%201.72917%203%202%203C2.27083%203%202.51042%203.09375%202.71875%203.28125L6%206.59375L9.28125%203.28125C9.48958%203.09375%209.72917%203%2010%203C10.2708%203%2010.5104%203.09375%2010.7188%203.28125C10.9062%203.48958%2011%203.72917%2011%204C11%204.27083%2010.9062%204.51042%2010.7188%204.71875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "popup_body_flex")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "input_filed_wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Recommendation Level"}</_Builtin.Block>
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
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "color-grey-600")}
              tag="div"
            >
              {textRecommendation}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "input_filed_wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Objective"}</_Builtin.Block>
          <_Builtin.Block tag="div">{slotObjective}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "wide_button-copy-copy")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button", "width-100")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary", "success")}
            tag="div"
            {...onClickSubmitFeedback}
          >
            <_Builtin.Block tag="div">{"Submit Feedback"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css_block")}
        value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.hide-scrollbar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.hide-scrollbar%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
