"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./InterviewConfirmed.module.css";

export function InterviewConfirmed({
  as: _Component = _Builtin.Block,
  textMailSent = "raimonrts@gmail.com",
  slotCompanyLogo,
  textDesc = "Your interview has been scheduled and we look forwarding to talking with you. A copy of your itinerary and calendar invites should be in your email.",
  slotInterviewConfirmedCard,
  slotButton,
  onClickAddCalender = {},
  slotBanner,
  isBannerVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview-confirmed-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "invitation-sublink-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "invitation-header-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotCompanyLogo}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "", "ic-tittle-wrap")}
            tag="div"
          >
            <Text
              size="5"
              align="center"
              weight="medium"
              content="Interview Confirmed"
            />
            {isBannerVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "slot-interview-confirmed-banner"
                )}
                tag="div"
              >
                {slotBanner}
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "interview-confirmed-desc-wrap")}
              tag="div"
            >
              <Text
                content={textDesc}
                size="2"
                align="center"
                weight=""
                color="neutral"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "mail-confirmed-wrap")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2227%22%20height%3D%2226%22%20viewbox%3D%220%200%2027%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.21969%204.125H18.1237C18.6014%204.14888%2019.0074%204.31608%2019.3418%204.62658C19.6523%204.96096%2019.8195%205.367%2019.8434%205.84469C19.8195%206.41792%2019.5926%206.87173%2019.1627%207.20611L18.6611%207.60021C17.443%207.71963%2016.3801%208.13761%2015.4725%208.85415C14.541%209.5468%2013.8603%2010.4425%2013.4304%2011.5412L11.3524%2013.0817C10.8986%2013.3683%2010.4448%2013.3683%209.99097%2013.0817L2.18071%207.20611C1.75079%206.87173%201.52388%206.41792%201.5%205.84469C1.52388%205.367%201.69108%204.96096%202.00158%204.62658C2.33596%204.31608%202.742%204.14888%203.21969%204.125ZM12.0331%2013.9774L13.0004%2013.2609C12.9765%2013.4758%2012.9646%2013.6788%2012.9646%2013.8699C12.9885%2015.4224%2013.4662%2016.7599%2014.3977%2017.8825H3.79292C3.14804%2017.8586%202.61063%2017.6317%202.18071%2017.2018C1.75079%2016.7719%201.52388%2016.2345%201.5%2015.5896V8.13761L9.31026%2013.9774C9.7163%2014.2879%2010.1701%2014.4431%2010.6717%2014.4431C11.1733%2014.4431%2011.6271%2014.2879%2012.0331%2013.9774ZM24.4292%2013.8699C24.4292%2014.8014%2024.2023%2015.6613%2023.7485%2016.4494C23.2947%2017.2376%2022.6617%2017.8706%2021.8497%2018.3483C21.0376%2018.8021%2020.1777%2019.029%2019.2701%2019.029C18.3625%2019.029%2017.5027%2018.8021%2016.6906%2018.3483C15.8785%2017.8706%2015.2456%2017.2376%2014.7918%2016.4494C14.338%2015.6613%2014.1111%2014.8014%2014.1111%2013.8699C14.1111%2012.9384%2014.338%2012.0786%2014.7918%2011.2904C15.2456%2010.5022%2015.8785%209.86924%2016.6906%209.39155C17.5027%208.93775%2018.3625%208.71084%2019.2701%208.71084C20.1777%208.71084%2021.0376%208.93775%2021.8497%209.39155C22.6617%209.86924%2023.2947%2010.5022%2023.7485%2011.2904C24.2023%2012.0786%2024.4292%2012.9384%2024.4292%2013.8699ZM22.8313%2011.9209C22.5686%2011.6821%2021.9333%2010.9127%2021.6705%2011.1516C21.6705%2011.1516%2020.2733%207.9943%2019.8075%2010.1439C19.3418%2012.2935%2017.0919%2010.5452%2017.0919%2010.5452C16.5545%2013.8842%2016.2153%2012.5993%2015.9526%2012.8381C15.7137%2013.1008%2015.7137%2014.4097%2015.9526%2014.6724L17.3283%2016.5068C17.591%2016.7456%2019.5448%2017.4407%2019.8075%2017.2018L23.2899%2014.6724C23.5288%2014.4097%2023.0702%2012.1837%2022.8313%2011.9209Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cpath%20d%3D%22M19.6202%2019.0867C18.617%2019.0724%2017.6999%2018.8287%2016.8687%2018.3558C16.0375%2017.8686%2015.364%2017.195%2014.8481%2016.3352C14.3608%2015.461%2014.1172%2014.5438%2014.1172%2013.5837C14.1172%2012.6235%2014.3608%2011.7064%2014.8481%2010.8322C15.364%209.97233%2016.0375%209.29878%2016.8687%208.81154C17.6999%208.33862%2018.617%208.095%2019.6202%208.08067C20.6233%208.095%2021.5405%208.33862%2022.3717%208.81154C23.2029%209.29878%2023.8764%209.97233%2024.3923%2010.8322C24.8796%2011.7064%2025.1232%2012.6235%2025.1232%2013.5837C25.1232%2014.5438%2024.8796%2015.461%2024.3923%2016.3352C23.8764%2017.195%2023.2029%2017.8686%2022.3717%2018.3558C21.5405%2018.8287%2020.6233%2019.0724%2019.6202%2019.0867ZM22.0493%2012.5734C22.2499%2012.3297%2022.2499%2012.0861%2022.0493%2011.8425C21.8056%2011.6419%2021.562%2011.6419%2021.3184%2011.8425L18.9323%2014.2286L17.922%2013.2182C17.6784%2013.0176%2017.4348%2013.0176%2017.1911%2013.2182C16.9905%2013.4619%2016.9905%2013.7055%2017.1911%2013.9491L18.5669%2015.3249C18.8105%2015.5255%2019.0541%2015.5255%2019.2978%2015.3249L22.0493%2012.5734Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text
                  size="2"
                  align="center"
                  weight=""
                  content="Information has sent to"
                  color="neutral"
                />
                <Text
                  content={textMailSent}
                  size="2"
                  align="center"
                  weight=""
                  color="accent"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "", "slot-interview-confirmed-card")}
          tag="div"
        >
          {slotInterviewConfirmedCard ?? (
            <SlotComp componentName="InterviewConfirmedCard" />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-interview-confirmed-btn")}
          tag="div"
        >
          {slotButton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
