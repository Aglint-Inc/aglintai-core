/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Dialog, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
// import axios from 'axios';
import { useMemo, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { CdFeedback } from '@/devlink3/CdFeedback';
import { FeedbackCard } from '@/devlink3/FeedbackCard';
import { MyFeedbackPopup } from '@/devlink3/MyFeedbackPopup';
import { RoundedNumber } from '@/devlink3/RoundedNumber';
import Avatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import {
  IndividualIcon,
  PanelIcon,
} from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { API_request_feedback } from '@/src/pages/api/request_feedback/type';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import DynamicLoader from '../../Interviewers/DynamicLoader';
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
    session: {
      id: string;
      title: string;
      created_at: string;
      time: {
        start: string;
        end: string;
      };
      status:
        | 'waiting'
        | 'confirmed'
        | 'completed'
        | 'cancelled'
        | 'reschedule'
        | 'not_scheduled';
      session_type: DatabaseEnums['session_type'];
    };
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
  candidate,
}: {
  interview_sessions: FeedbackWindowInterviewersType[string][number]['session'][];
  candidate: { name: string; email: string; job_id: string };
}) => {
  const {
    data: relationsData,
    isLoading,
    refetch,
  } = useInterviewerRelations({
    session_ids: interview_sessions.map((item) => item.id),
  });

  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
  const user_id = recruiterUser?.user_id;
  const isAdmin = recruiterUser?.role === 'admin';

  const tempRelations = useMemo(() => {
    const tempData = (
      (relationsData || []) as unknown as {
        session_id: string;
        feedback: (typeof relationsData)[number]['feedback'];
        interview_module_relation: (typeof relationsData)[number]['interview_module_relation'];
      }[]
    ).filter((item) => Boolean(item.interview_module_relation?.id));

    const tempRelation: {
      [key: string]: {
        feedback: (typeof relationsData)[number]['feedback'];
        relation_id: string;
        user_id: string;
      }[];
    } = {};

    for (let item of tempData) {
      const temp = tempRelation[item.session_id] || [];
      temp.push({
        feedback: item.feedback,
        relation_id: item.interview_module_relation.id,
        user_id: item.interview_module_relation.user_id,
      });
      tempRelation[item.session_id] = temp;
    }
    return tempRelation;
  }, [relationsData]);

  const interviewers = useMemo(() => {
    const interviewers: FeedbackWindowInterviewersType = {};

    if (tempRelations) {
      interview_sessions.forEach((session) => {
        const temp = tempRelations[String(session.id)] || [];
        temp.forEach((memRelation) => {
          const tempMem = relationsData.find(
            (item) =>
              item.interview_module_relation.user_id === memRelation.user_id,
          ).interview_module_relation.recruiter_user;
          if (!tempMem) return;
          interviewers[String(session.id)] = [
            ...(interviewers[String(session.id)] || []),
            {
              user_id: tempMem.user_id,
              session,
              relation_id: memRelation.relation_id,
              first_name: tempMem.first_name,
              last_name: tempMem.last_name,
              email: tempMem.email,
              profile_image: tempMem.profile_image,
              position: tempMem.position,
              feedback: memRelation.feedback,
            },
          ];
        });
      });
    } else {
      interview_sessions.forEach((session_id) => {
        interviewers[String(session_id)] = [];
      });
    }
    return interviewers;
  }, [tempRelations]);

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
        <ShowCode.When isTrue={isLoading}>
          <Stack position={'relative'} height={'calc(100vh - 172px)'}>
            <DynamicLoader />
          </Stack>
        </ShowCode.When>
        <ShowCode.When isTrue={checkPermissions(['scheduling_actions'])}>
          <AdminFeedback
            {...{
              user_id,
              isAdmin,

              interviewers: Object.keys(interviewers)
                .map((key) => interviewers[String(key)])
                .flat(),
              handelSubmit,
              candidate,
            }}
          />
        </ShowCode.When>
        <ShowCode.Else>
          <InterviewerFeedback
            interviewers={Object.keys(interviewers)
              .map((key) => interviewers[String(key)])
              .flat()
              .filter((item) => item.user_id === user_id)}
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
  candidate,
  isAdmin,
}: {
  user_id: string;
  isAdmin: boolean;
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

  candidate: {
    email: string;
    name: string;
    job_id: string;
  };
}) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<{
    index: number;
    interviewer: (typeof interviewers)[number];
  }>({ index: null, interviewer: null });

  const handelFeedbackRequest = async ({
    e,
    session_id,
    relation_id,
    receiver,
  }: {
    e: MouseEvent;
    session_id: string;
    relation_id: string;
    receiver: { name: string; email: string };
  }) => {
    e.stopPropagation();

    await requestFeedback({
      session_id,
      relation_id,
      job_id: candidate.job_id,
      receiver,
      candidate: {
        email: candidate.email,
        name: candidate.name,
      },
    });

    return handelSubmit({
      session_id: session_id,
      relation_id: relation_id,
      feedback: { recommendation: null, objective: null },
    }).then(() => {
      toast.success('Feedback request email sent successfully.');
      return true;
    });
  };
  const sessions: { [key: string]: typeof interviewers } = {};
  interviewers.forEach((item) => {
    sessions[item.session.id] = [...(sessions[item.session.id] || []), item];
  });
  const router = useRouter();
  return (
    <>
      <Stack direction={'column'} spacing={2} p={2}>
        {router.pathname !== '/scheduling/view'
          ? Object.keys(sessions)
              .map((key) => {
                const session = sessions[key] || [];
                if (!session.length) return null;
                return (
                  <>
                    <CdFeedback
                      slotHeader={
                        <>
                          {session[0].session.session_type === 'panel' ? (
                            <TextWithIcon
                              iconName={<PanelIcon size={18} />}
                              iconSize={4}
                              textContent={session[0].session.title}
                            />
                          ) : (
                            <TextWithIcon
                              iconName={<IndividualIcon size={18} />}
                              iconSize={4}
                              textContent={session[0].session.title}
                            />
                          )}
                          <TextWithIcon
                            iconName={'calendar_today'}
                            iconSize={4}
                            textContent={dayjsLocal(
                              session[0].session.time.start,
                            ).format('ddd, MMMM DD, YYYY')}
                          />
                          <TextWithIcon
                            iconName={'schedule'}
                            iconSize={4}
                            textContent={`${dayjsLocal(
                              session[0].session.time.start,
                            ).format('hh:mm')} - ${dayjsLocal(
                              session[0].session.time.end,
                            ).format('hh:mm')}`}
                            fontColor={'neutral'}
                            fontSize={1}
                          />

                          <GlobalBadge
                            color={'success'}
                            textBadge={session[0].session.status}
                            showIcon={true}
                            iconName={'circle'}
                          />
                        </>
                      }
                      slotBody={
                        <>
                          {session.map((int, index) => {
                            const isFeedBackEnabled =
                              int.session.status === 'completed';
                            return (
                              <>
                                <FeedbackCardDetails
                                  index={index}
                                  int={int}
                                  user_id={user_id}
                                  isFeedBackEnabled={isFeedBackEnabled}
                                  isAdmin={isAdmin}
                                  setSelectedInterviewer={
                                    setSelectedInterviewer
                                  }
                                  handelFeedbackRequest={handelFeedbackRequest}
                                />
                              </>
                            );
                          })}
                        </>
                      }
                    />
                  </>
                );
              })
              .filter((item) => Boolean(item))
          : Object.values(sessions)[0]?.map((int, index) => {
              const isFeedBackEnabled = int.session.status === 'completed';
              return (
                <>
                  <FeedbackCardDetails
                    index={index}
                    int={int}
                    user_id={user_id}
                    isFeedBackEnabled={isFeedBackEnabled}
                    isAdmin={isAdmin}
                    setSelectedInterviewer={setSelectedInterviewer}
                    handelFeedbackRequest={handelFeedbackRequest}
                  />
                </>
              );
            })}
      </Stack>
      <EditFeedbackPopUp
        setSelectedInterviewer={setSelectedInterviewer}
        selectedInterviewer={selectedInterviewer}
        handelSubmit={handelSubmit}
      />
    </>
  );
};

