import { Collapse } from '@mui/material';
import { get } from 'lodash';
import React from 'react';

import { ScrQuestion, ScrQuestionDefault } from '@/devlink2';
import UITypography from '@/src/components/Common/UITypography';

import { qnTypeToIcon } from './PhoneScreening';
import PhoneScreenNewQnForm from './PhoneScreenNewQnForm';
import { qnTypeToLabel2 } from './utils';
import { PhoneScreenQuestion, useJobForm } from '../../JobPostFormProvider';

const KnowOffQn = ({ qnPath, isEditMode, changeMode }) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const q = get(jobForm, `formFields.${qnPath}`, null) as PhoneScreenQuestion;
  if (!q) return;

  return (
    <ScrQuestion
      slotDefault={
        <>
          <Collapse in={!isEditMode} translate='yes' unmountOnExit>
            {
              <ScrQuestionDefault
                title={qnTypeToLabel2(q.type)}
                isRequired={q.isRequired}
                textQuestion={q.question}
                slotIcon={qnTypeToIcon(q.type)}
                description={<>{q.showDescription && q.description}</>}
                onclickEdit={{
                  onClick: () => {
                    changeMode(true);
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
              />
            }
          </Collapse>
        </>
      }
      slotEdit={
        <Collapse in={isEditMode} translate='yes' unmountOnExit>
          {
            <PhoneScreenNewQnForm
              onClose={() => {
                changeMode(false);
              }}
              qnPath={qnPath}
              isEdit={true}
              handleDelete={() => {
                const updatedQns =
                  jobForm.formFields.phoneScreening.questions.filter(
                    (qn) => qn.id !== q.id,
                  );
                handleUpdateFormFields({
                  path: 'phoneScreening.questions',
                  value: updatedQns,
                });
              }}
            />
          }
        </Collapse>
      }
    />
  );
};

export default KnowOffQn;
