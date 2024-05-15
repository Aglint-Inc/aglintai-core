import React from "react";
import * as _Builtin from "./_Builtin";
import { SelectAllblock } from "./SelectAllblock";
import * as _utils from "./utils";
import _styles from "./DropdownList.module.css";

export function DropdownList({
  as: _Component = _Builtin.Block,
  slotAvatarWithName,
}) {
  return (
    <_Component className={_utils.cx(_styles, "dropdown_list")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_avatar_with_name")}
        tag="div"
      >
        {slotAvatarWithName ?? (
          <>
            <SelectAllblock />
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/660589dd1736c8e402dd216e_tar.png"
            />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
