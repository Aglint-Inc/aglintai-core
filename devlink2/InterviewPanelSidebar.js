import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewPanelSidebar.module.css";

export function InterviewPanelSidebar({
  as: _Component = _Builtin.Block,
  textTitle = "Create Interview Panel",
  textPanelMemberTitle = "Choose panel members",
  textPanelMemberDescription = "Select interview panel members from your team lsit .",
  slotPanelMemberPills,
  slotPanelMemberDropdown,
  slotPanelNameInput,
  isButtonEnabled = false,
  onClickButton = {},
  textButton = "Create Panel",
  isMemberEmpty = false,
  onClickClose = {},
  slotLoader,
  isLoading = false,
  onClickInvite = {},
  isNoTeamFound = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "panel_slidebar")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sidebar_contents")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "sidebar_top")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textTitle}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sidebar_close")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.7812%206.28125L11.0625%2010L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L10%2011.0625L6.28125%2014.7812C5.92708%2015.0729%205.57292%2015.0729%205.21875%2014.7812C4.92708%2014.4271%204.92708%2014.0729%205.21875%2013.7188L8.9375%2010L5.21875%206.28125C4.92708%205.92708%204.92708%205.57292%205.21875%205.21875C5.57292%204.92708%205.92708%204.92708%206.28125%205.21875L10%208.9375L13.7188%205.21875C14.0729%204.92708%2014.4271%204.92708%2014.7812%205.21875C15.0729%205.57292%2015.0729%205.92708%2014.7812%206.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sidebar_body")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block tag="div">{"Panel Name"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot")}
              tag="div"
            >
              {slotPanelNameInput}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_group_title")}
              tag="div"
            >
              <_Builtin.Block tag="div">{textPanelMemberTitle}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textPanelMemberDescription}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_teams")}
              tag="div"
            >
              {isMemberEmpty ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "team_empty")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"No member selected"}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_members")}
                tag="div"
              >
                {slotPanelMemberPills}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps_input_slot")}
                tag="div"
              >
                {slotPanelMemberDropdown}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {isNoTeamFound ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "no_team_member")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "panel_empty")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2072%2072%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15%2019.5C15.0625%2021.1875%2015.8125%2022.5%2017.25%2023.4375C18.75%2024.1875%2020.25%2024.1875%2021.75%2023.4375C23.1875%2022.5%2023.9375%2021.1875%2024%2019.5C23.9375%2017.8125%2023.1875%2016.5%2021.75%2015.5625C20.25%2014.8125%2018.75%2014.8125%2017.25%2015.5625C15.8125%2016.5%2015.0625%2017.8125%2015%2019.5ZM27%2019.5C26.9375%2022.3125%2025.6875%2024.4688%2023.25%2025.9688C20.75%2027.3438%2018.25%2027.3438%2015.75%2025.9688C13.3125%2024.4688%2012.0625%2022.3125%2012%2019.5C12.0625%2016.6875%2013.3125%2014.5312%2015.75%2013.0312C18.25%2011.6562%2020.75%2011.6562%2023.25%2013.0312C25.6875%2014.5312%2026.9375%2016.6875%2027%2019.5ZM36%2027C33.75%2027.0625%2032.0312%2028.0625%2030.8438%2030C29.7188%2032%2029.7188%2034%2030.8438%2036C32.0312%2037.9375%2033.75%2038.9375%2036%2039C38.25%2038.9375%2039.9688%2037.9375%2041.1562%2036C42.2812%2034%2042.2812%2032%2041.1562%2030C39.9688%2028.0625%2038.25%2027.0625%2036%2027ZM36%2042C34.375%2042%2032.875%2041.5938%2031.5%2040.7812C30.125%2039.9688%2029.0312%2038.875%2028.2188%2037.5C27.4062%2036.0625%2027%2034.5625%2027%2033C27%2031.4375%2027.4062%2029.9375%2028.2188%2028.5C29.0312%2027.125%2030.125%2026.0312%2031.5%2025.2188C32.875%2024.4062%2034.375%2024%2036%2024C37.625%2024%2039.125%2024.4062%2040.5%2025.2188C41.875%2026.0312%2042.9688%2027.125%2043.7812%2028.5C44.5938%2029.9375%2045%2031.4375%2045%2033C45%2034.5625%2044.5938%2036.0625%2043.7812%2037.5C42.9688%2038.875%2041.875%2039.9688%2040.5%2040.7812C39.125%2041.5938%2037.625%2042%2036%2042ZM30.4688%2048C27.9062%2048.0625%2025.7188%2048.9375%2023.9062%2050.625C22.1562%2052.3125%2021.1875%2054.4375%2021%2057H51C50.8125%2054.4375%2049.8438%2052.3125%2048.0938%2050.625C46.2812%2048.9375%2044.0938%2048.0625%2041.5312%2048H30.4688ZM30.4688%2045H41.5312C45.0312%2045.0625%2047.9688%2046.2812%2050.3438%2048.6562C52.7188%2051.0312%2053.9375%2053.9688%2054%2057.4688C53.875%2059.0312%2053.0312%2059.875%2051.4688%2060H20.5312C18.9688%2059.875%2018.125%2059.0312%2018%2057.4688C18.0625%2053.9688%2019.2812%2051.0312%2021.6562%2048.6562C24.0312%2046.2812%2026.9688%2045.0625%2030.4688%2045ZM54%2015C52.3125%2015.0625%2051%2015.8125%2050.0625%2017.25C49.3125%2018.75%2049.3125%2020.25%2050.0625%2021.75C51%2023.1875%2052.3125%2023.9375%2054%2024C55.6875%2023.9375%2057%2023.1875%2057.9375%2021.75C58.6875%2020.25%2058.6875%2018.75%2057.9375%2017.25C57%2015.8125%2055.6875%2015.0625%2054%2015ZM54%2027C51.1875%2026.9375%2049.0312%2025.6875%2047.5312%2023.25C46.1562%2020.75%2046.1562%2018.25%2047.5312%2015.75C49.0312%2013.3125%2051.1875%2012.0625%2054%2012C56.8125%2012.0625%2058.9688%2013.3125%2060.4688%2015.75C61.8438%2018.25%2061.8438%2020.75%2060.4688%2023.25C58.9688%2025.6875%2056.8125%2026.9375%2054%2027ZM55.5%2033H48C48%2031.9375%2047.875%2030.9375%2047.625%2030H55.5C58.5%2030.0625%2060.9688%2031.0938%2062.9062%2033.0938C64.9062%2035.0312%2065.9375%2037.5%2066%2040.5C65.9375%2041.4375%2065.4375%2041.9375%2064.5%2042C63.5625%2041.9375%2063.0625%2041.4375%2063%2040.5C62.9375%2038.375%2062.2188%2036.5938%2060.8438%2035.1562C59.4062%2033.7812%2057.625%2033.0625%2055.5%2033ZM24%2033H16.5C14.375%2033.0625%2012.5938%2033.7812%2011.1562%2035.1562C9.78125%2036.5938%209.0625%2038.375%209%2040.5C8.9375%2041.4375%208.4375%2041.9375%207.5%2042C6.5625%2041.9375%206.0625%2041.4375%206%2040.5C6.0625%2037.5%207.09375%2035.0312%209.09375%2033.0938C11.0312%2031.0938%2013.5%2030.0625%2016.5%2030H24.375C24.125%2030.9375%2024%2031.9375%2024%2033Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "no_team_memberfound")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"No team member found."}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-gray-600")}
                    tag="div"
                  >
                    <_Builtin.Span
                      className={_utils.cx(
                        _styles,
                        "text-underline",
                        "text-blue-500"
                      )}
                      {...onClickInvite}
                    >
                      {"Invite team member"}
                    </_Builtin.Span>
                    {" to create a panel."}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sidebar_button_wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary", "is_disabled")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textButton}</_Builtin.Block>
          </_Builtin.Block>
          {isButtonEnabled ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "button_primary", "is_enabled")}
              tag="div"
              {...onClickButton}
            >
              <_Builtin.Block tag="div">{textButton}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isLoading ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "button_primary", "is_loading")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotLoader}</_Builtin.Block>
              <_Builtin.Block tag="div">{"Loading.."}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22InterviewPanelSidebar_sidebar_contents__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%2076px)%3B%0Aoverflow%3A%20auto%3B%0A%7D%0A%0A%5Bclass*%3D%22InterviewPanelSidebar_height_100__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%2076px)%3B%0Aoverflow%3A%20auto%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
