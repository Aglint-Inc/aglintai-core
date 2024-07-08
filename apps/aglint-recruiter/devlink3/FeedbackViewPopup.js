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
  textRecomendation = "Strongly recommended (9/10)",
  textObjective = "During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.",
  onClickEditFeedback = {},
  isEditFeedbackVisible = true,
  textEditFeedback = "Edit Feedback",
  isNextPrevVisible = true,
  isNotSubmittedVisible = false,
  onClickRequestFeedback = {},
  isEmpty = false,
  onClickResendRequest = {},
  isFeedbackReqVisible = false,
  slotButton,
  slotClose,
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
        <_Builtin.Block tag="div">{slotClose}</_Builtin.Block>
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
            className={_utils.cx(_styles, "fvp-not-submitted-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fvp-context-wrap")}
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
            className={_utils.cx(_styles, "fvp-not-submitted-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fvp-context-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fvp-text-wrap")}
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
            className={_utils.cx(_styles, "fvp-edit-feedback")}
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
          {slotButton}
        </_Builtin.Block>
      ) : null}
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css_block")}
        value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.hide-scrollbar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.hide-scrollbar%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
