import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { DetailedFeedbackCard } from "./DetailedFeedbackCard";
import { IconChevronDown } from "./IconChevronDown";
import * as _utils from "./utils";
import _styles from "./DetailedFeedback.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-928":{"id":"e-928","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-378","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-929"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807030","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807030","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694908197175},"e-936":{"id":"e-936","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-381","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-937"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|002821df-9a23-91c6-11fa-4b56cedb1947","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|002821df-9a23-91c6-11fa-4b56cedb1947","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694909163681},"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600},"e-1283":{"id":"e-1283","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-381","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1284"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59642c18-096f-1528-6295-a791c8c9a815","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59642c18-096f-1528-6295-a791c8c9a815","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695820203394}},"actionLists":{"a-378":{"id":"a-378","title":"screening-sidebar-[close]","actionItemGroups":[{"actionItems":[{"id":"a-378-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-378-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".screening-sidebar","selectorGuids":["9c18f576-777f-0c22-82c0-ab8821e1e97d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-378-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".screening-sidebar","selectorGuids":["9c18f576-777f-0c22-82c0-ab8821e1e97d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694898960131},"a-381":{"id":"a-381","title":"detailed-feedback-[open]","actionItemGroups":[{"actionItems":[{"id":"a-381-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper.overview","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","103615c0-baf5-f2ba-a55e-2e2680195094"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-381-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper.overview","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","103615c0-baf5-f2ba-a55e-2e2680195094"]},"value":"none"}},{"id":"a-381-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".sidebar-wrapper.detailed","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","176d92f4-5f7b-45cf-12df-142b9dea7515"]},"value":"flex"}}]},{"actionItems":[{"id":"a-381-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".sidebar-wrapper.detailed","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","176d92f4-5f7b-45cf-12df-142b9dea7515"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694909170941},"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function DetailedFeedback({
  as: _Component = _Builtin.Block,
  onClickShare = {},
  onClickDownloadFeedback = {},
  onClickBack = {},
  slotDetailedFeedback,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "sidebar-wrapper", "detailed")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "sidebar-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "detailed-view-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-303")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "clickable")}
              tag="div"
              {...onClickBack}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.3479%2010.3591C4.54623%2010.167%204.55126%209.85044%204.35912%209.6521C4.35912%209.6521%202.67654%207.91532%201.78972%207H11.5C11.7761%207%2012%206.77614%2012%206.5C12%206.22386%2011.7761%206%2011.5%206H1.70711L4.35355%203.35355C4.54882%203.15829%204.54882%202.84171%204.35355%202.64645C4.15829%202.45118%203.84171%202.45118%203.64645%202.64645L0.546447%205.74645C0.151184%206.14171%200.151184%206.75829%200.546447%207.15355L3.64088%2010.3479C3.83302%2010.5462%204.14956%2010.5513%204.3479%2010.3591Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-lg",
                "fw-semibold",
                "color-black"
              )}
              tag="div"
            >
              {"Detailed feedback"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-298")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "aui-button-wrap")}
              tag="div"
              tabIndex=""
              {...onClickShare}
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "aui-button",
                  "is-small",
                  "is-button-outlined"
                )}
                tag="div"
                tabIndex=""
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "button-icon", "is-large")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M0.973155%204.65656C0.711885%204.56947%200.709825%204.42895%200.97853%204.33938L10.5217%201.15835C10.7859%201.07027%2010.9374%201.21817%2010.8634%201.47731L8.1368%2011.0204C8.0613%2011.2847%207.90895%2011.2938%207.7973%2011.0426L6.0001%206.99888L9.0001%202.99887L5.0001%205.99888L0.973155%204.65656Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"share"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "aui-button-wrap")}
              tag="div"
              tabIndex=""
              {...onClickDownloadFeedback}
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "aui-button",
                  "is-small",
                  "is-button-bg-blue"
                )}
                tag="div"
                tabIndex=""
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "button-icon", "is-large")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.5%207.69289L9.04645%205.14645C9.24171%204.95118%209.55829%204.95118%209.75355%205.14645C9.94882%205.34171%209.94882%205.65829%209.75355%205.85355L6.65355%208.95355C6.25829%209.34882%205.64171%209.34882%205.24645%208.95355L2.14645%205.85355C1.95118%205.65829%201.95118%205.34171%202.14645%205.14645C2.34171%204.95118%202.65829%204.95118%202.85355%205.14645L5.5%207.79289V0.5C5.5%200.223858%205.72386%200%206%200C6.27614%200%206.5%200.223858%206.5%200.5V7.69289ZM1.5%2012C1.22386%2012%201%2011.7761%201%2011.5C1%2011.2239%201.22386%2011%201.5%2011H10.5C10.7761%2011%2011%2011.2239%2011%2011.5C11%2011.7761%2010.7761%2012%2010.5%2012H1.5Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Download Feedback"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "job-sidebar-wrapper")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "hide")}
            value="%3Cstyle%3E%0A.job-sidebar-wrapper%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A.job-sidebar-wrapper%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%0A%20%20scrollbar-width%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
          />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "job-sidebar-main-block",
              "screening"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "lan-analysis-wrapper")}
              tag="div"
            >
              {slotDetailedFeedback ?? (
                <>
                  <DetailedFeedbackCard />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "lan-analysis-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "lan-analysis-header-block"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">
                        {"Language quality"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "lan-analysis-score-block"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "div-block-304",
                            "yellow-200"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "group-778")}
                            loading="lazy"
                            width={10}
                            height={10}
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6505a3b9dd11d76c95408993_Group-778.svg"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-sm",
                            "fw-semibold",
                            "text-yellow-500"
                          )}
                          tag="div"
                        >
                          {"78%"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-600"
                      )}
                      tag="div"
                    >
                      {
                        "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis."
                      }
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "lan-analysis-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "lan-analysis-header-block"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">
                        {"Skill based assessment"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "lan-analysis-score-block"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "div-block-304",
                            "green-200"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "group-778")}
                            loading="lazy"
                            width={10}
                            height={10}
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6505a3b9dd11d76c95408993_Group-778.svg"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-sm",
                            "fw-semibold",
                            "text-green-500"
                          )}
                          tag="div"
                        >
                          {"92%"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-600"
                      )}
                      tag="div"
                    >
                      {
                        "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis."
                      }
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "lan-analysis-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "lan-analysis-header-block"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">
                        {"Personality fit"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "lan-analysis-score-block"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "div-block-304",
                            "red-200"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "group-778")}
                            loading="lazy"
                            width={10}
                            height={10}
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6505a3b9dd11d76c95408993_Group-778.svg"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "text-sm",
                            "fw-semibold",
                            "text-red-500"
                          )}
                          tag="div"
                        >
                          {"24%"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-600"
                      )}
                      tag="div"
                    >
                      {
                        "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis."
                      }
                    </_Builtin.Block>
                  </_Builtin.Block>
                </>
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-transcript-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Transcript"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-108")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-interview-script-card")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "transcript-toggle")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "interviewer-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "interviewer-sub-wrapper"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-305")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "interviewer-pics-wrapper"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "image-12",
                                "image-12",
                                "image-16",
                                "image-13",
                                "image-14"
                              )}
                              loading="lazy"
                              width="auto"
                              height="auto"
                              alt="__wf_reserved_inherit"
                              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890218_Rectangle%2077.png"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "color-grey-700")}
                              tag="div"
                            >
                              {"Marc Spencer"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "slot-button", "cdd")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "play-button-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(
                                  _styles,
                                  "play-icon-button"
                                )}
                                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.6601%2011.1341C4.57429%2011.1341%204.48848%2011.1142%204.40928%2011.0811C4.16002%2010.9828%203.99715%2010.7401%204.00004%2010.4712V1.46931C3.99869%201.19929%204.16057%200.955438%204.40928%200.852832C4.6601%200.746771%204.93733%200.806431%205.12874%200.998666L9.37954%205.26762C9.76238%205.65209%209.76238%206.28846%209.37954%206.67293L5.12874%2010.9419C5.00333%2011.0678%204.83172%2011.1341%204.6601%2011.1341Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "pause-button-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(
                                  _styles,
                                  "play-icon-button"
                                )}
                                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.33341%201.33203C2.96523%201.33203%202.66675%201.63051%202.66675%201.9987V9.9987C2.66675%2010.3669%202.96523%2010.6654%203.33342%2010.6654H4.66675C5.03494%2010.6654%205.33341%2010.3669%205.33341%209.9987V1.9987C5.33341%201.63051%205.03494%201.33203%204.66675%201.33203H3.33341ZM7.33342%201.33203C6.96523%201.33203%206.66675%201.63051%206.66675%201.9987V9.9987C6.66675%2010.3669%206.96523%2010.6654%207.33342%2010.6654H8.66675C9.03494%2010.6654%209.33342%2010.3669%209.33342%209.9987V1.9987C9.33342%201.63051%209.03494%201.33203%208.66675%201.33203H7.33342Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cdd-transcript-text")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-md",
                              "color-grey-700"
                            )}
                            tag="div"
                          >
                            {
                              "Interviewer : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                            }
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "transcript-chevron")}
                      tag="div"
                    >
                      <IconChevronDown />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "transcript-toggle")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "interviewer-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "interviewer-sub-wrapper"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-305")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "interviewer-pics-wrapper"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "image-12",
                                "image-12",
                                "image-16",
                                "image-13",
                                "image-14"
                              )}
                              loading="lazy"
                              width="auto"
                              height="auto"
                              alt="__wf_reserved_inherit"
                              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890219_Rectangle%2077%20(1).png"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "color-grey-700")}
                              tag="div"
                            >
                              {"You"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "slot-button", "cdd")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "play-button-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(
                                  _styles,
                                  "play-icon-button"
                                )}
                                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.6601%2011.1341C4.57429%2011.1341%204.48848%2011.1142%204.40928%2011.0811C4.16002%2010.9828%203.99715%2010.7401%204.00004%2010.4712V1.46931C3.99869%201.19929%204.16057%200.955438%204.40928%200.852832C4.6601%200.746771%204.93733%200.806431%205.12874%200.998666L9.37954%205.26762C9.76238%205.65209%209.76238%206.28846%209.37954%206.67293L5.12874%2010.9419C5.00333%2011.0678%204.83172%2011.1341%204.6601%2011.1341Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "pause-button-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(
                                  _styles,
                                  "play-icon-button"
                                )}
                                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.33341%201.33203C2.96523%201.33203%202.66675%201.63051%202.66675%201.9987V9.9987C2.66675%2010.3669%202.96523%2010.6654%203.33342%2010.6654H4.66675C5.03494%2010.6654%205.33341%2010.3669%205.33341%209.9987V1.9987C5.33341%201.63051%205.03494%201.33203%204.66675%201.33203H3.33341ZM7.33342%201.33203C6.96523%201.33203%206.66675%201.63051%206.66675%201.9987V9.9987C6.66675%2010.3669%206.96523%2010.6654%207.33342%2010.6654H8.66675C9.03494%2010.6654%209.33342%2010.3669%209.33342%209.9987V1.9987C9.33342%201.63051%209.03494%201.33203%208.66675%201.33203H7.33342Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdd-transcript-text",
                            "grey-100"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-md",
                              "color-grey-700"
                            )}
                            tag="div"
                          >
                            {
                              "Interviewer : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                            }
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "transcript-chevron")}
                      tag="div"
                    >
                      <IconChevronDown />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "transcript-answer")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-111")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "improve-answer-wrapper")}
                        tag="div"
                        id="improve-answer"
                      >
                        <_Builtin.Image
                          className={_utils.cx(_styles, "image-29")}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901dd_glitter.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "color-grey-600")}
                          tag="div"
                        >
                          {"Improve my answer"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-108", "fw-semibold")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-interview-script-card")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "transcript-toggle")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "interviewer-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "interviewer-sub-wrapper"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-305")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "interviewer-pics-wrapper"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "image-12",
                                "image-12",
                                "image-16",
                                "image-13",
                                "image-14"
                              )}
                              loading="lazy"
                              width="auto"
                              height="auto"
                              alt="__wf_reserved_inherit"
                              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890218_Rectangle%2077.png"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "color-grey-700")}
                              tag="div"
                            >
                              {"Marc Spencer"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "slot-button", "cdd")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "play-button-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(
                                  _styles,
                                  "play-icon-button"
                                )}
                                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.6601%2011.1341C4.57429%2011.1341%204.48848%2011.1142%204.40928%2011.0811C4.16002%2010.9828%203.99715%2010.7401%204.00004%2010.4712V1.46931C3.99869%201.19929%204.16057%200.955438%204.40928%200.852832C4.6601%200.746771%204.93733%200.806431%205.12874%200.998666L9.37954%205.26762C9.76238%205.65209%209.76238%206.28846%209.37954%206.67293L5.12874%2010.9419C5.00333%2011.0678%204.83172%2011.1341%204.6601%2011.1341Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "pause-button-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(
                                  _styles,
                                  "play-icon-button"
                                )}
                                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.33341%201.33203C2.96523%201.33203%202.66675%201.63051%202.66675%201.9987V9.9987C2.66675%2010.3669%202.96523%2010.6654%203.33342%2010.6654H4.66675C5.03494%2010.6654%205.33341%2010.3669%205.33341%209.9987V1.9987C5.33341%201.63051%205.03494%201.33203%204.66675%201.33203H3.33341ZM7.33342%201.33203C6.96523%201.33203%206.66675%201.63051%206.66675%201.9987V9.9987C6.66675%2010.3669%206.96523%2010.6654%207.33342%2010.6654H8.66675C9.03494%2010.6654%209.33342%2010.3669%209.33342%209.9987V1.9987C9.33342%201.63051%209.03494%201.33203%208.66675%201.33203H7.33342Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cdd-transcript-text")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-md",
                              "color-grey-700"
                            )}
                            tag="div"
                          >
                            {
                              "Interviewer : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                            }
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "transcript-chevron")}
                      tag="div"
                    >
                      <IconChevronDown />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "transcript-toggle")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "interviewer-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "interviewer-sub-wrapper"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-305")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "interviewer-pics-wrapper"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "image-12",
                                "image-12",
                                "image-16",
                                "image-13",
                                "image-14"
                              )}
                              loading="lazy"
                              width="auto"
                              height="auto"
                              alt="__wf_reserved_inherit"
                              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890219_Rectangle%2077%20(1).png"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "color-grey-700")}
                              tag="div"
                            >
                              {"You"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "slot-button", "cdd")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "play-button-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(
                                  _styles,
                                  "play-icon-button"
                                )}
                                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.6601%2011.1341C4.57429%2011.1341%204.48848%2011.1142%204.40928%2011.0811C4.16002%2010.9828%203.99715%2010.7401%204.00004%2010.4712V1.46931C3.99869%201.19929%204.16057%200.955438%204.40928%200.852832C4.6601%200.746771%204.93733%200.806431%205.12874%200.998666L9.37954%205.26762C9.76238%205.65209%209.76238%206.28846%209.37954%206.67293L5.12874%2010.9419C5.00333%2011.0678%204.83172%2011.1341%204.6601%2011.1341Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "pause-button-wrapper"
                              )}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(
                                  _styles,
                                  "play-icon-button"
                                )}
                                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.33341%201.33203C2.96523%201.33203%202.66675%201.63051%202.66675%201.9987V9.9987C2.66675%2010.3669%202.96523%2010.6654%203.33342%2010.6654H4.66675C5.03494%2010.6654%205.33341%2010.3669%205.33341%209.9987V1.9987C5.33341%201.63051%205.03494%201.33203%204.66675%201.33203H3.33341ZM7.33342%201.33203C6.96523%201.33203%206.66675%201.63051%206.66675%201.9987V9.9987C6.66675%2010.3669%206.96523%2010.6654%207.33342%2010.6654H8.66675C9.03494%2010.6654%209.33342%2010.3669%209.33342%209.9987V1.9987C9.33342%201.63051%209.03494%201.33203%208.66675%201.33203H7.33342Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdd-transcript-text",
                            "grey-100"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-md",
                              "color-grey-700"
                            )}
                            tag="div"
                          >
                            {
                              "Interviewer : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                            }
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "transcript-chevron")}
                      tag="div"
                    >
                      <IconChevronDown />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "transcript-answer")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-111")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "improve-answer-wrapper")}
                        tag="div"
                        id="improve-answer"
                      >
                        <_Builtin.Image
                          className={_utils.cx(_styles, "image-29")}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901dd_glitter.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "color-grey-600")}
                          tag="div"
                        >
                          {"Improve my answer"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