const InterviewerFeedback = ({
  interviewers,
  handelSubmit,
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
}) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<{
    index: number;
    interviewer: (typeof interviewers)[number];
  }>({ index: null, interviewer: null });

  const sessions: { [key: string]: typeof interviewers } = {};
  interviewers.forEach((item) => {
    sessions[item.session.id] = [...(sessions[item.session.id] || []), item];
  });
  const router = useRouter();
  return (
    <>
      <Stack direction={'column'} spacing={2} p={2}>
        <>
          {router.pathname !== '/scheduling/view'
            ? Object.keys(sessions)
                .map((key) => {
                  const session = sessions[key] || [];
                  if (!session.length) return null;
                  return (
                    <CdFeedback
                      key={key}
                      slotHeader={
                        <>
                          {session[0].session.session_type === 'panel' ? (
                            <TextWithIcon
                              iconName={<PanelIcon size={18} />}
                              iconSize={4}
                              textContent={session[0].session.title}
                            />
                          ) : (
                            <TextWithIcon
                              iconName={<IndividualIcon size={18} />}
                              iconSize={4}
                              textContent={session[0].session.title}
                            />
                          )}
                          <TextWithIcon
                            iconName={'calendar_today'}
                            iconSize={4}
                            textContent={dayjsLocal(
                              session[0].session.time.start,
                            ).format('ddd, MMMM DD, YYYY')}
                          />
                          <TextWithIcon
                            iconName={'schedule'}
                            iconSize={4}
                            textContent={`${dayjsLocal(
                              session[0].session.time.start,
                            ).format('hh:mm')} - ${dayjsLocal(
                              session[0].session.time.end,
                            ).format('hh:mm')}`}
                            fontColor={'neutral'}
                            fontSize={1}
                          />

                          <GlobalBadge
                            color={'success'}
                            textBadge={session[0].session.status}
                            showIcon={true}
                            iconName={'circle'}
                          />
                        </>
                      }
                      slotBody={
                        <>
                          {session.map((int, index) => {
                            const isFeedBackEnabled =
                              int.session.status === 'completed';
                            return (
                              <FeedbackCardDetails
                                key={index}
                                isFeedBackEnabled={isFeedBackEnabled}
                                index={index}
                                setSelectedInterviewer={setSelectedInterviewer}
                                int={int}
                              />
                            );
                          })}
                        </>
                      }
                    />
                  );
                })
                .filter((item) => Boolean(item))
            : Object.values(sessions)[0]?.map((int, index) => {
                const isFeedBackEnabled = int.session.status === 'completed';
                return (
                  <FeedbackCardDetails
                    key={index}
                    isFeedBackEnabled={isFeedBackEnabled}
                    index={index}
                    setSelectedInterviewer={setSelectedInterviewer}
                    int={int}
                  />
                );
              })}
        </>
        <EditFeedbackPopUp
          setSelectedInterviewer={setSelectedInterviewer}
          selectedInterviewer={selectedInterviewer}
          handelSubmit={handelSubmit}
        />
      </Stack>
    </>
  );
};

