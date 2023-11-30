
import Popover from "@mui/material/Popover";
import { useRouter } from "next/router";
import { useState } from "react";

import { Sort, SortButton } from "@/devlink"

import UISelect from "../../Common/Uiselect";



const SortComp = ()=>{
    const [anchorlEl, setAnchorEl] = useState(null);
    const [sortType, setSortType] = useState('first_name');
    const [sortActive, setSortActive] = useState(true);
    const isDisabled = sortType.length===0;
    const router = useRouter();
    const applySort = ()=>{

     router.query.sort_type= sortActive? 'asc' : 'desc';
     router.query.sort_by_param =  sortType;
     router.push(router)
    }
    
    return(
        <>
        <SortButton
        onClickSortby={{onClick:(e)=>{
            setAnchorEl(e.currentTarget);

        }}}/>
          <Popover
        open={Boolean(anchorlEl)}
        anchorEl={anchorlEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        keepMounted={false}
        sx={{
          '& .MuiPaper-root': {
            overflow: 'hidden',
          },
          top: 35,
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <Sort
        isAscendingActive={sortActive}
        isDescendingActive={!sortActive}
        slotSortDrop={
            <UISelect 
            defaultValue={'first_name'}
            menuOptions={[{name:'Name', value:'first_name'},{name:'Location', value:'location'},{name:'Current job title', value:'job_title'}]} 
            value={sortType} 
            onChange={(e) => {
                if (e.target.value === '') return;
                setSortType(e.target.value as any)
                ;
              }}/>
        }
        onClickApplySort={{onClick:()=>{

applySort();
        }}}
        onClickAscending={{onClick:()=>{
            setSortActive(true)

        }}}
        onClickDescending={{onClick:()=>{
            setSortActive(false)

        }}}
        isApplySortDisable={isDisabled}/>
      </Popover>
        
        </>

    )
}

export default SortComp;