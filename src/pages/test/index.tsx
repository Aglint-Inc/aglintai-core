/* eslint-disable no-console */
import axios from 'axios';

import AUIButton from '@/src/components/Common/AUIButton';

const index = () => {
  const submitHandler = async () => {
    axios.post('/api/templates').then((res) => {
      console.log(res);
    });
  };

  const generating = async () => {
    axios
      .post('/api/generateVideo', {
        text: 'Tell me about a time when you had to communicate complex information to a non-technical audience. How did you ensure they understood the information?',
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
        video_id: 'de1f874bf4d047e4aa65843db82033c0',
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
