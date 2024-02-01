import { Avatar, Popover, Stack } from '@mui/material';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoaderSvg } from '@/devlink';
import { CompanyProfileHeader, SwitchComp } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterType } from '@/src/types/data.types';
// import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';
import { companyType } from '@/src/utils/userRoles';

import AddNewCompany from './AddNewCompany';
import Icon from '../../Common/Icons/Icon';
import SidePanelDrawer from '../../Common/SidePanelDrawer';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

type CompanyTYpe = {
  recName: string;
  recId: string;
  isActive: boolean;
  logo: string;
};
function CompanyList() {
  // const router = useRouter();
  const { userDetails, setRecruiter, recruiter, setAllrecruterRelation } =
    useAuthDetails();
  const [allCompanies, setAllCompanies] = useState<CompanyTYpe[]>([]);
  const [anchorlEl, setAnchorEl] = useState(null);
  async function getCompanies() {
    try {
      setAllCompanies([]);
      setAllrecruterRelation([] as any);
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
      setAllrecruterRelation(() =>
        relations.map((reln) => ({
          created_at: reln.created_at,
          id: reln.id,
          is_active: reln.is_active,
          recruiter_id: reln.recruiter_id,
          user_id: userDetails.user.id,
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
          height='24'
          width='24'
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
          mt: 0.5,
          ml: -1,
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
                    px={'5px'}
                    borderRadius={'10px'}
                    key={i}
                    bgcolor={ele.recName === recruiter?.name && 'grey.100'}
                    onClick={() => {
                      updateStatus(ele.recId);
                    }}
                    sx={{
                      cursor: 'pointer',
                      // '&:hover': {
                      //   bgcolor: 'grey.100',
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
                          // router.push(pageRoutes.COMPANY);
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
                          px: '10px',
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