function EditFeedbackPopUp({
  setSelectedInterviewer,
  selectedInterviewer,
  handelSubmit,
}: {
  selectedInterviewer: any;
  setSelectedInterviewer: any;
  handelSubmit: any;
}) {
  return (
    <>
      {selectedInterviewer?.interviewer &&
        [1].map(() => {
          return (
            <Dialog
              key={1}
              // fullWidth
              open={selectedInterviewer.interviewer !== null}
              onClose={() => {
                setSelectedInterviewer(null);
              }}
              maxWidth={'lg'}
              // sx={{ '& .MuiPaper-root': { maxWidth: '650px' } }}
            >
              <FeedbackForm
                interviewerData={selectedInterviewer.interviewer}
                onSubmit={(feedback) =>
                  handelSubmit(feedback).then(() => {
                    toast.success('Feedback saved successfully.');

                    setSelectedInterviewer({
                      index: null,
                      interviewer: null,
                    });
                  })
                }
                onCancel={() => {
                  setSelectedInterviewer({
                    index: null,
                    interviewer: null,
                  });
                }}
                onClose={() => {
                  setSelectedInterviewer({
                    index: null,
                    interviewer: null,
                  });
                }}
              />
            </Dialog>
          );
        })}
    </>
  );
}
function FeedbackCardDetails({
  index,
  int,
  user_id,
  isFeedBackEnabled,
  isAdmin = false,
  setSelectedInterviewer,
  handelFeedbackRequest,
}: {
  index: number;
  int: FeedbackWindowInterviewersType[string][number];
  user_id?: string;
  isFeedBackEnabled: boolean;
  isAdmin?: boolean;
  setSelectedInterviewer: any;
  handelFeedbackRequest?: any;
}) {
  return (
    <FeedbackCard
      slotImage={
        <Avatar
          variant='rounded-medium'
          src={int.profile_image}
          level={getFullName(int.first_name, int.last_name)}
        />
      }
      textName={getFullName(int.first_name, int.last_name)}
      textRole={int.position}
      slotButton={
        <ShowCode>
          <ShowCode.When isTrue={isFeedBackEnabled && isAdmin}>
            <ShowCode>
              <ShowCode.When isTrue={Boolean(int.user_id === user_id)}>
                <ButtonSoft
                  size={1}
                  color={
                    int.feedback && int.feedback?.recommendation
                      ? 'neutral'
                      : 'accent'
                  }
                  textButton={
                    int.feedback && int.feedback?.recommendation
                      ? 'Edit Feedback'
                      : 'Add Feedback'
                  }
                  isLeftIcon={true}
                  iconName={
                    int.feedback && int.feedback?.recommendation
                      ? 'edit_square'
                      : 'add'
                  }
                  onClickButton={{
                    onClick: () => {
                      if (isFeedBackEnabled) {
                        setSelectedInterviewer({
                          index,
                          interviewer: int,
                        });
                      }
                    },
                  }}
                />
              </ShowCode.When>
              <ShowCode.When
                isTrue={
                  Boolean(int.feedback && int.feedback?.recommendation) &&
                  int.user_id !== user_id
                }
              >
                {null}
              </ShowCode.When>
              <ShowCode>
                <ShowCode.When
                  isTrue={
                    int.feedback &&
                    !int.feedback?.recommendation &&
                    int.user_id !== user_id
                  }
                >
                  <ButtonSoft
                    size={1}
                    textButton={'Re-request Feedback'}
                    onClickButton={{
                      onClick: (e) => {
                        handelFeedbackRequest({
                          e,
                          session_id: int.session.id,
                          relation_id: int.relation_id,
                          receiver: {
                            name: `${int.first_name || ''} ${int.last_name || ''}`.trim(),
                            email: int.email,
                          },
                        });
                      },
                    }}
                  />
                </ShowCode.When>
                <ShowCode.Else>
                  <ButtonSoft
                    size={1}
                    textButton={'Request Feedback'}
                    onClickButton={{
                      onClick: (e) => {
                        handelFeedbackRequest({
                          e,
                          session_id: int.session.id,
                          relation_id: int.relation_id,
                          receiver: {
                            name: `${int.first_name || ''} ${int.last_name || ''}`.trim(),
                            email: int.email,
                          },
                        });
                      },
                    }}
                  />
                </ShowCode.Else>
              </ShowCode>
            </ShowCode>
          </ShowCode.When>
          <ShowCode.Else>
            <>
              <ButtonSoft
                size={1}
                color={
                  int.feedback && int.feedback?.objective ? 'neutral' : 'accent'
                }
                textButton={
                  int.feedback && int.feedback?.objective
                    ? 'Edit Feedback'
                    : 'Add Feedback'
                }
                isLeftIcon={true}
                iconName={
                  int.feedback && int.feedback?.objective
                    ? 'edit_square'
                    : 'add'
                }
                onClickButton={{
                  onClick: () => {
                    if (isFeedBackEnabled) {
                      setSelectedInterviewer({
                        index,
                        interviewer: int,
                      });
                    }
                  },
                }}
              />
            </>
          </ShowCode.Else>
        </ShowCode>
      }
      slotDesc={
        <Stack direction={'column'} gap={'10px'}>
          <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
            <ShowCode>
              <ShowCode.When isTrue={!!int.feedback?.recommendation}>
                <Stack direction={'column'} gap={'10px'}>
                  <Stack direction={'row'} gap={'10px'}>
                    <Typography fontSize={20}>
                      <GlobalIcon
                        size={'30'}
                        color={'#000'}
                        iconName={'kid_star'}
                      />
                    </Typography>
                    <Typography>
                      Recommendation Level : {int.feedback?.recommendation}
                    </Typography>
                  </Stack>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: int.feedback?.objective,
                    }}
                  ></div>
                </Stack>
              </ShowCode.When>
              <ShowCode.Else>
                <Typography>Not Submitted Feedback</Typography>
              </ShowCode.Else>
            </ShowCode>
          </Stack>
        </Stack>
      }
    />
  );
}

const FeedbackForm = ({
  interviewerData,
  onSubmit,
  onClose,
  onCancel,
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
  onCancel: () => void;
}) => {
  const [interviewer, setInterviewer] = useState(interviewerData);
  return (
    <MyFeedbackPopup
      onClickClose={{
        onClick: onClose,
      }}
      slotButton={
        <>
          <ButtonSoft
            textButton='Cancel'
            size={2}
            color={'neutral'}
            onClickButton={{ onClick: onCancel }}
          />
          <ButtonSolid
            textButton='Submit Feedback'
            size={2}
            onClickButton={{
              onClick: () => {
                if (!interviewer.feedback) {
                  return toast.warning('Please provide feedback.');
                }
                onSubmit({
                  relation_id: interviewer.relation_id,
                  session_id: interviewer.session.id,
                  feedback: interviewer.feedback,
                });
              },
            }}
          />
        </>
      }
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
          placeholder='Your feedback.'
          initialValue={interviewer.feedback?.objective || ''}
          border
          height='300px'
          isSize={false}
          isAlign={false}
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

const requestFeedback = (body: API_request_feedback['request']) => {
  return axios
    .post<API_request_feedback['response']>('/api/request_feedback', body)
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.mailSent;
    });
};
