import { Check, Edit, X } from 'lucide-react';
import { marked } from 'marked';
import { useState } from 'react';

import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import { UIButton } from '@/components/Common/UIButton';

function Instructions({
  instruction,
  setTextValue,
  updateInstruction,
  showEditButton,
}: {
  instruction: string | null;
  updateInstruction: any;
  showEditButton: boolean;
  setTextValue: any;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInstruction, setEditedInstruction] = useState(instruction);

  const handleSave = async () => {
    await updateInstruction(editedInstruction);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInstruction(instruction);
    setIsEditing(false);
  };

  return (
    <div className='rounded-lg border bg-white p-4 shadow-sm'>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-base font-medium text-gray-900'>Instructions</h2>
        {showEditButton && !isEditing && (
          <UIButton
            variant='ghost'
            size='sm'
            onClick={() => setIsEditing(true)}
          >
            <Edit className='mr-1 h-4 w-4' />
            Edit
          </UIButton>
        )}
        {isEditing && (
          <div className='flex gap-2'>
            <UIButton variant='ghost' size='sm' onClick={handleCancel}>
              <X className='mr-1 h-4 w-4' />
              Cancel
            </UIButton>
            <UIButton variant='default' size='sm' onClick={handleSave}>
              <Check className='mr-1 h-4 w-4' />
              Save
            </UIButton>
          </div>
        )}
      </div>
      {isEditing ? (
        <div className='mt-2'>
          <TipTapAIEditor
            enablAI={false}
            placeholder='Instructions'
            handleChange={(html) => {
              setEditedInstruction(html);
              setTextValue(html);
            }}
            initialValue={editedInstruction ?? undefined}
          />
        </div>
      ) : (
        <div
          className='overflow-auto text-sm text-muted-foreground'
          dangerouslySetInnerHTML={{
            __html: marked(instruction || 'Instructions not given'),
          }}
        />
      )}
    </div>
  );
}

export default Instructions;
