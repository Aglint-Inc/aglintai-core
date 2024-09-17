// import { Skeleton } from '@components/ui/skeleton';
// import { Switch } from '@components/ui/switch';
// import { AddFilter } from '@devlink2/AddFilter';
// import { List, ListItemButton, Popover, Stack } from '@mui/material';
// import React, { memo, type ReactNode } from 'react';

// import { capitalizeFirstLetter } from '@/utils/text/textUtils';

// import UIFilter, { type dynamicOptionsTypes, FilterOptions } from '../UIFilter';
// import {
//   nestedOptionMapper,
//   type nestedType,
//   setValueInNestedObject,
// } from './utils';

// /* eslint-disable no-unused-vars */

// type FilterMultiSectionFilterType = {
//   name: string;
//   icon?: ReactNode;
//   options: { [section: string]: dynamicOptionsTypes };
//   value: { [section: string]: string[] };
//   setValue: (value: { [section: string]: string[] }) => void;
//   isVisible?: boolean;
// };
// type FilterNestedType = {
//   name: string;
//   icon?: ReactNode;
//   options: nestedType<string[] | { id: string; label: string }[]>;
//   value: nestedType<string[]>;
//   sectionHeaders: string[];
//   setValue: (value: nestedType<string[]>) => void;
//   isVisible?: boolean;
//   showCount?: boolean;
// };

// export type FilterComponentType = {
//   name: string;
//   icon?: ReactNode;
//   options: dynamicOptionsTypes;
//   value: string[];
//   filterSearch?: boolean;
//   searchPlaceholder?: string;
//   // eslint-disable-next-line no-unused-vars
//   setValue: (value: string[]) => void;
//   isVisible?: boolean;
//   multiSelect?: boolean;
//   loading?: boolean;
// };
// /* eslint-enable no-unused-vars */
// export type FilterTypes =
//   | ({
//       type: 'filter';
//     } & FilterComponentType)
//   | ({
//       type: 'multi-section-filter';
//     } & FilterMultiSectionFilterType)
//   | ({
//       type: 'nested-filter';
//     } & FilterNestedType)
//   | {
//       type: 'button';
//       name: string;
//       onClick: () => void;
//       isActive: boolean;
//       isVisible?: boolean;
//     };

// type showFilterMapperType<T> = T extends { name: infer N } ? N : never;

// export function FiltersComponent({
//   filters: tempFilters,
//   showFilters,
//   setShowFilters = (names) => {
//     names;
//   },
// }: {
//   filters: FilterTypes[];
//   showFilters?: showFilterMapperType<FilterTypes>[];
//   // eslint-disable-next-line no-unused-vars
//   setShowFilters?: (names: string[]) => void;
// }) {
//   const filters = !showFilters
//     ? tempFilters?.map((filter) => {
//         filter.isVisible = true;
//         return filter;
//       })
//     : tempFilters?.map((filter) => {
//         filter.isVisible = showFilters.includes(filter.name);
//         return filter;
//       });

//   function handelSetVisible(index: number) {
//     const tempSF = [...showFilters];
//     tempSF.push(tempFilters[Number(index)].name);
//     setShowFilters(tempSF);
//   }

//   return (
//     <>
//       {filters
//         .filter((item) => {
//           return item.isVisible;
//         })
//         .map((filter, index) => FilterSwitcher(filter, index))}

//       {Boolean(showFilters) && (
//         <AddFilterComp
//           filterList={filters
//             .map((item, index) => ({
//               name: item.name,
//               index,
//               isVisible: item.isVisible,
//             }))
//             .filter((item) => !item.isVisible)}
//           setVisible={handelSetVisible}
//         />
//       )}
//     </>
//   );
// }

// function FilterSwitcher(filter: FilterTypes, index: number) {
//   switch (filter.type) {
//     case 'filter':
//       return (
//         <FilterComponent
//           key={index}
//           name={capitalizeFirstLetter(filter.name || '')}
//           searchPlaceholder={filter.searchPlaceholder}
//           options={filter.options}
//           filterSearch={filter.filterSearch}
//           value={filter.value}
//           setValue={(values) => {
//             filter.setValue(values);
//           }}
//           icon={filter.icon}
//           multiSelect={filter.multiSelect}
//           loading={filter.loading}
//         />
//       );
//     case 'multi-section-filter': {
//       return (
//         <MultiSectionFilterComponent
//           key={index}
//           title={capitalizeFirstLetter(filter.name || '')}
//           itemListSections={filter.options}
//           selectedItems={filter.value}
//           setSelectedItems={(values) => {
//             filter.setValue(values);
//           }}
//           icon={filter.icon}
//         />
//       );
//     }
//     case 'nested-filter': {
//       return (
//         <NestedFilterComponent
//           key={index}
//           title={capitalizeFirstLetter(filter.name || '')}
//           nestedItems={filter.options}
//           selectedItems={filter.value}
//           sectionHeaders={filter.sectionHeaders}
//           setSelectedItems={(values) => {
//             filter.setValue(values);
//           }}
//           icon={filter.icon}
//           showCount={filter.showCount}
//         />
//       );
//     }
//     case 'button':
//       return (
//         <UIFilter
//           key={index}
//           isActive={filter.isActive}
//           isDotVisible={false}
//           slotLeftIcon={
//             <div className='pointer-events-none'>
//               <Switch checked={filter.isActive} />
//             </div>
//           }
//           textLabel={capitalizeFirstLetter(filter.name || '')}
//           onClick={() => filter.onClick()}
//           options={<></>}
//           type='button'
//         />
//       );
//   }
// }

