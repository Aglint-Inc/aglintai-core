import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CdSearchHistoryLoader.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1424":{"id":"e-1424","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-504","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1425"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4518954f-c13c-bc6b-3663-60158d8ff7d8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4518954f-c13c-bc6b-3663-60158d8ff7d8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699005864100},"e-1425":{"id":"e-1425","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-505","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1424"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4518954f-c13c-bc6b-3663-60158d8ff7d8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4518954f-c13c-bc6b-3663-60158d8ff7d8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699005864108}},"actionLists":{"a-504":{"id":"a-504","title":"Candidate History Hover in","actionItemGroups":[{"actionItems":[{"id":"a-504-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":0,"unit":""}},{"id":"a-504-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"4518954f-c13c-bc6b-3663-60158d8ff7d8"},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-504-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"none"}}]},{"actionItems":[{"id":"a-504-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":true,"id":"4518954f-c13c-bc6b-3663-60158d8ff7d8"},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-504-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"flex"}},{"id":"a-504-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699006004764},"a-505":{"id":"a-505","title":"Candidate History Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-505-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":true,"id":"4518954f-c13c-bc6b-3663-60158d8ff7d8"},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-505-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":0,"unit":""}},{"id":"a-505-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".delete-icons-history","selectorGuids":["53ee436c-8ecf-71ec-8e3a-c84251c8b998"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699006004764}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
          value="%3Csvg%20width%3D%2213%22%20height%3D%2215%22%20viewBox%3D%220%200%2013%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.24414%201.625C5.08008%201.625%204.95247%201.69792%204.86133%201.84375L4.45117%202.5H8.55273L8.14258%201.84375C8.05143%201.69792%207.92383%201.625%207.75977%201.625H5.24414ZM9.5918%202.5H10.877H11.752H12.1895C12.4629%202.51823%2012.6087%202.66406%2012.627%202.9375C12.6087%203.21094%2012.4629%203.35677%2012.1895%203.375H11.6973L10.9863%2013.1367C10.9499%2013.5924%2010.7676%2013.9753%2010.4395%2014.2852C10.1113%2014.5768%209.71029%2014.7318%209.23633%2014.75H3.76758C3.29362%2014.7318%202.89258%2014.5768%202.56445%2014.2852C2.23633%2013.9753%202.05404%2013.5924%202.01758%2013.1367L1.30664%203.375H0.814453C0.541015%203.35677%200.395182%203.21094%200.376953%202.9375C0.395182%202.66406%200.541015%202.51823%200.814453%202.5H1.25195H2.12695H3.41211L4.12305%201.37891C4.39648%200.977864%204.77018%200.768228%205.24414%200.749999H7.75977C8.23372%200.768228%208.60742%200.977864%208.88086%201.37891L9.5918%202.5ZM10.8223%203.375H2.18164L2.89258%2013.0547C2.91081%2013.2917%203.00195%2013.4831%203.16602%2013.6289C3.33008%2013.793%203.5306%2013.875%203.76758%2013.875H9.23633C9.47331%2013.875%209.67383%2013.793%209.83789%2013.6289C10.002%2013.4831%2010.0931%2013.2917%2010.1113%2013.0547L10.8223%203.375Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
