'use client';

import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';
import * as React from 'react';

import { manageDepartments } from '@/context/AuthContext/utils';
import { useAllDepartments } from '@/queries/departments';

import DepartmentNameChip from '../Componets/DepartmentNameChip';
import AddDepartmentsDialog from './ManageDepartmentsDialog/addDepartmentsDialog';
import DeleteDepartmentsDialog from './ManageDepartmentsDialog/deleteDepartmentDialog';

export default function Departments() {
  const { data: departments, refetch: refetchDepartments } =
    useAllDepartments();

  const handleRemoveKeyword = async (id: number) => {
    setDeleteDialog({
      ...deleteDialog,
      open: true,
      id: id,
    });
  };

  const [deleteDialog, setDeleteDialog] = React.useState<{
    type: 'departments';
    open: boolean;
    id: string | number | null;
  }>({
    type: 'departments',
    open: false,
    id: null,
  });
  return (
    <>
      {deleteDialog.open && deleteDialog.type === 'departments' && (
        <DeleteDepartmentsDialog
          handleDelete={() =>
            deleteDialog.id &&
            manageDepartments({
              type: 'delete',
              data: [deleteDialog.id as number],
            }).then(() => {
              setDeleteDialog({ ...deleteDialog, open: false });
              refetchDepartments();
            })
          }
          handleClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
          open={deleteDialog.open}
          id={deleteDialog.id as number}
        />
      )}
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-lg font-semibold mb-1'>Departments</h1>
        <p className='text-md text-gray-600 mb-6'>
          Catalog your departments to sort and filter data efficiently, aiding
          in job posting and scheduling.
        </p>
        <div className='flex flex-wrap gap-2 mb-6 items-center'>
          {departments.map(({ name, id }, index) => (
            <DepartmentNameChip
              key={index}
              name={name}
              index={index}
              id={id}
              handleRemoveKeyword={handleRemoveKeyword}
            />
          ))}
          <AddDepartmentsDialog
            btn={
              <Button variant='outline' size='sm' className='rounded-full'>
                <Plus className='h-4 w-4 mr-2' />
                Add keyword
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
}
