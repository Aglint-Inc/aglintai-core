import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ChatBlockAglint.module.css";

export function ChatBlockAglint({
  as: _Component = _Builtin.Block,
  textMessage = "please pick the interview panel you want to use",
  slotWidget,
  isWidgetVisible = false,
  textTime = "Just Now",
  isTextVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "chat_block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "chat_avatar", "is_aglint")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2226%22%20height%3D%2226%22%20viewBox%3D%220%200%2026%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%204.25C13.2604%204.25%2013.4557%204.36719%2013.5859%204.60156L16.0469%209.95312L21.3984%2012.4141C21.6328%2012.5443%2021.75%2012.7396%2021.75%2013C21.75%2013.2604%2021.6328%2013.4427%2021.3984%2013.5469L16.0469%2016.0469L13.5859%2021.3984C13.4557%2021.6328%2013.2604%2021.75%2013%2021.75C12.7396%2021.75%2012.5573%2021.6328%2012.4531%2021.3984L9.95312%2016.0469L4.60156%2013.5859C4.36719%2013.4557%204.25%2013.2604%204.25%2013C4.25%2012.7396%204.36719%2012.5573%204.60156%2012.4531L9.95312%209.95312L12.4531%204.60156C12.5573%204.36719%2012.7396%204.25%2013%204.25ZM13%206.35938L11.0078%2010.6953C10.9297%2010.8255%2010.8255%2010.9297%2010.6953%2011.0078L6.35938%2013L10.6953%2014.9922C10.8255%2015.0703%2010.9297%2015.1745%2011.0078%2015.3047L13%2019.6406L14.9922%2015.3047C15.0703%2015.1745%2015.1745%2015.0703%2015.3047%2014.9922L19.6406%2013L15.3047%2011.0078C15.1745%2010.9297%2015.0703%2010.8255%2014.9922%2010.6953L13%206.35938Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "chat_content")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "chat_name_and_time")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Aglint"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey_400")}
              tag="div"
            >
              {textTime}
            </_Builtin.Block>
          </_Builtin.Block>
          {isTextVisible ? (
            <_Builtin.Block tag="div">{textMessage}</_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isWidgetVisible ? (
          <_Builtin.Block tag="div">
            {slotWidget ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "widget_flex")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "iv_panel_card")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "panel_card_text")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"SW Eng Panel"}</_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-600"
                      )}
                      tag="div"
                    >
                      {"5 Members"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Image
                    className={_utils.cx(_styles, "avatar_group_30")}
                    loading="eager"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5ad0a5a40e89e5ed867c8_avatar-grup-with-confirm.png"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "iv_panel_card")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "panel_card_text")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"General panel for freshers"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-600"
                      )}
                      tag="div"
                    >
                      {"11 Members"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Image
                    className={_utils.cx(_styles, "avatar_group_30")}
                    loading="eager"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5b97945c04b6a6bf31da6_r.png"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "iv_panel_card")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "panel_card_text")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Team Sales and Marketing"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-600"
                      )}
                      tag="div"
                    >
                      {"4 Members"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Image
                    className={_utils.cx(_styles, "avatar_group_30")}
                    loading="eager"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5b9987c71f33757c13b16_4member.png"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "iv_panel_card")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "panel_card_text")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Final interview panel"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-600"
                      )}
                      tag="div"
                    >
                      {"3 Members"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Image
                    className={_utils.cx(_styles, "avatar_group_30")}
                    loading="eager"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5b9be011212b8859e1c13_3member.png"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            )}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
