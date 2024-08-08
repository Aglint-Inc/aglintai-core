"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./GlobalUserDetail.module.css";

export function GlobalUserDetail({
  as: _Component = _Builtin.Block,
  textName = "Brooklyn Simmons",
  slotRole,
  textTimeZone = "This is a global text component",
  textRole = "This is a global text component",
  isRoleVisible = true,
  slotImage,
  isSlotImageVisible = false,
  isCandidateAvatarVisible = true,
  slotCandidateStatus,
}) {
  return (
    <_Component className={_utils.cx(_styles, "user_with_timerange")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "user_acatar")} tag="div">
        {isCandidateAvatarVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H28C30.2091%200%2032%201.79086%2032%204V28C32%2030.2091%2030.2091%2032%2028%2032H4C1.79086%2032%200%2030.2091%200%2028V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22translate(8%208)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16%208.93311C13.8645%208.93311%2012.1333%2010.6643%2012.1333%2012.7998C12.1333%2014.5628%2013.3133%2016.0503%2014.9267%2016.5155C13.653%2016.6707%2012.5606%2017.1212%2011.7377%2017.9322C10.6903%2018.9645%2010.16%2020.5011%2010.16%2022.5063C10.16%2022.7862%2010.3869%2023.013%2010.6667%2023.013C10.9465%2023.013%2011.1734%2022.7862%2011.1734%2022.5063C11.1734%2020.6717%2011.6564%2019.4351%2012.449%2018.654C13.2431%2017.8714%2014.4285%2017.4664%2016%2017.4664C17.5714%2017.4664%2018.7569%2017.8714%2019.5511%2018.654C20.3436%2019.4351%2020.8267%2020.6717%2020.8267%2022.5063C20.8267%2022.7862%2021.0535%2023.013%2021.3333%2023.013C21.6131%2023.0131%2021.84%2022.7862%2021.84%2022.5064C21.84%2020.5011%2021.3097%2018.9645%2020.2623%2017.9322C19.4394%2017.1212%2018.3469%2016.6707%2017.0733%2016.5155C18.6866%2016.0503%2019.8667%2014.5629%2019.8667%2012.7998C19.8667%2010.6643%2018.1355%208.93311%2016%208.93311ZM13.1467%2012.7998C13.1467%2011.2239%2014.4242%209.94644%2016%209.94644C17.5759%209.94644%2018.8533%2011.2239%2018.8533%2012.7998C18.8533%2014.3756%2017.5759%2015.6531%2016%2015.6531C14.4242%2015.6531%2013.1467%2014.3756%2013.1467%2012.7998Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
        {isSlotImageVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "gud-image-wrap")}
            tag="div"
          >
            {slotImage}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "user_name_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "user_name_us")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <Text content={textName} weight="medium" size="2" />
            {isRoleVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "us_detail-company")}
                tag="div"
              >
                {slotRole ?? (
                  <TextWithIcon
                    fontWeight="regular"
                    iconSize="4"
                    fontSize="1"
                    color="neutral"
                  />
                )}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "gud-candidate-stat")}
            id={_utils.cx(
              _styles,
              "w-node-_70ae0f22-c322-c3ac-c9fa-e414d716ade1-d716adda"
            )}
            tag="div"
          >
            {slotCandidateStatus}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "us_detail-wrap")}
          tag="div"
        >
          <TextWithIcon
            textContent={textTimeZone}
            iconName="language"
            iconSize="4"
            fontWeight="regular"
            fontSize="1"
            color="neutral"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
