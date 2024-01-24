import { Avatar, Stack } from '@mui/material';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoaderSvg } from '@/devlink';
import { CompanyProfileHeader, CompanySwitchDropdown } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import { companyType } from '@/src/utils/userRoles';

import AddNewCompany from './AddNewCompany';
import Icon from '../../Common/Icons/Icon';
import SidePanelDrawer from '../../Common/SidePanelDrawer';
function CompanyList() {
  // const router = useRouter();
  const {
    userDetails,
    setRecruiter,
    recruiter,
    allrecruterRelation,
    setAllrecruterRelation,
  } = useAuthDetails();
  const [allCompanies, setAllCompanies] = useState([]);

  async function getCompanies() {
    setAllCompanies([]);
    setAllrecruterRelation([] as any);
    const { data: recruiter_relation, error: recruiter_relation_error } =
      await supabase
        .from('recruiter_relation')
        .select()
        .eq('user_id', userDetails?.user.id);
    setAllrecruterRelation(recruiter_relation as any);
    if (!recruiter_relation_error)
      recruiter_relation.map(async (ele) => {
        const { data } = await supabase
          .from('recruiter')
          .select()
          .eq('id', ele.recruiter_id);
        setAllCompanies((pre) => [...pre, data[0]]);
        if (ele.is_active) {
          setRecruiter(data[0] as any);
        }
      });
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

  const [openCompanyList, setOpenCompanyList] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [companyUpdateLoader, setCompanyUploadLoader] = useState(null);

  async function handleClick(ele: any) {
    setCompanyUploadLoader(ele.id);
    for (const recruterRelation of allrecruterRelation as any) {
      await updateStatus(
        recruterRelation?.recruiter_id,
        ele.id === recruterRelation?.recruiter_id,
        ele,
      );
    }
  }

  async function updateStatus(id: any, status: boolean, ele: any) {
    await supabase
      .from('recruiter_relation')
      .update({
        is_active: status,
      })
      .eq('recruiter_id', id)
      .select()
      .then(({ data }) => {
        if (data[0]?.is_active) {
          setRecruiter(ele);
          setOpenCompanyList(false);
        }
        setCompanyUploadLoader(null);
      });
  }

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

      <CompanySwitchDropdown
        slotCurrentCompany={
          <Avatar
            src={recruiter?.logo}
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
        }
        isDropdownBodyVisible={openCompanyList}
        slotCompanyList={allCompanies.map((ele, i) => {
          return (
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              px={'5px'}
              borderRadius={'10px'}
              key={i}
              bgcolor={ele.name === recruiter.name && 'grey.100'}
              onClick={() => {
                handleClick(ele);
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
                    handleClick(ele);
                  },
                }}
                companyName={ele?.name}
              />
              {ele.id === companyUpdateLoader && (
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
        onclickAddButton={{
          onClick: () => {
            setOpenCompanyList(false);
            setOpenSideBar(true);
          },
        }}
        onclickDropdown={{
          onClick: () => {
            setOpenCompanyList(true);
          },
        }}
      />
    </>
  );
}

export default CompanyList;
