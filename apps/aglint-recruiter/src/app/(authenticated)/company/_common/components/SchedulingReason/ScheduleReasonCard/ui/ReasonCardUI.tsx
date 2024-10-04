import { Input } from '@components/ui/input';
import { Plus } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';

import { UIButton } from '@/common/UIButton';
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
      <ul className='max-w-2xl space-y-2 '>
        {reasons.map((reason, reasonIndex) => (
          <li
            key={reasonIndex}
            className='group flex items-center justify-between p-2 rounded-md bg-gray-100 '
          >
            {editingIndex === reasonIndex ? (
              <Input
                value={editingReason}
                onChange={(e) => setEditingReason(e.target.value)}
                className='mr-2 w-full flex-1'
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={true}
              />
            ) : (
              <span className='text-sm font-normal'>{reason}</span>
            )}
            <div className='opacity-0 transition-opacity group-hover:opacity-100'>
              {editingIndex === reasonIndex ? (
                <>
                  <div className='flex flex-row items-center space-x-2'>
                    <UIButton
                      variant='outline'
                      onClick={() => setEditingIndex(null)}
                      className='hover:bg-red-50'
                    >
                      Cancel
                    </UIButton>
                    <UIButton
                      onClick={handleUpdate}
                      className='mr-1 hover:bg-green-50'
                    >
                      Save
                    </UIButton>
                  </div>
                </>
              ) : (
                <div>
                  <UIButton
                    variant='outline'
                    size='sm'
                    onClick={() => handleEdit(reasonIndex)}
                    className='mr-1'
                  >
                    Edit
                  </UIButton>
                  <UIButton
                    variant='outline'
                    size='sm'
                    onClick={() => handleDelete(reasonIndex)}
                    className='text-red-500 hover:text-red-600'
                  >
                    Delete
                  </UIButton>
                </div>
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
            <div className='flex flex-row items-center space-x-2'>
              <UIButton
                variant='outline'
                size='sm'
                onClick={handleAdd}
                className='mr-1 hover:bg-green-50'
              >
                Save
              </UIButton>
              <UIButton
                variant='outline'
                size='sm'
                onClick={() => setIsAddingNew(false)}
                className='hover:bg-red-50'
              >
                Cancel
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
