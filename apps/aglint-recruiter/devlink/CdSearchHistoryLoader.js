"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CdSearchHistoryLoader.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1536":{"id":"e-1536","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-504","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1537"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706766476084},"e-1537":{"id":"e-1537","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-505","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1536"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c41adfbc-d6ae-0c69-8c9b-ea0c5352da5f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706766476086},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-504":{"id":"a-504","title":"Candidate History Hover in","actionItemGroups":[{"actionItems":[{"id":"a-504-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":0,"unit":""}},{"id":"a-504-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"none"}}]},{"actionItems":[{"id":"a-504-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"flex"}},{"id":"a-504-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699006004764},"a-505":{"id":"a-505","title":"Candidate History Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-505-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":0,"unit":""}},{"id":"a-505-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699006004764},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CdSearchHistoryLoader({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candidate-history-card")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-width-100")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-item")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "search-by-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-width-20")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-item")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-width-40")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-item")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "delete-icons-history")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2213%22%20height%3D%2215%22%20viewbox%3D%220%200%2013%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.24414%201.625C5.08008%201.625%204.95247%201.69792%204.86133%201.84375L4.45117%202.5H8.55273L8.14258%201.84375C8.05143%201.69792%207.92383%201.625%207.75977%201.625H5.24414ZM9.5918%202.5H10.877H11.752H12.1895C12.4629%202.51823%2012.6087%202.66406%2012.627%202.9375C12.6087%203.21094%2012.4629%203.35677%2012.1895%203.375H11.6973L10.9863%2013.1367C10.9499%2013.5924%2010.7676%2013.9753%2010.4395%2014.2852C10.1113%2014.5768%209.71029%2014.7318%209.23633%2014.75H3.76758C3.29362%2014.7318%202.89258%2014.5768%202.56445%2014.2852C2.23633%2013.9753%202.05404%2013.5924%202.01758%2013.1367L1.30664%203.375H0.814453C0.541015%203.35677%200.395182%203.21094%200.376953%202.9375C0.395182%202.66406%200.541015%202.51823%200.814453%202.5H1.25195H2.12695H3.41211L4.12305%201.37891C4.39648%200.977864%204.77018%200.768228%205.24414%200.749999H7.75977C8.23372%200.768228%208.60742%200.977864%208.88086%201.37891L9.5918%202.5ZM10.8223%203.375H2.18164L2.89258%2013.0547C2.91081%2013.2917%203.00195%2013.4831%203.16602%2013.6289C3.33008%2013.793%203.5306%2013.875%203.76758%2013.875H9.23633C9.47331%2013.875%209.67383%2013.793%209.83789%2013.6289C10.002%2013.4831%2010.0931%2013.2917%2010.1113%2013.0547L10.8223%203.375Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
