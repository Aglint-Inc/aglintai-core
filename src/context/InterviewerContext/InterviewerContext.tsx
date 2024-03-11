import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import { supabase } from '@/src/utils/supabase/client';

import { ContextValue, useAuthDetails } from '../AuthContext/AuthContext';

interface InterviewerContextInterface {
  loading: boolean;
  interviewerMembers: ContextValue['members'];
  modulesAndMapping: {
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
        training_status: 'qualified' | 'training';
      };
    };
  };
  selectedInterviewer: ContextValue['members'][0] | null;
  interviewsData: any[];
  // eslint-disable-next-line no-unused-vars
  handelSelectInterviewer: (s: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  handelRemoveMemberFormPanel: (x: {
    panel_id?: string;
    isAll: boolean;
  }) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  handelUpdateSchedule: (x: {
    panel_id?: string;
    pause_json: any;
    isAll: boolean;
  }) => Promise<void>;
}

const initialInterviewerContext: InterviewerContextInterface = {
  loading: false,
  interviewerMembers: [],
  selectedInterviewer: null,
  modulesAndMapping: {
    modules: {},
    moduleMapping: {}
  },
  interviewsData: [],
  // eslint-disable-next-line no-unused-vars
  handelSelectInterviewer: (x) => Promise.resolve(true),
  // eslint-disable-next-line no-unused-vars
  handelRemoveMemberFormPanel: (x) => Promise.resolve(),
  // eslint-disable-next-line no-unused-vars
  handelUpdateSchedule: (x) => Promise.resolve()
};

const InterviewerContext = createContext<InterviewerContextInterface>(
  initialInterviewerContext
);

const useInterviewerContext = () => useContext(InterviewerContext);

const InterviewerContextProvider = ({ children }: { children: ReactNode }) => {
  const { members } = useAuthDetails();

  const [loading, setLoading] = useState(true);

  const [modulesAndMapping, setModulesAndMapping] = useState(
    initialInterviewerContext.modulesAndMapping
  );

  const [selectedInterviewer, setSelectedInterviewer] = useState(
    initialInterviewerContext.selectedInterviewer
  );
  const [interviewsData, setInterviewsData] = useState(
    initialInterviewerContext.interviewsData
  );

  const interviewerMembers = members.filter(
    (member) => member.role === 'interviewer'
  );

  const handelSelectInterviewer = async (id: string) => {
    if (interviewerMembers.length === 0) return;
    const temp = interviewerMembers.find((member) => member.user_id === id);
    if (temp) {
      setSelectedInterviewer(temp);
      return true;
    }
    return false;
  };

  const handelRemoveMemberFormPanel: InterviewerContextInterface['handelRemoveMemberFormPanel'] =
    async ({ panel_id, isAll }) => {
      if (selectedInterviewer) {
        const user_id = selectedInterviewer.user_id;
        setLoading(true);
        return removeMemberFormPanel({
          panel_id,
          user_id
        })
          .then(() => {
            setModulesAndMapping((pre) => {
              return {
                ...pre,
                moduleMapping: isAll
                  ? {}
                  : {
                      ...pre.moduleMapping,
                      [String(user_id)]: pre.moduleMapping[
                        String(String(user_id))
                      ].filter((item) => item !== panel_id)
                    }
              };
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };
  const handelUpdateSchedule: InterviewerContextInterface['handelUpdateSchedule'] =
    async ({ panel_id, pause_json, isAll }) => {
      if (selectedInterviewer) {
        setLoading(true);
        return updateSchedule({
          panel_id,
          user_id: selectedInterviewer.user_id,
          pause_json
        })
          .then(() => {
            setModulesAndMapping((pre) => {
              const temps = { ...pre.modules };

              if (isAll) {
                Object.keys(temps).forEach((key) => {
                  temps[String(key)] = {
                    ...pre.modules[String(key)],
                    pause_json: {
                      ...pre.modules[String(key)]?.pause_json,
                      [selectedInterviewer.user_id]: pause_json
                    }
                  };
                });
              } else {
                temps[String(panel_id)] = {
                  ...pre.modules[String(panel_id)],
                  pause_json: {
                    ...pre.modules[String(panel_id)]?.pause_json,
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
    };
  useEffect(() => {
    getInterviewModuleRelation(
      interviewerMembers.map((member) => member.user_id)
    ).then((data) => {
      setModulesAndMapping(data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (
      selectedInterviewer &&
      modulesAndMapping.moduleMapping[selectedInterviewer.user_id]
    ) {
      const temp = getInterviewsData({
        ids: modulesAndMapping.moduleMapping[
          String(selectedInterviewer.user_id)
        ]
      });
      setInterviewsData(temp);
    }
  }, [selectedInterviewer, modulesAndMapping]);
  return (
    <InterviewerContext.Provider
      value={{
        loading,
        interviewerMembers,
        modulesAndMapping,
        selectedInterviewer,
        interviewsData,
        handelSelectInterviewer,
        handelRemoveMemberFormPanel,
        handelUpdateSchedule
      }}
    >
      {children}
    </InterviewerContext.Provider>
  );
};

export { InterviewerContextProvider, useInterviewerContext };

const getInterviewModuleRelation = async (ids: string[]) => {
  return supabase
    .from('interview_module_relation')
    .select('user_id,module_id, pause_json, training_status')
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
            [key: string]: (typeof data)[0] & {
              pause_json: any;
              training_status: 'training' | 'qualified';
            };
          } = {};
          data.map((d) => {
            panelIdes.push(d.id);
            const tempPauseJson = {};
            let status = null;
            tempInterview_module_relation[d.id].map((item) => {
              tempPauseJson[item.user_id] = item.pause_json;
              status = item.training_status;
            });
            modules[d.id] = {
              ...d,
              pause_json: tempPauseJson,
              training_status: status
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

const getInterviewsData = ({ ids }: { ids: string[] }) => {
  ids;
  return [
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
};
