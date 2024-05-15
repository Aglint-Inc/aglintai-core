import {envConfig} from '../../config';
import {CallDetail} from 'retell-sdk/models/components';
import axios from 'axios';
export const fetchTranascript = async (call_id: string) => {
  const {data} = await axios.get(
    `https://api.retellai.com/get-call/${call_id}`,
    {
      headers: {
        Authorization: `Bearer ${envConfig.RETELL_API_KEY}`,
      },
    }
  );

  return data as CallDetail;
};
