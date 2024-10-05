import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Check, Edit, FileText, X } from 'lucide-react';
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
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Instructions</SectionTitle>
        </SectionHeaderText>
        <SectionActions>
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
        </SectionActions>
      </SectionHeader>
      {isEditing ? (
        <TipTapAIEditor
          enablAI={false}
          placeholder='Instructions'
          handleChange={(html) => {
            setEditedInstruction(html);
            setTextValue(html);
          }}
          initialValue={editedInstruction ?? undefined}
          minHeight='calc(100vh - 430px)'
        />
      ) : instruction ? (
        <div
          className='prose prose-sm max-w-none overflow-auto text-sm text-muted-foreground'
          dangerouslySetInnerHTML={{
            __html: marked(instruction || ''),
          }}
        />
      ) : (
        <EmptyState icon={FileText} header='No instructions' />
      )}
    </Section>
  );
}

export default Instructions;
