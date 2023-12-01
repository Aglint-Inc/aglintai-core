import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./Reupload.module.css";

export function Reupload({
  as: _Component = _Builtin.Block,
  onClickReupload = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "unsupported-file-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-612")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2243%22%20height%3D%2238%22%20viewBox%3D%220%200%2043%2038%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21.5002%200.874997C22.7581%200.929684%2023.7151%201.47656%2024.3713%202.51562L42.0901%2032.7031C42.637%2033.7969%2042.637%2034.8906%2042.0901%2035.9844C41.4338%2037.0234%2040.4768%2037.5703%2039.219%2037.625H3.78149C2.52368%2037.5703%201.56665%2037.0234%200.910399%2035.9844C0.363523%2034.8906%200.363523%2033.7969%200.910399%2032.7031L18.7112%202.51562C19.3674%201.47656%2020.2971%200.929684%2021.5002%200.874997ZM21.5002%2011.375C20.2971%2011.4844%2019.6409%2012.1406%2019.5315%2013.3437V22.5312C19.6409%2023.7344%2020.2971%2024.3906%2021.5002%2024.5C22.7034%2024.3906%2023.3596%2023.7344%2023.469%2022.5312V13.3437C23.3596%2012.1406%2022.7034%2011.4844%2021.5002%2011.375ZM24.1252%2029.75C24.1252%2028.9844%2023.8792%2028.3555%2023.387%2027.8633C22.8948%2027.3711%2022.2659%2027.125%2021.5002%2027.125C20.7346%2027.125%2020.1057%2027.3711%2019.6135%2027.8633C19.1213%2028.3555%2018.8752%2028.9844%2018.8752%2029.75C18.8752%2030.5156%2019.1213%2031.1445%2019.6135%2031.6367C20.1057%2032.1289%2020.7346%2032.375%2021.5002%2032.375C22.2659%2032.375%2022.8948%2032.1289%2023.387%2031.6367C23.8792%2031.1445%2024.1252%2030.5156%2024.1252%2029.75Z%22%20fill%3D%22%23F79A3E%22%20style%3D%22fill%3A%23F79A3E%3Bfill%3Acolor(display-p3%200.9686%200.6039%200.2431)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600", "mt-10")}
          tag="div"
        >
          {"The file you've uploaded is in an unsupported format. "}
          <br />
          {"We only support pdf/docx files. Please try uploading again."}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "mt-20")}
          tag="div"
          {...onClickReupload}
        >
          <ButtonOutlinedRegular textLabel="Reupload" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
