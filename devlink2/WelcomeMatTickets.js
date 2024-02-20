import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './WelcomeMatTickets.module.css';

export function WelcomeMatTickets({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, 'welcome_mat')} tag='div'>
      <_Builtin.Block className={_utils.cx(_styles, 'top_bar')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-md', 'fw-semibold')}
          tag='div'
        >
          {'Tickets'}
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
            className={_utils.cx(_styles, 'wm_img', 'max_width_700')}
            loading='lazy'
            width='auto'
            height='auto'
            alt=''
            src='https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65b272a889384bd23e05dc32_candidate_database_welcome_mat.png'
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'wm_header_wrapper')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'welcome_mat_header')}
            tag='div'
          >
            {'Streamline Candidate Conversations'}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-md', 'text-gray-600')}
            tag='div'
          >
            {
              'Enhance candidate interaction effortlessly! Manage inquiries, respond swiftly, and track every journey seamlessly. Streamline communication, collaborate hassle-free with your team. Elevate candidate support with ease!'
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, 'wm_cards')} tag='div'>
          <_Builtin.Block
            className={_utils.cx(_styles, 'wm_card')}
            id={_utils.cx(
              _styles,
              'w-node-_88fc74d0-858f-0030-5c7a-82182aa30778-2aa3076f',
            )}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'fw-semibold')}
              tag='div'
            >
              {'Effortless Communication'}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {
                'Streamline candidate queries in one place. Send and receive messages effortlessly, ensuring every interaction is tracked and managed seamlessly.'
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'wm_card')}
            id={_utils.cx(
              _styles,
              'w-node-_88fc74d0-858f-0030-5c7a-82182aa3077d-2aa3076f',
            )}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'fw-semibold')}
              tag='div'
            >
              {'Team Collaboration'}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {
                'Enhance teamwork by assigning tickets to your teammates. Collaborate in real-time, share insights, and collectively ensure a unified and effective response.'
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'wm_card')}
            id={_utils.cx(
              _styles,
              'w-node-_88fc74d0-858f-0030-5c7a-82182aa30782-2aa3076f',
            )}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'fw-semibold')}
              tag='div'
            >
              {'Status Tracking'}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {
                "Keep tabs on every ticket's status – pending, resolved, or in progress. Stay organized and never miss a beat when managing candidate interactions."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'wm_card')}
            id={_utils.cx(
              _styles,
              'w-node-_88fc74d0-858f-0030-5c7a-82182aa30787-2aa3076f',
            )}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'fw-semibold')}
              tag='div'
            >
              {'Candidate Details at a Glance'}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'text-gray-600')}
              tag='div'
            >
              {
                'View comprehensive candidate details alongside ticket conversations. Make informed decisions and provide personalized support.'
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value='%3Cstyle%3E%0A%20%20%5Bclass%3D%22WelcomeMatTickets_welcome_mat_wm__sKlul%22%5D%20%7B%0A%20%20%20%20height%3A%20calc(100vh%20-%2060px)%3B%0A%20%20%7D%0A%3C%2Fstyle%3E' />
    </_Component>
  );
}
