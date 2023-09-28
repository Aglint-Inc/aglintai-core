import { Stack } from '@mui/material';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import {
  CompanyInfo,
  CompanyLocation,
  RolesPill,
  SkillsInput,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterType } from '@/src/types/data.types';

import AddDepartmentsDialog from './AddDepartmentsDialog';
import AddLocationDialog from './AddLocationDialog';
import AddRolesDialog from './AddRolesDialog';
import AddTechnologyDialog from './AddTechnologyDialog';
import SocialComp from './SocialComp';
import { debouncedSave } from '../utils';
import ImageUpload from '../../Common/ImageUpload';
import UITextField from '../../Common/UITextField';

const CompanyInfoComp = ({ setIsSaving }) => {
  const { recruiter, setRecruiter } = useAuthDetails();
  const locationRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [logo, setLogo] = useState<string>();
  const [dialog, setDialog] = useState(initialDialog());
  const [edit, setEdit] = useState(initialEdit());
  useEffect(() => {
    setLogo(recruiter?.logo);
  }, []);

  const handleChange = async (recruit: RecruiterType) => {
    setIsSaving(true);
    debouncedSave(recruit, recruiter.id);
    setRecruiter(recruit);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const handleClose = () => {
    setDialog(initialDialog());
  };

  useEffect(() => {
    if (recruiter?.logo !== logo) handleChange({ ...recruiter, logo: logo });
  }, [logo]);

  return (
    <div>
      <AddTechnologyDialog
        handleClose={handleClose}
        open={dialog.stacks}
        handleChange={handleChange}
      />
      <AddDepartmentsDialog
        handleClose={handleClose}
        open={dialog.departments}
        handleChange={handleChange}
      />
      <AddRolesDialog
        handleClose={handleClose}
        open={dialog.roles}
        handleChange={handleChange}
      />
      <AddLocationDialog
        handleClose={handleClose}
        open={dialog.location}
        handleChange={handleChange}
      />
      <CompanyInfo
        slotCompanyLogo={
          <>
            <ImageUpload image={logo} setImage={setLogo} size={70} />
          </>
        }
        onClickChangeLogo={{
          onClick: () => {
            document.getElementById('image-upload').click();
          },
        }}
        slotBasicForm={
          <Stack direction={'row'} p={'4px'} width={'100%'} spacing={'40px'}>
            <Stack spacing={'20px'} width={'100%'}>
              <UITextField
                labelSize='medium'
                fullWidth
                label='Company Name'
                placeholder='Ex. Google'
                value={recruiter?.name}
                onChange={(e) => {
                  handleChange({ ...recruiter, name: e.target.value });
                }}
              />
              <UITextField
                labelSize='medium'
                fullWidth
                label='Industry Type'
                placeholder='Ex. Healthcare'
                value={recruiter?.industry}
                onChange={(e) => {
                  handleChange({ ...recruiter, industry: e.target.value });
                }}
              />
              <UITextField
                labelSize='medium'
                fullWidth
                label='Company Address'
                placeholder='Ex. San Francisco, California'
                value={recruiter?.address?.line1 || ''}
                onChange={(e) => {
                  handleChange({
                    ...recruiter,
                    address: {
                      line1: e.target.value,
                      line2: '',
                      city: '',
                      country: '',
                      state: '',
                    },
                  });
                }}
                multiline
                minRows={7}
                maxRows={7}
              />
            </Stack>
            <Stack spacing={'20px'} width={'100%'}>
              <UITextField
                labelSize='medium'
                fullWidth
                label='Company Website'
                placeholder='https://companydomain.com'
                value={recruiter?.company_website}
                onChange={(e) => {
                  handleChange({
                    ...recruiter,
                    company_website: e.target.value,
                  });
                }}
              />
              <SocialComp setIsSaving={setIsSaving} />
            </Stack>
          </Stack>
        }
        slotLocation={
          <Stack p={'4px'}>
            {recruiter?.office_locations.map((loc, ind) => {
              return (
                <>
                  {edit.location == ind ? (
                    <SkillsInput
                      slotInput={
                        <UITextField
                          labelSize='medium'
                          fullWidth
                          placeholder='Ex. Google'
                          defaultValue={loc}
                          ref={locationRef}
                          noBorder
                        />
                      }
                      onClickCancel={{
                        onClick: () => {
                          setEdit(initialEdit());
                        },
                      }}
                      onClickSave={{
                        onClick: () => {
                          recruiter.office_locations[Number(ind)] =
                            locationRef.current.value;
                          handleChange({ ...recruiter });
                          setEdit(initialEdit());
                        },
                      }}
                    />
                  ) : (
                    <Stack p={'4px'}>
                      <CompanyLocation
                        onClickEdit={{
                          onClick: () => {
                            setEdit({ ...edit, location: ind });
                          },
                        }}
                        textLocation={loc}
                        onClickDelete={{
                          onClick: () => {
                            let locations = recruiter.office_locations.filter(
                              (location) => location != loc,
                            );
                            handleChange({
                              ...recruiter,
                              office_locations: locations,
                            });
                          },
                        }}
                      />
                    </Stack>
                  )}
                </>
              );
            })}
          </Stack>
        }
        slotRolesPills={recruiter?.available_roles?.map((rol, ind) => {
          return (
            <RolesPill
              key={ind}
              textRoles={rol}
              onClickRemoveRoles={{
                onClick: () => {
                  let roles = recruiter.available_roles.filter(
                    (role) => role != rol,
                  );
                  handleChange({
                    ...recruiter,
                    available_roles: roles,
                  });
                },
              }}
            />
          );
        })}
        slotDepartmentPills={recruiter?.departments?.map((dep, ind) => {
          return (
            <RolesPill
              key={ind}
              textRoles={dep}
              onClickRemoveRoles={{
                onClick: () => {
                  let departments = recruiter.departments.filter(
                    (depart) => depart != dep,
                  );
                  handleChange({
                    ...recruiter,
                    departments: departments,
                  });
                },
              }}
            />
          );
        })}
        slotTechStackPills={recruiter?.technology_score?.map((stack, ind) => {
          return (
            <RolesPill
              key={ind}
              textRoles={stack}
              onClickRemoveRoles={{
                onClick: () => {
                  let technologies = recruiter.technology_score.filter(
                    (tech) => tech != stack,
                  );
                  handleChange({
                    ...recruiter,
                    technology_score: technologies,
                  });
                },
              }}
            />
          );
        })}
        onClickAddLocation={{
          onClick: () => {
            setDialog({ ...dialog, location: true });
          },
        }}
        onClickAddAvailableRoles={{
          onClick: () => {
            setDialog({ ...dialog, roles: true });
          },
        }}
        onClickAddDepartments={{
          onClick: () => {
            setDialog({ ...dialog, departments: true });
          },
        }}
        onClickAddTechStacks={{
          onClick: () => {
            setDialog({ ...dialog, stacks: true });
          },
        }}
      />
    </div>
  );
};

export default CompanyInfoComp;

const initialEdit = () => {
  return { location: null, roles: null, departments: null, stacks: null };
};

const initialDialog = () => {
  return { location: false, roles: false, departments: false, stacks: false };
};
