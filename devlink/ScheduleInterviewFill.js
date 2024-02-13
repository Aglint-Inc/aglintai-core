import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewpanelPill } from "./InterviewpanelPill";
import * as _utils from "./utils";
import _styles from "./ScheduleInterviewFill.module.css";

export function ScheduleInterviewFill({
  as: _Component = _Builtin.Block,
  slotProfileAvatar,
  textName = "Michel Oven",
  slotInputName,
  onClickPersonMeeting = {},
  isPersonMeetingActive = false,
  onClickGoogleMeet = {},
  isGoogleMeetActive = false,
  onClickZoom = {},
  isZoomActive = false,
  onClickPhoneCall = {},
  isPhoneCallActive = false,
  slotInterviewPanel,
  isPanelMembersVisible = true,
  slotInterviewpanelPills,
  textSelectedCount = "4 out of 7 Members Selected , 1 optional",
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-842")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-block-33")}
          tag="div"
        >
          {"Scheduleing interview for"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-844")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-843")}
            tag="div"
          >
            {slotProfileAvatar}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textName}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-form-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-845")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Schedule Name"}</_Builtin.Block>
          <_Builtin.Block tag="div">{slotInputName}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-845")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Schedule Type"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-847")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-850")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-846")}
                tag="div"
                {...onClickPersonMeeting}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-849")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.75%207.5C12.7188%206.4375%2012.3516%205.55469%2011.6484%204.85156C10.9453%204.14844%2010.0625%203.78125%209%203.75C7.9375%203.78125%207.05469%204.14844%206.35156%204.85156C5.64844%205.55469%205.28125%206.4375%205.25%207.5C5.25%207.875%205.38281%208.36719%205.64844%208.97656C5.91406%209.60156%206.25%2010.25%206.65625%2010.9219C7.0625%2011.5781%207.47656%2012.1875%207.89844%2012.75C8.32031%2013.3281%208.6875%2013.8125%209%2014.2031C9.3125%2013.8125%209.67969%2013.3281%2010.1016%2012.75C10.5234%2012.1875%2010.9375%2011.5781%2011.3438%2010.9219C11.7656%2010.25%2012.1094%209.60156%2012.375%208.97656C12.625%208.36719%2012.75%207.875%2012.75%207.5ZM13.5%207.5C13.4688%208.20312%2013.2188%209.01562%2012.75%209.9375C12.2656%2010.8594%2011.7188%2011.75%2011.1094%2012.6094C10.5%2013.4844%209.98438%2014.1797%209.5625%2014.6953C9.40625%2014.8828%209.21875%2014.9766%209%2014.9766C8.78125%2014.9766%208.59375%2014.8828%208.4375%2014.6953C8.01562%2014.1797%207.5%2013.4844%206.89062%2012.6094C6.28125%2011.75%205.73438%2010.8594%205.25%209.9375C4.78125%209.01562%204.53125%208.20312%204.5%207.5C4.53125%206.21875%204.96875%205.15625%205.8125%204.3125C6.65625%203.46875%207.71875%203.03125%209%203C10.2812%203.03125%2011.3438%203.46875%2012.1875%204.3125C13.0312%205.15625%2013.4688%206.21875%2013.5%207.5ZM7.875%207.5C7.89062%207.92188%208.07812%208.25%208.4375%208.48438C8.8125%208.67188%209.1875%208.67188%209.5625%208.48438C9.92188%208.25%2010.1094%207.92188%2010.125%207.5C10.1094%207.07812%209.92188%206.75%209.5625%206.51562C9.1875%206.32812%208.8125%206.32812%208.4375%206.51562C8.07812%206.75%207.89062%207.07812%207.875%207.5ZM9%209.375C8.29688%209.35938%207.75781%209.04688%207.38281%208.4375C7.03906%207.8125%207.03906%207.1875%207.38281%206.5625C7.75781%205.95312%208.29688%205.64062%209%205.625C9.70312%205.64062%2010.2422%205.95312%2010.6172%206.5625C10.9609%207.1875%2010.9609%207.8125%2010.6172%208.4375C10.2422%209.04688%209.70312%209.35938%209%209.375Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "relative-1")}
                  tag="div"
                >
                  {"In Person Meeting"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isPersonMeetingActive ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-848")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-850")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-846")}
                tag="div"
                {...onClickGoogleMeet}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "relative-1")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2220%22%20height%3D%2218%22%20viewBox%3D%220%200%2020%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.3141%209.00297L13.2638%2011.2316L15.8858%2012.907L16.3419%209.01704L15.8858%205.21484L13.2136%206.68658L11.3141%209.00297Z%22%20fill%3D%22%2300832D%22%2F%3E%0A%3Cpath%20d%3D%22M0%2012.5419V15.8567C0%2016.6136%200.61431%2017.228%201.37135%2017.228H4.68616L5.37256%2014.7235L4.68616%2012.5419L2.41198%2011.8555L0%2012.5419Z%22%20fill%3D%22%230066DA%22%2F%3E%0A%3Cpath%20d%3D%22M4.68616%200.773438L0%205.4596L2.41213%206.14441L4.68616%205.4596L5.36009%203.3077L4.68616%200.773438Z%22%20fill%3D%22%23E94235%22%2F%3E%0A%3Cpath%20d%3D%22M0%2012.5465H4.68616V5.46094H0V12.5465Z%22%20fill%3D%22%232684FC%22%2F%3E%0A%3Cpath%20d%3D%22M18.8793%202.75891L15.8857%205.21484V12.9068L18.8917%2015.3724C19.3417%2015.7248%2020%2015.4035%2020%2014.8316V3.28865C20%202.71031%2019.326%202.39061%2018.8793%202.75891Z%22%20fill%3D%22%2300AC47%22%2F%3E%0A%3Cpath%20d%3D%22M11.314%209V12.542H4.68616V17.2281H14.5144C15.2714%2017.2281%2015.8857%2016.6137%2015.8857%2015.8568V12.904L11.314%209Z%22%20fill%3D%22%2300AC47%22%2F%3E%0A%3Cpath%20d%3D%22M14.5144%200.773438H4.68616V5.4596H11.314V9.00156L15.8857%205.21344V2.14479C15.8857%201.38775%2015.2714%200.773438%2014.5144%200.773438Z%22%20fill%3D%22%23FFBA00%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "relative-1")}
                  tag="div"
                >
                  {"Google Meet"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isGoogleMeetActive ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-848")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-850")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-846")}
                tag="div"
                {...onClickZoom}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "relative-1")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_4066_197751)%22%3E%0A%3Cpath%20d%3D%22M20%2010C20%2011.06%2019.92%2012.12%2019.74%2013.14C19.2%2016.52%2016.52%2019.2%2013.14%2019.74C12.12%2019.92%2011.06%2020%2010%2020C8.94%2020%207.88%2019.92%206.86%2019.74C3.48%2019.2%200.8%2016.52%200.26%2013.14C0.08%2012.12%200%2011.06%200%2010C0%208.94%200.08%207.88%200.26%206.86C0.8%203.48%203.48%200.8%206.86%200.26C7.88%200.08%208.94%200%2010%200C11.06%200%2012.12%200.08%2013.14%200.26C16.52%200.8%2019.2%203.48%2019.74%206.86C19.92%207.88%2020%208.94%2020%2010Z%22%20fill%3D%22url(%23paint0_linear_4066_197751)%22%2F%3E%0A%3Cpath%20d%3D%22M15.9401%2016.2383H5.86006C5.20006%2016.2383%204.56006%2015.8783%204.26006%2015.2983C3.90006%2014.6183%204.04006%2013.7983%204.58006%2013.2583L11.6001%206.23828H6.56006C5.18006%206.23828%204.06006%205.11828%204.06006%203.73828H13.3401C14.0001%203.73828%2014.6401%204.09828%2014.9401%204.67828C15.3001%205.35828%2015.1601%206.17828%2014.6201%206.71828L7.62006%2013.7583H13.4401C14.8201%2013.7583%2015.9401%2014.8583%2015.9401%2016.2383Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_4066_197751%22%20x1%3D%22473.32%22%20y1%3D%221912.24%22%20x2%3D%221526.68%22%20y2%3D%2287.76%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%230845BF%22%2F%3E%0A%3Cstop%20offset%3D%220.1911%22%20stop-color%3D%22%230950DE%22%2F%3E%0A%3Cstop%20offset%3D%220.3823%22%20stop-color%3D%22%230B59F6%22%2F%3E%0A%3Cstop%20offset%3D%220.5%22%20stop-color%3D%22%230B5CFF%22%2F%3E%0A%3Cstop%20offset%3D%220.6732%22%20stop-color%3D%22%230E5EFE%22%2F%3E%0A%3Cstop%20offset%3D%220.7774%22%20stop-color%3D%22%231665FC%22%2F%3E%0A%3Cstop%20offset%3D%220.8633%22%20stop-color%3D%22%23246FF9%22%2F%3E%0A%3Cstop%20offset%3D%220.9388%22%20stop-color%3D%22%23387FF4%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234F90EE%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3CclipPath%20id%3D%22clip0_4066_197751%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "relative-1")}
                  tag="div"
                >
                  {"Zoom"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isZoomActive ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-848")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-850")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-846")}
                tag="div"
                {...onClickPhoneCall}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "relative-1")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8125%209.44531L14.4375%2010.5703C14.6406%2010.6641%2014.7969%2010.8125%2014.9062%2011.0156C15%2011.2031%2015.0234%2011.4062%2014.9766%2011.625L14.4141%2014.25C14.2891%2014.7188%2013.9844%2014.9688%2013.5%2015C13.3594%2015%2013.2188%2015%2013.0781%2015C12.9688%2014.9844%2012.8594%2014.9766%2012.75%2014.9766C10.9219%2014.8203%209.27344%2014.2656%207.80469%2013.3125C6.33594%2012.3594%205.17188%2011.1172%204.3125%209.58594C3.45312%208.07031%203.01562%206.375%203%204.5C3.03125%204.01562%203.28125%203.71094%203.75%203.58594L6.375%203.02344C6.59375%202.97656%206.79688%203.00781%206.98438%203.11719C7.1875%203.21094%207.33594%203.35937%207.42969%203.5625L8.55469%206.1875C8.71094%206.60938%208.61719%206.97656%208.27344%207.28906L7.33594%208.0625C7.97656%209.15625%208.84375%2010.0234%209.9375%2010.6641L10.7109%209.72656C11.0234%209.38281%2011.3906%209.28906%2011.8125%209.44531ZM13.5%2014.25C13.5938%2014.25%2013.6562%2014.2031%2013.6875%2014.1094L14.25%2011.4844C14.2656%2011.375%2014.2266%2011.3047%2014.1328%2011.2734L11.5078%2010.1484C11.4297%2010.1172%2011.3594%2010.1328%2011.2969%2010.1953L10.5234%2011.1562C10.2422%2011.4375%209.92188%2011.4922%209.5625%2011.3203C8.34375%2010.6172%207.38281%209.65625%206.67969%208.4375C6.50781%208.07812%206.5625%207.75781%206.84375%207.47656L7.80469%206.70312C7.86719%206.64062%207.88281%206.57031%207.85156%206.49219L6.72656%203.86719C6.67969%203.77344%206.60938%203.73437%206.51562%203.75L3.89062%204.3125C3.79688%204.34375%203.75%204.40625%203.75%204.5C3.76562%206.3125%204.21094%207.95312%205.08594%209.42188C5.94531%2010.8906%207.10938%2012.0547%208.57812%2012.9141C10.0469%2013.7891%2011.6875%2014.2344%2013.5%2014.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "relative-1")}
                  tag="div"
                >
                  {"Phone Call"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isPhoneCallActive ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-848")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-845", "gap-10")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
          <_Builtin.Block tag="div">{slotInterviewPanel}</_Builtin.Block>
          {isPanelMembersVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-857")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "Click on the individual to mark their attendance as optional and double click to exclude the member from the team for this schedule."
                }
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-853")}
                tag="div"
              >
                {slotInterviewpanelPills ?? (
                  <>
                    <InterviewpanelPill />
                    <InterviewpanelPill />
                    <InterviewpanelPill />
                    <InterviewpanelPill />
                    <InterviewpanelPill />
                  </>
                )}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-858")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9%2015C7.90625%2014.9844%206.90625%2014.7188%206%2014.2031C5.09375%2013.6719%204.35938%2012.9375%203.79688%2012C3.26562%2011.0469%203%2010.0469%203%209C3%207.95312%203.26562%206.95312%203.79688%206C4.35938%205.0625%205.09375%204.32812%206%203.79688C6.90625%203.28125%207.90625%203.01563%209%203C10.0938%203.01563%2011.0938%203.28125%2012%203.79688C12.9062%204.32812%2013.6406%205.0625%2014.2031%206C14.7344%206.95312%2015%207.95312%2015%209C15%2010.0469%2014.7344%2011.0469%2014.2031%2012C13.6406%2012.9375%2012.9062%2013.6719%2012%2014.2031C11.0938%2014.7188%2010.0938%2014.9844%209%2015ZM11.6484%207.89844C11.8672%207.63281%2011.8672%207.36719%2011.6484%207.10156C11.3828%206.88281%2011.1172%206.88281%2010.8516%207.10156L8.25%209.70312L7.14844%208.60156C6.88281%208.38281%206.61719%208.38281%206.35156%208.60156C6.13281%208.86719%206.13281%209.13281%206.35156%209.39844L7.85156%2010.8984C8.11719%2011.1172%208.38281%2011.1172%208.64844%2010.8984L11.6484%207.89844Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-grey-600",
                    "text-sm-default",
                    "fw-semibold"
                  )}
                  tag="div"
                >
                  {textSelectedCount}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
