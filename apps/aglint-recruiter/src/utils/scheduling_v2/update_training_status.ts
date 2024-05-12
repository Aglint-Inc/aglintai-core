import axios from 'axios';

export const updateTrainingStatus = async (payload: {
  training_ints: {
    interviewer_module_relation_id: string;
    session_id: string;
  }[];
}) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/assign-interviewer-training-type`,
      payload,
    );
  } catch (err) {
    // console.log(err);
  }
};

// module_id, {interview_module_relation_id,type}[]
// required training numbers
