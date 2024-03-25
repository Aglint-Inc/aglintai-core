import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AvatarWithName.module.css";

export function AvatarWithName({
  as: _Component = _Builtin.Block,
  isReverseShadowVisible = false,
  isShadowVisible = false,
  slotAvatar,
  textName = "Mike",
  textRole = "Senior software engineer",
  isRoleVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "avatarwithname")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-757")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_useravatr", "small")}
          tag="div"
        >
          {slotAvatar ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-758")}
          tag="div"
        >
          {isShadowVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2213.5%22%20height%3D%2213.5%22%20rx%3D%226.75%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2213.5%22%20height%3D%2213.5%22%20rx%3D%226.75%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.5%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222%202%22%2F%3E%0A%3Cpath%20d%3D%22M6.97559%2010.8164C5.33496%2010.8164%204.20703%2010.0234%204.07031%208.80664H5.28711C5.48535%209.42188%206.07324%209.8252%207.0166%209.8252C8.00781%209.8252%208.71191%209.35352%208.71191%208.68359V8.66992C8.71191%208.1709%208.33594%207.82227%207.42676%207.60352L6.28516%207.33008C4.9043%207.00195%204.28223%206.40039%204.28223%205.34082V5.33398C4.28223%204.11035%205.45801%203.1875%207.02344%203.1875C8.56836%203.1875%209.6416%203.95996%209.80566%205.16309H8.63672C8.47949%204.58203%207.90527%204.17871%207.0166%204.17871C6.1416%204.17871%205.49902%204.62988%205.49902%205.2793V5.29297C5.49902%205.79199%205.86816%206.10645%206.73633%206.31836L7.87109%206.5918C9.25879%206.92676%209.92871%207.52832%209.92871%208.58105V8.59473C9.92871%209.90723%208.65039%2010.8164%206.97559%2010.8164Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isReverseShadowVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20rx%3D%227.25%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20rx%3D%227.25%22%20stroke%3D%22%23F5FCFC%22%20stroke-width%3D%220.5%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M5.41016%2011.546V4.46094H8.11554C9.48051%204.46094%2010.3741%205.29563%2010.3741%206.56731V6.57713C10.3741%207.55912%209.83893%208.32507%208.95023%208.60494L10.5902%2011.546H9.55416L8.03698%208.74242H6.29395V11.546H5.41016ZM6.29395%207.95682H8.03698C8.94532%207.95682%209.46087%207.47074%209.46087%206.60659V6.59677C9.46087%205.75225%208.91095%205.24653%207.9977%205.24653H6.29395V7.95682Z%22%20fill%3D%22%23F5FCFC%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{textName}</_Builtin.Block>
      {isRoleVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-500")}
          tag="div"
        >
          {textRole}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
