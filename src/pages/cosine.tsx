import { Stack } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import AUIButton from '../components/Common/AUIButton';
import UITextField from '../components/Common/UITextField';
import { API_FAIL_MSG } from '../components/JobsDashboard/JobPostCreateUpdate/utils';
import { supabase } from '../utils/supabaseClient';
import toast from '../utils/toast';

const Similarities = () => {
  const [cntSims, setCntSims] = useState(2);

  return (
    <>
      <button
        onClick={() => {
          setCntSims((p) => p + 1);
        }}
      >
        Add more
      </button>
      {Array(cntSims)
        .fill(0)
        .map((_, index) => {
          return <CosineSimilarity key={index} />;
        })}
    </>
  );
};

export default Similarities;

const CosineSimilarity = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [load, setLoad] = useState(false);
  const [score, setScore] = useState(-1);
  const getEmbs = async () => {
    try {
      setLoad(true);
      const { data: d1 } = await axios.post('/api/ai/create-embeddings', {
        text: text1,
      });

      const { data: d2 } = await axios.post('/api/ai/create-embeddings', {
        text: text2,
      });

      const { data } = await supabase.rpc('calc_cosine_sim', {
        emb1: d1.data[0].embedding,
        emb2: d2.data[0].embedding,
      });

      setScore(data[0].similarity);
    } catch (err) {
      toast.error(API_FAIL_MSG);
      // console.log(err);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <Stack p={2}>
        <Stack direction={'row'} gap={0.5} width={'100%'}>
          <UITextField
            multiline
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            height='100px'
          />
          <UITextField
            multiline
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            height='100px'
          />
        </Stack>
        <Stack direction={'row'} width={'50%'} mt={2} gap={3}>
          <AUIButton onClick={() => getEmbs()}>
            {load ? 'generating' : 'gen score'}
          </AUIButton>
          {score != -1 && <p>{score}</p>}
        </Stack>
      </Stack>
    </>
  );
};
