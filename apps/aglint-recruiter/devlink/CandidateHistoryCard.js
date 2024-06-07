"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CandidateHistoryCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1536":{"id":"e-1536","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-504","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1537"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706766476084},"e-1537":{"id":"e-1537","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-505","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1536"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706766476086}},"actionLists":{"a-504":{"id":"a-504","title":"Candidate History Hover in","actionItemGroups":[{"actionItems":[{"id":"a-504-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":0,"unit":""}},{"id":"a-504-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"none"}}]},{"actionItems":[{"id":"a-504-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"flex"}},{"id":"a-504-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699006004764},"a-505":{"id":"a-505","title":"Candidate History Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-505-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":0,"unit":""}},{"id":"a-505-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699006004764}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateHistoryCard({
  as: _Component = _Builtin.Block,
  textHeader = "Software Enginner in Texas with 6 to 8 years experience",
  textPosted = "a few seconds ago",
  isSearchByJobVisible = true,
  isSearchByTypeVisible = false,
  onClickDelete = {},
  onClickCard = {},
  textCategory = "My Candidates",
  colorPropsCategory = {},
  onClickKebab = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candidate-history-card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "chc-header-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "chc-text-wrap")}
          tag="div"
        >
          <Text content={textHeader} />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chc-three-dot-wrap")}
          data-w-id="c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f"
          tag="div"
          {...onClickKebab}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%2013.25C10.6667%2013.2708%2011.1667%2013.5625%2011.5%2014.125C11.8333%2014.7083%2011.8333%2015.2917%2011.5%2015.875C11.1667%2016.4375%2010.6667%2016.7292%2010%2016.75C9.33333%2016.7292%208.83333%2016.4375%208.5%2015.875C8.16667%2015.2917%208.16667%2014.7083%208.5%2014.125C8.83333%2013.5625%209.33333%2013.2708%2010%2013.25ZM10%208.25C10.6667%208.27083%2011.1667%208.5625%2011.5%209.125C11.8333%209.70833%2011.8333%2010.2917%2011.5%2010.875C11.1667%2011.4375%2010.6667%2011.7292%2010%2011.75C9.33333%2011.7292%208.83333%2011.4375%208.5%2010.875C8.16667%2010.2917%208.16667%209.70833%208.5%209.125C8.83333%208.5625%209.33333%208.27083%2010%208.25ZM11.75%205C11.7292%205.66667%2011.4375%206.16667%2010.875%206.5C10.2917%206.83333%209.70833%206.83333%209.125%206.5C8.5625%206.16667%208.27083%205.66667%208.25%205C8.27083%204.33333%208.5625%203.83333%209.125%203.5C9.70833%203.16667%2010.2917%203.16667%2010.875%203.5C11.4375%203.83333%2011.7292%204.33333%2011.75%205Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "delete-icons-history")}
            tag="div"
            {...onClickDelete}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2211%22%20height%3D%2213%22%20viewbox%3D%220%200%2013%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.24414%201.625C5.08008%201.625%204.95247%201.69792%204.86133%201.84375L4.45117%202.5H8.55273L8.14258%201.84375C8.05143%201.69792%207.92383%201.625%207.75977%201.625H5.24414ZM9.5918%202.5H10.877H11.752H12.1895C12.4629%202.51823%2012.6087%202.66406%2012.627%202.9375C12.6087%203.21094%2012.4629%203.35677%2012.1895%203.375H11.6973L10.9863%2013.1367C10.9499%2013.5924%2010.7676%2013.9753%2010.4395%2014.2852C10.1113%2014.5768%209.71029%2014.7318%209.23633%2014.75H3.76758C3.29362%2014.7318%202.89258%2014.5768%202.56445%2014.2852C2.23633%2013.9753%202.05404%2013.5924%202.01758%2013.1367L1.30664%203.375H0.814453C0.541015%203.35677%200.395182%203.21094%200.376953%202.9375C0.395182%202.66406%200.541015%202.51823%200.814453%202.5H1.25195H2.12695H3.41211L4.12305%201.37891C4.39648%200.977864%204.77018%200.768228%205.24414%200.749999H7.75977C8.23372%200.768228%208.60742%200.977864%208.88086%201.37891L9.5918%202.5ZM10.8223%203.375H2.18164L2.89258%2013.0547C2.91081%2013.2917%203.00195%2013.4831%203.16602%2013.6289C3.33008%2013.793%203.5306%2013.875%203.76758%2013.875H9.23633C9.47331%2013.875%209.67383%2013.793%209.83789%2013.6289C10.002%2013.4831%2010.0931%2013.2917%2010.1113%2013.0547L10.8223%203.375Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <Text size="1" color="error" content="Delete" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "search-by-wrap")}
        tag="div"
      >
        <Text content={textPosted} size="1" color="neutral" />
        <_Builtin.Block
          className={_utils.cx(_styles, "search-wrap-pill")}
          tag="div"
        >
          {isSearchByJobVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "search-by-job")}
              tag="div"
              {...colorPropsCategory}
            >
              <Text content={textCategory} size="1" />
            </_Builtin.Block>
          ) : null}
          {isSearchByTypeVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "search-by-typing")}
              tag="div"
            >
              <Text size="1" content="Search by typing" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
