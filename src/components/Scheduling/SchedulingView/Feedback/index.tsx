import { Avatar, Dialog, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  AvatarWithName,
  FeedbackTableRow,
  FeedbackViewPopup,
  MyFeedbackPopup,
  RoundedNumber,
  ScheduleTabFeedback,
} from '@/devlink3';
import TipTapEditor from '@/src/components/Common/richTextEditor/RichTextBlock';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { CustomDatabase } from '@/src/types/customSchema';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

const Feedback = () => {
  const param = useSearchParams();
  const meeting_id = param.get('meeting_id');
  const { userDetails } = useAuthDetails();

  const user_id = userDetails?.user.id;

  const [interviewers, setInterviewers] = useState<
    Awaited<ReturnType<typeof getInterviewers>>
  >([]);
  let currentIndex: number | null = null;
  const [selectedInterviewers, setSelectedInterviewers] =
    useState<(typeof interviewers)[number]>(null);

  const [edit, setEdit] = useState(false);

  const handelSubmit = () => {
    meeting_id &&
      user_id &&
      saveInterviewerFeedback({
        // feedback: JSON.stringify(feedback),
        feedback: selectedInterviewers.feedback,
        id: user_id,
        meeting_id,
      }).then((row) => {
        setEdit(false);
        const temp = [...interviewers];
        temp[Number(currentIndex)] = { ...temp[Number(currentIndex)], ...row };
        //  temp.map((item) => {
        //    if (item.id === row.id)
        //      return { ...temp[Number(currentIndex)], ...row };
        //    return item;
        //  });
        setInterviewers(temp);
        currentIndex = null;
        setSelectedInterviewers(null);
        toast.success('Feedback Saved.');
      });
  };

  useEffect(() => {
    if (meeting_id) {
      getInterviewers({ meeting_id }).then((data) => setInterviewers(data));
    }
  }, [meeting_id]);
  return (
    <>
      <ScheduleTabFeedback
        slotFeedbackTableRow={
          <>
            {interviewers.map((int, index) => {
              return (
                <FeedbackTableRow
                  key={int.id}
                  isAddFeedback={
                    !int.feedback && int.interviewer_id === user_id
                  }
                  isNoFeedback={!int.feedback}
                  onClickFeedback={{
                    onClick: () => {
                      currentIndex = index;
                      setSelectedInterviewers(
                        interviewers[Number(currentIndex)],
                      );
                      !interviewers[Number(currentIndex)].feedback &&
                        setEdit(true);
                    },
                  }}
                  slotAvatar={
                    <Avatar
                      src={int.interviewerDetails?.profile_image}
                      alt={int.interviewerDetails?.first_name}
                    />
                  }
                  textInterviewerName={`${int.interviewerDetails.first_name} ${int.interviewerDetails.last_name}`}
                  // @ts-ignore
                  textFeedback={
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html:
                          int.feedback?.objective || 'Feedback not Submitted',
                      }}
                    />
                  }
                  // @ts-ignore
                  textRecommendation={re_mapper[int.feedback?.recommendation]}
                  textjobTitle={int.interviewerDetails.position}
                />
              );
            })}
          </>
        }
      />
      {selectedInterviewers !== null &&
        [1].map(() => {
          return (
            <Dialog
              key={1}
              open={selectedInterviewers !== null}
              sx={{ '& .MuiPaper-root': { maxWidth: '650px' } }}
            >
              {selectedInterviewers.interviewer_id === user_id && edit ? (
                <MyFeedbackPopup
                  onClickClose={{
                    onClick: () => {
                      currentIndex = null;
                      setSelectedInterviewers(null);
                    },
                  }}
                  onClickSubmitFeedback={{
                    onClick: () => {
                      if (!selectedInterviewers.feedback) {
                        return toast.warning('Please give Feedback');
                      }
                      handelSubmit();
                    },
                  }}
                  slotRoundedNumber={
                    <>
                      {Array(10)
                        .fill(1)
                        .map((_, i) => {
                          return (
                            <RoundedNumber
                              key={i}
                              textNumber={i + 1}
                              isActive={
                                (selectedInterviewers.feedback
                                  ?.recommendation || 0) > i
                              }
                              onClickRound={{
                                onClick: () => {
                                  const temp = { ...selectedInterviewers };
                                  temp.feedback = {
                                    ...temp.feedback,
                                    recommendation: i + 1,
                                  };
                                  setSelectedInterviewers(temp);
                                },
                              }}
                            />
                          );
                        })}
                    </>
                  }
                  textRecommendation={
                    re_mapper[
                      selectedInterviewers.feedback?.recommendation || 0
                    ]
                  }
                  slotObjective={
                    <TipTapEditor
                      value={selectedInterviewers.feedback?.objective || ''}
                      onChange={({ html }) => {
                        const temp = { ...selectedInterviewers };
                        temp.feedback = {
                          ...temp.feedback,
                          objective: html,
                        };
                        setSelectedInterviewers(temp);
                      }}
                    />
                  }
                />
              ) : (
                <FeedbackViewPopup
                  onClickClose={{
                    onClick: () => {
                      setSelectedInterviewers(null);
                    },
                  }}
                  onClickNext={{
                    onClick: () => {
                      currentIndex = (currentIndex + 1) % interviewers.length;
                      setSelectedInterviewers(
                        interviewers[Number(currentIndex)],
                      );
                    },
                  }}
                  onClickPrev={{
                    onClick: () => {
                      currentIndex =
                        currentIndex - 1 > 0
                          ? currentIndex - 1
                          : interviewers.length - 1;
                      setSelectedInterviewers(
                        interviewers[Number(currentIndex)],
                      );
                    },
                  }}
                  slotAvatarWithName={
                    <AvatarWithName
                      textName={`${selectedInterviewers.interviewerDetails.first_name} ${selectedInterviewers.interviewerDetails.last_name}`}
                      slotAvatar={
                        <Avatar
                          src={
                            selectedInterviewers.interviewerDetails
                              ?.profile_image
                          }
                          alt={
                            selectedInterviewers.interviewerDetails?.first_name
                          }
                          sx={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      }
                    />
                  }
                  textObjective={
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedInterviewers.feedback?.objective ||
                          'Feedback not Submitted',
                      }}
                    />
                  }
                  textRecomendation={
                    selectedInterviewers.feedback
                      ? re_mapper[
                          Number(selectedInterviewers.feedback.recommendation)
                        ]
                      : '-'
                  }
                />
              )}
            </Dialog>
          );
        })}
    </>
  );
};

