'use client';
import React from 'react';

import { useTrainingProgress } from '../../hook/scheduling';
import GenericTable from '../genericTable';
import TrainingProgressBar, {
  type TrainingHistoryStageType,
} from './trainingProgressBar';

function TrainingProgress() {
  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'position', label: 'Interview Type' },
    { key: 'trainingHistory', label: 'Training History' },
  ];
  const { data, isPending } = useTrainingProgress();
  const recentReschedulesData = (data ?? []).map((item) => {
    const {
      number_of_shadow,
      noshadow: noShadow,
      number_of_reverse_shadow,
      noreverseshadow: noReverseShadow,
    } = item;
    const trainingHistory = [
      ...[...new Array(number_of_shadow)].map(
        () =>
          ({
            type: 'shadow',
            status: 'completed',
          }) as TrainingHistoryStageType,
      ),
      ...[...new Array(noShadow - number_of_shadow)].map(
        () =>
          ({
            type: 'shadow',
            status: 'incomplete',
          }) as TrainingHistoryStageType,
      ),
      ...[...new Array(number_of_reverse_shadow)].map(
        () =>
          ({
            type: 'reverseShadow',
            status: 'completed',
          }) as TrainingHistoryStageType,
      ),
      ...[...new Array(noReverseShadow - number_of_reverse_shadow)].map(
        () =>
          ({
            type: 'reverseShadow',
            status: 'incomplete',
          }) as TrainingHistoryStageType,
      ),
    ];
    return {
      ...item,
      trainingHistory: <TrainingProgressBar stages={trainingHistory} />,
    };
  });
  return (
    
      <GenericTable
        title='Training Progress'
        headers={headers}
        data={recentReschedulesData}
        isLoading={isPending}
        emptyStateMessage='No Recent Reschedules data available'
      />
  );
}

export default TrainingProgress;
