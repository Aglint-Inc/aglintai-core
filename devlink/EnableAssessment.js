import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./EnableAssessment.module.css";

export function EnableAssessment({
  as: _Component = _Builtin.Block,
  onClickEnableAssessment = {},
  isAddJob = true,
  onClickProceed = {},
  isProceedDisable = true,
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "enable-assessment-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "enable-header")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.03%206H8.52L10.48%202.28C10.54%202.13%2010.47%202%2010.31%202H7.39C7.23%202%207.05%202.13%206.99%202.28L5.53%205.68C5.46%205.84%205.53%206%205.69%206H7L5.58%2010.07C5.47%2010.36%205.55%2010.61%205.92%2010.28L10.05%206.39C10.28%206.16%2010.27%206%2010.03%206ZM3.99995%2014.7929L7.79289%2011H15V1H1V11H4V11.5L3.99995%2014.7929ZM3%2012H1C0.443858%2012%200%2011.5561%200%2011V1C0%200.443858%200.443858%200%201%200H15C15.5561%200%2016%200.443858%2016%201V11C16%2011.5561%2015.5561%2012%2015%2012H8.20711L4.70005%2015.507C4.41435%2015.7871%203.98918%2015.87%203.6192%2015.7177C3.24922%2015.5653%203.00567%2015.2071%203%2014.8V12Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Enable AI powered assesment for the candidates"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600", "mt-12")}
          tag="div"
        >
          {
            "By utilizing the AI-powered assessment, you can send assessment to candidates and generate a score reflecting their proficiency. This assessment score allows you to rank candidates, aiding in identifying the most suitable candidate for the specified position."
          }
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "enable-assessment-button-wrap")}
          tag="div"
          {...onClickEnableAssessment}
        >
          <ButtonOutlinedRegular
            textLabel={
              <>
                {"Enable Assessment"}
                <br />
              </>
            }
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
