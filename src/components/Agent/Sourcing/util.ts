import axios from 'axios';

export const processing_sourcing = ({
  message,
  candidate_ids,
}: {
  message: string;
  candidate_ids: { id: string; email: string }[];
}) => {
  return axios
    .post(
      'https://asia-south1-aglint-cloud-381414.cloudfunctions.net/sourcing_v1',
      {
        query: message,
        candidate_ids,
      },
    )
    .then(({ data }) => {
      const { email_status, candidates_ids, args } = data as {
        email_status: { id: string; status: string }[];
        candidates_ids: string[];
        args: any;
      };
      let type = args?.type;
      let message = '';
      if (args?.type === 'process_query') {
        //
        message = "Here's the candidate list.";
      } else if (args?.type === 'email') {
        //
        const template = args?.email?.template;
        if (template) {
          message = 'Emails sent successfully.';
        } else {
          type = 'select_template';
          message = 'Please select the email template.';
        }
      }
      return { message, email_status, candidates_ids, args, type };
    });
};