// export function FilterComponent({
//   name: title,
//   options: itemList,
//   setValue: setSelectedItems,
//   value: selectedItems,
//   filterSearch = false,
//   searchPlaceholder = '',
//   multiSelect = true,
//   icon,
//   loading = false,
// }: FilterComponentType) {
//   return (
//     <>
//       <UIFilter
//         isActive={Boolean(selectedItems.length)}
//         isDotVisible={Boolean(selectedItems.length)}
//         slotLeftIcon={<Stack>{icon}</Stack>}
//         // isDotVisible={filter.job_ids.length > 0}
//         textLabel={title}
//         showCaret
//         resetFilter={() => setSelectedItems([])}
//         options={
//           loading ? (
//             <Loader />
//           ) : (
//             <FilterOptions
//               optionList={itemList}
//               selectedItems={selectedItems}
//               searchFilter={filterSearch}
//               searchPlaceholder={searchPlaceholder}
//               multiSelect={multiSelect}
//               setSelectedItems={(val) => {
//                 if (multiSelect) {
//                   let temp = [...selectedItems];
//                   if (temp.includes(val)) {
//                     temp = temp.filter((innerEle) => innerEle !== val);
//                   } else {
//                     temp.push(val);
//                   }
//                   setSelectedItems(temp);
//                 } else {
//                   setSelectedItems([val]);
//                 }
//               }}
//               nested={false}
//             />
//           )
//         }
//       />
//     </>
//   );
// }

// const Loader = memo(() => {
//   return (
//     <div className='space-y-2 p-2 min-w-[176px]'>
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className='w-[200px] h-[20px]'>
//           <Skeleton className=' max-w-[200px] h-5' />
//         </div>
//       ))}
//     </div>
//   );
// });
// Loader.displayName = 'Loader';

// export type MultiSectionFilterComponentType = {
//   title: string;
//   itemListSections: FilterMultiSectionFilterType['options'];
//   selectedItems: FilterMultiSectionFilterType['value'];
//   // eslint-disable-next-line no-unused-vars
//   setSelectedItems: FilterMultiSectionFilterType['setValue'];
//   icon: ReactNode;
// };

// type isSectionsActive = {
//   // eslint-disable-next-line no-unused-vars
//   [K: string]: number;
// };
// function MultiSectionFilterComponent({
//   title,
//   itemListSections,
//   setSelectedItems,
//   selectedItems,
//   icon,
// }: MultiSectionFilterComponentType) {
//   const sectionsArray = Object.entries(itemListSections);
//   const sectionsSelectedArray = Object.entries(selectedItems || {});

//   const isSectionsActive = sectionsSelectedArray.reduce((acc, curr) => {
//     const [key, val] = curr;
//     acc[String(key)] = val.length;
//     return acc;
//   }, {} as isSectionsActive);

//   const isAnyActive =
//     (Object.values(isSectionsActive) as number[]).reduce((a, b) => a + b, 0) >
//     0;
//   const [search, setSearch] = React.useState<number[]>([]);
//   return (
//     <>
//       <UIFilter
//         isActive={isAnyActive}
//         isDotVisible={isAnyActive}
//         slotLeftIcon={<Stack>{icon}</Stack>}
//         // isDotVisible={filter.job_ids.length > 0}
//         // onClickStatus={{
//         //   onClick: handleClick,
//         // }}
//         textLabel={title}
//         showCaret={true}
//         options={
//           <div className='flex flex-row'>
//             {sectionsArray?.map(([section, optionList], i) => {
//               const searchEnabled = search.includes(i);
//               return (
//                 <FilterOptions
//                   key={i}
//                   optionList={optionList}
//                   selectedItems={selectedItems?.[String(section)] || []}
//                   searchFilter={searchEnabled}
//                   searchPlaceholder={section[i]}
//                   setSearchOp={() => {
//                     if (searchEnabled) {
//                       setSearch(search.filter((item) => item !== i));
//                     } else setSearch([...search, i]);
//                   }}
//                   setSelectedItems={(val) => {
//                     let temp = [...selectedItems[String(section)]];
//                     if (temp.includes(val)) {
//                       temp = temp.filter((innerEle) => innerEle !== val);
//                     } else {
//                       temp.push(val);
//                     }
//                     setSelectedItems({
//                       ...selectedItems,
//                       [section]: temp,
//                     });
//                   }}
//                   sectionHeading={capitalizeFirstLetter(section)}
//                   separator={i !== 0}
//                   nested={false}
//                 />
//               );
//             })}
//           </div>
//         }
//         resetFilter={() =>
//           setSelectedItems(
//             sectionsArray.reduce(
//               (acc, curr) => {
//                 acc[curr[0]] = [];
//                 return acc;
//               },
//               {} as typeof selectedItems,
//             ),
//           )
//         }
//       />
//     </>
//   );
// }

