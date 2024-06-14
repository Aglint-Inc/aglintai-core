"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./FeedbackCandidate.module.css";

export function FeedbackCandidate({
  as: _Component = _Builtin.Block,
  slotLogo,
  onClickVerySatisfy = {},
  onClickSatisfy = {},
  onClickNeutral = {},
  onClickNotSatisfied = {},
  isVerySatisfiedActive = false,
  isSatisfiedActive = false,
  isNeutralActive = false,
  isNotSatisfiedActive = false,
  slotFeedbackInput,
  onClickSubmit = {},
  isRatingVisible = true,
  isThankYouVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidate-feedback-page")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "fc-center-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {slotLogo ?? <SlotComp componentNeme="Logo" />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "feedback-box")}
          tag="div"
        >
          {isRatingVisible ? (
            <_Builtin.Block tag="div">
              <Text content="" size="4" />
            </_Builtin.Block>
          ) : null}
          {isRatingVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "feedback-rating-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "rating-item")}
                tag="div"
                {...onClickVerySatisfy}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "rating-item-wrap")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "feedback-image")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/66267cfefea65ac8b79a3522_%F0%9F%98%8D.png"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "relative-1")}
                    tag="div"
                  >
                    <Text weight="" content="Very Satisfied" size="1" />
                  </_Builtin.Block>
                </_Builtin.Block>
                {isVerySatisfiedActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "feedback-rating-active")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "rating-item")}
                tag="div"
                {...onClickSatisfy}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "rating-item-wrap")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "feedback-image")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/66267d72180f0ecc268cad15_%F0%9F%98%81.png"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "relative-1")}
                    tag="div"
                  >
                    <Text weight="" content="Satisfied" size="1" />
                  </_Builtin.Block>
                </_Builtin.Block>
                {isSatisfiedActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "feedback-rating-active")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "rating-item")}
                tag="div"
                {...onClickNeutral}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "rating-item-wrap")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "feedback-image")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/66267d720dfd98d02399ea92_%F0%9F%99%82.png"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "relative-1")}
                    tag="div"
                  >
                    <Text weight="" content="Neutral" size="1" />
                  </_Builtin.Block>
                </_Builtin.Block>
                {isNeutralActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "feedback-rating-active")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "rating-item")}
                tag="div"
                {...onClickNotSatisfied}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "rating-item-wrap")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "feedback-image")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/66267d72948f8fb0fc11f425_%E2%98%B9%EF%B8%8F.png"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "relative-1")}
                    tag="div"
                  >
                    <Text weight="" content="Not satisfied" size="1" />
                  </_Builtin.Block>
                </_Builtin.Block>
                {isNotSatisfiedActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "feedback-rating-active")}
                    tag="div"
                  />
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isRatingVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-feedback-input")}
              tag="div"
            >
              {slotFeedbackInput ?? <SlotComp componentNeme="" />}
            </_Builtin.Block>
          ) : null}
          {isRatingVisible ? (
            <_Builtin.Block tag="div" {...onClickSubmit}>
              <ButtonSolid onClickButton={onClickSubmit} textButton="" />
            </_Builtin.Block>
          ) : null}
          {isThankYouVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "fc-thanks-wrap")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewbox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16%202C13.4583%202.04167%2011.125%202.66667%209%203.875C6.875%205.125%205.16667%206.83333%203.875%209C2.625%2011.2083%202%2013.5417%202%2016C2%2018.4583%202.625%2020.7917%203.875%2023C5.16667%2025.1667%206.875%2026.875%209%2028.125C11.125%2029.3333%2013.4583%2029.9583%2016%2030C18.5417%2029.9583%2020.875%2029.3333%2023%2028.125C25.125%2026.875%2026.8333%2025.1667%2028.125%2023C29.375%2020.7917%2030%2018.4583%2030%2016C30%2013.5417%2029.375%2011.2083%2028.125%209C26.8333%206.83333%2025.125%205.125%2023%203.875C20.875%202.66667%2018.5417%202.04167%2016%202ZM16%2032C13.0833%2031.9583%2010.4167%2031.25%208%2029.875C5.58333%2028.4583%203.625%2026.5%202.125%2024C0.708333%2021.4583%200%2018.7917%200%2016C0%2013.2083%200.708333%2010.5417%202.125%208C3.625%205.5%205.58333%203.54167%208%202.125C10.4167%200.75%2013.0833%200.0416667%2016%200C18.9167%200.0416667%2021.5833%200.75%2024%202.125C26.4167%203.54167%2028.375%205.5%2029.875%208C31.2917%2010.5417%2032%2013.2083%2032%2016C32%2018.7917%2031.2917%2021.4583%2029.875%2024C28.375%2026.5%2026.4167%2028.4583%2024%2029.875C21.5833%2031.25%2018.9167%2031.9583%2016%2032ZM22.6875%2012.6875L14.6875%2020.6875C14.2292%2021.1042%2013.7708%2021.1042%2013.3125%2020.6875L9.3125%2016.6875C8.89583%2016.2292%208.89583%2015.7708%209.3125%2015.3125C9.77083%2014.8958%2010.2292%2014.8958%2010.6875%2015.3125L14%2018.5625L21.3125%2011.3125C21.7708%2010.8958%2022.2292%2010.8958%2022.6875%2011.3125C23.1042%2011.7708%2023.1042%2012.2292%2022.6875%2012.6875Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "fc-thanks-text")}
                tag="div"
              >
                <Text content="Thank you" weight="medium" />
                <Text
                  content="we have received your feedback"
                  weight=""
                  color="neutral"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "feedback-bottom-wrap")}
        tag="div"
      >
        <Text content="Powered By" weight="" size="1" color="neutral" />
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2272%22%20height%3D%2218%22%20viewbox%3D%220%200%2072%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.5198%207.9098C12.6057%207.43018%2011.6465%207.19481%2010.9848%206.53312C10.3231%205.86699%2010.0877%204.9122%209.60812%202.99818L8.90202%200.178223L8.19591%202.99818C7.71629%204.9122%207.48093%205.87143%206.81923%206.53312C6.1531%207.19481%205.1983%207.43018%203.28427%207.9098L0.464294%208.6159L3.28427%209.322C5.1983%209.80161%206.15754%2010.037%206.81923%2010.6987C7.48093%2011.3648%207.71629%2012.3196%208.19591%2014.2336L8.90202%2017.0536L9.60812%2014.2336C10.0877%2012.3196%2010.3231%2011.3604%2010.9848%2010.6987C11.6509%2010.037%2012.6057%209.80161%2014.5198%209.322L17.3397%208.6159L14.5198%207.9098Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M23.1766%2013.7579C22.581%2013.7579%2022.0251%2013.652%2021.509%2013.4403C21.006%2013.2153%2020.5957%2012.891%2020.278%2012.4674C19.9736%2012.0307%2019.8214%2011.488%2019.8214%2010.8395C19.8214%209.91298%2020.1457%209.17179%2020.7942%208.6159C21.456%208.06%2022.4288%207.78206%2023.7127%207.78206H26.4922V7.52396C26.4922%206.9416%2026.3267%206.5313%2025.9958%206.29306C25.6782%206.05482%2025.0296%205.9357%2024.0502%205.9357C22.9781%205.9357%2021.9457%206.10114%2020.9531%206.43203V4.54596C21.3898%204.3739%2021.9193%204.23492%2022.5413%204.12904C23.1766%204.00992%2023.8649%203.95036%2024.6061%203.95036C26.0223%203.95036%2027.1143%204.24154%2027.8819%204.82391C28.6628%205.39304%2029.0533%206.31291%2029.0533%207.58352V13.5594H26.7304L26.5914%2012.7057C26.2208%2013.0366%2025.7642%2013.2947%2025.2216%2013.48C24.6789%2013.6653%2023.9973%2013.7579%2023.1766%2013.7579ZM23.9112%2011.991C24.5068%2011.991%2025.023%2011.8917%2025.4598%2011.6932C25.8966%2011.4946%2026.2407%2011.2432%2026.4922%2010.9387V9.44974H23.7723C22.7266%209.44974%2022.2038%209.87989%2022.2038%2010.7402C22.2038%2011.574%2022.773%2011.991%2023.9112%2011.991Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M35.3808%2017.0536C34.6793%2017.0536%2033.958%2017.0072%2033.2168%2016.9146C32.4888%2016.822%2031.8733%2016.6896%2031.3704%2016.5175V14.5123C31.8998%2014.6844%2032.5219%2014.8168%2033.2366%2014.9094C33.9513%2015.0153%2034.6197%2015.0682%2035.2418%2015.0682C36.1551%2015.0682%2036.8169%2015.0153%2037.2272%2014.9094C37.6375%2014.8168%2037.8426%2014.6447%2037.8426%2014.3932C37.8426%2014.1815%2037.75%2014.0359%2037.5647%2013.9564C37.3926%2013.877%2037.022%2013.8373%2036.4529%2013.8373H33.8918C32.2109%2013.8373%2031.3704%2013.2153%2031.3704%2011.9711C31.3704%2011.5873%2031.4763%2011.2365%2031.688%2010.9189C31.8998%2010.6012%2032.2373%2010.3498%2032.7006%2010.1645C31.6285%209.6218%2031.0924%208.70855%2031.0924%207.4247C31.0924%206.20702%2031.4697%205.32686%2032.2241%204.7842C32.9785%204.22831%2034.0969%203.95036%2035.5793%203.95036C35.8837%203.95036%2036.2146%203.97683%2036.572%204.02977C36.9426%204.06948%2037.2205%204.10919%2037.4058%204.14889H40.9398L40.8802%205.83643H39.3912C39.8015%206.22026%2040.0066%206.7563%2040.0066%207.44455C40.0066%208.41075%2039.7022%209.18503%2039.0934%209.76739C38.4845%2010.3365%2037.5845%2010.6211%2036.3933%2010.6211C36.1815%2010.6211%2035.9764%2010.6145%2035.7779%2010.6012C35.5926%2010.5748%2035.4006%2010.5483%2035.2021%2010.5218C34.805%2010.5748%2034.4675%2010.6674%2034.1896%2010.7998C33.9249%2010.9321%2033.7925%2011.1108%2033.7925%2011.3358C33.7925%2011.6402%2034.0638%2011.7924%2034.6065%2011.7924H37.2669C38.2198%2011.7924%2038.9544%2012.0108%2039.4706%2012.4476C39.9868%2012.8711%2040.2449%2013.4932%2040.2449%2014.3138C40.2449%2015.2403%2039.828%2015.9285%2038.9941%2016.3786C38.1603%2016.8286%2036.9558%2017.0536%2035.3808%2017.0536ZM35.5992%209.11223C36.3933%209.11223%2036.9426%208.97988%2037.247%208.71516C37.5647%208.43722%2037.7235%207.97397%2037.7235%207.32543C37.7235%206.67689%2037.5647%206.20702%2037.247%205.91584C36.9426%205.62466%2036.3933%205.47907%2035.5992%205.47907C34.8447%205.47907%2034.3021%205.62466%2033.9712%205.91584C33.6403%206.19379%2033.4749%206.66365%2033.4749%207.32543C33.4749%207.93427%2033.6271%208.38428%2033.9315%208.67546C34.2491%208.96664%2034.805%209.11223%2035.5992%209.11223Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M45.3775%2013.7579C44.4642%2013.7579%2043.7958%2013.5461%2043.3723%2013.1226C42.962%2012.6991%2042.7568%2012.0241%2042.7568%2011.0976V0.178223H45.437V10.8792C45.437%2011.2101%2045.5032%2011.4417%2045.6356%2011.574C45.7679%2011.6932%2045.9598%2011.7527%2046.2113%2011.7527C46.5554%2011.7527%2046.8665%2011.7064%2047.1444%2011.6138V13.4601C46.6415%2013.6586%2046.0525%2013.7579%2045.3775%2013.7579Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M48.8259%202.42165V0.317196H51.7444V2.42165H48.8259ZM49.0443%2013.5594V6.13423H47.6347L47.873%204.14889H51.7245V13.5594H49.0443Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M54.2051%2013.5594V4.14889H56.6868L56.7861%205.04229C57.1699%204.75111%2057.653%204.49964%2058.2354%204.28787C58.831%204.06286%2059.4531%203.95036%2060.1016%203.95036C61.3458%203.95036%2062.2524%204.24154%2062.8215%204.82391C63.3907%205.40627%2063.6752%206.30629%2063.6752%207.52396V13.5594H60.995V7.66294C60.995%207.02763%2060.8627%206.57762%2060.5979%206.31291C60.3465%206.0482%2059.87%205.91584%2059.1685%205.91584C58.7582%205.91584%2058.3413%206.00849%2057.9177%206.19379C57.5074%206.37909%2057.1633%206.61071%2056.8853%206.88866V13.5594H54.2051Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M69.7884%2013.7579C68.7031%2013.7579%2067.8957%2013.4734%2067.3663%2012.9042C66.8501%2012.3351%2066.592%2011.5608%2066.592%2010.5814V6.21364H65.2618V4.14889H66.592V2.12385L69.2722%201.32972V4.14889H71.6546L71.4958%206.21364H69.2722V10.4027C69.2722%2010.9189%2069.3913%2011.2762%2069.6296%2011.4748C69.8678%2011.6601%2070.2384%2011.7527%2070.7414%2011.7527C71.112%2011.7527%2071.4958%2011.6865%2071.8929%2011.5542V13.4006C71.6017%2013.5197%2071.284%2013.6057%2070.9399%2013.6586C70.5958%2013.7248%2070.2119%2013.7579%2069.7884%2013.7579Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text
          content="© 2024 Aglint Inc. All Rights Reserved"
          weight=""
          size="1"
          color="neutral"
        />
      </_Builtin.Block>
    </_Component>
  );
}
