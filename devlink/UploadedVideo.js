import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./UploadedVideo.module.css";

export function UploadedVideo({
  as: _Component = _Builtin.Block,
  slotVideo,
  onClickReupload = {},
  onClickClear = {},
  slotButton,
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "video-slot-edit-assessment")}
        tag="div"
      >
        {slotVideo}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-567")} tag="div">
        <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-568")}
          tag="div"
          {...onClickClear}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.33333%202.66667V1.33333C5.33333%200.565144%205.89848%200%206.66667%200H9.33333C10.1015%200%2010.6667%200.565144%2010.6667%201.33333V2.66667H13.3333C13.7015%202.66667%2014%202.96514%2014%203.33333C14%203.70152%2013.7015%204%2013.3333%204H10H6H2.66667C2.29848%204%202%203.70152%202%203.33333C2%202.96514%202.29848%202.66667%202.66667%202.66667H5.33333ZM9.33333%202.66667V1.33333H6.66667V2.66667H9.33333ZM6.66667%2012.6667C6.66667%2013.0349%206.36819%2013.3333%206%2013.3333C5.63181%2013.3333%205.33333%2013.0349%205.33333%2012.6667V6.66667C5.33333%206.29848%205.63181%206%206%206C6.36819%206%206.66667%206.29848%206.66667%206.66667V12.6667ZM10.6667%2012.6667C10.6667%2013.0349%2010.3682%2013.3333%2010%2013.3333C9.63181%2013.3333%209.33333%2013.0349%209.33333%2012.6667V6.66667C9.33333%206.29848%209.63181%206%2010%206C10.3682%206%2010.6667%206.29848%2010.6667%206.66667V12.6667ZM2.66667%206C2.66667%205.63181%202.96514%205.33333%203.33333%205.33333C3.70152%205.33333%204%205.63181%204%206V14.6667H12V6C12%205.63181%2012.2985%205.33333%2012.6667%205.33333C13.0349%205.33333%2013.3333%205.63181%2013.3333%206V14.6667C13.3333%2015.4349%2012.7682%2016%2012%2016H4C3.23181%2016%202.66667%2015.4349%202.66667%2014.6667V6Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Clear"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
