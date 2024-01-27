import React from "react";
import * as _Builtin from "./_Builtin";
import { JobAssistCards } from "./JobAssistCards";
import { JobAssistCardSmall } from "./JobAssistCardSmall";
import * as _utils from "./utils";
import _styles from "./JobAssist.module.css";

export function JobAssist({
  as: _Component = _Builtin.Block,
  slotAssistCards,
  onClickViewMore = {},
  slotInput,
  isViewMoreVisible = true,
  isMinimizeIconVisible = true,
  onClickMinimize = {},
  isMaximizeIconVisible = false,
  onClickMaximize = {},
  slotLogo,
  isStartingScreenVisible = true,
  isChatBody = false,
  slotChat,
  isSuggestionVisible = false,
  slotSuggestion,
}) {
  return (
    <_Component className={_utils.cx(_styles, "job-details-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "dash-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "dash-chat-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "dash-chat-box-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "dash-chat-logo-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "dash-chat-logo-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon-block-8", "_20x20")}
                  tag="div"
                >
                  {slotLogo}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "fw-semibold",
                  "text-color-black"
                )}
                tag="div"
              >
                {"Job Assistant"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "icon-block-8",
                "_40x40",
                "clickable"
              )}
              tag="div"
            >
              {isMaximizeIconVisible ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.38557%200.384763C5.72211%200.407199%205.9016%200.586686%205.92403%200.923225C5.9016%201.25976%205.72211%201.43925%205.38557%201.46169H1.61634V5.23092C1.59391%205.56746%201.41442%205.74694%201.07788%205.76938C0.741341%205.74694%200.561854%205.56746%200.539418%205.23092V0.923225C0.561854%200.586686%200.741341%200.407199%201.07788%200.384763H5.38557ZM0.539418%2010.6155C0.561854%2010.279%200.741341%2010.0995%201.07788%2010.0771C1.41442%2010.0995%201.59391%2010.279%201.61634%2010.6155V14.3848H5.38557C5.72211%2014.4072%205.9016%2014.5867%205.92403%2014.9232C5.9016%2015.2598%205.72211%2015.4393%205.38557%2015.4617H1.07788C0.741341%2015.4393%200.561854%2015.2598%200.539418%2014.9232V10.6155ZM15.0779%200.384763C15.4144%200.407199%2015.5939%200.586686%2015.6163%200.923225V5.23092C15.5939%205.56746%2015.4144%205.74694%2015.0779%205.76938C14.7413%205.74694%2014.5619%205.56746%2014.5394%205.23092V1.46169H10.7702C10.4337%201.43925%2010.2542%201.25976%2010.2317%200.923225C10.2542%200.586686%2010.4337%200.407199%2010.7702%200.384763H15.0779ZM14.5394%2010.6155C14.5619%2010.279%2014.7413%2010.0995%2015.0779%2010.0771C15.4144%2010.0995%2015.5939%2010.279%2015.6163%2010.6155V14.9232C15.5939%2015.2598%2015.4144%2015.4393%2015.0779%2015.4617H10.7702C10.4337%2015.4393%2010.2542%2015.2598%2010.2317%2014.9232C10.2542%2014.5867%2010.4337%2014.4072%2010.7702%2014.3848H14.5394V10.6155Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  {...onClickMaximize}
                />
              ) : null}
              {isMinimizeIconVisible ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.92403%200.923225V5.23092C5.9016%205.56746%205.72211%205.74694%205.38557%205.76938H1.07788C0.741341%205.74694%200.561854%205.56746%200.539418%205.23092C0.561854%204.89438%200.741341%204.71489%201.07788%204.69246H4.84711V0.923225C4.86955%200.586686%205.04903%200.407199%205.38557%200.384763C5.72211%200.407199%205.9016%200.586686%205.92403%200.923225ZM1.07788%2010.0771H5.38557C5.72211%2010.0995%205.9016%2010.279%205.92403%2010.6155V14.9232C5.9016%2015.2598%205.72211%2015.4393%205.38557%2015.4617C5.04903%2015.4393%204.86955%2015.2598%204.84711%2014.9232V11.154H1.07788C0.741341%2011.1316%200.561854%2010.9521%200.539418%2010.6155C0.561854%2010.279%200.741341%2010.0995%201.07788%2010.0771ZM11.3087%200.923225V4.69246H15.0779C15.4144%204.71489%2015.5939%204.89438%2015.6163%205.23092C15.5939%205.56746%2015.4144%205.74694%2015.0779%205.76938H10.7702C10.4337%205.74694%2010.2542%205.56746%2010.2317%205.23092V0.923225C10.2542%200.586686%2010.4337%200.407199%2010.7702%200.384763C11.1067%200.407199%2011.2862%200.586686%2011.3087%200.923225ZM10.7702%2010.0771H15.0779C15.4144%2010.0995%2015.5939%2010.279%2015.6163%2010.6155C15.5939%2010.9521%2015.4144%2011.1316%2015.0779%2011.154H11.3087V14.9232C11.2862%2015.2598%2011.1067%2015.4393%2010.7702%2015.4617C10.4337%2015.4393%2010.2542%2015.2598%2010.2317%2014.9232V10.6155C10.2542%2010.279%2010.4337%2010.0995%2010.7702%2010.0771Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  {...onClickMinimize}
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dash-chat-block")}
            tag="div"
            id="chat_scroll"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "dash-chat-body")}
              tag="div"
            >
              {isStartingScreenVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "dash-chat-start-screen")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dc-body-logo-header")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dc-body-logo-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "icon-block-8", "_30x30")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "svg-icon")}
                          value="%3Csvg%20width%3D%2231%22%20height%3D%2230%22%20viewBox%3D%220%200%2031%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M25.4868%2013.7447C22.0842%2012.8921%2020.3789%2012.4737%2019.2026%2011.2974C18.0263%2010.1132%2017.6079%208.41579%2016.7553%205.01316L15.5%200L14.2447%205.01316C13.3921%208.41579%2012.9737%2010.1211%2011.7974%2011.2974C10.6132%2012.4737%208.91579%2012.8921%205.51316%2013.7447L0.5%2015L5.51316%2016.2553C8.91579%2017.1079%2010.6211%2017.5263%2011.7974%2018.7026C12.9737%2019.8868%2013.3921%2021.5842%2014.2447%2024.9868L15.5%2030L16.7553%2024.9868C17.6079%2021.5842%2018.0263%2019.8789%2019.2026%2018.7026C20.3868%2017.5263%2022.0842%2017.1079%2025.4868%2016.2553L30.5%2015L25.4868%2013.7447Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                      tag="div"
                    >
                      {"Hi, How can I help you today."}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "initial-prompts-wrapper")}
                    tag="div"
                  >
                    {slotAssistCards ?? <JobAssistCards />}
                  </_Builtin.Block>
                  {isViewMoreVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-blue-500-2",
                        "text-underline",
                        "clickable"
                      )}
                      tag="div"
                      {...onClickViewMore}
                    >
                      {"View more"}
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              ) : null}
              {isChatBody ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-752")}
                  tag="div"
                >
                  {slotChat}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dash-chat-input-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "dash-chat-input-block", "hide")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg", "text-gray-400")}
                tag="div"
              >
                {"Chat with assistant"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block-8", "_20x20")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%203C7.47917%202.58333%207.33333%202.22917%207.0625%201.9375C6.77083%201.66667%206.41667%201.52083%206%201.5C5.58333%201.52083%205.22917%201.66667%204.9375%201.9375C4.66667%202.22917%204.52083%202.58333%204.5%203V8C4.52083%208.41667%204.66667%208.77083%204.9375%209.0625C5.22917%209.33333%205.58333%209.47917%206%209.5C6.41667%209.47917%206.77083%209.33333%207.0625%209.0625C7.33333%208.77083%207.47917%208.41667%207.5%208V3ZM3%203C3.02083%202.14583%203.3125%201.4375%203.875%200.875C4.4375%200.3125%205.14583%200.0208333%206%200C6.85417%200.0208333%207.5625%200.3125%208.125%200.875C8.6875%201.4375%208.97917%202.14583%209%203V8C8.97917%208.85417%208.6875%209.5625%208.125%2010.125C7.5625%2010.6875%206.85417%2010.9792%206%2011C5.14583%2010.9792%204.4375%2010.6875%203.875%2010.125C3.3125%209.5625%203.02083%208.85417%203%208V3ZM2%206.75V8C2.02083%209.125%202.40625%2010.0729%203.15625%2010.8438C3.92708%2011.5938%204.875%2011.9792%206%2012C7.125%2011.9792%208.07292%2011.5938%208.84375%2010.8438C9.59375%2010.0729%209.97917%209.125%2010%208V6.75C10.0417%206.29167%2010.2917%206.04167%2010.75%206C11.2083%206.04167%2011.4583%206.29167%2011.5%206.75V8C11.4792%209.41667%2011.0208%2010.625%2010.125%2011.625C9.25%2012.625%208.125%2013.2292%206.75%2013.4375V14.5H8.25C8.70833%2014.5417%208.95833%2014.7917%209%2015.25C8.95833%2015.7083%208.70833%2015.9583%208.25%2016H6H3.75C3.29167%2015.9583%203.04167%2015.7083%203%2015.25C3.04167%2014.7917%203.29167%2014.5417%203.75%2014.5H5.25V13.4375C3.875%2013.2292%202.75%2012.625%201.875%2011.625C0.979167%2010.625%200.520833%209.41667%200.5%208V6.75C0.541667%206.29167%200.791667%206.04167%201.25%206C1.70833%206.04167%201.95833%206.29167%202%206.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            {isSuggestionVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-759")}
                tag="div"
              >
                {slotSuggestion ?? <JobAssistCardSmall />}
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm-6", "text-grey-400")}
              tag="div"
            >
              {"Press enter to send and shift+enter to break the line"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D'JobAssist_dash-chat-block__'%5D%7B%0Ascroll-behavior%3A%20smooth%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
