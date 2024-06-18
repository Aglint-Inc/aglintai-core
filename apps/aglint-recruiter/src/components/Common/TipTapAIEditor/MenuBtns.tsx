import styled from '@emotion/styled';
import { IconButton, Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import React, { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { CreateJobCheckItem } from '@/devlink/CreateJobCheckItem';
import { GenerateJobDescAi } from '@/devlink/GenerateJobDescAi';
import { LoadingGenerate } from '@/devlink/LoadingGenerate';
import DescGenerating from '@/public/lottie/DescGenerating';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  generateJobDescription,
  JDGenParams,
} from '@/src/utils/prompts/addNewJob/generateJobDescription';
import toast from '@/src/utils/toast';

import { useJobForm } from '../../JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import Icon from '../Icons/Icon';
import UITypography from '../UITypography';
import { useTipTap } from './context';

const MenuBtn = styled(IconButton)({
  borderRadius: 'var(--radius-2)',
  padding: 'var(--space-1)',
  '&.is-active': {
    backgroundColor: 'var(--neutral-4)',
  },
  '&:hover': {
    backgroundColor: 'var(--neutral-5)',
  },
});

function MenuBtns({
  borderRadius,
}: {
  borderRadius?: React.CSSProperties['borderRadius'];
}) {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      borderBottom={'1px solid var(--neutral-6)'}
      pr={'var(--space-2)'}
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--white)',
        zIndex: 2,
        ...(borderRadius && {
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }),
      }}
    >
      <TipTapMenus />
      <TipTapUndoRedo />
    </Stack>
  );
}

export default MenuBtns;

const TipTapMenus = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { editor } = useTipTap();
  const [typography, setTypography] = useState('Paragraph');
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  if (!editor) return <></>;
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      gap={'var(--space-1)'}
      p={'var(--space-1)'}
      sx={{ position: 'sticky', top: '0', zIndex: '111' }}
    >
      <ButtonGhost
        color={'neutral'}
        isRightIcon
        iconName='keyboard_arrow_down'
        size={2}
        textButton={typography}
        onClickButton={{ onClick: handleOpenMenu }}
      />

      <Tooltip title={'regular'} placement='top-start'>
        <MenuBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Icon height='24' width='24' variant='Bold' />
        </MenuBtn>
      </Tooltip>
      <Tooltip title={'Italic'} placement='top-start'>
        <MenuBtn
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Icon height='24' width='24' variant='Italic' />
        </MenuBtn>
      </Tooltip>
      <Tooltip title={'Underline'} placement='top-start'>
        <MenuBtn
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <Icon height='24' width='24' variant='Underline' />
        </MenuBtn>
      </Tooltip>
      <Tooltip title={'Bullet List'} placement='top-start'>
        <MenuBtn
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <Icon height='24' width='24' variant='BulletLint' />
        </MenuBtn>
      </Tooltip>
      <Tooltip title={'Order List'} placement='top-start'>
        <MenuBtn
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <Image
            unoptimized
            src={'/images/svg/orderList.svg'}
            height={24}
            width={24}
            alt='orderlist'
          />
        </MenuBtn>
      </Tooltip>
      <Tooltip title={'AlignLeft'} placement='top-start'>
        <MenuBtn
          onClick={() => {
            editor.chain().focus().setTextAlign('left').run();
          }}
          disabled={!editor.can().chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <Image
            unoptimized
            src={'/images/svg/alignRight.svg'}
            height={24}
            width={24}
            alt='alignLeft'
          />
        </MenuBtn>
      </Tooltip>
      <Tooltip title={'AlignRight'} placement='top-start'>
        <MenuBtn
          onClick={() => {
            editor.chain().focus().setTextAlign('right').run();
          }}
          disabled={!editor.can().chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <Image
            unoptimized
            src={'/images/svg/alignLeft.svg'}
            height={24}
            width={24}
            alt='alignRight'
          />
        </MenuBtn>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          gap={'var(--space-1)'}
          direction={'column'}
          width={'100px'}
          minHeight={'100px'}
        >
          <MenuBtn
            className={editor.isActive('paragraph') ? 'is-active' : ''}
            onClick={() => {
              editor.chain().focus().setParagraph().run();
              setTypography('Paragraph');
              setAnchorEl(null);
            }}
          >
            <UITypography type='small'>Paragraph</UITypography>
          </MenuBtn>
          <MenuBtn
            className={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
              setTypography('Heading 1');
              setAnchorEl(null);
            }}
          >
            <UITypography type='small'>Heading 1</UITypography>
          </MenuBtn>
          <MenuBtn
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
              setTypography('Heading 2');
              setAnchorEl(null);
            }}
          >
            <UITypography type='small'>Heading 2</UITypography>
          </MenuBtn>
          <MenuBtn
            className={
              editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
              setTypography('Heading 3');
              setAnchorEl(null);
            }}
          >
            <UITypography type='small'>Heading 3</UITypography>
          </MenuBtn>
        </Stack>
      </Popover>
    </Stack>
  );
};

