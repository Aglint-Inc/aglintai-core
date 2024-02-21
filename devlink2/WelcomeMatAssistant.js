import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './WelcomeMatAssistant.module.css';

export function WelcomeMatAssistant({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, 'welcome_mat')} tag='div'>
      <_Builtin.Block className={_utils.cx(_styles, 'top_bar')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-md', 'fw-semibold')}
          tag='div'
        >
          {'Assistant'}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'welcome_mat_wm')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'wm_image_wrapper')}
          tag='div'
        >
          <_Builtin.Image
            className={_utils.cx(_styles, 'wm_img', 'max_width_900')}
            loading='lazy'
            width='auto'
            height='auto'
            alt=''
            src='https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65b88d5185be51921784ba37_assistant.png'
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'wm_header_wrapper', 'max_width_800')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'welcome_mat_header')}
            tag='div'
          >
            {'Welcome to AI-Assisted Hiring!'}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-md', 'text-gray-600')}
            tag='div'
          >
            {
              'Revolutionize your hiring process with an AI assistant guiding candidates through interactive chats, offering a personalized and efficient experience. Say goodbye to forms and levate your hiring game with cutting-edge technology.'
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, 'wm_cards')} tag='div'>
          <_Builtin.Block
            className={_utils.cx(_styles, 'wm_card')}
            id={_utils.cx(
              _styles,
              'w-node-_2db05825-9fa5-884d-166e-63ae21a1e554-21a1e547',
            )}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'fw-semibold')}
              tag='div'
            >
              {'AI-Powered Assistant'}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {
                'Integrate an intelligent assistant on your website for dynamic candidate interactions, revolutionizing engagement by guiding applicants through a personalized application process.'
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'wm_card')}
            id={_utils.cx(
              _styles,
              'w-node-_2db05825-9fa5-884d-166e-63ae21a1e559-21a1e547',
            )}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'fw-semibold')}
              tag='div'
            >
              {'Form-Free Applications'}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {
                'Say goodbye to tedious forms. Candidates can effortlessly apply through the chat interface, providing necessary details in a conversational manner. Redefine user experience and increase application rates.'
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'wm_card')}
            id={_utils.cx(
              _styles,
              'w-node-_2db05825-9fa5-884d-166e-63ae21a1e55e-21a1e547',
            )}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'fw-semibold')}
              tag='div'
            >
              {'Real-time Insights for HR'}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {
                'Equip HR with a real-time table displaying ongoing candidate conversations, application statuses, and applied positions. Make data-driven decisions and streamline hiring tasks with ease.'
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'wm_card')}
            id={_utils.cx(
              _styles,
              'w-node-_2db05825-9fa5-884d-166e-63ae21a1e563-21a1e547',
            )}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'fw-semibold')}
              tag='div'
            >
              {'Setup Assistant Behavior'}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {
                "Tailor the AI assistant's behavior to align with your company's unique needs. Personalize the candidate interaction journey and further streamline your hiring tasks with unparalleled customization."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value='%3Cstyle%3E%0A%20%20%5Bclass%3D%22WelcomeMatAssistant_welcome_mat_wm__WlLzA%22%5D%20%7B%0A%20%20%20%20height%3A%20calc(100vh%20-%2060px)%3B%0A%20%20%7D%0A%3C%2Fstyle%3E' />
    </_Component>
  );
}
