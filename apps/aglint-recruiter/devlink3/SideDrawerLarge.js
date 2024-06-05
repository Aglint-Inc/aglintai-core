"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { ButtonSurface } from "./ButtonSurface";
import * as _utils from "./utils";
import _styles from "./SideDrawerLarge.module.css";

export function SideDrawerLarge({
  as: _Component = _Builtin.Block,
  slotSideDrawerbody,
  onClickCancel = {},
  onClickPrimary = {},
  textPrimaryButton = "Send to candidate",
  isSelectedNumber = true,
  textSelectedNumber = "1",
  textDrawertitle = "Send Self Scheduling Link",
  isBottomBar = true,
  slotSideDrawerIcon,
  onClickBack = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "large_sidedrawer")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sidedrawer_top_bar")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "flex_hr_10")} tag="div">
          <_Builtin.Block tag="div">
            {slotSideDrawerIcon ?? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewbox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15.375%209L12.4453%2011.9062C11.8203%2012.5%2011.1094%2012.7969%2010.3125%2012.7969C9.51562%2012.7969%208.8125%2012.5%208.20312%2011.9062C7.64062%2011.3281%207.35156%2010.6641%207.33594%209.91406C7.30469%209.14844%207.54688%208.45312%208.0625%207.82812L8.17969%207.6875C8.35156%207.53125%208.53125%207.52344%208.71875%207.66406C8.875%207.82031%208.88281%207.99219%208.74219%208.17969L8.625%208.32031C8.23438%208.78906%208.05469%209.3125%208.08594%209.89062C8.10156%2010.4531%208.32031%2010.9531%208.74219%2011.3906C9.19531%2011.8281%209.72656%2012.0469%2010.3359%2012.0469C10.9297%2012.0469%2011.4531%2011.8281%2011.9062%2011.3906L14.8359%208.46094C15.2734%208.00781%2015.4922%207.48438%2015.4922%206.89062C15.4922%206.28125%2015.2734%205.75%2014.8359%205.29688C14.3672%204.84375%2013.8359%204.61719%2013.2422%204.61719C12.6484%204.61719%2012.1172%204.84375%2011.6484%205.29688L11.1328%205.8125C10.9453%205.96875%2010.7656%205.96875%2010.5938%205.8125C10.4531%205.64062%2010.4531%205.46875%2010.5938%205.29688L11.1328%204.75781C11.7422%204.17969%2012.4453%203.89062%2013.2422%203.89062C14.0391%203.89062%2014.75%204.17969%2015.375%204.75781C15.9531%205.36719%2016.2422%206.07812%2016.2422%206.89062C16.2422%207.6875%2015.9531%208.39062%2015.375%209ZM2.64844%209L5.55469%206.07031C6.16406%205.49219%206.86719%205.20312%207.66406%205.20312C8.46094%205.20312%209.17188%205.5%209.79688%206.09375C10.3594%206.67188%2010.6484%207.33594%2010.6641%208.08594C10.6953%208.85156%2010.4531%209.54688%209.9375%2010.1719L9.82031%2010.3125C9.64844%2010.4688%209.46875%2010.4766%209.28125%2010.3359C9.125%2010.1797%209.11719%2010.0078%209.25781%209.82031L9.375%209.67969C9.76562%209.21094%209.94531%208.69531%209.91406%208.13281C9.89844%207.55469%209.67969%207.04688%209.25781%206.60938C8.80469%206.17188%208.27344%205.95312%207.66406%205.95312C7.07031%205.95312%206.54688%206.17188%206.09375%206.60938L3.16406%209.53906C2.72656%209.99219%202.50781%2010.5234%202.50781%2011.1328C2.50781%2011.7266%202.72656%2012.25%203.16406%2012.7031C3.63281%2013.1562%204.16406%2013.3828%204.75781%2013.3828C5.35156%2013.3828%205.88281%2013.1562%206.35156%2012.7031L6.89062%2012.1875C7.0625%2012.0469%207.23438%2012.0469%207.40625%2012.1875C7.54688%2012.3594%207.54688%2012.5312%207.40625%2012.7031L6.89062%2013.2422C6.26562%2013.8359%205.55469%2014.1328%204.75781%2014.1328C3.96094%2014.1328%203.25781%2013.8359%202.64844%2013.2422C2.05469%2012.6328%201.75781%2011.9297%201.75781%2011.1328C1.75781%2010.3203%202.05469%209.60938%202.64844%209Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textDrawertitle}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_link")}
          value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.7812%208.28125L13.0625%2012L16.7812%2015.7188C17.0729%2016.0729%2017.0729%2016.4271%2016.7812%2016.7812C16.4271%2017.0729%2016.0729%2017.0729%2015.7188%2016.7812L12%2013.0625L8.28125%2016.7812C7.92708%2017.0729%207.57292%2017.0729%207.21875%2016.7812C6.92708%2016.4271%206.92708%2016.0729%207.21875%2015.7188L10.9375%2012L7.21875%208.28125C6.92708%207.92708%206.92708%207.57292%207.21875%207.21875C7.57292%206.92708%207.92708%206.92708%208.28125%207.21875L12%2010.9375L15.7188%207.21875C16.0729%206.92708%2016.4271%206.92708%2016.7812%207.21875C17.0729%207.57292%2017.0729%207.92708%2016.7812%208.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickCancel}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sidedrawer_body")}
        tag="div"
      >
        {slotSideDrawerbody ?? <SlotComp componentNeme="ScheduleOptionList" />}
      </_Builtin.Block>
      {isBottomBar ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sidedrawer_bottom_bar")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "button-pop-wrap", "streachfull")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "wide_button", "width-100")}
              tag="div"
            >
              <ButtonSurface
                onClickButton={onClickBack}
                isLeftIcon={false}
                isRightIcon={false}
                color="neutral"
                size="3"
                textButton="Back"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "wide_button",
                "width-100",
                "pos-2"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_97c88937-31b4-9fc3-c74d-05cc519b9feb-519b9fdf"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "button_primary", "large_btn")}
                tag="div"
                {...onClickPrimary}
              >
                <_Builtin.Block tag="div">{textPrimaryButton}</_Builtin.Block>
                {isSelectedNumber ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "selected_number")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {textSelectedNumber}
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
