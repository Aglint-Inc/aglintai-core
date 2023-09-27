import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./GenerateJobDescAi.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1244":{"id":"e-1244","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-429","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1245"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7f6a1452-58ba-ecb8-e3ce-3882e6484f94","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7f6a1452-58ba-ecb8-e3ce-3882e6484f94","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695718442191},"e-1245":{"id":"e-1245","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-430","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1244"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7f6a1452-58ba-ecb8-e3ce-3882e6484f94","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7f6a1452-58ba-ecb8-e3ce-3882e6484f94","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695718442196}},"actionLists":{"a-429":{"id":"a-429","title":"generate-question open","actionItemGroups":[{"actionItems":[{"id":"a-429-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".cj-rt-generate-block-2","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d6"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-429-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".drop-icon-wrapperss","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d2"]},"zValue":-180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-429-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outExpo","duration":700,"target":{"useEventTarget":"PARENT","selector":".cj-rt-generate-block-2","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d6"]},"heightValue":36,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-429-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".drop-icon-wrapperss","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d2"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695718445992},"a-430":{"id":"a-430","title":"generate-question close","actionItemGroups":[{"actionItems":[{"id":"a-430-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"outExpo","duration":700,"target":{"useEventTarget":"PARENT","selector":".cj-rt-generate-block-2","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d6"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-430-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".drop-icon-wrapperss","selectorGuids":["47e4e0ce-5869-d0d9-c3fc-dcb758b474d2"]},"zValue":-180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695718445992}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cj-rt-generate-block-2")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-336")}
        data-w-id="7f6a1452-58ba-ecb8-e3ce-3882e6484f94"
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-kale-800-2")}
          tag="div"
        >
          {"Generate job description with AI"}
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
            <_Builtin.Block
              className={_utils.cx(_styles, "checkbox-border")}
              tag="div"
              {...onClickCompanyDdetailsCheck}
            >
              {isCompanyDetailsChecked ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "add-icon")}
                  value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.3231%207.33154L8.57768%2011.0769L8.21076%2011.4439C8.08141%2011.5735%207.90581%2011.6463%207.72268%2011.6463C7.53956%2011.6463%207.36396%2011.5735%207.23461%2011.4439L6.95076%2011.16L5.68384%209.90001C5.44879%209.66482%205.44879%209.28365%205.68384%209.04847L5.69768%209.04154C5.92615%208.80616%206.30691%208.80616%206.5423%209.04154L7.71922%2010.2185L11.4646%206.47308C11.7%206.24462%2012.0808%206.24462%2012.3092%206.47308L12.3231%206.48693C12.5515%206.72231%2012.5515%207.09616%2012.3231%207.33154ZM13.8392%203.46155H4.15386C3.77309%203.46155%203.46155%203.77309%203.46155%204.16078V13.8462C3.46155%2014.2269%203.77309%2014.5385%204.15386%2014.5385H13.8392C14.2269%2014.5385%2014.5385%2014.2269%2014.5385%2013.8462V4.16078C14.5385%203.77309%2014.2269%203.46155%2013.8392%203.46155Z%22%20fill%3D%22%23012B30%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-kale-600")}
              tag="div"
            >
              {"Use Company details from company profile"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "row-checkbox-ai")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "checkbox-border")}
              tag="div"
              {...onClickBenefitsCheck}
            >
              {isBenefitsChecked ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "add-icon")}
                  value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.3231%207.33154L8.57768%2011.0769L8.21076%2011.4439C8.08141%2011.5735%207.90581%2011.6463%207.72268%2011.6463C7.53956%2011.6463%207.36396%2011.5735%207.23461%2011.4439L6.95076%2011.16L5.68384%209.90001C5.44879%209.66482%205.44879%209.28365%205.68384%209.04847L5.69768%209.04154C5.92615%208.80616%206.30691%208.80616%206.5423%209.04154L7.71922%2010.2185L11.4646%206.47308C11.7%206.24462%2012.0808%206.24462%2012.3092%206.47308L12.3231%206.48693C12.5515%206.72231%2012.5515%207.09616%2012.3231%207.33154ZM13.8392%203.46155H4.15386C3.77309%203.46155%203.46155%203.77309%203.46155%204.16078V13.8462C3.46155%2014.2269%203.77309%2014.5385%204.15386%2014.5385H13.8392C14.2269%2014.5385%2014.5385%2014.2269%2014.5385%2013.8462V4.16078C14.5385%203.77309%2014.2269%203.46155%2013.8392%203.46155Z%22%20fill%3D%22%23012B30%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-kale-600")}
              tag="div"
            >
              {"Use benefits from company profile"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "row-checkbox-ai")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "checkbox-border")}
              tag="div"
              {...onClickValuesCheck}
            >
              {isValuesChecked ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "add-icon")}
                  value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.3231%207.33154L8.57768%2011.0769L8.21076%2011.4439C8.08141%2011.5735%207.90581%2011.6463%207.72268%2011.6463C7.53956%2011.6463%207.36396%2011.5735%207.23461%2011.4439L6.95076%2011.16L5.68384%209.90001C5.44879%209.66482%205.44879%209.28365%205.68384%209.04847L5.69768%209.04154C5.92615%208.80616%206.30691%208.80616%206.5423%209.04154L7.71922%2010.2185L11.4646%206.47308C11.7%206.24462%2012.0808%206.24462%2012.3092%206.47308L12.3231%206.48693C12.5515%206.72231%2012.5515%207.09616%2012.3231%207.33154ZM13.8392%203.46155H4.15386C3.77309%203.46155%203.46155%203.77309%203.46155%204.16078V13.8462C3.46155%2014.2269%203.77309%2014.5385%204.15386%2014.5385H13.8392C14.2269%2014.5385%2014.5385%2014.2269%2014.5385%2013.8462V4.16078C14.5385%203.77309%2014.2269%203.46155%2013.8392%203.46155Z%22%20fill%3D%22%23012B30%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-kale-600")}
              tag="div"
            >
              {"Use values from company profile"}
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
