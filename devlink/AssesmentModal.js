import React from "react";
import * as _Builtin from "./_Builtin";
import { AvatarCard } from "./AvatarCard";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./AssesmentModal.module.css";

export function AssesmentModal({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotAvatarCard,
  onClickChoose = {},
  isWarningVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "avatar-pop-up-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Choose your avatar"}
      </_Builtin.Block>
      {isWarningVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "avatar-warning-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M18.2124%2016.925L10.4874%202.03749C10.0624%201.19999%208.69992%201.19999%208.26242%202.03749L0.537417%2016.925C0.337417%2017.3125%200.349917%2017.775%200.574917%2018.15C0.799917%2018.525%201.21242%2018.75%201.64992%2018.75H17.0999C17.5374%2018.75%2017.9374%2018.525%2018.1624%2018.15C18.3874%2017.775%2018.4124%2017.3125%2018.2124%2016.925ZM8.75%207.5C8.75%207.15%209.025%206.875%209.375%206.875C9.725%206.875%2010%207.15%2010%207.5V11.875C10%2012.225%209.725%2012.5%209.375%2012.5C9.025%2012.5%208.75%2012.225%208.75%2011.875V7.5ZM9.375%2016.25C8.6875%2016.25%208.125%2015.6875%208.125%2015C8.125%2014.3125%208.6875%2013.75%209.375%2013.75C10.0625%2013.75%2010.625%2014.3125%2010.625%2015C10.625%2015.6875%2010.0625%2016.25%209.375%2016.25Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-yellow-800")}
            tag="div"
          >
            {
              "Changing your avatar won't affect the current assessments but will apply to future ones."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "avatar-grid-wrap")}
        tag="div"
      >
        {slotAvatarCard ?? <AvatarCard />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "choose-btn-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "choose-avatar-button")}
          tag="div"
          {...onClickChoose}
        >
          <ButtonPrimaryRegular textLabel="Choose" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "close-btn-wrap-avatar")}
        tag="div"
        {...onClickClose}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cmask%20id%3D%22mask0_4387_4849%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_4387_4849)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22AssesmentModal_avatar-grid-wrap__%22%5D%7B%0Aoverflow-x%3Ahidden%3B%0Aoverflow-y%3Ascroll%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
