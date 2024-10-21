import { EmptyState } from '@components/empty-state';
import { Card, CardContent } from '@components/ui/card';
import { User } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITextField from '@/components/Common/UITextField';
import MoveToQualifiedDialog from '@/interview-pool/details/dialogs/MoveToQualified';

import { useModuleAndUsers } from '../../../hooks/useModuleAndUsers';
import { useProgressModuleUsers } from '../../../hooks/useProgressModuleUsers';
import {
  setIsAddMemberDialogOpen,
  setTrainingStatus,
} from '../../../stores/store';
import EnableDisable from './EnableDisable';
import IndividualRow from './IndividualRow';

function Training() {
  const { data: editModule } = useModuleAndUsers();
  const [search, setSearch] = useState('');

  const trainingUsers = (editModule?.relations || []).filter(
    (rel) =>
      rel.training_status === 'training' &&
      !rel.is_archived &&
      rel.full_name.toLowerCase().includes(search.toLowerCase()),
  );

  const { data: progress } = useProgressModuleUsers();

  const headers = {
    name: 'Name',
    today: 'Today',
    week: 'Week',
    load: 'Week Load',
    progress: 'Progress',
    actions: '',
  };

  return (
    <div className='flex-col space-y-2'>
      <MoveToQualifiedDialog />
      <EnableDisable />

      {editModule?.settings?.require_training && (
        <>
          <div className='flex justify-between'>
            <UITextField
              placeholder='Search trainee...'
              className='w-64'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <UIButton
              variant='default'
              onClick={() => {
                setIsAddMemberDialogOpen(true);
                setTrainingStatus('training');
              }}
            >
              Add Trainee
            </UIButton>
          </div>
          <Card className='border border-border'>
            <CardContent className='p-0'>
              <table className='w-full overflow-hidden'>
                <thead className='border-b border-border bg-muted'>
                  <tr>
                    {Object.keys(headers).map((key) => (
                      <th
                        key={key}
                        className='p-4 text-left text-sm font-medium text-muted-foreground'
                      >
                        {headers[key as keyof typeof headers]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainingUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className='p-4'>
                        <EmptyState
                          icon={User}
                          header={'No trainee found'}
                          description='Create a new interview pool to get started.'
                        />
                      </td>
                    </tr>
                  )}
                  {trainingUsers.map((rel) => {
                    const progressuser = Array.isArray(progress)
                      ? progress.filter(
                          (prog) =>
                            prog.interview_module_relation.id === rel.id,
                        )
                      : [];
                    return (
                      <IndividualRow
                        key={rel.id}
                        relation={rel}
                        progress={progressuser}
                      />
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default Training;
