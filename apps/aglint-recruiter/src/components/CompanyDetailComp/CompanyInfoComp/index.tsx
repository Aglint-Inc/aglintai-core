import { RecruiterType } from '@aglint/shared-types';
import { Autocomplete, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { BasicInfo } from '@/devlink/BasicInfo';
import { CompanyInfo } from '@/devlink/CompanyInfo';
import { CompanyLocation } from '@/devlink/CompanyLocation';
import { RolesPill } from '@/devlink/RolesPill';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import ImageUpload from '../../Common/ImageUpload';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import AssessmentSettings from '../AssessmentSettings';
import Assistant from '../Assistant';
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
  const { recruiter, setRecruiter } = useAuthDetails();
  const [logo, setLogo] = useState<string>();
  const [dialog, setDialog] = useState(initialDialog());
  const [isVideoAssessment, setIsVideoAssessment] = useState(false);
  const [isDetele, setDeletPopup] = useState(false);
  const [nameError, setNameError] = useState(false);

  const initialCompanyName = useRef(recruiter?.name);

  useEffect(() => {
    setLogo(recruiter?.logo);
  }, [recruiter]);

  const handleChange = async (
    recruit: RecruiterType,
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

  const handleDeleteLocation = (i: number) => {
    setRecruiter((recruiter) => {
      const newRecruiter = {
        ...recruiter,
        office_locations: recruiter.office_locations.reduce(
          (acc: any, curr, index) => {
            if (i !== index) acc.push(curr);
            return acc;
          },
          [],
        ) as any,
      };
      debouncedSave(newRecruiter, newRecruiter.id);
      return newRecruiter;
    });
  };

  useEffect(() => {
    if (recruiter) setIsVideoAssessment(recruiter?.video_assessment);
  }, [recruiter]);
  const [isError, setError] = useState(false);

  return (
    <Stack
      // sx={{ overflowY: 'auto', height: 'calc(100vh - 60px)' }}
      width={'100%'}
    >
      <YTransform uniqueKey={router.query.tab}>
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
            <CompanyInfo
              slotLocation={
                <>
                  {recruiter?.office_locations &&
                    recruiter?.office_locations.map((loc: any, i) => {
                      const location = [loc.city, loc.region, loc.country]
                        .filter(Boolean)
                        .join(', ');
                      const [address] = [loc.full_address];
                      const timeZone = [loc.timezone];
                      const isHeadQuaterVisible = loc?.is_headquarter
                        ? loc.is_headquarterue
                        : false;

                      return (
                        <>
                          <Stack p={'var(--space-1)'}>
                            <CompanyLocation
                              isHeadQuaterVisible={isHeadQuaterVisible}
                              onClickEdit={{
                                onClick: () => {
                                  setDialog({
                                    ...dialog,
                                    location: { open: true, edit: i },
                                  });
                                },
                              }}
                              textFullAddress={address || '-'}
                              textLocationHeader={location}
                              textTimeZone={timeZone}
                              onClickDelete={{
                                onClick: () => {
                                  setDeletPopup(true);
                                },
                              }}
                            />
                          </Stack>
                          <MuiPopup
                            props={{
                              open: isDetele,
                              onClose: () => {
                                setDeletPopup(false);
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
                                  setDeletPopup(false);
                                },
                              }}
                              onClickDelete={{
                                onClick: () => {
                                  handleDeleteLocation(i), setDeletPopup(false);
                                },
                              }}
                            />
                          </MuiPopup>
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
              slotTechStackPills={recruiter?.technology_score?.map(
                (stack, ind) => {
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
              slotCompanyLogo={
                <>
                  <ImageUpload
                    image={logo}
                    setImage={(newLogo) => {
                      setLogo(newLogo);
                      if (recruiter) {
                        handleChange({
                          ...recruiter,
                          logo: newLogo,
                        } as RecruiterType);
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
                  {/* <ImageUpload
                    image={logo}
                    setImage={setLogo}
                    size={70}
                    table='company-logo'
                    changeCallback={(logo: any) => {
                      handleChange({ ...recruiter, logo: logo });
                    }} 
                  />*/}
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
              }
              textLogoUpdate={'Update Logo'}
            />
          </>
        )}
        {router.query?.tab === 'assessment' && (
          <AssessmentSettings
            isVideoAssessment={isVideoAssessment}
            setIsVideoAssessment={setIsVideoAssessment}
            setIsSaving={setIsSaving}
          />
        )}
        {router.query?.tab === 'job-assistant' && (
          <Assistant setIsSaving={setIsSaving} />
        )}
        {/* {router.query?.tab === 'email' && (
          <>
            <EmailTemplate setIsSaving={setIsSaving} />
          </>
        )} */}
        {router.query?.tab === 'team' && <TeamManagement />}
        {router.query?.tab === 'roles' && <RolesAndPermissions />}
      </YTransform>
    </Stack>
  );
};

export default CompanyInfoComp;

const initialDialog = () => {
  return {
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
