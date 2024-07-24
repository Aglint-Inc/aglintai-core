"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonSoft } from "./ButtonSoft";
import { CandidateHistoryCard } from "./CandidateHistoryCard";
import * as _utils from "./utils";
import _styles from "./SearchAglintCd.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SearchAglintCd({
  as: _Component = _Builtin.Block,
  isSearchEmpty = true,
  isSearchDbVisible = true,
  isSearchInAglintVisible = true,
  isSearchInAllVisible = false,
  slotInputSearch,
  isSearchByJdVisible = true,
  onClickSearchJobDescription = {},
  isSearchJdVisible = true,
  isEmpty = false,
  slotEmptyLottie,
  isSavedListVisible = true,
  slotSavedList,
  isSavedListEmpty = false,
  isInputVisible = true,
  slotInput,
  onClickSubmit = {},
  onClickClose = {},
  onClickCreateNewList = {},
  slotCandidateHistoryCard,
  slotSearchButton,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "sac-wrap")} tag="div">
      {isSearchEmpty ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sac-left-wrap")}
          tag="div"
        >
          {isSearchDbVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "search-left-wrap-candidate")}
              tag="div"
            >
              {isSearchInAglintVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "sac-left-header")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "db-req-icon-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "relative")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2220%22%20height%3D%2222%22%20viewbox%3D%220%200%2020%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.877%203.90625C17.877%203.8789%2017.7949%203.7832%2017.6309%203.61914C17.3301%203.37305%2016.8105%203.11328%2016.0723%202.83984C14.5137%202.26562%2012.4902%201.96484%2010.002%201.9375C7.51367%201.96484%205.49023%202.26562%203.93164%202.83984C3.19336%203.11328%202.67383%203.37305%202.37305%203.61914C2.20898%203.7832%202.12695%203.8789%202.12695%203.90625V8.08984C2.72851%208.52734%203.67187%208.91016%204.95703%209.23828C6.40625%209.62109%208.08789%209.8125%2010.002%209.8125C11.916%209.8125%2013.5977%209.62109%2015.0469%209.23828C16.332%208.91016%2017.2754%208.52734%2017.877%208.08984V3.90625ZM17.877%209.64844C17.166%2010.0039%2016.332%2010.3047%2015.375%2010.5508C13.7891%2010.9336%2011.998%2011.125%2010.002%2011.125C8.00586%2011.125%206.21484%2010.9199%204.62891%2010.5098C3.67187%2010.291%202.83789%2010.0039%202.12695%209.64844V13.3398C2.72851%2013.8047%203.67187%2014.1875%204.95703%2014.4883C6.40625%2014.8711%208.08789%2015.0625%2010.002%2015.0625C11.916%2015.0625%2013.5977%2014.8711%2015.0469%2014.4883C16.332%2014.1602%2017.2754%2013.7773%2017.877%2013.3398V9.64844ZM2.12695%2018.3437C2.12695%2018.3711%202.20898%2018.4668%202.37305%2018.6309C2.67383%2018.877%203.19336%2019.1367%203.93164%2019.4102C5.49023%2019.9844%207.51367%2020.2852%2010.002%2020.3125C12.4902%2020.2852%2014.5137%2019.9844%2016.0723%2019.4102C16.8105%2019.1367%2017.3301%2018.877%2017.6309%2018.6309C17.7949%2018.4668%2017.877%2018.3711%2017.877%2018.3437V14.8984C17.166%2015.2539%2016.332%2015.5547%2015.375%2015.8008C13.7891%2016.1836%2011.998%2016.375%2010.002%2016.375C8.00586%2016.375%206.21484%2016.1836%204.62891%2015.8008C3.67187%2015.5547%202.83789%2015.2539%202.12695%2014.8984V18.3437ZM2.12695%203.94726C2.12695%203.91992%202.12695%203.91992%202.12695%203.94726V3.94726ZM19.1895%2018.3437C19.1348%2019.2734%2018.2324%2020.0527%2016.4824%2020.6816C14.7598%2021.2832%2012.5996%2021.5977%2010.002%2021.625C7.4043%2021.5977%205.24414%2021.2832%203.52148%2020.6816C1.77148%2020.0527%200.86914%2019.2734%200.814452%2018.3437V3.90625C0.86914%202.97656%201.77148%202.19726%203.52148%201.56836C5.24414%200.966795%207.4043%200.652342%2010.002%200.624998C12.5996%200.652342%2014.7598%200.966795%2016.4824%201.56836C18.2324%202.19726%2019.1348%202.97656%2019.1895%203.90625V18.3437Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons", "db-star-icons")}
                        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewbox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.63477%204.66871C6.73685%204.44371%206.28685%204.33329%205.97643%204.02288C5.66602%203.71038%205.5556%203.26246%205.3306%202.36454L4.99935%201.04163L4.6681%202.36454C4.4431%203.26246%204.33268%203.71246%204.02227%204.02288C3.70977%204.33329%203.26185%204.44371%202.36393%204.66871L1.04102%204.99996L2.36393%205.33121C3.26185%205.55621%203.71185%205.66663%204.02227%205.97704C4.33268%206.28954%204.4431%206.73746%204.6681%207.63538L4.99935%208.95829L5.3306%207.63538C5.5556%206.73746%205.66602%206.28746%205.97643%205.97704C6.28893%205.66663%206.73685%205.55621%207.63477%205.33121L8.95768%204.99996L7.63477%204.66871Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "db-req-text-wrap")}
                    tag="div"
                  >
                    <Text weight="medium" content="Discover Talent" />
                    <Text
                      content="Find, connect, and engage with potential candidates efficiently"
                      color="neutral"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isSearchInAllVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "sac-left-header")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "candidate-all-icon-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "relative")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2220%22%20height%3D%2222%22%20viewbox%3D%220%200%2020%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.877%203.90625C17.877%203.8789%2017.7949%203.7832%2017.6309%203.61914C17.3301%203.37305%2016.8105%203.11328%2016.0723%202.83984C14.5137%202.26562%2012.4902%201.96484%2010.002%201.9375C7.51367%201.96484%205.49023%202.26562%203.93164%202.83984C3.19336%203.11328%202.67383%203.37305%202.37305%203.61914C2.20898%203.7832%202.12695%203.8789%202.12695%203.90625V8.08984C2.72851%208.52734%203.67187%208.91016%204.95703%209.23828C6.40625%209.62109%208.08789%209.8125%2010.002%209.8125C11.916%209.8125%2013.5977%209.62109%2015.0469%209.23828C16.332%208.91016%2017.2754%208.52734%2017.877%208.08984V3.90625ZM17.877%209.64844C17.166%2010.0039%2016.332%2010.3047%2015.375%2010.5508C13.7891%2010.9336%2011.998%2011.125%2010.002%2011.125C8.00586%2011.125%206.21484%2010.9199%204.62891%2010.5098C3.67187%2010.291%202.83789%2010.0039%202.12695%209.64844V13.3398C2.72851%2013.8047%203.67187%2014.1875%204.95703%2014.4883C6.40625%2014.8711%208.08789%2015.0625%2010.002%2015.0625C11.916%2015.0625%2013.5977%2014.8711%2015.0469%2014.4883C16.332%2014.1602%2017.2754%2013.7773%2017.877%2013.3398V9.64844ZM2.12695%2018.3437C2.12695%2018.3711%202.20898%2018.4668%202.37305%2018.6309C2.67383%2018.877%203.19336%2019.1367%203.93164%2019.4102C5.49023%2019.9844%207.51367%2020.2852%2010.002%2020.3125C12.4902%2020.2852%2014.5137%2019.9844%2016.0723%2019.4102C16.8105%2019.1367%2017.3301%2018.877%2017.6309%2018.6309C17.7949%2018.4668%2017.877%2018.3711%2017.877%2018.3437V14.8984C17.166%2015.2539%2016.332%2015.5547%2015.375%2015.8008C13.7891%2016.1836%2011.998%2016.375%2010.002%2016.375C8.00586%2016.375%206.21484%2016.1836%204.62891%2015.8008C3.67187%2015.5547%202.83789%2015.2539%202.12695%2014.8984V18.3437ZM2.12695%203.94726C2.12695%203.91992%202.12695%203.91992%202.12695%203.94726V3.94726ZM19.1895%2018.3437C19.1348%2019.2734%2018.2324%2020.0527%2016.4824%2020.6816C14.7598%2021.2832%2012.5996%2021.5977%2010.002%2021.625C7.4043%2021.5977%205.24414%2021.2832%203.52148%2020.6816C1.77148%2020.0527%200.86914%2019.2734%200.814452%2018.3437V3.90625C0.86914%202.97656%201.77148%202.19726%203.52148%201.56836C5.24414%200.966795%207.4043%200.652342%2010.002%200.624998C12.5996%200.652342%2014.7598%200.966795%2016.4824%201.56836C18.2324%202.19726%2019.1348%202.97656%2019.1895%203.90625V18.3437Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "db-req-text-wrap")}
                    tag="div"
                  >
                    <Text content="Talent Rediscovery" weight="medium" />
                    <Text
                      content="Reconnect with previous applicants using smart technology"
                      weight=""
                      color="neutral"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "search-candidate-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "input-search-candidate")}
                  tag="div"
                >
                  {slotInputSearch}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {slotSearchButton ?? <SlotComp componentName="ButtonSolid" />}
                </_Builtin.Block>
              </_Builtin.Block>
              {isSearchByJdVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "search-job-desc-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "search-job-desc")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "search-job-text")}
                      tag="div"
                    >
                      <Text content="OR" size="2" color="neutral" />
                      <Text content="Search candidates by uploading the job description" />
                    </_Builtin.Block>
                    <Text
                      content="Discover potential candidates by simply uploading the job description. Effortlessly find the right matches for your requirements through this streamlined process."
                      size="2"
                      color="neutral"
                    />
                  </_Builtin.Block>
                  {isSearchJdVisible ? (
                    <_Builtin.Block tag="div" {...onClickSearchJobDescription}>
                      <ButtonSoft
                        size="1"
                        textButton="Search with job description"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          ) : null}
          {isEmpty ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "sac-empty-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sac-empty")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sac-empty-lottie")}
                  tag="div"
                >
                  {slotEmptyLottie}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "sac-empty-desc-wrap")}
                  tag="div"
                >
                  <Text content="Candidate list is empty" weight="bold" />
                  <Text
                    content="Candidates who applied to your job will be part of this search"
                    color="neutral"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isSavedListVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cd-saved-list")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cd-save-list-header")}
                tag="div"
              >
                <Text weight="medium" content="Saved Lists" />
                <_Builtin.Block tag="div">
                  <ButtonSoft
                    onClickButton={onClickCreateNewList}
                    size="1"
                    textButton="Create new list"
                    isLeftIcon={true}
                    iconName="add"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "save-list-item-wrap")}
                  tag="div"
                >
                  {isInputVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "save-list-input")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "save-list-input-left")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.5%205.5H4.5V4.5H3.5V5.5ZM2.5%204.25C2.54167%203.79167%202.79167%203.54167%203.25%203.5H4.75C5.20833%203.54167%205.45833%203.79167%205.5%204.25V5.75C5.45833%206.20833%205.20833%206.45833%204.75%206.5H3.25C2.79167%206.45833%202.54167%206.20833%202.5%205.75V4.25ZM7.5%204.5H17.5C17.8125%204.52083%2017.9792%204.6875%2018%205C17.9792%205.3125%2017.8125%205.47917%2017.5%205.5H7.5C7.1875%205.47917%207.02083%205.3125%207%205C7.02083%204.6875%207.1875%204.52083%207.5%204.5ZM7.5%209.5H17.5C17.8125%209.52083%2017.9792%209.6875%2018%2010C17.9792%2010.3125%2017.8125%2010.4792%2017.5%2010.5H7.5C7.1875%2010.4792%207.02083%2010.3125%207%2010C7.02083%209.6875%207.1875%209.52083%207.5%209.5ZM7.5%2014.5H17.5C17.8125%2014.5208%2017.9792%2014.6875%2018%2015C17.9792%2015.3125%2017.8125%2015.4792%2017.5%2015.5H7.5C7.1875%2015.4792%207.02083%2015.3125%207%2015C7.02083%2014.6875%207.1875%2014.5208%207.5%2014.5ZM3.5%209.5V10.5H4.5V9.5H3.5ZM3.25%208.5H4.75C5.20833%208.54167%205.45833%208.79167%205.5%209.25V10.75C5.45833%2011.2083%205.20833%2011.4583%204.75%2011.5H3.25C2.79167%2011.4583%202.54167%2011.2083%202.5%2010.75V9.25C2.54167%208.79167%202.79167%208.54167%203.25%208.5ZM3.5%2015.5H4.5V14.5H3.5V15.5ZM2.5%2014.25C2.54167%2013.7917%202.79167%2013.5417%203.25%2013.5H4.75C5.20833%2013.5417%205.45833%2013.7917%205.5%2014.25V15.75C5.45833%2016.2083%205.20833%2016.4583%204.75%2016.5H3.25C2.79167%2016.4583%202.54167%2016.2083%202.5%2015.75V14.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "slot-save-list-input")}
                          tag="div"
                        >
                          {slotInput}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "save-list-input-right")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "icons",
                            "curser-hover-pointer"
                          )}
                          value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20fill%3D%22%23EDF8F4%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20stroke%3D%22%23D1E8DF%22%2F%3E%0A%3Cpath%20d%3D%22M26.7812%2015.2188C27.0729%2015.5729%2027.0729%2015.9271%2026.7812%2016.2812L18.5312%2024.5312C18.1771%2024.8229%2017.8229%2024.8229%2017.4688%2024.5312L13.2188%2020.2812C12.9271%2019.9271%2012.9271%2019.5729%2013.2188%2019.2188C13.5729%2018.9271%2013.9271%2018.9271%2014.2812%2019.2188L18%2022.9375L25.7188%2015.2188C26.0729%2014.9271%2026.4271%2014.9271%2026.7812%2015.2188Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                          {...onClickSubmit}
                        />
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "icons",
                            "curser-hover-pointer"
                          )}
                          value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20fill%3D%22%23FFF0F1%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2239%22%20height%3D%2239%22%20rx%3D%223.5%22%20stroke%3D%22%23F5D5D8%22%2F%3E%0A%3Cpath%20d%3D%22M24.7812%2016.2812L21.0625%2020L24.7812%2023.7188C25.0729%2024.0729%2025.0729%2024.4271%2024.7812%2024.7812C24.4271%2025.0729%2024.0729%2025.0729%2023.7188%2024.7812L20%2021.0625L16.2812%2024.7812C15.9271%2025.0729%2015.5729%2025.0729%2015.2188%2024.7812C14.9271%2024.4271%2014.9271%2024.0729%2015.2188%2023.7188L18.9375%2020L15.2188%2016.2812C14.9271%2015.9271%2014.9271%2015.5729%2015.2188%2015.2188C15.5729%2014.9271%2015.9271%2014.9271%2016.2812%2015.2188L20%2018.9375L23.7188%2015.2188C24.0729%2014.9271%2024.4271%2014.9271%2024.7812%2015.2188C25.0729%2015.5729%2025.0729%2015.9271%2024.7812%2016.2812Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                          {...onClickClose}
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                  <_Builtin.Block
                    className={_utils.cx(_styles, "save-list-slot-item")}
                    tag="div"
                  >
                    {slotSavedList ?? (
                      <>
                        <SlotComp componentName="SavedList" />
                        <SlotComp componentName="SavedList" />
                      </>
                    )}
                  </_Builtin.Block>
                </_Builtin.Block>
                {isSavedListEmpty ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "empty-saved-list")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "empty-save-list-wrap")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewbox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.875%205.25H7.125C7.8125%205.3125%208.1875%205.6875%208.25%206.375V8.625C8.1875%209.3125%207.8125%209.6875%207.125%209.75H4.875C4.1875%209.6875%203.8125%209.3125%203.75%208.625V6.375C3.8125%205.6875%204.1875%205.3125%204.875%205.25ZM11.625%206.375H25.875C26.5625%206.4375%2026.9375%206.8125%2027%207.5C26.9375%208.1875%2026.5625%208.5625%2025.875%208.625H11.625C10.9375%208.5625%2010.5625%208.1875%2010.5%207.5C10.5625%206.8125%2010.9375%206.4375%2011.625%206.375ZM11.625%2013.875H25.875C26.5625%2013.9375%2026.9375%2014.3125%2027%2015C26.9375%2015.6875%2026.5625%2016.0625%2025.875%2016.125H11.625C10.9375%2016.0625%2010.5625%2015.6875%2010.5%2015C10.5625%2014.3125%2010.9375%2013.9375%2011.625%2013.875ZM11.625%2021.375H25.875C26.5625%2021.4375%2026.9375%2021.8125%2027%2022.5C26.9375%2023.1875%2026.5625%2023.5625%2025.875%2023.625H11.625C10.9375%2023.5625%2010.5625%2023.1875%2010.5%2022.5C10.5625%2021.8125%2010.9375%2021.4375%2011.625%2021.375ZM3.75%2013.875C3.8125%2013.1875%204.1875%2012.8125%204.875%2012.75H7.125C7.8125%2012.8125%208.1875%2013.1875%208.25%2013.875V16.125C8.1875%2016.8125%207.8125%2017.1875%207.125%2017.25H4.875C4.1875%2017.1875%203.8125%2016.8125%203.75%2016.125V13.875ZM4.875%2020.25H7.125C7.8125%2020.3125%208.1875%2020.6875%208.25%2021.375V23.625C8.1875%2024.3125%207.8125%2024.6875%207.125%2024.75H4.875C4.1875%2024.6875%203.8125%2024.3125%203.75%2023.625V21.375C3.8125%2020.6875%204.1875%2020.3125%204.875%2020.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <Text content="You dont have any saved list." />
                      <Text
                        content="Click the button to create a new list."
                        color="neutral"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isSearchEmpty ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sac-right-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "history-wrap-candidate")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.37695%204.35937C1.99674%203.26562%202.83529%202.39062%203.89258%201.73437C4.9681%201.09635%206.17122%200.768228%207.50195%200.749999C8.81445%200.768228%209.99023%201.08724%2011.0293%201.70703C12.0866%202.32682%2012.9251%203.16536%2013.5449%204.22266C14.1647%205.26172%2014.4837%206.4375%2014.502%207.75C14.4837%209.0625%2014.1647%2010.2383%2013.5449%2011.2773C12.9251%2012.3346%2012.0866%2013.1732%2011.0293%2013.793C9.99023%2014.4128%208.81445%2014.7318%207.50195%2014.75C6.35352%2014.7318%205.29622%2014.4766%204.33008%2013.9844C3.36393%2013.4922%202.55273%2012.8177%201.89648%2011.9609C1.76888%2011.724%201.79622%2011.5143%201.97852%2011.332C2.21549%2011.2044%202.42513%2011.2318%202.60742%2011.4141C3.17253%2012.1797%203.87435%2012.7812%204.71289%2013.2188C5.56966%2013.6563%206.49935%2013.875%207.50195%2013.875C8.65039%2013.8568%209.68034%2013.5742%2010.5918%2013.0273C11.5215%2012.4987%2012.2507%2011.7695%2012.7793%2010.8398C13.3262%209.92839%2013.6087%208.89844%2013.627%207.75C13.6087%206.60156%2013.3262%205.57161%2012.7793%204.66016C12.2507%203.73047%2011.5215%203.0013%2010.5918%202.47266C9.68034%201.92578%208.65039%201.64323%207.50195%201.625C6.26237%201.64323%205.15951%201.97135%204.19336%202.60937C3.20898%203.22917%202.4707%204.06771%201.97852%205.125H4.43945C4.71289%205.14323%204.85872%205.28906%204.87695%205.5625C4.85872%205.83594%204.71289%205.98177%204.43945%206H0.939453C0.666015%205.98177%200.520182%205.83594%200.501953%205.5625V2.0625C0.520182%201.78906%200.666015%201.64323%200.939453%201.625C1.21289%201.64323%201.35872%201.78906%201.37695%202.0625V4.35937ZM7.50195%204.25C7.77539%204.26823%207.92122%204.41406%207.93945%204.6875V7.55859L9.99023%209.63672C10.1725%209.83724%2010.1725%2010.0378%209.99023%2010.2383C9.78971%2010.4206%209.58919%2010.4206%209.38867%2010.2383L7.20117%208.05078C7.11003%207.97786%207.06445%207.8776%207.06445%207.75V4.6875C7.08268%204.41406%207.22852%204.26823%207.50195%204.25Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text weight="medium" content="Search History" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-candidate-history-card")}
              tag="div"
            >
              {slotCandidateHistoryCard ?? (
                <>
                  <SlotComp componentName="CandidateHistoryCard" />
                  <CandidateHistoryCard />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
