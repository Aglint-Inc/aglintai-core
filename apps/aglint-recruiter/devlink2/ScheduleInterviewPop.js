"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ScheduleInterviewPop.module.css";

export function ScheduleInterviewPop({
  as: _Component = _Builtin.Block,
  textName = "This is a global text component",
  textSelectedSchedule = "Selected Schedules from stage HR Round ",
  slotStagePill,
  slotRequestOption,
  slotAssignedInput,
  slotPickDateInput,
  isRequestTypeVisible = true,
  isCandidateVisible = true,
  slotNotes,
}) {
  return (
    <_Component className={_utils.cx(_styles, "scehdule-inter-pop")} tag="div">
      {isCandidateVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate-sip")}
          tag="div"
        >
          <Text color="neutral" size="1" content="Selected Candidate" />
          <_Builtin.Block
            className={_utils.cx(_styles, "candidate-wrap-sip")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H20C22.2091%200%2024%201.79086%2024%204V20C24%2022.2091%2022.2091%2024%2020%2024H4C1.79086%2024%200%2022.2091%200%2020V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22translate(4%204)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.0001%204.93359C9.86464%204.93359%208.13347%206.66476%208.13347%208.80026C8.13347%2010.5633%209.31346%2012.0508%2010.9268%2012.516C9.65315%2012.6712%208.56074%2013.1217%207.73781%2013.9327C6.69044%2014.965%206.16016%2016.5016%206.16016%2018.5068C6.16016%2018.7867%206.387%2019.0135%206.66682%2019.0135C6.94665%2019.0135%207.17349%2018.7867%207.17349%2018.5068C7.17349%2016.6722%207.65652%2015.4356%208.44911%2014.6544C9.24319%2013.8719%2010.4287%2013.4669%2012.0001%2013.4669C13.5715%2013.4669%2014.757%2013.8719%2015.5512%2014.6545C16.3437%2015.4356%2016.8268%2016.6722%2016.8268%2018.5068C16.8268%2018.7867%2017.0536%2019.0135%2017.3335%2019.0135C17.6133%2019.0136%2017.8401%2018.7867%2017.8401%2018.5069C17.8401%2016.5016%2017.3098%2014.965%2016.2624%2013.9327C15.4395%2013.1217%2014.3471%2012.6712%2013.0735%2012.516C14.6867%2012.0508%2015.8668%2010.5633%2015.8668%208.80026C15.8668%206.66476%2014.1356%204.93359%2012.0001%204.93359ZM9.1468%208.80026C9.1468%207.22441%2010.4243%205.94693%2012.0001%205.94693C13.576%205.94693%2014.8535%207.22441%2014.8535%208.80026C14.8535%2010.3761%2013.576%2011.6536%2012.0001%2011.6536C10.4243%2011.6536%209.1468%2010.3761%209.1468%208.80026Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <Text content={textName} />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "candidate-sip")} tag="div">
        <Text content={textSelectedSchedule} color="neutral" size="1" />
        <_Builtin.Block
          className={_utils.cx(_styles, "selected-sip")}
          tag="div"
        >
          {slotStagePill}
        </_Builtin.Block>
      </_Builtin.Block>
      {isRequestTypeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "request-type-wrap-sip")}
          tag="div"
        >
          <Text content="Request Type" />
          <_Builtin.Block tag="div">{slotRequestOption}</_Builtin.Block>
          <Text
            content="Request will be marked as urgent to give more priority"
            size="1"
            color="neutral"
          />
        </_Builtin.Block>
      ) : null}
      {isRequestTypeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "request-type-wrap-sip")}
          tag="div"
        >
          <Text content="Assigned to" />
          <_Builtin.Block tag="div">{slotAssignedInput}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isRequestTypeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "request-type-wrap-sip")}
          tag="div"
        >
          <Text content="Pick Date Range" />
          <_Builtin.Block tag="div">{slotPickDateInput}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block tag="div">{slotNotes}</_Builtin.Block>
    </_Component>
  );
}
