"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
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
  isNotSubmittedVisible = false,
  onClickRequestFeedback = {},
  isEmpty = true,
  onClickResendRequest = {},
  isFeedbackReqVisible = false,
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
          <Text content="Feedback of" weight="" />
          <_Builtin.Block tag="div">
            {slotAvatarWithName ?? (
              <SlotComp componentNeme="Avatar with Name" />
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "popup_close", "cursor-pointer")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex-2", "cursor")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewbox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7188%204.71875L7.40625%208L10.7188%2011.2812C10.9062%2011.4896%2011%2011.7292%2011%2012C11%2012.2708%2010.9062%2012.5104%2010.7188%2012.7188C10.5104%2012.9062%2010.2708%2013%2010%2013C9.72917%2013%209.48958%2012.9062%209.28125%2012.7188L6%209.40625L2.71875%2012.7188C2.51042%2012.9062%202.27083%2013%202%2013C1.72917%2013%201.48958%2012.9062%201.28125%2012.7188C1.09375%2012.5104%201%2012.2708%201%2012C1%2011.7292%201.09375%2011.4896%201.28125%2011.2812L4.59375%208L1.28125%204.71875C1.09375%204.51042%201%204.27083%201%204C1%203.72917%201.09375%203.48958%201.28125%203.28125C1.48958%203.09375%201.72917%203%202%203C2.27083%203%202.51042%203.09375%202.71875%203.28125L6%206.59375L9.28125%203.28125C9.48958%203.09375%209.72917%203%2010%203C10.2708%203%2010.5104%203.09375%2010.7188%203.28125C10.9062%203.48958%2011%203.72917%2011%204C11%204.27083%2010.9062%204.51042%2010.7188%204.71875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "popup_body-copy", "hide-scrollbar")}
        tag="div"
      >
        {isEmpty ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "title_desc")}
            tag="div"
          >
            <Text content="" weight="medium" />
            <Text content={textRecomendation} color="neutral" weight="" />
          </_Builtin.Block>
        ) : null}
        {isNotSubmittedVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1547")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1548")}
              tag="div"
            >
              <Text
                content="Feedback not submitted"
                weight=""
                color="neutral"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-link-accent")}
                tag="div"
                {...onClickRequestFeedback}
              >
                {"Request feedback"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isFeedbackReqVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1547")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1548")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1549")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2222%22%20height%3D%2220%22%20viewbox%3D%220%200%2022%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.67568%203.19995H14.5989C14.981%203.21906%2015.3059%203.35281%2015.5734%203.60121C15.8218%203.86872%2015.9555%204.19355%2015.9746%204.5757C15.9555%205.03429%2015.774%205.39733%2015.43%205.66484L15.0288%205.98012C14.0543%206.07566%2013.204%206.41004%2012.4779%206.98327C11.7327%207.53739%2011.1881%208.25393%2010.8442%209.13288L9.18184%2010.3653C8.8188%2010.5946%208.45575%2010.5946%208.0927%2010.3653L1.8445%205.66484C1.50056%205.39733%201.31903%205.03429%201.29993%204.5757C1.31903%204.19355%201.45279%203.86872%201.70119%203.60121C1.9687%203.35281%202.29353%203.21906%202.67568%203.19995ZM9.72641%2011.0819L10.5003%2010.5086C10.4812%2010.6806%2010.4716%2010.843%2010.4716%2010.9959C10.4907%2012.2379%2010.8729%2013.3079%2011.6181%2014.206H3.13426C2.61836%2014.1869%202.18843%2014.0053%201.8445%2013.6614C1.50056%2013.3175%201.31903%2012.8875%201.29993%2012.3716V6.41004L7.54814%2011.0819C7.87297%2011.3303%208.23601%2011.4545%208.63727%2011.4545C9.03853%2011.4545%209.40158%2011.3303%209.72641%2011.0819ZM19.6433%2010.9959C19.6433%2011.7411%2019.4618%2012.429%2019.0987%2013.0595C18.7357%2013.6901%2018.2293%2014.1964%2017.5797%2014.5786C16.93%2014.9416%2016.2421%2015.1231%2015.516%2015.1231C14.7899%2015.1231%2014.1021%2014.9416%2013.4524%2014.5786C12.8027%2014.1964%2012.2964%2013.6901%2011.9333%2013.0595C11.5703%2012.429%2011.3888%2011.7411%2011.3888%2010.9959C11.3888%2010.2507%2011.5703%209.56281%2011.9333%208.93225C12.2964%208.3017%2012.8027%207.79535%2013.4524%207.41319C14.1021%207.05015%2014.7899%206.86862%2015.516%206.86862C16.2421%206.86862%2016.93%207.05015%2017.5797%207.41319C18.2293%207.79535%2018.7357%208.3017%2019.0987%208.93225C19.4618%209.56281%2019.6433%2010.2507%2019.6433%2010.9959ZM18.365%209.43669C18.1548%209.24562%2017.6465%208.63013%2017.4364%208.82121C17.4364%208.82121%2016.3186%206.29539%2015.946%208.01508C15.5734%209.73477%2013.7734%208.33609%2013.7734%208.33609C13.3435%2011.0073%2013.0722%209.97935%2012.862%2010.1704C12.6709%2010.3806%2012.6709%2011.4277%2012.862%2011.6379L13.9626%2013.1054C14.1728%2013.2964%2015.7358%2013.8525%2015.946%2013.6614L18.7319%2011.6379C18.9229%2011.4277%2018.5561%209.64688%2018.365%209.43669Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cpath%20d%3D%22M15.7971%2014.9705C14.9945%2014.959%2014.2608%2014.7641%2013.5959%2014.3858C12.9309%2013.996%2012.3921%2013.4571%2011.9793%2012.7693C11.5896%2012.0699%2011.3947%2011.3362%2011.3947%2010.5681C11.3947%209.79994%2011.5896%209.0662%2011.9793%208.36686C12.3921%207.67899%2012.9309%207.14015%2013.5959%206.75035C14.2608%206.37202%2014.9945%206.17712%2015.7971%206.16566C16.5996%206.17712%2017.3333%206.37202%2017.9983%206.75035C18.6632%207.14015%2019.202%207.67899%2019.6148%208.36686C20.0046%209.0662%2020.1995%209.79994%2020.1995%2010.5681C20.1995%2011.3362%2020.0046%2012.0699%2019.6148%2012.7693C19.202%2013.4571%2018.6632%2013.996%2017.9983%2014.3858C17.3333%2014.7641%2016.5996%2014.959%2015.7971%2014.9705ZM17.7403%209.75981C17.9008%209.56491%2017.9008%209.37002%2017.7403%209.17512C17.5454%209.01461%2017.3505%209.01461%2017.1556%209.17512L15.2468%2011.084L14.4385%2010.2757C14.2436%2010.1152%2014.0487%2010.1152%2013.8538%2010.2757C13.6933%2010.4706%2013.6933%2010.6655%2013.8538%2010.8604L14.9544%2011.961C15.1493%2012.1215%2015.3442%2012.1215%2015.5391%2011.961L17.7403%209.75981Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content="Feedback Requested" weight="" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-link-accent")}
                tag="div"
                {...onClickResendRequest}
              >
                <Text weight="" color="" content="Resend Request" />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isEmpty ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "title_desc")}
            tag="div"
          >
            <Text content="Feedback" weight="medium" />
            <Text content={textObjective} weight="" color="neutral" />
          </_Builtin.Block>
        ) : null}
        {isEditFeedbackVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1294")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-link-accent")}
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
              "width-auto-copy"
            )}
            tag="div"
            {...onClickPrev}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.60156%206.39844C2.38281%206.13281%202.38281%205.86719%202.60156%205.60156L7.10156%201.10156C7.36719%200.882812%207.63281%200.882812%207.89844%201.10156C8.11719%201.36719%208.11719%201.63281%207.89844%201.89844L3.79688%206L7.89844%2010.1016C8.11719%2010.3672%208.11719%2010.6328%207.89844%2010.8984C7.63281%2011.1172%207.36719%2011.1172%207.10156%2010.8984L2.60156%206.39844Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Previous"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "button_primary",
              "greay_btn",
              "width-auto-copy"
            )}
            tag="div"
            {...onClickNext}
          >
            <_Builtin.Block tag="div">{"Next"}</_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.39844%205.60156C9.61719%205.86719%209.61719%206.13281%209.39844%206.39844L4.89844%2010.8984C4.63281%2011.1172%204.36719%2011.1172%204.10156%2010.8984C3.88281%2010.6328%203.88281%2010.3672%204.10156%2010.1016L8.20312%206L4.10156%201.89844C3.88281%201.63281%203.88281%201.36719%204.10156%201.10156C4.36719%200.882813%204.63281%200.882813%204.89844%201.10156L9.39844%205.60156Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
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
