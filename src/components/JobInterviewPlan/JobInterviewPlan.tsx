import { Drag, DragAndDrop, Drop } from '@components/Common/dragDrop';
import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { LoaderSvg } from '@/devlink';
import { Breadcrum, PageLayout } from '@/devlink2';
import { InterviewPlan } from '@/devlink3';

import EditModule from './EditModule';
import InterviewModuleC from './InterviewModuleC';
import { handleUpdateDb, InterviewModule, useInterviewPlan } from './store';
import { filterAddedModules } from './utils';
import SyncStatus from '../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/SyncStatus';
import { reorder } from '../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/utils/reorder';

const JobInterviewPlan = () => {
  const {
    allModules,
    isloading,
    modules,
    jobStatus,
    jobTitle,
    jobId,
    syncStatus
  } = useInterviewPlan((state) => state);
  const [editModuleId, setEditModuleId] = useState('');
  const [newModule, setNewModule] = useState<InterviewModule | null>(null);
  const router = useRouter();
  const handleDragEnd = (result) => {
    const { source, type, destination } = result;
    if (!destination) return;
    let sourceIdx = Number(source.index);
    let destIdx = Number(destination.index);
    if (modules[Number(sourceIdx)].isBreak) {
      if (destIdx === 0) return;
      if (destIdx === modules.length - 1) return;
    }
    if (type === 'droppable-category') {
      const updatedOrder = reorder(
        modules,
        sourceIdx,
        destIdx
      ) as InterviewModule[];
      if (
        updatedOrder[0].isBreak ||
        updatedOrder[updatedOrder.length - 1].isBreak
      ) {
        return;
      }
      for (let i = 1; i < updatedOrder.length; ++i) {
        if (updatedOrder[i - 1].isBreak && updatedOrder[Number(i)].isBreak) {
          return;
        }
      }
      handleUpdateDb({ path: 'modules', value: updatedOrder });
    }
  };

  const handleAddBreak = () => {
    let intBreak: InterviewModule = {
      isBreak: true,
      allIntervs: [],
      duration: 30,
      meetingIntervCnt: 0,
      module_id: uuidv4(),
      name: '',
      selectedIntervs: []
    };
    for (let i = 1; i < modules.length; ++i) {
      if (!modules[Number(i)].isBreak && !modules[Number(i - 1)].isBreak) {
        const newModules = [
          ...modules.slice(0, i),
          intBreak,
          ...modules.slice(i)
        ];
        handleUpdateDb({ path: 'modules', value: newModules });

        break;
      }
    }
  };

  return (
    <>
      <PageLayout
        slotTopbarLeft={
          <>
            <Breadcrum
              isLink
              onClickLink={{
                onClick: () => {
                  router.push(`/jobs?status=${jobStatus}`);
                }
              }}
              textName={`${capitalize(jobStatus)} Jobs`}
            />
            <Breadcrum
              isLink
              onClickLink={{
                onClick: () => {
                  router.push(`/jobs/${jobId}`);
                }
              }}
              showArrow
              textName={`${jobTitle}`}
            />
            <Breadcrum
              onClickLink={{ onClick: () => {} }}
              showArrow
              textName={`Interview Plan`}
            />
          </>
        }
        slotSaving={
          <>
            <SyncStatus status={syncStatus} />
          </>
        }
        slotBody={
          <>
            {isloading ? (
              <Stack
                height={'100vh'}
                width={'100vw'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <LoaderSvg />
              </Stack>
            ) : (
              <InterviewPlan
                slotInterviewPlan={
                  <>
                    <DragAndDrop onDragEnd={handleDragEnd}>
                      <Drop id={'droppable'} type={'droppable-category'}>
                        {modules.map((module, idx) => {
                          return (
                            <Drag
                              className='draggable-category'
                              key={module.module_id}
                              id={module.module_id}
                              index={idx}
                            >
                              <InterviewModuleC
                                module={module}
                                key={module.module_id}
                                editModuleId={editModuleId}
                                setEditModuleId={setEditModuleId}
                              />
                            </Drag>
                          );
                        })}
                      </Drop>
                    </DragAndDrop>

                    {newModule && (
                      <EditModule
                        onClose={() => setNewModule(null)}
                        initModule={newModule}
                        isBreak={false}
                        isEdit={false}
                      />
                    )}
                  </>
                }
                onClickAddModule={{
                  onClick: () => {
                    const filteredModules = filterAddedModules(
                      allModules,
                      modules
                    );
                    if (filteredModules.length > 0) {
                      let nModule: InterviewModule = {
                        ...filteredModules[0],
                        selectedIntervs: [...filteredModules[0].allIntervs]
                      };
                      setNewModule(nModule);
                    }
                  }
                }}
                onClickAddBreak={{
                  onClick: handleAddBreak
                }}
                onClickScheduler={{
                  onClick: () => {
                    router.push('/scheduling?tab=interviewModules');
                  }
                }}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default JobInterviewPlan;
