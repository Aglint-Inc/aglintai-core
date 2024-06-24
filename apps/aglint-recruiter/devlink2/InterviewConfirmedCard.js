"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import { ButtonOutlined } from "./ButtonOutlined";
import * as _utils from "./utils";
import _styles from "./InterviewConfirmedCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-153":{"id":"e-153","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-98","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-154"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3c700d5e-d3a4-d4bf-a920-b832588b62ea","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3c700d5e-d3a4-d4bf-a920-b832588b62ea","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715061368226},"e-154":{"id":"e-154","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-99","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-153"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3c700d5e-d3a4-d4bf-a920-b832588b62ea","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3c700d5e-d3a4-d4bf-a920-b832588b62ea","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715061368227}},"actionLists":{"a-98":{"id":"a-98","title":"Interview Confirmed Card Hover in","actionItemGroups":[{"actionItems":[{"id":"a-98-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{},"value":0,"unit":""}},{"id":"a-98-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"none"}}]},{"actionItems":[{"id":"a-98-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{},"value":1,"unit":""}},{"id":"a-98-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715061372072},"a-99":{"id":"a-99","title":"Interview Confirmed Card Hover out","actionItemGroups":[{"actionItems":[{"id":"a-99-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{},"value":0,"unit":""}},{"id":"a-99-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715061372072}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewConfirmedCard({
  as: _Component = _Builtin.Block,
  textDate = "Fri, May 12, 2024",
  textTime = "09:00AM - 09:30PM PST",
  textPanel = "C++ Coding",
  slotMeetingIcon,
  textPlatformName = "Google Meet",
  textDuration = "45 Minutes",
  onClickJoinGoogleMeet = {},
  onClickAddCalendar = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview-confirmed-card-wrap")}
      data-w-id="3c700d5e-d3a4-d4bf-a920-b832588b62ea"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ic-card-left-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-date-wrap")}
          tag="div"
        >
          <Text content={textDate} weight="bold" />
          <Text content={textTime} weight="" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-panel-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2224%22%20height%3D%2225%22%20viewbox%3D%220%200%2024%2025%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.5%204.12305H19.5C20.2083%204.14388%2020.8021%204.38346%2021.2812%204.8418C21.7396%205.32096%2021.9792%205.91471%2022%206.62305V17.623C21.9792%2018.3314%2021.7396%2018.9251%2021.2812%2019.4043C20.8021%2019.8626%2020.2083%2020.1022%2019.5%2020.123H4.5C3.79167%2020.1022%203.19792%2019.8626%202.71875%2019.4043C2.26042%2018.9251%202.02083%2018.3314%202%2017.623V6.62305C2.02083%205.91471%202.26042%205.32096%202.71875%204.8418C3.19792%204.38346%203.79167%204.14388%204.5%204.12305ZM3%206.62305V17.623C3.02083%2018.0397%203.16667%2018.3939%203.4375%2018.6855C3.72917%2018.9564%204.08333%2019.1022%204.5%2019.123H19.5C19.9167%2019.1022%2020.2708%2018.9564%2020.5625%2018.6855C20.8333%2018.3939%2020.9792%2018.0397%2021%2017.623V6.62305C20.9792%206.20638%2020.8333%205.85221%2020.5625%205.56055C20.2708%205.28971%2019.9167%205.14388%2019.5%205.12305H4.5C4.08333%205.14388%203.72917%205.28971%203.4375%205.56055C3.16667%205.85221%203.02083%206.20638%203%206.62305ZM11%2010.123C11%2010.4147%2011.0938%2010.6543%2011.2812%2010.8418C11.4688%2011.0293%2011.7083%2011.123%2012%2011.123C12.2917%2011.123%2012.5312%2011.0293%2012.7188%2010.8418C12.9062%2010.6543%2013%2010.4147%2013%2010.123C13%209.83138%2012.9062%209.5918%2012.7188%209.4043C12.5312%209.2168%2012.2917%209.12305%2012%209.12305C11.7083%209.12305%2011.4688%209.2168%2011.2812%209.4043C11.0938%209.5918%2011%209.83138%2011%2010.123ZM14%2010.123C13.9792%2010.873%2013.6458%2011.446%2013%2011.8418C12.3333%2012.2168%2011.6667%2012.2168%2011%2011.8418C10.3542%2011.446%2010.0208%2010.873%2010%2010.123C10.0208%209.37305%2010.3542%208.80013%2011%208.4043C11.6667%208.0293%2012.3333%208.0293%2013%208.4043C13.6458%208.80013%2013.9792%209.37305%2014%2010.123ZM13.25%2014.123H10.75C10.1042%2014.1647%209.69792%2014.498%209.53125%2015.123H14.4688C14.3021%2014.498%2013.8958%2014.1647%2013.25%2014.123ZM10.75%2013.123H13.25C13.8958%2013.1439%2014.4271%2013.3626%2014.8438%2013.7793C15.2604%2014.196%2015.4792%2014.7272%2015.5%2015.373C15.4583%2015.8314%2015.2083%2016.0814%2014.75%2016.123H9.25C8.79167%2016.0814%208.54167%2015.8314%208.5%2015.373C8.52083%2014.7272%208.73958%2014.196%209.15625%2013.7793C9.57292%2013.3626%2010.1042%2013.1439%2010.75%2013.123Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <Text content={textPanel} weight="bold" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-meeting-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ic-meeting")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotMeetingIcon ?? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2218%22%20viewbox%3D%220%200%2020%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_10069_107278)%22%3E%0A%3Cpath%20d%3D%22M11.3145%209.12211L13.2641%2011.3507L15.8862%2013.0261L16.3422%209.13618L15.8862%205.33398L13.214%206.80572L11.3145%209.12211Z%22%20fill%3D%22%2300832D%22%2F%3E%0A%3Cpath%20d%3D%22M0%2012.6649V15.9797C0%2016.7366%200.61431%2017.3511%201.37135%2017.3511H4.68616L5.37256%2014.8466L4.68616%2012.6649L2.41198%2011.9785L0%2012.6649Z%22%20fill%3D%22%230066DA%22%2F%3E%0A%3Cpath%20d%3D%22M4.68616%200.894531L0%205.58069L2.41213%206.2655L4.68616%205.58069L5.36009%203.4288L4.68616%200.894531Z%22%20fill%3D%22%23E94235%22%2F%3E%0A%3Cpath%20d%3D%22M0%2012.6656H4.68616V5.58008H0V12.6656Z%22%20fill%3D%22%232684FC%22%2F%3E%0A%3Cpath%20d%3D%22M18.8793%202.87805L15.8857%205.33398V13.026L18.8917%2015.4915C19.3417%2015.844%2020%2015.5227%2020%2014.9507V3.40779C20%202.82946%2019.326%202.50975%2018.8793%202.87805Z%22%20fill%3D%22%2300AC47%22%2F%3E%0A%3Cpath%20d%3D%22M11.3144%209.12305V12.665H4.68652V17.3512H14.5148C15.2718%2017.3512%2015.8861%2016.7367%2015.8861%2015.9798V13.0271L11.3144%209.12305Z%22%20fill%3D%22%2300AC47%22%2F%3E%0A%3Cpath%20d%3D%22M14.5148%200.894531H4.68652V5.58069H11.3144V9.12266L15.8861%205.33453V2.26589C15.8861%201.50884%2015.2718%200.894531%2014.5148%200.894531Z%22%20fill%3D%22%23FFBA00%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_10069_107278%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2216.4563%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.894531)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
            <Text content={textPlatformName} weight="" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ic-meeting")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%200.123047C7.125%200.138672%208.13281%200.412109%209.02344%200.943359C9.92969%201.47461%2010.6484%202.19336%2011.1797%203.09961C11.7109%203.99023%2011.9844%204.99805%2012%206.12305C11.9844%207.24805%2011.7109%208.25586%2011.1797%209.14648C10.6484%2010.0527%209.92969%2010.7715%209.02344%2011.3027C8.13281%2011.834%207.125%2012.1074%206%2012.123C4.875%2012.1074%203.86719%2011.834%202.97656%2011.3027C2.07031%2010.7715%201.35156%2010.0527%200.820312%209.14648C0.289062%208.25586%200.015625%207.24805%200%206.12305C0%205.2793%200.164062%204.49023%200.492188%203.75586C0.804688%203.02148%201.24219%202.38086%201.80469%201.83398C1.96094%201.69336%202.14062%201.62305%202.34375%201.62305C2.53125%201.62305%202.70312%201.70117%202.85938%201.85742C3%202.01367%203.07031%202.18555%203.07031%202.37305C3.07031%202.57617%203%202.75586%202.85938%202.91211C1.98438%203.75586%201.53125%204.82617%201.5%206.12305C1.53125%207.4043%201.96875%208.4668%202.8125%209.31055C3.65625%2010.1543%204.71875%2010.5918%206%2010.623C7.28125%2010.5918%208.34375%2010.1543%209.1875%209.31055C10.0312%208.4668%2010.4688%207.4043%2010.5%206.12305C10.4844%204.98242%2010.125%204.00586%209.42188%203.19336C8.73438%202.39648%207.84375%201.89648%206.75%201.69336V2.37305C6.75%202.5918%206.67969%202.77148%206.53906%202.91211C6.39844%203.05273%206.21875%203.12305%206%203.12305C5.78125%203.12305%205.60156%203.05273%205.46094%202.91211C5.32031%202.77148%205.25%202.5918%205.25%202.37305V0.873047C5.25%200.654297%205.32031%200.474609%205.46094%200.333984C5.60156%200.193359%205.78125%200.123047%206%200.123047ZM4.52344%203.84961L6.39844%205.72461C6.61719%205.99023%206.61719%206.25586%206.39844%206.52148C6.13281%206.74023%205.86719%206.74023%205.60156%206.52148L3.72656%204.64648C3.50781%204.38086%203.50781%204.11523%203.72656%203.84961C3.99219%203.63086%204.25781%203.63086%204.52344%203.84961Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <Text content={textDuration} weight="" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ic-card-right-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div" {...onClickJoinGoogleMeet}>
          <ButtonSolid
            isRightIcon={false}
            isLeftIcon={false}
            size="2"
            textButton="Join with google meet"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...onClickAddCalendar}>
          <ButtonOutlined
            isRightIcon={false}
            isLeftIcon={false}
            size="2"
            textButton="Add to Calendar"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
