import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssessmentMode.module.css";

export function AssessmentMode({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "assessment_info")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "title_desccription")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Assessment Mode"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {
            "This messages will be shown at the beggining and ending of the message rescpectively"
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "mode_cards")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "assessment_modecard")}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "assesnbt_mode_img")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "mode_name_flex")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.2812%203.9375L10.9922%205.20312L12.7969%207.00781L14.0625%205.71875C14.2812%205.45312%2014.2812%205.1875%2014.0625%204.92188L13.0781%203.9375C12.8125%203.71875%2012.5469%203.71875%2012.2812%203.9375ZM10.4531%205.74219L5.32031%2010.875H5.625C5.85938%2010.8906%205.98438%2011.0156%206%2011.25V12H6.75C6.98438%2012.0156%207.10938%2012.1406%207.125%2012.375V12.6797L12.2578%207.54688L10.4531%205.74219ZM4.57031%2011.9062L3.9375%2014.0625L6.09375%2013.4297C6.20312%2013.3984%206.29688%2013.3594%206.375%2013.3125V12.75H5.625C5.39062%2012.7344%205.26562%2012.6094%205.25%2012.375V11.625H4.6875C4.64062%2011.7031%204.60156%2011.7969%204.57031%2011.9062ZM13.5938%203.39844L14.6016%204.40625C14.8516%204.67188%2014.9766%204.97656%2014.9766%205.32031C14.9766%205.67969%2014.8516%205.99219%2014.6016%206.25781L7.26562%2013.5703C7%2013.8516%206.6875%2014.0469%206.32812%2014.1562L3.49219%2014.9766C3.33594%2015.0234%203.21094%2014.9922%203.11719%2014.8828C3.00781%2014.7891%202.97656%2014.6719%203.02344%2014.5312L3.84375%2011.6953C3.95312%2011.3203%204.14062%2011%204.40625%2010.7344L11.7422%203.39844C12.0078%203.14844%2012.3203%203.02344%2012.6797%203.02344C13.0234%203.02344%2013.3281%203.14844%2013.5938%203.39844ZM10.7578%207.75781L7.75781%2010.7578C7.58594%2010.8984%207.41406%2010.8984%207.24219%2010.7578C7.08594%2010.5703%207.08594%2010.3906%207.24219%2010.2188L10.2422%207.21875C10.4141%207.07812%2010.5859%207.07812%2010.7578%207.21875C10.9141%207.39062%2010.9141%207.57031%2010.7578%207.75781Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Classic"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600", "relative_2")}
            tag="div"
          >
            {
              "Candidates will be presented with questions either in written form or with available options, and they are required to respond by typing their answers or selecting from the provided options."
            }
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "is_active_bg_blue")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "assessment_modecard")}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "assesnbt_mode_img")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "mode_name_flex")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2219%22%20height%3D%2218%22%20viewBox%3D%220%200%2019%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11%205.25C10.9844%204.82812%2010.8359%204.47656%2010.5547%204.19531C10.2734%203.91406%209.92188%203.76563%209.5%203.75C9.07812%203.76563%208.72656%203.91406%208.44531%204.19531C8.16406%204.47656%208.01562%204.82812%208%205.25V9C8.01562%209.42188%208.16406%209.77344%208.44531%2010.0547C8.72656%2010.3359%209.07812%2010.4844%209.5%2010.5C9.92188%2010.4844%2010.2734%2010.3359%2010.5547%2010.0547C10.8359%209.77344%2010.9844%209.42188%2011%209V5.25ZM7.25%205.25C7.26562%204.60938%207.48438%204.07812%207.90625%203.65625C8.32812%203.23438%208.85938%203.01563%209.5%203C10.1406%203.01563%2010.6719%203.23438%2011.0938%203.65625C11.5156%204.07812%2011.7344%204.60938%2011.75%205.25V9C11.7344%209.64062%2011.5156%2010.1719%2011.0938%2010.5938C10.6719%2011.0156%2010.1406%2011.2344%209.5%2011.25C8.85938%2011.2344%208.32812%2011.0156%207.90625%2010.5938C7.48438%2010.1719%207.26562%209.64062%207.25%209V5.25ZM6.5%207.875V9C6.51562%209.84375%206.80469%2010.5547%207.36719%2011.1328C7.94531%2011.6953%208.65625%2011.9844%209.5%2012C10.3438%2011.9844%2011.0547%2011.6953%2011.6328%2011.1328C12.1953%2010.5547%2012.4844%209.84375%2012.5%209V7.875C12.5156%207.64062%2012.6406%207.51562%2012.875%207.5C13.1094%207.51562%2013.2344%207.64062%2013.25%207.875V9C13.2344%2010%2012.9062%2010.8438%2012.2656%2011.5312C11.6406%2012.2188%2010.8438%2012.6172%209.875%2012.7266V14.25H11.375C11.6094%2014.2656%2011.7344%2014.3906%2011.75%2014.625C11.7344%2014.8594%2011.6094%2014.9844%2011.375%2015H9.5H7.625C7.39062%2014.9844%207.26562%2014.8594%207.25%2014.625C7.26562%2014.3906%207.39062%2014.2656%207.625%2014.25H9.125V12.7266C8.15625%2012.6172%207.35938%2012.2188%206.73438%2011.5312C6.09375%2010.8438%205.76562%2010%205.75%209V7.875C5.76562%207.64062%205.89062%207.51562%206.125%207.5C6.35938%207.51562%206.48438%207.64062%206.5%207.875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Verbal"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600", "relative_2")}
            tag="div"
          >
            {
              "Candidates will be verbally presented with questions, and they must respond verbally by speaking their answers to each question."
            }
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "is_active_bg_blue")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
