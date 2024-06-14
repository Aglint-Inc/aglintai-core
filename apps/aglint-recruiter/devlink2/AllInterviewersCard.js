"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { TextWithBg } from "./TextWithBg";
import * as _utils from "./utils";
import _styles from "./AllInterviewersCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-139":{"id":"e-139","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-87","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-140"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6e3919c2-8523-8d3f-f680-865519ba947d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6e3919c2-8523-8d3f-f680-865519ba947d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710828944804},"e-140":{"id":"e-140","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-88","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-139"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6e3919c2-8523-8d3f-f680-865519ba947d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6e3919c2-8523-8d3f-f680-865519ba947d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710828944805},"e-165":{"id":"e-165","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-85","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-166"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d90102db-2448-6082-c083-bf89f27582aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d90102db-2448-6082-c083-bf89f27582aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1717506263962},"e-166":{"id":"e-166","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-86","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-165"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d90102db-2448-6082-c083-bf89f27582aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d90102db-2448-6082-c083-bf89f27582aa","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1717506263963}},"actionLists":{"a-87":{"id":"a-87","title":"Not Connected Hover in","actionItemGroups":[{"actionItems":[{"id":"a-87-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected.not-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831","df57ed77-d3cf-8631-c258-1b95891b4019"]},"value":"none"}},{"id":"a-87-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected.not-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831","df57ed77-d3cf-8631-c258-1b95891b4019"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-87-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected.not-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831","df57ed77-d3cf-8631-c258-1b95891b4019"]},"value":"flex"}},{"id":"a-87-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected.not-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831","df57ed77-d3cf-8631-c258-1b95891b4019"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1710828949139},"a-88":{"id":"a-88","title":"Not Connected Hover out","actionItemGroups":[{"actionItems":[{"id":"a-88-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected.not-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831","df57ed77-d3cf-8631-c258-1b95891b4019"]},"value":0,"unit":""}},{"id":"a-88-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected.not-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831","df57ed77-d3cf-8631-c258-1b95891b4019"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1710828949139},"a-85":{"id":"a-85","title":"Calender Connected Hover in","actionItemGroups":[{"actionItems":[{"id":"a-85-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831"]},"value":"none"}},{"id":"a-85-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-85-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831"]},"value":1,"unit":""}},{"id":"a-85-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1710828784021},"a-86":{"id":"a-86","title":"Calender Connected Hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-86-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831"]},"value":0,"unit":""}},{"id":"a-86-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".interviewer-calender-connected","selectorGuids":["fc4a13d7-6f1d-f4a4-7df8-98e3e0a25831"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1710828784021}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AllInterviewersCard({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textName = "Westly Snedger",
  textUpcomingInterviews = "3",
  textCompletedInterviews = "3",
  slotInterviewModules,
  textRole = "Software",
  isConnectedCalenderVisible = false,
  isCalenderNotConnected = false,
  slotModulesTraining,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "", "all-interviewers-card-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interviewers-card-item")}
        id={_utils.cx(
          _styles,
          "w-node-_23fa5a49-b85f-659d-e893-4735fbc243b5-fbc243b4"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "avatar_40")}
          id={_utils.cx(
            _styles,
            "w-node-_23fa5a49-b85f-659d-e893-4735fbc243b6-fbc243b4"
          )}
          tag="div"
        >
          {slotProfileImage ?? (
            <_Builtin.Image
              className={_utils.cx(_styles, "cover_image")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewers-detail-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-name-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-first-cap")}
              tag="div"
            >
              <Text content={textName} weight="medium" />
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {isConnectedCalenderVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "interviewer-calender-wrap")}
                  data-w-id="d90102db-2448-6082-c083-bf89f27582aa"
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewbox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.31854%201.22514C5.57422%201.24219%205.71058%201.37855%205.72763%201.63423V2.86151H10.6367V1.63423C10.6538%201.37855%2010.7901%201.24219%2011.0458%201.22514C11.3015%201.24219%2011.4379%201.37855%2011.4549%201.63423V2.86151H12.2731C12.7333%202.87855%2013.1168%203.04048%2013.4237%203.3473C13.7305%203.65412%2013.8924%204.03764%2013.9094%204.49787V5.31605V6.13423V12.6797C13.8924%2013.1399%2013.7305%2013.5234%2013.4237%2013.8303C13.1168%2014.1371%2012.7333%2014.299%2012.2731%2014.3161H4.09126C3.63104%2014.299%203.24751%2014.1371%202.9407%2013.8303C2.63388%2013.5234%202.47195%2013.1399%202.4549%2012.6797V6.13423V5.31605V4.49787C2.47195%204.03764%202.63388%203.65412%202.9407%203.3473C3.24751%203.04048%203.63104%202.87855%204.09126%202.86151H4.90945V1.63423C4.92649%201.37855%205.06286%201.24219%205.31854%201.22514ZM13.0913%206.13423H3.27308V12.6797C3.27308%2012.9183%203.34979%2013.1143%203.5032%2013.2678C3.65661%2013.4212%203.85263%2013.4979%204.09126%2013.4979H12.2731C12.5117%2013.4979%2012.7077%2013.4212%2012.8612%2013.2678C13.0146%2013.1143%2013.0913%2012.9183%2013.0913%2012.6797V6.13423ZM12.2731%203.67969H4.09126C3.85263%203.67969%203.65661%203.75639%203.5032%203.9098C3.34979%204.06321%203.27308%204.25923%203.27308%204.49787V5.31605H13.0913V4.49787C13.0913%204.25923%2013.0146%204.06321%2012.8612%203.9098C12.7077%203.75639%2012.5117%203.67969%2012.2731%203.67969Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Crect%20width%3D%225.72727%22%20height%3D%225.72727%22%20transform%3D%22translate(11.4531%2010.6328)%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M14.3192%2018.2273C13.4244%2018.2145%2012.6062%2017.9972%2011.8647%2017.5753C11.1232%2017.1406%2010.5224%2016.5398%2010.0621%2015.7727C9.62749%2014.9929%209.41016%2014.1747%209.41016%2013.3182C9.41016%2012.4616%209.62749%2011.6435%2010.0621%2010.8636C10.5224%2010.0966%2011.1232%209.49574%2011.8647%209.06108C12.6062%208.6392%2013.4244%208.42187%2014.3192%208.40909C15.2141%208.42187%2016.0323%208.6392%2016.7738%209.06108C17.5153%209.49574%2018.1161%2010.0966%2018.5763%2010.8636C19.011%2011.6435%2019.2283%2012.4616%2019.2283%2013.3182C19.2283%2014.1747%2019.011%2014.9929%2018.5763%2015.7727C18.1161%2016.5398%2017.5153%2017.1406%2016.7738%2017.5753C16.0323%2017.9972%2015.2141%2018.2145%2014.3192%2018.2273ZM16.4862%2012.4169C16.6651%2012.1996%2016.6651%2011.9822%2016.4862%2011.7649C16.2688%2011.5859%2016.0515%2011.5859%2015.8342%2011.7649L13.7056%2013.8935L12.8043%2012.9922C12.587%2012.8132%2012.3697%2012.8132%2012.1523%2012.9922C11.9734%2013.2095%2011.9734%2013.4268%2012.1523%2013.6442L13.3796%2014.8714C13.5969%2015.0504%2013.8143%2015.0504%2014.0316%2014.8714L16.4862%2012.4169Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "interviewer-calender-connected"
                    )}
                    tag="div"
                    box-shadow="6"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    <Text content="Connected to calendar" weight="" />
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "tooltippos", "connected")}
                      value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.07609%201.62065C6.27195%201.30751%206.72805%201.3075%206.92391%201.62065L10.7481%207.73486C10.9564%208.06788%2010.717%208.5%2010.3242%208.5H2.67579C2.283%208.5%202.04359%208.06788%202.25188%207.73486L6.07609%201.62065Z%22%20fill%3D%22white%22%20stroke%3D%22%23E9EBED%22%2F%3E%0A%3Crect%20x%3D%221%22%20y%3D%227%22%20width%3D%2211%22%20height%3D%223%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isCalenderNotConnected ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "interviewers-not-connect-wrap"
                  )}
                  data-w-id="6e3919c2-8523-8d3f-f680-865519ba947d"
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewbox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.31854%201.22514C5.57422%201.24219%205.71058%201.37855%205.72763%201.63423V2.86151H10.6367V1.63423C10.6538%201.37855%2010.7901%201.24219%2011.0458%201.22514C11.3015%201.24219%2011.4379%201.37855%2011.4549%201.63423V2.86151H12.2731C12.7333%202.87855%2013.1168%203.04048%2013.4237%203.3473C13.7305%203.65412%2013.8924%204.03764%2013.9094%204.49787V5.31605V6.13423V12.6797C13.8924%2013.1399%2013.7305%2013.5234%2013.4237%2013.8303C13.1168%2014.1371%2012.7333%2014.299%2012.2731%2014.3161H4.09126C3.63104%2014.299%203.24751%2014.1371%202.9407%2013.8303C2.63388%2013.5234%202.47195%2013.1399%202.4549%2012.6797V6.13423V5.31605V4.49787C2.47195%204.03764%202.63388%203.65412%202.9407%203.3473C3.24751%203.04048%203.63104%202.87855%204.09126%202.86151H4.90945V1.63423C4.92649%201.37855%205.06286%201.24219%205.31854%201.22514ZM13.0913%206.13423H3.27308V12.6797C3.27308%2012.9183%203.34979%2013.1143%203.5032%2013.2678C3.65661%2013.4212%203.85263%2013.4979%204.09126%2013.4979H12.2731C12.5117%2013.4979%2012.7077%2013.4212%2012.8612%2013.2678C13.0146%2013.1143%2013.0913%2012.9183%2013.0913%2012.6797V6.13423ZM12.2731%203.67969H4.09126C3.85263%203.67969%203.65661%203.75639%203.5032%203.9098C3.34979%204.06321%203.27308%204.25923%203.27308%204.49787V5.31605H13.0913V4.49787C13.0913%204.25923%2013.0146%204.06321%2012.8612%203.9098C12.7077%203.75639%2012.5117%203.67969%2012.2731%203.67969Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Crect%20width%3D%225.72727%22%20height%3D%225.72727%22%20transform%3D%22translate(11.4531%2010.6328)%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M14.3192%2018.2273C13.4244%2018.2145%2012.6062%2017.9972%2011.8647%2017.5753C11.1232%2017.1406%2010.5224%2016.5398%2010.0621%2015.7727C9.62749%2014.9929%209.41016%2014.1747%209.41016%2013.3182C9.41016%2012.4616%209.62749%2011.6435%2010.0621%2010.8636C10.5224%2010.0966%2011.1232%209.49574%2011.8647%209.06108C12.6062%208.6392%2013.4244%208.42187%2014.3192%208.40909C15.2141%208.42187%2016.0323%208.6392%2016.7738%209.06108C17.5153%209.49574%2018.1161%2010.0966%2018.5763%2010.8636C19.011%2011.6435%2019.2283%2012.4616%2019.2283%2013.3182C19.2283%2014.1747%2019.011%2014.9929%2018.5763%2015.7727C18.1161%2016.5398%2017.5153%2017.1406%2016.7738%2017.5753C16.0323%2017.9972%2015.2141%2018.2145%2014.3192%2018.2273ZM13.5522%2014.8523C13.271%2014.8778%2013.1175%2015.0312%2013.092%2015.3125C13.1175%2015.5937%2013.271%2015.7472%2013.5522%2015.7727H15.0863C15.3675%2015.7472%2015.521%2015.5937%2015.5465%2015.3125C15.521%2015.0312%2015.3675%2014.8778%2015.0863%2014.8523H14.9329V13.1648C14.9073%2012.8835%2014.7539%2012.7301%2014.4727%2012.7045H13.5522C13.271%2012.7301%2013.1175%2012.8835%2013.092%2013.1648C13.1175%2013.446%2013.271%2013.5994%2013.5522%2013.625H14.0124V14.8523H13.5522ZM14.3192%2010.8636C14.1403%2010.8636%2013.9933%2010.9212%2013.8782%2011.0362C13.7631%2011.1513%2013.7056%2011.2983%2013.7056%2011.4773C13.7056%2011.6562%2013.7631%2011.8033%2013.8782%2011.9183C13.9933%2012.0334%2014.1403%2012.0909%2014.3192%2012.0909C14.4982%2012.0909%2014.6452%2012.0334%2014.7603%2011.9183C14.8754%2011.8033%2014.9329%2011.6562%2014.9329%2011.4773C14.9329%2011.2983%2014.8754%2011.1513%2014.7603%2011.0362C14.6452%2010.9212%2014.4982%2010.8636%2014.3192%2010.8636Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "interviewer-calender-connected",
                      "not-connected"
                    )}
                    tag="div"
                    box-shado="6"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM5.0625%207.875C4.71875%207.90625%204.53125%208.09375%204.5%208.4375C4.53125%208.78125%204.71875%208.96875%205.0625%209H6.9375C7.28125%208.96875%207.46875%208.78125%207.5%208.4375C7.46875%208.09375%207.28125%207.90625%206.9375%207.875H6.75V5.8125C6.71875%205.46875%206.53125%205.28125%206.1875%205.25H5.0625C4.71875%205.28125%204.53125%205.46875%204.5%205.8125C4.53125%206.15625%204.71875%206.34375%205.0625%206.375H5.625V7.875H5.0625ZM6%203C5.78125%203%205.60156%203.07031%205.46094%203.21094C5.32031%203.35156%205.25%203.53125%205.25%203.75C5.25%203.96875%205.32031%204.14844%205.46094%204.28906C5.60156%204.42969%205.78125%204.5%206%204.5C6.21875%204.5%206.39844%204.42969%206.53906%204.28906C6.67969%204.14844%206.75%203.96875%206.75%203.75C6.75%203.53125%206.67969%203.35156%206.53906%203.21094C6.39844%203.07031%206.21875%203%206%203Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    <Text content="Not connected to calender" />
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(
                        _styles,
                        "tooltippos",
                        "not-conneceted"
                      )}
                      value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.07609%201.62065C6.27195%201.30751%206.72805%201.3075%206.92391%201.62065L10.7481%207.73486C10.9564%208.06788%2010.717%208.5%2010.3242%208.5H2.67579C2.283%208.5%202.04359%208.06788%202.25188%207.73486L6.07609%201.62065Z%22%20fill%3D%22white%22%20stroke%3D%22%23E9EBED%22%2F%3E%0A%3Crect%20x%3D%221%22%20y%3D%227%22%20width%3D%2211%22%20height%3D%223%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <Text content={textRole} color="neutral" size="1" weight="" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interviewers-card-item", "center")}
        id={_utils.cx(
          _styles,
          "w-node-_23fa5a49-b85f-659d-e893-4735fbc243b9-fbc243b4"
        )}
        tag="div"
      >
        <Text content={textUpcomingInterviews} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interviewers-card-item", "center")}
        id={_utils.cx(
          _styles,
          "w-node-_23fa5a49-b85f-659d-e893-4735fbc243bc-fbc243b4"
        )}
        tag="div"
      >
        <Text content={textCompletedInterviews} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-interview-module")}
        id={_utils.cx(
          _styles,
          "w-node-_23fa5a49-b85f-659d-e893-4735fbc243bf-fbc243b4"
        )}
        tag="div"
      >
        {slotInterviewModules ?? <TextWithBg />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-interview-module")}
        tag="div"
      >
        {slotModulesTraining ?? <TextWithBg />}
      </_Builtin.Block>
    </_Component>
  );
}
