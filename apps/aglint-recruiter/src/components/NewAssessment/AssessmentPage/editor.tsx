import { Collapse, MenuItem, Stack, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  type ChangeEvent,
  type ChangeEventHandler,
  type FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { AssessmentQuestionDetail as AssessmentQuestionDetailDev } from '@/devlink2/AssessmentQuestionDetail';
import { LinkButton } from '@/devlink2/LinkButton';
import { McqQuestion } from '@/devlink2/McqQuestion';
import { OptionInput as OptionInputDev } from '@/devlink2/OptionInput';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { ShortAnswerQuestion } from '@/devlink2/ShortAnswerQuestion';
import {
  useAssessmentQuestionDelete,
  useAssessmentQuestionUpdate,
} from '@/src/queries/assessment/questions';
import { type AssessmentQuestion } from '@/src/queries/assessment/types';

import UITextField from '../../Common/UITextField';
import SelectionComp from '../Common/components/selection';
import QuestionTags from '../Common/tags/questions';
import useAssessmentStore from '../Stores';
import { getQuestionDefaults } from '../utils';
import { useAssessment } from './context';

const AssessmentQuestionEditor: FC<{
  question: AssessmentQuestion;
  len: number;
}> = ({ question, len }) => {
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const {
    mutation: { mutate: handleDelete },
  } = useAssessmentQuestionDelete();

  const {
    mutation: { mutate: handleUpdate },
  } = useAssessmentQuestionUpdate();

  const initialRef = useRef(true);

  useDeepCompareEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
    } else {
      const timeout = setTimeout(() => {
        handleUpdate({ question_id: question.id, question });
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [
    question.answer,
    question.duration,
    question.level,
    question.type,
    question.description,
    question.question,
  ]);

  return (
    <AssessmentQuestionDetailDev
      slotQuestionType={<TypeInput question={question} />}
      slotQuestionFields={<Fields question={question} />}
      onClickDelete={{ onClick: () => handleDelete(question.id) }}
      textQuestionCount={`Question ${currentQuestion + 1}/${len}`}
    />
  );
};

const Fields: FC<{ question: AssessmentQuestion }> = ({ question }) => {
  switch (question.type) {
    case 'mcq':
      return <MCQFields question={question} />;
    case 'qna':
      return <QNAFields question={question} />;
  }
};

const MCQFields: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  if (question.type !== 'mcq') return <></>;
  return (
    <McqQuestion
      isHint={question.question.options.length !== 0}
      slotQuestionInput={<LabelInput question={question} />}
      slotOptions={<OptionInputs question={question} />}
      slotTextarea={
        <DescriptionInput
          key={question.id + 'Description'}
          question={question}
        />
      }
      slotDurationInput={<DurationInput question={question} />}
      slotToggle={<ToggleInput question={question} />}
      slotRcCheckbox={<CheckboxInput question={question} />}
    />
  );
};

const QNAFields: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  if (question.type !== 'qna') return <></>;
  return (
    <ShortAnswerQuestion
      slotQuestionInput={<LabelInput question={question} />}
      slotDescriptionTextArea={<DescriptionInput question={question} />}
      slotDurationInput={<DurationInput question={question} />}
      slotRcCheckbox={<CheckboxInput question={question} />}
      slotToggle={<ToggleInput question={question} />}
      slotAnswerInput={<ExpectedAnswerInput question={question} />}
    />
  );
};

const ExpectedAnswerInput: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const { handleUpdateQuestion } = useAssessmentQuestionUpdate();
  if (question.type !== 'qna') return <></>;
  const handleUpdateExpectedAnswer: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleUpdateQuestion(currentQuestion, {
      ...question,
      answer: { label: e.target.value },
    });
  };
  return (
    <TextField
      value={question.answer.label}
      onChange={handleUpdateExpectedAnswer}
      multiline={true}
      placeholder='Type Expected Answer Here'
    />
  );
};

const LabelInput: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const { handleUpdateQuestion } = useAssessmentQuestionUpdate();
  const handleUpdateLabel: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleUpdateQuestion(currentQuestion, {
      ...question,
      question: {
        ...(question.question as any),
        label: e.target.value,
      },
    });
  };
  return (
    <TextField
      value={question.question.label}
      onChange={handleUpdateLabel}
      placeholder='Type Question Here'
    />
  );
};

const ToggleInput: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const { handleUpdateQuestion } = useAssessmentQuestionUpdate();
  const handleUpdateCheck = () => {
    handleUpdateQuestion(currentQuestion, {
      ...question,
      description: {
        ...(question.description as any),
        show: !question.description.show,
      },
    });
  };
  return (
    <AntSwitch
      checked={question.description.show}
      onClick={() => handleUpdateCheck()}
    />
  );
};

const CheckboxInput: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const { handleUpdateQuestion } = useAssessmentQuestionUpdate();
  const handleUpdateCheck = () => {
    handleUpdateQuestion(currentQuestion, {
      ...question,
      required: !question.required,
    });
  };
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <AntSwitch
        checked={question.required}
        onClick={() => handleUpdateCheck()}
      />
      <Stack>Mark this question as required</Stack>
    </Stack>
  );
};

const DescriptionInput: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const { handleUpdateQuestion } = useAssessmentQuestionUpdate();
  const handleUpdateDescription: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleUpdateQuestion(currentQuestion, {
      ...question,
      description: {
        ...(question.description as any),
        value: e.target.value,
      },
    });
  };
  return (
    <Collapse in={question.description.show}>
      <TextField
        value={question.description.value}
        onChange={handleUpdateDescription}
        multiline={true}
        placeholder='Type Description Here'
      />
    </Collapse>
  );
};

