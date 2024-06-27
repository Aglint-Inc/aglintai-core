"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { Kbd } from "./Kbd";
import * as _utils from "./utils";
import _styles from "./SuggestedActions.module.css";

export function SuggestedActions({
  as: _Component = _Builtin.Block,
  isActive = false,
  textSuggestion = "text suggestion",
}) {
  return (
    <_Component className={_utils.cx(_styles, "ai_suggestion")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "suggestion_left")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "ai_icon")}
          value="%3Csvg%20width%3D%2224%22%20height%3D%2225%22%20viewBox%3D%220%200%2024%2025%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204.8C0%202.14903%202.14903%200%204.8%200H19.2C21.851%200%2024%202.14903%2024%204.8V19.8316C24%2022.4825%2021.851%2024.6316%2019.2%2024.6316H4.8C2.14903%2024.6316%200%2022.4825%200%2019.8316V4.8Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Cpath%20d%3D%22M16.9934%2012.0044C15.2921%2011.578%2014.4395%2011.3688%2013.8513%2010.7806C13.2632%2010.1885%2013.0539%209.33985%2012.6276%207.63854L12%205.13196L11.3724%207.63854C10.9461%209.33985%2010.7368%2010.1925%2010.1487%2010.7806C9.55655%2011.3688%208.70789%2011.578%207.00658%2012.0044L4.5%2012.632L7.00658%2013.2596C8.70789%2013.6859%209.56053%2013.8951%2010.1487%2014.4833C10.7368%2015.0754%2010.9461%2015.9241%2011.3724%2017.6253L12%2020.132L12.6276%2017.6253C13.0539%2015.9241%2013.2632%2015.0714%2013.8513%2014.4833C14.4435%2013.8951%2015.2921%2013.6859%2016.9934%2013.2596L19.5%2012.632L16.9934%2012.0044Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M18.0856%205.47646C17.5185%205.33436%2017.2343%205.26462%2017.0382%205.06856C16.8422%204.8712%2016.7725%204.5883%2016.6304%204.0212L16.4211%203.18567L16.2119%204.0212C16.0698%204.5883%2016.0001%204.87252%2015.8041%205.06856C15.6067%205.26462%2015.3238%205.33436%2014.7567%205.47646L13.9211%205.68567L14.7567%205.89488C15.3238%206.03699%2015.608%206.10672%2015.8041%206.30278C16.0001%206.50014%2016.0698%206.78304%2016.2119%207.35014L16.4211%208.18567L16.6304%207.35014C16.7725%206.78304%2016.8422%206.49883%2017.0382%206.30278C17.2356%206.10672%2017.5185%206.03699%2018.0856%205.89488L18.9212%205.68567L18.0856%205.47646Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text content={textSuggestion} weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "suggetion_right")}
        tag="div"
      >
        <Kbd />
        <Text size="1" weight="" color="neutral" content="AI Command" />
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active_bg_neutral")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
