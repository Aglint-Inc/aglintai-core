import { holidayType, schedulingSettingType } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ButtonGhost } from '@devlink/ButtonGhost';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { DcPopup } from '@devlink/DcPopup';
import { CompanyDayOff } from '@devlink2/CompanyDayOff';
import { DayoffList } from '@devlink2/DayoffList';
import { TextWithBg } from '@devlink2/TextWithBg';
import { DayOffHelper } from '@devlink3/DayOffHelper';
import { cn } from '@lib/utils';
import {
  Autocomplete,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { capitalize, cloneDeep } from 'lodash';
import { Calendar as CalendarIcon } from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import dayjs from '@/utils/dayjs';
import toast from '@/utils/toast';

import { ShowCode } from '../../Common/ShowCode';
import UITextField from '../../Common/UITextField';

export const LoadMax = {
  dailyHours: 8,
  dailyInterviews: 10,
  weeklyHours: 40,
  weeklyInterviews: 50,
};

type specificLocationType = 'all_locations' | 'specific_locations';

function Holidays() {
  const { recruiter } = useAuthDetails();
  const eventRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [daysOff, setDaysOff] = useState<holidayType[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [specificLocationOn, setSpecificLocationOn] =
    useState<specificLocationType>('all_locations');

  const [openDialog, setOpenDialog] = useState(false);
  const openCompany = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  function getDate(e: any) {
    setSelectedDate(dayjs(e).format('DD MMM YYYY'));
    // dateRef.current.value = String(new Date(e.$d));
  }

  function removeDayOff(value: string) {
    setDaysOff((pre) => {
      const filtered = pre.filter((item) => item.date !== value);
      return [...filtered];
    });
  }

  function initialLoad() {
    if (recruiter.scheduling_settings) {
      const schedulingSettingData = cloneDeep(
        recruiter.scheduling_settings,
      ) as schedulingSettingType;
      setDaysOff([...schedulingSettingData.totalDaysOff] as holidayType[]);
    }
  }

  useEffect(() => {
    initialLoad();
  }, []);

  const compareDates = (a: holidayType, b: holidayType) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return Number(dateA) - Number(dateB);
  };

  ///////////// DayOff Popup //////////////
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openAddCompany = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedDate('');
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <CompanyDayOff
        slotLearnButton={
          <>
            <ButtonGhost
              size={1}
              textButton='Learn How'
              onClickButton={{
                onClick: () => {
                  openCompany();
                },
              }}
            />
          </>
        }
        slotAddButton={
          <ButtonSolid
            textButton='Add Day Off'
            size={1}
            iconName='add'
            isLeftIcon
            onClickButton={{
              onClick: openAddCompany,
            }}
          />
        }
        slotDayoffList={
          <>
            {daysOff.sort(compareDates).map((item, i) => {
              return (
                <DayoffList
                  key={i}
                  slotTextWithBg={
                    item?.locations ? (
                      item.locations.map((location, index) => {
                        return <TextWithBg key={index} text={location} />;
                      })
                    ) : (
                      <Typography
                        px={'var(--space-2)'}
                        variant='caption'
                        fontSize={'14px'}
                      >
                        All locations
                      </Typography>
                    )
                  }
                  textDate={item.date}
                  textDayoff={item.event_name}
                  onClickDelete={{
                    onClick: () => removeDayOff(item.date),
                  }}
                />
              );
            })}
            <Dialog open={open} onClose={handleClose}>
              <DcPopup
                popupName={'Add Holiday'}
                onClickClosePopup={{ onClick: handleClose }}
                slotBody={
                  <Stack gap={1}>
                    {/* <Typography variant='body1'>Day off</Typography> */}
                    <Stack direction={'row'}>
                      <Typography>Day off</Typography>
                      <Typography sx={{ color: 'var(--error-9)', pl: 0.5 }}>
                        *
                      </Typography>
                    </Stack>
                    <Stack>
                      <UITextField
                        placeholder='Enter the name of the holiday'
                        fullWidth
                        ref={eventRef}
                      />
                    </Stack>
                    {/* <Typography variant='body1'>Date</Typography> */}
                    <Stack direction={'row'}>
                      <Typography>Date</Typography>
                      <Typography sx={{ color: 'var(--error-9)', pl: 0.5 }}>
                        *
                      </Typography>
                    </Stack>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !dateRef.current?.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {dateRef.current?.value ? (
                            format(new Date(dateRef.current.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={
                            dateRef.current?.value
                              ? new Date(dateRef.current.value)
                              : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              getDate(date);
                            }
                          }}
                          disabled={(date) =>
                            daysOff.some(
                              (day) =>
                                new Date(day.date).toDateString() ===
                                date.toDateString(),
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Typography variant='body1'>Location</Typography>
                    <Stack
                      fontSize={'12px'}
                      direction={'row'}
                      spacing={'var(--space-2)'}
                    >
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby='demo-row-radio-buttons-group-label'
                          name='row-radio-buttons-group'
                        >
                          {['all_locations', 'specific_locations'].map(
                            (ele, i) => {
                              return (
                                <FormControlLabel
                                  checked={specificLocationOn === ele}
                                  key={i}
                                  onChange={(e: any) => {
                                    setSpecificLocationOn(e.target.value);
                                  }}
                                  sx={{
                                    marginLeft: '0px',
                                    '& .MuiRadio-root': {
                                      marginRight: 'var(--space-1)',
                                    },
                                  }}
                                  value={ele}
                                  control={<Radio />}
                                  label={capitalize(ele.replaceAll('_', ' '))}
                                />
                              );
                            },
                          )}
                        </RadioGroup>
                      </FormControl>
                    </Stack>

                    <ShowCode>
                      <ShowCode.When
                        isTrue={specificLocationOn === 'specific_locations'}
                      >
                        <Typography variant='body1'>Pick locations</Typography>

                        <Autocomplete
                          multiple
                          fullWidth
                          onChange={(_, value) => {
                            setSelectedLocations(value);
                          }}
                          options={recruiter?.office_locations.map(
                            (
                              item: ReturnType<
                                typeof useAuthDetails
                              >['recruiter']['office_locations'][number],
                            ) => {
                              return `${item.city}, ${item.region}, ${item.country}`;
                            },
                          )}
                          renderInput={(params) => (
                            <TextField
                              placeholder='Select Locations'
                              {...params}
                            />
                          )}
                        />
                      </ShowCode.When>
                    </ShowCode>
                  </Stack>
                }
                slotButtons={
                  <>
                    <ButtonSoft
                      textButton='Cancel'
                      size={2}
                      color={'neutral'}
                      onClickButton={{
                        onClick: handleClose,
                      }}
                    />
                    <ButtonSolid
                      size={2}
                      textButton={'Add'}
                      onClickButton={{
                        onClick: () => {
                          if (!eventRef.current.value) {
                            toast.message('Please enter event name.');
                            return;
                          }
                          if (!selectedDate) {
                            toast.message('Please select a date.');
                            return;
                          }
                          if (
                            specificLocationOn === 'specific_locations' &&
                            selectedLocations.length === 0
                          ) {
                            toast.message('Please select a locations.');
                            return;
                          }
                          setDaysOff(
                            (pre) =>
                              [
                                ...pre,
                                {
                                  date: selectedDate,
                                  event_name: eventRef.current.value,
                                  locations:
                                    specificLocationOn === 'specific_locations'
                                      ? selectedLocations
                                      : recruiter?.office_locations.map(
                                          (
                                            item: ReturnType<
                                              typeof useAuthDetails
                                            >['recruiter']['office_locations'][number],
                                          ) =>
                                            `${item.city}, ${item.region}, ${item.country}`,
                                        ),
                                },
                              ] as holidayType[],
                          );
                          handleClose();
                          toast.success(
                            `Holiday added on ${dayjs(selectedDate).format(
                              'DD-MMM-YYYY',
                            )} ${
                              eventRef.current.value ? 'for' : ''
                            } ${eventRef.current.value}`,
                          );
                        },
                      }}
                    />
                  </>
                }
              />
            </Dialog>
          </>
        }
      />
      <Dialog open={openDialog} onClose={closeDialog}>
        <DayOffHelper
          onClickClose={{
            onClick: () => {
              closeDialog();
            },
          }}
          slotButton={
            <ButtonSolid
              textButton='Got It'
              size={2}
              onClickButton={{
                onClick: () => {
                  closeDialog();
                },
              }}
            />
          }
        />
      </Dialog>
    </>
  );
}

export default Holidays;
