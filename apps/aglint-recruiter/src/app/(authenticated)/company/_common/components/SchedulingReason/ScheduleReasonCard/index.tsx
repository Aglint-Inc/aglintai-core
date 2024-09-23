'use client';

import React, { useState } from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';

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
          <h2 className='mb-2 text-lg font-bold'>{textMainHeading}</h2>
          <p className='text-sm text-gray-500'>{textMainHelperText}</p>
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

      <SectionCard title={title} description={description}>
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
      </SectionCard>
    </>
  );
}
