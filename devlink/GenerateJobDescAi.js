import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./GenerateJobDescAi.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1244":{"id":"e-1244","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-429","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1245"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7f6a1452-58ba-ecb8-e3ce-3882e6484f94","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7f6a1452-58ba-ecb8-e3ce-3882e6484f94","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695718442191},"e-1245":{"id":"e-1245","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-430","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1244"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7f6a1452-58ba-ecb8-e3ce-3882e6484f94","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7f6a1452-58ba-ecb8-e3ce-3882e6484f94","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695718442196},"e-1275":{"id":"e-1275","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-430","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1276"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c81386e0-d400-0eb4-a15a-0239abc23f87","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c81386e0-d400-0eb4-a15a-0239abc23f87","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804828688},"e-1316":{"id":"e-1316","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-449","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1317"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"20f0f4b6-58f6-e191-93a6-4dfba338d8ba"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696255557501},"e-1317":{"id":"e-1317","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-450","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1316"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"20f0f4b6-58f6-e191-93a6-4dfba338d8ba"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696255557503},"e-1318":{"id":"e-1318","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-449","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1319"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"d4371b5c-2711-2096-83ee-9d7498b2b0e2"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696255703156},"e-1319":{"id":"e-1319","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-450","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1318"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"d4371b5c-2711-2096-83ee-9d7498b2b0e2"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696255703159}},"actionLists":{"a-429":{"id":"a-429","title":"generate-question open","actionItemGroups":[{"actionItems":[{"id":"a-429-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".cj-rt-generate-block-2","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d6"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-429-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".drop-icon-wrapperss","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d2"]},"zValue":-180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-429-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outExpo","duration":700,"target":{"useEventTarget":"PARENT","selector":".cj-rt-generate-block-2","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d6"]},"heightValue":46,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-429-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".drop-icon-wrapperss","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d2"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695718445992},"a-430":{"id":"a-430","title":"generate-question close","actionItemGroups":[{"actionItems":[{"id":"a-430-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outExpo","duration":700,"target":{"useEventTarget":"PARENT","selector":".cj-rt-generate-block-2","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d6"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-430-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".drop-icon-wrapperss","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d2"]},"zValue":-180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695718445992},"a-449":{"id":"a-449","title":"Hover Disclaimer In","actionItemGroups":[{"actionItems":[{"id":"a-449-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"SIBLINGS","selector":".disclaimer-hover-card","selectorGuids":["14fc57f0-1e77-f0bb-2665-7703a107f094"]}}},{"id":"a-449-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".disclaimer-hover-card","selectorGuids":["14fc57f0-1e77-f0bb-2665-7703a107f094"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-449-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".disclaimer-hover-card","selectorGuids":["14fc57f0-1e77-f0bb-2665-7703a107f094"]},"value":1,"unit":""}},{"id":"a-449-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"useEventTarget":"SIBLINGS","selector":".disclaimer-hover-card","selectorGuids":["14fc57f0-1e77-f0bb-2665-7703a107f094"]}}}]}],"createdOn":1696255561129,"useFirstGroupAsInitialState":true},"a-450":{"id":"a-450","title":"Hover Disclaimer Out","actionItemGroups":[{"actionItems":[{"id":"a-450-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".disclaimer-hover-card","selectorGuids":["14fc57f0-1e77-f0bb-2665-7703a107f094"]},"value":0,"unit":""}},{"id":"a-450-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"SIBLINGS","selector":".disclaimer-hover-card","selectorGuids":["14fc57f0-1e77-f0bb-2665-7703a107f094"]}}}]}],"createdOn":1696255561129,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function GenerateJobDescAi({
  as: _Component = _Builtin.Block,
  isCompanyDetailsChecked = true,
  onClickCompanyDdetailsCheck = {},
  onClickGenerate = {},
  onClickBenefitsCheck = {},
  onClickValuesCheck = {},
  isBenefitsChecked = true,
  isValuesChecked = true,
  isGenerateDisable = true,
  textGenerateHeader = "Generate job description with AI",
  isLoading = false,
  isBenefitsNotSpecified = false,
  isValuesNotSpecified = false,
  slotLottie,
  textLabel1 = "",
  textLabel2 = "",
  textLabel3 = "",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cj-rt-generate-block-2")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-355")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-336")}
          data-w-id="7f6a1452-58ba-ecb8-e3ce-3882e6484f94"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "generate-ai--text-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-kale-800-2")}
              tag="div"
            >
              {textGenerateHeader}
            </_Builtin.Block>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt="__wf_reserved_inherit"
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890239_glitter.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "drop-icon-wrapperss")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "add-icon")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M9.12509%204.40637C9.26885%204.29137%209.47861%204.31467%209.59361%204.45843C9.69584%204.58621%209.68878%204.76615%209.58499%204.88532L9.54156%204.92695L6.20822%207.59362C6.10388%207.67709%205.96188%207.68902%205.84677%207.62939L5.79176%207.59362L2.45843%204.92695C2.31467%204.81195%202.29137%204.60218%202.40637%204.45843C2.50859%204.33065%202.68569%204.29803%202.82475%204.37313L2.87489%204.40637L5.99999%206.90599L9.12509%204.40637Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        {isLoading ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "loading-generate", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "lottie-slot-ai-generate")}
              tag="div"
            >
              {slotLottie}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-kale-800-2")}
              tag="div"
            >
              {"Generating Job description"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-check-mark")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-337")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "row-checkbox-ai")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "checkbox-border")}
                tag="div"
                {...onClickCompanyDdetailsCheck}
              >
                {isCompanyDetailsChecked ? (
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "add-icon", "pointer")}
                    value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.3231%207.33154L8.57768%2011.0769L8.21076%2011.4439C8.08141%2011.5735%207.90581%2011.6463%207.72268%2011.6463C7.53956%2011.6463%207.36396%2011.5735%207.23461%2011.4439L6.95076%2011.16L5.68384%209.90001C5.44879%209.66482%205.44879%209.28365%205.68384%209.04847L5.69768%209.04154C5.92615%208.80616%206.30691%208.80616%206.5423%209.04154L7.71922%2010.2185L11.4646%206.47308C11.7%206.24462%2012.0808%206.24462%2012.3092%206.47308L12.3231%206.48693C12.5515%206.72231%2012.5515%207.09616%2012.3231%207.33154ZM13.8392%203.46155H4.15386C3.77309%203.46155%203.46155%203.77309%203.46155%204.16078V13.8462C3.46155%2014.2269%203.77309%2014.5385%204.15386%2014.5385H13.8392C14.2269%2014.5385%2014.5385%2014.2269%2014.5385%2013.8462V4.16078C14.5385%203.77309%2014.2269%203.46155%2013.8392%203.46155Z%22%20fill%3D%22%23012B30%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-kale-600")}
              tag="div"
            >
              {textLabel1}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "row-checkbox-ai")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "checkbox-disclaimer-wrappers")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "checkbox-border")}
                tag="div"
                {...onClickBenefitsCheck}
              >
                {isBenefitsChecked ? (
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "add-icon", "pointer")}
                    value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.3231%207.33154L8.57768%2011.0769L8.21076%2011.4439C8.08141%2011.5735%207.90581%2011.6463%207.72268%2011.6463C7.53956%2011.6463%207.36396%2011.5735%207.23461%2011.4439L6.95076%2011.16L5.68384%209.90001C5.44879%209.66482%205.44879%209.28365%205.68384%209.04847L5.69768%209.04154C5.92615%208.80616%206.30691%208.80616%206.5423%209.04154L7.71922%2010.2185L11.4646%206.47308C11.7%206.24462%2012.0808%206.24462%2012.3092%206.47308L12.3231%206.48693C12.5515%206.72231%2012.5515%207.09616%2012.3231%207.33154ZM13.8392%203.46155H4.15386C3.77309%203.46155%203.46155%203.77309%203.46155%204.16078V13.8462C3.46155%2014.2269%203.77309%2014.5385%204.15386%2014.5385H13.8392C14.2269%2014.5385%2014.5385%2014.2269%2014.5385%2013.8462V4.16078C14.5385%203.77309%2014.2269%203.46155%2013.8392%203.46155Z%22%20fill%3D%22%23012B30%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                ) : null}
              </_Builtin.Block>
              {isBenefitsNotSpecified ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "disclamier-wrappers")}
                  data-w-id="d4371b5c-2711-2096-83ee-9d7498b2b0e2"
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.5%2012C2.46%2012%200%209.54%200%206.5C0%203.46%202.46%201%205.5%201C8.54%201%2011%203.46%2011%206.5C11%209.54%208.54%2012%205.5%2012ZM5%209.5C5%209.78%205.22%2010%205.5%2010C5.78%2010%206%209.78%206%209.5V6.5C6%206.22%205.78%206%205.5%206C5.22%206%205%206.22%205%206.5V9.5ZM5.5%203C4.95%203%204.5%203.45%204.5%204C4.5%204.55%204.95%205%205.5%205C6.05%205%206.5%204.55%206.5%204C6.5%203.45%206.05%203%205.5%203Z%22%20fill%3D%22%23FFB057%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "disclaimer-hover-card")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm")}
                  tag="div"
                >
                  {
                    "It appears that you haven't specified the benefits in the company profile. The AI will now generate them randomly."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-kale-600")}
              tag="div"
            >
              {textLabel2}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "row-checkbox-ai")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "checkbox-disclaimer-wrappers")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "checkbox-border")}
                tag="div"
                {...onClickValuesCheck}
              >
                {isValuesChecked ? (
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "add-icon", "pointer")}
                    value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.3231%207.33154L8.57768%2011.0769L8.21076%2011.4439C8.08141%2011.5735%207.90581%2011.6463%207.72268%2011.6463C7.53956%2011.6463%207.36396%2011.5735%207.23461%2011.4439L6.95076%2011.16L5.68384%209.90001C5.44879%209.66482%205.44879%209.28365%205.68384%209.04847L5.69768%209.04154C5.92615%208.80616%206.30691%208.80616%206.5423%209.04154L7.71922%2010.2185L11.4646%206.47308C11.7%206.24462%2012.0808%206.24462%2012.3092%206.47308L12.3231%206.48693C12.5515%206.72231%2012.5515%207.09616%2012.3231%207.33154ZM13.8392%203.46155H4.15386C3.77309%203.46155%203.46155%203.77309%203.46155%204.16078V13.8462C3.46155%2014.2269%203.77309%2014.5385%204.15386%2014.5385H13.8392C14.2269%2014.5385%2014.5385%2014.2269%2014.5385%2013.8462V4.16078C14.5385%203.77309%2014.2269%203.46155%2013.8392%203.46155Z%22%20fill%3D%22%23012B30%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                ) : null}
              </_Builtin.Block>
              {isValuesNotSpecified ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "disclamier-wrappers")}
                  data-w-id="20f0f4b6-58f6-e191-93a6-4dfba338d8ba"
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.5%2012C2.46%2012%200%209.54%200%206.5C0%203.46%202.46%201%205.5%201C8.54%201%2011%203.46%2011%206.5C11%209.54%208.54%2012%205.5%2012ZM5%209.5C5%209.78%205.22%2010%205.5%2010C5.78%2010%206%209.78%206%209.5V6.5C6%206.22%205.78%206%205.5%206C5.22%206%205%206.22%205%206.5V9.5ZM5.5%203C4.95%203%204.5%203.45%204.5%204C4.5%204.55%204.95%205%205.5%205C6.05%205%206.5%204.55%206.5%204C6.5%203.45%206.05%203%205.5%203Z%22%20fill%3D%22%23FFB057%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "disclaimer-hover-card")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm")}
                  tag="div"
                >
                  {
                    "It appears that you haven't specified the benefits in the company profile. The AI will now generate them randomly."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-kale-600")}
              tag="div"
            >
              {textLabel3}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-rt-generate-btn-relative")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "content-11", "active")}
          data-w-id="c81386e0-d400-0eb4-a15a-0239abc23f87"
          tag="div"
          {...onClickGenerate}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "vectors-wrapper-55")}
            loading="lazy"
            width="auto"
            height="auto"
            alt="__wf_reserved_inherit"
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890239_glitter.svg"
          />
          <_Builtin.Block className={_utils.cx(_styles, "label-5")} tag="div">
            {"Generate"}
          </_Builtin.Block>
        </_Builtin.Block>
        {isGenerateDisable ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "content-11", "disable")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "vectors-wrapper-55", "disable")}
              loading="lazy"
              width="auto"
              height="auto"
              alt="__wf_reserved_inherit"
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890239_glitter.svg"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "label-5", "disable")}
              tag="div"
            >
              {"Generate"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
