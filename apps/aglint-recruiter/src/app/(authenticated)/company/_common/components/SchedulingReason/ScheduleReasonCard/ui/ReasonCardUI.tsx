import { Check, Pencil, Plus, Trash2, X } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';

import { UIButton } from '@/common/UIButton';
import UITextField from '@/common/UITextField';
type Props = {
  editingIndex: number | null;
  reasons: string[];
  editingReason: string;
  setEditingReason: Dispatch<SetStateAction<string>>;
  setEditingIndex: Dispatch<SetStateAction<number | null>>;
  isAddingNew: boolean;
  setIsAddingNew: Dispatch<SetStateAction<boolean>>;
  handleAdd: () => void;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (index: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleEdit: (index: number) => void;
  handleUpdate: () => void;
  setNewReason: Dispatch<SetStateAction<string>>;
  newReason: string;
};

export const ReasonCardUI = ({
  editingIndex,
  reasons,
  editingReason,
  setEditingReason,
  setEditingIndex,
  isAddingNew,
  setIsAddingNew,
  handleAdd,
  handleDelete,
  handleEdit,
  handleUpdate,
  setNewReason,
  newReason,
}: Props) => {
  //list

  return (
    <>
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
              <UITextField
                value={editingReason}
                onChange={(e) => setEditingReason(e.target.value)}
                className='h-8.5 mr-2 flex-grow'
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={true}
              />
            ) : (
              <span>{reason}</span>
            )}
            <div className='opacity-0 transition-opacity group-hover:opacity-100'>
              {editingIndex === reasonIndex ? (
                <>
                  <div className='flex flex-row items-center'>
                    <UIButton
                      variant='ghost'
                      size='sm'
                      onClick={handleUpdate}
                      className='mr-1 hover:bg-green-50'
                    >
                      <Check className='h-3.5 w-3.5' />
                    </UIButton>
                    <UIButton
                      variant='ghost'
                      size='sm'
                      onClick={() => setEditingIndex(null)}
                      className='hover:bg-red-50'
                    >
                      <X className='h-3.5 w-3.5' />
                    </UIButton>
                  </div>
                </>
              ) : (
                <div>
                  <UIButton
                    variant='ghost'
                    size='sm'
                    onClick={() => handleEdit(reasonIndex)}
                    className='mr-1'
                  >
                    <Pencil className='h-3 w-3 font-semibold' />
                  </UIButton>
                  <UIButton
                    variant='ghost'
                    size='sm'
                    onClick={() => handleDelete(reasonIndex)}
                    className='text-red-500 hover:text-red-600'
                  >
                    <Trash2 className='h-3 w-3' />
                  </UIButton>
                </div>
              )}
            </div>
          </li>
        ))}
        {isAddingNew && (
          <li className='flex items-center justify-between rounded-md bg-gray-100 px-3 py-2'>
            <UITextField
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              placeholder='Enter new reason'
              className='h-8.5 mr-2 flex-grow'
            />
            <div className='flex flex-row items-center'>
              <UIButton
                variant='ghost'
                size='sm'
                onClick={handleAdd}
                className='mr-1 hover:bg-green-50'
              >
                <Check className='h-3.5 w-3.5' />
              </UIButton>
              <UIButton
                variant='ghost'
                size='sm'
                onClick={() => setIsAddingNew(false)}
                className='hover:bg-red-50'
              >
                <X className='h-3.5 w-3.5' />
              </UIButton>
            </div>
          </li>
        )}
      </ul>
      {!isAddingNew && (
        <div className='mt-4'>
          <UIButton
            variant='outline'
            size='sm'
            onClick={() => setIsAddingNew(true)}
          >
            <Plus className='mr-2 h-4 w-4' /> Add
          </UIButton>
        </div>
      )}
    </>
  );
};
