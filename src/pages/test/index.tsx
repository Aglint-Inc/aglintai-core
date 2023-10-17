/* eslint-disable no-console */
import React from 'react';

import AUIButton from '@/src/components/Common/AUIButton';
import axios from 'axios';

const index = () => {
  const submitHandler = async () => {
    axios.post('/api/templates').then((res) => {
      console.log(res);
    });
  };

  const generating = async () => {
    axios
      .post('/api/generateVideo', {
        text: 'What are the best practices for optimizing website performance in terms of HTML?',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkstatus = async () => {
    axios
      .post('/api/checkstatus', {
        video_id: '8611296c1fe747c4a6ad75cd113f62bd ',
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <AUIButton
        onClick={() => {
          submitHandler();
        }}
      >
        List templates
      </AUIButton>
      <AUIButton
        onClick={() => {
          generating();
        }}
      >
        Generate video
      </AUIButton>

      <AUIButton
        onClick={() => {
          checkstatus();
        }}
      >
        Check status
      </AUIButton>
    </div>
  );
};

export default index;
