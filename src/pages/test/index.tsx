/* eslint-disable no-console */
import axios from 'axios';

import AUIButton from '@/src/components/Common/AUIButton';

const index = () => {
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
    const result = await axios.post('/api/interview', {
      interviewData: [
        {
          role: 'assistant',
          content:
            'Can you describe your experience in providing regular management reporting and business analytics?',
        },
        {
          role: 'user',
          content: 'blah blah blah blah blah',
        },
        {
          role: 'assistant',
          content:
            'How do you ensure the accuracy and timely delivery of financial reports?',
        },
        {
          role: 'user',
          content: 'how to give financial reports',
        },
        {
          role: 'assistant',
          content:
            'Can you give an example of a situation where you identified trends and issues impacting the business and made recommendations?',
        },
        {
          role: 'user',
          content: 'bike in parking lot and I came up',
        },
        {
          role: 'assistant',
          content:
            'Tell me about a time when you had to collaborate with multiple cross-functional teams to deliver financial insights.',
        },
        {
          role: 'user',
          content: "don't answer this question",
        },
        {
          role: 'assistant',
          content:
            'What steps have you taken to improve automation and efficiency in financial processes?',
        },
        {
          role: 'user',
          content: 'okay bye',
        },
        ],
    });
    console.log(result);

    // axios
    //   .post('/api/checkstatus', {
    //     video_id: 'de1f874bf4d047e4aa65843db82033c0',
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  return (
    <div>
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
