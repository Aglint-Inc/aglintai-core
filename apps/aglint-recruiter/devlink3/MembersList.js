"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSurface } from "./ButtonSurface";
import { ButtonOutlined } from "./ButtonOutlined";
import { MemberDetail } from "./MemberDetail";
import * as _utils from "./utils";
import _styles from "./MembersList.module.css";

export function MembersList({
  as: _Component = _Builtin.Block,
  slotImage,
  isShadow = false,
  isReverseShadow = false,
  textName = "Brooklyn Simmons (you)",
  textDesignation = "Decline",
  textTime = "11:30PM - 12:30PM PST",
  isButtonVisible = false,
  onClickResendInvite = {},
  onClickCopyInvite = {},
  isDesignationVisible = false,
  isDetailVisible = false,
  onClickAccept = {},
  onClickDecline = {},
  isAcceptVisible = true,
  isDeclineVisible = true,
  isAcceptDeclineVisibe = false,
  slotMemberDetail,
  slotIcon,
}) {
  return (
    <_Component className={_utils.cx(_styles, "member-list-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "member-list-content")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ml-profile-wrap")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "avatar_40")} tag="div">
            {slotImage ?? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H36C38.2091%200%2040%201.79086%2040%204V36C40%2038.2091%2038.2091%2040%2036%2040H4C1.79086%2040%200%2038.2091%200%2036V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2226.6667%22%20height%3D%2226.6667%22%20transform%3D%22translate(6.66699%206.66602)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M19.9999%208.22266C16.4407%208.22266%2013.5555%2011.1079%2013.5555%2014.6671C13.5555%2017.6056%2015.5221%2020.0847%2018.211%2020.86C16.0883%2021.1187%2014.2676%2021.8695%2012.896%2023.2212C11.1504%2024.9416%2010.2666%2027.5027%2010.2666%2030.8447C10.2666%2031.3112%2010.6447%2031.6891%2011.111%2031.6891C11.5774%2031.6891%2011.9555%2031.3112%2011.9555%2030.8447C11.9555%2027.7869%2012.7605%2025.7259%2014.0815%2024.4241C15.405%2023.1198%2017.3808%2022.4449%2019.9998%2022.4449C22.6189%2022.4449%2024.5947%2023.1198%2025.9183%2024.4241C27.2392%2025.7259%2028.0443%2027.7869%2028.0443%2030.8447C28.0443%2031.3112%2028.4223%2031.6891%2028.8888%2031.6891C29.3551%2031.6893%2029.7332%2031.3112%2029.7332%2030.8449C29.7332%2027.5027%2028.8493%2024.9416%2027.1037%2023.2212C25.7322%2021.8695%2023.9115%2021.1187%2021.7888%2020.86C24.4776%2020.0847%2026.4443%2017.6056%2026.4443%2014.6671C26.4443%2011.1079%2023.5591%208.22266%2019.9999%208.22266ZM15.2443%2014.6671C15.2443%2012.0407%2017.3735%209.91155%2019.9999%209.91155C22.6263%209.91155%2024.7555%2012.0407%2024.7555%2014.6671C24.7555%2017.2935%2022.6263%2019.4227%2019.9999%2019.4227C17.3735%2019.4227%2015.2443%2017.2935%2015.2443%2014.6671Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ml-badge-wrapper")}
            tag="div"
          >
            {isShadow ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_9955_56669)%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2213.4286%22%20height%3D%2213.4286%22%20rx%3D%226.71429%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%221.29%201.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.01953%2010.666C5.47656%2010.666%204.48047%209.85547%204.37793%208.70801L4.37305%208.6543H5.25195L5.25684%208.70801C5.32031%209.41113%206.05273%209.85547%207.06836%209.85547C8.02539%209.85547%208.72363%209.3623%208.72363%208.64453V8.63965C8.72363%208.05371%208.31836%207.65332%207.35156%207.43848L6.57031%207.26758C5.15918%206.95508%204.54883%206.30566%204.54883%205.28516V5.28027C4.55371%204.11328%205.57422%203.28809%207.0293%203.28809C8.43555%203.28809%209.41699%204.11816%209.49023%205.16797L9.49512%205.23633H8.61621L8.60645%205.17285C8.50879%204.55273%207.92285%204.09375%207.00488%204.09863C6.12598%204.10352%205.44727%204.51855%205.44727%205.25586V5.26074C5.44727%205.82227%205.83301%206.20312%206.79004%206.41309L7.57129%206.58887C9.04102%206.91602%209.62207%207.50684%209.62207%208.52246V8.52734C9.62207%209.8457%208.5918%2010.666%207.01953%2010.666Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_9955_56669%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isReverseShadow ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_9955_56687)%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2213.4286%22%20height%3D%2213.4286%22%20rx%3D%226.71429%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M4.63184%2010.5V3.4541H7.32227C8.67969%203.4541%209.56836%204.28418%209.56836%205.54883V5.55859C9.56836%206.53516%209.03613%207.29688%208.15234%207.5752L9.7832%2010.5H8.75293L7.24414%207.71191H5.51074V10.5H4.63184ZM5.51074%206.93066H7.24414C8.14746%206.93066%208.66016%206.44727%208.66016%205.58789V5.57812C8.66016%204.73828%208.11328%204.23535%207.20508%204.23535H5.51074V6.93066Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_9955_56687%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "name_designation")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ml-name-wrap")}
            tag="div"
          >
            <Text content={textName} weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_for_icon")}
              tag="div"
            >
              {slotIcon}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ml-card-wrap")}
            tag="div"
          >
            {isDesignationVisible ? (
              <_Builtin.Block tag="div">
                <Text
                  content={textDesignation}
                  weight=""
                  color="neutral"
                  size="1"
                />
              </_Builtin.Block>
            ) : null}
            {isButtonVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "ml-button-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "ml-link-wrap")}
                  tag="div"
                  {...onClickResendInvite}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.5%202.25C1.28125%202.25%201.10156%202.32031%200.960938%202.46094C0.820312%202.60156%200.75%202.78125%200.75%203V3.9375L5.34375%207.28906C5.78125%207.58594%206.21875%207.58594%206.65625%207.28906L11.25%203.9375V3C11.25%202.78125%2011.1797%202.60156%2011.0391%202.46094C10.8984%202.32031%2010.7188%202.25%2010.5%202.25H1.5ZM0.75%204.875V9V4.875V9C0.75%209.21875%200.820312%209.39844%200.960938%209.53906C1.10156%209.67969%201.28125%209.75%201.5%209.75H10.5C10.7188%209.75%2010.8984%209.67969%2011.0391%209.53906C11.1797%209.39844%2011.25%209.21875%2011.25%209V4.875L7.10156%207.89844C6.77344%208.14844%206.40625%208.27344%206%208.27344C5.59375%208.27344%205.22656%208.14844%204.89844%207.89844L0.75%204.875ZM0%203C0.015625%202.57812%200.164062%202.22656%200.445312%201.94531C0.726562%201.66406%201.07812%201.51563%201.5%201.5H10.5C10.9219%201.51563%2011.2734%201.66406%2011.5547%201.94531C11.8359%202.22656%2011.9844%202.57812%2012%203V9C11.9844%209.42188%2011.8359%209.77344%2011.5547%2010.0547C11.2734%2010.3359%2010.9219%2010.4844%2010.5%2010.5H1.5C1.07812%2010.4844%200.726562%2010.3359%200.445312%2010.0547C0.164062%209.77344%200.015625%209.42188%200%209V3Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <Text content="" weight="" size="1" />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ml-link-wrap")}
                  tag="div"
                  {...onClickCopyInvite}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%208.25C9.96875%208.25%2010.1484%208.17969%2010.2891%208.03906C10.4297%207.89844%2010.5%207.71875%2010.5%207.5V2.71875C10.5%202.60937%2010.4609%202.52344%2010.3828%202.46094L8.78906%200.867188C8.72656%200.789063%208.64062%200.75%208.53125%200.75H6C5.78125%200.75%205.60156%200.820312%205.46094%200.960938C5.32031%201.10156%205.25%201.28125%205.25%201.5V7.5C5.25%207.71875%205.32031%207.89844%205.46094%208.03906C5.60156%208.17969%205.78125%208.25%206%208.25H9.75H6H9.75ZM10.9219%201.92188C11.1406%202.14062%2011.25%202.40625%2011.25%202.71875V7.5C11.2344%207.92188%2011.0859%208.27344%2010.8047%208.55469C10.5234%208.83594%2010.1719%208.98438%209.75%209H6C5.57812%208.98438%205.22656%208.83594%204.94531%208.55469C4.66406%208.27344%204.51562%207.92188%204.5%207.5V1.5C4.51562%201.07812%204.66406%200.726562%204.94531%200.445312C5.22656%200.164062%205.57812%200.015625%206%200H8.53125C8.84375%200%209.10938%200.109375%209.32812%200.328125L10.9219%201.92188L9.32812%200.328125L10.9219%201.92188ZM2.25%203H3.75V3.75H2.25C2.03125%203.75%201.85156%203.82031%201.71094%203.96094C1.57031%204.10156%201.5%204.28125%201.5%204.5V10.5C1.5%2010.7188%201.57031%2010.8984%201.71094%2011.0391C1.85156%2011.1797%202.03125%2011.25%202.25%2011.25H6C6.21875%2011.25%206.39844%2011.1797%206.53906%2011.0391C6.67969%2010.8984%206.75%2010.7188%206.75%2010.5V9.75H7.5V10.5C7.48438%2010.9219%207.33594%2011.2734%207.05469%2011.5547C6.77344%2011.8359%206.42188%2011.9844%206%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5C0.765625%204.07812%200.914062%203.72656%201.19531%203.44531C1.47656%203.16406%201.82812%203.01563%202.25%203Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <Text content="Booking Link" weight="" size="1" />
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isAcceptDeclineVisibe ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "ml-button-wrap")}
                tag="div"
              >
                {isAcceptVisible ? (
                  <_Builtin.Block tag="div" {...onClickAccept}>
                    <ButtonSurface
                      isRightIcon={false}
                      isLeftIcon={false}
                      size="1"
                      textButton="Accept"
                    />
                  </_Builtin.Block>
                ) : null}
                {isDeclineVisible ? (
                  <_Builtin.Block tag="div" {...onClickDecline}>
                    <ButtonOutlined
                      isRightIcon={false}
                      isLeftIcon={false}
                      size="1"
                      textButton="Decline"
                      color="error"
                    />
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <Text content={textTime} weight="" color="neutral" />
      </_Builtin.Block>
      {isDetailVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ml-member-detail")}
          tag="div"
          box-shadow="4"
        >
          {slotMemberDetail ?? <MemberDetail />}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
