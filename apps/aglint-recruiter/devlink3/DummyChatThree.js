"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DummyChatThree.module.css";

export function DummyChatThree({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "chat_contents")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "chat_block")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "chat_avatar")} tag="div">
          <_Builtin.Image
            className={_utils.cx(_styles, "image_cover")}
            loading="eager"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_content")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "chat_name_and_time")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"You"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_400")}
                tag="div"
              >
                {"4 days ago"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {
                "Can you help me find a Project Manager in the construction industry located in Chicago? They should have at least 7 years of experience."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "chat_block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_avatar", "is_aglint")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2226%22%20height%3D%2226%22%20viewbox%3D%220%200%2026%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20.5%206.125C20.5%206.09896%2020.4219%206.00781%2020.2656%205.85156C19.9792%205.61719%2019.4844%205.36979%2018.7812%205.10938C17.2969%204.5625%2015.3698%204.27604%2013%204.25C10.6302%204.27604%208.70312%204.5625%207.21875%205.10938C6.51562%205.36979%206.02083%205.61719%205.73438%205.85156C5.57812%206.00781%205.5%206.09896%205.5%206.125V10.1094C6.07292%2010.526%206.97135%2010.8906%208.19531%2011.2031C9.57552%2011.5677%2011.1771%2011.75%2013%2011.75C14.8229%2011.75%2016.4245%2011.5677%2017.8047%2011.2031C19.0286%2010.8906%2019.9271%2010.526%2020.5%2010.1094V6.125ZM20.5%2011.5938C19.8229%2011.9323%2019.0286%2012.2188%2018.1172%2012.4531C16.6068%2012.8177%2014.901%2013%2013%2013C11.099%2013%209.39323%2012.8047%207.88281%2012.4141C6.97135%2012.2057%206.17708%2011.9323%205.5%2011.5938V15.1094C6.07292%2015.5521%206.97135%2015.9167%208.19531%2016.2031C9.57552%2016.5677%2011.1771%2016.75%2013%2016.75C14.8229%2016.75%2016.4245%2016.5677%2017.8047%2016.2031C19.0286%2015.8906%2019.9271%2015.526%2020.5%2015.1094V11.5938ZM5.5%2019.875C5.5%2019.901%205.57812%2019.9922%205.73438%2020.1484C6.02083%2020.3828%206.51562%2020.6302%207.21875%2020.8906C8.70312%2021.4375%2010.6302%2021.724%2013%2021.75C15.3698%2021.724%2017.2969%2021.4375%2018.7812%2020.8906C19.4844%2020.6302%2019.9792%2020.3828%2020.2656%2020.1484C20.4219%2019.9922%2020.5%2019.901%2020.5%2019.875V16.5938C19.8229%2016.9323%2019.0286%2017.2188%2018.1172%2017.4531C16.6068%2017.8177%2014.901%2018%2013%2018C11.099%2018%209.39323%2017.8177%207.88281%2017.4531C6.97135%2017.2188%206.17708%2016.9323%205.5%2016.5938V19.875ZM5.5%206.16406C5.5%206.13802%205.5%206.13802%205.5%206.16406V6.16406ZM21.75%2019.875C21.6979%2020.7604%2020.8385%2021.5026%2019.1719%2022.1016C17.5312%2022.6745%2015.474%2022.974%2013%2023C10.526%2022.974%208.46875%2022.6745%206.82812%2022.1016C5.16146%2021.5026%204.30208%2020.7604%204.25%2019.875V6.125C4.30208%205.23958%205.16146%204.4974%206.82812%203.89844C8.46875%203.32552%2010.526%203.02604%2013%203C15.474%203.02604%2017.5312%203.32552%2019.1719%203.89844C20.8385%204.4974%2021.6979%205.23958%2021.75%206.125V19.875Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_content")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "chat_name_and_time")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Sourcing Agent"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_400")}
                tag="div"
              >
                {"4 days ago"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {
                "Of course. Do you have any preferences regarding their educational background or previous employers?"
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "chat_block")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "chat_avatar")} tag="div">
          <_Builtin.Image
            className={_utils.cx(_styles, "image_cover")}
            loading="eager"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_content")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "chat_name_and_time")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"You"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_400")}
                tag="div"
              >
                {"4 days ago"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {
                "A degree in Civil Engineering would be preferred, and experience with large construction firms would be a bonus."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "chat_block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_avatar", "is_aglint")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2226%22%20height%3D%2226%22%20viewbox%3D%220%200%2026%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20.5%206.125C20.5%206.09896%2020.4219%206.00781%2020.2656%205.85156C19.9792%205.61719%2019.4844%205.36979%2018.7812%205.10938C17.2969%204.5625%2015.3698%204.27604%2013%204.25C10.6302%204.27604%208.70312%204.5625%207.21875%205.10938C6.51562%205.36979%206.02083%205.61719%205.73438%205.85156C5.57812%206.00781%205.5%206.09896%205.5%206.125V10.1094C6.07292%2010.526%206.97135%2010.8906%208.19531%2011.2031C9.57552%2011.5677%2011.1771%2011.75%2013%2011.75C14.8229%2011.75%2016.4245%2011.5677%2017.8047%2011.2031C19.0286%2010.8906%2019.9271%2010.526%2020.5%2010.1094V6.125ZM20.5%2011.5938C19.8229%2011.9323%2019.0286%2012.2188%2018.1172%2012.4531C16.6068%2012.8177%2014.901%2013%2013%2013C11.099%2013%209.39323%2012.8047%207.88281%2012.4141C6.97135%2012.2057%206.17708%2011.9323%205.5%2011.5938V15.1094C6.07292%2015.5521%206.97135%2015.9167%208.19531%2016.2031C9.57552%2016.5677%2011.1771%2016.75%2013%2016.75C14.8229%2016.75%2016.4245%2016.5677%2017.8047%2016.2031C19.0286%2015.8906%2019.9271%2015.526%2020.5%2015.1094V11.5938ZM5.5%2019.875C5.5%2019.901%205.57812%2019.9922%205.73438%2020.1484C6.02083%2020.3828%206.51562%2020.6302%207.21875%2020.8906C8.70312%2021.4375%2010.6302%2021.724%2013%2021.75C15.3698%2021.724%2017.2969%2021.4375%2018.7812%2020.8906C19.4844%2020.6302%2019.9792%2020.3828%2020.2656%2020.1484C20.4219%2019.9922%2020.5%2019.901%2020.5%2019.875V16.5938C19.8229%2016.9323%2019.0286%2017.2188%2018.1172%2017.4531C16.6068%2017.8177%2014.901%2018%2013%2018C11.099%2018%209.39323%2017.8177%207.88281%2017.4531C6.97135%2017.2188%206.17708%2016.9323%205.5%2016.5938V19.875ZM5.5%206.16406C5.5%206.13802%205.5%206.13802%205.5%206.16406V6.16406ZM21.75%2019.875C21.6979%2020.7604%2020.8385%2021.5026%2019.1719%2022.1016C17.5312%2022.6745%2015.474%2022.974%2013%2023C10.526%2022.974%208.46875%2022.6745%206.82812%2022.1016C5.16146%2021.5026%204.30208%2020.7604%204.25%2019.875V6.125C4.30208%205.23958%205.16146%204.4974%206.82812%203.89844C8.46875%203.32552%2010.526%203.02604%2013%203C15.474%203.02604%2017.5312%203.32552%2019.1719%203.89844C20.8385%204.4974%2021.6979%205.23958%2021.75%206.125V19.875Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_content")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "chat_name_and_time")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Sourcing Agent"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_400")}
                tag="div"
              >
                {"4 days ago"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {
                "Noted. I'll start searching and get back to you with a list of candidates who match these requirements."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "chat_block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_avatar", "is_aglint")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2226%22%20height%3D%2226%22%20viewbox%3D%220%200%2026%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20.5%206.125C20.5%206.09896%2020.4219%206.00781%2020.2656%205.85156C19.9792%205.61719%2019.4844%205.36979%2018.7812%205.10938C17.2969%204.5625%2015.3698%204.27604%2013%204.25C10.6302%204.27604%208.70312%204.5625%207.21875%205.10938C6.51562%205.36979%206.02083%205.61719%205.73438%205.85156C5.57812%206.00781%205.5%206.09896%205.5%206.125V10.1094C6.07292%2010.526%206.97135%2010.8906%208.19531%2011.2031C9.57552%2011.5677%2011.1771%2011.75%2013%2011.75C14.8229%2011.75%2016.4245%2011.5677%2017.8047%2011.2031C19.0286%2010.8906%2019.9271%2010.526%2020.5%2010.1094V6.125ZM20.5%2011.5938C19.8229%2011.9323%2019.0286%2012.2188%2018.1172%2012.4531C16.6068%2012.8177%2014.901%2013%2013%2013C11.099%2013%209.39323%2012.8047%207.88281%2012.4141C6.97135%2012.2057%206.17708%2011.9323%205.5%2011.5938V15.1094C6.07292%2015.5521%206.97135%2015.9167%208.19531%2016.2031C9.57552%2016.5677%2011.1771%2016.75%2013%2016.75C14.8229%2016.75%2016.4245%2016.5677%2017.8047%2016.2031C19.0286%2015.8906%2019.9271%2015.526%2020.5%2015.1094V11.5938ZM5.5%2019.875C5.5%2019.901%205.57812%2019.9922%205.73438%2020.1484C6.02083%2020.3828%206.51562%2020.6302%207.21875%2020.8906C8.70312%2021.4375%2010.6302%2021.724%2013%2021.75C15.3698%2021.724%2017.2969%2021.4375%2018.7812%2020.8906C19.4844%2020.6302%2019.9792%2020.3828%2020.2656%2020.1484C20.4219%2019.9922%2020.5%2019.901%2020.5%2019.875V16.5938C19.8229%2016.9323%2019.0286%2017.2188%2018.1172%2017.4531C16.6068%2017.8177%2014.901%2018%2013%2018C11.099%2018%209.39323%2017.8177%207.88281%2017.4531C6.97135%2017.2188%206.17708%2016.9323%205.5%2016.5938V19.875ZM5.5%206.16406C5.5%206.13802%205.5%206.13802%205.5%206.16406V6.16406ZM21.75%2019.875C21.6979%2020.7604%2020.8385%2021.5026%2019.1719%2022.1016C17.5312%2022.6745%2015.474%2022.974%2013%2023C10.526%2022.974%208.46875%2022.6745%206.82812%2022.1016C5.16146%2021.5026%204.30208%2020.7604%204.25%2019.875V6.125C4.30208%205.23958%205.16146%204.4974%206.82812%203.89844C8.46875%203.32552%2010.526%203.02604%2013%203C15.474%203.02604%2017.5312%203.32552%2019.1719%203.89844C20.8385%204.4974%2021.6979%205.23958%2021.75%206.125V19.875Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_content")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "chat_name_and_time")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Sourcing Agent"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_400")}
                tag="div"
              >
                {"4 days ago"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {
                "I've found 12 candidates that match your criteria. Here's a summary of the top 3:"
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "widget_flex3-3", "dummy")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_candidate_widget")}
              id={_utils.cx(
                _styles,
                "w-node-_3ee07242-c431-8e99-7b7c-5fa969f9582e-69f957f0"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "user_row")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "avatar_img")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://cdn.prod.website-files.com/651125c25c47e8494b8e9eb8/65d8b0e872437c967c6b7370_user.png"
                />
                <_Builtin.Block tag="div">{"Michael Harris"}</_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2218%22%20viewbox%3D%220%200%2020%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_5416_88567)%22%3E%0A%3Cpath%20d%3D%22M19.0181%2016.6639C19.061%2016.6643%2019.1036%2016.656%2019.1431%2016.6395C19.1827%2016.6229%2019.2183%2016.5985%2019.2479%2016.5678C19.2776%2016.537%2019.3005%2016.5006%2019.3153%2016.4607C19.3301%2016.4208%2019.3364%2016.3783%2019.3339%2016.3359C19.3339%2016.1033%2019.1922%2015.9922%2018.9014%2015.9922H18.4316V17.21H18.6083V16.6791H18.8255L18.8305%2016.6856L19.1674%2017.21H19.3564L18.9938%2016.6673L19.0181%2016.6639ZM18.8138%2016.5419H18.6089V16.1302H18.8686C19.0027%2016.1302%2019.1557%2016.1519%2019.1557%2016.3258C19.1557%2016.5259%2019.0009%2016.5419%2018.8127%2016.5419%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3Cpath%20d%3D%22M14.4093%2015.1383H11.9036V11.2529C11.9036%2010.3264%2011.8869%209.13366%2010.6003%209.13366C9.29526%209.13366%209.09558%2010.1431%209.09558%2011.1854V15.1381H6.58983V7.14803H8.99534V8.23996H9.02902C9.26975%207.8324%209.61762%207.49713%2010.0356%207.26984C10.4535%207.04256%2010.9259%206.93177%2011.4024%206.94929C13.9421%206.94929%2014.4104%208.60333%2014.4104%2010.7551L14.4093%2015.1383ZM3.76252%206.05585C3.47493%206.0559%203.19377%205.97151%202.95461%205.81334C2.71545%205.65518%202.52905%205.43035%202.41894%205.16728C2.30884%204.90421%202.27998%204.61472%202.33604%204.33542C2.39209%204.05612%202.53054%203.79955%202.73387%203.59815C2.93719%203.39676%203.19627%203.25958%203.47833%203.20398C3.76039%203.14837%204.05276%203.17683%204.31849%203.28576C4.58421%203.39469%204.81134%203.57919%204.97117%203.81593C5.13099%204.05268%205.21633%204.33103%205.21638%204.6158C5.21641%204.80487%205.17883%204.9921%205.10578%205.1668C5.03274%205.3415%204.92567%205.50024%204.79067%205.63396C4.65566%205.76768%204.49537%205.87376%204.31896%205.94615C4.14256%206.01854%203.95348%206.05581%203.76252%206.05585ZM5.01539%2015.1383H2.50704V7.14803H5.01539V15.1383ZM15.6585%200.872235H1.24791C0.920833%200.86858%200.605652%200.99365%200.371656%201.21996C0.13766%201.44627%200.00399184%201.75531%200%202.07917V16.407C0.00385521%2016.7311%200.137445%2017.0403%200.371433%2017.2669C0.605421%2017.4934%200.920671%2017.6187%201.24791%2017.6153H15.6585C15.9864%2017.6193%2016.3026%2017.4944%2016.5375%2017.2678C16.7724%2017.0413%2016.9069%2016.7317%2016.9114%2016.407V2.07813C16.9067%201.75364%2016.7721%201.44425%2016.5372%201.21794C16.3023%200.991634%2015.9863%200.866921%2015.6585%200.8712%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3Cpath%20d%3D%22M18.8354%2015.4492C18.5306%2015.4521%2018.2393%2015.5744%2018.0252%2015.7894C17.8112%2016.0044%2017.6919%2016.2946%2017.6934%2016.5965C17.6948%2016.8983%2017.817%2017.1873%2018.0331%2017.4003C18.2492%2017.6132%2018.5417%2017.7328%2018.8465%2017.7328C19.1514%2017.7328%2019.4439%2017.6132%2019.66%2017.4003C19.8761%2017.1873%2019.9982%2016.8983%2019.9997%2016.5965C20.0011%2016.2946%2019.8818%2016.0044%2019.6678%2015.7894C19.4538%2015.5744%2019.1625%2015.4521%2018.8576%2015.4492H18.8354ZM18.8354%2017.6021C18.6355%2017.6053%2018.439%2017.5499%2018.2709%2017.4426C18.1028%2017.3353%2017.9706%2017.1811%2017.891%2016.9995C17.8114%2016.8178%2017.788%2016.6169%2017.8237%2016.422C17.8595%2016.2272%2017.9528%2016.0472%2018.0918%2015.9049C18.2308%2015.7626%2018.4094%2015.6643%2018.6049%2015.6224C18.8003%2015.5805%2019.004%2015.597%2019.19%2015.6697C19.376%2015.7425%2019.536%2015.8682%2019.6499%2016.031C19.7638%2016.1937%2019.8263%2016.3863%2019.8296%2016.5843C19.8296%2016.59%2019.8296%2016.5954%2019.8296%2016.6011C19.8352%2016.8608%2019.7364%2017.1121%2019.5549%2017.2998C19.3734%2017.4874%2019.1241%2017.5959%2018.8618%2017.6015H18.8357%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_5416_88567%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2216.8831%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.871094)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                  {"10 years of experience,"}
                </_Builtin.Span>
                {
                  " currently at a major construction firm, Civil Engineering degree."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_candidate_widget")}
              id={_utils.cx(
                _styles,
                "w-node-_3ee07242-c431-8e99-7b7c-5fa969f95838-69f957f0"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "user_row")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "avatar_img")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://cdn.prod.website-files.com/651125c25c47e8494b8e9eb8/65d8b0e9fcc50326d2974c84_user3.png"
                />
                <_Builtin.Block tag="div">{"Lisa Clark"}</_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2218%22%20viewbox%3D%220%200%2020%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_5416_88567)%22%3E%0A%3Cpath%20d%3D%22M19.0181%2016.6639C19.061%2016.6643%2019.1036%2016.656%2019.1431%2016.6395C19.1827%2016.6229%2019.2183%2016.5985%2019.2479%2016.5678C19.2776%2016.537%2019.3005%2016.5006%2019.3153%2016.4607C19.3301%2016.4208%2019.3364%2016.3783%2019.3339%2016.3359C19.3339%2016.1033%2019.1922%2015.9922%2018.9014%2015.9922H18.4316V17.21H18.6083V16.6791H18.8255L18.8305%2016.6856L19.1674%2017.21H19.3564L18.9938%2016.6673L19.0181%2016.6639ZM18.8138%2016.5419H18.6089V16.1302H18.8686C19.0027%2016.1302%2019.1557%2016.1519%2019.1557%2016.3258C19.1557%2016.5259%2019.0009%2016.5419%2018.8127%2016.5419%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3Cpath%20d%3D%22M14.4093%2015.1383H11.9036V11.2529C11.9036%2010.3264%2011.8869%209.13366%2010.6003%209.13366C9.29526%209.13366%209.09558%2010.1431%209.09558%2011.1854V15.1381H6.58983V7.14803H8.99534V8.23996H9.02902C9.26975%207.8324%209.61762%207.49713%2010.0356%207.26984C10.4535%207.04256%2010.9259%206.93177%2011.4024%206.94929C13.9421%206.94929%2014.4104%208.60333%2014.4104%2010.7551L14.4093%2015.1383ZM3.76252%206.05585C3.47493%206.0559%203.19377%205.97151%202.95461%205.81334C2.71545%205.65518%202.52905%205.43035%202.41894%205.16728C2.30884%204.90421%202.27998%204.61472%202.33604%204.33542C2.39209%204.05612%202.53054%203.79955%202.73387%203.59815C2.93719%203.39676%203.19627%203.25958%203.47833%203.20398C3.76039%203.14837%204.05276%203.17683%204.31849%203.28576C4.58421%203.39469%204.81134%203.57919%204.97117%203.81593C5.13099%204.05268%205.21633%204.33103%205.21638%204.6158C5.21641%204.80487%205.17883%204.9921%205.10578%205.1668C5.03274%205.3415%204.92567%205.50024%204.79067%205.63396C4.65566%205.76768%204.49537%205.87376%204.31896%205.94615C4.14256%206.01854%203.95348%206.05581%203.76252%206.05585ZM5.01539%2015.1383H2.50704V7.14803H5.01539V15.1383ZM15.6585%200.872235H1.24791C0.920833%200.86858%200.605652%200.99365%200.371656%201.21996C0.13766%201.44627%200.00399184%201.75531%200%202.07917V16.407C0.00385521%2016.7311%200.137445%2017.0403%200.371433%2017.2669C0.605421%2017.4934%200.920671%2017.6187%201.24791%2017.6153H15.6585C15.9864%2017.6193%2016.3026%2017.4944%2016.5375%2017.2678C16.7724%2017.0413%2016.9069%2016.7317%2016.9114%2016.407V2.07813C16.9067%201.75364%2016.7721%201.44425%2016.5372%201.21794C16.3023%200.991634%2015.9863%200.866921%2015.6585%200.8712%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3Cpath%20d%3D%22M18.8354%2015.4492C18.5306%2015.4521%2018.2393%2015.5744%2018.0252%2015.7894C17.8112%2016.0044%2017.6919%2016.2946%2017.6934%2016.5965C17.6948%2016.8983%2017.817%2017.1873%2018.0331%2017.4003C18.2492%2017.6132%2018.5417%2017.7328%2018.8465%2017.7328C19.1514%2017.7328%2019.4439%2017.6132%2019.66%2017.4003C19.8761%2017.1873%2019.9982%2016.8983%2019.9997%2016.5965C20.0011%2016.2946%2019.8818%2016.0044%2019.6678%2015.7894C19.4538%2015.5744%2019.1625%2015.4521%2018.8576%2015.4492H18.8354ZM18.8354%2017.6021C18.6355%2017.6053%2018.439%2017.5499%2018.2709%2017.4426C18.1028%2017.3353%2017.9706%2017.1811%2017.891%2016.9995C17.8114%2016.8178%2017.788%2016.6169%2017.8237%2016.422C17.8595%2016.2272%2017.9528%2016.0472%2018.0918%2015.9049C18.2308%2015.7626%2018.4094%2015.6643%2018.6049%2015.6224C18.8003%2015.5805%2019.004%2015.597%2019.19%2015.6697C19.376%2015.7425%2019.536%2015.8682%2019.6499%2016.031C19.7638%2016.1937%2019.8263%2016.3863%2019.8296%2016.5843C19.8296%2016.59%2019.8296%2016.5954%2019.8296%2016.6011C19.8352%2016.8608%2019.7364%2017.1121%2019.5549%2017.2998C19.3734%2017.4874%2019.1241%2017.5959%2018.8618%2017.6015H18.8357%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_5416_88567%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2216.8831%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.871094)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                  {"8 years of experience,"}
                </_Builtin.Span>
                {
                  " formerly at a large construction company, strong project management skills."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_candidate_widget")}
              id={_utils.cx(
                _styles,
                "w-node-_3ee07242-c431-8e99-7b7c-5fa969f95842-69f957f0"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "user_row")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "avatar_img")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://cdn.prod.website-files.com/651125c25c47e8494b8e9eb8/65d8b0e9a0e9f0451bc3536c_user2.png"
                />
                <_Builtin.Block tag="div">{"Kevin Lewis"}</_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2218%22%20viewbox%3D%220%200%2020%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_5416_88567)%22%3E%0A%3Cpath%20d%3D%22M19.0181%2016.6639C19.061%2016.6643%2019.1036%2016.656%2019.1431%2016.6395C19.1827%2016.6229%2019.2183%2016.5985%2019.2479%2016.5678C19.2776%2016.537%2019.3005%2016.5006%2019.3153%2016.4607C19.3301%2016.4208%2019.3364%2016.3783%2019.3339%2016.3359C19.3339%2016.1033%2019.1922%2015.9922%2018.9014%2015.9922H18.4316V17.21H18.6083V16.6791H18.8255L18.8305%2016.6856L19.1674%2017.21H19.3564L18.9938%2016.6673L19.0181%2016.6639ZM18.8138%2016.5419H18.6089V16.1302H18.8686C19.0027%2016.1302%2019.1557%2016.1519%2019.1557%2016.3258C19.1557%2016.5259%2019.0009%2016.5419%2018.8127%2016.5419%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3Cpath%20d%3D%22M14.4093%2015.1383H11.9036V11.2529C11.9036%2010.3264%2011.8869%209.13366%2010.6003%209.13366C9.29526%209.13366%209.09558%2010.1431%209.09558%2011.1854V15.1381H6.58983V7.14803H8.99534V8.23996H9.02902C9.26975%207.8324%209.61762%207.49713%2010.0356%207.26984C10.4535%207.04256%2010.9259%206.93177%2011.4024%206.94929C13.9421%206.94929%2014.4104%208.60333%2014.4104%2010.7551L14.4093%2015.1383ZM3.76252%206.05585C3.47493%206.0559%203.19377%205.97151%202.95461%205.81334C2.71545%205.65518%202.52905%205.43035%202.41894%205.16728C2.30884%204.90421%202.27998%204.61472%202.33604%204.33542C2.39209%204.05612%202.53054%203.79955%202.73387%203.59815C2.93719%203.39676%203.19627%203.25958%203.47833%203.20398C3.76039%203.14837%204.05276%203.17683%204.31849%203.28576C4.58421%203.39469%204.81134%203.57919%204.97117%203.81593C5.13099%204.05268%205.21633%204.33103%205.21638%204.6158C5.21641%204.80487%205.17883%204.9921%205.10578%205.1668C5.03274%205.3415%204.92567%205.50024%204.79067%205.63396C4.65566%205.76768%204.49537%205.87376%204.31896%205.94615C4.14256%206.01854%203.95348%206.05581%203.76252%206.05585ZM5.01539%2015.1383H2.50704V7.14803H5.01539V15.1383ZM15.6585%200.872235H1.24791C0.920833%200.86858%200.605652%200.99365%200.371656%201.21996C0.13766%201.44627%200.00399184%201.75531%200%202.07917V16.407C0.00385521%2016.7311%200.137445%2017.0403%200.371433%2017.2669C0.605421%2017.4934%200.920671%2017.6187%201.24791%2017.6153H15.6585C15.9864%2017.6193%2016.3026%2017.4944%2016.5375%2017.2678C16.7724%2017.0413%2016.9069%2016.7317%2016.9114%2016.407V2.07813C16.9067%201.75364%2016.7721%201.44425%2016.5372%201.21794C16.3023%200.991634%2015.9863%200.866921%2015.6585%200.8712%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3Cpath%20d%3D%22M18.8354%2015.4492C18.5306%2015.4521%2018.2393%2015.5744%2018.0252%2015.7894C17.8112%2016.0044%2017.6919%2016.2946%2017.6934%2016.5965C17.6948%2016.8983%2017.817%2017.1873%2018.0331%2017.4003C18.2492%2017.6132%2018.5417%2017.7328%2018.8465%2017.7328C19.1514%2017.7328%2019.4439%2017.6132%2019.66%2017.4003C19.8761%2017.1873%2019.9982%2016.8983%2019.9997%2016.5965C20.0011%2016.2946%2019.8818%2016.0044%2019.6678%2015.7894C19.4538%2015.5744%2019.1625%2015.4521%2018.8576%2015.4492H18.8354ZM18.8354%2017.6021C18.6355%2017.6053%2018.439%2017.5499%2018.2709%2017.4426C18.1028%2017.3353%2017.9706%2017.1811%2017.891%2016.9995C17.8114%2016.8178%2017.788%2016.6169%2017.8237%2016.422C17.8595%2016.2272%2017.9528%2016.0472%2018.0918%2015.9049C18.2308%2015.7626%2018.4094%2015.6643%2018.6049%2015.6224C18.8003%2015.5805%2019.004%2015.597%2019.19%2015.6697C19.376%2015.7425%2019.536%2015.8682%2019.6499%2016.031C19.7638%2016.1937%2019.8263%2016.3863%2019.8296%2016.5843C19.8296%2016.59%2019.8296%2016.5954%2019.8296%2016.6011C19.8352%2016.8608%2019.7364%2017.1121%2019.5549%2017.2998C19.3734%2017.4874%2019.1241%2017.5959%2018.8618%2017.6015H18.8357%22%20fill%3D%22%230A66C2%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_5416_88567%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2216.8831%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.871094)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                  {"7 years of experience, "}
                </_Builtin.Span>
                {
                  "currently at a construction firm, Civil Engineering degree. LinkedIn:"
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "chat_block")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "chat_avatar")} tag="div">
          <_Builtin.Image
            className={_utils.cx(_styles, "image_cover")}
            loading="eager"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_content")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "chat_name_and_time")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"You"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_400")}
                tag="div"
              >
                {"4 days ago"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {"Great! Please send a LinkedIn reachout to these candidates."}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "chat_block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_avatar", "is_aglint")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2226%22%20height%3D%2226%22%20viewbox%3D%220%200%2026%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20.5%206.125C20.5%206.09896%2020.4219%206.00781%2020.2656%205.85156C19.9792%205.61719%2019.4844%205.36979%2018.7812%205.10938C17.2969%204.5625%2015.3698%204.27604%2013%204.25C10.6302%204.27604%208.70312%204.5625%207.21875%205.10938C6.51562%205.36979%206.02083%205.61719%205.73438%205.85156C5.57812%206.00781%205.5%206.09896%205.5%206.125V10.1094C6.07292%2010.526%206.97135%2010.8906%208.19531%2011.2031C9.57552%2011.5677%2011.1771%2011.75%2013%2011.75C14.8229%2011.75%2016.4245%2011.5677%2017.8047%2011.2031C19.0286%2010.8906%2019.9271%2010.526%2020.5%2010.1094V6.125ZM20.5%2011.5938C19.8229%2011.9323%2019.0286%2012.2188%2018.1172%2012.4531C16.6068%2012.8177%2014.901%2013%2013%2013C11.099%2013%209.39323%2012.8047%207.88281%2012.4141C6.97135%2012.2057%206.17708%2011.9323%205.5%2011.5938V15.1094C6.07292%2015.5521%206.97135%2015.9167%208.19531%2016.2031C9.57552%2016.5677%2011.1771%2016.75%2013%2016.75C14.8229%2016.75%2016.4245%2016.5677%2017.8047%2016.2031C19.0286%2015.8906%2019.9271%2015.526%2020.5%2015.1094V11.5938ZM5.5%2019.875C5.5%2019.901%205.57812%2019.9922%205.73438%2020.1484C6.02083%2020.3828%206.51562%2020.6302%207.21875%2020.8906C8.70312%2021.4375%2010.6302%2021.724%2013%2021.75C15.3698%2021.724%2017.2969%2021.4375%2018.7812%2020.8906C19.4844%2020.6302%2019.9792%2020.3828%2020.2656%2020.1484C20.4219%2019.9922%2020.5%2019.901%2020.5%2019.875V16.5938C19.8229%2016.9323%2019.0286%2017.2188%2018.1172%2017.4531C16.6068%2017.8177%2014.901%2018%2013%2018C11.099%2018%209.39323%2017.8177%207.88281%2017.4531C6.97135%2017.2188%206.17708%2016.9323%205.5%2016.5938V19.875ZM5.5%206.16406C5.5%206.13802%205.5%206.13802%205.5%206.16406V6.16406ZM21.75%2019.875C21.6979%2020.7604%2020.8385%2021.5026%2019.1719%2022.1016C17.5312%2022.6745%2015.474%2022.974%2013%2023C10.526%2022.974%208.46875%2022.6745%206.82812%2022.1016C5.16146%2021.5026%204.30208%2020.7604%204.25%2019.875V6.125C4.30208%205.23958%205.16146%204.4974%206.82812%203.89844C8.46875%203.32552%2010.526%203.02604%2013%203C15.474%203.02604%2017.5312%203.32552%2019.1719%203.89844C20.8385%204.4974%2021.6979%205.23958%2021.75%206.125V19.875Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat_content")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "chat_name_and_time")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Sourcing Agent"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_400")}
                tag="div"
              >
                {"4 days ago"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {
                "Sent the LinkedIn reachout messages to the selected candidates."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "notification_block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "notification_task_blokx")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">
            {"Send outreach messages to the top three candidates on LinkedIn."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600", "hide")}
          tag="div"
        >
          {"Schedule interview with john between 12-19 Feb"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}