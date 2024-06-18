"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonGhost } from "./ButtonGhost";
import { SelectedSlot } from "./SelectedSlot";
import * as _utils from "./utils";
import _styles from "./MultidayCard.module.css";

export function MultidayCard({
  as: _Component = _Builtin.Block,
  isSelected = true,
  slotSessionInfo,
  slotChangeButton,
  slotPickDateButton,
  slotSelected,
  textDayCount = "Day Count",
  textTotalDuration = "2 hour 45 Minutes",
  textSelectedSlots = "Selected 11 slots across 4 days.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "multidaycard")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "multiday_card_details")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "card_title_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "day_details")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "day_row")} tag="div">
              <Text content={textDayCount} color="neutral-12" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "total_duration")}
              tag="div"
            >
              <_Builtin.Block
                tag="div"
                text-align="left"
                fontSize="2"
                fontWeight=""
                font-color="neutral"
                high-contrast="false"
              >
                {"Total Duration"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "time_flex")}
                tag="div"
              >
                <GlobalIcon iconName="timer" size="4" />
                <Text content={textTotalDuration} weight="" />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_pickbutton")}
            tag="div"
          >
            {slotPickDateButton ?? <ButtonSoft size="1" textButton="" />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_session_info")}
          tag="div"
        >
          {slotSessionInfo ?? (
            <>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-comp-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "component-icon")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M13.2354%202.8401C12.7788%202.58325%2012.2212%202.58325%2011.7646%202.8401L4.76461%206.7776C4.29229%207.04328%204%207.54305%204%208.08496V15.9153C4%2016.4572%204.29229%2016.957%204.76461%2017.2226L11.7646%2021.1601C12.2212%2021.417%2012.7788%2021.417%2013.2354%2021.1601L20.2354%2017.2226C20.7077%2016.957%2021%2016.4572%2021%2015.9153V8.08496C21%207.54305%2020.7077%207.04327%2020.2354%206.7776L13.2354%202.8401ZM12.2549%203.71167C12.4071%203.62606%2012.5929%203.62606%2012.7451%203.71167L19.4801%207.50011L12.5%2011.4264L5.51987%207.50011L12.2549%203.71167ZM5%208.35504V15.9153C5%2016.0959%205.09743%2016.2625%205.25487%2016.3511L12%2020.1452V12.2925L5%208.35504ZM13%2020.1452L19.7451%2016.3511C19.9026%2016.2625%2020%2016.0959%2020%2015.9153V8.35504L13%2012.2925V20.1452Z%22%20fill%3D%22currentColor%22%2F%3E%3Cg%20opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M12.5%209.6169C12.5%2010.0056%2012.076%2010.2456%2011.7428%2010.0457L8.21458%207.92875C7.89091%207.73454%207.89091%207.26545%208.21458%207.07125L11.7428%204.95435C12.076%204.75439%2012.5%204.99445%2012.5%205.3831V9.6169Z%22%20fill%3D%22currentColor%22%2F%3E%3Cpath%20d%3D%22M10.2854%2013.4287C10.6091%2013.2345%2010.6091%2012.7655%2010.2854%2012.5713L6.75725%2010.4543C6.42399%2010.2544%206%2010.4944%206%2010.8831V15.1169C6%2015.5056%206.42399%2015.7456%206.75725%2015.5457L10.2854%2013.4287Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  tag="div"
                  text-align="left"
                  fontSize="2"
                  fontWeight=""
                  font-color="accent"
                  high-contrast=""
                >
                  {"SessionInfo"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-comp-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "component-icon")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M13.2354%202.8401C12.7788%202.58325%2012.2212%202.58325%2011.7646%202.8401L4.76461%206.7776C4.29229%207.04328%204%207.54305%204%208.08496V15.9153C4%2016.4572%204.29229%2016.957%204.76461%2017.2226L11.7646%2021.1601C12.2212%2021.417%2012.7788%2021.417%2013.2354%2021.1601L20.2354%2017.2226C20.7077%2016.957%2021%2016.4572%2021%2015.9153V8.08496C21%207.54305%2020.7077%207.04327%2020.2354%206.7776L13.2354%202.8401ZM12.2549%203.71167C12.4071%203.62606%2012.5929%203.62606%2012.7451%203.71167L19.4801%207.50011L12.5%2011.4264L5.51987%207.50011L12.2549%203.71167ZM5%208.35504V15.9153C5%2016.0959%205.09743%2016.2625%205.25487%2016.3511L12%2020.1452V12.2925L5%208.35504ZM13%2020.1452L19.7451%2016.3511C19.9026%2016.2625%2020%2016.0959%2020%2015.9153V8.35504L13%2012.2925V20.1452Z%22%20fill%3D%22currentColor%22%2F%3E%3Cg%20opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M12.5%209.6169C12.5%2010.0056%2012.076%2010.2456%2011.7428%2010.0457L8.21458%207.92875C7.89091%207.73454%207.89091%207.26545%208.21458%207.07125L11.7428%204.95435C12.076%204.75439%2012.5%204.99445%2012.5%205.3831V9.6169Z%22%20fill%3D%22currentColor%22%2F%3E%3Cpath%20d%3D%22M10.2854%2013.4287C10.6091%2013.2345%2010.6091%2012.7655%2010.2854%2012.5713L6.75725%2010.4543C6.42399%2010.2544%206%2010.4944%206%2010.8831V15.1169C6%2015.5056%206.42399%2015.7456%206.75725%2015.5457L10.2854%2013.4287Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  tag="div"
                  text-align="left"
                  fontSize="2"
                  fontWeight=""
                  font-color="accent"
                  high-contrast=""
                >
                  {"SessionInfo"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-comp-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "component-icon")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M13.2354%202.8401C12.7788%202.58325%2012.2212%202.58325%2011.7646%202.8401L4.76461%206.7776C4.29229%207.04328%204%207.54305%204%208.08496V15.9153C4%2016.4572%204.29229%2016.957%204.76461%2017.2226L11.7646%2021.1601C12.2212%2021.417%2012.7788%2021.417%2013.2354%2021.1601L20.2354%2017.2226C20.7077%2016.957%2021%2016.4572%2021%2015.9153V8.08496C21%207.54305%2020.7077%207.04327%2020.2354%206.7776L13.2354%202.8401ZM12.2549%203.71167C12.4071%203.62606%2012.5929%203.62606%2012.7451%203.71167L19.4801%207.50011L12.5%2011.4264L5.51987%207.50011L12.2549%203.71167ZM5%208.35504V15.9153C5%2016.0959%205.09743%2016.2625%205.25487%2016.3511L12%2020.1452V12.2925L5%208.35504ZM13%2020.1452L19.7451%2016.3511C19.9026%2016.2625%2020%2016.0959%2020%2015.9153V8.35504L13%2012.2925V20.1452Z%22%20fill%3D%22currentColor%22%2F%3E%3Cg%20opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M12.5%209.6169C12.5%2010.0056%2012.076%2010.2456%2011.7428%2010.0457L8.21458%207.92875C7.89091%207.73454%207.89091%207.26545%208.21458%207.07125L11.7428%204.95435C12.076%204.75439%2012.5%204.99445%2012.5%205.3831V9.6169Z%22%20fill%3D%22currentColor%22%2F%3E%3Cpath%20d%3D%22M10.2854%2013.4287C10.6091%2013.2345%2010.6091%2012.7655%2010.2854%2012.5713L6.75725%2010.4543C6.42399%2010.2544%206%2010.4944%206%2010.8831V15.1169C6%2015.5056%206.42399%2015.7456%206.75725%2015.5457L10.2854%2013.4287Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  tag="div"
                  text-align="left"
                  fontSize="2"
                  fontWeight=""
                  font-color="accent"
                  high-contrast=""
                >
                  {"SessionInfo"}
                </_Builtin.Block>
              </_Builtin.Block>
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block className={_utils.cx(_styles, "divider")} tag="div" />
      ) : null}
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selcted_time_date")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slected_title_count")}
            tag="div"
          >
            <GlobalIcon iconName="check_circle" weight="medium" />
            <Text content={textSelectedSlots} size="1" color="neutral" />
            <_Builtin.Block tag="div">
              {slotChangeButton ?? <ButtonGhost size="1" textButton="Change" />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_date_and_time_slot")}
            tag="div"
          >
            {slotSelected ?? (
              <>
                <SelectedSlot />
                <SelectedSlot />
                <SelectedSlot />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
