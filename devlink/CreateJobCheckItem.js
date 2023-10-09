import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CreateJobCheckItem.module.css";

export function CreateJobCheckItem({
  as: _Component = _Builtin.Block,
  onClickCheck = {},
  isChecked = true,
  textLabel1 = "",
}) {
  return (
    <_Component className={_utils.cx(_styles, "row-checkbox-ai")} tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "checkbox-border")}
          tag="div"
          {...onClickCheck}
        >
          {isChecked ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "add-icon", "pointer")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.3231%207.33154L8.57768%2011.0769L8.21076%2011.4439C8.08141%2011.5735%207.90581%2011.6463%207.72268%2011.6463C7.53956%2011.6463%207.36396%2011.5735%207.23461%2011.4439L6.95076%2011.16L5.68384%209.90001C5.44879%209.66482%205.44879%209.28365%205.68384%209.04847L5.69768%209.04154C5.92615%208.80616%206.30691%208.80616%206.5423%209.04154L7.71922%2010.2185L11.4646%206.47308C11.7%206.24462%2012.0808%206.24462%2012.3092%206.47308L12.3231%206.48693C12.5515%206.72231%2012.5515%207.09616%2012.3231%207.33154ZM13.8392%203.46155H4.15386C3.77309%203.46155%203.46155%203.77309%203.46155%204.16078V13.8462C3.46155%2014.2269%203.77309%2014.5385%204.15386%2014.5385H13.8392C14.2269%2014.5385%2014.5385%2014.2269%2014.5385%2013.8462V4.16078C14.5385%203.77309%2014.2269%203.46155%2013.8392%203.46155Z%22%20fill%3D%22%23012B30%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-sm", "text-kale-600", "clickable")}
        tag="div"
        {...onClickCheck}
      >
        {textLabel1}
      </_Builtin.Block>
    </_Component>
  );
}
