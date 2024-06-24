"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CandidateBasicInfo.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateBasicInfo({
  as: _Component = _Builtin.Block,
  textRole = "Senior Software Engineer",
  textLocation = "Belarus, Belgium",
  textMail = "donae.erf2022@gmail.com",
  textPhone = "8078081250",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "sd_basic_info")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "text-with-icon")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.9%205.25V6.3H12.1V5.25C12.0854%205.03125%2011.9688%204.91458%2011.75%204.9H8.25C8.03125%204.91458%207.91458%205.03125%207.9%205.25ZM7.2%206.3V5.25C7.21458%204.95833%207.31667%204.71042%207.50625%204.50625C7.71042%204.31667%207.95833%204.21458%208.25%204.2H11.75C12.0417%204.21458%2012.2896%204.31667%2012.4938%204.50625C12.6833%204.71042%2012.7854%204.95833%2012.8%205.25V6.3H14.2C14.5938%206.31458%2014.9219%206.45312%2015.1844%206.71562C15.4469%206.97812%2015.5854%207.30625%2015.6%207.7V13.3C15.5854%2013.6937%2015.4469%2014.0219%2015.1844%2014.2844C14.9219%2014.5469%2014.5938%2014.6854%2014.2%2014.7H5.8C5.40625%2014.6854%205.07812%2014.5469%204.81562%2014.2844C4.55312%2014.0219%204.41458%2013.6937%204.4%2013.3V7.7C4.41458%207.30625%204.55312%206.97812%204.81562%206.71562C5.07812%206.45312%205.40625%206.31458%205.8%206.3H7.2ZM12.45%207H7.55H5.8C5.59583%207%205.42812%207.06562%205.29687%207.19687C5.16562%207.32812%205.1%207.49583%205.1%207.7V9.8H8.25H8.95H11.05H11.75H14.9V7.7C14.9%207.49583%2014.8344%207.32812%2014.7031%207.19687C14.5719%207.06562%2014.4042%207%2014.2%207H12.45ZM14.9%2010.5H11.75V11.55C11.75%2011.7542%2011.6844%2011.9219%2011.5531%2012.0531C11.4219%2012.1844%2011.2542%2012.25%2011.05%2012.25H8.95C8.74583%2012.25%208.57812%2012.1844%208.44687%2012.0531C8.31562%2011.9219%208.25%2011.7542%208.25%2011.55V10.5H5.1V13.3C5.1%2013.5042%205.16562%2013.6719%205.29687%2013.8031C5.42812%2013.9344%205.59583%2014%205.8%2014H14.2C14.4042%2014%2014.5719%2013.9344%2014.7031%2013.8031C14.8344%2013.6719%2014.9%2013.5042%2014.9%2013.3V10.5ZM8.95%2010.5V11.55H11.05V10.5H8.95Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <Text content={textRole} color="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-with-icon")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13.5%208.4C13.4708%207.40833%2013.1281%206.58437%2012.4719%205.92812C11.8156%205.27187%2010.9917%204.92917%2010%204.9C9.00833%204.92917%208.18437%205.27187%207.52812%205.92812C6.87187%206.58437%206.52917%207.40833%206.5%208.4C6.5%208.75%206.62396%209.20937%206.87187%209.77812C7.11979%2010.3615%207.43333%2010.9667%207.8125%2011.5937C8.19167%2012.2062%208.57812%2012.775%208.97187%2013.3C9.36562%2013.8396%209.70833%2014.2917%2010%2014.6563C10.2917%2014.2917%2010.6344%2013.8396%2011.0281%2013.3C11.4219%2012.775%2011.8083%2012.2062%2012.1875%2011.5937C12.5813%2010.9667%2012.9021%2010.3615%2013.15%209.77812C13.3833%209.20937%2013.5%208.75%2013.5%208.4ZM14.2%208.4C14.1708%209.05625%2013.9375%209.81458%2013.5%2010.675C13.0479%2011.5354%2012.5375%2012.3667%2011.9688%2013.1687C11.4%2013.9854%2010.9188%2014.6344%2010.525%2015.1156C10.3792%2015.2906%2010.2042%2015.3781%2010%2015.3781C9.79583%2015.3781%209.62083%2015.2906%209.475%2015.1156C9.08125%2014.6344%208.6%2013.9854%208.03125%2013.1687C7.4625%2012.3667%206.95208%2011.5354%206.5%2010.675C6.0625%209.81458%205.82917%209.05625%205.8%208.4C5.82917%207.20417%206.2375%206.2125%207.025%205.425C7.8125%204.6375%208.80417%204.22917%2010%204.2C11.1958%204.22917%2012.1875%204.6375%2012.975%205.425C13.7625%206.2125%2014.1708%207.20417%2014.2%208.4ZM8.95%208.4C8.96458%208.79375%209.13958%209.1%209.475%209.31875C9.825%209.49375%2010.175%209.49375%2010.525%209.31875C10.8604%209.1%2011.0354%208.79375%2011.05%208.4C11.0354%208.00625%2010.8604%207.7%2010.525%207.48125C10.175%207.30625%209.825%207.30625%209.475%207.48125C9.13958%207.7%208.96458%208.00625%208.95%208.4ZM10%2010.15C9.34375%2010.1354%208.84062%209.84375%208.49062%209.275C8.16979%208.69167%208.16979%208.10833%208.49062%207.525C8.84062%206.95625%209.34375%206.66458%2010%206.65C10.6563%206.66458%2011.1594%206.95625%2011.5094%207.525C11.8302%208.10833%2011.8302%208.69167%2011.5094%209.275C11.1594%209.84375%2010.6563%2010.1354%2010%2010.15Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text content={textLocation} color="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-with-icon")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.8%206.3C5.59583%206.3%205.42812%206.36562%205.29687%206.49687C5.16562%206.62812%205.1%206.79583%205.1%207V7.875L9.3875%2011.0031C9.79583%2011.2802%2010.2042%2011.2802%2010.6125%2011.0031L14.9%207.875V7C14.9%206.79583%2014.8344%206.62812%2014.7031%206.49687C14.5719%206.36562%2014.4042%206.3%2014.2%206.3H5.8ZM5.1%208.75V12.6C5.1%2012.8042%205.16562%2012.9719%205.29687%2013.1031C5.42812%2013.2344%205.59583%2013.3%205.8%2013.3H14.2C14.4042%2013.3%2014.5719%2013.2344%2014.7031%2013.1031C14.8344%2012.9719%2014.9%2012.8042%2014.9%2012.6V8.75L11.0281%2011.5719C10.7219%2011.8052%2010.3792%2011.9219%2010%2011.9219C9.62083%2011.9219%209.27812%2011.8052%208.97187%2011.5719L5.1%208.75ZM4.4%207C4.41458%206.60625%204.55312%206.27812%204.81562%206.01562C5.07812%205.75312%205.40625%205.61458%205.8%205.6H14.2C14.5938%205.61458%2014.9219%205.75312%2015.1844%206.01562C15.4469%206.27812%2015.5854%206.60625%2015.6%207V12.6C15.5854%2012.9937%2015.4469%2013.3219%2015.1844%2013.5844C14.9219%2013.8469%2014.5938%2013.9854%2014.2%2014H5.8C5.40625%2013.9854%205.07812%2013.8469%204.81562%2013.5844C4.55312%2013.3219%204.41458%2012.9937%204.4%2012.6V7Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text content={textMail} color="neutral-11" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-with-icon")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.625%2010.2156L15.075%2011.2656C15.2646%2011.3531%2015.4104%2011.4917%2015.5125%2011.6812C15.6%2011.8562%2015.6219%2012.0458%2015.5781%2012.25L15.0531%2014.7C14.9365%2015.1375%2014.6521%2015.3708%2014.2%2015.4C14.0688%2015.4%2013.9375%2015.4%2013.8063%2015.4C13.7042%2015.3854%2013.6021%2015.3781%2013.5%2015.3781C11.7938%2015.2323%2010.2552%2014.7146%208.88437%2013.825C7.51354%2012.9354%206.42708%2011.776%205.625%2010.3469C4.82292%208.93229%204.41458%207.35%204.4%205.6C4.42917%205.14792%204.6625%204.86354%205.1%204.74687L7.55%204.22187C7.75417%204.17812%207.94375%204.20729%208.11875%204.30937C8.30833%204.39687%208.44687%204.53542%208.53437%204.725L9.58437%207.175C9.73021%207.56875%209.64271%207.91146%209.32187%208.20312L8.44687%208.925C9.04479%209.94583%209.85417%2010.7552%2010.875%2011.3531L11.5969%2010.4781C11.8885%2010.1573%2012.2313%2010.0698%2012.625%2010.2156ZM14.2%2014.7C14.2875%2014.7%2014.3458%2014.6563%2014.375%2014.5688L14.9%2012.1187C14.9146%2012.0167%2014.8781%2011.951%2014.7906%2011.9219L12.3406%2010.8719C12.2677%2010.8427%2012.2021%2010.8573%2012.1438%2010.9156L11.4219%2011.8125C11.1594%2012.075%2010.8604%2012.126%2010.525%2011.9656C9.3875%2011.3094%208.49062%2010.4125%207.83437%209.275C7.67396%208.93958%207.725%208.64062%207.9875%208.37812L8.88437%207.65625C8.94271%207.59792%208.95729%207.53229%208.92812%207.45937L7.87812%205.00937C7.83437%204.92187%207.76875%204.88542%207.68125%204.9L5.23125%205.425C5.14375%205.45417%205.1%205.5125%205.1%205.6C5.11458%207.29167%205.53021%208.82292%206.34687%2010.1937C7.14896%2011.5646%208.23542%2012.651%209.60625%2013.4531C10.9771%2014.2698%2012.5083%2014.6854%2014.2%2014.7Z%22%20fill%3D%22%2321201C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text content={textPhone} color="" />
      </_Builtin.Block>
    </_Component>
  );
}