// export type NestedFilterComponentType = {
//   title: string;
//   nestedItems: FilterNestedType['options'];
//   selectedItems: FilterNestedType['value'];
//   // eslint-disable-next-line no-unused-vars
//   setSelectedItems: FilterNestedType['setValue'];
//   sectionHeaders: string[];
//   icon: ReactNode;
//   showCount?: boolean;
// };

// function NestedFilterComponent({
//   title,
//   nestedItems,
//   setSelectedItems,
//   selectedItems,
//   sectionHeaders,
//   icon,
//   showCount = false,
// }: NestedFilterComponentType) {
//   const sectionsArray = nestedOptionMapper(
//     sectionHeaders,
//     nestedItems,
//     selectedItems,
//     showCount,
//   );

//   // const sectionsSelectedArray = Object.entries(selectedItems || {});

//   const isSectionsActive = sectionsArray.reduce((acc, curr) => {
//     const [key, , count] = curr;
//     acc[String(key)] = count;
//     return acc;
//   }, {} as isSectionsActive);

//   const isAnyActive =
//     (Object.values(isSectionsActive) as number[]).reduce((a, b) => a + b, 0) >
//     0;
//   const [search, setSearch] = React.useState<number[]>([]);
//   return (
//     <>
//       <UIFilter
//         isActive={isAnyActive}
//         isDotVisible={isAnyActive}
//         slotLeftIcon={<Stack>{icon}</Stack>}
//         // isDotVisible={filter.job_ids.length > 0}
//         // onClickStatus={{
//         //   onClick: handleClick,
//         // }}
//         textLabel={title}
//         showCaret={true}
//         options={
//           <div className='flex flex-row'>
//             {sectionsArray?.map(([section, optionList], i) => {
//               const searchEnabled = search.includes(i);
//               return (
//                 <>
//                   <FilterOptions
//                     optionList={optionList}
//                     selectedItems={selectedItems?.[String(section)] || []}
//                     searchFilter={searchEnabled}
//                     searchPlaceholder={section}
//                     setSearchOp={() => {
//                       if (searchEnabled) {
//                         setSearch(search.filter((item) => item !== i));
//                       } else setSearch([...search, i]);
//                     }}
//                     setSelectedItems={(val, path) => {
//                       const temp = setValueInNestedObject(
//                         structuredClone(selectedItems),
//                         path,
//                         val,
//                         nestedItems,
//                       );
//                       setSelectedItems(temp);
//                     }}
//                     sectionHeading={capitalizeFirstLetter(section)}
//                     sectionReset={() => {
//                       setSelectedItems({
//                         ...selectedItems,
//                         [section]: [],
//                       });
//                     }}
//                     separator={i !== 0}
//                     nested={true}
//                   />
//                 </>
//               );
//             })}
//           </div>
//         }
//         resetFilter={() => setSelectedItems([])}
//       />
//     </>
//   );
// }

// function AddFilterComp({
//   filterList,
//   setVisible,
// }: {
//   filterList: { name: string; index }[];
//   // eslint-disable-next-line no-unused-vars
//   setVisible: (index: number) => void;
// }) {
//   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
//     null,
//   );

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'add-filter' : undefined;

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   return (
//     <>
//       <AddFilter
//         onClickAddFilter={{
//           style: {
//             'align-items': 'center',
//           },
//           onClick: (e) => {
//             handleClick(e);
//           },
//         }}
//       />
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{ vertical: -10, horizontal: 0 }}
//         sx={{
//           '& .MuiPopover-paper': {
//             border: 'none',
//           },
//         }}
//       >
//         <Stack direction={'column'}>
//           {filterList.map((item, i) => {
//             return (
//               <List key={i}>
//                 <ListItemButton onClick={() => setVisible(item.index)}>
//                   {capitalizeFirstLetter(item.name)}
//                 </ListItemButton>
//               </List>
//             );
//           })}
//         </Stack>
//       </Popover>
//     </>
//   );
// }
