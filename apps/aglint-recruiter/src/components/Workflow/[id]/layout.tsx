import { Dialog, Popover, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import type React from 'react';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ConnectedJobsList } from '@/devlink/ConnectedJobsList';
import { DcPopup } from '@/devlink/DcPopup';
import { DeleteCard } from '@/devlink/DeleteCard';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { PageLayout } from '@/devlink2/PageLayout';
import { TextWithIcon } from '@/devlink3/TextWithIcon';
import { useWorkflows } from '@/src/context/Workflows';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { useWorkflowStore } from '@/src/context/Workflows/store';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeAll, capitalizeSentence } from '@/src/utils/text/textUtils';

import UITextField from '../../Common/UITextField';
import { WithPermission } from '../../withPermission';

type LayoutProps = React.PropsWithChildren;
const Layout = (props: LayoutProps) => {
  return (
    <>
      <PageLayout
        slotTopbarLeft={<BreadCrumbs />}
        slotBody={props.children}
        slotTopbarRight={<Edit />}
      />
      <DeletePopup />
    </>
  );
};

export default Layout;

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { workflow } = useWorkflow();
  return (
    <>
      <Breadcrum
        isLink
        onClickLink={{ onClick: () => push(ROUTES['/workflows']()) }}
        textName={'Workflows'}
      />
      <Breadcrum
        showArrow
        textName={workflow ? `${capitalizeSentence(workflow.title)}` : '---'}
      />
    </>
  );
};

const Edit = () => {
  const { workflow } = useWorkflow();
  const { setPopup, setDeletion } = useWorkflowStore(
    ({ setPopup, setDeletion }) => ({ setPopup, setDeletion }),
  );

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleDelete = () => {
    setDeletion({
      open: true,
      workflow: { id: workflow.id, jobs: workflow.jobs },
    });
  };

  const open = Boolean(anchorEl);

  return (
    <WithPermission permission={['manage_workflow']}>
      {workflow ? (
        <>
          <ButtonSoft
            size={'2'}
            iconName={'bolt'}
            isLeftIcon={true}
            textButton={'Edit Workflow'}
            onClickButton={{ onClick: () => setPopup({ open: true }) }}
          />
          <IconButtonGhost
            color={'neutral'}
            iconSize={6}
            iconName='more_vert'
            onClickButton={{
              onClick: (event) => {
                setAnchorEl(event.currentTarget);
              },
            }}
          />

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiPaper-root': {
                border: 'none !important',
                background: 'transparent',
                overflow: 'visible !important',
                boxShadow: 'none',
                top: '45px !important',
              },
            }}
          >
            <DeleteCard
              textHeading='Delete workflow'
              textDesc='Are you sure to delete the workflow'
              slotButton={
                <ButtonSolid
                  size={2}
                  iconName={'delete'}
                  color={'error'}
                  textButton='Delete Workflow'
                  onClickButton={{
                    onClick: handleDelete,
                  }}
                />
              }
            />
          </Popover>
        </>
      ) : (
        <></>
      )}
    </WithPermission>
  );
};

const DeletePopup = () => {
  const { push } = useRouter();
  const { handleDeleteWorkflow } = useWorkflows();
  const { workflow } = useWorkflow();
  const { deletion, closeDeletion } = useWorkflowStore(
    ({ deletion, closeDeletion }) => ({
      deletion,
      closeDeletion,
    }),
  );
  const [value, setValue] = useState('');
  const count = deletion?.workflow?.jobs?.length ?? 0;
  const title = workflow?.title ?? '';
  const enabled = title.trim() === value.trim();

  const handleClose = () => {
    closeDeletion();
    setValue('');
  };
  return (
    <Dialog open={deletion.open} onClose={handleClose}>
      <DcPopup
        onClickClosePopup={{ onClick: () => handleClose() }}
        popupName={'Delete workflow'}
        slotBody={
          <>
            <GlobalBannerShort
              color={'error'}
              slotButtons={<></>}
              textTitle={
                count === 0
                  ? ' Are you sure you want to delete this workflow?'
                  : 'Are you sure you want to unlink and delete this workflow?'
              }
              textDescription={
                count === 0
                  ? 'This workflow is not connected to any job'
                  : 'By deleting this it will be unlinked from all connected jobs'
              }
            />
            {count ? (
              <ConnectedJobsList
                textTitle={`Connected Jobs (${count})`}
                slotTextWithIcon={
                  <>
                    {(deletion?.workflow?.jobs ?? []).map(({ title }) => (
                      <TextWithIcon
                        key={title}
                        iconName={'work'}
                        fontWeight={'regular'}
                        textContent={capitalizeAll(title)}
                      />
                    ))}
                  </>
                }
              />
            ) : (
              <></>
            )}
            <Typography>
              Confirm by typing the workflow name &nbsp;
              <span style={{ color: 'var(--accent-11)' }}>
                {workflow?.title ?? '---'}
              </span>
              &nbsp; below.
            </Typography>
            <UITextField
              value={value}
              placeholder='Enter workflow name here'
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </>
        }
        slotButtons={
          <>
            <ButtonSoft
              color={'neutral'}
              size={2}
              onClickButton={{ onClick: () => handleClose() }}
              textButton={'Cancel'}
            />
            <ButtonSolid
              color={'error'}
              size={2}
              isDisabled={!enabled}
              onClickButton={{
                onClick: () => {
                  if (enabled) {
                    push(ROUTES['/workflows']());
                    handleDeleteWorkflow({ id: deletion.workflow?.id });
                    handleClose();
                  }
                },
              }}
              textButton={'Delete'}
            />
          </>
        }
      />
    </Dialog>
  );
};
