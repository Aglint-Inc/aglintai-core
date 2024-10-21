import { Button } from '@components/ui/button';
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
      <ul className='flex max-w-2xl flex-col gap-2'>
        {reasons.map((reason, reasonIndex) => (
          <li
            key={reasonIndex}
            className='group flex items-center justify-between rounded-md bg-muted/50 p-4 py-2'
          >
            {editingIndex === reasonIndex ? (
              <Input
                value={editingReason}
                onChange={(e) => setEditingReason(e.target.value)}
                className='mr-2 w-full flex-1 h-[36px]'
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={true}
              />
            ) : (
              <span className='text-sm font-normal'>{reason}</span>
            )}
            <div>
              {editingIndex === reasonIndex ? (
                <>
                  <div className='flex flex-row items-center space-x-2'>
                    <Button
                      variant='outline'
                      onClick={() => setEditingIndex(null)}
                      className='h-9'
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdate} className='mr-1'>
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <div className='opacity-0 transition-opacity group-hover:opacity-100'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleEdit(reasonIndex)}
                    className='mr-1'
                  >
                    Edit
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(reasonIndex)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </li>
        ))}
        {isAddingNew && (
          <li className='flex items-center justify-between rounded-md bg-muted/50 px-3 py-2'>
            <Input
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              placeholder='Enter new reason'
              className='h-8.5 mr-2 flex-grow'
            />
            <div className='flex flex-row items-center space-x-2'>
              <Button
              variant='outline'
              className='h-9'
              onClick={() => setIsAddingNew(false)}
              >
                Cancel
              </Button>
              <Button
               variant='default'
               onClick={handleAdd}
               className='mr-1'
              >
                Add
              </Button>
             
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
            <Plus className='mr-2 h-4 w-4' /> 
            Add
          </UIButton>
        </div>
      )}
    </>
  );
};
