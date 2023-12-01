import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CompanyProfileHeader, RecSideNavProfileBlock } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { SocialsType } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';

import AddNewCompany from './AddNewCompany';
import SidePanelDrawer from '../../Common/SidePanelDrawer';
function CompanyList() {
  const router = useRouter();
  const { recruiterUser, userDetails, setRecruiter } = useAuthDetails();
  const [allCompanies, setAllCompanies] = useState([]);
  async function getCompanies() {
    const { data, error } = await supabase
      .from('recruiter')
      .select()
      .eq('recruiter_user_id', recruiterUser?.user_id);
    if (!error) {
      const activeCompany = data.filter((ele) => ele.recruiter_active);
      setRecruiter({
        ...activeCompany[0],
        socials: activeCompany[0]?.socials as unknown as SocialsType,
      });
      setAllCompanies(data);
    }
  }
  useEffect(() => {
    if (userDetails.user.user_metadata.role !== 'recruiter') {
      getCompanies();
    }
  }, [userDetails]);

  const [openSideBar, setOpenSideBar] = useState(false);

  async function handleClick(ele: { id: any }) {
    document.getElementById('company-switch-arrows').click();
    for (const company of allCompanies) {
      await updateStatus(company.id, ele.id === company.id);
    }
  }

  async function updateStatus(id: any, status: boolean) {
    supabase
      .from('recruiter')
      .update({ recruiter_active: status })
      .eq('id', id)
      .select()
      .then(({ data }) => {
        if (data[0]?.recruiter_active) {
          getCompanies();
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
      <RecSideNavProfileBlock
        slotCompanyList={[...allCompanies]
          .sort((a, b) =>
            a.recruiter_active === b.recruiter_active
              ? 0
              : a.recruiter_active
              ? -1
              : 1,
          )
          .map((ele, i) => {
            if (ele.name)
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
                      if (i === 0) {
                        document
                          .getElementById('company-switch-arrows')
                          .click();
                        router.push(pageRoutes.COMPANY);
                      } else {
                        handleClick(ele);
                      }
                    },
                  }}
                  companyName={ele?.name}
                />
              );
          })}
          onclickAdd={{
            onClick: () => {
              setOpenSideBar(true);
            },
          }}
          backdropProps={{
            style:{
              'height': 'calc(100% + 32px)',
              'width':'calc(100% + 16px)',
            }
          }}
      />
    </>
  );
}

export default CompanyList;
