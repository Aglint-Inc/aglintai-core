'use client';

import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { List, Plus } from 'lucide-react';
import React, { useState } from 'react';

import { UIButton } from '@/common/UIButton';

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

export function ScheduleReasonCard({ sections }: ScheduleReasonProps) {
  return (
    <div className='w-full py-6'>
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
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this reason?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Section>
        <SectionHeader>
          <SectionHeaderText>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
          </SectionHeaderText>
        </SectionHeader>
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
          <EmptyState
            variant='inline'
            icon={List}
            description={`No ${title} added yet.`}
            primarySlot={
              <UIButton
                variant='outline'
                onClick={() => setIsAddingNew(true)}
                leftIcon={<Plus />}
                size='sm'
              >
                Add Reason
              </UIButton>
            }
          />
        )}
      </Section>
    </>
  );
}
