'use client';

import { EmptyState } from '@components/empty-state';
import { useToast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { BookOpen, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { useAllDepartments } from '@/authenticated/hooks/useAllDepartments';
import AddChip from '@/common/AddChip';
import { Indicator } from '@/common/Indicator';
import UISectionCard from '@/common/UISectionCard';
import { useTenant } from '@/company/hooks';
import { manageDepartments } from '@/context/AuthContext/utils';

import DeleteDepartmentsDialog from './DeleteDepartmentDialog';

export default function Departments() {
  const { recruiter } = useTenant();
  const { data: departments, refetch } = useAllDepartments();
  const [isAdding, setIsAdding] = React.useState(false);
  const { toast } = useToast();
  const handleRemoveKeyword = (id: string | number | null) => {
    setDeleteDialog({
      ...deleteDialog,
      open: true,
      id: id,
    });
  };

  const [deleteDialog, setDeleteDialog] = React.useState<{
    open: boolean;
    id: string | number | null;
  }>({
    open: false,
    id: null,
  });

  const handleAddDepartment = async ({
    name: department,
  }: {
    name: string;
  }) => {
    if (department.trim() !== '') {
      setIsAdding(true);
      await manageDepartments({
        type: 'insert',
        data: [{ recruiter_id: recruiter.id, name: department }],
      }).catch((err) => {
        toast({
          title: String(err).includes('unique_deps')
            ? `Department is already exists.`
            : String(err),
          description: '',
        });
      });
      setIsAdding(false);
      await refetch();
    }
  };
  const initialDepartments: string[] = [];

  // if (localStorage?.getItem('departments')) {
  //   if (Array.isArray(JSON.parse(localStorage?.getItem('departments')))) {
  //     initialDepartments = JSON.parse(localStorage?.getItem('departments'));
  //   }
  // }

  const current_departments = departments.map((d) =>
    d.name.replace(/\s+/g, '').toLowerCase(),
  );

  const suggestionsList = initialDepartments.filter(
    (d) => !current_departments.includes(d.replace(/\s+/g, '').toLowerCase()),
  );

  const queryParams = useSearchParams();
  const isIndicatorActive =
    queryParams?.get('indicator') == 'true' ? true : false;

  return (
    <>
      {deleteDialog.open && (
        <DeleteDepartmentsDialog
          handleDelete={() =>
            deleteDialog.id &&
            manageDepartments({
              type: 'delete',
              data: [deleteDialog.id as number],
            }).then(() => {
              setDeleteDialog({ ...deleteDialog, open: false });
              refetch();
            })
          }
          handleClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
          open={deleteDialog.open}
          id={deleteDialog.id as number}
        />
      )}
      <UISectionCard
        title='Departments'
        description='Catalog your departments to sort and filter data efficiently,
              aiding in job posting and scheduling.'
      >
        {departments?.length > 0 ? (
          <AddChip
            options={departments.map((item) => ({
              name: item.name,
              id: String(item.id),
            }))}
            suggestionsList={suggestionsList.map((item) => ({
              name: item,
              id: String(item),
            }))}
            handleAddDepartment={handleAddDepartment}
            isLoading={isAdding}
            placeholder='Enter new value...'
            btn={
              <Button variant='outline' size='sm' className='rounded-md'>
                <Plus className='mr-2 h-4 w-4' />
                Add Department
              </Button>
            }
            handleRemoveKeyword={({ id }) => {
              handleRemoveKeyword(id);
            }}
          />
        ) : (
          <EmptyState
            variant='inline'
            icon={BookOpen}
            description='No company departments found.'
            primarySlot={
              <Indicator isActive={isIndicatorActive}>
                <AddChip
                  options={departments.map((item) => ({
                    name: item.name,
                    id: String(item.id),
                  }))}
                  suggestionsList={suggestionsList.map((item) => ({
                    name: item,
                    id: String(item),
                  }))}
                  handleAddDepartment={handleAddDepartment}
                  placeholder='Enter new value...'
                  btn={
                    <Button variant='outline' size='sm'>
                      <Plus className='mr-2 h-4 w-4' />
                      Add Departments
                    </Button>
                  }
                  handleRemoveKeyword={({ id }) => {
                    handleRemoveKeyword(id);
                  }}
                />
              </Indicator>
            }
          />
        )}
      </UISectionCard>
    </>
  );
}
