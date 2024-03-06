import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import {
  AllInterviewers,
  AllInterviewersCard,
  AllInterviewersDetail,
  MemberListCard,
  TextWithBg
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import DynamicLoader from './DynamicLoader';
import Interviews from './Interviews';
import PauseResumeDialog from './PauseResumeDialog';
import MuiAvatar from '../../Common/MuiAvatar';
import SchedulingSettings from '../../Scheduling/Settings';

const InterviewTab = () => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<
    (typeof members)[0] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [pauseResumeDialog, setPauseResumeDialog] = useState<{
    isOpen: boolean;
    isAll: boolean;
    panel_id?: string;
    type: 'pause' | 'resume' | 'remove';
  }>({ isOpen: false, isAll: false, type: 'pause' });

  const [modulesAndMapping, setModulesAndMapping] = useState<{
    moduleMapping: {
      [key: string]: string[];
    };
    modules: {
      [key: string]: {
        created_at: string;
        duration_available: any;
        id: string;
        name: string;
        recruiter_id: string;
        pause_json: {
          [key: string]: {
            end_date: string;
            isManual: boolean;
            start_date: string;
          };
        };
      };
    };
  }>({ modules: {}, moduleMapping: {} });
  const { members, handelMemberUpdate: handelUpdateMember } = useAuthDetails();
  const interviewerMembers = members.filter(
    (member) => member.role === 'interviewer'
  );
  useEffect(() => {
    getInterviewModuleRelation(
      interviewerMembers.map((member) => member.user_id)
    ).then((data) => {
      setModulesAndMapping(data);
    });
  }, []);
  return (
    <Stack position={'relative'}>
      {loading && <DynamicLoader />}
      {!selectedInterviewer ? (
        <AllInterviewers
          slotAllInterviewesCard={
            <>
              {interviewerMembers.map((member) => {
                return (
                  <Stack
                    key={member.user_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedInterviewer(member);
                    }}
                  >
                    <AllInterviewersCard
                      slotProfileImage={
                        <MuiAvatar
                          src={member.profile_image}
                          level={member.first_name}
                          variant='circular'
                          height='100%'
                          width='100%'
                          fontSize='24px'
                        />
                      }
                      slotInterviewModules={
                        <>
                          {modulesAndMapping.moduleMapping[member.user_id]?.map(
                            (item) => (
                              <TextWithBg
                                key={modulesAndMapping.modules[String(item)].id}
                                text={
                                  modulesAndMapping.modules[String(item)].name
                                }
                              />
                            )
                          )}
                        </>
                      }
                      textName={`${member.first_name} ${member.last_name || ''}`}
                    />
                  </Stack>
                );
              })}
            </>
          }
        />
      ) : (
        <AllInterviewersDetail
          textModuleDescription={selectedInterviewer.first_name}
          slotSchedule={<Interviews allInterviews={interviewsData} />}
          slotModule={
            <>
              {modulesAndMapping.moduleMapping[
                selectedInterviewer.user_id
              ]?.map((item) => {
                const pauseResumeDetails = modulesAndMapping.modules[
                  String(item)
                ].pause_json
                  ? modulesAndMapping.modules[String(item)].pause_json[
                      selectedInterviewer.user_id
                    ]
                  : null;
                // console.log({ pauseResumeDetails });
                return (
                  <MemberListCard
                    key={modulesAndMapping.modules[String(item)].id}
                    textName={modulesAndMapping.modules[String(item)].name}
                    isPauseResumeVisible={Boolean(pauseResumeDetails)}
                    isPauseVisible={!pauseResumeDetails}
                    isResumeVisible={Boolean(pauseResumeDetails)}
                    textPauseResumeDate={
                      pauseResumeDetails
                        ? pauseResumeDetails.isManual
                          ? 'Paused indefinably'
                          : pauseResumeDetails.end_date
                            ? `Till ${dayjs(pauseResumeDetails.end_date).format('DD MMMM YYYY')}`
                            : '--'
                        : ''
                    }
                    onClickPauseInterview={{
                      onClick: () => {
                        setPauseResumeDialog((pre) => ({
                          ...pre,
                          isOpen: true,
                          type: 'pause',
                          panel_id: item
                        }));
                      }
                    }}
                    onClickResumeInterview={{
                      onClick: () => {
                        setPauseResumeDialog((pre) => ({
                          ...pre,
                          isOpen: true,
                          type: 'resume',
                          panel_id: item
                        }));
                      }
                    }}
                    onClickRemoveModule={{
                      onClick: () => {
                        setPauseResumeDialog((pre) => ({
                          ...pre,
                          isOpen: true,
                          type: 'remove',
                          panel_id: item
                        }));
                      }
                    }}
                  />
                );
              })}
            </>
          }
          onClickRemoveModules={{
            onClick: () => {
              setPauseResumeDialog({
                isOpen: true,
                isAll: true,
                type: 'remove'
              });
            }
          }}
          onClickPauseModules={{
            onClick: () => {
              setPauseResumeDialog({
                isOpen: true,
                isAll: true,
                type: 'pause'
              });
            }
          }}
          slotTimeZone={
            <>
              <SchedulingSettings
                initialData={selectedInterviewer.scheduling_settings as any}
                updateSettings={(x) => {
                  return handelUpdateMember({
                    user_id: selectedInterviewer.user_id,
                    data: { scheduling_settings: x }
                  });
                }}
              />
            </>
          }
        />
      )}
      <PauseResumeDialog
        pauseResumeDialog={pauseResumeDialog}
        close={() => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false
          }));
        }}
        pause={(pause_json) => {
          if (selectedInterviewer) {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isAll: false,
              isOpen: false
            }));
            setLoading(true);
            updateSchedule({
              user_id: selectedInterviewer.user_id,
              panel_id: pauseResumeDialog.isAll
                ? undefined
                : pauseResumeDialog.panel_id,
              pause_json
            })
              .then(() => {
                setModulesAndMapping((pre) => {
                  const temps = { ...pre.modules };

                  if (pauseResumeDialog.isAll) {
                    Object.keys(temps).forEach((key) => {
                      temps[String(key)] = {
                        ...pre.modules[String(key)],
                        pause_json: {
                          ...pre.modules[pauseResumeDialog.panel_id]
                            ?.pause_json,
                          [selectedInterviewer.user_id]: pause_json
                        }
                      };
                    });
                  } else {
                    temps[pauseResumeDialog.panel_id] = {
                      ...pre.modules[pauseResumeDialog.panel_id],
                      pause_json: {
                        ...pre.modules[pauseResumeDialog.panel_id]?.pause_json,
                        [selectedInterviewer.user_id]: pause_json
                      }
                    };
                  }
                  return {
                    ...pre,
                    modules: temps
                  };
                });
              })
              .finally(() => {
                setLoading(false);
              });
          }
        }}
        resume={() => {
          if (selectedInterviewer) {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isAll: false,
              isOpen: false
            }));
            setLoading(true);
            updateSchedule({
              user_id: selectedInterviewer.user_id,
              panel_id: pauseResumeDialog.isAll
                ? undefined
                : pauseResumeDialog.panel_id,
              pause_json: null
            })
              .then(() => {
                setModulesAndMapping((pre) => {
                  return {
                    ...pre,
                    modules: pauseResumeDialog.isAll
                      ? pre.modules
                      : {
                          ...pre.modules,
                          [pauseResumeDialog.panel_id]: {
                            ...pre.modules[pauseResumeDialog.panel_id],
                            pause_json: null
                          }
                        }
                  };
                });
              })
              .finally(() => {
                setLoading(false);
              });
          }
        }}
        remove={() => {
          if (selectedInterviewer) {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isAll: false,
              isOpen: false
            }));
            setLoading(true);
            removeMemberFormPanel({
              user_id: selectedInterviewer.user_id,
              panel_id: pauseResumeDialog.isAll
                ? undefined
                : pauseResumeDialog.panel_id
            })
              .then(() => {
                setModulesAndMapping((pre) => {
                  return {
                    ...pre,
                    moduleMapping: pauseResumeDialog.isAll
                      ? {}
                      : {
                          ...pre.moduleMapping,
                          [selectedInterviewer.user_id]: pre.moduleMapping[
                            selectedInterviewer.user_id
                          ].filter(
                            (item) => item !== pauseResumeDialog.panel_id
                          )
                        }
                  };
                });
              })
              .catch((e) => {
                toast.error(e.message);
              })
              .finally(() => {
                setLoading(false);
              });
          }
        }}
      />
    </Stack>
  );
};
export default InterviewTab;

