import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MaterialTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Demo" {...a11yProps(0)} />
        <Tab label="Seed" {...a11yProps(1)} />
        <Tab label="Debug" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Content for Demo tab.
      </TabPanel>
      <TabPanel value={value} index={1}>
        Content for Seed tab.
      </TabPanel>
      <TabPanel value={value} index={2}>
        Content for Debug tab.
      </TabPanel>
    </Box>
  );
}
