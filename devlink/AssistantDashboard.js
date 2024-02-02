import React from "react";
import * as _Builtin from "./_Builtin";
import { AssistStatus } from "./AssistStatus";
import { AssistantApplicantCount } from "./AssistantApplicantCount";
import { DashboardMenu } from "./DashboardMenu";
import * as _utils from "./utils";
import _styles from "./AssistantDashboard.module.css";

export function AssistantDashboard({
  as: _Component = _Builtin.Block,
  textTotalCandidateCount = "(Total 1200 Applicants)",
  slotChat,
  slotLeftDashboard,
  textJob = "Active",
  onClickJob = {},
  textHeaderTitle = "Candidate List",
  slotStatus,
  isLeftSideVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "job-details-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "job-details-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "job-details-header-block")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "jdet-main")} tag="div">
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "fw-semibold",
                "text-blue-600",
                "no-underline"
              )}
              tag="div"
              href="#"
              {...onClickJob}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "inline-block", "ml-0-mobile")}
                tag="div"
              >
                {textJob}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "inline-block")}
                tag="div"
              >
                {"Jobs"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block-7", "_12x12")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "svg-icon")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.64645%2010.3536C3.47288%2010.18%203.4536%209.91056%203.58859%209.71569L3.64645%209.64645L7.293%206L3.64645%202.35355C3.47288%202.17999%203.4536%201.91056%203.58859%201.71569L3.64645%201.64645C3.82001%201.47288%204.08944%201.4536%204.28431%201.58859L4.35355%201.64645L8.35355%205.64645C8.52712%205.82001%208.5464%206.08944%208.41141%206.28431L8.35355%206.35355L4.35355%2010.3536C4.15829%2010.5488%203.84171%2010.5488%203.64645%2010.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-list-info", "text-gray-600")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textHeaderTitle}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-no-wrap-2")}
                dyn={{
                  bind: {},
                }}
                tag="div"
              >
                {textTotalCandidateCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-main-action-menu", "gap-22")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "dash-header-status")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {"Status"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                {slotStatus ?? <AssistStatus />}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block-7", "clickable")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "svg-icon")}
                value="%3Csvg%20width%3D%224%22%20height%3D%2214%22%20viewBox%3D%220%200%204%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%2010.25C2.66667%2010.2708%203.16667%2010.5625%203.5%2011.125C3.83333%2011.7083%203.83333%2012.2917%203.5%2012.875C3.16667%2013.4375%202.66667%2013.7292%202%2013.75C1.33333%2013.7292%200.833333%2013.4375%200.5%2012.875C0.166667%2012.2917%200.166667%2011.7083%200.5%2011.125C0.833333%2010.5625%201.33333%2010.2708%202%2010.25ZM2%205.25C2.66667%205.27083%203.16667%205.5625%203.5%206.125C3.83333%206.70833%203.83333%207.29167%203.5%207.875C3.16667%208.4375%202.66667%208.72917%202%208.75C1.33333%208.72917%200.833333%208.4375%200.5%207.875C0.166667%207.29167%200.166667%206.70833%200.5%206.125C0.833333%205.5625%201.33333%205.27083%202%205.25ZM3.75%202C3.72917%202.66667%203.4375%203.16667%202.875%203.5C2.29167%203.83333%201.70833%203.83333%201.125%203.5C0.5625%203.16667%200.270833%202.66667%200.25%202C0.270833%201.33333%200.5625%200.833333%201.125%200.5C1.70833%200.166667%202.29167%200.166667%202.875%200.5C3.4375%200.833333%203.72917%201.33333%203.75%202Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dash-main-wrapper")}
        tag="div"
      >
        {isLeftSideVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dash-stats-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "dash-stats-block")}
              tag="div"
            >
              {slotLeftDashboard ?? (
                <>
                  <AssistantApplicantCount />
                  <DashboardMenu />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dash-graph-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "text-black-100"
                      )}
                      tag="div"
                    >
                      {"Candidates By Location"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "location-graph-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "location-pie-graph")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "svg-icon")}
                          value="%3Csvg%20width%3D%22180%22%20height%3D%22180%22%20viewBox%3D%220%200%20180%20180%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cmask%20id%3D%22mask0_2300_98721%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%2269%22%20y%3D%220%22%20width%3D%22111%22%20height%3D%22180%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M69.7248%20172.936C69.0715%20175.374%2070.5494%20177.883%2073.0287%20178.356C78.5201%20179.403%2084.1885%20179.951%2089.9848%20179.951C139.69%20179.951%20179.985%20139.657%20179.985%2089.9509C179.985%2042.8195%20143.756%204.14975%2097.6273%200.270866C95.0932%200.0577798%2092.9848%202.10678%2092.9848%204.6498L92.9848%2040.8358C92.9848%2043.2064%2094.8306%2045.146%2097.1712%2045.5217C118.608%2048.9622%20134.985%2067.5441%20134.985%2089.9509C134.985%20114.804%20114.838%20134.951%2089.9848%20134.951C88.1055%20134.951%2086.253%20134.836%2084.4342%20134.612C82.0428%20134.318%2079.6976%20135.717%2079.0739%20138.044L69.7248%20172.936Z%22%20fill%3D%22url(%23paint0_linear_2300_98721)%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_2300_98721)%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M69.7248%20172.936C69.0715%20175.374%2070.5494%20177.883%2073.0287%20178.356C78.5201%20179.403%2084.1885%20179.951%2089.9848%20179.951C139.69%20179.951%20179.985%20139.657%20179.985%2089.9509C179.985%2042.8195%20143.756%204.14975%2097.6273%200.270866C95.0932%200.0577798%2092.9848%202.10678%2092.9848%204.6498L92.9848%2040.8358C92.9848%2043.2064%2094.8306%2045.146%2097.1712%2045.5217C118.608%2048.9622%20134.985%2067.5441%20134.985%2089.9509C134.985%20114.804%20114.838%20134.951%2089.9848%20134.951C88.1055%20134.951%2086.253%20134.836%2084.4342%20134.612C82.0428%20134.318%2079.6976%20135.717%2079.0739%20138.044L69.7248%20172.936Z%22%20fill%3D%22url(%23paint1_linear_2300_98721)%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M69.7248%20172.936C69.0715%20175.374%2070.5494%20177.883%2073.0287%20178.356C78.5201%20179.403%2084.1885%20179.951%2089.9848%20179.951C139.69%20179.951%20179.985%20139.657%20179.985%2089.9509C179.985%2042.8195%20143.756%204.14975%2097.6273%200.270866C95.0932%200.0577798%2092.9848%202.10678%2092.9848%204.6498L92.9848%2040.8358C92.9848%2043.2064%2094.8306%2045.146%2097.1712%2045.5217C118.608%2048.9622%20134.985%2067.5441%20134.985%2089.9509C134.985%20114.804%20114.838%20134.951%2089.9848%20134.951C88.1055%20134.951%2086.253%20134.836%2084.4342%20134.612C82.0428%20134.318%2079.6976%20135.717%2079.0739%20138.044L69.7248%20172.936Z%22%20fill%3D%22%231C1C1C%22%20style%3D%22mix-blend-mode%3Ascreen%22%2F%3E%0A%3C%2Fg%3E%0A%3Cmask%20id%3D%22mask1_2300_98721%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%2268%22%20width%3D%2277%22%20height%3D%22108%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.235352%2090.6126C0.235352%2084.7131%200.802977%2078.9462%201.88659%2073.3635C2.51926%2070.1041%205.8354%2068.1979%209.04253%2069.0573L40.9415%2077.6046C44.1311%2078.4592%2045.988%2081.7312%2045.581%2085.0081C45.3528%2086.8443%2045.2354%2088.7147%2045.2354%2090.6126C45.2354%20108.988%2056.2496%20124.792%2072.0364%20131.781C75.0156%20133.1%2076.8613%20136.307%2076.0181%20139.454L67.454%20171.416C66.5893%20174.643%2063.2447%20176.561%2060.0966%20175.442C25.2133%20163.048%200.235352%20129.747%200.235352%2090.6126Z%22%20fill%3D%22url(%23paint2_linear_2300_98721)%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask1_2300_98721)%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.235352%2090.6126C0.235352%2084.7131%200.802977%2078.9462%201.88659%2073.3635C2.51926%2070.1041%205.8354%2068.1979%209.04253%2069.0573L40.9415%2077.6046C44.1311%2078.4592%2045.988%2081.7312%2045.581%2085.0081C45.3528%2086.8443%2045.2354%2088.7147%2045.2354%2090.6126C45.2354%20108.988%2056.2496%20124.792%2072.0364%20131.781C75.0156%20133.1%2076.8613%20136.307%2076.0181%20139.454L67.454%20171.416C66.5893%20174.643%2063.2447%20176.561%2060.0966%20175.442C25.2133%20163.048%200.235352%20129.747%200.235352%2090.6126Z%22%20fill%3D%22%23B1E3FF%22%2F%3E%0A%3C%2Fg%3E%0A%3Cmask%20id%3D%22mask2_2300_98721%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%225%22%20y%3D%2214%22%20width%3D%2261%22%20height%3D%2261%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M48.2447%2017.2199C46.5825%2014.3409%2042.8831%2013.346%2040.1302%2015.2096C24.8679%2025.5417%2012.9458%2040.4354%206.32173%2057.9333C5.12289%2061.1001%207.03916%2064.517%2010.3099%2065.3934L42.4077%2073.9939C45.4684%2074.8141%2048.6016%2073.089%2049.9803%2070.2359C52.9967%2063.9941%2057.4122%2058.5549%2062.8196%2054.3254C65.4146%2052.2957%2066.4068%2048.6775%2064.7595%2045.8244L48.2447%2017.2199Z%22%20fill%3D%22url(%23paint3_linear_2300_98721)%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask2_2300_98721)%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M48.2447%2017.2199C46.5825%2014.3409%2042.8831%2013.346%2040.1302%2015.2096C24.8679%2025.5417%2012.9458%2040.4354%206.32173%2057.9333C5.12289%2061.1001%207.03916%2064.517%2010.3099%2065.3934L42.4077%2073.9939C45.4684%2074.8141%2048.6016%2073.089%2049.9803%2070.2359C52.9967%2063.9941%2057.4122%2058.5549%2062.8196%2054.3254C65.4146%2052.2957%2066.4068%2048.6775%2064.7595%2045.8244L48.2447%2017.2199Z%22%20fill%3D%22%23A1E3CB%22%2F%3E%0A%3C%2Fg%3E%0A%3Cmask%20id%3D%22mask3_2300_98721%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%2249%22%20y%3D%220%22%20width%3D%2241%22%20height%3D%2248%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M66.8539%2044.8524C68.4424%2047.6038%2071.89%2048.5963%2074.8869%2047.5414C77.7527%2046.5326%2080.7515%2045.8058%2083.8498%2045.3942C87.1346%2044.9579%2089.8325%2042.3137%2089.8325%2039V6C89.8325%202.68629%2087.143%20-0.020926%2083.8364%200.19657C72.7917%200.923063%2062.291%203.64196%2052.6906%207.99724C49.6112%209.39422%2048.5562%2013.1599%2050.2469%2016.0883L66.8539%2044.8524Z%22%20fill%3D%22url(%23paint4_linear_2300_98721)%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask3_2300_98721)%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M66.8539%2044.8524C68.4424%2047.6038%2071.89%2048.5963%2074.8869%2047.5414C77.7527%2046.5326%2080.7515%2045.8058%2083.8498%2045.3942C87.1346%2044.9579%2089.8325%2042.3137%2089.8325%2039V6C89.8325%202.68629%2087.143%20-0.020926%2083.8364%200.19657C72.7917%200.923063%2062.291%203.64196%2052.6906%207.99724C49.6112%209.39422%2048.5562%2013.1599%2050.2469%2016.0883L66.8539%2044.8524Z%22%20fill%3D%22%23A8C5DA%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2300_98721%22%20x1%3D%22179.985%22%20y1%3D%220%22%20x2%3D%22119.043%22%20y2%3D%2264.6011%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%2F%3E%0A%3Cstop%20offset%3D%221%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2300_98721%22%20x1%3D%22124.259%22%20y1%3D%220%22%20x2%3D%22124.259%22%20y2%3D%22179.951%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231C1C1C%22%20stop-opacity%3D%220.6%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220.6%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint2_linear_2300_98721%22%20x1%3D%2277.5344%22%20y1%3D%2267.5%22%20x2%3D%2240.9329%22%20y2%3D%22111.611%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%2F%3E%0A%3Cstop%20offset%3D%221%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint3_linear_2300_98721%22%20x1%3D%2267.735%22%20y1%3D%2212%22%20x2%3D%2248.9759%22%20y2%3D%2244.0819%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%2F%3E%0A%3Cstop%20offset%3D%221%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint4_linear_2300_98721%22%20x1%3D%2289.8325%22%20y1%3D%220%22%20x2%3D%2274.1267%22%20y2%3D%2223.0569%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%2F%3E%0A%3Cstop%20offset%3D%221%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "dash-location-info")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "dash-location-indicator-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "dash-loc-indicator")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "dl-info-left")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "location-ind-dot",
                                  "black-100"
                                )}
                                tag="div"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "text-sm-5",
                                "text-black-100"
                              )}
                              tag="div"
                            >
                              {"United States"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm-5",
                              "text-black-100"
                            )}
                            tag="div"
                          >
                            {"38.6%"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "dash-location-indicator-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "dash-loc-indicator")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "dl-info-left")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "location-ind-dot",
                                  "secondary-green"
                                )}
                                tag="div"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "text-sm-5",
                                "text-black-100"
                              )}
                              tag="div"
                            >
                              {"Canada"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm-5",
                              "text-black-100"
                            )}
                            tag="div"
                          >
                            {"22.5%"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "dash-location-indicator-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "dash-loc-indicator")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "dl-info-left")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "location-ind-dot",
                                  "secondary-blue"
                                )}
                                tag="div"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "text-sm-5",
                                "text-black-100"
                              )}
                              tag="div"
                            >
                              {"Mexico"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm-5",
                              "text-black-100"
                            )}
                            tag="div"
                          >
                            {"30.8%"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "dash-location-indicator-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "dash-loc-indicator")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "dl-info-left")}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "location-ind-dot",
                                  "secondary-cyan"
                                )}
                                tag="div"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "text-sm-5",
                                "text-black-100"
                              )}
                              tag="div"
                            >
                              {"Other"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm-5",
                              "text-black-100"
                            )}
                            tag="div"
                          >
                            {"8.1%"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dash-graph-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "text-black-100"
                      )}
                      tag="div"
                    >
                      {"Candidates with skills"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "skills-graph-block")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "dash-chat-wrapper")}
          tag="div"
        >
          {slotChat ?? (
            <>
              <_Builtin.Block
                className={_utils.cx(_styles, "dash-chat-box-header")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "dash-chat-logo-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dash-chat-logo-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon-block-7", "_20x20")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "text-color-black"
                    )}
                    tag="div"
                  >
                    {"Job Assistant"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "icon-block-7",
                    "_40x40",
                    "clickable"
                  )}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "svg-icon")}
                    value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.38557%200.384763C5.72211%200.407199%205.9016%200.586686%205.92403%200.923225C5.9016%201.25976%205.72211%201.43925%205.38557%201.46169H1.61634V5.23092C1.59391%205.56746%201.41442%205.74694%201.07788%205.76938C0.741341%205.74694%200.561854%205.56746%200.539418%205.23092V0.923225C0.561854%200.586686%200.741341%200.407199%201.07788%200.384763H5.38557ZM0.539418%2010.6155C0.561854%2010.279%200.741341%2010.0995%201.07788%2010.0771C1.41442%2010.0995%201.59391%2010.279%201.61634%2010.6155V14.3848H5.38557C5.72211%2014.4072%205.9016%2014.5867%205.92403%2014.9232C5.9016%2015.2598%205.72211%2015.4393%205.38557%2015.4617H1.07788C0.741341%2015.4393%200.561854%2015.2598%200.539418%2014.9232V10.6155ZM15.0779%200.384763C15.4144%200.407199%2015.5939%200.586686%2015.6163%200.923225V5.23092C15.5939%205.56746%2015.4144%205.74694%2015.0779%205.76938C14.7413%205.74694%2014.5619%205.56746%2014.5394%205.23092V1.46169H10.7702C10.4337%201.43925%2010.2542%201.25976%2010.2317%200.923225C10.2542%200.586686%2010.4337%200.407199%2010.7702%200.384763H15.0779ZM14.5394%2010.6155C14.5619%2010.279%2014.7413%2010.0995%2015.0779%2010.0771C15.4144%2010.0995%2015.5939%2010.279%2015.6163%2010.6155V14.9232C15.5939%2015.2598%2015.4144%2015.4393%2015.0779%2015.4617H10.7702C10.4337%2015.4393%2010.2542%2015.2598%2010.2317%2014.9232C10.2542%2014.5867%2010.4337%2014.4072%2010.7702%2014.3848H14.5394V10.6155Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "dash-chat-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "dash-chat-body")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dash-chat-start-screen")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dc-body-logo-header")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "dc-body-logo-block")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "icon-block-7",
                            "_30x30"
                          )}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "svg-icon")}
                            value="%3Csvg%20width%3D%2231%22%20height%3D%2230%22%20viewBox%3D%220%200%2031%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M25.4868%2013.7447C22.0842%2012.8921%2020.3789%2012.4737%2019.2026%2011.2974C18.0263%2010.1132%2017.6079%208.41579%2016.7553%205.01316L15.5%200L14.2447%205.01316C13.3921%208.41579%2012.9737%2010.1211%2011.7974%2011.2974C10.6132%2012.4737%208.91579%2012.8921%205.51316%2013.7447L0.5%2015L5.51316%2016.2553C8.91579%2017.1079%2010.6211%2017.5263%2011.7974%2018.7026C12.9737%2019.8868%2013.3921%2021.5842%2014.2447%2024.9868L15.5%2030L16.7553%2024.9868C17.6079%2021.5842%2018.0263%2019.8789%2019.2026%2018.7026C20.3868%2017.5263%2022.0842%2017.1079%2025.4868%2016.2553L30.5%2015L25.4868%2013.7447Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                        tag="div"
                      >
                        {"Hi, How can I help you today."}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "initial-prompts-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "initial-prompt-block")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {
                            "List all candidates with a bachelor's degree in Computer Science."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "initial-prompt-block")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {
                            "Show me candidates who have worked in the tech industry for at least 3 years."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "initial-prompt-block")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {
                            "List candidates with expertise in machine learning."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "initial-prompt-block")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {
                            "List all the candidates those have score 80 and above"
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "initial-prompt-block")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {
                            "List of candidates with more than 5 years of experience in AI technologies."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "initial-prompt-block")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {
                            "List of candidates with more than 5 years of experience in AI technologies."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "initial-prompt-block")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {
                            "Provide a list of candidates proficient in Python programming language."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "initial-prompt-block")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {
                            "List candidates with experience in software development."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-blue-500-2",
                        "text-underline",
                        "clickable"
                      )}
                      tag="div"
                    >
                      {"View more"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "dash-chat-input-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "dash-chat-input-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-lg", "text-gray-400")}
                    tag="div"
                  >
                    {"Chat with assistant"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block-7", "_20x20")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "svg-icon")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%203C7.47917%202.58333%207.33333%202.22917%207.0625%201.9375C6.77083%201.66667%206.41667%201.52083%206%201.5C5.58333%201.52083%205.22917%201.66667%204.9375%201.9375C4.66667%202.22917%204.52083%202.58333%204.5%203V8C4.52083%208.41667%204.66667%208.77083%204.9375%209.0625C5.22917%209.33333%205.58333%209.47917%206%209.5C6.41667%209.47917%206.77083%209.33333%207.0625%209.0625C7.33333%208.77083%207.47917%208.41667%207.5%208V3ZM3%203C3.02083%202.14583%203.3125%201.4375%203.875%200.875C4.4375%200.3125%205.14583%200.0208333%206%200C6.85417%200.0208333%207.5625%200.3125%208.125%200.875C8.6875%201.4375%208.97917%202.14583%209%203V8C8.97917%208.85417%208.6875%209.5625%208.125%2010.125C7.5625%2010.6875%206.85417%2010.9792%206%2011C5.14583%2010.9792%204.4375%2010.6875%203.875%2010.125C3.3125%209.5625%203.02083%208.85417%203%208V3ZM2%206.75V8C2.02083%209.125%202.40625%2010.0729%203.15625%2010.8438C3.92708%2011.5938%204.875%2011.9792%206%2012C7.125%2011.9792%208.07292%2011.5938%208.84375%2010.8438C9.59375%2010.0729%209.97917%209.125%2010%208V6.75C10.0417%206.29167%2010.2917%206.04167%2010.75%206C11.2083%206.04167%2011.4583%206.29167%2011.5%206.75V8C11.4792%209.41667%2011.0208%2010.625%2010.125%2011.625C9.25%2012.625%208.125%2013.2292%206.75%2013.4375V14.5H8.25C8.70833%2014.5417%208.95833%2014.7917%209%2015.25C8.95833%2015.7083%208.70833%2015.9583%208.25%2016H6H3.75C3.29167%2015.9583%203.04167%2015.7083%203%2015.25C3.04167%2014.7917%203.29167%2014.5417%203.75%2014.5H5.25V13.4375C3.875%2013.2292%202.75%2012.625%201.875%2011.625C0.979167%2010.625%200.520833%209.41667%200.5%208V6.75C0.541667%206.29167%200.791667%206.04167%201.25%206C1.70833%206.04167%201.95833%206.29167%202%206.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm-5", "text-gray-400")}
                  tag="div"
                >
                  {"Press enter to send and shift+enter to break the line"}
                </_Builtin.Block>
              </_Builtin.Block>
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