const getInterviewModuleRelation = async (ids: string[]) => {
  return supabase
    .from('interview_module_relation')
    .select('user_id,module_id, pause_json')
    .in('user_id', ids)
    .then(async ({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }
      const moduleMapping: { [key: string]: string[] } = {};
      const tempInterview_module_relation: { [key: string]: typeof data } = {};
      let ids = data.map((d) => {
        const temp = moduleMapping[d.user_id] || [];
        temp.push(d.module_id);
        moduleMapping[d.user_id] = temp;
        const tempX = tempInterview_module_relation[d.module_id] || [];
        tempX.push(d);
        tempInterview_module_relation[d.module_id] = tempX;
        return d.module_id;
      });
      const panelIdes = [];
      const modules = await supabase
        .from('interview_module')
        .select()
        .in('id', ids)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          const modules: {
            [key: string]: (typeof data)[0] & { pause_json: any };
          } = {};
          data.map((d) => {
            panelIdes.push(d.id);
            const tempPauseJson = {};
            tempInterview_module_relation[d.id].map((item) => {
              tempPauseJson[item.user_id] = item.pause_json;
            });
            modules[d.id] = {
              ...d,
              pause_json: tempPauseJson
            };
          });
          return modules;
        });

      //   const interviews = await supabase
      //     .from('interview_schedule')
      //     .select()
      //     .in('panel_id', panelIdes)
      //     .then(({ data, error }) => {
      //       if (error) {
      //         throw new Error(error.message);
      //       }
      //       //   const modules: { [key: string]: (typeof data)[0] } = {};
      //       //   data.map((d) => {
      //       //     modules[d.id] = d;
      //       //   });
      //       //   return modules;
      //       return data;
      //     });
      //   const InterViewDetails: {
      //     [key: string]: {
      //       upcoming: typeof interviews;
      //       complete: typeof interviews;
      //     };
      //   } = {};

      //   interviews.map((interview) => {
      //     const temp = InterViewDetails[interview.panel_id] || {
      //       upcoming: [],
      //       complete: [],
      //     };
      //     if (interview.is_active) {
      //       temp.upcoming.push(interview);
      //     } else {
      //       temp.complete.push(interview);
      //     }
      //     InterViewDetails[interview.panel_id] = temp;
      //   });
      return { moduleMapping, modules };
    });
};

