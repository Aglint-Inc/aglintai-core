import React from "react";
import * as _Builtin from "./_Builtin";
import { SavedList } from "./SavedList";
import { CandidateHistoryCard } from "./CandidateHistoryCard";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseSearch.module.css";

export function CandidateDatabaseSearch({
  as: _Component = _Builtin.Block,
  onClickAllCandidate = {},
  onClickDbRequest = {},
  onClickSearchJobDescription = {},
  slotInputSearch,
  isClearHistoryVisible = true,
  onClickClearHistory = {},
  slotCandidateHistoryCard,
  onClickSearch = {},
  slotLottieSearch,
  isSearchInAglintVisible = true,
  isSearchInAllVisible = false,
  slotNavSublink,
  isSearchJdVisible = true,
  isSearchByJdVisible = true,
  isSavedListVisible = true,
  slotSavedList,
  slotInput,
  onClickSubmit = {},
  onClickClose = {},
  onClickCreateNewList = {},
  isSavedListEmpty = false,
  isInputVisible = true,
  isViewAllCandidateVisible = false,
  onClickViewAllCandidate = {},
  isSearchDbVisible = true,
  isEmpty = false,
  slotEmptyLottie,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "search-wrap-candidate")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "job-header-empty", "beta-flex")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Candidate Database"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-empty-landing-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-layout-sublink")}
          tag="div"
        >
          {slotNavSublink}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-697")}
          tag="div"
        >
          {isSearchDbVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "search-left-wrap-candidate")}
              tag="div"
            >
              {isSearchInAglintVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "db--request")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-747")}
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
                          value="%3Csvg%20width%3D%2220%22%20height%3D%2222%22%20viewBox%3D%220%200%2020%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.877%203.90625C17.877%203.8789%2017.7949%203.7832%2017.6309%203.61914C17.3301%203.37305%2016.8105%203.11328%2016.0723%202.83984C14.5137%202.26562%2012.4902%201.96484%2010.002%201.9375C7.51367%201.96484%205.49023%202.26562%203.93164%202.83984C3.19336%203.11328%202.67383%203.37305%202.37305%203.61914C2.20898%203.7832%202.12695%203.8789%202.12695%203.90625V8.08984C2.72851%208.52734%203.67187%208.91016%204.95703%209.23828C6.40625%209.62109%208.08789%209.8125%2010.002%209.8125C11.916%209.8125%2013.5977%209.62109%2015.0469%209.23828C16.332%208.91016%2017.2754%208.52734%2017.877%208.08984V3.90625ZM17.877%209.64844C17.166%2010.0039%2016.332%2010.3047%2015.375%2010.5508C13.7891%2010.9336%2011.998%2011.125%2010.002%2011.125C8.00586%2011.125%206.21484%2010.9199%204.62891%2010.5098C3.67187%2010.291%202.83789%2010.0039%202.12695%209.64844V13.3398C2.72851%2013.8047%203.67187%2014.1875%204.95703%2014.4883C6.40625%2014.8711%208.08789%2015.0625%2010.002%2015.0625C11.916%2015.0625%2013.5977%2014.8711%2015.0469%2014.4883C16.332%2014.1602%2017.2754%2013.7773%2017.877%2013.3398V9.64844ZM2.12695%2018.3437C2.12695%2018.3711%202.20898%2018.4668%202.37305%2018.6309C2.67383%2018.877%203.19336%2019.1367%203.93164%2019.4102C5.49023%2019.9844%207.51367%2020.2852%2010.002%2020.3125C12.4902%2020.2852%2014.5137%2019.9844%2016.0723%2019.4102C16.8105%2019.1367%2017.3301%2018.877%2017.6309%2018.6309C17.7949%2018.4668%2017.877%2018.3711%2017.877%2018.3437V14.8984C17.166%2015.2539%2016.332%2015.5547%2015.375%2015.8008C13.7891%2016.1836%2011.998%2016.375%2010.002%2016.375C8.00586%2016.375%206.21484%2016.1836%204.62891%2015.8008C3.67187%2015.5547%202.83789%2015.2539%202.12695%2014.8984V18.3437ZM2.12695%203.94726C2.12695%203.91992%202.12695%203.91992%202.12695%203.94726V3.94726ZM19.1895%2018.3437C19.1348%2019.2734%2018.2324%2020.0527%2016.4824%2020.6816C14.7598%2021.2832%2012.5996%2021.5977%2010.002%2021.625C7.4043%2021.5977%205.24414%2021.2832%203.52148%2020.6816C1.77148%2020.0527%200.86914%2019.2734%200.814452%2018.3437V3.90625C0.86914%202.97656%201.77148%202.19726%203.52148%201.56836C5.24414%200.966795%207.4043%200.652342%2010.002%200.624998C12.5996%200.652342%2014.7598%200.966795%2016.4824%201.56836C18.2324%202.19726%2019.1348%202.97656%2019.1895%203.90625V18.3437Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(
                            _styles,
                            "icons",
                            "db-star-icons"
                          )}
                          value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.63477%204.66871C6.73685%204.44371%206.28685%204.33329%205.97643%204.02288C5.66602%203.71038%205.5556%203.26246%205.3306%202.36454L4.99935%201.04163L4.6681%202.36454C4.4431%203.26246%204.33268%203.71246%204.02227%204.02288C3.70977%204.33329%203.26185%204.44371%202.36393%204.66871L1.04102%204.99996L2.36393%205.33121C3.26185%205.55621%203.71185%205.66663%204.02227%205.97704C4.33268%206.28954%204.4431%206.73746%204.6681%207.63538L4.99935%208.95829L5.3306%207.63538C5.5556%206.73746%205.66602%206.28746%205.97643%205.97704C6.28893%205.66663%206.73685%205.55621%207.63477%205.33121L8.95768%204.99996L7.63477%204.66871Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "db-req-text-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "fw-semibold")}
                      tag="div"
                    >
                      {"Search in Aglint Db"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "color-grey-600")}
                      tag="div"
                    >
                      {"Search across 400M+ candidates from aglint"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isSearchInAllVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "db--request")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-747")}
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
                          value="%3Csvg%20width%3D%2220%22%20height%3D%2222%22%20viewBox%3D%220%200%2020%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.877%203.90625C17.877%203.8789%2017.7949%203.7832%2017.6309%203.61914C17.3301%203.37305%2016.8105%203.11328%2016.0723%202.83984C14.5137%202.26562%2012.4902%201.96484%2010.002%201.9375C7.51367%201.96484%205.49023%202.26562%203.93164%202.83984C3.19336%203.11328%202.67383%203.37305%202.37305%203.61914C2.20898%203.7832%202.12695%203.8789%202.12695%203.90625V8.08984C2.72851%208.52734%203.67187%208.91016%204.95703%209.23828C6.40625%209.62109%208.08789%209.8125%2010.002%209.8125C11.916%209.8125%2013.5977%209.62109%2015.0469%209.23828C16.332%208.91016%2017.2754%208.52734%2017.877%208.08984V3.90625ZM17.877%209.64844C17.166%2010.0039%2016.332%2010.3047%2015.375%2010.5508C13.7891%2010.9336%2011.998%2011.125%2010.002%2011.125C8.00586%2011.125%206.21484%2010.9199%204.62891%2010.5098C3.67187%2010.291%202.83789%2010.0039%202.12695%209.64844V13.3398C2.72851%2013.8047%203.67187%2014.1875%204.95703%2014.4883C6.40625%2014.8711%208.08789%2015.0625%2010.002%2015.0625C11.916%2015.0625%2013.5977%2014.8711%2015.0469%2014.4883C16.332%2014.1602%2017.2754%2013.7773%2017.877%2013.3398V9.64844ZM2.12695%2018.3437C2.12695%2018.3711%202.20898%2018.4668%202.37305%2018.6309C2.67383%2018.877%203.19336%2019.1367%203.93164%2019.4102C5.49023%2019.9844%207.51367%2020.2852%2010.002%2020.3125C12.4902%2020.2852%2014.5137%2019.9844%2016.0723%2019.4102C16.8105%2019.1367%2017.3301%2018.877%2017.6309%2018.6309C17.7949%2018.4668%2017.877%2018.3711%2017.877%2018.3437V14.8984C17.166%2015.2539%2016.332%2015.5547%2015.375%2015.8008C13.7891%2016.1836%2011.998%2016.375%2010.002%2016.375C8.00586%2016.375%206.21484%2016.1836%204.62891%2015.8008C3.67187%2015.5547%202.83789%2015.2539%202.12695%2014.8984V18.3437ZM2.12695%203.94726C2.12695%203.91992%202.12695%203.91992%202.12695%203.94726V3.94726ZM19.1895%2018.3437C19.1348%2019.2734%2018.2324%2020.0527%2016.4824%2020.6816C14.7598%2021.2832%2012.5996%2021.5977%2010.002%2021.625C7.4043%2021.5977%205.24414%2021.2832%203.52148%2020.6816C1.77148%2020.0527%200.86914%2019.2734%200.814452%2018.3437V3.90625C0.86914%202.97656%201.77148%202.19726%203.52148%201.56836C5.24414%200.966795%207.4043%200.652342%2010.002%200.624998C12.5996%200.652342%2014.7598%200.966795%2016.4824%201.56836C18.2324%202.19726%2019.1348%202.97656%2019.1895%203.90625V18.3437Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    {isViewAllCandidateVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "div-block-746",
                          "cursor-pointer"
                        )}
                        tag="div"
                        {...onClickViewAllCandidate}
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-745")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icons")}
                            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.96195%204.84578C4.72637%204.84578%204.53286%204.9215%204.38142%205.07294C4.22998%205.22438%204.15426%205.41789%204.15426%205.65347V7.26885H15.462V5.65347C15.462%205.41789%2015.3862%205.22438%2015.2348%205.07294C15.0833%204.9215%2014.8898%204.84578%2014.6543%204.84578H4.96195ZM4.15426%208.07655V10.9035H9.40426V8.07655H4.15426ZM10.212%208.07655V10.9035H15.462V8.07655H10.212ZM9.40426%2011.7112H4.15426V13.7304C4.15426%2013.966%204.22998%2014.1595%204.38142%2014.3109C4.53286%2014.4624%204.72637%2014.5381%204.96195%2014.5381H9.40426V11.7112ZM10.212%2014.5381H14.6543C14.8898%2014.5381%2015.0833%2014.4624%2015.2348%2014.3109C15.3862%2014.1595%2015.462%2013.966%2015.462%2013.7304V11.7112H10.212V14.5381ZM3.34657%205.65347C3.36339%205.19914%203.52325%204.82054%203.82613%204.51765C4.12902%204.21477%204.50762%204.05491%204.96195%204.03809H14.6543C15.1086%204.05491%2015.4872%204.21477%2015.7901%204.51765C16.093%204.82054%2016.2528%205.19914%2016.2696%205.65347V13.7304C16.2528%2014.1847%2016.093%2014.5633%2015.7901%2014.8662C15.4872%2015.1691%2015.1086%2015.329%2014.6543%2015.3458H4.96195C4.50762%2015.329%204.12902%2015.1691%203.82613%2014.8662C3.52325%2014.5633%203.36339%2014.1847%203.34657%2013.7304V5.65347Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "fw-semibold")}
                          tag="div"
                        >
                          {"View All Candidates"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "db-req-text-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-604")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {
                          "Search in all candidates applied to job that you posted"
                        }
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "search-candidate-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-597")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "input-search-candidate")}
                    tag="div"
                  >
                    {slotInputSearch}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    <_Builtin.Block
                      className={_utils.cx(_styles, "candidate-search-btn")}
                      tag="div"
                      {...onClickSearch}
                    >
                      <_Builtin.Block tag="div">{"Search"}</_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "icons")}
                        tag="div"
                      >
                        {slotLottieSearch}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              {isSearchByJdVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "search-job-desc")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-375")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      <_Builtin.Span
                        className={_utils.cx(_styles, "text-grey-400", "mr-4")}
                      >
                        {"OR"}
                      </_Builtin.Span>
                      {" Search candidates by uploading the job description"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "color-grey-600",
                        "width-588"
                      )}
                      tag="div"
                    >
                      {
                        "Discover potential candidates by simply uploading the job description. Effortlessly find the right matches for your requirements through this streamlined process."
                      }
                    </_Builtin.Block>
                  </_Builtin.Block>
                  {isSearchJdVisible ? (
                    <_Builtin.Block tag="div" {...onClickSearchJobDescription}>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-blue-600",
                          "text-underline",
                          "cursor-pointer"
                        )}
                        tag="div"
                      >
                        {"Search with job description"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          ) : null}
          {isEmpty ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-749")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-751")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-750")}
                  tag="div"
                >
                  {slotEmptyLottie}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-748")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Candidate list is empty"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-600")}
                    tag="div"
                  >
                    {
                      "Candidates who applied to your job will be part of this search"
                    }
                  </_Builtin.Block>
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
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Saved Lists"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "saved-list-menu-cd")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-735", "cd-search")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "div-block-734",
                      "p-10",
                      "cd-search"
                    )}
                    tag="div"
                  >
                    {slotSavedList ?? <SavedList />}
                  </_Builtin.Block>
                  {isSavedListEmpty ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "empty-saved-list")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-grey-600")}
                        tag="div"
                      >
                        {"You dont have any saved list."}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
                {isInputVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-728", "plr-10")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons", "cursor-pointer")}
                      value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewBox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21.0547%206.94531C21.3151%207.23177%2021.3151%207.51823%2021.0547%207.80469L10.4297%2018.4297C10.1432%2018.6901%209.85677%2018.6901%209.57031%2018.4297L3.94531%2012.8047C3.6849%2012.5182%203.6849%2012.2318%203.94531%2011.9453C4.23177%2011.6849%204.51823%2011.6849%204.80469%2011.9453L10%2017.1016L20.1953%206.94531C20.4818%206.6849%2020.7682%206.6849%2021.0547%206.94531Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                      {...onClickSubmit}
                    />
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons", "cursor-pointer")}
                      value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewBox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.6953%2019.0547L12.5%2013.8984L7.34375%2019.0547C7.03125%2019.2891%206.73177%2019.2891%206.44531%2019.0547C6.21094%2018.7682%206.21094%2018.4818%206.44531%2018.1953L11.6016%2013L6.44531%207.84375C6.21094%207.53125%206.21094%207.23177%206.44531%206.94531C6.73177%206.71094%207.03125%206.71094%207.34375%206.94531L12.5%2012.1016L17.6953%206.94531C17.9818%206.71094%2018.2682%206.71094%2018.5547%206.94531C18.7891%207.23177%2018.7891%207.53125%2018.5547%207.84375L13.3984%2013L18.5547%2018.1953C18.7891%2018.4818%2018.7891%2018.7682%2018.5547%2019.0547C18.2682%2019.2891%2017.9818%2019.2891%2017.6953%2019.0547Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                      {...onClickClose}
                    />
                  </_Builtin.Block>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "relative", "mt-10")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "div-block-729",
                      "cursor-pointer",
                      "pl-10"
                    )}
                    tag="div"
                    {...onClickCreateNewList}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5625%201.6875V5.4375H10.3125C10.6562%205.46875%2010.8438%205.65625%2010.875%206C10.8438%206.34375%2010.6562%206.53125%2010.3125%206.5625H6.5625V10.3125C6.53125%2010.6562%206.34375%2010.8438%206%2010.875C5.65625%2010.8438%205.46875%2010.6562%205.4375%2010.3125V6.5625H1.6875C1.34375%206.53125%201.15625%206.34375%201.125%206C1.15625%205.65625%201.34375%205.46875%201.6875%205.4375H5.4375V1.6875C5.46875%201.34375%205.65625%201.15625%206%201.125C6.34375%201.15625%206.53125%201.34375%206.5625%201.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-blue-500")}
                      tag="div"
                    >
                      {"Create new list"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "db-rquest-wrap", "left-border")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sticky-top-90", "gap-20")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "all-search-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "search-history-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "history-wrap-candidate")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewBox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.37695%204.35937C1.99674%203.26562%202.83529%202.39062%203.89258%201.73437C4.9681%201.09635%206.17122%200.768228%207.50195%200.749999C8.81445%200.768228%209.99023%201.08724%2011.0293%201.70703C12.0866%202.32682%2012.9251%203.16536%2013.5449%204.22266C14.1647%205.26172%2014.4837%206.4375%2014.502%207.75C14.4837%209.0625%2014.1647%2010.2383%2013.5449%2011.2773C12.9251%2012.3346%2012.0866%2013.1732%2011.0293%2013.793C9.99023%2014.4128%208.81445%2014.7318%207.50195%2014.75C6.35352%2014.7318%205.29622%2014.4766%204.33008%2013.9844C3.36393%2013.4922%202.55273%2012.8177%201.89648%2011.9609C1.76888%2011.724%201.79622%2011.5143%201.97852%2011.332C2.21549%2011.2044%202.42513%2011.2318%202.60742%2011.4141C3.17253%2012.1797%203.87435%2012.7812%204.71289%2013.2188C5.56966%2013.6563%206.49935%2013.875%207.50195%2013.875C8.65039%2013.8568%209.68034%2013.5742%2010.5918%2013.0273C11.5215%2012.4987%2012.2507%2011.7695%2012.7793%2010.8398C13.3262%209.92839%2013.6087%208.89844%2013.627%207.75C13.6087%206.60156%2013.3262%205.57161%2012.7793%204.66016C12.2507%203.73047%2011.5215%203.0013%2010.5918%202.47266C9.68034%201.92578%208.65039%201.64323%207.50195%201.625C6.26237%201.64323%205.15951%201.97135%204.19336%202.60937C3.20898%203.22917%202.4707%204.06771%201.97852%205.125H4.43945C4.71289%205.14323%204.85872%205.28906%204.87695%205.5625C4.85872%205.83594%204.71289%205.98177%204.43945%206H0.939453C0.666015%205.98177%200.520182%205.83594%200.501953%205.5625V2.0625C0.520182%201.78906%200.666015%201.64323%200.939453%201.625C1.21289%201.64323%201.35872%201.78906%201.37695%202.0625V4.35937ZM7.50195%204.25C7.77539%204.26823%207.92122%204.41406%207.93945%204.6875V7.55859L9.99023%209.63672C10.1725%209.83724%2010.1725%2010.0378%209.99023%2010.2383C9.78971%2010.4206%209.58919%2010.4206%209.38867%2010.2383L7.20117%208.05078C7.11003%207.97786%207.06445%207.8776%207.06445%207.75V4.6875C7.08268%204.41406%207.22852%204.26823%207.50195%204.25Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Search History"}
                  </_Builtin.Block>
                </_Builtin.Block>
                {isClearHistoryVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "history-wrap-candidate",
                      "cursor-pointer",
                      "hide"
                    )}
                    tag="div"
                    {...onClickClearHistory}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2216%22%20viewBox%3D%220%200%2020%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.125%201.25L4.65625%202H8.34375L7.875%201.25C7.77083%201.08333%207.625%201%207.4375%201H5.5625C5.375%201%205.22917%201.08333%205.125%201.25ZM8.71875%200.71875L9.53125%202H11H12H12.5C12.8125%202.02083%2012.9792%202.1875%2013%202.5C12.9792%202.8125%2012.8125%202.97917%2012.5%203H11.9375L11.125%2014.1562C11.0833%2014.6771%2010.875%2015.1146%2010.5%2015.4688C10.125%2015.8021%209.66667%2015.9792%209.125%2016H3.875C3.33333%2015.9792%202.875%2015.8021%202.5%2015.4688C2.125%2015.1146%201.91667%2014.6771%201.875%2014.1562L1.0625%203H0.5C0.1875%202.97917%200.0208333%202.8125%200%202.5C0.0208333%202.1875%200.1875%202.02083%200.5%202H1H2H3.46875L4.28125%200.71875C4.59375%200.260417%205.02083%200.0208333%205.5625%200H7.4375C7.97917%200.0208333%208.40625%200.260417%208.71875%200.71875ZM2.0625%203L2.875%2014.0625C2.89583%2014.3333%203%2014.5521%203.1875%2014.7188C3.375%2014.9062%203.60417%2015%203.875%2015H9.125C9.39583%2015%209.625%2014.9062%209.8125%2014.7188C10%2014.5521%2010.1042%2014.3333%2010.125%2014.0625L10.9375%203H2.0625ZM14.5%204H19.5C19.8125%204.02083%2019.9792%204.1875%2020%204.5C19.9792%204.8125%2019.8125%204.97917%2019.5%205H14.5C14.1875%204.97917%2014.0208%204.8125%2014%204.5C14.0208%204.1875%2014.1875%204.02083%2014.5%204ZM14.5%208H18.5C18.8125%208.02083%2018.9792%208.1875%2019%208.5C18.9792%208.8125%2018.8125%208.97917%2018.5%209H14.5C14.1875%208.97917%2014.0208%208.8125%2014%208.5C14.0208%208.1875%2014.1875%208.02083%2014.5%208ZM14%2012.5C14.0208%2012.1875%2014.1875%2012.0208%2014.5%2012H16.5C16.8125%2012.0208%2016.9792%2012.1875%2017%2012.5C16.9792%2012.8125%2016.8125%2012.9792%2016.5%2013H14.5C14.1875%2012.9792%2014.0208%2012.8125%2014%2012.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-candidate-history-card")}
                tag="div"
              >
                {slotCandidateHistoryCard ?? <CandidateHistoryCard />}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22CandidateDatabaseSearch_candidate-empty-landing-wrappers__%22%5D%7B%0Aheight%3Acalc(100vh%20-%2058.59px)%3B%0A%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