const OptionInputs: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const { handleUpdateQuestion } = useAssessmentQuestionUpdate();
  if (question.type !== 'mcq') return <></>;

  const handleAddOption = () => {
    const newOptions = [...question.question.options, ''];
    handleUpdateQuestion(currentQuestion, {
      ...question,
      question: {
        ...(question.question as any),
        options: newOptions,
      },
    });
  };

  const handleUpdateOption = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const newOptions = question.question.options.reduce((acc, curr, i) => {
      if (i === index) acc.push(e.target.value);
      else acc.push(curr);
      return acc;
    }, []);
    handleUpdateQuestion(currentQuestion, {
      ...question,
      question: {
        ...(question.question as any),
        options: newOptions,
      },
    });
  };

  const handleUpdateAnswer = (index: number) => {
    const newOptions = question.answer.options.includes(index)
      ? question.answer.options.filter((o) => o !== index)
      : [...question.answer.options, index];
    handleUpdateQuestion(currentQuestion, {
      ...question,
      answer: { options: newOptions },
    });
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = question.question.options.filter(
      (option, i) => i !== index,
    );
    const newAnswers = question.answer.options.reduce((acc, curr) => {
      if (curr !== index)
        if (curr > index) acc.push(curr - 1);
        else acc.push(curr);
      return acc;
    }, [] as number[]);
    handleUpdateQuestion(currentQuestion, {
      ...question,
      question: {
        ...(question.question as any),
        options: newOptions,
      },
      answer: { options: newAnswers },
    });
  };

  const addOption = (
    <Stack mt={1}>
      <LinkButton onClcikButton={{ onClick: () => handleAddOption() }} />
    </Stack>
  );

  const options = question.question.options.map((option, i) => (
    <OptionInputDev
      key={i}
      testOptionNumber={`${i + 1}.`}
      slotOptionInput={
        <TextField
          value={option}
          onChange={(e) => handleUpdateOption(e, i)}
          placeholder={`Option ${i + 1}`}
        />
      }
      slotRcCheckbox={
        <RcCheckbox
          // eslint-disable-next-line security/detect-object-injection
          isChecked={question.answer.options.includes(i)}
          onclickCheck={{ onClick: () => handleUpdateAnswer(i) }}
          text={<></>}
        />
      }
      onClickClose={{ onClick: () => handleDeleteOption(i) }}
    />
  ));
  return (
    <>
      {options}
      {addOption}
    </>
  );
};

const TypeInput: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const { assessment } = useAssessment();
  switch (assessment?.mode) {
    case 'classic':
      return <TypeSwitch question={question} />;
    default:
      return (
        <Stack
          width={'200px'}
          height={'40px'}
          justifyContent={'center'}
          alignItems={'start'}
          pl={'12px'}
          style={{
            backgroundColor: 'var(--white)',
            border: '1px solid #cbcbcb',
            borderRadius: 'var(--radius-2)',
          }}
        >
          <QuestionTags type={question.type} />
        </Stack>
      );
  }
};

const TypeSwitch: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const selectedType = question.type;
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const { handleUpdateQuestion } = useAssessmentQuestionUpdate();

  const handleTypeUpdate = (type: AssessmentQuestion['type']) => {
    const defaults = getQuestionDefaults(
      type,
      question.question.label,
      question.description,
      question.required,
      question.duration,
    );
    handleUpdateQuestion(currentQuestion, {
      ...question,
      ...(defaults as any),
    });
  };

  const types: AssessmentQuestion['type'][] = ['mcq', 'qna'];
  const cards = types.map((type, i) => (
    <MenuItem key={i} value={type}>
      <QuestionTags type={type} />
    </MenuItem>
  ));
  return (
    <Stack
      width={'200px'}
      style={{
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-4)',
      }}
    >
      <SelectionComp
        onChange={(e) => handleTypeUpdate(e.target.value)}
        value={selectedType}
      >
        {cards}
      </SelectionComp>
    </Stack>
  );
};

const DurationInput: FC<{
  question: AssessmentQuestion;
}> = ({ question }) => {
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  const { handleUpdateQuestion } = useAssessmentQuestionUpdate();
  const handleUpdateDuration: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleUpdateQuestion(currentQuestion, {
      ...question,
      duration: +e.target.value ?? null,
    });
  };
  return (
    <UITextField
      type='number'
      value={question.duration}
      onChange={handleUpdateDuration}
    />
  );
};

export default AssessmentQuestionEditor;

const TextField: FC<{
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  multiline?: boolean;
  placeholder?: string;
}> = ({ placeholder = '', multiline = false, value, onChange }) => {
  const [cursor, setCursor] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const input = ref.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [ref, cursor, value]);
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setCursor(e.target.selectionStart);
    onChange(e);
  };
  return (
    <UITextField
      ref={ref}
      multiline={multiline}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: 'var(--white)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'var(--accent-9)',
        border:'1px solid var(--accent-a6)'
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'var(--shadow-3)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'var(--neutral-a3)',
    boxSizing: 'border-box',
    border:'1px solid var(--neutral-6)',
    boxShadow:'0px 1.5px 2px 0px #25250007 inset; box-shadow: 0px 1.5px 2px 0px #0000001A inset',

  },
}));
