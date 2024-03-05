import React from "react";
import * as _Builtin from "./_Builtin";
import { EnableDisable } from "./EnableDisable";
import * as _utils from "./utils";
import _styles from "./ModuleCard.module.css";

export function ModuleCard({
  as: _Component = _Builtin.Block,
  textName = "Screening",
  textDescription = "Phone screening has not been enabled for this job.",
  onClickCard = {},
  slotIcon,
  slotEnableDisable,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "module_card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "tittle_icon_flex")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {slotIcon ?? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20opacity%3D%220.8%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%228%22%20fill%3D%22%23F7F9FB%22%2F%3E%0A%3Cpath%20d%3D%22M16.3984%2011.9C16.0484%2011.9%2015.7609%2012.0125%2015.5359%2012.2375C15.3109%2012.4625%2015.1984%2012.75%2015.1984%2013.1V27.5C15.1984%2027.85%2015.3109%2028.1375%2015.5359%2028.3625C15.7609%2028.5875%2016.0484%2028.7%2016.3984%2028.7H23.5984C23.9484%2028.7%2024.2359%2028.5875%2024.4609%2028.3625C24.6859%2028.1375%2024.7984%2027.85%2024.7984%2027.5V13.1C24.7984%2012.75%2024.6859%2012.4625%2024.4609%2012.2375C24.2359%2012.0125%2023.9484%2011.9%2023.5984%2011.9H16.3984ZM13.9984%2013.1C14.0234%2012.425%2014.2609%2011.8625%2014.7109%2011.4125C15.1609%2010.9625%2015.7234%2010.725%2016.3984%2010.7H23.5984C24.2734%2010.725%2024.8359%2010.9625%2025.2859%2011.4125C25.7359%2011.8625%2025.9734%2012.425%2025.9984%2013.1V27.5C25.9734%2028.175%2025.7359%2028.7375%2025.2859%2029.1875C24.8359%2029.6375%2024.2734%2029.875%2023.5984%2029.9H16.3984C15.7234%2029.875%2015.1609%2029.6375%2014.7109%2029.1875C14.2609%2028.7375%2014.0234%2028.175%2013.9984%2027.5V13.1ZM18.7984%2025.7H21.1984C21.5734%2025.725%2021.7734%2025.925%2021.7984%2026.3C21.7734%2026.675%2021.5734%2026.875%2021.1984%2026.9H18.7984C18.4234%2026.875%2018.2234%2026.675%2018.1984%2026.3C18.2234%2025.925%2018.4234%2025.725%2018.7984%2025.7Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_enable_disable")}
          tag="div"
        >
          {slotEnableDisable ?? <EnableDisable />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textName}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-gray-600")} tag="div">
        {textDescription}
      </_Builtin.Block>
    </_Component>
  );
}