const removeMemberFormPanel = async ({
  panel_id,
  user_id
}: {
  panel_id?: string;
  user_id: string;
}) => {
  return supabase
    .from('interview_module_relation')
    .delete()
    .match({ module_id: panel_id, user_id })
    .then(({ error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return true;
    });
};

const updateSchedule = async ({
  panel_id,
  user_id,
  pause_json
}: {
  panel_id?: string;
  user_id: string;
  pause_json: any;
}) => {
  return supabase
    .from('interview_module_relation')
    .update({ pause_json })
    .match(panel_id ? { module_id: panel_id, user_id } : { user_id })
    .then(({ error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return true;
    });
};

const interviewsData = [
  {
    name: 'Phase 1: Interview for software engineer',
    status: 'completed',
    members: ['kishan', 'pradeep'],
    date: { day: 12 }
  },
  {
    name: 'Phase 2: Interview for software engineer',
    status: 'upcoming',
    members: ['rohan', 'ramesh'],
    date: { day: 12 }
  },
  {
    name: 'Phase 1: Interview for designer',
    status: 'upcoming',
    members: ['Mohan', 'Jay'],
    date: { day: 13 }
  },
  {
    name: 'Phase 1: Interview for designer',
    status: 'upcoming',
    members: ['prakash', 'Vimlesh'],
    date: { day: 13 }
  },
  {
    name: 'Phase 1: Interview for SDK2 engineer',
    status: 'completed',
    members: ['Arohi', 'Navin'],
    date: { day: 14 }
  },
  {
    name: 'Phase 1: Interview for SDK2 engineer',
    status: 'upcoming',
    members: ['Sohan', 'Ganesh'],
    date: { day: 15 }
  }
];
