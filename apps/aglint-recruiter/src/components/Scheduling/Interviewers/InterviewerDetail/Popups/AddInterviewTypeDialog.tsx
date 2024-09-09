import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { DcPopup } from '@devlink/DcPopup';
import {
  Autocomplete,
  Dialog,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { supabase } from '@/utils/supabase/client';

import { useAllInterviewModules } from '../../../InterviewTypes/queries/hooks';
import { useModuleRelations } from '../hooks';
import {
  setIsAddInterviewTypeDialogOpen,
  useInterviewerDetailStore,
} from '../store';

function AddInterviewTypeDialog() {
  const router = useRouter();
  const interviewer_id = router?.query?.user_id as string;

  const { isAddInterviewTypeDialogOpen, addInterviewType } =
    useInterviewerDetailStore((state) => ({
      isAddInterviewTypeDialogOpen: state.isAddInterviewTypeDialogOpen,
      addInterviewType: state.addInterviewType,
    }));

  const [selectedModule, setSelectedModule] = useState(null);

  const { data, isLoading, refetch } = useModuleRelations({
    user_id: interviewer_id,
  });

  const module_ids =
    [
      ...new Set(
        data?.filter((rel) => !rel.is_archived).map((rel) => rel.module_id),
      ),
    ] || [];

  const { data: allModules } = useAllInterviewModules();

  const filteredModules = allModules?.filter(
    (module) => !module_ids.includes(module.id) && !module.is_archived,
  );

  async function addModule() {
    const modRel = data.find((rel) => rel.module_id === selectedModule.id);

    if (!modRel) {
      await supabase
        .from('interview_module_relation')
        .insert({
          user_id: interviewer_id,
          module_id: selectedModule.id,
          training_status: addInterviewType,
          is_archived: false,
        })
        .select();
    } else {
      await supabase
        .from('interview_module_relation')
        .update({
          is_archived: false,
          training_status: addInterviewType,
        })
        .eq('user_id', interviewer_id)
        .eq('module_id', selectedModule.id);
    }
    setSelectedModule(null);
    close();
    refetch();
  }

  const close = () => {
    setIsAddInterviewTypeDialogOpen(false);
    setSelectedModule(null);
  };

  return (
    <>
      <Dialog
        open={isAddInterviewTypeDialogOpen}
        onClose={() => {
          setIsAddInterviewTypeDialogOpen(false);
        }}
      >
        <DcPopup
          popupName={
            addInterviewType === 'qualified'
              ? 'Add to Qualified'
              : 'Add to Training'
          }
          slotBody={
            <Stack>
              <Typography mb={1}>
                Pick an interview type from the list to add.
              </Typography>
              <Autocomplete
                fullWidth
                disabled={isLoading}
                disableClearable
                options={filteredModules}
                onChange={(_event, value) => {
                  if (value) {
                    setSelectedModule(value);
                  }
                }}
                autoComplete={false}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                  return (
                    <li {...props}>
                      <Typography variant='body1' color={'var(--neutral-12)'}>
                        {option.name}
                      </Typography>
                    </li>
                  );
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder='Ex. Initial Screening'
                    />
                  );
                }}
              />
            </Stack>
          }
          onClickClosePopup={{ onClick: close }}
          slotButtons={
            <>
              <ButtonSoft
                textButton='Cancel'
                size={2}
                color={'neutral'}
                onClickButton={{
                  onClick: close,
                }}
              />
              <ButtonSolid
                size={2}
                textButton={'Add'}
                isDisabled={!selectedModule?.id}
                onClickButton={{ onClick: addModule }}
              />
            </>
          }
        />
      </Dialog>
    </>
  );
}

export default AddInterviewTypeDialog;
