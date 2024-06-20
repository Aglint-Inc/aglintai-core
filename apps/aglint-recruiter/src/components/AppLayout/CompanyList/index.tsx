import { RecruiterType } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Avatar, Popover, Stack } from '@mui/material';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import { CompanyProfileHeader } from '@/devlink2/CompanyProfileHeader';
import { SwitchComp } from '@/devlink2/SwitchComp';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';
import { companyType } from '@/src/utils/userRoles';

import Icon from '../../Common/Icons/Icon';
import SidePanelDrawer from '../../Common/SidePanelDrawer';
import { API_FAIL_MSG } from '../../Jobs/Dashboard/JobPostCreateUpdate/utils';
import AddNewCompany from './AddNewCompany';

type CompanyTYpe = {
  recName: string;
  recId: string;
  isActive: boolean;
  logo: string;
};
function CompanyList() {
  // const router = useRouter();
  const { userDetails, setRecruiter, recruiter, setAllRecruiterRelation } =
    useAuthDetails();
  const [allCompanies, setAllCompanies] = useState<CompanyTYpe[]>([]);
  const [anchorlEl, setAnchorEl] = useState(null);
  async function getCompanies() {
    try {
      setAllCompanies([]);
      setAllRecruiterRelation([] as any);
      const relations = supabaseWrap(
        await supabase
          .from('recruiter_relation')
          .select('*, recruiter(*)')
          .eq('user_id', userDetails?.user.id),
      );
      setAllCompanies(
        relations.map((reln) => ({
          recName: reln.recruiter?.name,
          recId: reln.recruiter_id,
          isActive: reln.is_active,
          logo: reln.recruiter?.logo,
        })),
      );
      setAllRecruiterRelation(() =>
        relations.map((reln) => ({
          created_at: reln.created_at,
          role_id: reln.role_id,
          created_by: reln.created_by,
          id: reln.id,
          is_active: reln.is_active,
          recruiter_id: reln.recruiter_id,
          user_id: userDetails.user.id,
          role: reln.role,
          manager_id: reln.manager_id,
        })),
      );
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  }

  useEffect(() => {
    const role = userDetails?.user.user_metadata.role?.toLowerCase() as any;
    if (
      role &&
      (role === companyType.AGENCY?.toLowerCase() ||
        role === companyType.CONSULTANT?.toLowerCase())
    ) {
      getCompanies();
    }
  }, [userDetails]);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [companyUpdateLoader, setCompanyUploadLoader] = useState(null);

  async function updateStatus(id: any) {
    await supabase.rpc('set_active_rec', {
      in_recruiter_id: id,
      in_user_id: userDetails.user.id,
    });
    const { data: rec } = await supabase
      .from('recruiter')
      .select()
      .eq('id', id);
    setRecruiter(rec[0] as RecruiterType);
    setCompanyUploadLoader(null);
  }

  const role = userDetails?.user.user_metadata.role?.toLowerCase();
  return (
    <>
      <SidePanelDrawer
        openSidePanelDrawer={openSideBar}
        setOpenPanelDrawer={setOpenSideBar}
        onClose={() => {
          setOpenSideBar(false);
        }}
      >
        <AddNewCompany
          getCompanies={getCompanies}
          setOpenSideBar={setOpenSideBar}
        />
      </SidePanelDrawer>

      <Avatar
        src={recruiter?.logo}
        onClick={(e) => {
          if (
            role &&
            (role === companyType.AGENCY?.toLowerCase() ||
              role === companyType.CONSULTANT?.toLowerCase())
          ) {
            setAnchorEl(e.currentTarget);
          }
        }}
        variant='rounded'
        sx={{
          width: '100%',
          height: '100%',
          background: '#fff',
          '& .MuiAvatar-img ': {
            objectFit: 'contain',
          },
        }}
      >
        <Icon
          variant='CompanyOutlined'
          height='100%'
          width='100%'
          color='#87929D'
        />
      </Avatar>
      <Popover
        open={Boolean(anchorlEl)}
        anchorEl={anchorlEl}
        onClose={() => {
          setAnchorEl(false);
        }}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        sx={{
          '& .MuiPaper-root': {
            border: 'none !important',
            overflow: 'visible !important',
          },
        }}
      >
        <SwitchComp
          slotCompanyList={
            <>
              {allCompanies.map((ele, i) => {
                return (
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    px={'var(--space-1)'}
                    borderRadius={'var(--radius-4)'}
                    key={i}
                    bgcolor={
                      ele.recName === recruiter?.name && 'var(--neutral-1)'
                    }
                    onClick={() => {
                      updateStatus(ele.recId);
                    }}
                    sx={{
                      cursor: 'pointer',
                      // '&:hover': {
                      //   bgcolor:  'var(--neutral-1)',
                      // },
                    }}
                  >
                    <CompanyProfileHeader
                      slotLogo={
                        <Avatar
                          src={ele?.logo}
                          variant='rounded'
                          sx={{
                            width: '100%',
                            height: '100%',
                            background: '#fff',
                            '& .MuiAvatar-img ': {
                              objectFit: 'contain',
                            },
                          }}
                        />
                      }
                      onclickCompany={{
                        onClick: () => {
                          updateStatus(ele.recId);
                        },
                      }}
                      companyName={ele?.recName}
                    />
                    {ele.recId === companyUpdateLoader && (
                      <Stack
                        sx={{
                          '& svg': {
                            width: '24px',
                            height: '24px',
                          },
                          px: '12px',
                        }}
                      >
                        <LoaderSvg />
                      </Stack>
                    )}
                  </Stack>
                );
              })}
            </>
          }
          onclickAddButton={{
            onClick: () => {
              setOpenSideBar(true);
              setAnchorEl(null);
            },
          }}
        />
      </Popover>
    </>
  );
}

export default CompanyList;
