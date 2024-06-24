"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { InterviewModuleCard } from "./InterviewModuleCard";
import { InterviewBreakCard } from "./InterviewBreakCard";
import { AddScheduleCard } from "./AddScheduleCard";
import { GeneralScheduleCard } from "./GeneralScheduleCard";
import * as _utils from "./utils";
import _styles from "./InterviewPlan.module.css";

export function InterviewPlan({
  as: _Component = _Builtin.Block,
  slotInterviewPlan,
  onClickAddModule = {},
  onClickAddBreak = {},
  onClickScheduler = {},
  slotInterviewCoordinator,
  slotPrimaryButton,
  isEmptyVisible = false,
  isCoordinatorVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "interviewplan")} tag="div">
      {isCoordinatorVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-interview-coordinator")}
          tag="div"
        >
          {slotInterviewCoordinator}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "title_wrap")} tag="div">
        <Text content="Interview plan for this job" weight="bold" />
        <Text
          weight=""
          content="Add your interview type to form an interview plan. You can find your interview type in scheduler"
        />
      </_Builtin.Block>
      {isEmptyVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ip-empty-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ip-center-wrap")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20viewbox%3D%220%200%2036%2036%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%206C11.1562%206.03125%2012.2344%206.65625%2012.9844%207.875C13.6719%209.125%2013.6719%2010.375%2012.9844%2011.625C12.2344%2012.8438%2011.1562%2013.4688%209.75%2013.5C8.34375%2013.4688%207.26562%2012.8438%206.51562%2011.625C5.82812%2010.375%205.82812%209.125%206.51562%207.875C7.26562%206.65625%208.34375%206.03125%209.75%206ZM27%206C28.4062%206.03125%2029.4844%206.65625%2030.2344%207.875C30.9219%209.125%2030.9219%2010.375%2030.2344%2011.625C29.4844%2012.8438%2028.4062%2013.4688%2027%2013.5C25.5938%2013.4688%2024.5156%2012.8438%2023.7656%2011.625C23.0781%2010.375%2023.0781%209.125%2023.7656%207.875C24.5156%206.65625%2025.5938%206.03125%2027%206ZM3%2020.0156C3.03125%2018.5781%203.51562%2017.3906%204.45312%2016.4531C5.39062%2015.5156%206.57812%2015.0312%208.01562%2015H9.98438C10.7344%2015%2011.4375%2015.1562%2012.0938%2015.4688C12.0312%2015.8125%2012%2016.1562%2012%2016.5C12.0625%2018.3438%2012.7344%2019.8438%2014.0156%2021H3.98438C3.39062%2020.9375%203.0625%2020.6094%203%2020.0156ZM21.9844%2021C23.2656%2019.8438%2023.9375%2018.3438%2024%2016.5C24%2016.1562%2023.9688%2015.8125%2023.9062%2015.4688C24.5625%2015.1562%2025.2656%2015%2026.0156%2015H27.9844C29.4219%2015.0312%2030.6094%2015.5156%2031.5469%2016.4531C32.4844%2017.3906%2032.9688%2018.5781%2033%2020.0156C32.9375%2020.6094%2032.6094%2020.9375%2032.0156%2021H21.9844ZM13.5%2016.5C13.5%2015.6875%2013.7031%2014.9375%2014.1094%2014.25C14.5156%2013.5625%2015.0625%2013.0156%2015.75%2012.6094C16.4688%2012.2031%2017.2188%2012%2018%2012C18.7812%2012%2019.5312%2012.2031%2020.25%2012.6094C20.9375%2013.0156%2021.4844%2013.5625%2021.8906%2014.25C22.2969%2014.9375%2022.5%2015.6875%2022.5%2016.5C22.5%2017.3125%2022.2969%2018.0625%2021.8906%2018.75C21.4844%2019.4375%2020.9375%2019.9844%2020.25%2020.3906C19.5312%2020.7969%2018.7812%2021%2018%2021C17.2188%2021%2016.4688%2020.7969%2015.75%2020.3906C15.0625%2019.9844%2014.5156%2019.4375%2014.1094%2018.75C13.7031%2018.0625%2013.5%2017.3125%2013.5%2016.5ZM9%2028.7344C9.03125%2026.9844%209.64062%2025.5156%2010.8281%2024.3281C12.0156%2023.1406%2013.4844%2022.5312%2015.2344%2022.5H20.7656C22.5156%2022.5312%2023.9844%2023.1406%2025.1719%2024.3281C26.3594%2025.5156%2026.9688%2026.9844%2027%2028.7344C26.9375%2029.5156%2026.5156%2029.9375%2025.7344%2030H10.2656C9.48438%2029.9375%209.0625%2029.5156%209%2028.7344Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <Text content="No sessions added yet" weight="" color="neutral" />
            <_Builtin.Block tag="div">{slotPrimaryButton}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "slotinterviewplancard")}
        tag="div"
      >
        {slotInterviewPlan ?? (
          <>
            <InterviewModuleCard />
            <InterviewBreakCard />
            <AddScheduleCard isAddSessionOptionVisible={false} />
            <GeneralScheduleCard />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
