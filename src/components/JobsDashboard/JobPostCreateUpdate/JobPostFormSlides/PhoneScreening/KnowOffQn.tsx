import { Collapse, Stack } from '@mui/material';
import { get } from 'lodash';
import React, { useState } from 'react';

import { ScrQuestion, ScrQuestionDefault } from '@/devlink2';
import UITypography from '@/src/components/Common/UITypography';

import { qnTypeToIcon } from './PhoneScreening';
import PhoneScreenNewQnForm from './PhoneScreenNewQnForm';
import { PhoneScreenQuestion, useJobForm } from '../../JobPostFormProvider';

const KnowOffQn = ({ qnPath, isdefaultEditMode }) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [isDefaultView, setIsDefaultView] = useState(!isdefaultEditMode);
  // const [editQn, setEditQn] = useState<PhoneScreenQuestion | null>(
  //   isdefaultEditMode ? { ...seedQns[seedQns.length - 1] } : null,
  // );
  const q = get(jobForm, `formFields.${qnPath}`, null) as PhoneScreenQuestion;
  if (!q) return;

  return (
    <ScrQuestion
      isEditView={true}
      isDefaultView={true}
      slotDefault={
        <Collapse in={isDefaultView} unmountOnExit translate='yes'>
          <ScrQuestionDefault
            isRequired={q.isRequired}
            textQuestion={q.question}
            slotIcon={qnTypeToIcon(q.type)}
            slotDescriptionToggle={<></>}
            description={<>{q.showDescription && q.description}</>}
            onclickEdit={{
              onClick: () => {
                setIsDefaultView(false);
              },
            }}
            isOptionsVisible={
              q.type === 'multiSelect' || q.type === 'singleSelect'
            }
            slotOptions={
              <>
                {q.options.map((op, idx) => (
                  <UITypography key={idx} fontBold='default' type='small'>
                    {`${idx + 1}.  ${op.option} `}
                  </UITypography>
                ))}
              </>
            }
            textOption={
              <Stack direction={'row'} gap={1} flexWrap={'wrap'}></Stack>
            }
          />
        </Collapse>
      }
      slotEdit={
        <Collapse in={!isDefaultView} unmountOnExit translate='yes'>
          <PhoneScreenNewQnForm
            isEdit={true}
            defaultEditQn={{ ...q }}
            handleCancel={() => {
              setIsDefaultView(true);
            }}
            handleDelete={() => {
              const updatedQns =
                jobForm.formFields.phoneScreening.questions.filter(
                  (qn) => qn.id !== q.id,
                );
              handleUpdateFormFields({
                path: 'phoneScreening.questions',
                value: updatedQns,
              });
              setIsDefaultView(true);
            }}
            handleDone={(updatedQn) => {
              handleUpdateFormFields({
                path: `${qnPath}`,
                value: updatedQn,
              });
              setIsDefaultView(true);
            }}
          />
        </Collapse>
      }
    />
  );
};

export default KnowOffQn;
