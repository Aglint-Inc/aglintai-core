'use client';

import { Archive, Plus } from 'lucide-react';
import React, { useState } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';

import { DeleteReasonDialog } from './DeleteReasonDialog';
import { ReasonCardUI } from './ui/ReasonCardUI';

interface ReasonSectionProps {
  title: string;
  description: string;
  reasons: string[];
  // eslint-disable-next-line no-unused-vars
  onAdd: (reason: string) => void;
  // eslint-disable-next-line no-unused-vars
  onEdit: (index: number, newReason: string) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (index: number) => void;
}

interface ScheduleReasonProps {
  textMainHeading?: React.ReactNode;
  textMainHelperText?: React.ReactNode;
  isMainHeadingVisible?: boolean;
  sections: ReasonSectionProps[];
}

export function ScheduleReasonCard({
  textMainHeading = 'Interview Scheduling Options',
  textMainHelperText = 'Configure default reasons for candidates to cancel or reschedule their interviews. These reasons will be available as options for candidates when they request to modify their scheduled interviews.',
  isMainHeadingVisible = true,
  sections,
}: ScheduleReasonProps) {
  return (
    <div className='w-full py-6'>
      {isMainHeadingVisible && (
        <div className='mb-6'>
          <h2 className='text-lg font-bold'>{textMainHeading}</h2>
          <p className='max-w-4xl text-sm text-muted-foreground'>
            {textMainHelperText}
          </p>
        </div>
      )}
      <div className='space-y-6'>
        {sections.map((section, index) => (
          <ReasonSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
}

function ReasonSection({
  title,
  description,
  reasons,
  onAdd,
  onEdit,
  onDelete,
}: ReasonSectionProps) {
  const [newReason, setNewReason] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingReason, setEditingReason] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAdd = () => {
    if (newReason.trim()) {
      onAdd(newReason.trim());
      setNewReason('');
      setIsAddingNew(false);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingReason(reasons[index]);
  };

  const handleUpdate = () => {
    if (editingIndex !== null && editingReason.trim()) {
      onEdit(editingIndex, editingReason.trim());
      setEditingIndex(null);
    }
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);
      setIsDeleteDialogOpen(false);
      setDeleteIndex(null);
    }
  };

  return (
    <>
      <DeleteReasonDialog
        confirmDelete={confirmDelete}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      <UISectionCard title={title} description={description}>
        {reasons?.length > 0 || isAddingNew ? (
          <ReasonCardUI
            editingIndex={editingIndex}
            reasons={reasons}
            editingReason={editingReason}
            setEditingReason={setEditingReason}
            setEditingIndex={setEditingIndex}
            isAddingNew={isAddingNew}
            setIsAddingNew={setIsAddingNew}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
            setNewReason={setNewReason}
            newReason={newReason}
          />
        ) : (
          <GlobalEmpty
            icon={
              <Archive
                strokeWidth={2}
                className='h-4 w-4 text-muted-foreground'
              />
            }
            description={`No ${title} added yet.`}
            primaryAction={
              <UIButton
                onClick={() => setIsAddingNew(true)}
                leftIcon={<Plus />}
                size='sm'
              >
                Add Reason
              </UIButton>
            }
          />
        )}
      </UISectionCard>
    </>
  );
}
