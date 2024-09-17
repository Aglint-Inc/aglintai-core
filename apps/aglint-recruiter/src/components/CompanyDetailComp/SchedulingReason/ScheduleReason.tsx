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
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react';
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
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
        <CardDescription className='text-sm text-gray-500'>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {reasons.map((reason, reasonIndex) => (
            <li
              key={reasonIndex}
              className={`flex items-center justify-between rounded-md px-3 py-2 ${
                editingIndex === reasonIndex
                  ? 'bg-gray-100'
                  : 'border border-gray-200'
              } group`}
            >
              {editingIndex === reasonIndex ? (
                <Input
                  value={editingReason}
                  onChange={(e) => setEditingReason(e.target.value)}
                  className='h-8.5 mr-2 flex-grow'
                />
              ) : (
                <span>{reason}</span>
              )}
              <div className='opacity-0 transition-opacity group-hover:opacity-100'>
                {editingIndex === reasonIndex ? (
                  <>
                    <div className='flex flex-row items-center'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={handleUpdate}
                        className='mr-1 hover:bg-green-50'
                      >
                        <Check className='h-3.5 w-3.5' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setEditingIndex(null)}
                        className='hover:bg-red-50'
                      >
                        <X className='h-3.5 w-3.5' />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleEdit(reasonIndex)}
                      className='mr-1'
                    >
                      <Pencil className='h-3 w-3 font-semibold' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDelete(reasonIndex)}
                      className='text-red-500 hover:text-red-600'
                    >
                      <Trash2 className='h-3 w-3' />
                    </Button>
                  </>
                )}
              </div>
            </li>
          ))}
          {isAddingNew && (
            <li className='flex items-center justify-between rounded-md bg-gray-100 px-3 py-2'>
              <Input
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder='Enter new reason'
                className='h-8.5 mr-2 flex-grow'
              />
              <div className='flex flex-row items-center'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleAdd}
                  className='mr-1 hover:bg-green-50'
                >
                  <Check className='h-3.5 w-3.5' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setIsAddingNew(false)}
                  className='hover:bg-red-50'
                >
                  <X className='h-3.5 w-3.5' />
                </Button>
              </div>
            </li>
          )}
        </ul>
        {!isAddingNew && (
          <div className='mt-4'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsAddingNew(true)}
            >
              <Plus className='mr-2 h-4 w-4' /> Add
            </Button>
          </div>
        )}
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
