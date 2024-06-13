"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CdSavedList } from "./CdSavedList";
import { CdTableAglint } from "./CdTableAglint";
import * as _utils from "./utils";
import _styles from "./CdAglintDb.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CdAglintDb({
  as: _Component = _Builtin.Block,
  onClickEditQuery = {},
  onClickCandidateData = {},
  textHeader = "Software Enginner in Texas with 6 to 8 years experience",
  slotCheckbox,
  slotCdTableAglint,
  isSelectedVisible = false,
  onClickCloseSelected = {},
  textNoCandidateSelected = "3 candidates selected",
  onClickBookmark = {},
  isHeaderVisible = true,
  slotViewSaveList,
  slotEmailOut,
  slotSavetoList,
  onClickEmailOutReach = {},
  isEditQueryVisible = true,
  onClickList = {},
  onClickEdit = {},
  isEditVisible = true,
  slotInput,
  onClickSubmit = {},
  onClickClose = {},
  isSubmitVisible = true,
  onClickBack = {},
  isListHeaderVisible = false,
  isCdHeaderVisible = true,
  isLoading = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "cd-table")} tag="div">
      {isCdHeaderVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-680")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-679")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-blue-600",
                "fw-semibold",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickCandidateData}
            >
              {"Candidate database"}
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.64645%2010.3536C3.47288%2010.18%203.4536%209.91056%203.58859%209.71569L3.64645%209.64645L7.293%206L3.64645%202.35355C3.47288%202.17999%203.4536%201.91056%203.58859%201.71569L3.64645%201.64645C3.82001%201.47288%204.08944%201.4536%204.28431%201.58859L4.35355%201.64645L8.35355%205.64645C8.52712%205.82001%208.5464%206.08944%208.41141%206.28431L8.35355%206.35355L4.35355%2010.3536C4.15829%2010.5488%203.84171%2010.5488%203.64645%2010.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{textHeader}</_Builtin.Block>
            {isEditQueryVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "edit-query-btn",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickEditQuery}
              >
                {"Edit Query"}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-681")}
            tag="div"
          >
            {slotViewSaveList ?? <CdSavedList />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isListHeaderVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "list-header-view")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-739", "cursor-pointer")}
            tag="div"
            {...onClickBack}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.35355%201.64645C8.52712%201.82001%208.5464%202.08944%208.41141%202.28431L8.35355%202.35355L4.707%206L8.35355%209.64645C8.52712%209.82001%208.5464%2010.0894%208.41141%2010.2843L8.35355%2010.3536C8.17999%2010.5271%207.91056%2010.5464%207.71569%2010.4114L7.64645%2010.3536L3.64645%206.35355C3.47288%206.17999%203.4536%205.91056%203.58859%205.71569L3.64645%205.64645L7.64645%201.64645C7.84171%201.45118%208.15829%201.45118%208.35355%201.64645Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-grey-600")}
              tag="div"
            >
              {"Back"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-740")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-741")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
              {isSubmitVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-742")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons", "cursor-pointer")}
                    value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewbox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21.0547%206.94531C21.3151%207.23177%2021.3151%207.51823%2021.0547%207.80469L10.4297%2018.4297C10.1432%2018.6901%209.85677%2018.6901%209.57031%2018.4297L3.94531%2012.8047C3.6849%2012.5182%203.6849%2012.2318%203.94531%2011.9453C4.23177%2011.6849%204.51823%2011.6849%204.80469%2011.9453L10%2017.1016L20.1953%206.94531C20.4818%206.6849%2020.7682%206.6849%2021.0547%206.94531Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                    {...onClickSubmit}
                  />
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons", "cursor-pointer")}
                    value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewbox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.6953%2019.0547L12.5%2013.8984L7.34375%2019.0547C7.03125%2019.2891%206.73177%2019.2891%206.44531%2019.0547C6.21094%2018.7682%206.21094%2018.4818%206.44531%2018.1953L11.6016%2013L6.44531%207.84375C6.21094%207.53125%206.21094%207.23177%206.44531%206.94531C6.73177%206.71094%207.03125%206.71094%207.34375%206.94531L12.5%2012.1016L17.6953%206.94531C17.9818%206.71094%2018.2682%206.71094%2018.5547%206.94531C18.7891%207.23177%2018.7891%207.53125%2018.5547%207.84375L13.3984%2013L18.5547%2018.1953C18.7891%2018.4818%2018.7891%2018.7682%2018.5547%2019.0547C18.2682%2019.2891%2017.9818%2019.2891%2017.6953%2019.0547Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                    {...onClickClose}
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            {isEditVisible ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "cursor-pointer")}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.8359%201.38281C10.5703%201.16406%2010.3047%201.16406%2010.0391%201.38281L9.35938%202.0625L10.4375%203.14062L11.1172%202.46094C11.3359%202.19531%2011.3359%201.92969%2011.1172%201.66406L10.8359%201.38281ZM5.42188%206C5.34375%206.07812%205.29688%206.16406%205.28125%206.25781L4.88281%207.61719L6.24219%207.21875C6.33594%207.20312%206.42188%207.15625%206.5%207.07812L9.64062%203.9375L8.5625%202.85938L5.42188%206ZM9.24219%200.585938C9.58594%200.257812%209.98438%200.09375%2010.4375%200.09375C10.8906%200.09375%2011.2891%200.257812%2011.6328%200.585938L11.9141%200.867188C12.2422%201.21094%2012.4062%201.60938%2012.4062%202.0625C12.4062%202.51562%2012.2422%202.91406%2011.9141%203.25781L7.29688%207.875C7.09375%208.07812%206.85156%208.21875%206.57031%208.29688L4.22656%208.97656C4.00781%209.02344%203.82031%208.97656%203.66406%208.83594C3.50781%208.67969%203.46094%208.49219%203.52344%208.27344L4.20312%205.92969C4.28125%205.66406%204.42188%205.42188%204.625%205.20312L9.24219%200.585938ZM2.5625%201.5H5.1875C5.53125%201.53125%205.71875%201.71875%205.75%202.0625C5.71875%202.40625%205.53125%202.59375%205.1875%202.625H2.5625C2.29688%202.625%202.07812%202.71875%201.90625%202.90625C1.71875%203.07812%201.625%203.29688%201.625%203.5625V9.9375C1.625%2010.2031%201.71875%2010.4219%201.90625%2010.5938C2.07812%2010.7812%202.29688%2010.875%202.5625%2010.875H8.9375C9.20312%2010.875%209.42188%2010.7812%209.59375%2010.5938C9.78125%2010.4219%209.875%2010.2031%209.875%209.9375V7.3125C9.90625%206.96875%2010.0938%206.78125%2010.4375%206.75C10.7812%206.78125%2010.9688%206.96875%2011%207.3125V9.9375C10.9844%2010.5156%2010.7812%2011%2010.3906%2011.3906C10%2011.7812%209.51562%2011.9844%208.9375%2012H2.5625C1.98438%2011.9844%201.5%2011.7812%201.10938%2011.3906C0.71875%2011%200.515625%2010.5156%200.5%209.9375V3.5625C0.515625%202.98437%200.71875%202.5%201.10938%202.10938C1.5%201.71875%201.98438%201.51563%202.5625%201.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                {...onClickEdit}
              />
            ) : null}
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "cursor-pointer")}
                id="drop"
                value="%3Csvg%20width%3D%2219%22%20height%3D%2220%22%20viewbox%3D%220%200%2019%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.75%22%20width%3D%2218.5%22%20height%3D%2218.5%22%20rx%3D%223.75%22%20fill%3D%22%23F8F9F9%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.75%22%20width%3D%2218.5%22%20height%3D%2218.5%22%20rx%3D%223.75%22%20stroke%3D%22%23E9EBED%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M9.10156%2013.3984L4.60156%208.89844C4.38281%208.63281%204.38281%208.36719%204.60156%208.10156C4.86719%207.88281%205.13281%207.88281%205.39844%208.10156L9.5%2012.2031L13.6016%208.10156C13.8672%207.88281%2014.1328%207.88281%2014.3984%208.10156C14.6172%208.36719%2014.6172%208.63281%2014.3984%208.89844L9.89844%2013.3984C9.63281%2013.6172%209.36719%2013.6172%209.10156%2013.3984Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                {...onClickList}
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cd-table-wrap-aglint")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-707")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-705")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cd-table-aglint-header")}
              tag="div"
            >
              {isHeaderVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-682")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cand-head-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
                    <_Builtin.Block tag="div">{"Candidates"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "experince-head-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Experience History"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isSelectedVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-692")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-693")}
                    tag="div"
                    {...onClickCloseSelected}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.1562%2010.8438L6%206.71875L1.875%2010.8438C1.625%2011.0312%201.38542%2011.0312%201.15625%2010.8438C0.96875%2010.6146%200.96875%2010.3854%201.15625%2010.1562L5.28125%206L1.15625%201.875C0.96875%201.625%200.96875%201.38542%201.15625%201.15625C1.38542%200.96875%201.625%200.96875%201.875%201.15625L6%205.28125L10.1562%201.15625C10.3854%200.96875%2010.6146%200.96875%2010.8438%201.15625C11.0312%201.38542%2011.0312%201.625%2010.8438%201.875L6.71875%206L10.8438%2010.1562C11.0312%2010.3854%2011.0312%2010.6146%2010.8438%2010.8438C10.6146%2011.0312%2010.3854%2011.0312%2010.1562%2010.8438Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-blue-800")}
                    tag="div"
                  >
                    {textNoCandidateSelected}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{slotSavetoList}</_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "div-block-694",
                      "cursor-pointer",
                      "hide"
                    )}
                    tag="div"
                    {...onClickBookmark}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25098%204.0625C5.2692%203.69792%205.39681%203.38802%205.63379%203.13281C5.889%202.89583%206.19889%202.76823%206.56348%202.75H14.4385C14.8031%202.76823%2015.113%202.89583%2015.3682%203.13281C15.6051%203.38802%2015.7327%203.69792%2015.751%204.0625V16.1484C15.7145%2016.513%2015.514%2016.7135%2015.1494%2016.75C15.0218%2016.75%2014.9124%2016.7135%2014.8213%2016.6406L10.501%2013.7695L6.18066%2016.6406C6.08952%2016.7135%205.98014%2016.75%205.85254%2016.75C5.48795%2016.7135%205.28743%2016.513%205.25098%2016.1484V4.0625ZM6.56348%203.625C6.29004%203.64323%206.1442%203.78906%206.12598%204.0625V15.6289L10.2549%2012.8945C10.4189%2012.7852%2010.583%2012.7852%2010.7471%2012.8945L14.876%2015.6289V4.0625C14.8577%203.78906%2014.7119%203.64323%2014.4385%203.625H6.56348Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-blue-500")}
                      tag="div"
                    >
                      {"Bookmark Selected"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "save-list-wrap-cd",
                      "pink-btn",
                      "cursor-pointer"
                    )}
                    tag="div"
                    {...onClickEmailOutReach}
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-block-30")}
                      tag="div"
                    >
                      {"Email outreach"}
                    </_Builtin.Block>
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%229%22%20height%3D%228%22%20viewbox%3D%220%200%209%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.875%200.25C8.10938%200.265625%208.23438%200.390625%208.25%200.625V5.875C8.23438%206.10938%208.10938%206.23438%207.875%206.25C7.64062%206.23438%207.51562%206.10938%207.5%205.875V1.53906L1.38281%207.63281C1.21094%207.78906%201.03906%207.78906%200.867188%207.63281C0.710938%207.46094%200.710938%207.28906%200.867188%207.11719L6.96094%201H2.625C2.39062%200.984375%202.26562%200.859375%202.25%200.625C2.26562%200.390625%202.39062%200.265625%202.625%200.25H7.875Z%22%20fill%3D%22%23A81897%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-691")}
              tag="div"
            >
              {slotCdTableAglint ?? <CdTableAglint />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "side-slot-emial")}
          tag="div"
        >
          {slotEmailOut}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