export default Feedback;

const getInterviewers = async ({ meeting_id }: { meeting_id: string }) => {
  const interviewers = await supabase
    .from('interview_meeting_user')
    .select()
    .eq('interview_meeting_id', meeting_id)
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data as unknown as CustomDatabase['public']['Tables']['interview_meeting_user']['Row'][];
    });
  if (interviewers.length) {
    const interviewersDetails = await supabase
      .from('recruiter_user')
      .select()
      .in(
        'user_id',
        interviewers.map((da) => da.interviewer_id),
      )
      .then(({ data: userData, error }) => {
        if (error) throw new Error(error.message);
        return userData;
      });
    const temp: { [key: string]: (typeof interviewersDetails)[number] } = {};
    interviewersDetails.forEach((detail) => (temp[detail.user_id] = detail));
    return interviewers.map((int) => ({
      ...int,
      interviewerDetails: temp[int.interviewer_id],
    }));
  } else interviewers.map((int) => ({ ...int, interviewerDetails: null }));
};

const saveInterviewerFeedback = async ({
  feedback,
  id,
  meeting_id,
}: {
  feedback: any;
  id: string;
  meeting_id: string;
}) => {
  return supabase
    .from('interview_meeting_user')
    .update({ feedback })
    .eq('interviewer_id', id)
    .eq('interview_meeting_id', meeting_id)
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data as unknown as CustomDatabase['public']['Tables']['interview_meeting_user']['Row'];
    });
};

const re_mapper = {
  0: 'Strongly not recommended',
  1: 'Not recommended',
  2: 'Not recommended',
  3: 'Not recommended',
  4: 'Not recommended',
  5: 'Neutral',
  6: 'Mildly recommended',
  7: 'Recommended',
  8: 'Recommended',
  9: 'Highly recommended',
  10: 'Exceptionally recommended',
};
