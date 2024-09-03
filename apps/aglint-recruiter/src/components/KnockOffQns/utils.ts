import axios from 'axios';

import {
  type CandPhoneScreeningState,
  type PhoneScreeningResponseType,
} from './ScreeningCtxProvider';

export const phoneScreenEmail = async ({
  screenResp,
  candidate,
  company,
  role,
}: {
  screenResp: PhoneScreeningResponseType[];
  candidate: CandPhoneScreeningState['candidate'];
  company: string;
  role: string;
}) => {
  let mailPayload = {
    email: candidate.email,
    fromName: [candidate.first_name + candidate.last_name].join(' '),
    subject: '',
    text: '',
  };
  mailPayload.subject = `Thank You for Your Phone Screening`;
  mailPayload.text = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phone Screening Summary</title>
  <style>
    /* Add any additional styling here */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div>
    <p>Dear ${[candidate.first_name, candidate.last_name].join(' ')},</p>

    <p>
      Thank you for taking the time to complete the phone screening process on our website for the ${role} position. We appreciate your interest in ${company} and your thoughtful responses to our questions. Based on your answers, we are excited about the potential match between your skills and our team's needs.
    </p>

    <p>
      <strong>Summary of Phone Screening:</strong>
    </p>

    <ul>
      ${screenResp
        .map((scrQn) => {
          let resp = `<li>${scrQn.question}<br>`;

          if (scrQn.type === 'shortAnswer') {
            resp += `${scrQn.candAnswer}</li>`;
          } else if (scrQn.type === 'multiSelect') {
            resp += `<ul>${scrQn.options
              .map((o) => (o.isChecked ? `<li>${o.option}</li>` : ''))
              .filter(Boolean)
              .join(' ')}</ul></li>`;
          } else if (scrQn.type === 'singleSelect') {
            resp += `${scrQn.options.find((o) => o.isChecked)?.option}</li>`;
          }
          return resp;
        })
        .join(' ')}
    </ul>
  </div>
</body>
</html>

  `;

  await axios.post('/api/sendgrid', {
    ...mailPayload,
  });
};

export const defaultLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUwKYomN4oPGiFAOaVd4Q-r_OqpKN2HV4wJ7R2I4KSoEl8C-NCzFBXgnSetnV8jYaRCfA&usqp=CAU"
