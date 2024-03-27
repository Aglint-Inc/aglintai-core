import { Dialog, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  AvatarWithName,
  Feedback,
  FeedbackTableRow,
  FeedbackViewPopup,
  MyFeedbackPopup,
  RoundedNumber,
  ScheduleTabFeedback,
} from '@/devlink3';
import Avatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { CustomDatabase } from '@/src/types/customSchema';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

const FeedbackWindow = () => {
  const param = useSearchParams();
  const meeting_id = param.get('meeting_id');
  const { isAllowed, userDetails } = useAuthDetails();
  const user_id = userDetails?.user.id;
  const [interviewers, setInterviewers] = useState<
    Awaited<ReturnType<typeof getInterviewers>>
  >([]);

  const handelSubmit = async (
    feedback: CustomDatabase['public']['Tables']['interview_meeting_user']['Row']['feedback'],
  ) => {
    await saveInterviewerFeedback({
      // feedback: JSON.stringify(feedback),
      feedback,
      id: user_id,
      meeting_id,
    }).then((row) => {
      const temp = interviewers.map((item) => {
        if (item.id === row.id) return { ...item, ...row };
        return item;
      });
      setInterviewers(temp);
      return true;
    });
    return false;
  };

  useEffect(() => {
    if (meeting_id && user_id) {
      getInterviewers({ meeting_id }).then((data) => {
        setInterviewers(data);
      });
    }
  }, [meeting_id, user_id]);
  return (
    <>
      <ShowCode>
        <ShowCode.When isTrue={isAllowed(['admin'])}>
          <AdminFeedback {...{ user_id, interviewers, handelSubmit }} />
        </ShowCode.When>
        <ShowCode.Else>
          <InterviewerFeedback {...{ interviewers, handelSubmit }} />
        </ShowCode.Else>
      </ShowCode>
    </>
  );
};

export default FeedbackWindow;

