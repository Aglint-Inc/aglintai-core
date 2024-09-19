"use client";
import React from "react";
import _styles from "./RcCheckbox.module.css";
import UITypography from "@/components/Common/UITypography";

export function RcCheckbox({
  as: _Component = "div",
  isChecked = false,
  text = "This is some text inside of a div block.",
  onclickCheck,
}) {
  return (
    <div className={"flex items-center gap-1"}>
      <div
        className={"relative overflow-hidden w-4 h-4 min-w-4 min-h-4 rounded cursor-pointer"}
        onClick={onclickCheck}
      >
        {isChecked ? (
          <div className={"flex flex-col justify-center items-center"}>
            <div
              className={"flex flex-col justify-center items-center"}
              dangerouslySetInnerHTML={{
                __html: `%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3656_41550)%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.2316%203.97594C12.5397%204.17744%2012.6262%204.5906%2012.4247%204.89876L7.89138%2011.8321C7.78455%2011.9955%207.61146%2012.1038%207.41782%2012.1285C7.22416%2012.1533%207.02941%2012.0918%206.88495%2011.9605L3.95162%209.29389C3.67918%209.04622%203.65911%208.62458%203.90678%208.35215C4.15445%208.07971%204.57608%208.05962%204.84851%208.3073L7.20331%2010.448L11.3088%204.1691C11.5103%203.86094%2011.9234%203.77446%2012.2316%203.97594Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_3656_41550%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E`,
              }}
            />
          </div>
        ) : null}
        <div
          className={"flex flex-col justify-center items-center"}
          dangerouslySetInnerHTML={{
            __html: `%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22white%22%20fill-opacity%3D%220.9%22%2F%3E%0A%3Cpath%20d%3D%22M0.5%203C0.5%201.61929%201.61929%200.5%203%200.5H13C14.3807%200.5%2015.5%201.61929%2015.5%203V13C15.5%2014.3807%2014.3807%2015.5%2013%2015.5H3C1.61929%2015.5%200.5%2014.3807%200.5%2013V3Z%22%20stroke%3D%22%23191400%22%20stroke-opacity%3D%220.207843%22%2F%3E%0A%3C%2Fsvg%3E`,
          }}
        />
      </div>
      <p>
        {text}
      </p>
    </div>
  );
}