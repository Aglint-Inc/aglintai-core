import { Dialog, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

import { AddLocationPop } from '@/devlink';
import { RecruiterType } from '@/src/types/data.types';

interface LocationProps {
  handleClose: () => void;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (recruiter: RecruiterType) => void;
}

const AddLocationDialog: React.FC<LocationProps> = ({
  handleClose,
  open,
  // handleChange,
}) => {
  // const isClicked = useRef(false); 
  // const { recruiter } = useAuthDetails();
  const [location, setLocation] = useState({
    city: '',
    state: '',
    country: '',
  });

  // const handleAddLocation = () => {
  //   if (location.city || location.state || location.state)
  //     if (!isClicked.current) {
  //       isClicked.current = true;
  //       let locations = recruiter.office_locations;
  //       locations.push(
  //         [location.city, location.state, location.country]
  //           .filter(Boolean)
  //           .join(', '),
  //       );
  //       handleChange({
  //         ...recruiter,
  //         office_locations: locations,
  //       });
  //       handleClose();
  //       isClicked.current = false;
  //       setLocation({
  //         city: '',
  //         state: '',
  //         country: '',
  //       });
  //     }
  // };

  return (
    <Dialog onClose={handleClose} open={open}>
      <AddLocationPop
        slotForm={
          <Stack>
            <TextField
              label='City'
              onChange={(e) => {
                setLocation({ ...location, city: e.target.value });
              }}
            />
            <TextField
              label='State'
              onChange={(e) => {
                setLocation({ ...location, state: e.target.value });
              }}
            />
            <TextField
              label='Country'
              onChange={(e) => {
                setLocation({ ...location, country: e.target.value });
              }}
            />
          </Stack>
        }
        onClickCancel={{
          onClick: () => {
            handleClose();
          },
        }}
        onClickAdd={{
          onClick: () => {
            // handleAddLocation();
          },
        }}
      />
    </Dialog>
  );
};

export default AddLocationDialog;
