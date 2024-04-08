import { Dialog, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';

import {
  AvatarWithName,
  FeedbackTableRow,
  FeedbackViewPopup,
  MyFeedbackPopup,
  RoundedNumber,
  ScheduleTabFeedback,
} from '@/devlink3';
import Avatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import DynamicLoader from '@/src/components/CompanyDetailComp/Interviewers/DynamicLoader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { DatabaseTable } from '@/src/types/customSchema';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import {
  re_mapper,
  saveInterviewerFeedback,
  useInterviewerRelations,
} from './util.function';

type FeedbackWindowInterviewersType = {
  [key: string]: {
    feedback: {
      recommendation: number;
      objective: string;
    };
    user_id: string;
    session: { id: string; title: string; created_at: string };
    relation_id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    position: string;
  }[];
};

const FeedbackWindow = ({
  interview_sessions,
  multiSession,
}: {
  interview_sessions: { id: string; title: string; created_at: string }[];
  multiSession: boolean;
}) => {
  const {
    data: relationsData,
    isLoading,
    refetch,
  } = useInterviewerRelations({
    session_ids: interview_sessions.map((item) => item.id),
  });
  const { isAllowed, userDetails } = useAuthDetails();
  const { members } = useAuthDetails();
  const user_id = userDetails?.user.id;

  const tempRelations = useMemo(() => {
    const tempData = (
      (relationsData || []) as unknown as {
        session_id: string;
        feedback: (typeof relationsData)[number]['feedback'];
        interview_module_relation: (typeof relationsData)[number]['interview_module_relation'][number];
      }[]
    ).filter((item) => Boolean(item.interview_module_relation?.id));

    const tempRelation: {
      [key: string]: {
        feedback: (typeof relationsData)[number]['feedback'];
        relation_id: string;
        user_id: string;
      }[];
    } = {};
    //   console.log(tempData.length);
    for (let item of tempData) {
      const temp = tempRelation[item.session_id] || [];
      temp.push({
        feedback: item.feedback,
        relation_id: item.interview_module_relation.id,
        user_id: item.interview_module_relation.user_id,
      });
      tempRelation[item.session_id] = temp;
      // console.log({ item, tempRelation });
    }
    return tempRelation;
  }, [relationsData]);

  const interviewers = useMemo(() => {
    const interviewers: FeedbackWindowInterviewersType = {};
    if (tempRelations) {
      interview_sessions.forEach((session) => {
        const temp = tempRelations[String(session.id)] || [];
        temp.forEach((memRelation) => {
          const tempMem = members.find(
            (item) => item.user_id === memRelation.user_id,
          );
          const tempInterviews = interviewers[String(session.id)] || [];
          tempInterviews.push({
            user_id: tempMem.user_id,
            session,
            relation_id: memRelation.relation_id,
            first_name: tempMem.first_name,
            last_name: tempMem.last_name,
            email: tempMem.email,
            profile_image: tempMem.profile_image,
            position: tempMem.position,
            feedback: memRelation.feedback,
          });
          interviewers[String(session.id)] = tempInterviews;
        });
      });
    } else {
      interview_sessions.forEach((session_id) => {
        interviewers[String(session_id)] = [];
      });
    }
    return interviewers;
  }, [tempRelations]);

  //   tempRelations?.forEach((item) => {
  //     interviewRelations[item.interview_module_relation.user_id] = {
  //       relation_id: item.interview_module_relation.id,
  //       feedback: item.feedback,
  //     };
  //   });

  //   const interviewers = schedule.users.map((item) => ({
  //     ...item,
  //     ...interviewRelations[item.id],
  //   }));

  const handelSubmit = async ({
    session_id,
    relation_id,
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => {
    return (
      relation_id &&
      (await saveInterviewerFeedback({
        // feedback: JSON.stringify(feedback),
        feedback,
        session_id,
        relation_id,
      }).then(() => {
        refetch();
        return true;
      }))
    );
  };
  return (
    <>
      <ShowCode>
        {/* <ShowCode.When
          isTrue={
            schedule.interview_meeting.status === 'cancelled' ||
            schedule.interview_meeting.status === 'confirmed' ||
            schedule.interview_meeting.status === 'reschedule'
          }
        >
          {`You can not give feedback because this interview is in ${schedule.interview_meeting.status} state`}
        </ShowCode.When> */}
        <ShowCode.When isTrue={isLoading}>
          <DynamicLoader />
        </ShowCode.When>
        <ShowCode.When isTrue={isAllowed(['admin'])}>
          <></>
          <AdminFeedback
            {...{
              user_id,
              multiSession,
              interviewers: Object.keys(interviewers)
                .map((key) => interviewers[String(key)])
                .flat(),
              handelSubmit,
            }}
          />
        </ShowCode.When>
        <ShowCode.Else>
          <></>
          <InterviewerFeedback
            multiSession={multiSession}
            interviewers={Object.keys(interviewers)
              .map((key) => interviewers[String(key)])
              .flat()}
            handelSubmit={handelSubmit}
          />
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
  multiSession,
}: {
  user_id: string;
  interviewers: FeedbackWindowInterviewersType[string];
  handelSubmit: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
    // eslint-disable-next-line no-unused-vars
    relation_id,
    // eslint-disable-next-line no-unused-vars
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => Promise<Boolean>;
  multiSession: boolean;
}) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<{
    index: number;
    interviewer: (typeof interviewers)[number];
  }>({ index: null, interviewer: null });

  const [edit, setEdit] = useState(false);

  return (
    <>
      <ScheduleTabFeedback
        isSessionVisible={multiSession}
        slotFeedbackTableRow={
          <>
            {interviewers.map((int, index) => {
              return (
                <FeedbackTableRow
                  key={int.user_id}
                  isSessionVisible={multiSession}
                  textSessionTime={
                    multiSession
                      ? new Date(int.session.created_at).toLocaleDateString()
                      : ''
                  }
                  textSessionTitle={multiSession ? int.session.title : ''}
                  isAddFeedback={!int.feedback && int.user_id === user_id}
                  isNoFeedback={!int.feedback && int.user_id !== user_id}
                  onClickFeedback={{
                    onClick: () => {
                      setSelectedInterviewer({
                        index,
                        interviewer: interviewers[Number(index)],
                      });
                      !interviewers[Number(index)].feedback &&
                        int.user_id === user_id &&
                        setEdit(true);
                    },
                  }}
                  slotAvatar={
                    <Avatar
                      variant='circular'
                      src={int.profile_image}
                      level={getFullName(int.first_name, int.last_name)}
                    />
                  }
                  textInterviewerName={`${int?.first_name} ${int?.last_name}`.trim()}
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
                  textRecommendation={
                    re_mapper[int.feedback?.recommendation] || ''
                  }
                  textjobTitle={int.position}
                />
              );
            })}
          </>
        }
      />
      {selectedInterviewer?.interviewer &&
        [1].map(() => {
          return (
            <Dialog
              key={1}
              // fullWidth
              open={selectedInterviewer.interviewer !== null}
              maxWidth={'lg'}
              // sx={{ '& .MuiPaper-root': { maxWidth: '650px' } }}
            >
              <ShowCode>
                <ShowCode.When isTrue={edit}>
                  <FeedbackForm
                    interviewerData={selectedInterviewer.interviewer}
                    onSubmit={(feedback) =>
                      handelSubmit(feedback).then(() => {
                        toast.success('Feedback Saved.');
                        setEdit(false);
                        setSelectedInterviewer({
                          index: null,
                          interviewer: null,
                        });
                      })
                    }
                    onClose={() => {
                      setEdit(false);
                      setSelectedInterviewer({
                        index: null,
                        interviewer: null,
                      });
                    }}
                  />
                </ShowCode.When>
                <ShowCode.Else>
                  <FeedbackViewPopup
                    isEditFeedbackVisible={
                      selectedInterviewer.interviewer.user_id === user_id
                    }
                    onClickEditFeedback={{
                      onClick: () => {
                        setEdit(true);
                      },
                    }}
                    onClickClose={{
                      onClick: () => {
                        setSelectedInterviewer(null);
                        setEdit(false);
                      },
                    }}
                    onClickNext={{
                      onClick: () => {
                        const index =
                          (selectedInterviewer.index + 1) % interviewers.length;
                        setSelectedInterviewer({
                          index,
                          interviewer: interviewers[Number(index)],
                        });
                      },
                    }}
                    onClickPrev={{
                      onClick: () => {
                        const index =
                          selectedInterviewer.index - 1 > -1
                            ? selectedInterviewer.index - 1
                            : interviewers.length - 1;
                        setSelectedInterviewer({
                          index,
                          interviewer: interviewers[Number(index)],
                        });
                      },
                    }}
                    slotAvatarWithName={
                      <AvatarWithName
                        textName={`${selectedInterviewer.interviewer.first_name} ${selectedInterviewer.interviewer.last_name}`}
                        slotAvatar={
                          <Avatar
                            variant='circular'
                            src={selectedInterviewer.interviewer?.profile_image}
                            level={getFullName(
                              selectedInterviewer.interviewer?.first_name,
                              selectedInterviewer.interviewer?.last_name,
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
                            selectedInterviewer.interviewer.feedback
                              ?.objective || 'Feedback not Submitted',
                        }}
                      />
                    }
                    textRecomendation={
                      selectedInterviewer.interviewer.feedback
                        ? re_mapper[
                            Number(
                              selectedInterviewer.interviewer.feedback
                                .recommendation,
                            )
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
  multiSession,
}: {
  interviewers: FeedbackWindowInterviewersType[string];
  handelSubmit: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
    // eslint-disable-next-line no-unused-vars
    relation_id,
    // eslint-disable-next-line no-unused-vars
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => Promise<Boolean>;
  multiSession: boolean;
}) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<{
    index: number;
    interviewer: (typeof interviewers)[number];
  }>({ index: null, interviewer: null });

  const [edit, setEdit] = useState(false);

  return (
    <>
      <ScheduleTabFeedback
        isSessionVisible={multiSession}
        slotFeedbackTableRow={
          <>
            {interviewers.map((int, index) => {
              return (
                <FeedbackTableRow
                  key={int.user_id}
                  isSessionVisible={multiSession}
                  textSessionTime={
                    multiSession
                      ? new Date(int.session.created_at).toLocaleDateString()
                      : ''
                  }
                  textSessionTitle={multiSession ? int.session.title : ''}
                  isAddFeedback={!int.feedback}
                  isNoFeedback={false}
                  onClickFeedback={{
                    onClick: () => {
                      setSelectedInterviewer({
                        index,
                        interviewer: interviewers[Number(index)],
                      });
                      !interviewers[Number(index)].feedback && setEdit(true);
                    },
                  }}
                  slotAvatar={
                    <Avatar
                      variant='circular'
                      src={int.profile_image}
                      level={getFullName(int.first_name, int.last_name)}
                    />
                  }
                  textInterviewerName={`${int?.first_name} ${int?.last_name}`.trim()}
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
                  textjobTitle={int.position}
                />
              );
            })}
          </>
        }
      />
      {selectedInterviewer?.interviewer &&
        [1].map(() => {
          return (
            <Dialog
              key={1}
              // fullWidth
              open={selectedInterviewer.interviewer !== null}
              maxWidth={'lg'}
              // sx={{ '& .MuiPaper-root': { maxWidth: '650px' } }}
            >
              <ShowCode>
                <ShowCode.When isTrue={edit}>
                  <FeedbackForm
                    interviewerData={selectedInterviewer.interviewer}
                    onSubmit={(feedback) =>
                      handelSubmit(feedback).then(() => {
                        toast.success('Feedback Saved.');
                        setEdit(false);
                        setSelectedInterviewer({
                          index: null,
                          interviewer: null,
                        });
                      })
                    }
                    onClose={() => {
                      setEdit(false);
                      setSelectedInterviewer({
                        index: null,
                        interviewer: null,
                      });
                    }}
                  />
                </ShowCode.When>
                <ShowCode.Else>
                  <FeedbackViewPopup
                    isEditFeedbackVisible={true}
                    onClickEditFeedback={{
                      onClick: () => {
                        setEdit(true);
                      },
                    }}
                    onClickClose={{
                      onClick: () => {
                        setSelectedInterviewer(null);
                        setEdit(false);
                      },
                    }}
                    onClickNext={{
                      onClick: () => {
                        const index =
                          (selectedInterviewer.index + 1) % interviewers.length;
                        setSelectedInterviewer({
                          index,
                          interviewer: interviewers[Number(index)],
                        });
                      },
                    }}
                    onClickPrev={{
                      onClick: () => {
                        const index =
                          selectedInterviewer.index - 1 > -1
                            ? selectedInterviewer.index - 1
                            : interviewers.length - 1;
                        setSelectedInterviewer({
                          index,
                          interviewer: interviewers[Number(index)],
                        });
                      },
                    }}
                    slotAvatarWithName={
                      <AvatarWithName
                        textName={`${selectedInterviewer.interviewer.first_name} ${selectedInterviewer.interviewer.last_name}`}
                        slotAvatar={
                          <Avatar
                            variant='circular'
                            src={selectedInterviewer.interviewer?.profile_image}
                            level={getFullName(
                              selectedInterviewer.interviewer?.first_name,
                              selectedInterviewer.interviewer?.last_name,
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
                            selectedInterviewer.interviewer.feedback
                              ?.objective || 'Feedback not Submitted',
                        }}
                      />
                    }
                    textRecomendation={
                      selectedInterviewer.interviewer.feedback
                        ? re_mapper[
                            Number(
                              selectedInterviewer.interviewer.feedback
                                .recommendation,
                            )
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

const FeedbackForm = ({
  interviewerData,
  onSubmit,
  onClose,
}: {
  interviewerData: FeedbackWindowInterviewersType[string][number];
  onSubmit: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
    // eslint-disable-next-line no-unused-vars
    relation_id,
    // eslint-disable-next-line no-unused-vars
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => void;
  onClose: () => void;
}) => {
  const [interviewer, setInterviewer] = useState(interviewerData);
  return (
    <MyFeedbackPopup
      onClickClose={{
        onClick: onClose,
      }}
      onClickSubmitFeedback={{
        onClick: () => {
          if (!interviewer.feedback) {
            return toast.warning('Please give Feedback');
          }
          onSubmit({
            relation_id: interviewer.relation_id,
            session_id: interviewer.session.id,
            feedback: interviewer.feedback,
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
                  isActive={(interviewer.feedback?.recommendation || 0) > i}
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
      textRecommendation={re_mapper[interviewer.feedback?.recommendation || 0]}
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
  );
};