const AdminFeedback = ({
  user_id,
  interviewers,
  handelSubmit,
}: {
  user_id: string;
  interviewers: Awaited<ReturnType<typeof getInterviewers>>;
  handelSubmit: (
    // eslint-disable-next-line no-unused-vars
    x: CustomDatabase['public']['Tables']['interview_meeting_user']['Row']['feedback'],
  ) => Promise<Boolean>;
}) => {
  let currentIndex: number | null = null;
  const [selectedInterviewers, setSelectedInterviewers] =
    useState<(typeof interviewers)[number]>(null);

  const [edit, setEdit] = useState(false);

  // const handelSubmit = (feedback) => {
  //   saveInterviewerFeedback({
  //     // feedback: JSON.stringify(feedback),
  //     feedback: selectedInterviewers.feedback,
  //     id: user_id,
  //     meeting_id,
  //   }).then((row) => {
  //     setEdit(false);
  //     const temp = [...interviewers];
  //     temp[Number(currentIndex)] = { ...temp[Number(currentIndex)], ...row };
  //     //  temp.map((item) => {
  //     //    if (item.id === row.id)
  //     //      return { ...temp[Number(currentIndex)], ...row };
  //     //    return item;
  //     //  });
  //     setInterviewers(temp);
  //     currentIndex = null;
  //     setSelectedInterviewers(null);
  //     toast.success('Feedback Saved.');
  //   });
  // };

  return (
    <>
      <ScheduleTabFeedback
        slotFeedbackTableRow={
          <>
            {interviewers.map((int, index) => {
              int.interviewerDetails = int.interviewerDetails || {
                user_id: 'something',
                first_name: 'No',
                last_name: 'Name',
                position: 'No Position',
                profile_image: '',
              };
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
                      // !interviewers[Number(currentIndex)].feedback &&
                      //   setEdit(true);
                    },
                  }}
                  slotAvatar={
                    <Avatar
                      variant='circular'
                      src={int.interviewerDetails.profile_image}
                      level={getFullName(
                        int.interviewerDetails.first_name,
                        int.interviewerDetails.last_name,
                      )}
                    />
                  }
                  textInterviewerName={`${int.interviewerDetails?.first_name} ${int.interviewerDetails?.last_name}`.trim()}
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
              // fullWidth
              open={selectedInterviewers !== null}
              maxWidth={'lg'}
              // sx={{ '& .MuiPaper-root': { maxWidth: '650px' } }}
            >
              <ShowCode>
                <ShowCode.When isTrue={edit}>
                  <MyFeedbackPopup
                    onClickClose={{
                      onClick: () => {
                        currentIndex = null;
                        setSelectedInterviewers(null);
                        setEdit(false);
                      },
                    }}
                    onClickSubmitFeedback={{
                      onClick: () => {
                        if (!selectedInterviewers.feedback) {
                          return toast.warning('Please give Feedback');
                        }
                        handelSubmit(selectedInterviewers.feedback).then(() => {
                          currentIndex = null;
                          setSelectedInterviewers(null);
                          toast.success('Feedback Saved.');
                          setEdit(false);
                        });
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
                      // <Stack
                      //   sx={{
                      //     mt: '8px',
                      //     border: '1px solid',
                      //     borderColor: palette.grey[300],
                      //     borderRadius: '4px',
                      //     p: '2px',
                      //   }}
                      // >
                      <TipTapAIEditor
                        placeholder='Give Your Feedback.'
                        initialValue={
                          selectedInterviewers.feedback?.objective || ''
                        }
                        border
                        handleChange={(html) => {
                          const temp = { ...selectedInterviewers };
                          temp.feedback = {
                            ...temp.feedback,
                            objective: html,
                          };
                          setSelectedInterviewers(temp);
                        }}
                      />
                      // </Stack>
                    }
                  />
                </ShowCode.When>
                <ShowCode.Else>
                  <FeedbackViewPopup
                    isEditFeedbackVisible={
                      selectedInterviewers.interviewer_id === user_id
                    }
                    onClickEditFeedback={{
                      onClick: () => {
                        setEdit(true);
                      },
                    }}
                    onClickClose={{
                      onClick: () => {
                        setSelectedInterviewers(null);
                        setEdit(false);
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
                            variant='circular'
                            src={
                              selectedInterviewers.interviewerDetails
                                ?.profile_image
                            }
                            level={getFullName(
                              selectedInterviewers.interviewerDetails
                                ?.first_name,
                              selectedInterviewers.interviewerDetails
                                ?.last_name,
                            )}
                            dynamicSizing
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
                </ShowCode.Else>
              </ShowCode>
            </Dialog>
          );
        })}
    </>
  );
};

const InterviewerFeedback = ({
  interviewers,
  handelSubmit,
}: {
  interviewers: Awaited<ReturnType<typeof getInterviewers>>;
  handelSubmit: (
    // eslint-disable-next-line no-unused-vars
    x: CustomDatabase['public']['Tables']['interview_meeting_user']['Row']['feedback'],
  ) => Promise<Boolean>;
}) => {
  const [interviewer, setInterviewer] = useState(interviewers[0]);

  const [edit, setEdit] = useState(false);

  return (
    <>
      <Feedback
        onClickEditFeedback={{ onClick: () => setEdit(true) }}
        textFeedback={
          <Typography
            dangerouslySetInnerHTML={{
              __html:
                interviewer.feedback?.objective || 'Feedback not Submitted',
            }}
          />
        }
        textRecommendLevel={
          re_mapper[interviewer.feedback?.recommendation] || '-'
        }
        // slotFeedbackTableRow={
        //   <>
        //     {interviewers.map((int, index) => {
        //       int.interviewerDetails = int.interviewerDetails || {
        //         user_id: 'something',
        //         first_name: 'No',
        //         last_name: 'Name',
        //         position: 'No Position',
        //         profile_image: '',
        //       };
        //       return (
        //         <FeedbackTableRow
        //           key={int.id}
        //           isAddFeedback={
        //             !int.feedback && int.interviewer_id === user_id
        //           }
        //           isNoFeedback={!int.feedback}
        //           onClickFeedback={{
        //             onClick: () => {
        //               currentIndex = index;
        //               setSelectedInterviewers(
        //                 interviewers[Number(currentIndex)],
        //               );
        //               // !interviewers[Number(currentIndex)].feedback &&
        //               //   setEdit(true);
        //             },
        //           }}
        //           slotAvatar={
        //             <Avatar
        //               variant='circular'
        //               src={int.interviewerDetails.profile_image}
        //               level={getFullName(
        //                 int.interviewerDetails.first_name,
        //                 int.interviewerDetails.last_name,
        //               )}
        //             />
        //           }
        //           textInterviewerName={`${int.interviewerDetails?.first_name} ${int.interviewerDetails?.last_name}`.trim()}
        //           // @ts-ignore
        //           textFeedback={
        //             <Typography
        //               dangerouslySetInnerHTML={{
        //                 __html:
        //                   int.feedback?.objective || 'Feedback not Submitted',
        //               }}
        //             />
        //           }
        //           // @ts-ignore
        //           textRecommendation={re_mapper[int.feedback?.recommendation]}
        //           textjobTitle={int.interviewerDetails.position}
        //         />
        //       );
        //     })}
        //   </>
        // }
      />
      {edit && (
        <Dialog
          key={1}
          // fullWidth
          open={edit}
          maxWidth={'lg'}
          // sx={{ '& .MuiPaper-root': { maxWidth: '650px' } }}
        >
          <MyFeedbackPopup
            onClickClose={{
              onClick: () => {
                setEdit(false);
              },
            }}
            onClickSubmitFeedback={{
              onClick: () => {
                if (!interviewer.feedback) {
                  return toast.warning('Please give Feedback');
                }
                handelSubmit(interviewer.feedback).then(() => {
                  toast.success('Feedback Saved.');
                  setEdit(false);
                });
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
                          (interviewer.feedback?.recommendation || 0) > i
                        }
                        onClickRound={{
                          onClick: () => {
                            const temp = { ...interviewer };
                            temp.feedback = {
                              ...temp.feedback,
                              recommendation: i + 1,
                            };
                            setInterviewer(temp);
                          },
                        }}
                      />
                    );
                  })}
              </>
            }
            textRecommendation={
              re_mapper[interviewer.feedback?.recommendation || 0]
            }
            slotObjective={
              <TipTapAIEditor
                placeholder='Give Your Feedback.'
                initialValue={interviewer.feedback?.objective || ''}
                border
                handleChange={(html) => {
                  const temp = { ...interviewer };
                  temp.feedback = {
                    ...temp.feedback,
                    objective: html,
                  };
                  setInterviewer(temp);
                }}
              />
            }
          />
        </Dialog>
      )}
    </>
  );
};

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
      .select('user_id, first_name, last_name, position, profile_image')
      .in(
        'user_id',
        interviewers
          .map((da) => da.interviewer_id)
          .filter((item) => Boolean(item)),
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
