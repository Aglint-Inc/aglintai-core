import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SignupSlider.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-826":{"id":"e-826","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-345","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-827"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"},"targets":[{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684648206},"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390}},"actionLists":{"a-345":{"id":"a-345","title":"login-[open]","actionItemGroups":[{"actionItems":[{"id":"a-345-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-345-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-345-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":"flex"}}]},{"actionItems":[{"id":"a-345-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684755830},"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SignupSlider({
  as: _Component = _Builtin.Block,
  slotRightSlider,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-258")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "auth-wrapper")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "join-us-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "auth-left-wrapper")}
            id={_utils.cx(
              _styles,
              "w-node-af2c0f8a-d69c-130e-d1d1-a38a2d802199-2d802196"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "auth-icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%22120%22%20height%3D%2229%22%20viewBox%3D%220%200%2080%2019%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2646_2561)%22%3E%0A%3Cpath%20d%3D%22M15.1242%208.31983C13.0646%207.80372%2012.0324%207.55045%2011.3204%206.83841C10.6084%206.1216%2010.3552%205.09416%209.83908%203.03452L9.07928%200L8.31949%203.03452C7.80341%205.09416%207.55014%206.12638%206.83813%206.83841C6.12135%207.55045%205.09396%207.80372%203.03439%208.31983L0%209.07965L3.03439%209.83948C5.09396%2010.3556%206.12613%2010.6089%206.83813%2011.3209C7.55014%2012.0377%207.80341%2013.0651%208.31949%2015.1248L9.07928%2018.1593L9.83908%2015.1248C10.3552%2013.0651%2010.6084%2012.0329%2011.3204%2011.3209C12.0372%2010.6089%2013.0646%2010.3556%2015.1242%209.83948L18.1586%209.07965L15.1242%208.31983Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M27.5797%2015.2552C26.9388%2015.2552%2026.3406%2015.1412%2025.7852%2014.9133C25.244%2014.6712%2024.8025%2014.3223%2024.4607%2013.8665C24.1331%2013.3965%2023.9693%2012.8125%2023.9693%2012.1147C23.9693%2011.1177%2024.3182%2010.3201%2025.0161%209.72191C25.7282%209.12372%2026.775%208.82462%2028.1565%208.82462H31.1473V8.54689C31.1473%207.92022%2030.9693%207.4787%2030.6132%207.22233C30.2714%206.96596%2029.5735%206.83778%2028.5196%206.83778C27.366%206.83778%2026.2552%207.01581%2025.187%207.37188V5.34231C25.657%205.15715%2026.2267%205.00761%2026.896%204.89366C27.5797%204.76548%2028.3202%204.70139%2029.1178%204.70139C30.6417%204.70139%2031.8167%205.01473%2032.6427%205.6414C33.483%206.25383%2033.9031%207.24369%2033.9031%208.61098V15.0415H31.4036L31.2541%2014.1229C30.8553%2014.4789%2030.364%2014.7567%2029.7801%2014.9561C29.1961%2015.1555%2028.4627%2015.2552%2027.5797%2015.2552ZM28.3701%2013.3538C29.011%2013.3538%2029.5664%2013.2469%2030.0364%2013.0333C30.5064%2012.8197%2030.8767%2012.5491%2031.1473%2012.2215V10.6192H28.2206C27.0954%2010.6192%2026.5329%2011.0821%2026.5329%2012.0078C26.5329%2012.9051%2027.1453%2013.3538%2028.3701%2013.3538Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M40.7117%2018.8016C39.9569%2018.8016%2039.1807%2018.7517%2038.3832%2018.652C37.5999%2018.5523%2036.9376%2018.4099%2036.3964%2018.2247V16.067C36.9661%2016.2521%2037.6355%2016.3946%2038.4045%2016.4943C39.1736%2016.6082%2039.8928%2016.6652%2040.5622%2016.6652C41.5449%2016.6652%2042.257%2016.6082%2042.6985%2016.4943C43.14%2016.3946%2043.3608%2016.2094%2043.3608%2015.9388C43.3608%2015.7109%2043.2611%2015.5542%2043.0617%2015.4688C42.8765%2015.3833%2042.4778%2015.3406%2041.8653%2015.3406H39.1095C37.3008%2015.3406%2036.3964%2014.6712%2036.3964%2013.3324C36.3964%2012.9194%2036.5103%2012.5419%2036.7382%2012.2001C36.9661%2011.8583%2037.3293%2011.5877%2037.8277%2011.3883C36.6741%2010.8043%2036.0973%209.8216%2036.0973%208.44007C36.0973%207.12975%2036.5032%206.18262%2037.315%205.59867C38.1268%205.00048%2039.3303%204.70139%2040.9254%204.70139C41.2529%204.70139%2041.609%204.72988%2041.9935%204.78685C42.3923%204.82957%2042.6914%204.8723%2042.8908%204.91503H46.6934L46.6293%206.73096H45.0271C45.4686%207.144%2045.6893%207.72082%2045.6893%208.46144C45.6893%209.50115%2045.3618%2010.3343%2044.7066%2010.961C44.0515%2011.5734%2043.083%2011.8797%2041.8013%2011.8797C41.5734%2011.8797%2041.3526%2011.8725%2041.139%2011.8583C40.9396%2011.8298%2040.7331%2011.8013%2040.5195%2011.7728C40.0922%2011.8298%2039.729%2011.9295%2039.43%2012.0719C39.1451%2012.2144%2039.0027%2012.4066%2039.0027%2012.6488C39.0027%2012.9763%2039.2947%2013.1401%2039.8786%2013.1401H42.7412C43.7667%2013.1401%2044.5571%2013.3751%2045.1125%2013.8451C45.668%2014.3009%2045.9457%2014.9703%2045.9457%2015.8533C45.9457%2016.8503%2045.4971%2017.5909%2044.5998%2018.0752C43.7026%2018.5594%2042.4065%2018.8016%2040.7117%2018.8016ZM40.9467%2010.256C41.8013%2010.256%2042.3923%2010.1136%2042.7199%209.82873C43.0617%209.52963%2043.2326%209.03114%2043.2326%208.33325C43.2326%207.63537%2043.0617%207.12975%2042.7199%206.81642C42.3923%206.50308%2041.8013%206.34641%2040.9467%206.34641C40.1349%206.34641%2039.551%206.50308%2039.195%206.81642C38.8389%207.11551%2038.6609%207.62112%2038.6609%208.33325C38.6609%208.98841%2038.8247%209.47266%2039.1522%209.786C39.4941%2010.0993%2040.0922%2010.256%2040.9467%2010.256Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M51.4685%2015.2552C50.4858%2015.2552%2049.7666%2015.0273%2049.3109%2014.5715C48.8694%2014.1157%2048.6486%2013.3894%2048.6486%2012.3924V0.642249H51.5326V12.1574C51.5326%2012.5135%2051.6038%2012.7627%2051.7462%2012.9051C51.8887%2013.0333%2052.0952%2013.0974%2052.3658%2013.0974C52.7361%2013.0974%2053.0707%2013.0476%2053.3698%2012.9479V14.9347C52.8286%2015.1483%2052.1949%2015.2552%2051.4685%2015.2552Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M55.1792%203.05637V0.791796H58.3195V3.05637H55.1792ZM55.4142%2015.0415V7.05142H53.8974L54.1538%204.91503H58.2982V15.0415H55.4142Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M60.9674%2015.0415V4.91503H63.6378L63.7446%205.8764C64.1576%205.56307%2064.6774%205.29246%2065.3041%205.06458C65.945%204.82245%2066.6143%204.70139%2067.3122%204.70139C68.651%204.70139%2069.6265%205.01473%2070.2389%205.6414C70.8513%206.26808%2071.1576%207.23657%2071.1576%208.54689V15.0415H68.2735V8.69644C68.2735%208.01279%2068.1311%207.52855%2067.8463%207.24369C67.5757%206.95884%2067.063%206.81642%2066.3081%206.81642C65.8666%206.81642%2065.418%206.91611%2064.9623%207.11551C64.5208%207.31491%2064.1505%207.56415%2063.8514%207.86325V15.0415H60.9674Z%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M77.7355%2015.2552C76.5677%2015.2552%2075.6989%2014.9489%2075.1292%2014.3365C74.5738%2013.7241%2074.2961%2012.8909%2074.2961%2011.8369V7.13687H72.8647V4.91503H74.2961V2.73591L77.1801%201.88135V4.91503H79.7436L79.5727%207.13687H77.1801V11.6447C77.1801%2012.2001%2077.3083%2012.5847%2077.5646%2012.7983C77.821%2012.9977%2078.2197%2013.0974%2078.7609%2013.0974C79.1597%2013.0974%2079.5727%2013.0262%2080%2012.8838V14.8706C79.6867%2014.9988%2079.3449%2015.0914%2078.9746%2015.1483C78.6043%2015.2195%2078.1913%2015.2552%2077.7355%2015.2552Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_2646_2561%22%3E%0A%3Crect%20width%3D%2280%22%20height%3D%2218.8016%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E" />
            </_Builtin.Block>
            <_Builtin.SliderWrapper
              className={_utils.cx(_styles, "auth-slider")}
              navSpacing={3}
              navShadow={false}
              autoplay={true}
              delay={4000}
              iconArrows={true}
              animation="slide"
              navNumbers={true}
              easing="ease"
              navRound={true}
              hideArrows={false}
              disableSwipe={false}
              duration={500}
              infinite={true}
              autoMax={0}
              navInvert={false}
            >
              <_Builtin.SliderMask>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Aglint's candidate screening tool has been a game-changer for our hiring process. It not only slashed our screening time in half but also significantly improved the quality of candidates we interview. A must-have for any busy HR team!"
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "fw-semibold")}
                            tag="div"
                          >
                            {"Sarah Lee"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-md",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Recruiter, EliteRecruit Agency"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890202_9b293bfefab6eb73a37b2d3b8de37b30.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "With Aglint, we've cut our candidate screening time by 50% while boosting the caliber of applicants. An indispensable tool for HR efficiency!"
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Sarah Lee"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Recruiter, EliteRecruit Agency"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890205_5cc2627731d6bb27a233e9d1e4fc90f7.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Aglint delivers where it matters: saving time without sacrificing quality. Our team couldn't be happier with the high-caliber candidates."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Sarah Lee"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Recruiter, EliteRecruit Agency"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089020d_33bc4fe49822f82b171f0daf6928f26e-min.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Aglint has transformed our hiring workflow, offering us both speed and precision. It's the perfect blend for finding the best talent quickly."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Raj Patel"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Hiring Manager, GreenWorld Renewables"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089020c_76f9501969c1f1d3f67bfa5f8cb9acc8-min.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Streamlined and effective, Aglint makes candidate screening a breeze, freeing up our time without compromising on quality."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Raj Patel"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Hiring Manager, GreenWorld Renewables"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089020c_76f9501969c1f1d3f67bfa5f8cb9acc8-min.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
                <_Builtin.SliderSlide tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "auth-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "auth-quote-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "flex-vertical-left",
                          "gap-32"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "quote-icon-block")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed-icon")}
                            value="%3Csvg%20width%3D%2244%22%20height%3D%2235%22%20viewbox%3D%220%200%2044%2035%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M37.7734%200.181918C39.7266%200.181918%2040.7031%200.572543%2040.7031%201.35379C40.7031%201.68861%2040.3962%201.96763%2039.7824%202.19085C34.6484%204.25558%2032.0815%208.27344%2032.0815%2014.2444C32.8627%2014.1328%2033.4208%2014.077%2033.7556%2014.077C40.452%2014.077%2043.8002%2017.4252%2043.8002%2024.1217C43.8002%2030.7623%2040.452%2034.0826%2033.7556%2034.0826C25.9989%2034.0826%2022.1205%2029.8136%2022.1205%2021.2757C22.1205%2012.0681%2025.8315%205.45536%2033.2533%201.4375C34.8158%200.600445%2036.3225%200.181918%2037.7734%200.181918ZM15.9263%200.433034C17.8795%200.433034%2018.856%200.823659%2018.856%201.60491C18.856%201.93973%2018.5491%202.21875%2017.9353%202.44196C12.8013%204.50669%2010.2344%208.52455%2010.2344%2014.4955C11.0156%2014.3839%2011.5737%2014.3281%2011.9085%2014.3281C18.6049%2014.3281%2021.9531%2017.6763%2021.9531%2024.3728C21.9531%2031.0134%2018.6049%2034.3337%2011.9085%2034.3337C4.15179%2034.3337%200.273438%2030.0647%200.273438%2021.5268C0.273438%2012.3192%203.98438%205.70647%2011.4063%201.68861C12.9688%200.851561%2014.4754%200.433034%2015.9263%200.433034Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Paragraph
                          className={_utils.cx(
                            _styles,
                            "text-xl",
                            "fw-semibold",
                            "text-white"
                          )}
                        >
                          {
                            "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "ju-profile-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(
                            _styles,
                            "join-us-profile-image"
                          )}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt=""
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890204_Rectangle%20344.png"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-255")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Raj Patel"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "text-sm",
                              "fw-semibold"
                            )}
                            tag="div"
                          >
                            {"Hiring Manager, GreenWorld Renewables"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Image
                      className={_utils.cx(_styles, "bg-image")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890207_8c1682abd5555cad7cc95b890ef191e3-min.jpg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "bg-image-overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.SliderSlide>
              </_Builtin.SliderMask>
              <_Builtin.SliderArrow
                className={_utils.cx(_styles, "hide")}
                dir="left"
              >
                <_Builtin.Icon
                  widget={{
                    type: "icon",
                    icon: "slider-left",
                  }}
                />
              </_Builtin.SliderArrow>
              <_Builtin.SliderArrow
                className={_utils.cx(_styles, "hide")}
                dir="right"
              >
                <_Builtin.Icon
                  widget={{
                    type: "icon",
                    icon: "slider-right",
                  }}
                />
              </_Builtin.SliderArrow>
              <_Builtin.SliderNav className={_utils.cx(_styles, "hide")} />
            </_Builtin.SliderWrapper>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "auth-right-wrapper")}
            tag="div"
          >
            {slotRightSlider ?? (
              <>
                <_Builtin.Block
                  className={_utils.cx(_styles, "auth-icon-block", "tab-logo")}
                  tag="div"
                >
                  <_Builtin.Image
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65299bda678f56ba6ba1c434_logo-email-template.svg"
                  />
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "hide")}
                  value="%3Cstyle%3E%0A.auth-right-block%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A.auth-right-block%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%0A%20%20scrollbar-width%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "auth-right-bottom")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "ju-redirect-text",
                      "left-align"
                    )}
                    tag="div"
                  >
                    {"Need help? "}
                    <_Builtin.Link
                      className={_utils.cx(_styles, "ju-redirect-link")}
                      button={false}
                      options={{
                        href: "#",
                      }}
                    >
                      {"Contact Support"}
                    </_Builtin.Link>
                  </_Builtin.Block>
                </_Builtin.Block>
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
