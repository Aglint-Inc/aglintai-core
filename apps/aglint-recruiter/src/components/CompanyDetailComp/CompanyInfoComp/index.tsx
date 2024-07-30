import { Autocomplete, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { BasicInfo } from '@/devlink/BasicInfo';
import { CompanyInfo } from '@/devlink/CompanyInfo';
import { CompanyLocation } from '@/devlink/CompanyLocation';
import { RolesPill } from '@/devlink/RolesPill';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';

import ImageUpload from '../../Common/ImageUpload';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import CompanyJdComp from '../CompanyJdComp';
import TeamManagement from '../TeamManagement';
import { debouncedSave } from '../utils';
import AddDepartmentsDialog from './AddDepartmentsDialog';
import AddLocationDialog from './AddLocationDialog';
import AddRolesDialog from './AddRolesDialog';
import AddSpecialityDialog from './AddSpecialityDialog';
import RolesAndPermissions from './RolesAndPermissions';
import SocialComp from './SocialComp';

const CompanyInfoComp = ({ setIsSaving }) => {
  const router = useRouter();
  const { checkPermissions } = useRolesAndPermissions();
  const {
    recruiter,
    setRecruiter,
    handleOfficeLocationsUpdate,
    handleDepartmentsUpdate,
  } = useAuthDetails();
  const [logo, setLogo] = useState<string>();
  const [dialog, setDialog] = useState(initialDialog());
  const [nameError, setNameError] = useState(false);
  const [isError, setError] = useState(false);
  const initialCompanyName = useRef(recruiter?.name);

  const handleChange = async (
    recruit: typeof recruiter,
    isEmptyName?: boolean,
  ) => {
    setIsSaving(true);
    if (isEmptyName) {
      debouncedSave(
        { ...recruit, name: String(initialCompanyName.current) },
        recruiter.id,
      );
    } else {
      debouncedSave(recruit, recruiter.id);
    }
    setRecruiter(recruit);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const handleClose = () => {
    setDialog(initialDialog());
  };

  const handleDeleteLocation = (id: number) => {
    handleOfficeLocationsUpdate({ type: 'delete', data: id });
  };

  useEffect(() => {
    setLogo(recruiter?.logo);
  }, [recruiter]);

  const isFormDisabled = !checkPermissions(['manage_company']);

  return (
    <Stack width={'100%'}>
      <AddSpecialityDialog
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
        key={Math.random()}
        handleClose={handleClose}
        open={dialog.location.open}
        edit={dialog.location.edit}
      />
      {router.query?.tab === 'additional-info' && (
        <>
          <MuiPopup
            props={{
              open: dialog.deletelocation.open,
              onClose: () => {
                setDialog({
                  ...dialog,
                  deletelocation: { open: false, edit: -1 },
                });
              },
            }}
          >
            <DeletePopup
              textDescription={
                'Are u sure u want to delete this office location? This action cannot be undone.'
              }
              textTitle={'Delete Office Location'}
              isIcon={false}
              onClickCancel={{
                onClick: () => {
                  setDialog({
                    ...dialog,
                    deletelocation: { open: false, edit: -1 },
                  });
                },
              }}
              onClickDelete={{
                onClick: () => {
                  handleDeleteLocation(dialog.deletelocation.edit);
                  setDialog({
                    ...dialog,
                    deletelocation: { open: false, edit: -1 },
                  });
                },
              }}
            />
          </MuiPopup>
          <CompanyInfo
            isEditable={!isFormDisabled}
            slotLocation={
              <>
                {recruiter?.office_locations &&
                  recruiter?.office_locations.map((loc) => {
                    const location = [loc.city, loc.region, loc.country]
                      .filter(Boolean)
                      .join(', ');
                    const [address] = [loc.line1];
                    const timeZone = [loc.timezone];
                    const isHeadQuaterVisible = Boolean(loc?.is_headquarter);

                    return (
                      <>
                        <Stack p={'var(--space-1)'}>
                          <CompanyLocation
                            isHeadQuaterVisible={isHeadQuaterVisible}
                            isEditDeleteVisible={!isFormDisabled}
                            onClickEdit={{
                              onClick: () => {
                                setDialog({
                                  ...dialog,
                                  location: { open: true, edit: loc.id },
                                });
                              },
                            }}
                            textFullAddress={address || '-'}
                            textLocationHeader={location}
                            textTimeZone={timeZone}
                            onClickDelete={{
                              onClick: () => {
                                setDialog({
                                  ...dialog,
                                  deletelocation: {
                                    open: true,
                                    edit: loc.id,
                                  },
                                });
                              },
                            }}
                          />
                        </Stack>
                      </>
                    );
                  })}
              </>
            }
            slotRolesPills={recruiter?.available_roles?.map((rol, ind) => {
              return (
                <RolesPill
                  key={ind}
                  textRoles={rol}
                  isCloseIconVisible={!isFormDisabled}
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
            slotDepartmentPills={recruiter?.departments?.map((dep) => {
              return (
                <RolesPill
                  key={dep.id}
                  textRoles={dep.name}
                  onClickRemoveRoles={{
                    onClick: () => {
                      handleDepartmentsUpdate({
                        type: 'delete',
                        data: [dep.id],
                      });
                    },
                  }}
                />
              );
            })}
            slotTechStackPills={recruiter?.technology_score?.map(
              (stack, ind) => {
                return (
                  <RolesPill
                    key={ind}
                    textRoles={stack}
                    isCloseIconVisible={!isFormDisabled}
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
              },
            )}
            onClickAddLocation={{
              onClick: () => {
                setDialog({ ...dialog, location: { open: true, edit: -1 } });
              },
            }}
            onClickAddAvailableRoles={{
              onClick: () => {
                setDialog({ ...dialog, roles: true });
              },
            }}
            onClickAddDepartments={{
              onClick: () => {
                setDialog((prev) => ({
                  ...prev,
                  departments: true,
                }));
              },
            }}
            onClickAddTechStacks={{
              onClick: () => {
                setDialog({ ...dialog, stacks: true });
              },
            }}
            isAvailableRolesVisible={true}
            isSpecialistVisible={true}
            slotEmploymentType={<CompanyJdComp setIsSaving={setIsSaving} />}
          />
        </>
      )}
      {router.query?.tab === 'basic-info' && (
        <>
          <BasicInfo
            isWarningVisible={isError}
            slotWarning={
              <Typography variant='caption' color='error'>
                The file you uploaded exceeds the maximum allowed size. Please
                ensure that the file size is less than 5 MB
              </Typography>
            }
            isChangeLogoVisible={!isFormDisabled}
            slotCompanyLogo={
              <>
                <ImageUpload
                  image={logo}
                  disabled={isFormDisabled}
                  setImage={(newLogo) => {
                    setLogo(newLogo);
                    if (recruiter) {
                      handleChange({
                        ...recruiter,
                        logo: newLogo,
                      });
                    }
                  }}
                  size={48}
                  table='company-logo'
                  error={(e) => {
                    if (e) {
                      setError(true);
                    } else {
                      setError(false);
                    }
                  }}
                />
              </>
            }
            onClickChangeLogo={{
              onClick: () => {
                document.getElementById('image-upload').click();
              },
            }}
            slotBasicForm={
              <Stack spacing={2} p={'var(--space-1)'} sx={{ width: '380px' }}>
                <UITextField
                  labelBold='default'
                  labelSize='small'
                  fullWidth
                  label='Company Name'
                  disabled={isFormDisabled}
                  required
                  error={nameError}
                  onFocus={() => setNameError(false)}
                  helperText={`Company name can't be empty`}
                  placeholder='Ex. Acme Inc.'
                  value={recruiter?.name}
                  onChange={(e) => {
                    e.target.value
                      ? (() => {
                          handleChange({
                            ...recruiter,
                            name: e.target.value,
                          });
                          setNameError(false);
                        })()
                      : (() => {
                          handleChange(
                            {
                              ...recruiter,
                              name: e.target.value,
                            },
                            true,
                          );
                          setNameError(true);
                        })();
                  }}
                />
                <UITextField
                  labelBold='default'
                  labelSize='small'
                  fullWidth
                  label='Industry'
                  disabled={isFormDisabled}
                  placeholder='Ex. Healthcare'
                  value={recruiter?.industry}
                  onChange={(e) => {
                    handleChange({ ...recruiter, industry: e.target.value });
                  }}
                />
                <Autocomplete
                  disableClearable
                  freeSolo
                  fullWidth
                  disabled={isFormDisabled}
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
                      labelBold='default'
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
                  labelBold='default'
                  labelSize='small'
                  fullWidth
                  label='Company Website'
                  disabled={isFormDisabled}
                  placeholder='https://companydomain.com'
                  value={recruiter?.company_website}
                  onChange={(e) => {
                    handleChange({
                      ...recruiter,
                      company_website: e.target.value,
                    });
                  }}
                />

                <SocialComp
                  setIsSaving={setIsSaving}
                  disabled={isFormDisabled}
                />
              </Stack>
            }
            textLogoUpdate={'Update Logo'}
          />
        </>
      )}
      {router.query?.tab === 'team' && <TeamManagement />}
      {router.query?.tab === 'roles' && <RolesAndPermissions />}
    </Stack>
  );
};

export default CompanyInfoComp;

const initialDialog = () => {
  return {
    deletelocation: { open: false, edit: -1 },
    location: { open: false, edit: -1 },
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
