import { Avatar } from '@mui/material';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CompanyProfileHeader, CompanySwitchDropdown } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';

import AddNewCompany from './AddNewCompany';
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
        .eq('user_id', userDetails.user.id);
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
    if (userDetails?.user.user_metadata.role !== 'recruiter') {
      getCompanies();
    }
  }, [userDetails]);

  const [openCompanyList, setOpenCompanyList] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  async function handleClick(ele: any) {
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
        }
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
          />
        }
        isDropdownBodyVisible={openCompanyList}
        slotCompanyList={allCompanies.map((ele, i) => {
          return (
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
              key={i}
              onclickCompany={{
                onClick: () => {
                  setOpenCompanyList(false);
                  // router.push(pageRoutes.COMPANY);
                  handleClick(ele);
                },
              }}
              companyName={ele?.name}
            />
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
