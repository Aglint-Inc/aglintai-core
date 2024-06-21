import { Collapse } from '@mui/material';
import { get } from 'lodash';
import React from 'react';

import { ScrQuestion } from '@/devlink2/ScrQuestion';
import { ScrQuestionDefault } from '@/devlink2/ScrQuestionDefault';
import UITypography from '@/src/components/Common/UITypography';
import { usePhoneScreening } from '@/src/context/PhoneScreeningContext/PhoneScreeningContext';

import { PhoneScreenQuestion } from '../types';
import PhoneScreenNewQnForm from './PhoneScreenNewQnForm';
import { qnTypeToIcon } from './ScreeningComp';
import { qnTypeToLabel2 } from './utils';

const KnowOffQn = ({ qnPath, isEditMode, changeMode }) => {
  const { handleUpdateFormFields, phoneScreenignForm } = usePhoneScreening();

  const q = get(phoneScreenignForm, `${qnPath}`, null) as PhoneScreenQuestion;
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
                  phoneScreenignForm.phoneScreening.questions.filter(
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
