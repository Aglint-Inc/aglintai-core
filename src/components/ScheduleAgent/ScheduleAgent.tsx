/* eslint-disable no-console */
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import React, { useRef, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';

import SpecializedDatePicker from '../Common/SpecializedDatePicker';
import UISelect from '../Common/Uiselect';

type ChatType = {
  value: string;
  type: 'user' | 'assistant';
};

const ScheduleAgent = () => {
  const { jobsData } = useJobs();
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
  // const [email, setEmail] = useState('dileepwert@gmail.com');
  const [jobId, setJobId] = useState('');
  const [chatStatus, setChatStatus] = useState<'loading' | 'error' | 'loaded'>(
    'loaded',
  );
  const conversationRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedCand, setSelectedCand] = useState({
    application_id: '681c0858-fb4d-4180-ab96-c2d13e52e58e',
    candidate_email: 'dm89f11@gmail.com',
  });

  const { recruiter_id, recruiterUser } = useAuthDetails();

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };
  const jobs = jobsData?.jobs ?? [];

  const handleConversations = async () => {
    try {
      setChatStatus('loading');
      const { data } = await axios.post(
        '/api/scheduling/mail-agent/email-webhook',
        {
          candidate_email: selectedCand.candidate_email,
          email_body: newMessage,
        },
      );
      setMessages(data.history);
      setChatStatus('loaded');
    } catch (error) {
      console.log(error);
      setChatStatus('error');
    }
  };

  const initConversation = async () => {
    try {
      const { data } = await axios.post(
        '/api/scheduling/mail-agent/init-agent',
        {
          application_id: selectedCand.application_id,
          job_id: jobId,
          company_id: recruiter_id,
          candidate_email: selectedCand.candidate_email,
          date_range: [startDate.toISOString(), endDate.toISOString()],
          candidate_name: 'Dileep B C',
          recruiter_user_id: recruiterUser.user_id,
        },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!jobs) return <></>;

  return (
    <>
      <Box
        display='flex'
        // flexDirection='column'
        //   sx={{ backgroundColor: '#f0f0f0' }}
        height='100vh'
      >
        <Box
          sx={{
            width: '300px',
            padding: 2,
            overflowY: 'auto',
          }}
        >
          <Typography variant='h6' gutterBottom>
            Past Conversations
          </Typography>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={() => {
              setMessages([]);
              setNewMessage('');
            }}
          >
            Clear conversation
          </Button>
          <Box marginTop={'100px'}>
            <Stack direction={'column'} gap={2}>
              {/* <UITextField
                value={email}
                label='Email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              /> */}
              <SpecializedDatePicker
                onChange={(e) => {
                  setStartDate(e);
                }}
                value={startDate}
                label='Start Date'
              />
              <SpecializedDatePicker
                onChange={(e) => {
                  setEndDate(e);
                }}
                value={endDate}
                label='Start Date'
              />

              <UISelect
                label='Jobs'
                menuOptions={jobs?.map((j) => ({
                  name: j.job_title,
                  value: j.id,
                }))}
                onChange={(e) => {
                  setJobId(String(e.target.value));
                }}
                value={jobId}
                defaultValue={jobs.length > 0 && jobs[0].id}
              />
              <Button
                type='submit'
                onClick={() => {
                  initConversation();
                }}
                variant='contained'
                color='primary'
              >
                Init
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          width={'60vw'}
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: 2,
              display: 'flex',
              flexDirection: 'column', // Reverse the order of messages
              gap: 2,
              height: '100vh',
            }}
            ref={conversationRef}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                bgcolor={message.type === 'user' ? 'primary.main' : 'orangered'}
                color={'#fff'}
                maxWidth={'50%'}
                whiteSpace={'wrap'}
                borderRadius={2}
                padding={2}
                alignSelf={message.type === 'user' ? 'flex-end' : 'flex-start'}
              >
                {message.value}
              </Box>
            ))}
          </Paper>
          <Box
            component='form'
            display='flex'
            alignItems='center'
            padding={2}
            bgcolor='background.paper'
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                handleConversations();
              }
            }}
          >
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Type your message...'
              value={newMessage}
              onChange={handleMessageChange}
              sx={{ mr: 2 }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleConversations()}
            >
              {chatStatus === 'loading' ? 'loading' : 'Send'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScheduleAgent;

// candidate booking status : pending, cancelled, booked, interview completed
