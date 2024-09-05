'use client';

import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import React, { useState } from 'react';

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

export function ScheduleReason({
  textMainHeading = 'Interview Scheduling Options',
  textMainHelperText = 'Configure default reasons for candidates to cancel or reschedule their interviews. These reasons will be available as options for candidates when they request to modify their scheduled interviews.',
  isMainHeadingVisible = true,
  sections,
}: ScheduleReasonProps) {
  return (
    <div className='w-full p-6'>
      {isMainHeadingVisible && (
        <div className='mb-6'>
          <h2 className='text-lg font-bold mb-2'>{textMainHeading}</h2>
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

  const handleAdd = () => {
    if (newReason.trim()) {
      onAdd(newReason.trim());
      setNewReason('');
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
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
        <CardDescription className='text-sm text-gray-500'>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {reasons.map((reason, reasonIndex) => (
            <li
              key={reasonIndex}
              className='flex items-center justify-between p-2 bg-gray-50 rounded'
            >
              {editingIndex === reasonIndex ? (
                <Input
                  value={editingReason}
                  onChange={(e) => setEditingReason(e.target.value)}
                  className='flex-grow mr-2'
                />
              ) : (
                <span>{reason}</span>
              )}
              <div>
                {editingIndex === reasonIndex ? (
                  <>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={handleUpdate}
                      className='mr-2'
                    >
                      Update
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setEditingIndex(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleEdit(reasonIndex)}
                      className='mr-2'
                    >
                      Edit
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDelete(reasonIndex)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className='flex items-center mt-4'>
          <Input
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            placeholder='Enter new reason'
            className='flex-grow mr-2'
          />
          <Button variant='outline' size='sm' onClick={handleAdd}>
            Add
          </Button>
        </div>
      </CardContent>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this reason?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
