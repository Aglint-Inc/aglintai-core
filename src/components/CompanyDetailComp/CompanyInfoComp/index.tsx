import { Autocomplete, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { CompanyInfo, CompanyLocation, RolesPill } from '@/devlink';
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
  const [logo, setLogo] = useState<string>();
  const [dialog, setDialog] = useState(initialDialog());
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
        open={dialog.location.open}
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
          <Stack p={'4px'} width={'100%'} spacing={'20px'}>
            <Stack spacing={'20px'} width={'100%'} direction={'row'}>
              <UITextField
                labelSize='small'
                fullWidth
                label='Company Name'
                placeholder='Ex. Google'
                value={recruiter?.name}
                onChange={(e) => {
                  handleChange({ ...recruiter, name: e.target.value });
                }}
              />
              <UITextField
                labelSize='small'
                fullWidth
                label='Industry Type'
                placeholder='Ex. Healthcare'
                value={recruiter?.industry}
                onChange={(e) => {
                  handleChange({ ...recruiter, industry: e.target.value });
                }}
              />
            </Stack>
            <Stack spacing={'20px'} width={'100%'} direction={'row'}>
              <Autocomplete
                disableClearable
                freeSolo
                fullWidth
                options={sizes}
                onChange={(event, value) => {
                  if (value) {
                    handleChange({
                      ...recruiter,
                      employee_size: value,
                    });
                  }
                }}
                value={recruiter.employee_size}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <UITextField
                    rest={{ ...params }}
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                    }}
                    label='Employee Size'
                    labelSize='small'
                    onChange={(event) => {
                      handleChange({
                        ...recruiter,
                        employee_size: event.target.value,
                      });
                    }}
                  />
                )}
              />
              <UITextField
                labelSize='small'
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
            </Stack>
            <Stack width={'100%'} maxWidth={'420px'}>
              <SocialComp setIsSaving={setIsSaving} />
            </Stack>
          </Stack>
        }
        slotLocation={
          <Stack p={'4px'}>
            {recruiter?.office_locations.map((loc: any, ind) => {
              const location = [loc.city, loc.region, loc.country]
                .filter(Boolean)
                .join(', ');

              return (
                <>
                  <Stack p={'4px'}>
                    <CompanyLocation
                      onClickEdit={{
                        onClick: () => {
                          setDialog({
                            ...dialog,
                            location: { open: true, edit: ind },
                          });
                        },
                      }}
                      textLocation={location}
                      onClickDelete={{
                        onClick: () => {},
                      }}
                    />
                  </Stack>
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
            setDialog({ ...dialog, location: { open: true, edit: null } });
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

const initialDialog = () => {
  return {
    location: { open: false, edit: null },
    roles: false,
    departments: false,
    stacks: false,
  };
};

export const sizes = [
  '1 - 5',
  '5 - 50',
  '50 - 100',
  '100 - 500',
  '1000 - 5000',
  '5000+',
];