const TipTapUndoRedo = () => {
  const { editor } = useTipTap();
  return (
    <Stack direction={'row'} alignItems={'center'} gap={'var(--space-1)'}>
      <Tooltip title='Undo' placement='top'>
        <MenuBtn
          disabled={!editor?.can().undo()}
          className={editor?.can().undo() ? 'is-active' : ''}
          onClick={() => {
            editor?.chain().focus().undo().run();
          }}
          sx={{
            cursor: 'pointer',
            width: 'var(--space-6)',
            height: 'var(--space-6)',
            backgroundColor: 'var(--neutral-4)',
            '&:hover': {
              backgroundColor: 'var(--neutral-5)',
            },
          }}
        >
          <Image
            unoptimized
            alt='undo'
            src={
              editor?.can().undo()
                ? '/images/svg/undo-active.svg'
                : '/images/svg/undo-disabled.svg'
            }
            width={16}
            height={16}
            priority
          />
        </MenuBtn>
      </Tooltip>

      <Tooltip title={'Redo'} placement='top'>
        <MenuBtn
          disabled={!editor?.can().redo()}
          className={editor?.can().redo() ? 'is-active' : ''}
          onClick={() => {
            editor?.chain().focus().redo().run();
          }}
          sx={{
            cursor: 'pointer',
            width: 'var(--space-6)',
            height: 'var(--space-6)',
            backgroundColor: 'var(--neutral-4)',
            '&:hover': {
              backgroundColor: 'var(--neutral-5)',
            },
          }}
        >
          <Image
            unoptimized
            alt='redo'
            src={
              editor?.can().redo()
                ? '/images/svg/redo-active.svg'
                : '/images/svg/redo-disabled.svg'
            }
            width={16}
            height={16}
            priority
          />
        </MenuBtn>
      </Tooltip>
    </Stack>
  );
};

export const GenerateDescription = ({ isAiGenerating, setIsAiGenerating }) => {
  const [checks, setChecks] = useState({
    benifits: true,
    company: true,
    values: true,
  });
  const {
    jobForm: { formFields, formType },
  } = useJobForm();
  const { editor } = useTipTap();
  const { recruiter } = useAuthDetails();

  if (!editor) return <></>;
  if (formType === 'edit') return <></>;
  const enableGenerate =
    Boolean(checks.benifits) ||
    Boolean(checks.company) ||
    Boolean(checks.values);

  const handlegenerate = async () => {
    if (!enableGenerate) return;
    try {
      setIsAiGenerating(true);
      const jdGenConfig: JDGenParams = {
        workPlaceType: formFields.workPlaceType,
        location: formFields.jobLocation,
        jobType: formFields.jobType,
        jobTitle: formFields.jobTitle,
        company: formFields.company,
      };

      if (checks.benifits) {
        jdGenConfig.benifits = recruiter.benefits;
      }
      if (checks.company) {
        jdGenConfig.companyOverview = recruiter.company_overview;
      }
      if (checks.values) {
        jdGenConfig.compnayValues = recruiter.m_v_statement;
      }
      const jd = await generateJobDescription(jdGenConfig);
      editor.commands.setContent(jd, true, { preserveWhitespace: true });
    } catch {
      toast.error('Something went wrong. Please try again');
    } finally {
      setIsAiGenerating(false);
    }
  };

  if (isAiGenerating)
    return <LoadingGenerate slotLottie={<DescGenerating />} />;

  return (
    <>
      <GenerateJobDescAi
        onClickCompanyDdetailsCheck={{
          onClick: () => {
            setChecks((p) => ({ ...p, company: !p.company }));
          },
        }}
        onClickGenerate={{
          onClick: handlegenerate,
        }}
        isGenerateDisable={!enableGenerate || isAiGenerating}
        textGenerateHeader={
          editor.isEmpty
            ? 'Generate job description with AI'
            : 'Regenerate job description with AI'
        }
        isLoading={isAiGenerating}
        slotCheckBoxes={
          <>
            {recruiter.company_overview && (
              <CreateJobCheckItem
                textLabel1={'Use Company details from company profile'}
                isChecked={checks.company}
                onClickCheck={{
                  onClick: () => {
                    setChecks((p) => ({ ...p, company: !p.company }));
                  },
                }}
              />
            )}
            {recruiter.benefits && (
              <CreateJobCheckItem
                textLabel1={'Use benefits from company profile'}
                isChecked={checks.benifits}
                onClickCheck={{
                  onClick: () => {
                    setChecks((p) => ({
                      ...p,
                      benifits: !p.benifits,
                    }));
                  },
                }}
              />
            )}
            {recruiter.m_v_statement && (
              <CreateJobCheckItem
                textLabel1={'Use values from company profile'}
                isChecked={checks.values}
                onClickCheck={{
                  onClick: () => {
                    setChecks((p) => ({ ...p, values: !p.values }));
                  },
                }}
              />
            )}
          </>
        }
      />
    </>
  );
};
