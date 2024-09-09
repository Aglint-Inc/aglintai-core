"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ReqAgentStats } from "./ReqAgentStats";
import { GlobalBadge } from "./GlobalBadge";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./RequestAgentDashboard.module.css";

export function RequestAgentDashboard({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "req-agent-dashboard")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "req-agent-header")}
        tag="div"
      >
        <ReqAgentStats />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-agentmatrix")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-agent-ready-schedule")}
          id={_utils.cx(
            _styles,
            "w-node-_00704830-1f2e-596f-4642-73ede898468c-e8984688"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "req-agent-ready-header")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <GlobalBadge color="purple" textBadge="Ready to schedule" />
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <Text color="accent" content="View All" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-agent-ready-body")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "req-agent-card-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text_with_icon-panel")}
                id={_utils.cx(
                  _styles,
                  "w-node-_00704830-1f2e-596f-4642-73ede8984696-e8984688"
                )}
                tag="div"
                data-color="neutral-12"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot_icon")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2220%22%20height%3D%2216%22%20viewBox%3D%220%200%2020%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.5%200H17.5C18.2083%200.0208333%2018.8021%200.260417%2019.2812%200.71875C19.7396%201.19792%2019.9792%201.79167%2020%202.5V13.5C19.9792%2014.2083%2019.7396%2014.8021%2019.2812%2015.2812C18.8021%2015.7396%2018.2083%2015.9792%2017.5%2016H2.5C1.79167%2015.9792%201.19792%2015.7396%200.71875%2015.2812C0.260417%2014.8021%200.0208333%2014.2083%200%2013.5V2.5C0.0208333%201.79167%200.260417%201.19792%200.71875%200.71875C1.19792%200.260417%201.79167%200.0208333%202.5%200ZM1%202.5V13.5C1.02083%2013.9167%201.16667%2014.2708%201.4375%2014.5625C1.72917%2014.8333%202.08333%2014.9792%202.5%2015H17.5C17.9167%2014.9792%2018.2708%2014.8333%2018.5625%2014.5625C18.8333%2014.2708%2018.9792%2013.9167%2019%2013.5V2.5C18.9792%202.08333%2018.8333%201.72917%2018.5625%201.4375C18.2708%201.16667%2017.9167%201.02083%2017.5%201H2.5C2.08333%201.02083%201.72917%201.16667%201.4375%201.4375C1.16667%201.72917%201.02083%202.08333%201%202.5ZM9%206C9%206.29167%209.09375%206.53125%209.28125%206.71875C9.46875%206.90625%209.70833%207%2010%207C10.2917%207%2010.5312%206.90625%2010.7188%206.71875C10.9062%206.53125%2011%206.29167%2011%206C11%205.70833%2010.9062%205.46875%2010.7188%205.28125C10.5312%205.09375%2010.2917%205%2010%205C9.70833%205%209.46875%205.09375%209.28125%205.28125C9.09375%205.46875%209%205.70833%209%206ZM12%206C11.9792%206.75%2011.6458%207.32292%2011%207.71875C10.3333%208.09375%209.66667%208.09375%209%207.71875C8.35417%207.32292%208.02083%206.75%208%206C8.02083%205.25%208.35417%204.67708%209%204.28125C9.66667%203.90625%2010.3333%203.90625%2011%204.28125C11.6458%204.67708%2011.9792%205.25%2012%206ZM11.25%2010H8.75C8.10417%2010.0417%207.69792%2010.375%207.53125%2011H12.4688C12.3021%2010.375%2011.8958%2010.0417%2011.25%2010ZM8.75%209H11.25C11.8958%209.02083%2012.4271%209.23958%2012.8438%209.65625C13.2604%2010.0729%2013.4792%2010.6042%2013.5%2011.25C13.4583%2011.7083%2013.2083%2011.9583%2012.75%2012H7.25C6.79167%2011.9583%206.54167%2011.7083%206.5%2011.25C6.52083%2010.6042%206.73958%2010.0729%207.15625%209.65625C7.57292%209.23958%208.10417%209.02083%208.75%209Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <Text
                  weight="medium"
                  content="Personality and cultural fit"
                  size="2"
                  color="inherit"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ra-ready-detail")}
                tag="div"
              >
                <TextWithIcon
                  textContent="30 Minutes"
                  iconName="hourglass"
                  fontWeight="medium"
                  iconSize="4"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon-panel")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_00704830-1f2e-596f-4642-73ede898469f-e8984688"
                  )}
                  tag="div"
                  data-color="neutral-12"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2218%22%20height%3D%2212%22%20viewBox%3D%220%200%2018%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%201C1.70833%201%201.46875%201.09375%201.28125%201.28125C1.09375%201.46875%201%201.70833%201%202V10C1%2010.2917%201.09375%2010.5312%201.28125%2010.7188C1.46875%2010.9062%201.70833%2011%202%2011H10C10.2917%2011%2010.5312%2010.9062%2010.7188%2010.7188C10.9062%2010.5312%2011%2010.2917%2011%2010V2C11%201.70833%2010.9062%201.46875%2010.7188%201.28125C10.5312%201.09375%2010.2917%201%2010%201H2ZM0%202C0.0208333%201.4375%200.21875%200.96875%200.59375%200.59375C0.96875%200.21875%201.4375%200.0208333%202%200H10C10.5625%200.0208333%2011.0312%200.21875%2011.4062%200.59375C11.7812%200.96875%2011.9792%201.4375%2012%202V3.46875V8.53125V10C11.9792%2010.5625%2011.7812%2011.0312%2011.4062%2011.4062C11.0312%2011.7812%2010.5625%2011.9792%2010%2012H2C1.4375%2011.9792%200.96875%2011.7812%200.59375%2011.4062C0.21875%2011.0312%200.0208333%2010.5625%200%2010V2ZM16.2188%2010.8438L13%209.0625V7.9375L16.7188%209.96875C16.7396%209.98958%2016.7708%2010%2016.8125%2010C16.9167%2010%2016.9792%209.9375%2017%209.8125V2.1875C16.9792%202.08333%2016.9167%202.02083%2016.8125%202C16.7708%202%2016.7396%202.01042%2016.7188%202.03125L13%204.0625V2.9375L16.2188%201.15625C16.4062%201.05208%2016.6042%201%2016.8125%201C17.1458%201%2017.4271%201.11458%2017.6562%201.34375C17.8854%201.57292%2018%201.85417%2018%202.1875V9.8125C18%2010.1458%2017.8854%2010.4271%2017.6562%2010.6562C17.4271%2010.8854%2017.1458%2011%2016.8125%2011C16.6042%2011%2016.4062%2010.9479%2016.2188%2010.8438Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <Text
                    weight="medium"
                    content="Google Meet"
                    size="2"
                    color="inherit"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ra-ready-detail")}
                tag="div"
              >
                <TextWithIcon
                  textContent="Senior Software Engineer"
                  iconName="trip"
                  fontWeight="medium"
                  iconSize="4"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon-panel")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_00704830-1f2e-596f-4642-73ede89846a8-e8984688"
                  )}
                  tag="div"
                  data-color="neutral-12"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H16C18.2091%200%2020%201.79086%2020%204V16C20%2018.2091%2018.2091%2020%2016%2020H4C1.79086%2020%200%2018.2091%200%2016V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2213.3333%22%20height%3D%2213.3333%22%20transform%3D%22translate(3.33203%203.33398)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M9.99946%204.11133C8.21988%204.11133%206.77724%205.55397%206.77724%207.33355C6.77724%208.80278%207.76056%2010.0423%209.105%2010.43C8.04364%2010.5593%207.1333%2010.9347%206.44752%2011.6106C5.57471%2012.4708%205.13281%2013.7513%205.13281%2015.4224C5.13281%2015.6556%205.32185%2015.8446%205.55503%2015.8446C5.78823%2015.8446%205.97726%2015.6556%205.97726%2015.4224C5.97726%2013.8935%206.37978%2012.863%207.04027%2012.212C7.702%2011.5599%208.6899%2011.2224%209.99942%2011.2224C11.3089%2011.2224%2012.2969%2011.5599%2012.9587%2012.212C13.6191%2012.863%2014.0217%2013.8935%2014.0217%2015.4224C14.0217%2015.6556%2014.2107%2015.8446%2014.4439%2015.8446C14.6771%2015.8447%2014.8661%2015.6556%2014.8661%2015.4224C14.8661%2013.7513%2014.4242%2012.4708%2013.5514%2011.6106C12.8656%2010.9348%2011.9552%2010.5594%2010.8939%2010.43C12.2383%2010.0424%2013.2217%208.80279%2013.2217%207.33355C13.2217%205.55397%2011.779%204.11133%209.99946%204.11133ZM7.62168%207.33355C7.62168%206.02034%208.68625%204.95577%209.99946%204.95577C11.3127%204.95577%2012.3772%206.02034%2012.3772%207.33355C12.3772%208.64676%2011.3127%209.71133%209.99946%209.71133C8.68625%209.71133%207.62168%208.64676%207.62168%207.33355Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <Text
                    weight="medium"
                    content="Brooklyn Simmons"
                    size="2"
                    color="inherit"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "req-agent-card-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text_with_icon-panel")}
                id={_utils.cx(
                  _styles,
                  "w-node-_00704830-1f2e-596f-4642-73ede89846ae-e8984688"
                )}
                tag="div"
                data-color="neutral-12"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot_icon")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2220%22%20height%3D%2216%22%20viewBox%3D%220%200%2020%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.5%200H17.5C18.2083%200.0208333%2018.8021%200.260417%2019.2812%200.71875C19.7396%201.19792%2019.9792%201.79167%2020%202.5V13.5C19.9792%2014.2083%2019.7396%2014.8021%2019.2812%2015.2812C18.8021%2015.7396%2018.2083%2015.9792%2017.5%2016H2.5C1.79167%2015.9792%201.19792%2015.7396%200.71875%2015.2812C0.260417%2014.8021%200.0208333%2014.2083%200%2013.5V2.5C0.0208333%201.79167%200.260417%201.19792%200.71875%200.71875C1.19792%200.260417%201.79167%200.0208333%202.5%200ZM1%202.5V13.5C1.02083%2013.9167%201.16667%2014.2708%201.4375%2014.5625C1.72917%2014.8333%202.08333%2014.9792%202.5%2015H17.5C17.9167%2014.9792%2018.2708%2014.8333%2018.5625%2014.5625C18.8333%2014.2708%2018.9792%2013.9167%2019%2013.5V2.5C18.9792%202.08333%2018.8333%201.72917%2018.5625%201.4375C18.2708%201.16667%2017.9167%201.02083%2017.5%201H2.5C2.08333%201.02083%201.72917%201.16667%201.4375%201.4375C1.16667%201.72917%201.02083%202.08333%201%202.5ZM9%206C9%206.29167%209.09375%206.53125%209.28125%206.71875C9.46875%206.90625%209.70833%207%2010%207C10.2917%207%2010.5312%206.90625%2010.7188%206.71875C10.9062%206.53125%2011%206.29167%2011%206C11%205.70833%2010.9062%205.46875%2010.7188%205.28125C10.5312%205.09375%2010.2917%205%2010%205C9.70833%205%209.46875%205.09375%209.28125%205.28125C9.09375%205.46875%209%205.70833%209%206ZM12%206C11.9792%206.75%2011.6458%207.32292%2011%207.71875C10.3333%208.09375%209.66667%208.09375%209%207.71875C8.35417%207.32292%208.02083%206.75%208%206C8.02083%205.25%208.35417%204.67708%209%204.28125C9.66667%203.90625%2010.3333%203.90625%2011%204.28125C11.6458%204.67708%2011.9792%205.25%2012%206ZM11.25%2010H8.75C8.10417%2010.0417%207.69792%2010.375%207.53125%2011H12.4688C12.3021%2010.375%2011.8958%2010.0417%2011.25%2010ZM8.75%209H11.25C11.8958%209.02083%2012.4271%209.23958%2012.8438%209.65625C13.2604%2010.0729%2013.4792%2010.6042%2013.5%2011.25C13.4583%2011.7083%2013.2083%2011.9583%2012.75%2012H7.25C6.79167%2011.9583%206.54167%2011.7083%206.5%2011.25C6.52083%2010.6042%206.73958%2010.0729%207.15625%209.65625C7.57292%209.23958%208.10417%209.02083%208.75%209Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <Text
                  weight="medium"
                  content="Personality and cultural fit"
                  size="2"
                  color="inherit"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ra-ready-detail")}
                tag="div"
              >
                <TextWithIcon
                  textContent="30 Minutes"
                  iconName="hourglass"
                  fontWeight="medium"
                  iconSize="4"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon-panel")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_00704830-1f2e-596f-4642-73ede89846b7-e8984688"
                  )}
                  tag="div"
                  data-color="neutral-12"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2218%22%20height%3D%2212%22%20viewBox%3D%220%200%2018%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%201C1.70833%201%201.46875%201.09375%201.28125%201.28125C1.09375%201.46875%201%201.70833%201%202V10C1%2010.2917%201.09375%2010.5312%201.28125%2010.7188C1.46875%2010.9062%201.70833%2011%202%2011H10C10.2917%2011%2010.5312%2010.9062%2010.7188%2010.7188C10.9062%2010.5312%2011%2010.2917%2011%2010V2C11%201.70833%2010.9062%201.46875%2010.7188%201.28125C10.5312%201.09375%2010.2917%201%2010%201H2ZM0%202C0.0208333%201.4375%200.21875%200.96875%200.59375%200.59375C0.96875%200.21875%201.4375%200.0208333%202%200H10C10.5625%200.0208333%2011.0312%200.21875%2011.4062%200.59375C11.7812%200.96875%2011.9792%201.4375%2012%202V3.46875V8.53125V10C11.9792%2010.5625%2011.7812%2011.0312%2011.4062%2011.4062C11.0312%2011.7812%2010.5625%2011.9792%2010%2012H2C1.4375%2011.9792%200.96875%2011.7812%200.59375%2011.4062C0.21875%2011.0312%200.0208333%2010.5625%200%2010V2ZM16.2188%2010.8438L13%209.0625V7.9375L16.7188%209.96875C16.7396%209.98958%2016.7708%2010%2016.8125%2010C16.9167%2010%2016.9792%209.9375%2017%209.8125V2.1875C16.9792%202.08333%2016.9167%202.02083%2016.8125%202C16.7708%202%2016.7396%202.01042%2016.7188%202.03125L13%204.0625V2.9375L16.2188%201.15625C16.4062%201.05208%2016.6042%201%2016.8125%201C17.1458%201%2017.4271%201.11458%2017.6562%201.34375C17.8854%201.57292%2018%201.85417%2018%202.1875V9.8125C18%2010.1458%2017.8854%2010.4271%2017.6562%2010.6562C17.4271%2010.8854%2017.1458%2011%2016.8125%2011C16.6042%2011%2016.4062%2010.9479%2016.2188%2010.8438Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <Text
                    weight="medium"
                    content="Google Meet"
                    size="2"
                    color="inherit"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ra-ready-detail")}
                tag="div"
              >
                <TextWithIcon
                  textContent="Senior Software Engineer"
                  iconName="trip"
                  fontWeight="medium"
                  iconSize="4"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon-panel")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_00704830-1f2e-596f-4642-73ede89846c0-e8984688"
                  )}
                  tag="div"
                  data-color="neutral-12"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H16C18.2091%200%2020%201.79086%2020%204V16C20%2018.2091%2018.2091%2020%2016%2020H4C1.79086%2020%200%2018.2091%200%2016V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2213.3333%22%20height%3D%2213.3333%22%20transform%3D%22translate(3.33203%203.33398)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M9.99946%204.11133C8.21988%204.11133%206.77724%205.55397%206.77724%207.33355C6.77724%208.80278%207.76056%2010.0423%209.105%2010.43C8.04364%2010.5593%207.1333%2010.9347%206.44752%2011.6106C5.57471%2012.4708%205.13281%2013.7513%205.13281%2015.4224C5.13281%2015.6556%205.32185%2015.8446%205.55503%2015.8446C5.78823%2015.8446%205.97726%2015.6556%205.97726%2015.4224C5.97726%2013.8935%206.37978%2012.863%207.04027%2012.212C7.702%2011.5599%208.6899%2011.2224%209.99942%2011.2224C11.3089%2011.2224%2012.2969%2011.5599%2012.9587%2012.212C13.6191%2012.863%2014.0217%2013.8935%2014.0217%2015.4224C14.0217%2015.6556%2014.2107%2015.8446%2014.4439%2015.8446C14.6771%2015.8447%2014.8661%2015.6556%2014.8661%2015.4224C14.8661%2013.7513%2014.4242%2012.4708%2013.5514%2011.6106C12.8656%2010.9348%2011.9552%2010.5594%2010.8939%2010.43C12.2383%2010.0424%2013.2217%208.80279%2013.2217%207.33355C13.2217%205.55397%2011.779%204.11133%209.99946%204.11133ZM7.62168%207.33355C7.62168%206.02034%208.68625%204.95577%209.99946%204.95577C11.3127%204.95577%2012.3772%206.02034%2012.3772%207.33355C12.3772%208.64676%2011.3127%209.71133%209.99946%209.71133C8.68625%209.71133%207.62168%208.64676%207.62168%207.33355Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <Text
                    weight="medium"
                    content="Brooklyn Simmons"
                    size="2"
                    color="inherit"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "req-agent-card-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text_with_icon-panel")}
                id={_utils.cx(
                  _styles,
                  "w-node-_00704830-1f2e-596f-4642-73ede89846c6-e8984688"
                )}
                tag="div"
                data-color="neutral-12"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot_icon")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2220%22%20height%3D%2216%22%20viewBox%3D%220%200%2020%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.5%200H17.5C18.2083%200.0208333%2018.8021%200.260417%2019.2812%200.71875C19.7396%201.19792%2019.9792%201.79167%2020%202.5V13.5C19.9792%2014.2083%2019.7396%2014.8021%2019.2812%2015.2812C18.8021%2015.7396%2018.2083%2015.9792%2017.5%2016H2.5C1.79167%2015.9792%201.19792%2015.7396%200.71875%2015.2812C0.260417%2014.8021%200.0208333%2014.2083%200%2013.5V2.5C0.0208333%201.79167%200.260417%201.19792%200.71875%200.71875C1.19792%200.260417%201.79167%200.0208333%202.5%200ZM1%202.5V13.5C1.02083%2013.9167%201.16667%2014.2708%201.4375%2014.5625C1.72917%2014.8333%202.08333%2014.9792%202.5%2015H17.5C17.9167%2014.9792%2018.2708%2014.8333%2018.5625%2014.5625C18.8333%2014.2708%2018.9792%2013.9167%2019%2013.5V2.5C18.9792%202.08333%2018.8333%201.72917%2018.5625%201.4375C18.2708%201.16667%2017.9167%201.02083%2017.5%201H2.5C2.08333%201.02083%201.72917%201.16667%201.4375%201.4375C1.16667%201.72917%201.02083%202.08333%201%202.5ZM9%206C9%206.29167%209.09375%206.53125%209.28125%206.71875C9.46875%206.90625%209.70833%207%2010%207C10.2917%207%2010.5312%206.90625%2010.7188%206.71875C10.9062%206.53125%2011%206.29167%2011%206C11%205.70833%2010.9062%205.46875%2010.7188%205.28125C10.5312%205.09375%2010.2917%205%2010%205C9.70833%205%209.46875%205.09375%209.28125%205.28125C9.09375%205.46875%209%205.70833%209%206ZM12%206C11.9792%206.75%2011.6458%207.32292%2011%207.71875C10.3333%208.09375%209.66667%208.09375%209%207.71875C8.35417%207.32292%208.02083%206.75%208%206C8.02083%205.25%208.35417%204.67708%209%204.28125C9.66667%203.90625%2010.3333%203.90625%2011%204.28125C11.6458%204.67708%2011.9792%205.25%2012%206ZM11.25%2010H8.75C8.10417%2010.0417%207.69792%2010.375%207.53125%2011H12.4688C12.3021%2010.375%2011.8958%2010.0417%2011.25%2010ZM8.75%209H11.25C11.8958%209.02083%2012.4271%209.23958%2012.8438%209.65625C13.2604%2010.0729%2013.4792%2010.6042%2013.5%2011.25C13.4583%2011.7083%2013.2083%2011.9583%2012.75%2012H7.25C6.79167%2011.9583%206.54167%2011.7083%206.5%2011.25C6.52083%2010.6042%206.73958%2010.0729%207.15625%209.65625C7.57292%209.23958%208.10417%209.02083%208.75%209Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <Text
                  weight="medium"
                  content="Personality and cultural fit"
                  size="2"
                  color="inherit"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ra-ready-detail")}
                tag="div"
              >
                <TextWithIcon
                  textContent="30 Minutes"
                  iconName="hourglass"
                  fontWeight="medium"
                  iconSize="4"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon-panel")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_00704830-1f2e-596f-4642-73ede89846cf-e8984688"
                  )}
                  tag="div"
                  data-color="neutral-12"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2218%22%20height%3D%2212%22%20viewBox%3D%220%200%2018%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%201C1.70833%201%201.46875%201.09375%201.28125%201.28125C1.09375%201.46875%201%201.70833%201%202V10C1%2010.2917%201.09375%2010.5312%201.28125%2010.7188C1.46875%2010.9062%201.70833%2011%202%2011H10C10.2917%2011%2010.5312%2010.9062%2010.7188%2010.7188C10.9062%2010.5312%2011%2010.2917%2011%2010V2C11%201.70833%2010.9062%201.46875%2010.7188%201.28125C10.5312%201.09375%2010.2917%201%2010%201H2ZM0%202C0.0208333%201.4375%200.21875%200.96875%200.59375%200.59375C0.96875%200.21875%201.4375%200.0208333%202%200H10C10.5625%200.0208333%2011.0312%200.21875%2011.4062%200.59375C11.7812%200.96875%2011.9792%201.4375%2012%202V3.46875V8.53125V10C11.9792%2010.5625%2011.7812%2011.0312%2011.4062%2011.4062C11.0312%2011.7812%2010.5625%2011.9792%2010%2012H2C1.4375%2011.9792%200.96875%2011.7812%200.59375%2011.4062C0.21875%2011.0312%200.0208333%2010.5625%200%2010V2ZM16.2188%2010.8438L13%209.0625V7.9375L16.7188%209.96875C16.7396%209.98958%2016.7708%2010%2016.8125%2010C16.9167%2010%2016.9792%209.9375%2017%209.8125V2.1875C16.9792%202.08333%2016.9167%202.02083%2016.8125%202C16.7708%202%2016.7396%202.01042%2016.7188%202.03125L13%204.0625V2.9375L16.2188%201.15625C16.4062%201.05208%2016.6042%201%2016.8125%201C17.1458%201%2017.4271%201.11458%2017.6562%201.34375C17.8854%201.57292%2018%201.85417%2018%202.1875V9.8125C18%2010.1458%2017.8854%2010.4271%2017.6562%2010.6562C17.4271%2010.8854%2017.1458%2011%2016.8125%2011C16.6042%2011%2016.4062%2010.9479%2016.2188%2010.8438Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <Text
                    weight="medium"
                    content="Google Meet"
                    size="2"
                    color="inherit"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ra-ready-detail")}
                tag="div"
              >
                <TextWithIcon
                  textContent="Senior Software Engineer"
                  iconName="trip"
                  fontWeight="medium"
                  iconSize="4"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon-panel")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_00704830-1f2e-596f-4642-73ede89846d8-e8984688"
                  )}
                  tag="div"
                  data-color="neutral-12"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H16C18.2091%200%2020%201.79086%2020%204V16C20%2018.2091%2018.2091%2020%2016%2020H4C1.79086%2020%200%2018.2091%200%2016V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2213.3333%22%20height%3D%2213.3333%22%20transform%3D%22translate(3.33203%203.33398)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M9.99946%204.11133C8.21988%204.11133%206.77724%205.55397%206.77724%207.33355C6.77724%208.80278%207.76056%2010.0423%209.105%2010.43C8.04364%2010.5593%207.1333%2010.9347%206.44752%2011.6106C5.57471%2012.4708%205.13281%2013.7513%205.13281%2015.4224C5.13281%2015.6556%205.32185%2015.8446%205.55503%2015.8446C5.78823%2015.8446%205.97726%2015.6556%205.97726%2015.4224C5.97726%2013.8935%206.37978%2012.863%207.04027%2012.212C7.702%2011.5599%208.6899%2011.2224%209.99942%2011.2224C11.3089%2011.2224%2012.2969%2011.5599%2012.9587%2012.212C13.6191%2012.863%2014.0217%2013.8935%2014.0217%2015.4224C14.0217%2015.6556%2014.2107%2015.8446%2014.4439%2015.8446C14.6771%2015.8447%2014.8661%2015.6556%2014.8661%2015.4224C14.8661%2013.7513%2014.4242%2012.4708%2013.5514%2011.6106C12.8656%2010.9348%2011.9552%2010.5594%2010.8939%2010.43C12.2383%2010.0424%2013.2217%208.80279%2013.2217%207.33355C13.2217%205.55397%2011.779%204.11133%209.99946%204.11133ZM7.62168%207.33355C7.62168%206.02034%208.68625%204.95577%209.99946%204.95577C11.3127%204.95577%2012.3772%206.02034%2012.3772%207.33355C12.3772%208.64676%2011.3127%209.71133%209.99946%209.71133C8.68625%209.71133%207.62168%208.64676%207.62168%207.33355Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <Text
                    weight="medium"
                    content="Brooklyn Simmons"
                    size="2"
                    color="inherit"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-agent-reschedule")}
          id={_utils.cx(
            _styles,
            "w-node-_00704830-1f2e-596f-4642-73ede89846dd-e8984688"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "req-agent-reschedule-header")}
            tag="div"
          >
            <Text content="Reschedule Requests" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}