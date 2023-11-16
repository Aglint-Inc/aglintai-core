import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { JobPills } from "./JobPills";
import * as _utils from "./utils";
import _styles from "./CandidateFilter.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1468":{"id":"e-1468","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-538","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1469"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"f8c22b46-f0a8-145f-3b5b-c17ae0cf7f39"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700138910580},"e-1469":{"id":"e-1469","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-539","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1468"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"f8c22b46-f0a8-145f-3b5b-c17ae0cf7f39"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700138910582}},"actionLists":{"a-538":{"id":"a-538","title":"Chat Bubble Open","actionItemGroups":[{"actionItems":[{"id":"a-538-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}},{"id":"a-538-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-538-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-538-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-538-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-538-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-538-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":0,"unit":""}},{"id":"a-538-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"f8c22b46-f0a8-145f-3b5b-c17ae0cf7f39"},"xValue":0.95,"yValue":0.95,"locked":true}},{"id":"a-538-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"block"}},{"id":"a-538-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":1,"unit":""}},{"id":"a-538-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"none"}},{"id":"a-538-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":1,"unit":""}},{"id":"a-538-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700132612161},"a-539":{"id":"a-539","title":"Chat Bubble Close","actionItemGroups":[{"actionItems":[{"id":"a-539-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}},{"id":"a-539-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"f8c22b46-f0a8-145f-3b5b-c17ae0cf7f39"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-539-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-539-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-539-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-539-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-539-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-539-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700132612161}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateFilter({
  as: _Component = _Builtin.Block,
  onClickResetFilter = {},
  slotButtonPrimarySmall,
  slotProfileInput,
  slotCurrentJobInput,
  slotJobRole,
  slotLocationInput,
  slotLocationSuggestion,
  slotLanguageInput,
  slotLanguageSuggestion,
  slotMinExperienceInput,
  slotMaxExperienceInput,
  slotUniversityInput,
  slotPreferredCompanyInput,
  slotExcludedCompanyInput,
  slotUniversitySuggestion,
  slotPreferredSuggestion,
  slotExcludedSuggestion,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "filter-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "filter-wrap-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-580")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2213%22%20viewBox%3D%220%200%2015%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.501953%201.71875C0.501953%201.40885%200.611328%201.15365%200.830078%200.953124C1.0306%200.734374%201.28581%200.624999%201.5957%200.624999H13.4355C13.7272%200.624999%2013.9733%200.734374%2014.1738%200.953124C14.3926%201.15365%2014.502%201.40885%2014.502%201.71875C14.502%201.97396%2014.4199%202.20182%2014.2559%202.40234L9.25195%208.44531V11.9453C9.25195%2012.2005%209.16081%2012.4193%208.97852%2012.6016C8.79622%2012.7839%208.57747%2012.875%208.32227%2012.875C8.12174%2012.875%207.93034%2012.8112%207.74805%2012.6836L6.08008%2011.3984C5.86133%2011.2161%205.75195%2010.9792%205.75195%2010.6875V8.44531L0.748046%202.40234C0.583984%202.20182%200.501953%201.97396%200.501953%201.71875ZM1.5957%201.5C1.4681%201.51823%201.39518%201.59115%201.37695%201.71875C1.37695%201.75521%201.39518%201.79167%201.43164%201.82812L6.51758%208.00781C6.59049%208.08073%206.62695%208.17187%206.62695%208.28125V10.6875L8.29492%2012C8.29492%2012%208.30404%2012%208.32227%2012C8.35872%2012%208.37695%2011.9818%208.37695%2011.9453V8.28125C8.37695%208.17187%208.41341%208.08073%208.48633%208.00781L13.5723%201.82812C13.6087%201.79167%2013.627%201.75521%2013.627%201.71875C13.6087%201.59115%2013.5449%201.51823%2013.4355%201.5H1.5957Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Filters"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "filter-wrap-right")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-600", "cursor-pointer")}
            tag="div"
            {...onClickResetFilter}
          >
            {"Reset filters"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotButtonPrimarySmall}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-581")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-582")}
          id={_utils.cx(
            _styles,
            "w-node-_6f1e8796-5aee-5011-a80d-9e767dcbfafd-7dcbfaf2"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-outer-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Number of profiles(Max limit)"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotProfileInput}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-outer-wrappers")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Current job titles"}</_Builtin.Block>
            <_Builtin.Block tag="div">{slotCurrentJobInput}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-583")}
              tag="div"
            >
              {slotJobRole ?? <JobPills />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-outer-wrappers")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Location"}</_Builtin.Block>
            <_Builtin.Block tag="div">{slotLocationInput}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-583")}
              tag="div"
            >
              {slotLocationSuggestion ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-584")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-blue-800")}
                    tag="div"
                  >
                    {"Software Engineer"}
                  </_Builtin.Block>
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%209.35355C2.84171%209.54882%203.15829%209.54882%203.35355%209.35355L6%206.70711L8.64645%209.35355C8.84171%209.54882%209.15829%209.54882%209.35355%209.35355C9.54882%209.15829%209.54882%208.84171%209.35355%208.64645L6.70711%206L9.35355%203.35355C9.54882%203.15829%209.54882%202.84171%209.35355%202.64645C9.15829%202.45118%208.84171%202.45118%208.64645%202.64645L6%205.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L5.29289%206L2.64645%208.64645C2.45118%208.84171%202.45118%209.15829%202.64645%209.35355Z%22%20fill%3D%22%230F3554%22%20style%3D%22fill%3A%230F3554%3Bfill%3Acolor(display-p3%200.0588%200.2078%200.3294)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-outer-wrappers")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Languages"}</_Builtin.Block>
            <_Builtin.Block tag="div">{slotLanguageInput}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-583")}
              tag="div"
            >
              {slotLanguageSuggestion ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-584")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-blue-800")}
                    tag="div"
                  >
                    {"Software Engineer"}
                  </_Builtin.Block>
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%209.35355C2.84171%209.54882%203.15829%209.54882%203.35355%209.35355L6%206.70711L8.64645%209.35355C8.84171%209.54882%209.15829%209.54882%209.35355%209.35355C9.54882%209.15829%209.54882%208.84171%209.35355%208.64645L6.70711%206L9.35355%203.35355C9.54882%203.15829%209.54882%202.84171%209.35355%202.64645C9.15829%202.45118%208.84171%202.45118%208.64645%202.64645L6%205.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L5.29289%206L2.64645%208.64645C2.45118%208.84171%202.45118%209.15829%202.64645%209.35355Z%22%20fill%3D%22%230F3554%22%20style%3D%22fill%3A%230F3554%3Bfill%3Acolor(display-p3%200.0588%200.2078%200.3294)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-582")}
          id={_utils.cx(
            _styles,
            "w-node-_6f1e8796-5aee-5011-a80d-9e767dcbfb1d-7dcbfaf2"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-outer-wrappers", "py-20")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-585")}
              tag="div"
            >
              <_Builtin.Block
                id={_utils.cx(
                  _styles,
                  "w-node-_6f1e8796-5aee-5011-a80d-9e767dcbfb20-7dcbfaf2"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {"Minimum Experience"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "mt-5")}
                  tag="div"
                >
                  {slotMinExperienceInput}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                id={_utils.cx(
                  _styles,
                  "w-node-_6f1e8796-5aee-5011-a80d-9e767dcbfb24-7dcbfaf2"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {"Maximum Experience"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "mt-5")}
                  tag="div"
                >
                  {slotMaxExperienceInput}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-outer-wrappers")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Universities"}</_Builtin.Block>
            <_Builtin.Block tag="div">{slotUniversityInput}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-583")}
              tag="div"
            >
              {slotUniversitySuggestion ?? <JobPills />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-outer-wrappers")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Companies"}</_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "mt-16")} tag="div">
              {"Prefered Companies"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {slotPreferredCompanyInput}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-583")}
              tag="div"
            >
              {slotPreferredSuggestion ?? <JobPills />}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "mt-13")} tag="div">
              {"Excluded Companies"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {slotExcludedCompanyInput}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-583")}
              tag="div"
            >
              {slotExcludedSuggestion ?? <JobPills />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
