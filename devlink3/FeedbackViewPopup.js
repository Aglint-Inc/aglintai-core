"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AvatarWithName } from "./AvatarWithName";
import * as _utils from "./utils";
import _styles from "./FeedbackViewPopup.module.css";

export function FeedbackViewPopup({
  as: _Component = _Builtin.Block,
  slotAvatarWithName,
  onClickClose = {},
  textRecomendation = "Strongly recommended (9/10)",
  textObjective = "During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.",
  onClickNext = {},
  onClickPrev = {},
  onClickEditFeedback = {},
  isEditFeedbackVisible = true,
  textEditFeedback = "Edit Feedback",
  isNextPrevVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup-copy-copy")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "popup_header-copy")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          <_Builtin.Block tag="div">{"Feedback of"}</_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotAvatarWithName ?? <AvatarWithName />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "po-up_close", "cursor-pointer")}
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
        className={_utils.cx(_styles, "popup_body-copy", "hide-scrollbar")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "title_desc")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Recommendation"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {textRecomendation}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "title_desc")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Feedback"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {textObjective}
          </_Builtin.Block>
        </_Builtin.Block>
        {isEditFeedbackVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1294")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-blue-500",
                "text-underline",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickEditFeedback}
            >
              {textEditFeedback}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isNextPrevVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button-copy", "right-corner")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "button_primary",
              "greay_btn",
              "width-auto"
            )}
            tag="div"
            {...onClickPrev}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.60156%206.39844C2.38281%206.13281%202.38281%205.86719%202.60156%205.60156L7.10156%201.10156C7.36719%200.882812%207.63281%200.882812%207.89844%201.10156C8.11719%201.36719%208.11719%201.63281%207.89844%201.89844L3.79688%206L7.89844%2010.1016C8.11719%2010.3672%208.11719%2010.6328%207.89844%2010.8984C7.63281%2011.1172%207.36719%2011.1172%207.10156%2010.8984L2.60156%206.39844Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Previous"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "button_primary",
              "greay_btn",
              "width-auto"
            )}
            tag="div"
            {...onClickNext}
          >
            <_Builtin.Block tag="div">{"Next"}</_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.39844%205.60156C9.61719%205.86719%209.61719%206.13281%209.39844%206.39844L4.89844%2010.8984C4.63281%2011.1172%204.36719%2011.1172%204.10156%2010.8984C3.88281%2010.6328%203.88281%2010.3672%204.10156%2010.1016L8.20312%206L4.10156%201.89844C3.88281%201.63281%203.88281%201.36719%204.10156%201.10156C4.36719%200.882813%204.63281%200.882813%204.89844%201.10156L9.39844%205.60156Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css_block")}
        value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.hide-scrollbar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.hide-scrollbar%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
