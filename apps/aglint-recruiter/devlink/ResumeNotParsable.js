"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./ResumeNotParsable.module.css";

export function ResumeNotParsable({
  as: _Component = _Builtin.Block,
  onClickViewResume = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "resume_error")}
      id={_utils.cx(
        _styles,
        "w-node-cfea6e5d-7ce5-0e42-cdcd-778a9e3d04c3-9e3d04c3"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "flex-h4")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5%203H15C15.5625%203.02083%2016.0312%203.21875%2016.4062%203.59375C16.7812%203.96875%2016.9792%204.4375%2017%205V15C16.9792%2015.5625%2016.7812%2016.0312%2016.4062%2016.4062C16.0312%2016.7812%2015.5625%2016.9792%2015%2017H5C4.4375%2016.9792%203.96875%2016.7812%203.59375%2016.4062C3.21875%2016.0312%203.02083%2015.5625%203%2015V5C3.02083%204.4375%203.21875%203.96875%203.59375%203.59375C3.96875%203.21875%204.4375%203.02083%205%203ZM10%206C9.54167%206.04167%209.29167%206.29167%209.25%206.75V10.25C9.29167%2010.7083%209.54167%2010.9583%2010%2011C10.4583%2010.9583%2010.7083%2010.7083%2010.75%2010.25V6.75C10.7083%206.29167%2010.4583%206.04167%2010%206ZM9%2013C9%2013.2917%209.09375%2013.5312%209.28125%2013.7188C9.46875%2013.9062%209.70833%2014%2010%2014C10.2917%2014%2010.5312%2013.9062%2010.7188%2013.7188C10.9062%2013.5312%2011%2013.2917%2011%2013C11%2012.7083%2010.9062%2012.4688%2010.7188%2012.2812C10.5312%2012.0938%2010.2917%2012%2010%2012C9.70833%2012%209.46875%2012.0938%209.28125%2012.2812C9.09375%2012.4688%209%2012.7083%209%2013Z%22%20fill%3D%22%23E54D2E%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text
          content="Resume not parsable"
          color="neutral-12"
          weight="medium"
        />
      </_Builtin.Block>
      <_Builtin.VFlex className={_utils.cx(_styles, "flex-center")} tag="div">
        <Text
          content={
            <>
              {"The system is unable to parse the candidate's resume."}
              <br />
              {"Please review it manually and proceed accordingly."}
            </>
          }
          color="neutral"
          align="center"
        />
      </_Builtin.VFlex>
      <ButtonSoft
        onClickButton={onClickViewResume}
        isLeftIcon={false}
        isRightIcon={false}
        color="neutral"
        size="2"
        textButton="View Resume"
      />
    </_Component>
  );
}
