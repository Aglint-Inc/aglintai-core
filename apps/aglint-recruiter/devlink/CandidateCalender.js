"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { DayColumn } from "./DayColumn";
import * as _utils from "./utils";
import _styles from "./CandidateCalender.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateCalender({
  as: _Component = _Builtin.Block,
  textMonth = "January 2024",
  slotTimeZone,
  slotDayColumn,
  onClickLeft = {},
  onClickRight = {},
  isRightArrow = true,
  isLeftArrow = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "candidate_calender")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "calender_top-copy")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "month_and-_year")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "_20-20_icon_block")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.125%205C8.51562%205.02604%208.72396%205.23438%208.75%205.625V7.5H16.25V5.625C16.276%205.23438%2016.4844%205.02604%2016.875%205C17.2656%205.02604%2017.474%205.23438%2017.5%205.625V7.5H18.75C19.4531%207.52604%2020.0391%207.77344%2020.5078%208.24219C20.9766%208.71094%2021.224%209.29688%2021.25%2010V11.25V12.5V12.5391C21.0417%2012.513%2020.8333%2012.5%2020.625%2012.5C20.4167%2012.5%2020.2083%2012.513%2020%2012.5391V12.5H5V22.5C5%2022.8646%205.11719%2023.1641%205.35156%2023.3984C5.58594%2023.6328%205.88542%2023.75%206.25%2023.75H15.3125C15.7031%2024.2188%2016.1589%2024.6354%2016.6797%2025H6.25C5.54688%2024.974%204.96094%2024.7266%204.49219%2024.2578C4.02344%2023.7891%203.77604%2023.2031%203.75%2022.5V12.5V11.25V10C3.77604%209.29688%204.02344%208.71094%204.49219%208.24219C4.96094%207.77344%205.54688%207.52604%206.25%207.5H7.5V5.625C7.52604%205.23438%207.73438%205.02604%208.125%205ZM18.75%208.75H6.25C5.88542%208.75%205.58594%208.86719%205.35156%209.10156C5.11719%209.33594%205%209.63542%205%2010V11.25H20V10C20%209.63542%2019.8828%209.33594%2019.6484%209.10156C19.4141%208.86719%2019.1146%208.75%2018.75%208.75ZM20.625%2023.75C21.4062%2023.75%2022.1354%2023.5547%2022.8125%2023.1641C23.4896%2022.7734%2024.0234%2022.2396%2024.4141%2021.5625C24.8047%2020.8854%2025%2020.1562%2025%2019.375C25%2018.5938%2024.8047%2017.8646%2024.4141%2017.1875C24.0234%2016.5104%2023.4896%2015.9766%2022.8125%2015.5859C22.1354%2015.1953%2021.4062%2015%2020.625%2015C19.8438%2015%2019.1146%2015.1953%2018.4375%2015.5859C17.7604%2015.9766%2017.2266%2016.5104%2016.8359%2017.1875C16.4453%2017.8646%2016.25%2018.5938%2016.25%2019.375C16.25%2020.1562%2016.4453%2020.8854%2016.8359%2021.5625C17.2266%2022.2396%2017.7604%2022.7734%2018.4375%2023.1641C19.1146%2023.5547%2019.8438%2023.75%2020.625%2023.75ZM20.625%2013.75C21.6406%2013.75%2022.5781%2013.9974%2023.4375%2014.4922C24.2969%2014.987%2024.987%2015.6771%2025.5078%2016.5625C26.0026%2017.4479%2026.25%2018.3854%2026.25%2019.375C26.25%2020.3646%2026.0026%2021.3021%2025.5078%2022.1875C24.987%2023.0729%2024.2969%2023.763%2023.4375%2024.2578C22.5781%2024.7526%2021.6406%2025%2020.625%2025C19.6094%2025%2018.6719%2024.7526%2017.8125%2024.2578C16.9531%2023.763%2016.263%2023.0729%2015.7422%2022.1875C15.2474%2021.3021%2015%2020.3646%2015%2019.375C15%2018.3854%2015.2474%2017.4479%2015.7422%2016.5625C16.263%2015.6771%2016.9531%2014.987%2017.8125%2014.4922C18.6719%2013.9974%2019.6094%2013.75%2020.625%2013.75ZM20.625%2016.25C21.0156%2016.276%2021.224%2016.4844%2021.25%2016.875V18.75H22.5C22.8906%2018.776%2023.099%2018.9844%2023.125%2019.375C23.099%2019.7656%2022.8906%2019.974%2022.5%2020H20.625C20.2344%2019.974%2020.026%2019.7656%2020%2019.375V16.875C20.026%2016.4844%2020.2344%2016.276%2020.625%2016.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <Text content={textMonth} weight="medium" />
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotTimeZone ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "time_zome_drop")}
              tag="div"
            >
              <Text content="GMT +05:30 Indian time" />
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.60156%209.39844L1.10156%204.89844C0.882812%204.63281%200.882812%204.36719%201.10156%204.10156C1.36719%203.88281%201.63281%203.88281%201.89844%204.10156L6%208.20312L10.1016%204.10156C10.3672%203.88281%2010.6328%203.88281%2010.8984%204.10156C11.1172%204.36719%2011.1172%204.63281%2010.8984%204.89844L6.39844%209.39844C6.13281%209.61719%205.86719%209.61719%205.60156%209.39844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "calender_body")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "arrorw_block")}
          tag="div"
        >
          {isLeftArrow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "arrow_embed")}
              value="%3Csvg%20width%3D%2228%22%20height%3D%2228%22%20viewbox%3D%220%200%2028%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%225.5%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%225.5%22%20stroke%3D%22%23E9EBED%22%2F%3E%0A%3Cpath%20d%3D%22M9.46875%2013.4688L15.4688%207.46875C15.8229%207.17708%2016.1771%207.17708%2016.5312%207.46875C16.8229%207.82292%2016.8229%208.17708%2016.5312%208.53125L11.0625%2014L16.5312%2019.4688C16.8229%2019.8229%2016.8229%2020.1771%2016.5312%2020.5312C16.1771%2020.8229%2015.8229%2020.8229%2015.4688%2020.5312L9.46875%2014.5312C9.17708%2014.1771%209.17708%2013.8229%209.46875%2013.4688Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickLeft}
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "day_columns")} tag="div">
          {slotDayColumn ?? (
            <>
              <DayColumn />
              <DayColumn />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "arrorw_block")}
          tag="div"
        >
          {isRightArrow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "arrow_embed")}
              value="%3Csvg%20width%3D%2228%22%20height%3D%2228%22%20viewbox%3D%220%200%2028%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%2227.5%22%20y%3D%2227.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%225.5%22%20transform%3D%22rotate(-180%2027.5%2027.5)%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20x%3D%2227.5%22%20y%3D%2227.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%225.5%22%20transform%3D%22rotate(-180%2027.5%2027.5)%22%20stroke%3D%22%23E9EBED%22%2F%3E%0A%3Cpath%20d%3D%22M18.5312%2014.5312L12.5312%2020.5312C12.1771%2020.8229%2011.8229%2020.8229%2011.4688%2020.5312C11.1771%2020.1771%2011.1771%2019.8229%2011.4688%2019.4688L16.9375%2014L11.4688%208.53125C11.1771%208.17708%2011.1771%207.82292%2011.4688%207.46875C11.8229%207.17708%2012.1771%207.17708%2012.5313%207.46875L18.5312%2013.4688C18.8229%2013.8229%2018.8229%2014.1771%2018.5312%2014.5312Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickRight}
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
