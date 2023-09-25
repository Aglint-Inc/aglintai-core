import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MobileLinkCoach.module.css";

export function MobileLinkCoach({
  as: _Component = _Builtin.Block,
  isCoach = true,
  onClickCoach = {},
  isPro = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav_mainlink_mobile_with-text")}
      tag="div"
      {...onClickCoach}
    >
      <_Builtin.Block className={_utils.cx(_styles, "coach_icon")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.29117%2020.8242L2%2022L3.17581%2016.7088C2.42544%2015.3056%202%2013.7025%202%2012C2%206.47715%206.47715%202%2012%202C17.5228%202%2022%206.47715%2022%2012C22%2017.5228%2017.5228%2022%2012%2022C10.2975%2022%208.6944%2021.5746%207.29117%2020.8242ZM7.58075%2018.711L8.23428%2019.0605C9.38248%2019.6745%2010.6655%2020%2012%2020C16.4183%2020%2020%2016.4183%2020%2012C20%207.58172%2016.4183%204%2012%204C7.58172%204%204%207.58172%204%2012C4%2013.3345%204.32549%2014.6175%204.93949%2015.7657L5.28896%2016.4192L4.63416%2019.3658L7.58075%2018.711ZM7%2012H9C9%2013.6569%2010.3431%2015%2012%2015C13.6569%2015%2015%2013.6569%2015%2012H17C17%2014.7614%2014.7614%2017%2012%2017C9.23858%2017%207%2014.7614%207%2012Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        {isPro ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "pro_badge", "in_mobile")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"pro"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{"Career Coach"}</_Builtin.Block>
      {isCoach ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "mobilelink_active")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.29117%2020.8242L2%2022L3.17581%2016.7088C2.42544%2015.3056%202%2013.7025%202%2012C2%206.47715%206.47715%202%2012%202C17.5228%202%2022%206.47715%2022%2012C22%2017.5228%2017.5228%2022%2012%2022C10.2975%2022%208.6944%2021.5746%207.29117%2020.8242ZM7.58075%2018.711L8.23428%2019.0605C9.38248%2019.6745%2010.6655%2020%2012%2020C16.4183%2020%2020%2016.4183%2020%2012C20%207.58172%2016.4183%204%2012%204C7.58172%204%204%207.58172%204%2012C4%2013.3345%204.32549%2014.6175%204.93949%2015.7657L5.28896%2016.4192L4.63416%2019.3658L7.58075%2018.711ZM7%2012H9C9%2013.6569%2010.3431%2015%2012%2015C13.6569%2015%2015%2013.6569%2015%2012H17C17%2014.7614%2014.7614%2017%2012%2017C9.23858%2017%207%2014.7614%207%2012Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Career Coach"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
